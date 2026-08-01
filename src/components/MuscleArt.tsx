import type { MuscleGroupId } from '../catalog'

// Stiliserade vektor-ikoner per muskelgrupp. Ärver färg via currentColor och
// storlek via CSS, så samma ikon funkar i små thumbnails och stora kort.
const ART: Record<MuscleGroupId, React.ReactNode> = {
  chest: (
    <>
      <path d="M30 20c-4-6-13-7-19-2C4 23 4 34 11 40c6 5 17 3 19-5 1-3 1-9 0-15z" />
      <path d="M34 20c4-6 13-7 19-2 7 5 7 16 0 22-6 5-17 3-19-5-1-3-1-9 0-15z" />
    </>
  ),
  back: (
    <path d="M32 10l3 9c7 3 14 10 18 23-7-4-12-5-16-5l-1 15-4-7-4 7-1-15c-4 0-9 1-16 5 4-13 11-20 18-23l3-9z" />
  ),
  shoulders: (
    <>
      <circle cx="17" cy="33" r="11" />
      <circle cx="47" cy="33" r="11" />
      <rect x="26" y="29" width="12" height="8" rx="4" />
    </>
  ),
  arms: (
    <>
      <rect x="6" y="26" width="8" height="12" rx="2" />
      <rect x="14" y="21" width="6" height="22" rx="2" />
      <rect x="20" y="29" width="24" height="6" rx="3" />
      <rect x="44" y="21" width="6" height="22" rx="2" />
      <rect x="50" y="26" width="8" height="12" rx="2" />
    </>
  ),
  legs: (
    <path d="M23 10c-3 0-6 2-6 6 0 7 3 11 3 17 0 5-2 8-2 13 0 3 2 5 5 5s5-2 5-5c0-5 2-11 3-16 1 5 3 11 3 16 0 3 2 5 5 5s5-2 5-5c0-5-2-8-2-13 0-6 3-10 3-17 0-4-3-6-6-6H23z" />
  ),
  core: (
    <>
      <rect x="19" y="12" width="11" height="11" rx="3" />
      <rect x="34" y="12" width="11" height="11" rx="3" />
      <rect x="19" y="26" width="11" height="11" rx="3" />
      <rect x="34" y="26" width="11" height="11" rx="3" />
      <rect x="19" y="40" width="11" height="11" rx="3" />
      <rect x="34" y="40" width="11" height="11" rx="3" />
    </>
  ),
}

export function MuscleArt({ group }: { group: MuscleGroupId }) {
  return (
    <svg className="muscle-svg" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
      {ART[group]}
    </svg>
  )
}

// Dekorativ hantel för hero-bannern.
export function HeroArt() {
  return (
    <svg className="hero-svg" viewBox="0 0 120 120" fill="currentColor" aria-hidden="true">
      <g transform="rotate(-30 60 60)">
        <rect x="4" y="50" width="14" height="20" rx="4" />
        <rect x="18" y="42" width="10" height="36" rx="4" />
        <rect x="28" y="54" width="64" height="12" rx="6" />
        <rect x="92" y="42" width="10" height="36" rx="4" />
        <rect x="102" y="50" width="14" height="20" rx="4" />
      </g>
    </svg>
  )
}
