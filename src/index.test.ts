// Basic smoke test - just to ensure the main class can be imported and instantiated
import DailyReflections from './index';

describe('DailyReflections - Smoke Test', () => {
  it('should be able to create an instance', () => {
    const client = new DailyReflections();
    expect(client).toBeInstanceOf(DailyReflections);
  });

  it('should have the expected methods', () => {
    const client = new DailyReflections();
    expect(typeof client.getToday).toBe('function');
    expect(typeof client.getReflection).toBe('function');
    expect(typeof client.setLanguage).toBe('function');
    expect(typeof client.getLanguage).toBe('function');
  });
});

