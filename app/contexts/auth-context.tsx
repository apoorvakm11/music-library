import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  id: string
  username: string
  role: "admin" | "user"
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database
const MOCK_USERS = [
  { id: "1", username: "admin", password: "admin123", role: "admin" as const },
  { id: "2", username: "user", password: "user123", role: "user" as const },
]

// Simple JWT mock
const createMockJWT = (user: User) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      username: user.username,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }),
  )
  const signature = btoa("mock-signature")
  return `${header}.${payload}.${signature}`
}

const parseJWT = (token: string): User | null => {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    const payload = JSON.parse(atob(parts[1]))
    if (payload.exp < Date.now()) return null

    return {
      id: payload.sub,
      username: payload.username,
      role: payload.role,
    }
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("auth-token")
    if (token) {
      const userData = parseJWT(token)
      if (userData) {
        setUser(userData)
      } else {
        localStorage.removeItem("auth-token")
      }
    }
  }, [])

  const login = (username: string, password: string): boolean => {
    const foundUser = MOCK_USERS.find((u) => u.username === username && u.password === password)

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
      }

      const token = createMockJWT(userData)
      localStorage.setItem("auth-token", token)
      setUser(userData)
      return true
    }

    return false
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
