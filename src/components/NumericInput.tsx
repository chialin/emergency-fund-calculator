import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { fmtNumber } from '../lib/format';

interface Props {
  value: number;
  onChange: (n: number) => void;
  style?: CSSProperties;
  ariaLabel?: string;
}

export function NumericInput({ value, onChange, style, ariaLabel }: Props) {
  const [text, setText] = useState(() => fmtNumber(value));
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!focused) setText(fmtNumber(value));
  }, [value, focused]);

  useLayoutEffect(() => {
    if (focused) inputRef.current?.select();
  }, [focused]);

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      aria-label={ariaLabel}
      style={style}
      value={text}
      onFocus={() => {
        setFocused(true);
        setText(value === 0 ? '' : String(value));
      }}
      onChange={(e) => {
        const cleaned = e.target.value.replace(/[^\d]/g, '');
        setText(cleaned);
        const n = cleaned === '' ? 0 : parseInt(cleaned, 10);
        onChange(isNaN(n) ? 0 : n);
      }}
      onBlur={() => {
        setFocused(false);
        setText(fmtNumber(value));
      }}
    />
  );
}
