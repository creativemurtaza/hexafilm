import { useRef, useEffect, useState } from 'react';

interface PhoneInputProps {
  phoneValue: string;
  codeValue: string;
  error?: string;
  autoFocus?: boolean;
  onPhoneChange: (key: string, value: string) => void;
  onCodeChange: (key: string, value: string) => void;
  onEnter: () => void;
}

const countryCodes = [
  { code: '+1', flag: '\u{1F1FA}\u{1F1F8}', label: 'US' },
  { code: '+1', flag: '\u{1F1E8}\u{1F1E6}', label: 'CA' },
  { code: '+44', flag: '\u{1F1EC}\u{1F1E7}', label: 'GB' },
  { code: '+49', flag: '\u{1F1E9}\u{1F1EA}', label: 'DE' },
  { code: '+33', flag: '\u{1F1EB}\u{1F1F7}', label: 'FR' },
  { code: '+34', flag: '\u{1F1EA}\u{1F1F8}', label: 'ES' },
  { code: '+39', flag: '\u{1F1EE}\u{1F1F9}', label: 'IT' },
  { code: '+31', flag: '\u{1F1F3}\u{1F1F1}', label: 'NL' },
  { code: '+41', flag: '\u{1F1E8}\u{1F1ED}', label: 'CH' },
  { code: '+43', flag: '\u{1F1E6}\u{1F1F9}', label: 'AT' },
  { code: '+46', flag: '\u{1F1F8}\u{1F1EA}', label: 'SE' },
  { code: '+47', flag: '\u{1F1F3}\u{1F1F4}', label: 'NO' },
  { code: '+45', flag: '\u{1F1E9}\u{1F1F0}', label: 'DK' },
  { code: '+48', flag: '\u{1F1F5}\u{1F1F1}', label: 'PL' },
  { code: '+351', flag: '\u{1F1F5}\u{1F1F9}', label: 'PT' },
  { code: '+353', flag: '\u{1F1EE}\u{1F1EA}', label: 'IE' },
  { code: '+61', flag: '\u{1F1E6}\u{1F1FA}', label: 'AU' },
  { code: '+64', flag: '\u{1F1F3}\u{1F1FF}', label: 'NZ' },
  { code: '+91', flag: '\u{1F1EE}\u{1F1F3}', label: 'IN' },
  { code: '+86', flag: '\u{1F1E8}\u{1F1F3}', label: 'CN' },
  { code: '+81', flag: '\u{1F1EF}\u{1F1F5}', label: 'JP' },
  { code: '+82', flag: '\u{1F1F0}\u{1F1F7}', label: 'KR' },
  { code: '+65', flag: '\u{1F1F8}\u{1F1EC}', label: 'SG' },
  { code: '+971', flag: '\u{1F1E6}\u{1F1EA}', label: 'AE' },
  { code: '+966', flag: '\u{1F1F8}\u{1F1E6}', label: 'SA' },
  { code: '+55', flag: '\u{1F1E7}\u{1F1F7}', label: 'BR' },
  { code: '+52', flag: '\u{1F1F2}\u{1F1FD}', label: 'MX' },
  { code: '+27', flag: '\u{1F1FF}\u{1F1E6}', label: 'ZA' },
  { code: '+234', flag: '\u{1F1F3}\u{1F1EC}', label: 'NG' },
  { code: '+254', flag: '\u{1F1F0}\u{1F1EA}', label: 'KE' },
  { code: '+92', flag: '\u{1F1F5}\u{1F1F0}', label: 'PK' },
  { code: '+90', flag: '\u{1F1F9}\u{1F1F7}', label: 'TR' },
  { code: '+7', flag: '\u{1F1F7}\u{1F1FA}', label: 'RU' },
  { code: '+380', flag: '\u{1F1FA}\u{1F1E6}', label: 'UA' },
  { code: '+972', flag: '\u{1F1EE}\u{1F1F1}', label: 'IL' },
  { code: '+20', flag: '\u{1F1EA}\u{1F1EC}', label: 'EG' },
  { code: '+60', flag: '\u{1F1F2}\u{1F1FE}', label: 'MY' },
  { code: '+66', flag: '\u{1F1F9}\u{1F1ED}', label: 'TH' },
  { code: '+63', flag: '\u{1F1F5}\u{1F1ED}', label: 'PH' },
  { code: '+84', flag: '\u{1F1FB}\u{1F1F3}', label: 'VN' },
];

export function PhoneInput({
  phoneValue,
  codeValue,
  error,
  autoFocus,
  onPhoneChange,
  onCodeChange,
  onEnter,
}: PhoneInputProps) {
  const phoneRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCode = codeValue || '+1';
  const selected = countryCodes.find((c) => c.code === selectedCode && (selectedCode !== '+1' || c.label === (codeValue === '+1' ? 'US' : 'US'))) || countryCodes[0];

  useEffect(() => {
    if (autoFocus) phoneRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="mb-5">
      <label htmlFor="phone" className="block font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-2">
        Phone (optional)
      </label>
      <div className="flex items-stretch gap-0">
        {/* Country code selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="
              h-full flex items-center gap-1.5 px-3 border-b-2 border-steel
              text-cloud text-sm bg-transparent
              hover:border-fog transition-colors duration-200
              focus:outline-none focus:border-ember
            "
            aria-label="Select country code"
            aria-expanded={open}
          >
            <span className="text-base">{selected.flag}</span>
            <span className="font-mono text-xs text-fog">{selected.code}</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-muted ml-0.5" aria-hidden="true">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-1 z-50 w-48 max-h-56 overflow-y-auto rounded-btn border border-steel bg-graphite shadow-2xl">
              {countryCodes.map((c) => (
                <button
                  key={`${c.label}-${c.code}`}
                  type="button"
                  onClick={() => {
                    onCodeChange('phoneCode', c.code);
                    setOpen(false);
                    phoneRef.current?.focus();
                  }}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm
                    transition-colors duration-100
                    ${c.code === selectedCode ? 'bg-ember/10 text-cloud' : 'text-fog hover:bg-steel/50 hover:text-cloud'}
                  `}
                >
                  <span className="text-base">{c.flag}</span>
                  <span className="text-fog font-mono text-xs">{c.label}</span>
                  <span className="text-muted font-mono text-xs ml-auto">{c.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone number input */}
        <input
          ref={phoneRef}
          id="phone"
          name="phone"
          type="tel"
          placeholder="555 000 0000"
          value={phoneValue}
          onChange={(e) => onPhoneChange('phone', e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onEnter();
            }
          }}
          className="
            flex-1 min-w-0 bg-transparent border-b-2 border-steel py-3 px-3
            text-cloud text-lg placeholder:text-muted/50
            transition-colors duration-200
            focus:outline-none focus:border-ember
          "
          aria-invalid={!!error}
          aria-describedby={error ? 'phone-error' : undefined}
        />
      </div>
      {error && (
        <p id="phone-error" className="mt-1.5 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
