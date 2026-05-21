const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api';

export const api = {
  baseUrl: API_URL,

  async healthCheck(): Promise<{ status: string }> {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      throw new Error('API no disponible');
    }
    return response.json();
  },
};
