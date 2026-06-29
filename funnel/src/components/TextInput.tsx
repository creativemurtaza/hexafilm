import { useRef, useEffect } from 'react';

interface TextInputProps {
  fieldKey: string;
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  error?: string;
  autoFocus?: boolean;
  onChange: (key: string, value: string) => void;
  onEnter: () => void;
}

export function TextInput({
  fieldKey,
  label,
  placeholder,
  type = 'text',
  value,
  error,
  autoFocus,
  onChange,
  onEnter,
}: TextInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  return (
    <div className="mb-5">
      <label htmlFor={fieldKey} className="block font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-2">
        {label}
      </label>
      <input
        ref={ref}
        id={fieldKey}
        name={fieldKey}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(fieldKey, e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            onEnter();
          }
        }}
        className="
          w-full bg-transparent border-b-2 border-steel py-3 px-1
          text-cloud text-lg placeholder:text-muted/50
          transition-colors duration-200
          focus:outline-none focus:border-ember
        "
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldKey}-error` : undefined}
      />
      {error && (
        <p id={`${fieldKey}-error`} className="mt-1.5 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
