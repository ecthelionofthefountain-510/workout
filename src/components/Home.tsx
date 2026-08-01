import type { Exercise } from '../types'
import type { MuscleGroupId } from '../catalog'
import { MUSCLE_GROUPS, CATALOG } from '../catalog'
import { MuscleArt, HeroArt } from './MuscleArt'
import { ExerciseList } from './ExerciseList'
import { AddExerciseForm } from './AddExerciseForm'

interface Props {
  exercises: Exercise[]
  onOpenGroup: (group: MuscleGroupId) => void
  onOpenExercise: (id: string) => void
  onAddCustom: (name: string) => void
  onDeleteExercise: (id: string) => void
}

export function Home({
  exercises,
  onOpenGroup,
  onOpenExercise,
  onAddCustom,
  onDeleteExercise,
}: Props) {
  const loggedSets = exercises.reduce((n, e) => n + e.sets.length, 0)

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <p className="hero-kicker">Redo att träna?</p>
          <h2 className="hero-title">Välj muskel&shy;grupp</h2>
          <p className="hero-sub">
            {CATALOG.length} övningar · {loggedSets} loggade set
          </p>
        </div>
        <span className="hero-art">
          <HeroArt />
        </span>
      </section>

      <p className="section-label">Muskelgrupper</p>
      <div className="group-grid">
        {MUSCLE_GROUPS.map((g) => {
          const count = CATALOG.filter((c) => c.group === g.id).length
          return (
            <button key={g.id} className="group-card" onClick={() => onOpenGroup(g.id)}>
              <span className="group-art">
                <MuscleArt group={g.id} />
              </span>
              <span className="group-name">{g.name}</span>
              <span className="group-count">{count} övningar</span>
            </button>
          )
        })}
      </div>

      {exercises.length > 0 && (
        <>
          <p className="section-label">Dina övningar</p>
          <ExerciseList
            exercises={exercises}
            onSelect={onOpenExercise}
            onDelete={onDeleteExercise}
          />
        </>
      )}

      <p className="section-label muted-label">Egen övning</p>
      <div className="custom-add">
        <AddExerciseForm onAdd={onAddCustom} />
      </div>
    </>
  )
}
