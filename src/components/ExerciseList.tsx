import type { Exercise } from '../types'

interface Props {
  exercises: Exercise[]
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

export function ExerciseList({ exercises, onSelect, onDelete }: Props) {
  if (exercises.length === 0) {
    return <p className="empty">Inga övningar än. Lägg till din första ovan! 💪</p>
  }

  return (
    <ul className="exercise-list">
      {exercises.map((exercise) => (
        <li key={exercise.id} className="card exercise-row">
          <button className="exercise-name" onClick={() => onSelect(exercise.id)}>
            <span>{exercise.name}</span>
            <span className="badge">{exercise.sets.length} set</span>
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
