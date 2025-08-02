"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useNotes } from "@/contexts/NotesContext"

interface NoteFormProps {
  verificationId?: string
  onClose?: () => void
  initialData?: any
  isEdit?: boolean
}

export function NoteForm({ verificationId, onClose, initialData, isEdit = false }: NoteFormProps) {
  const { addNote, editNote } = useNotes()
  const [content, setContent] = useState(initialData?.content || "")
  const [isPrivate, setIsPrivate] = useState(initialData?.isPrivate || false)
  const [author, setAuthor] = useState(initialData?.author || "")
  const [error, setError] = useState("")
  const authorInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    authorInputRef.current?.focus()
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.()
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!author.trim() || !content.trim()) {
      setError("No puedes guardar una nota con campos vacíos.")
      return
    }
    if (isEdit && initialData?.id) {
      editNote(initialData.id, {
        content: content.trim(),
        author: author.trim(),
        isPrivate
      })
    } else {
      addNote({
        content: content.trim(),
        author: author.trim(),
        isPrivate,
        verificationId
      })
    }
    setContent("")
    setIsPrivate(false)
    setAuthor("")
    setError("")
    onClose?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-card text-foreground rounded-xl shadow-none">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Autor
        </label>
        <input
          ref={authorInputRef}
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Tu nombre"
          className="w-full px-3 py-2 border rounded-lg bg-background text-foreground"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Contenido de la nota
        </label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe tu nota aquí..."
          className="min-h-[100px] bg-background text-foreground"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="private-mode"
            checked={isPrivate}
            onCheckedChange={setIsPrivate}
          />
          <label
            htmlFor="private-mode"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Nota privada
          </label>
        </div>

        <div className="space-x-2">
          {onClose && (
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
          )}
          <Button type="submit">
            {isEdit ? 'Editar nota' : 'Guardar nota'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center">{error}</div>
      )}
    </form>
  )
}