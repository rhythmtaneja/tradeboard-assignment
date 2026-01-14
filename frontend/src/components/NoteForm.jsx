import { useState, useEffect } from "react"

export default function NoteForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    strategy_type: "",
    risk_level: "Low",
    description: "",
  })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  
  const [submitting, setSubmitting] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    await onSubmit(form)
    setSubmitting(false)
    setForm({
      title: "",
      strategy_type: "",
      risk_level: "Low",
      description: "",
    })
  }
  

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-3">
        {initialData ? "Edit Note" : "Add Trade Note"}
      </h3>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        name="strategy_type"
        placeholder="Strategy Type (e.g. Scalping)"
        value={form.strategy_type}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <select
        name="risk_level"
        value={form.risk_level}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <div className="flex gap-2">
      <button
      disabled={submitting}
      className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">
        {submitting ? "Saving..." : initialData ? "Update" : "Add"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          
        )}
      </div>
    </form>
  )
}
