import { ReflectionParser } from '../reflection-parser';
import { ApiResponse } from '../../types';

describe('ReflectionParser', () => {
  let parser: ReflectionParser;

  beforeEach(() => {
    parser = new ReflectionParser();
  });

  describe('parse', () => {
    const mockApiResponse: ApiResponse = {
      method: 'GET',
      err: 200,
      data: `
        <article class="node node--type-daily-reflection node--view-mode-teaser" data-date="06-25">
          <input type="hidden" name="day" value="25">
          <input type="hidden" name="month" value="06">
          <input type="hidden" name="month-name" value="June">
          <h3>
            <span class="field field--name-title field--type-string field--label-hidden">A TWO-WAY STREET</span>
          </h3>
          <div>June 25</div>
          <div class="clearfix text-formatted field field--name-field-teaser field--type-text-long field--label-hidden field__item">
            <p><strong>If we ask, God will certainly forgive our derelictions.</strong></p>
            <p><strong>TWELVE STEPS AND TWELVE TRADITIONS, p. 65</strong></p>
          </div>
          <div class="clearfix text-formatted field field--name-body field--type-text-with-summary field--label-hidden field__item">
            <p><strong>If we ask, God will certainly forgive our derelictions.</strong></p>
            <p><strong>TWELVE STEPS AND TWELVE TRADITIONS, p. 65</strong></p>
            <p>When I prayed, I used to omit a lot of things for which I needed to be forgiven.</p>
          </div>
          <div class="copyright-block">
            <p>From the book <em>Daily Reflections.</em><br>
            Copyright © 1990 by Alcoholics Anonymous World Services, Inc. All rights reserved.</p>
          </div>
        </article>
      `
    };

    it('should parse API response correctly', () => {
      const reflection = parser.parse(mockApiResponse);

      expect(reflection.title).toBe('A TWO-WAY STREET');
      expect(reflection.date).toBe('06-25');
      expect(reflection.day).toBe(25);
      expect(reflection.month).toBe(6);
      expect(reflection.monthName).toBe('June');
      expect(reflection.quote).toBe('If we ask, God will certainly forgive our derelictions.');
      expect(reflection.reference).toBe('TWELVE STEPS AND TWELVE TRADITIONS, p. 65');
      expect(reflection.reflection).toBe('When I prayed, I used to omit a lot of things for which I needed to be forgiven.');
      expect(reflection.copyright).toContain('Copyright © 1990 by Alcoholics Anonymous World Services');
    });

    it('should handle API errors', () => {
      const errorResponse: ApiResponse = {
        method: 'GET',
        err: 500,
        data: ''
      };

      expect(() => parser.parse(errorResponse)).toThrow('API returned error: 500');
    });

    it('should handle malformed HTML gracefully', () => {
      const malformedResponse: ApiResponse = {
        method: 'GET',
        err: 200,
        data: '<html><body>incomplete</body>'
      };

      const reflection = parser.parse(malformedResponse);

      expect(reflection.title).toBe('');
      expect(reflection.day).toBe(0);
      expect(reflection.month).toBe(0);
    });
  });
});
