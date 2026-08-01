import { useState } from 'react'
import type { Exercise } from '../types'
import { MuscleArt } from './MuscleArt'

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

  // Statistik för övningen.
  const heaviest = exercise.sets.reduce((max, s) => Math.max(max, s.weight), 0)
  const totalVolume = exercise.sets.reduce((sum, s) => sum + s.reps * s.weight, 0)

  return (
    <div>
      <button className="link-btn" onClick={onBack}>
        ← Tillbaka
      </button>

      <div className="detail-head">
        {exercise.group && (
          <span className="detail-art">
            <MuscleArt group={exercise.group} />
          </span>
        )}
        <h2>{exercise.name}</h2>
      </div>

      {exercise.sets.length > 0 && (
        <div className="stat-row">
          <div className="stat-tile">
            <span className="stat-value">{heaviest}</span>
            <span className="stat-label">Tyngsta (kg)</span>
          </div>
          <div className="stat-tile">
            <span className="stat-value">{exercise.sets.length}</span>
            <span className="stat-label">Set</span>
          </div>
          <div className="stat-tile">
            <span className="stat-value">{totalVolume}</span>
            <span className="stat-label">Volym (kg)</span>
          </div>
        </div>
      )}

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
        <p className="empty">
          <span className="big">🔥</span>
          Inga set loggade än. Kör igång!
        </p>
      ) : (
        <ul className="set-list">
          {exercise.sets.map((set, index) => (
            <li
              key={set.id}
              className={`card set-row${index === 0 ? ' set-row--latest' : ''}`}
            >
              <span className="set-index">{exercise.sets.length - index}</span>
              <span className="set-main">
                {set.reps} reps × <span className="weight">{set.weight} kg</span>
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
