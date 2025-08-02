"use client";
import { NoteList } from "@/components/notes/NoteList";
import { NotesProvider } from "@/contexts/NotesContext";
import { StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotasPage() {
  const router = useRouter();
  return (
    <NotesProvider>
      <div className="p-8 max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2" /> Regresar
        </Button>
        <main>
          <div className="mb-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <StickyNote className="w-12 h-12 text-blue-600 mb-2" />
              <h1 className="text-4xl font-bold tracking-tight">Notas</h1>
              <p className="text-gray-500 text-lg">
                Organiza y captura tus ideas, tareas y recordatorios.
              </p>
            </div>
          </div>
          <NoteList />
        </main>
      </div>
    </NotesProvider>
  );
}