import { useEffect, useRef, useState } from 'react';
import SignaturePad from 'signature_pad';
import { useTranslation } from 'react-i18next';
import { Button } from '../button/Button';

export function SignatureField({ value, onChange }: { value: string; onChange: (signature: string) => void }) {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padRef = useRef<SignaturePad | null>(null);
  const callbackRef = useRef(onChange);
  const initialValue = useRef(value);
  const [name, setName] = useState('');
  useEffect(() => { callbackRef.current = onChange; }, [onChange]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pad = new SignaturePad(canvas, { penColor: '#01009e', minWidth: 1, maxWidth: 2.4 });
    padRef.current = pad;
    let previousWidth = canvas.clientWidth;
    let active = true;
    const resize = () => {
      const points = pad.toData();
      const bitmap = points.length === 0 && !pad.isEmpty() ? pad.toDataURL() : initialValue.current;
      const width = canvas.clientWidth;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = width * ratio;
      canvas.height = canvas.clientHeight * ratio;
      canvas.getContext('2d')?.scale(ratio, ratio);
      pad.clear();
      if (points.length) {
        const scale = width / previousWidth;
        pad.fromData(points.map(group => ({ ...group, points: group.points.map(point => ({ ...point, x: point.x * scale })) })));
      } else if (bitmap) {
        void pad.fromDataURL(bitmap, { width, height: canvas.clientHeight }).then(() => { if (!active) pad.off(); });
      }
      previousWidth = width;
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const endStroke = () => { initialValue.current = ''; callbackRef.current(pad.isEmpty() ? '' : pad.toDataURL()); };
    pad.addEventListener('endStroke', endStroke);
    return () => { active = false; observer.disconnect(); pad.removeEventListener('endStroke', endStroke); pad.off(); padRef.current = null; };
  }, []);

  function clear() { padRef.current?.clear(); initialValue.current = ''; onChange(''); }
  function signWithName() {
    const canvas = canvasRef.current;
    if (!canvas || !name.trim()) return;
    padRef.current?.clear();
    const context = canvas.getContext('2d');
    if (!context) return;
    context.fillStyle = '#01009e';
    context.font = 'italic 26px Georgia';
    context.fillText(name.trim(), 16, 66, canvas.clientWidth - 32);
    const signature = canvas.toDataURL();
    initialValue.current = signature;
    onChange(signature);
  }
  return <div className="signature-field"><div className="signature-field__box"><span id="signature-label">{t('licence.signature')}</span><canvas ref={canvasRef} aria-labelledby="signature-label" aria-describedby="signature-help" /></div><p id="signature-help" className="small-note">{t('licence.signatureHelp')}</p><button type="button" className="text-link" onClick={clear}>{t('licence.clear')}</button><details><summary>{t('licence.fallbackSignature')}</summary><label className="sr-only" htmlFor="signer-name">{t('licence.typedSignature')}</label><input id="signer-name" value={name} maxLength={100} onChange={event => setName(event.target.value)} autoComplete="name" /><Button icon={null} onClick={signWithName} disabled={!name.trim()}>{t('licence.useTypedSignature')}</Button></details></div>;
}
