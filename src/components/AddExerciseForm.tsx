import { useState } from 'react'

interface Props {
  onAdd: (name: string) => void
}

export function AddExerciseForm({ onAdd }: Props) {
  const [name, setName] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setName('')
  }

  return (
    <form className="card add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ny övning, t.ex. Marklyft"
        value={name}
        onChange={(e) => setName(e.target.value)}
        aria-label="Övningens namn"
      />
      <button type="submit">Lägg till</button>
    </form>
  )
}
