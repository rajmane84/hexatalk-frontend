import axios from 'axios';

export type NormalizedApiError = {
  message: string;
  status: number | null;
  isNetworkError: boolean;
  originalError: unknown;
};

export function handleApiError(error: unknown): NormalizedApiError {
  const normalizedError: NormalizedApiError = {
    message: 'Something went wrong',
    status: null,
    isNetworkError: false,
    originalError: error,
  };

  if (axios.isAxiosError(error)) {
    // Network error (no response from server)
    if (!error.response) {
      normalizedError.message =
        error.message || 'Network error. Please check your connection.';
      normalizedError.isNetworkError = true;

      return normalizedError;
    }

    // Server responded with error
    normalizedError.status = error.response.status;
    normalizedError.message =
      (error.response.data as any)?.message ||
      error.response.statusText ||
      'Request failed';

    return normalizedError;
  }

  if (error instanceof TypeError) {
    normalizedError.message = 'Network error. Please check your connection.';
    normalizedError.isNetworkError = true;
    return normalizedError;
  }

  if (error instanceof Error) {
    normalizedError.message = error.message;
    return normalizedError;
  }

  return normalizedError;
}
