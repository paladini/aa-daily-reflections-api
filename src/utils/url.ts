import { Language } from '../types';
import { padNumber } from '../utils/date';

/**
 * Builds the API URL for a specific date and language
 */
export function buildApiUrl(month: number, day: number, language: Language): string {
  const baseUrl = 'https://www.aa.org';
  const monthStr = padNumber(month);
  const dayStr = padNumber(day);
  
  const langPath = language === 'en' ? '' : `/${language}`;
  
  return `${baseUrl}${langPath}/api/reflections/${monthStr}/${dayStr}`;
}
