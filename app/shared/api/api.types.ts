export type ApiResponse<T> = {
  statusCode: number;
  statusMessage: string;
  data: T;
};