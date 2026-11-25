export function formatTime(value: string, language: string): string {
  const [hour, minute] = value.split(':');
  return language === 'fr' ? `${Number(hour)} h${minute === '00' ? '' : ` ${minute}`}` : `${hour}:${minute}`;
}
