import { cleanText } from '../text';

describe('Text Utils', () => {
  describe('cleanText', () => {
    it('should remove HTML tags', () => {
      const input = '<p>Hello <strong>world</strong></p>';
      const expected = 'Hello world';
      expect(cleanText(input)).toBe(expected);
    });

    it('should decode HTML entities', () => {
      const input = '&nbsp;Hello&amp;world&lt;test&gt;&quot;quote&quot;&#039;apostrophe&#039;';
      const expected = 'Hello&world<test>"quote"\'apostrophe\'';
      expect(cleanText(input)).toBe(expected);
    });

    it('should normalize whitespace', () => {
      const input = 'Hello     world\n\n\nTest';
      const expected = 'Hello world Test';
      expect(cleanText(input)).toBe(expected);
    });

    it('should trim whitespace', () => {
      const input = '   Hello world   ';
      const expected = 'Hello world';
      expect(cleanText(input)).toBe(expected);
    });

    it('should handle complex HTML with entities', () => {
      const input = '<p><strong>If&nbsp;we&nbsp;ask,&nbsp;God&nbsp;will&nbsp;certainly&nbsp;forgive&nbsp;our&nbsp;derelictions.</strong></p>';
      const expected = 'If we ask, God will certainly forgive our derelictions.';
      expect(cleanText(input)).toBe(expected);
    });
  });
});
