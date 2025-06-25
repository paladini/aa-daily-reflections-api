import { HttpClient } from '../http-client';

// Mock fetch
global.fetch = jest.fn();

describe('HttpClient', () => {
  let httpClient: HttpClient;
  const mockUrl = 'https://www.aa.org/api/reflections/06/25';

  beforeEach(() => {
    httpClient = new HttpClient();
    (fetch as jest.Mock).mockClear();
  });

  describe('fetchData', () => {
    it('should fetch data successfully', async () => {
      const mockResponse = {
        method: 'GET',
        err: 200,
        data: '<html>test</html>'
      };

      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse
      });

      const result = await httpClient.fetchData(mockUrl);

      expect(fetch).toHaveBeenCalledWith(mockUrl, {
        headers: {
          'User-Agent': 'AA Daily Reflections Library - Please use responsibly',
          'Accept': 'application/json'
        }
      });

      expect(result).toEqual(mockResponse);
    });

    it('should handle HTTP errors', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(httpClient.fetchData(mockUrl)).rejects.toThrow('HTTP 404: Not Found');
    });

    it('should handle network errors', async () => {
      (fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      await expect(httpClient.fetchData(mockUrl)).rejects.toThrow('Network error');
    });
  });
});
