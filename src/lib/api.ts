const API_BASE = 'https://dad9790da.preview.abacusai.app'; // NEW WORKING PREVIEW URL

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export class SynesisAPI {
  private token: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('synesis_token');
    }
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { skipAuth, ...fetchOptions } = options;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(fetchOptions.headers as Record<string, string>),
    };

    if (!skipAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ 
        message: response.statusText 
      }));
      throw new Error(error.message || `Error ${response.status}`);
    }

    return response.json();
  }

  async register(email: string, password: string, name: string) {
    const data = await this.request<{ access_token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      skipAuth: true,
    });
    this.token = data.access_token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('synesis_token', this.token);
      localStorage.setItem('synesis_user', JSON.stringify(data.user));
    }
    return data;
  }

  async login(email: string, password: string) {
    const data = await this.request<{ access_token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
    this.token = data.access_token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('synesis_token', this.token);
      localStorage.setItem('synesis_user', JSON.stringify(data.user));
    }
    return data;
  }

  logout() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('synesis_token');
      localStorage.removeItem('synesis_user');
    }
  }

  getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('synesis_user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  async createCheckout(tier: 'CONSULTANT' | 'PARTNER') {
    return this.request<{ sessionId: string; url: string }>('/payments/create-checkout', {
      method: 'POST',
      body: JSON.stringify({ tier }),
    });
  }

  async getPaymentHistory() {
    return this.request<any[]>('/payments/history');
  }

  async findAnalysisIdFromSession(sessionId: string): Promise<string | null> {
    const payments = await this.getPaymentHistory();
    const payment = payments.find((p: any) => p.stripe_session_id === sessionId);
    return payment?.analysis_id || null;
  }

  async getAnalysisStatus(analysisId: string) {
    return this.request<any>(`/api/analysis/${analysisId}/status`, { skipAuth: true });
  }

  async getAnalysisResult(analysisId: string) {
    return this.request<any>(`/api/analysis/${analysisId}`, { skipAuth: true });
  }

  async pollAnalysis(analysisId: string, onUpdate: (status: any) => void, interval: number = 5000): Promise<any> {
    const poll = async (): Promise<any> => {
      try {
        const status = await this.getAnalysisStatus(analysisId);
        onUpdate(status);
        if (status.status === 'completed') {
          return await this.getAnalysisResult(analysisId);
        }
        if (status.status === 'failed') {
          throw new Error('Análise falhou');
        }
        await new Promise(resolve => setTimeout(resolve, interval));
        return poll();
      } catch (error) {
        console.error('Polling error:', error);
        throw error;
      }
    };
    return poll();
  }

  async generateReport(analysisId: string) {
    return this.request<{ pdfBase64: string }>(`/reports/generate/${analysisId}`, { skipAuth: true });
  }

  downloadPDF(pdfBase64: string, filename: string) {
    const blob = new Blob([Uint8Array.from(atob(pdfBase64), c => c.charCodeAt(0))], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export const api = new SynesisAPI();
