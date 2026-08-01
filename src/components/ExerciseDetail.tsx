import { useState } from 'react'
import type { Exercise } from '../types'

interface Props {
  exercise: Exercise
  onBack: () => void
  onAddSet: (exerciseId: string, reps: number, weight: number) => void
  onDeleteSet: (exerciseId: string, setId: string) => void
}

export function ExerciseDetail({ exercise, onBack, onAddSet, onDeleteSet }: Props) {
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const repsNum = Number(reps)
    const weightNum = Number(weight)
    if (!Number.isFinite(repsNum) || repsNum <= 0) return
    if (!Number.isFinite(weightNum) || weightNum < 0) return
    onAddSet(exercise.id, repsNum, weightNum)
    setReps('')
    setWeight('')
  }

  // Personligt rekord = tyngsta vikten som loggats för övningen.
  const heaviest = exercise.sets.reduce((max, s) => Math.max(max, s.weight), 0)

  return (
    <div>
      <button className="link-btn" onClick={onBack}>
        ← Tillbaka
      </button>

      <div className="detail-head">
        <h2>{exercise.name}</h2>
        {exercise.sets.length > 0 && (
          <p className="pr">Tyngsta: {heaviest} kg</p>
        )}
      </div>

      <form className="card log-form" onSubmit={handleSubmit}>
        <label>
          Reps
          <input
            type="number"
            inputMode="numeric"
            min="1"
            placeholder="8"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
          />
        </label>
        <label>
          Vikt (kg)
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.5"
            placeholder="60"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <button type="submit">Logga set</button>
      </form>

      {exercise.sets.length === 0 ? (
        <p className="empty">Inga set loggade än. Kör igång! 🔥</p>
      ) : (
        <ul className="set-list">
          {exercise.sets.map((set) => (
            <li key={set.id} className="card set-row">
              <span className="set-main">
                {set.reps} reps × {set.weight} kg
              </span>
              <span className="set-date">{set.date}</span>
              <button
                className="icon-btn"
                aria-label="Ta bort set"
                onClick={() => onDeleteSet(exercise.id, set.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
