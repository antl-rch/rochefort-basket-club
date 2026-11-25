import { expect, test, type Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';

async function fillApplication(page: Page) {
  await page.goto('/licence');
  await page.getByLabel('Prénom', { exact: true }).fill('Camille');
  await page.getByLabel('Nom', { exact: true }).fill('Martin');
  await page.getByLabel('Date de naissance').fill('2002-08-12');
  await page.getByRole('combobox', { name: 'Catégorie souhaitée' }).press('ArrowDown');
  await page.getByRole('option', { name: 'Seniors', exact: true }).click();
  await page.getByLabel('E-mail', { exact: true }).fill('camille@example.com');
  await page.getByRole('button', { name: 'Continuer vers la signature' }).click();
}

test('accueil, images locales et absence de débordement', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((image) => {
        image.loading = 'eager';
        return image.decode();
      }),
    );
  });
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ROCHEFORTBASKET CLUB');
  await expect(page.getByRole('table')).toContainText('Mercredi');
  const assets = await page.locator('img').evaluateAll((images) =>
    images.map((image) => ({
      src: image.getAttribute('src'),
      loaded: image.complete && image.naturalWidth > 0,
      width: image.getBoundingClientRect().width,
      height: image.getBoundingClientRect().height,
    })),
  );
  expect(assets).toHaveLength(12);
  expect(
    assets.every(
      (asset) =>
        asset.loaded && asset.src?.startsWith('/images/') && asset.width > 0 && asset.height > 0,
    ),
  ).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({ path: `artifacts/home-${testInfo.project.name}.png`, fullPage: true });
});

test('traductions complètes et préférence conservée', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'EN', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: 'A COURT FOR EVERYONE' })).toBeVisible();
  await expect(page.getByRole('table')).toContainText('Wednesday');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.goto('/licence');
  await expect(page.getByRole('heading', { name: 'YOUR APPLICATION' })).toBeVisible();
  await expect(page.getByLabel('First name', { exact: true })).toBeVisible();
});

test('validation des champs et signature réelle, retour et export', async ({ page }, testInfo) => {
  await page.goto('/licence');
  await page.getByRole('button', { name: 'Continuer vers la signature' }).click();
  await expect(page.getByRole('heading', { name: 'VOTRE DOSSIER' })).toBeVisible();
  await fillApplication(page);
  const validate = page.getByRole('button', { name: 'Valider la signature' });
  await expect(validate).toBeDisabled();
  const canvas = page.locator('canvas');
  const box = (await canvas.boundingBox())!;
  await page.mouse.move(box.x + 20, box.y + 35);
  await page.mouse.down();
  await page.mouse.move(box.x + 65, box.y + 20, { steps: 8 });
  await page.mouse.move(box.x + 95, box.y + 60, { steps: 8 });
  await page.mouse.up();
  await expect(validate).toBeEnabled();
  await page.screenshot({
    path: `artifacts/signature-${testInfo.project.name}.png`,
    fullPage: true,
  });
  await validate.click();
  await expect(page.getByText('camille@example.com', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Retour', exact: true }).click();
  await expect(validate).toBeEnabled();
  const hasInk = await canvas.evaluate((canvas) => {
    const element = canvas as HTMLCanvasElement;
    return element
      .getContext('2d')!
      .getImageData(0, 0, element.width, element.height)
      .data.some((value, index) => index % 4 === 3 && value > 0);
  });
  expect(hasInk).toBe(true);
  await validate.click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Télécharger ma demande' }).click();
  const download = await downloadPromise;
  const content = await readFile((await download.path())!, 'utf8');
  expect(content).toContain('Camille');
  expect(content).toContain('data:image/png;base64,');
  expect(content).toContain('2002-08-12');
  await expect(page.getByRole('heading', { name: 'MERCI !' })).toBeVisible();
  await expect(page.getByText(/Il n’a pas été transmis au club/)).toBeVisible();
});

test('signature accessible au clavier et effacement', async ({ page }) => {
  await fillApplication(page);
  await page.getByText('Ou saisir le nom du signataire').click();
  await page.getByLabel('Nom complet du signataire').fill('Camille Martin');
  await page.getByRole('button', { name: 'Signer avec ce nom' }).click();
  await expect(page.getByRole('button', { name: 'Valider la signature' })).toBeEnabled();
  await page.getByRole('button', { name: 'Effacer la signature' }).click();
  await expect(page.getByRole('button', { name: 'Valider la signature' })).toBeDisabled();
});

test('responsive aux largeurs intermédiaires et étroites', async ({ page }) => {
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `overflow at ${width}px`,
    ).toBe(true);
    await page.getByRole('button', { name: 'EN', exact: true }).click();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `EN overflow at ${width}px`,
    ).toBe(true);
  }
});

test('react-select a la même hauteur que les inputs et fonctionne au clic', async ({
  page,
}, testInfo) => {
  await page.goto('/licence');
  const inputHeight = await page
    .locator('#firstName')
    .evaluate((input) => input.getBoundingClientRect().height);
  const control = page.locator('.app-select__control');
  expect(await control.evaluate((element) => element.getBoundingClientRect().height)).toBe(
    inputHeight,
  );
  await control.click();
  await page.getByRole('option', { name: 'Jeunes', exact: true }).click();
  await expect(page.locator('.app-select__single-value')).toHaveText('Jeunes');
  await page.screenshot({ path: `artifacts/select-${testInfo.project.name}.png`, fullPage: true });
});

test('modifier le dossier impose une nouvelle signature', async ({ page }) => {
  await fillApplication(page);
  await page.getByText('Ou saisir le nom du signataire').click();
  await page.getByLabel('Nom complet du signataire').fill('Camille Martin');
  await page.getByRole('button', { name: 'Signer avec ce nom' }).click();
  await page.getByRole('button', { name: 'Retour', exact: true }).click();
  await page.getByLabel('Prénom', { exact: true }).fill('Alex');
  await page.getByRole('button', { name: 'Continuer vers la signature' }).click();
  await expect(page.getByRole('button', { name: 'Valider la signature' })).toBeDisabled();
  await expect(page.getByText('Alex Martin · Seniors')).toBeVisible();
});
