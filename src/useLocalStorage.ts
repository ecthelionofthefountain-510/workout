import { useEffect, useState } from 'react'

// Liten hook som beter sig som useState, men sparar värdet i webbläsarens
// localStorage så att datan finns kvar när man laddar om sidan.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ? (JSON.parse(stored) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Om lagringen är full eller blockerad struntar vi i det tyst.
    }
  }, [key, value])

  return [value, setValue] as const
}
