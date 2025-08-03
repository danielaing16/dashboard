'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';
import DocumentUploader from '@/src/features/document-analysis/components/DocumentUploader';
import { useDocumentUpload } from '@/src/features/document-analysis/hooks/useDocumentUpload';

export default function DocumentAnalysisPage() {
  const {
    uploadedFiles,
    addFile,
    removeFile,
    clearFiles,
    hasErrors,
    successfulFiles,
    errorFiles
  } = useDocumentUpload();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Análisis de Documentos
          </h1>
          <p className="text-gray-600">
            Sube documentos para análisis inteligente con IA
          </p>
        </div>

        {/* Stats */}
        {uploadedFiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">
                {uploadedFiles.length}
              </div>
              <div className="text-sm text-gray-600">Total de archivos</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">
                {successfulFiles.length}
              </div>
              <div className="text-sm text-gray-600">Exitosos</div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600">
                {errorFiles.length}
              </div>
              <div className="text-sm text-gray-600">Con errores</div>
            </div>
          </div>
        )}

        {/* Document Uploader */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <DocumentUploader
            onFileUpload={addFile}
            onFileRemove={removeFile}
            uploadedFiles={uploadedFiles}
          />
        </div>

        {/* Actions */}
        {uploadedFiles.length > 0 && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={clearFiles}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Limpiar todo
            </button>
            
            {successfulFiles.length > 0 && (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => {
                  // Aquí iría la lógica para procesar con IA
                  console.log('Procesando archivos con IA...', successfulFiles);
                }}
              >
                Procesar con IA ({successfulFiles.length})
              </button>
            )}
          </div>
        )}

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && uploadedFiles.length > 0 && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Debug Info:</h3>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(uploadedFiles.map(f => ({
                id: f.id,
                name: f.file.name,
                status: f.status,
                progress: f.uploadProgress,
                errors: f.validationErrors
              })), null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}
