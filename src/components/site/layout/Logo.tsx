type Props = {
  className?: string;
};

export function Logo({ className = "" }: Props) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img 
        src="/images/portal_icon.webp" 
        alt="Opnora Icon" 
        className="h-[120%] w-auto object-contain scale-110"
      />
      <span 
        className="text-white font-medium text-[1.5rem] md:text-[2rem] tracking-normal -ml-0.5 md:-ml-1"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        Opn
        <span className="bg-gradient-to-b from-[#22d3ee] via-[#60a5fa] to-[#b026ff] bg-clip-text text-transparent font-medium">
          o
        </span>
        ra
      </span>
    </span>
  );
}
