import { useState } from 'react'
import type { Exercise, SetEntry } from './types'
import type { CatalogExercise, MuscleGroupId } from './catalog'
import { useLocalStorage } from './useLocalStorage'
import { Home } from './components/Home'
import { GroupScreen } from './components/GroupScreen'
import { ExerciseDetail } from './components/ExerciseDetail'
import { HeroArt } from './components/MuscleArt'

// Vilken skärm som visas just nu.
type View =
  | { screen: 'home' }
  | { screen: 'group'; group: MuscleGroupId }
  | { screen: 'exercise'; id: string }

export default function App() {
  const [exercises, setExercises] = useLocalStorage<Exercise[]>('workout.exercises', [])
  const [view, setView] = useState<View>({ screen: 'home' })

  function addCustomExercise(name: string) {
    const exercise: Exercise = { id: crypto.randomUUID(), name, sets: [] }
    setExercises((prev) => [...prev, exercise])
    setView({ screen: 'exercise', id: exercise.id })
  }

  function openCatalogExercise(cat: CatalogExercise) {
    const existing = exercises.find(
      (e) => e.name.toLowerCase() === cat.name.toLowerCase(),
    )
    if (existing) {
      setView({ screen: 'exercise', id: existing.id })
      return
    }
    const exercise: Exercise = {
      id: crypto.randomUUID(),
      name: cat.name,
      group: cat.group,
      sets: [],
    }
    setExercises((prev) => [...prev, exercise])
    setView({ screen: 'exercise', id: exercise.id })
  }

  function deleteExercise(id: string) {
    setExercises((prev) => prev.filter((e) => e.id !== id))
    setView({ screen: 'home' })
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

  // Tillbaka: från en övning går vi till dess muskelgrupp (om den har en),
  // annars till startsidan.
  function goBack() {
    if (view.screen === 'exercise') {
      const exercise = exercises.find((e) => e.id === view.id)
      setView(exercise?.group ? { screen: 'group', group: exercise.group } : { screen: 'home' })
    } else {
      setView({ screen: 'home' })
    }
  }

  const selected =
    view.screen === 'exercise' ? exercises.find((e) => e.id === view.id) ?? null : null

  return (
    <div className="app">
      <header className="topbar" onClick={() => setView({ screen: 'home' })}>
        <span className="brand-mark">
          <HeroArt />
        </span>
        <span className="brand-name">Träningslogg</span>
      </header>

      <main>
        {view.screen === 'home' && (
          <Home
            exercises={exercises}
            onOpenGroup={(group) => setView({ screen: 'group', group })}
            onOpenExercise={(id) => setView({ screen: 'exercise', id })}
            onAddCustom={addCustomExercise}
            onDeleteExercise={deleteExercise}
          />
        )}

        {view.screen === 'group' && (
          <GroupScreen
            group={view.group}
            exercises={exercises}
            onBack={goBack}
            onPick={openCatalogExercise}
          />
        )}

        {selected && (
          <ExerciseDetail
            exercise={selected}
            onBack={goBack}
            onAddSet={addSet}
            onDeleteSet={deleteSet}
          />
        )}
      </main>
    </div>
  )
}
