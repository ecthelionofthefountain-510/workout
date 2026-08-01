import { useState } from 'react'
import type { Exercise, SetEntry } from './types'
import { useLocalStorage } from './useLocalStorage'
import { AddExerciseForm } from './components/AddExerciseForm'
import { ExerciseList } from './components/ExerciseList'
import { ExerciseDetail } from './components/ExerciseDetail'

export default function App() {
  const [exercises, setExercises] = useLocalStorage<Exercise[]>('workout.exercises', [])
  // Vilken övning som är öppen just nu (null = startvyn med listan).
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = exercises.find((e) => e.id === selectedId) ?? null

  function addExercise(name: string) {
    const exercise: Exercise = { id: crypto.randomUUID(), name, sets: [] }
    setExercises((prev) => [...prev, exercise])
  }

  function deleteExercise(id: string) {
    setExercises((prev) => prev.filter((e) => e.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  function addSet(exerciseId: string, reps: number, weight: number) {
    const set: SetEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      reps,
      weight,
    }
    setExercises((prev) =>
      prev.map((e) => (e.id === exerciseId ? { ...e, sets: [set, ...e.sets] } : e)),
    )
  }

  function deleteSet(exerciseId: string, setId: string) {
    setExercises((prev) =>
      prev.map((e) =>
        e.id === exerciseId ? { ...e, sets: e.sets.filter((s) => s.id !== setId) } : e,
      ),
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏋️ Träningslogg</h1>
      </header>

      <main>
        {selected ? (
          <ExerciseDetail
            exercise={selected}
            onBack={() => setSelectedId(null)}
            onAddSet={addSet}
            onDeleteSet={deleteSet}
          />
        ) : (
          <>
            <AddExerciseForm onAdd={addExercise} />
            <ExerciseList
              exercises={exercises}
              onSelect={setSelectedId}
              onDelete={deleteExercise}
            />
          </>
        )}
      </main>
    </div>
  )
}
