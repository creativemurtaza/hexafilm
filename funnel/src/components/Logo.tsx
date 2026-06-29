export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5" aria-label="Hexafilm.ai home">
      <svg
        viewBox="0 0 24 24"
        width={30}
        height={30}
        aria-hidden="true"
        className="drop-shadow-[0_2px_9px_rgba(245,147,61,0.35)]"
      >
        <polygon points="22,12 17,20.7 15.5,14" fill="#F5933D" stroke="#0A0B0E" strokeWidth="0.6" strokeLinejoin="round" />
        <polygon points="17,20.7 7,20.7 12,16" fill="#2FD3C0" stroke="#0A0B0E" strokeWidth="0.6" strokeLinejoin="round" />
        <polygon points="7,20.7 2,12 8.5,14" fill="#F5933D" stroke="#0A0B0E" strokeWidth="0.6" strokeLinejoin="round" />
        <polygon points="2,12 7,3.3 8.5,10" fill="#2FD3C0" stroke="#0A0B0E" strokeWidth="0.6" strokeLinejoin="round" />
        <polygon points="7,3.3 17,3.3 12,8" fill="#F5933D" stroke="#0A0B0E" strokeWidth="0.6" strokeLinejoin="round" />
        <polygon points="17,3.3 22,12 15.5,10" fill="#2FD3C0" stroke="#0A0B0E" strokeWidth="0.6" strokeLinejoin="round" />
      </svg>
      <span className="font-extrabold text-[19px] tracking-tight text-cloud">
        Hexa<span className="text-ember">film</span>
        <span className="text-iris-teal">.ai</span>
      </span>
    </a>
  );
}
