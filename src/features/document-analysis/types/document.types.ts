export interface DocumentFile {
  id: string;
  file: File;
  preview: string;
  status: DocumentStatus;
  uploadProgress: number;
  validationErrors: ValidationError[];
  extractedData?: ExtractedData;
}

export type DocumentStatus = 
  | 'idle'
  | 'hovering'
  | 'uploading'
  | 'processing'
  | 'success'
  | 'error';

export interface ValidationError {
  type: 'format' | 'size' | 'dimensions';
  message: string;
}

export interface ExtractedData {
  name?: string;
  documentNumber?: string;
  dateIssued?: string;
  confidence: number;
  rawText: string;
}

export interface DocumentUploadConfig {
  maxSize: number; // in bytes
  minWidth: number;
  minHeight: number;
  acceptedFormats: string[];
}

export const DEFAULT_UPLOAD_CONFIG: DocumentUploadConfig = {
  maxSize: 10 * 1024 * 1024, // 10MB
  minWidth: 800,
  minHeight: 600,
  acceptedFormats: ['image/jpeg', 'image/png', 'image/heic', 'application/pdf']
};
