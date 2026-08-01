import type { Exercise } from '../types'
import type { CatalogExercise, MuscleGroupId } from '../catalog'
import { CATALOG, groupName } from '../catalog'
import { MuscleArt } from './MuscleArt'

interface Props {
  group: MuscleGroupId
  exercises: Exercise[]
  onBack: () => void
  onPick: (cat: CatalogExercise) => void
}

export function GroupScreen({ group, exercises, onBack, onPick }: Props) {
  const items = CATALOG.filter((c) => c.group === group)

  return (
    <div>
      <button className="link-btn" onClick={onBack}>
        ← Tillbaka
      </button>

      <div className="group-head">
        <span className="group-head-art">
          <MuscleArt group={group} />
        </span>
        <h2>{groupName(group)}</h2>
      </div>

      <ul className="exercise-list">
        {items.map((cat) => {
          const logged = exercises.find(
            (e) => e.name.toLowerCase() === cat.name.toLowerCase(),
          )
          return (
            <li key={cat.name} className="exercise-card">
              <button className="exercise-card-main" onClick={() => onPick(cat)}>
                <span className="thumb">
                  <MuscleArt group={group} />
                </span>
                <span className="exercise-info">
                  <span className="exercise-title">{cat.name}</span>
                  <span className="exercise-meta">
                    {logged
                      ? `${logged.sets.length} set loggade`
                      : 'Tryck för att logga'}
                  </span>
                </span>
                <span className="chev">{logged ? '›' : '＋'}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
