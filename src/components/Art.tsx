// Illustrative artwork (not photography). Replace with real photos by dropping files in public/images.
export function Skyline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true" className={className}>
      <defs><linearGradient id="sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F47721" stopOpacity=".35" /><stop offset="1" stopColor="#F47721" stopOpacity=".05" /></linearGradient></defs>
      <g fill="url(#sk)">
        <rect x="40" y="150" width="60" height="110" /><rect x="120" y="110" width="50" height="150" /><rect x="190" y="170" width="70" height="90" />
        <path d="M300 260V60l22-50 22 50v200z" /><rect x="370" y="120" width="60" height="140" /><rect x="450" y="150" width="50" height="110" />
        <path d="M540 260V90q40-90 80 0v170z" /><rect x="640" y="130" width="70" height="130" /><rect x="730" y="80" width="46" height="180" />
        <rect x="800" y="160" width="80" height="100" /><path d="M910 260V40l16-38 16 38v220z" /><rect x="970" y="110" width="60" height="150" /><rect x="1050" y="150" width="90" height="110" />
      </g>
      <rect y="258" width="1200" height="2" fill="#F47721" opacity=".4" />
    </svg>
  )
}

export function TypeArt({ type }: { type: 'apartment' | 'townhouse' | 'villa' }) {
  return (
    <svg viewBox="0 0 320 180" aria-hidden="true" className="aspect-[16/9] w-full bg-[#1d1d1d]">
      <rect y="150" width="320" height="30" fill="#F47721" opacity=".15" />
      {type === 'apartment' && <g fill="#F47721" opacity=".85"><rect x="90" y="30" width="60" height="120" /><rect x="160" y="60" width="60" height="90" opacity=".6" />
        {[0,1,2,3,4].map((r)=>[0,1,2].map((c)=><rect key={`${r}${c}`} x={98+c*17} y={40+r*21} width="9" height="12" fill="#151515" opacity=".7" />))}</g>}
      {type === 'townhouse' && <g fill="#F47721" opacity=".85">{[0,1,2,3].map((i)=><g key={i}><path d={`M${40+i*60} 150V80l25-25 25 25v70z`} opacity={i%2?0.6:0.9} /><rect x={58+i*60} y="105" width="14" height="45" fill="#151515" opacity=".6" /></g>)}</g>}
      {type === 'villa' && <g fill="#F47721" opacity=".85"><path d="M60 150V95l50-35 50 35v55z" /><rect x="160" y="105" width="100" height="45" opacity=".6" /><rect x="90" y="110" width="30" height="40" fill="#151515" opacity=".6" /><rect x="180" y="118" width="60" height="14" fill="#151515" opacity=".5" /></g>}
    </svg>
  )
}
