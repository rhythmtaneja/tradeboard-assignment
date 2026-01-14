export default function NoteList({ notes, onEdit, onDelete }) {
    if (!notes.length) {
      return <p className="text-gray-500">No trade notes yet.</p>
    }
  
    return (
      <div className="grid gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 rounded shadow"
          >
            <div className="flex justify-between">
              <h4 className="font-semibold">{note.title}</h4>
              <span className="text-sm text-gray-500">
                {note.risk_level}
              </span>
            </div>
  
            <p className="text-sm text-gray-600">
              Strategy: {note.strategy_type}
            </p>
  
            {note.description && (
              <p className="mt-2 text-gray-700">{note.description}</p>
            )}
  
            <div className="mt-3 flex gap-3 text-sm">
              <button
                onClick={() => onEdit(note)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(note.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
  