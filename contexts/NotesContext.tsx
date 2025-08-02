"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface Note {
  id: string
  content: string
  author: string
  timestamp: Date
  isPrivate: boolean
  verificationId?: string
}

interface NotesContextType {
  notes: Note[]
  addNote: (note: Omit<Note, "id" | "timestamp">) => void
  deleteNote: (id: string) => void
  togglePrivacy: (id: string) => void
  getNotesByVerification: (verificationId: string) => Note[]
  editNote: (id: string, updatedFields: Partial<Omit<Note, "id" | "timestamp">>) => void
}

const NotesContext = createContext<NotesContextType | undefined>(undefined)

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([])

  function generateId() {
    return (
      Date.now().toString(36) +
      Math.random().toString(36).substr(2, 9)
    );
  }

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes")
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        timestamp: new Date(note.timestamp)
      })))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addNote = (note: Omit<Note, "id" | "timestamp">) => {
    const newNote: Note = {
      ...note,
      id: generateId(),
      timestamp: new Date()
    }
    setNotes(prev => [newNote, ...prev])
  }

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id))
  }

  const togglePrivacy = (id: string) => {
    setNotes(prev => prev.map(note =>
      note.id === id ? { ...note, isPrivate: !note.isPrivate } : note
    ))
  }

  const editNote = (id: string, updatedFields: Partial<Omit<Note, "id" | "timestamp">>) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, ...updatedFields } : note
      )
    );
  };

  const getNotesByVerification = (verificationId: string) => {
    return notes
      .filter(note => note.verificationId === verificationId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  return (
    <NotesContext.Provider value={{
      notes,
      addNote,
      deleteNote,
      togglePrivacy,
      getNotesByVerification,
      editNote
    }}>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotes() {
  const context = useContext(NotesContext)
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider")
  }
  return context
}