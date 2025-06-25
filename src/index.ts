import { DailyReflection, Language } from './types';
import { validateDate, getCurrentDate } from './utils/date';
import { buildApiUrl } from './utils/url';
import { HttpClient } from './services/http-client';
import { ReflectionParser } from './parsers/reflection-parser';

export class DailyReflections {
  private language: Language;
  private httpClient: HttpClient;
  private parser: ReflectionParser;

  constructor(language: Language = 'en') {
    this.language = language;
    this.httpClient = new HttpClient();
    this.parser = new ReflectionParser();
  }

  /**
   * Get the daily reflection for today
   */
  async getToday(): Promise<DailyReflection> {
    const { month, day } = getCurrentDate();
    return this.getReflection(month, day);
  }

  /**
   * Get the daily reflection for a specific date
   * @param month - Month (1-12)
   * @param day - Day (1-31)
   */
  async getReflection(month: number, day: number): Promise<DailyReflection> {
    validateDate(month, day);
    
    const url = buildApiUrl(month, day, this.language);
    
    try {
      const response = await this.httpClient.fetchData(url);
      return this.parser.parse(response);
    } catch (error) {
      throw new Error(`Failed to fetch daily reflection: ${error}`);
    }
  }

  /**
   * Change the language for future requests
   */
  setLanguage(language: Language): void {
    this.language = language;
  }

  /**
   * Get the current language setting
   */
  getLanguage(): Language {
    return this.language;
  }
}

// Export types for external use
export { DailyReflection, Language } from './types';

// Default export for easy importing
export default DailyReflections;
