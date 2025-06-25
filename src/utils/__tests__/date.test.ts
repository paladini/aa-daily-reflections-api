import { validateDate, padNumber, getCurrentDate } from '../date';

describe('Date Utils', () => {
  describe('validateDate', () => {
    it('should pass for valid dates', () => {
      expect(() => validateDate(1, 1)).not.toThrow();
      expect(() => validateDate(12, 31)).not.toThrow();
      expect(() => validateDate(6, 25)).not.toThrow();
    });

    it('should throw for invalid months', () => {
      expect(() => validateDate(0, 15)).toThrow('Month must be between 1 and 12');
      expect(() => validateDate(13, 15)).toThrow('Month must be between 1 and 12');
    });

    it('should throw for invalid days', () => {
      expect(() => validateDate(6, 0)).toThrow('Day must be between 1 and 31');
      expect(() => validateDate(6, 32)).toThrow('Day must be between 1 and 31');
    });

    it('should validate days in specific months', () => {
      expect(() => validateDate(2, 30)).toThrow('Day 30 is not valid for month 2');
      expect(() => validateDate(4, 31)).toThrow('Day 31 is not valid for month 4');
    });
  });

  describe('padNumber', () => {
    it('should pad single digit numbers', () => {
      expect(padNumber(5)).toBe('05');
      expect(padNumber(1)).toBe('01');
    });

    it('should not pad double digit numbers', () => {
      expect(padNumber(10)).toBe('10');
      expect(padNumber(25)).toBe('25');
    });

    it('should respect custom length', () => {
      expect(padNumber(5, 3)).toBe('005');
      expect(padNumber(1, 4)).toBe('0001');
    });
  });

  describe('getCurrentDate', () => {
    it('should return current month and day', () => {
      const result = getCurrentDate();
      expect(result).toHaveProperty('month');
      expect(result).toHaveProperty('day');
      expect(result.month).toBeGreaterThanOrEqual(1);
      expect(result.month).toBeLessThanOrEqual(12);
      expect(result.day).toBeGreaterThanOrEqual(1);
      expect(result.day).toBeLessThanOrEqual(31);
    });
  });
});
