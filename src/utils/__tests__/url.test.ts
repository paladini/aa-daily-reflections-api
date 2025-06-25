import { buildApiUrl } from '../url';

describe('URL Utils', () => {
  describe('buildApiUrl', () => {
    it('should build URL for English (default)', () => {
      const url = buildApiUrl(6, 25, 'en');
      expect(url).toBe('https://www.aa.org/api/reflections/06/25');
    });

    it('should build URL for Spanish', () => {
      const url = buildApiUrl(6, 25, 'es');
      expect(url).toBe('https://www.aa.org/es/api/reflections/06/25');
    });

    it('should build URL for French', () => {
      const url = buildApiUrl(6, 25, 'fr');
      expect(url).toBe('https://www.aa.org/fr/api/reflections/06/25');
    });

    it('should pad single digit months and days', () => {
      const url = buildApiUrl(1, 5, 'en');
      expect(url).toBe('https://www.aa.org/api/reflections/01/05');
    });
  });
});
