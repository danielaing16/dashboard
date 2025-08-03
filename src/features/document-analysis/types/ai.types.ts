export interface AIProcessingRequest {
  imageData: string; // base64 encoded image
  documentType?: string;
  extractionFields: string[];
}

export interface AIProcessingResponse {
  success: boolean;
  extractedData: ExtractedData;
  confidence: number;
  processingTime: number;
  error?: string;
}

export interface ExtractedData {
  name?: string;
  documentNumber?: string;
  dateIssued?: string;
  expirationDate?: string;
  address?: string;
  additionalFields: Record<string, any>;
}

export interface AIProcessingStatus {
  status: 'idle' | 'processing' | 'completed' | 'error';
  progress: number;
  message: string;
  startTime?: number;
  endTime?: number;
}
