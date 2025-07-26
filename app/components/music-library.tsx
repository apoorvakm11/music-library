import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Music, Plus, Search, SortAsc, Trash2 } from "lucide-react"
import { useMemo, useState } from "react"
import { useAuth } from "../contexts/auth-context"

interface Song {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  year: number
  genre: string
}

const INITIAL_SONGS: Song[] = [
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: "5:55",
    year: 1975,
    genre: "Rock",
  },
  {
    id: "2",
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    duration: "6:30",
    year: 1976,
    genre: "Rock",
  },
  { id: "3", title: "Imagine", artist: "John Lennon", album: "Imagine", duration: "3:07", year: 1971, genre: "Pop" },
  {
    id: "4",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    duration: "4:54",
    year: 1982,
    genre: "Pop",
  },
  {
    id: "5",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    duration: "5:01",
    year: 1991,
    genre: "Grunge",
  },
  {
    id: "6",
    title: "Sweet Child O Mine",
    artist: "Guns N Roses",
    album: "Appetite for Destruction",
    duration: "5:03",
    year: 1987,
    genre: "Rock",
  },
  {
    id: "7",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
    duration: "8:02",
    year: 1971,
    genre: "Rock",
  },
  {
    id: "8",
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    album: "Highway 61 Revisited",
    duration: "6:13",
    year: 1965,
    genre: "Folk Rock",
  },
]

export default function MusicLibrary() {
  const { user } = useAuth()
  const [songs, setSongs] = useState<Song[]>(INITIAL_SONGS)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState<"all" | "artist" | "album" | "genre">("all")
  const [sortBy, setSortBy] = useState<"title" | "artist" | "album" | "year">("title")
  const [groupBy, setGroupBy] = useState<"none" | "artist" | "album" | "genre">("none")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newSong, setNewSong] = useState<Omit<Song, "id">>({
    title: "",
    artist: "",
    album: "",
    duration: "",
    year: 2024,
    genre: "",
  })

  // Filter songs using JavaScript filter method
  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      const matchesSearch =
        searchTerm === "" ||
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.album.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesSearch
    })
  }, [songs, searchTerm])

  // Sort songs using JavaScript sort method
  const sortedSongs = useMemo(() => {
    return [...filteredSongs].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "artist":
          return a.artist.localeCompare(b.artist)
        case "album":
          return a.album.localeCompare(b.album)
        case "year":
          return a.year - b.year
        default:
          return 0
      }
    })
  }, [filteredSongs, sortBy])

  // Group songs using JavaScript reduce method
  const groupedSongs = useMemo(() => {
    if (groupBy === "none") {
      return { "All Songs": sortedSongs }
    }

    return sortedSongs.reduce(
      (groups, song) => {
        const key = song[groupBy as keyof Song].toString()
        if (!groups[key]) {
          groups[key] = []
        }
        groups[key].push(song)
        return groups
      },
      {} as Record<string, Song[]>,
    )
  }, [sortedSongs, groupBy])

  // Get unique values for filter options using map and Set
  const uniqueArtists = useMemo(() => [...new Set(songs.map((song) => song.artist))].sort(), [songs])

  const uniqueAlbums = useMemo(() => [...new Set(songs.map((song) => song.album))].sort(), [songs])

  const uniqueGenres = useMemo(() => [...new Set(songs.map((song) => song.genre))].sort(), [songs])

  const addSong = () => {
    if (user?.role !== "admin") return

    const song: Song = {
      ...newSong,
      id: Date.now().toString(),
    }
    setSongs((prev) => [...prev, song])
    setNewSong({ title: "", artist: "", album: "", duration: "", year: 2024, genre: "" })
    setIsAddDialogOpen(false)
  }

  const deleteSong = (id: string) => {
    if (user?.role !== "admin") return
    setSongs((prev) => prev.filter((song) => song.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Music Library</h2>
            <p className="text-gray-300">
              Total Songs: {songs.length} | Showing: {Object.values(groupedSongs).flat().length}
            </p>
          </div>

          {user?.role === "admin" && (
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Song
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Song</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" className="text-white">
                        Title
                      </Label>
                      <Input
                        id="title"
                        value={newSong.title}
                        onChange={(e) => setNewSong((prev) => ({ ...prev, title: e.target.value }))}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="artist" className="text-white">
                        Artist
                      </Label>
                      <Input
                        id="artist"
                        value={newSong.artist}
                        onChange={(e) => setNewSong((prev) => ({ ...prev, artist: e.target.value }))}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="album" className="text-white">
                        Album
                      </Label>
                      <Input
                        id="album"
                        value={newSong.album}
                        onChange={(e) => setNewSong((prev) => ({ ...prev, album: e.target.value }))}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="genre" className="text-white">
                        Genre
                      </Label>
                      <Input
                        id="genre"
                        value={newSong.genre}
                        onChange={(e) => setNewSong((prev) => ({ ...prev, genre: e.target.value }))}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration" className="text-white">
                        Duration
                      </Label>
                      <Input
                        id="duration"
                        placeholder="3:45"
                        value={newSong.duration}
                        onChange={(e) => setNewSong((prev) => ({ ...prev, duration: e.target.value }))}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year" className="text-white">
                        Year
                      </Label>
                      <Input
                        id="year"
                        type="number"
                        value={newSong.year}
                        onChange={(e) => setNewSong((prev) => ({ ...prev, year: Number.parseInt(e.target.value) }))}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                  <Button onClick={addSong} className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                    Add Song
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Search and Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search songs, artists, albums..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
          </div>

          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="title">Sort by Title</SelectItem>
              <SelectItem value="artist">Sort by Artist</SelectItem>
              <SelectItem value="album">Sort by Album</SelectItem>
              <SelectItem value="year">Sort by Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={groupBy} onValueChange={(value: any) => setGroupBy(value)}>
            <SelectTrigger className="bg-white/10 border-white/20 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="none">No Grouping</SelectItem>
              <SelectItem value="artist">Group by Artist</SelectItem>
              <SelectItem value="album">Group by Album</SelectItem>
              <SelectItem value="genre">Group by Genre</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/10 text-white">
              {Object.keys(groupedSongs).length} {groupBy === "none" ? "Total" : "Groups"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Songs Display */}
      <div className="space-y-6">
        {Object.entries(groupedSongs).map(([groupName, groupSongs]) => (
          <div key={groupName}>
            {groupBy !== "none" && (
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Music className="w-5 h-5" />
                {groupName} ({groupSongs.length} songs)
              </h3>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupSongs.map((song) => (
                <Card
                  key={song.id}
                  className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-white text-lg truncate group-hover:text-purple-300 transition-colors">
                          {song.title}
                        </CardTitle>
                        <p className="text-gray-300 text-sm truncate">{song.artist}</p>
                      </div>
                      {user?.role === "admin" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteSong(song.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Album:</span>
                        <span className="text-gray-300 truncate ml-2">{song.album}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-gray-300">{song.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Year:</span>
                        <span className="text-gray-300">{song.year}</span>
                      </div>
                      <div className="pt-2">
                        <Badge variant="outline" className="border-purple-400/50 text-purple-300 text-xs">
                          {song.genre}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {Object.values(groupedSongs).flat().length === 0 && (
        <div className="text-center py-12">
          <Music className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No songs found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
