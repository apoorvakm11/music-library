import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Music, Shield, User } from "lucide-react"
import { useState } from "react"
import MusicLibrary from "./components/music-library"
import { AuthProvider, useAuth } from "./contexts/auth-context"

function LoginForm() {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const { login } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login(credentials.username, credentials.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4">
            <Music className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white">Music Library</CardTitle>
          <CardDescription className="text-gray-300">Sign in to access your music collection</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Enter password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-white font-semibold mb-2">Demo Credentials:</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Shield className="w-4 h-4" />
                <span>Admin: admin / admin123</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <User className="w-4 h-4" />
                <span>User: user / user123</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Dashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Music Library</h1>
              <p className="text-sm text-gray-300">Micro Frontend Architecture</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
              {user?.role === "admin" ? (
                <Shield className="w-4 h-4 text-purple-400" />
              ) : (
                <User className="w-4 h-4 text-blue-400" />
              )}
              <span className="text-white text-sm font-medium">{user?.username}</span>
              <span className="text-xs text-gray-400 bg-white/10 px-2 py-0.5 rounded-full">{user?.role}</span>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <MusicLibrary />
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

function AppContent() {
  const { user } = useAuth()

  return user ? <Dashboard /> : <LoginForm />
}

export default App
