import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import { logout } from "../utils/auth"
import { fetchNotes, createNote, updateNote, deleteNote } from "../services/notes"
import NoteForm from "../components/NoteForm"
import NoteList from "../components/NoteList"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([])
  const [editingNote, setEditingNote] = useState(null)
  const [search, setSearch] = useState("")
  const [risk, setRisk] = useState("")
  const [loadingNotes, setLoadingNotes] = useState(false)


  const navigate = useNavigate()

  useEffect(() => {
    api.get("/profile")
      .then((res) => setUser(res.data))
      .catch(() => {
        logout()
        navigate("/login")
      })
  }, [])

  const loadNotes = async () => {
    setLoadingNotes(true)
    try {
      const res = await fetchNotes({ search, risk })
      setNotes(res.data)
    } finally {
      setLoadingNotes(false)
    }
  }
  

  useEffect(() => {
    loadNotes()
  }, [search, risk])

  const handleCreate = async (data) => {
    await createNote(data)
    loadNotes()
  }

  const handleUpdate = async (data) => {
    await updateNote(editingNote.id, data)
    setEditingNote(null)
    loadNotes()
  }

  const handleDelete = async (id) => {
    await deleteNote(id)
    loadNotes()
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="bg-white shadow p-4 flex justify-between">
        <h1 className="font-bold text-lg">TradeBoard</h1>
        <button onClick={handleLogout} className="text-red-600">
          Logout
        </button>
      </div>

      <div className="p-6 max-w-3xl mx-auto">
        {user && (
          <p className="mb-4">
            Welcome, <span className="font-semibold">{user.name}</span>
          </p>
        )}

        <NoteForm
          onSubmit={editingNote ? handleUpdate : handleCreate}
          initialData={editingNote}
          onCancel={() => setEditingNote(null)}
        />

        {/* Search & Filter */}
        <div className="flex gap-3 mb-4">
          <input
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <select
            value={risk}
            onChange={(e) => setRisk(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        
        {loadingNotes ? (
          <p className="text-gray-500">Loading notes...</p>
        ) : (
        <NoteList
          notes={notes}
          onEdit={setEditingNote}
          onDelete={handleDelete}
        />
      )}
      </div>
    </div>
  )
}
