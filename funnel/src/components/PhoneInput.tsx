import { useRef, useEffect, useState, useMemo } from 'react';

interface PhoneInputProps {
  phoneValue: string;
  codeValue: string;
  error?: string;
  autoFocus?: boolean;
  onPhoneChange: (key: string, value: string) => void;
  onCodeChange: (key: string, value: string) => void;
  onEnter: () => void;
}

interface Country {
  name: string;
  iso: string;
  code: string;
  flag: string;
}

const countries: Country[] = [
  { name: 'Afghanistan', iso: 'AF', code: '+93', flag: '\u{1F1E6}\u{1F1EB}' },
  { name: 'Albania', iso: 'AL', code: '+355', flag: '\u{1F1E6}\u{1F1F1}' },
  { name: 'Algeria', iso: 'DZ', code: '+213', flag: '\u{1F1E9}\u{1F1FF}' },
  { name: 'Andorra', iso: 'AD', code: '+376', flag: '\u{1F1E6}\u{1F1E9}' },
  { name: 'Angola', iso: 'AO', code: '+244', flag: '\u{1F1E6}\u{1F1F4}' },
  { name: 'Antigua and Barbuda', iso: 'AG', code: '+1268', flag: '\u{1F1E6}\u{1F1EC}' },
  { name: 'Argentina', iso: 'AR', code: '+54', flag: '\u{1F1E6}\u{1F1F7}' },
  { name: 'Armenia', iso: 'AM', code: '+374', flag: '\u{1F1E6}\u{1F1F2}' },
  { name: 'Australia', iso: 'AU', code: '+61', flag: '\u{1F1E6}\u{1F1FA}' },
  { name: 'Austria', iso: 'AT', code: '+43', flag: '\u{1F1E6}\u{1F1F9}' },
  { name: 'Azerbaijan', iso: 'AZ', code: '+994', flag: '\u{1F1E6}\u{1F1FF}' },
  { name: 'Bahamas', iso: 'BS', code: '+1242', flag: '\u{1F1E7}\u{1F1F8}' },
  { name: 'Bahrain', iso: 'BH', code: '+973', flag: '\u{1F1E7}\u{1F1ED}' },
  { name: 'Bangladesh', iso: 'BD', code: '+880', flag: '\u{1F1E7}\u{1F1E9}' },
  { name: 'Barbados', iso: 'BB', code: '+1246', flag: '\u{1F1E7}\u{1F1E7}' },
  { name: 'Belarus', iso: 'BY', code: '+375', flag: '\u{1F1E7}\u{1F1FE}' },
  { name: 'Belgium', iso: 'BE', code: '+32', flag: '\u{1F1E7}\u{1F1EA}' },
  { name: 'Belize', iso: 'BZ', code: '+501', flag: '\u{1F1E7}\u{1F1FF}' },
  { name: 'Benin', iso: 'BJ', code: '+229', flag: '\u{1F1E7}\u{1F1EF}' },
  { name: 'Bhutan', iso: 'BT', code: '+975', flag: '\u{1F1E7}\u{1F1F9}' },
  { name: 'Bolivia', iso: 'BO', code: '+591', flag: '\u{1F1E7}\u{1F1F4}' },
  { name: 'Bosnia and Herzegovina', iso: 'BA', code: '+387', flag: '\u{1F1E7}\u{1F1E6}' },
  { name: 'Botswana', iso: 'BW', code: '+267', flag: '\u{1F1E7}\u{1F1FC}' },
  { name: 'Brazil', iso: 'BR', code: '+55', flag: '\u{1F1E7}\u{1F1F7}' },
  { name: 'Brunei', iso: 'BN', code: '+673', flag: '\u{1F1E7}\u{1F1F3}' },
  { name: 'Bulgaria', iso: 'BG', code: '+359', flag: '\u{1F1E7}\u{1F1EC}' },
  { name: 'Burkina Faso', iso: 'BF', code: '+226', flag: '\u{1F1E7}\u{1F1EB}' },
  { name: 'Burundi', iso: 'BI', code: '+257', flag: '\u{1F1E7}\u{1F1EE}' },
  { name: 'Cambodia', iso: 'KH', code: '+855', flag: '\u{1F1F0}\u{1F1ED}' },
  { name: 'Cameroon', iso: 'CM', code: '+237', flag: '\u{1F1E8}\u{1F1F2}' },
  { name: 'Canada', iso: 'CA', code: '+1', flag: '\u{1F1E8}\u{1F1E6}' },
  { name: 'Cape Verde', iso: 'CV', code: '+238', flag: '\u{1F1E8}\u{1F1FB}' },
  { name: 'Central African Republic', iso: 'CF', code: '+236', flag: '\u{1F1E8}\u{1F1EB}' },
  { name: 'Chad', iso: 'TD', code: '+235', flag: '\u{1F1F9}\u{1F1E9}' },
  { name: 'Chile', iso: 'CL', code: '+56', flag: '\u{1F1E8}\u{1F1F1}' },
  { name: 'China', iso: 'CN', code: '+86', flag: '\u{1F1E8}\u{1F1F3}' },
  { name: 'Colombia', iso: 'CO', code: '+57', flag: '\u{1F1E8}\u{1F1F4}' },
  { name: 'Comoros', iso: 'KM', code: '+269', flag: '\u{1F1F0}\u{1F1F2}' },
  { name: 'Congo (DRC)', iso: 'CD', code: '+243', flag: '\u{1F1E8}\u{1F1E9}' },
  { name: 'Congo (Republic)', iso: 'CG', code: '+242', flag: '\u{1F1E8}\u{1F1EC}' },
  { name: 'Costa Rica', iso: 'CR', code: '+506', flag: '\u{1F1E8}\u{1F1F7}' },
  { name: 'Croatia', iso: 'HR', code: '+385', flag: '\u{1F1ED}\u{1F1F7}' },
  { name: 'Cuba', iso: 'CU', code: '+53', flag: '\u{1F1E8}\u{1F1FA}' },
  { name: 'Cyprus', iso: 'CY', code: '+357', flag: '\u{1F1E8}\u{1F1FE}' },
  { name: 'Czech Republic', iso: 'CZ', code: '+420', flag: '\u{1F1E8}\u{1F1FF}' },
  { name: 'Denmark', iso: 'DK', code: '+45', flag: '\u{1F1E9}\u{1F1F0}' },
  { name: 'Djibouti', iso: 'DJ', code: '+253', flag: '\u{1F1E9}\u{1F1EF}' },
  { name: 'Dominican Republic', iso: 'DO', code: '+1809', flag: '\u{1F1E9}\u{1F1F4}' },
  { name: 'Ecuador', iso: 'EC', code: '+593', flag: '\u{1F1EA}\u{1F1E8}' },
  { name: 'Egypt', iso: 'EG', code: '+20', flag: '\u{1F1EA}\u{1F1EC}' },
  { name: 'El Salvador', iso: 'SV', code: '+503', flag: '\u{1F1F8}\u{1F1FB}' },
  { name: 'Equatorial Guinea', iso: 'GQ', code: '+240', flag: '\u{1F1EC}\u{1F1F6}' },
  { name: 'Eritrea', iso: 'ER', code: '+291', flag: '\u{1F1EA}\u{1F1F7}' },
  { name: 'Estonia', iso: 'EE', code: '+372', flag: '\u{1F1EA}\u{1F1EA}' },
  { name: 'Eswatini', iso: 'SZ', code: '+268', flag: '\u{1F1F8}\u{1F1FF}' },
  { name: 'Ethiopia', iso: 'ET', code: '+251', flag: '\u{1F1EA}\u{1F1F9}' },
  { name: 'Fiji', iso: 'FJ', code: '+679', flag: '\u{1F1EB}\u{1F1EF}' },
  { name: 'Finland', iso: 'FI', code: '+358', flag: '\u{1F1EB}\u{1F1EE}' },
  { name: 'France', iso: 'FR', code: '+33', flag: '\u{1F1EB}\u{1F1F7}' },
  { name: 'Gabon', iso: 'GA', code: '+241', flag: '\u{1F1EC}\u{1F1E6}' },
  { name: 'Gambia', iso: 'GM', code: '+220', flag: '\u{1F1EC}\u{1F1F2}' },
  { name: 'Georgia', iso: 'GE', code: '+995', flag: '\u{1F1EC}\u{1F1EA}' },
  { name: 'Germany', iso: 'DE', code: '+49', flag: '\u{1F1E9}\u{1F1EA}' },
  { name: 'Ghana', iso: 'GH', code: '+233', flag: '\u{1F1EC}\u{1F1ED}' },
  { name: 'Greece', iso: 'GR', code: '+30', flag: '\u{1F1EC}\u{1F1F7}' },
  { name: 'Guatemala', iso: 'GT', code: '+502', flag: '\u{1F1EC}\u{1F1F9}' },
  { name: 'Guinea', iso: 'GN', code: '+224', flag: '\u{1F1EC}\u{1F1F3}' },
  { name: 'Guyana', iso: 'GY', code: '+592', flag: '\u{1F1EC}\u{1F1FE}' },
  { name: 'Haiti', iso: 'HT', code: '+509', flag: '\u{1F1ED}\u{1F1F9}' },
  { name: 'Honduras', iso: 'HN', code: '+504', flag: '\u{1F1ED}\u{1F1F3}' },
  { name: 'Hong Kong', iso: 'HK', code: '+852', flag: '\u{1F1ED}\u{1F1F0}' },
  { name: 'Hungary', iso: 'HU', code: '+36', flag: '\u{1F1ED}\u{1F1FA}' },
  { name: 'Iceland', iso: 'IS', code: '+354', flag: '\u{1F1EE}\u{1F1F8}' },
  { name: 'India', iso: 'IN', code: '+91', flag: '\u{1F1EE}\u{1F1F3}' },
  { name: 'Indonesia', iso: 'ID', code: '+62', flag: '\u{1F1EE}\u{1F1E9}' },
  { name: 'Iran', iso: 'IR', code: '+98', flag: '\u{1F1EE}\u{1F1F7}' },
  { name: 'Iraq', iso: 'IQ', code: '+964', flag: '\u{1F1EE}\u{1F1F6}' },
  { name: 'Ireland', iso: 'IE', code: '+353', flag: '\u{1F1EE}\u{1F1EA}' },
  { name: 'Israel', iso: 'IL', code: '+972', flag: '\u{1F1EE}\u{1F1F1}' },
  { name: 'Italy', iso: 'IT', code: '+39', flag: '\u{1F1EE}\u{1F1F9}' },
  { name: 'Ivory Coast', iso: 'CI', code: '+225', flag: '\u{1F1E8}\u{1F1EE}' },
  { name: 'Jamaica', iso: 'JM', code: '+1876', flag: '\u{1F1EF}\u{1F1F2}' },
  { name: 'Japan', iso: 'JP', code: '+81', flag: '\u{1F1EF}\u{1F1F5}' },
  { name: 'Jordan', iso: 'JO', code: '+962', flag: '\u{1F1EF}\u{1F1F4}' },
  { name: 'Kazakhstan', iso: 'KZ', code: '+7', flag: '\u{1F1F0}\u{1F1FF}' },
  { name: 'Kenya', iso: 'KE', code: '+254', flag: '\u{1F1F0}\u{1F1EA}' },
  { name: 'Kuwait', iso: 'KW', code: '+965', flag: '\u{1F1F0}\u{1F1FC}' },
  { name: 'Kyrgyzstan', iso: 'KG', code: '+996', flag: '\u{1F1F0}\u{1F1EC}' },
  { name: 'Laos', iso: 'LA', code: '+856', flag: '\u{1F1F1}\u{1F1E6}' },
  { name: 'Latvia', iso: 'LV', code: '+371', flag: '\u{1F1F1}\u{1F1FB}' },
  { name: 'Lebanon', iso: 'LB', code: '+961', flag: '\u{1F1F1}\u{1F1E7}' },
  { name: 'Lesotho', iso: 'LS', code: '+266', flag: '\u{1F1F1}\u{1F1F8}' },
  { name: 'Liberia', iso: 'LR', code: '+231', flag: '\u{1F1F1}\u{1F1F7}' },
  { name: 'Libya', iso: 'LY', code: '+218', flag: '\u{1F1F1}\u{1F1FE}' },
  { name: 'Liechtenstein', iso: 'LI', code: '+423', flag: '\u{1F1F1}\u{1F1EE}' },
  { name: 'Lithuania', iso: 'LT', code: '+370', flag: '\u{1F1F1}\u{1F1F9}' },
  { name: 'Luxembourg', iso: 'LU', code: '+352', flag: '\u{1F1F1}\u{1F1FA}' },
  { name: 'Macao', iso: 'MO', code: '+853', flag: '\u{1F1F2}\u{1F1F4}' },
  { name: 'Madagascar', iso: 'MG', code: '+261', flag: '\u{1F1F2}\u{1F1EC}' },
  { name: 'Malawi', iso: 'MW', code: '+265', flag: '\u{1F1F2}\u{1F1FC}' },
  { name: 'Malaysia', iso: 'MY', code: '+60', flag: '\u{1F1F2}\u{1F1FE}' },
  { name: 'Maldives', iso: 'MV', code: '+960', flag: '\u{1F1F2}\u{1F1FB}' },
  { name: 'Mali', iso: 'ML', code: '+223', flag: '\u{1F1F2}\u{1F1F1}' },
  { name: 'Malta', iso: 'MT', code: '+356', flag: '\u{1F1F2}\u{1F1F9}' },
  { name: 'Mauritania', iso: 'MR', code: '+222', flag: '\u{1F1F2}\u{1F1F7}' },
  { name: 'Mauritius', iso: 'MU', code: '+230', flag: '\u{1F1F2}\u{1F1FA}' },
  { name: 'Mexico', iso: 'MX', code: '+52', flag: '\u{1F1F2}\u{1F1FD}' },
  { name: 'Moldova', iso: 'MD', code: '+373', flag: '\u{1F1F2}\u{1F1E9}' },
  { name: 'Monaco', iso: 'MC', code: '+377', flag: '\u{1F1F2}\u{1F1E8}' },
  { name: 'Mongolia', iso: 'MN', code: '+976', flag: '\u{1F1F2}\u{1F1F3}' },
  { name: 'Montenegro', iso: 'ME', code: '+382', flag: '\u{1F1F2}\u{1F1EA}' },
  { name: 'Morocco', iso: 'MA', code: '+212', flag: '\u{1F1F2}\u{1F1E6}' },
  { name: 'Mozambique', iso: 'MZ', code: '+258', flag: '\u{1F1F2}\u{1F1FF}' },
  { name: 'Myanmar', iso: 'MM', code: '+95', flag: '\u{1F1F2}\u{1F1F2}' },
  { name: 'Namibia', iso: 'NA', code: '+264', flag: '\u{1F1F3}\u{1F1E6}' },
  { name: 'Nepal', iso: 'NP', code: '+977', flag: '\u{1F1F3}\u{1F1F5}' },
  { name: 'Netherlands', iso: 'NL', code: '+31', flag: '\u{1F1F3}\u{1F1F1}' },
  { name: 'New Zealand', iso: 'NZ', code: '+64', flag: '\u{1F1F3}\u{1F1FF}' },
  { name: 'Nicaragua', iso: 'NI', code: '+505', flag: '\u{1F1F3}\u{1F1EE}' },
  { name: 'Niger', iso: 'NE', code: '+227', flag: '\u{1F1F3}\u{1F1EA}' },
  { name: 'Nigeria', iso: 'NG', code: '+234', flag: '\u{1F1F3}\u{1F1EC}' },
  { name: 'North Korea', iso: 'KP', code: '+850', flag: '\u{1F1F0}\u{1F1F5}' },
  { name: 'North Macedonia', iso: 'MK', code: '+389', flag: '\u{1F1F2}\u{1F1F0}' },
  { name: 'Norway', iso: 'NO', code: '+47', flag: '\u{1F1F3}\u{1F1F4}' },
  { name: 'Oman', iso: 'OM', code: '+968', flag: '\u{1F1F4}\u{1F1F2}' },
  { name: 'Pakistan', iso: 'PK', code: '+92', flag: '\u{1F1F5}\u{1F1F0}' },
  { name: 'Palestine', iso: 'PS', code: '+970', flag: '\u{1F1F5}\u{1F1F8}' },
  { name: 'Panama', iso: 'PA', code: '+507', flag: '\u{1F1F5}\u{1F1E6}' },
  { name: 'Papua New Guinea', iso: 'PG', code: '+675', flag: '\u{1F1F5}\u{1F1EC}' },
  { name: 'Paraguay', iso: 'PY', code: '+595', flag: '\u{1F1F5}\u{1F1FE}' },
  { name: 'Peru', iso: 'PE', code: '+51', flag: '\u{1F1F5}\u{1F1EA}' },
  { name: 'Philippines', iso: 'PH', code: '+63', flag: '\u{1F1F5}\u{1F1ED}' },
  { name: 'Poland', iso: 'PL', code: '+48', flag: '\u{1F1F5}\u{1F1F1}' },
  { name: 'Portugal', iso: 'PT', code: '+351', flag: '\u{1F1F5}\u{1F1F9}' },
  { name: 'Puerto Rico', iso: 'PR', code: '+1787', flag: '\u{1F1F5}\u{1F1F7}' },
  { name: 'Qatar', iso: 'QA', code: '+974', flag: '\u{1F1F6}\u{1F1E6}' },
  { name: 'Romania', iso: 'RO', code: '+40', flag: '\u{1F1F7}\u{1F1F4}' },
  { name: 'Russia', iso: 'RU', code: '+7', flag: '\u{1F1F7}\u{1F1FA}' },
  { name: 'Rwanda', iso: 'RW', code: '+250', flag: '\u{1F1F7}\u{1F1FC}' },
  { name: 'Saudi Arabia', iso: 'SA', code: '+966', flag: '\u{1F1F8}\u{1F1E6}' },
  { name: 'Senegal', iso: 'SN', code: '+221', flag: '\u{1F1F8}\u{1F1F3}' },
  { name: 'Serbia', iso: 'RS', code: '+381', flag: '\u{1F1F7}\u{1F1F8}' },
  { name: 'Sierra Leone', iso: 'SL', code: '+232', flag: '\u{1F1F8}\u{1F1F1}' },
  { name: 'Singapore', iso: 'SG', code: '+65', flag: '\u{1F1F8}\u{1F1EC}' },
  { name: 'Slovakia', iso: 'SK', code: '+421', flag: '\u{1F1F8}\u{1F1F0}' },
  { name: 'Slovenia', iso: 'SI', code: '+386', flag: '\u{1F1F8}\u{1F1EE}' },
  { name: 'Somalia', iso: 'SO', code: '+252', flag: '\u{1F1F8}\u{1F1F4}' },
  { name: 'South Africa', iso: 'ZA', code: '+27', flag: '\u{1F1FF}\u{1F1E6}' },
  { name: 'South Korea', iso: 'KR', code: '+82', flag: '\u{1F1F0}\u{1F1F7}' },
  { name: 'South Sudan', iso: 'SS', code: '+211', flag: '\u{1F1F8}\u{1F1F8}' },
  { name: 'Spain', iso: 'ES', code: '+34', flag: '\u{1F1EA}\u{1F1F8}' },
  { name: 'Sri Lanka', iso: 'LK', code: '+94', flag: '\u{1F1F1}\u{1F1F0}' },
  { name: 'Sudan', iso: 'SD', code: '+249', flag: '\u{1F1F8}\u{1F1E9}' },
  { name: 'Suriname', iso: 'SR', code: '+597', flag: '\u{1F1F8}\u{1F1F7}' },
  { name: 'Sweden', iso: 'SE', code: '+46', flag: '\u{1F1F8}\u{1F1EA}' },
  { name: 'Switzerland', iso: 'CH', code: '+41', flag: '\u{1F1E8}\u{1F1ED}' },
  { name: 'Syria', iso: 'SY', code: '+963', flag: '\u{1F1F8}\u{1F1FE}' },
  { name: 'Taiwan', iso: 'TW', code: '+886', flag: '\u{1F1F9}\u{1F1FC}' },
  { name: 'Tajikistan', iso: 'TJ', code: '+992', flag: '\u{1F1F9}\u{1F1EF}' },
  { name: 'Tanzania', iso: 'TZ', code: '+255', flag: '\u{1F1F9}\u{1F1FF}' },
  { name: 'Thailand', iso: 'TH', code: '+66', flag: '\u{1F1F9}\u{1F1ED}' },
  { name: 'Togo', iso: 'TG', code: '+228', flag: '\u{1F1F9}\u{1F1EC}' },
  { name: 'Trinidad and Tobago', iso: 'TT', code: '+1868', flag: '\u{1F1F9}\u{1F1F9}' },
  { name: 'Tunisia', iso: 'TN', code: '+216', flag: '\u{1F1F9}\u{1F1F3}' },
  { name: 'Turkey', iso: 'TR', code: '+90', flag: '\u{1F1F9}\u{1F1F7}' },
  { name: 'Turkmenistan', iso: 'TM', code: '+993', flag: '\u{1F1F9}\u{1F1F2}' },
  { name: 'Uganda', iso: 'UG', code: '+256', flag: '\u{1F1FA}\u{1F1EC}' },
  { name: 'Ukraine', iso: 'UA', code: '+380', flag: '\u{1F1FA}\u{1F1E6}' },
  { name: 'United Arab Emirates', iso: 'AE', code: '+971', flag: '\u{1F1E6}\u{1F1EA}' },
  { name: 'United Kingdom', iso: 'GB', code: '+44', flag: '\u{1F1EC}\u{1F1E7}' },
  { name: 'United States', iso: 'US', code: '+1', flag: '\u{1F1FA}\u{1F1F8}' },
  { name: 'Uruguay', iso: 'UY', code: '+598', flag: '\u{1F1FA}\u{1F1FE}' },
  { name: 'Uzbekistan', iso: 'UZ', code: '+998', flag: '\u{1F1FA}\u{1F1FF}' },
  { name: 'Venezuela', iso: 'VE', code: '+58', flag: '\u{1F1FB}\u{1F1EA}' },
  { name: 'Vietnam', iso: 'VN', code: '+84', flag: '\u{1F1FB}\u{1F1F3}' },
  { name: 'Yemen', iso: 'YE', code: '+967', flag: '\u{1F1FE}\u{1F1EA}' },
  { name: 'Zambia', iso: 'ZM', code: '+260', flag: '\u{1F1FF}\u{1F1F2}' },
  { name: 'Zimbabwe', iso: 'ZW', code: '+263', flag: '\u{1F1FF}\u{1F1FC}' },
];

