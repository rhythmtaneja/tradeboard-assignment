import api from "./api"

export const fetchNotes = (params = {}) => {
  return api.get("/notes", { params })
}

export const createNote = (data) => {
  return api.post("/notes", data)
}

export const updateNote = (id, data) => {
  return api.put(`/notes/${id}`, data)
}

export const deleteNote = (id) => {
  return api.delete(`/notes/${id}`)
}
