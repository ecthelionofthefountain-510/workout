// Ett enskilt set: så många reps med den här vikten, loggat ett visst datum.
export interface SetEntry {
  id: string
  date: string // ISO-datum, t.ex. "2026-08-01"
  reps: number
  weight: number // i kg
}

import type { MuscleGroupId } from './catalog'

// En övning (t.ex. "Marklyft") med alla loggade set.
export interface Exercise {
  id: string
  name: string
  group?: MuscleGroupId // vilken muskelgrupp övningen tillhör (om vald ur katalogen)
  sets: SetEntry[]
}
