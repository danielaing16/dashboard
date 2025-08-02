"use client"

import { useState, useEffect } from "react"
import { useNotes } from "@/contexts/NotesContext"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, Lock, Globe, Trash2, Pencil } from "lucide-react"
import { NoteForm } from "./NoteForm"
import { cn } from "@/lib/utils"

interface NoteListProps {
  verificationId?: string
}

export function NoteList({ verificationId }: NoteListProps) {
  const { notes, deleteNote, togglePrivacy } = useNotes()
  const [showForm, setShowForm] = useState(false)
  const [editingNote, setEditingNote] = useState<string | null>(null)
  const [filterPrivacy, setFilterPrivacy] = useState<string>("all")
  const [sortOrder, setSortOrder] = useState<string>("desc")

  useEffect(() => {
    if (editingNote && !notes.find(n => n.id === editingNote)) {
      setEditingNote(null)
    }
  }, [notes, editingNote])

  // Filtro y ordenamiento
  let filteredNotes = verificationId
    ? notes.filter(note => note.verificationId === verificationId)
    : notes

  if (filterPrivacy !== "all") {
    filteredNotes = filteredNotes.filter(note =>
      filterPrivacy === "private" ? note.isPrivate : !note.isPrivate
    )
  }

  filteredNotes = [...filteredNotes].sort((a, b) =>
    sortOrder === "desc"
      ? b.timestamp.getTime() - a.timestamp.getTime()
      : a.timestamp.getTime() - b.timestamp.getTime()
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notas</h2>
        <Button
          variant="outline"
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Añadir nota
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <select
          value={filterPrivacy}
          onChange={e => setFilterPrivacy(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">Todas</option>
          <option value="public">Públicas</option>
          <option value="private">Privadas</option>
        </select>
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="desc">Más recientes</option>
          <option value="asc">Más antiguas</option>
        </select>
      </div>

      {showForm && (
        <NoteForm
          verificationId={verificationId}
          onClose={() => setShowForm(false)}
        />
      )}

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-4">
          {filteredNotes.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No hay notas para mostrar.</div>
          ) : (
            filteredNotes.map(note => (
              <div
                key={note.id}
                className={cn(
                  "rounded-2xl p-6 flex flex-col gap-2 shadow-md transition-all",
                  note.isPrivate
                    ? "bg-zinc-900 text-white"
                    : "bg-blue-100 text-black"
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-200 text-blue-700 font-bold text-lg">
                    {note.author?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="flex-1">
                    <span className="font-semibold">{note.author}</span>
                    <div className="text-xs opacity-70">
                      {note.timestamp.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold",
                        note.isPrivate
                          ? "bg-zinc-800 text-white"
                          : "bg-blue-500 text-white"
                      )}
                    >
                      {note.isPrivate ? "Privada" : "Pública"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-blue-500"
                    onClick={() => setEditingNote(note.id)}
                    title="Editar nota"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-red-500"
                    onClick={() => {
                      if (window.confirm("¿Seguro que deseas eliminar esta nota?")) {
                        deleteNote(note.id)
                      }
                    }}
                    title="Eliminar nota"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {!note.isPrivate ? (
                  <p className="whitespace-pre-wrap text-base">
                    {note.content}
                  </p>
                ) : (
                  <p className="italic text-gray-400">Contenido privado</p>
                )}
                {editingNote === note.id && (
                  <NoteForm
                    verificationId={note.verificationId}
                    onClose={() => setEditingNote(null)}
                    initialData={note}
                    isEdit
                  />
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}