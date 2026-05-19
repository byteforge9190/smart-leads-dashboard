export interface SuccessResponse<T> {
  success: true;
  data: T;
  timestamp: Date;
  message: string;
}
export interface ErrorResponse {
  success: false;
  error: unknown;
  timestamp: Date;
  message: string;
}