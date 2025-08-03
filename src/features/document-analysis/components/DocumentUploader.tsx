'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileX, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { 
  DocumentFile, 
  DocumentStatus, 
  ValidationError, 
  DEFAULT_UPLOAD_CONFIG 
} from '../types/document.types';

interface DocumentUploaderProps {
  onFileUpload: (file: DocumentFile) => void;
  onFileRemove: (fileId: string) => void;
  uploadedFiles: DocumentFile[];
  className?: string;
}

export default function DocumentUploader({
  onFileUpload,
  onFileRemove,
  uploadedFiles,
  className
}: DocumentUploaderProps) {
  const [dragStatus, setDragStatus] = useState<DocumentStatus>('idle');

  const validateFile = useCallback((file: File): ValidationError[] => {
    const errors: ValidationError[] = [];

    // Validar formato
    if (!DEFAULT_UPLOAD_CONFIG.acceptedFormats.includes(file.type)) {
      errors.push({
        type: 'format',
        message: `Formato no soportado. Use: JPG, PNG, PDF, HEIC`
      });
    }

    // Validar tamaño
    if (file.size > DEFAULT_UPLOAD_CONFIG.maxSize) {
      errors.push({
        type: 'size',
        message: `Archivo muy grande. Máximo ${DEFAULT_UPLOAD_CONFIG.maxSize / (1024 * 1024)}MB`
      });
    }

    return errors;
  }, []);

  const validateImageDimensions = useCallback((file: File): Promise<ValidationError[]> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve([]);
        return;
      }

      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        const errors: ValidationError[] = [];
        
        if (img.width < DEFAULT_UPLOAD_CONFIG.minWidth || img.height < DEFAULT_UPLOAD_CONFIG.minHeight) {
          errors.push({
            type: 'dimensions',
            message: `Dimensiones muy pequeñas. Mínimo ${DEFAULT_UPLOAD_CONFIG.minWidth}x${DEFAULT_UPLOAD_CONFIG.minHeight}px`
          });
        }
        
        resolve(errors);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve([{
          type: 'format',
          message: 'No se pudo cargar la imagen'
        }]);
      };
      
      img.src = url;
    });
  }, []);

  const processFile = useCallback(async (file: File) => {
    const fileId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Validaciones básicas
    const basicErrors = validateFile(file);
    
    // Validaciones de dimensiones (async)
    const dimensionErrors = await validateImageDimensions(file);
    
    const allErrors = [...basicErrors, ...dimensionErrors];
    
    if (allErrors.length > 0) {
      const errorFile: DocumentFile = {
        id: fileId,
        file,
        preview: URL.createObjectURL(file),
        status: 'error',
        uploadProgress: 0,
        validationErrors: allErrors
      };
      
      onFileUpload(errorFile);
      
      // Mostrar errores
      allErrors.forEach(error => {
        toast.error(error.message);
      });
      
      return;
    }

    // Archivo válido - simular upload
    const validFile: DocumentFile = {
      id: fileId,
      file,
      preview: URL.createObjectURL(file),
      status: 'uploading',
      uploadProgress: 0,
      validationErrors: []
    };
    
    onFileUpload(validFile);
    
    // Simular progreso de upload
    const uploadInterval = setInterval(() => {
      validFile.uploadProgress += Math.random() * 30;
      
      if (validFile.uploadProgress >= 100) {
        validFile.uploadProgress = 100;
        validFile.status = 'success';
        clearInterval(uploadInterval);
        
        // Confetti de éxito
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        
        toast.success('¡Archivo subido exitosamente!');
      }
      
      onFileUpload({ ...validFile });
    }, 200);
    
  }, [validateFile, validateImageDimensions, onFileUpload]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setDragStatus('uploading');
    
    for (const file of acceptedFiles) {
      await processFile(file);
    }
    
    setDragStatus('idle');
  }, [processFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/heic': ['.heic'],
      'application/pdf': ['.pdf']
    },
    multiple: true,
    onDragEnter: () => setDragStatus('hovering'),
    onDragLeave: () => setDragStatus('idle')
  });

  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="h-8 w-8 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      case 'hovering':
        return <Upload className="h-8 w-8 text-blue-500 animate-bounce" />;
      default:
        return <Upload className="h-8 w-8 text-gray-400" />;
    }
  };

  const getStatusMessage = (status: DocumentStatus) => {
    switch (status) {
      case 'hovering':
        return 'Suelta los archivos aquí';
      case 'uploading':
        return 'Subiendo archivos...';
      case 'success':
        return '¡Archivos subidos!';
      case 'error':
        return 'Error en la subida';
      default:
        return 'Arrastra archivos aquí o haz clic para seleccionar';
    }
  };

  const currentStatus = isDragActive ? 'hovering' : dragStatus;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Zona de Drop */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
          {
            "border-gray-300 hover:border-gray-400": currentStatus === 'idle',
            "border-blue-500 bg-blue-50": currentStatus === 'hovering',
            "border-green-500 bg-green-50": currentStatus === 'success',
            "border-red-500 bg-red-50": currentStatus === 'error',
            "border-blue-400 bg-blue-25 animate-pulse": currentStatus === 'uploading'
          }
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {getStatusIcon(currentStatus)}
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              {getStatusMessage(currentStatus)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Soporta JPG, PNG, PDF, HEIC (máx. 10MB, mín. 800x600px)
            </p>
          </div>
        </div>
      </div>

      {/* Lista de archivos subidos */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">
            Archivos ({uploadedFiles.length})
          </h3>
          
          {uploadedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={file.preview}
                  alt={file.file.name}
                  className="w-10 h-10 object-cover rounded"
                />
                
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {file.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  
                  {file.validationErrors.length > 0 && (
                    <div className="mt-1">
                      {file.validationErrors.map((error, index) => (
                        <p key={index} className="text-xs text-red-600">
                          {error.message}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {file.status === 'uploading' && (
                  <div className="text-xs text-blue-600">
                    {Math.round(file.uploadProgress)}%
                  </div>
                )}
                
                {getStatusIcon(file.status)}
                
                <button
                  onClick={() => onFileRemove(file.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <FileX className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
