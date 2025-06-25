import DailyReflections, { Language } from './index';

describe('DailyReflections - Integration', () => {
  let client: DailyReflections;

  beforeEach(() => {
    client = new DailyReflections();
  });

  describe('Language handling', () => {
    it('should initialize with default language', () => {
      expect(client.getLanguage()).toBe('en');
    });

    it('should allow setting different languages', () => {
      client.setLanguage('es');
      expect(client.getLanguage()).toBe('es');

      client.setLanguage('fr');
      expect(client.getLanguage()).toBe('fr');
    });
  });

  describe('Date validation', () => {
    it('should reject invalid months', async () => {
      await expect(client.getReflection(0, 15)).rejects.toThrow('Month must be between 1 and 12');
      await expect(client.getReflection(13, 15)).rejects.toThrow('Month must be between 1 and 12');
    });

    it('should reject invalid days', async () => {
      await expect(client.getReflection(6, 0)).rejects.toThrow('Day must be between 1 and 31');
      await expect(client.getReflection(6, 32)).rejects.toThrow('Day must be between 1 and 31');
    });
  });
});