const DEFAULT_ISO = 'US';

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
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedIso = codeValue || DEFAULT_ISO;
  const selected = countries.find((c) => c.iso === selectedIso) || countries.find((c) => c.iso === DEFAULT_ISO)!;

  const filtered = useMemo(() => {
    if (!search) return countries;
    const q = search.toLowerCase();
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.iso.toLowerCase().includes(q) ||
        c.code.includes(q),
    );
  }, [search]);

  useEffect(() => {
    if (autoFocus) phoneRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    if (open) {
      setSearch('');
      setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [open]);

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
            <div className="absolute top-full left-0 mt-1 z-50 w-64 rounded-btn border border-steel bg-graphite shadow-2xl flex flex-col overflow-hidden">
              {/* Search */}
              <div className="p-2 border-b border-steel">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search country..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setOpen(false);
                      phoneRef.current?.focus();
                    }
                    if (e.key === 'Enter' && filtered.length > 0) {
                      e.preventDefault();
                      onCodeChange('phoneCode', filtered[0].iso);
                      setOpen(false);
                      phoneRef.current?.focus();
                    }
                  }}
                  className="
                    w-full bg-obsidian/60 border border-steel rounded-lg px-3 py-2
                    text-cloud text-sm placeholder:text-muted/60
                    focus:outline-none focus:border-ember
                  "
                />
              </div>

              {/* List */}
              <div className="max-h-52 overflow-y-auto">
                {filtered.length === 0 && (
                  <div className="px-3 py-4 text-center text-sm text-muted">No results</div>
                )}
                {filtered.map((c) => (
                  <button
                    key={c.iso}
                    type="button"
                    onClick={() => {
                      onCodeChange('phoneCode', c.iso);
                      setOpen(false);
                      phoneRef.current?.focus();
                    }}
                    className={`
                      w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm
                      transition-colors duration-100
                      ${c.iso === selectedIso ? 'bg-ember/10 text-cloud' : 'text-fog hover:bg-steel/50 hover:text-cloud'}
                    `}
                  >
                    <span className="text-base flex-shrink-0">{c.flag}</span>
                    <span className="truncate">{c.name}</span>
                    <span className="text-muted font-mono text-xs ml-auto flex-shrink-0">{c.code}</span>
                  </button>
                ))}
              </div>
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
