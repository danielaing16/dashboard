'use client';

import { useState, useCallback } from 'react';
import { DocumentFile } from '../types/document.types';

export interface UseDocumentUploadReturn {
  uploadedFiles: DocumentFile[];
  addFile: (file: DocumentFile) => void;
  removeFile: (fileId: string) => void;
  updateFile: (fileId: string, updates: Partial<DocumentFile>) => void;
  clearFiles: () => void;
  getFileById: (fileId: string) => DocumentFile | undefined;
  hasErrors: boolean;
  successfulFiles: DocumentFile[];
  errorFiles: DocumentFile[];
}

export function useDocumentUpload(): UseDocumentUploadReturn {
  const [uploadedFiles, setUploadedFiles] = useState<DocumentFile[]>([]);

  const addFile = useCallback((file: DocumentFile) => {
    setUploadedFiles(prev => {
      const existingIndex = prev.findIndex(f => f.id === file.id);
      if (existingIndex >= 0) {
        // Actualizar archivo existente
        const updated = [...prev];
        updated[existingIndex] = file;
        return updated;
      }
      // Agregar nuevo archivo
      return [...prev, file];
    });
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.preview) {
        // Limpiar URL del preview para evitar memory leaks
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  }, []);

  const updateFile = useCallback((fileId: string, updates: Partial<DocumentFile>) => {
    setUploadedFiles(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { ...file, ...updates }
          : file
      )
    );
  }, []);

  const clearFiles = useCallback(() => {
    // Limpiar URLs de preview
    uploadedFiles.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    setUploadedFiles([]);
  }, [uploadedFiles]);

  const getFileById = useCallback((fileId: string) => {
    return uploadedFiles.find(file => file.id === fileId);
  }, [uploadedFiles]);

  // Computed values
  const hasErrors = uploadedFiles.some(file => file.status === 'error');
  const successfulFiles = uploadedFiles.filter(file => file.status === 'success');
  const errorFiles = uploadedFiles.filter(file => file.status === 'error');

  return {
    uploadedFiles,
    addFile,
    removeFile,
    updateFile,
    clearFiles,
    getFileById,
    hasErrors,
    successfulFiles,
    errorFiles
  };
}
