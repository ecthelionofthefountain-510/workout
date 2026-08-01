// Muskelgrupper och en katalog av färdiga övningar som visas på startsidan.
// Ändra fritt här – lägg till/ta bort övningar eller byt namn som du vill.

export type MuscleGroupId = 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core'

export interface MuscleGroup {
  id: MuscleGroupId
  name: string
}

export interface CatalogExercise {
  name: string
  group: MuscleGroupId
}

export const MUSCLE_GROUPS: MuscleGroup[] = [
  { id: 'chest', name: 'Bröst' },
  { id: 'back', name: 'Rygg' },
  { id: 'shoulders', name: 'Axlar' },
  { id: 'arms', name: 'Armar' },
  { id: 'legs', name: 'Ben' },
  { id: 'core', name: 'Mage' },
]

export const CATALOG: CatalogExercise[] = [
  // Bröst
  { name: 'Bänkpress', group: 'chest' },
  { name: 'Hantelpress', group: 'chest' },
  { name: 'Kabelflyes', group: 'chest' },
  // Rygg
  { name: 'Marklyft', group: 'back' },
  { name: 'Latsdrag', group: 'back' },
  { name: 'Skivstångsrodd', group: 'back' },
  // Axlar
  { name: 'Axelpress', group: 'shoulders' },
  { name: 'Sidolyft', group: 'shoulders' },
  { name: 'Face pull', group: 'shoulders' },
  // Armar
  { name: 'Bicepscurl', group: 'arms' },
  { name: 'Triceps pushdown', group: 'arms' },
  { name: 'Hammercurl', group: 'arms' },
  // Ben
  { name: 'Knäböj', group: 'legs' },
  { name: 'Benpress', group: 'legs' },
  { name: 'Rumänsk marklyft', group: 'legs' },
  // Mage
  { name: 'Plankan', group: 'core' },
  { name: 'Hängande benlyft', group: 'core' },
  { name: 'Russian twist', group: 'core' },
]

export function groupName(id: MuscleGroupId): string {
  return MUSCLE_GROUPS.find((g) => g.id === id)?.name ?? id
}
