import type { Exercise } from '../types'
import { MuscleArt } from './MuscleArt'

interface Props {
  exercises: Exercise[]
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

// Kort sammanfattning som visas under övningens namn i listan.
function summary(exercise: Exercise): React.ReactNode {
  if (exercise.sets.length === 0) return 'Inga set än'
  const heaviest = exercise.sets.reduce((max, s) => Math.max(max, s.weight), 0)
  return (
    <>
      {exercise.sets.length} set · Tyngsta <span className="hi">{heaviest} kg</span>
    </>
  )
}

export function ExerciseList({ exercises, onSelect, onDelete }: Props) {
  if (exercises.length === 0) {
    return (
      <p className="empty">
        <span className="big">💪</span>
        Inga övningar än.
        <br />
        Lägg till din första här ovan!
      </p>
    )
  }

  return (
    <ul className="exercise-list">
      {exercises.map((exercise) => (
        <li key={exercise.id} className="exercise-card">
          <button className="exercise-card-main" onClick={() => onSelect(exercise.id)}>
            <span className="thumb">
              {exercise.group ? (
                <MuscleArt group={exercise.group} />
              ) : (
                <span className="thumb-letter">{exercise.name.charAt(0)}</span>
              )}
            </span>
            <span className="exercise-info">
              <span className="exercise-title">{exercise.name}</span>
              <span className="exercise-meta">{summary(exercise)}</span>
            </span>
            <span className="chev">›</span>
          </button>
          <button
            className="icon-btn"
            aria-label={`Ta bort ${exercise.name}`}
            onClick={() => onDelete(exercise.id)}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  )
}
