import { useState } from "react";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;

    if (editingId) {
      // Update existing note
      setNotes(
        notes.map((note) =>
          note.id === editingId ? { ...note, title, content } : note
        )
      );
      setEditingId(null);
    } else {
      // Create new note
      setNotes([
        { id: Date.now(), title, content },
        ...notes,
      ]);
    }

    setTitle("");
    setContent("");
    setShowForm(false);
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    // If you were editing the note you just deleted, close the form too
    if (editingId === id) {
      setEditingId(null);
      setTitle("");
      setContent("");
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div>
      {/* Intro write-up */}
      <div className="px-6 md:px-16 lg:px-24 pt-8 pb-4">
        <h1 className="text-black font-bold text-2xl mb-2">
          Hello, Notes.
        </h1>
        <p className="text-gray-500 max-w-2xl">
          A simple place to create, organize, and manage your study notes.
        </p>
      </div>

      {/* Notes content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Notes</h1>
         <button
  onClick={() => {
    if (showForm) {
      handleCancel();
    } else {
      setShowForm(true);
    }
  }}
  className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600"
>
  {showForm ? "Cancel" : "New Note"}
</button>
        </div>

        {showForm && (
          <div className="border border-gray-200 rounded-xl p-4 mb-6 bg-white shadow-sm">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-b border-gray-200 pb-2 mb-3 text-lg font-medium outline-none"
            />
            <textarea
              placeholder="Write your notes here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full outline-none resize-none text-sm text-gray-700"
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-[#3F3B36] text-white text-sm font-medium hover:opacity-90"
              >
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {notes.length === 0 && !showForm && (
            <p className="text-sm text-gray-400">No notes yet. Click "New Note" to add one.</p>
          )}
          {notes.map((note) => (
            <div
              key={note.id}
              className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-medium mb-1">{note.title || "Untitled"}</h3>
                <div className="flex gap-3 ml-3 shrink-0">
                  <button
                    onClick={() => handleEdit(note)}
                    className="text-xs text-[#B08968] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}