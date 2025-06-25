import { ApiResponse } from '../types';

/**
 * Handles HTTP requests with proper error handling
 */
export class HttpClient {
  private async getDynamicFetch(): Promise<typeof fetch> {
    // Use native fetch in Node 18+ or import node-fetch for older versions
    if (typeof fetch !== 'undefined') {
      return fetch;
    }
    
    try {
      const { default: fetch } = await import('node-fetch') as any;
      return fetch;
    } catch {
      throw new Error('Fetch is not available. Please upgrade to Node.js 18+ or install node-fetch');
    }
  }

  async fetchData(url: string): Promise<ApiResponse> {
    const fetch = await this.getDynamicFetch();
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'AA Daily Reflections Library - Please use responsibly',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json() as Promise<ApiResponse>;
  }
}
