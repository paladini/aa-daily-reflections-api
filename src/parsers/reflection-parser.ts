import { decode } from 'he';
import { DailyReflection, ApiResponse } from '../types';
import { cleanText } from '../utils/text';

/**
 * Parses API response and extracts reflection data
 */
export class ReflectionParser {
  parse(response: ApiResponse): DailyReflection {
    if (response.err !== 200) {
      throw new Error(`API returned error: ${response.err}`);
    }

    const html = decode(response.data);
    
    return {
      title: this.extractTitle(html),
      date: this.extractDate(html),
      day: this.extractDay(html),
      month: this.extractMonth(html),
      monthName: this.extractMonthName(html),
      quote: this.extractQuote(html),
      reference: this.extractReference(html),
      reflection: this.extractReflection(html),
      copyright: this.extractCopyright(html)
    };
  }

  private extractTitle(html: string): string {
    const match = html.match(/<span class="field field--name-title[^>]*>([^<]+)<\/span>/);
    return match ? cleanText(match[1]) : '';
  }

  private extractDate(html: string): string {
    const dateMatch = html.match(/data-date="([^"]+)"/);
    return dateMatch ? dateMatch[1] : '';
  }

  private extractDay(html: string): number {
    const match = html.match(/<input[^>]*name="day"[^>]*value="([^"]+)"/);
    return match ? parseInt(match[1], 10) : 0;
  }

  private extractMonth(html: string): number {
    const match = html.match(/<input[^>]*name="month"[^>]*value="([^"]+)"/);
    return match ? parseInt(match[1], 10) : 0;
  }

  private extractMonthName(html: string): string {
    const match = html.match(/<input[^>]*name="month-name"[^>]*value="([^"]+)"/);
    return match ? match[1] : '';
  }

  private extractQuote(html: string): string {
    const match = html.match(/<div class="clearfix text-formatted field field--name-field-teaser[^>]*>(.*?)<\/div>/s);
    if (!match) return '';
    
    const content = match[1];
    const strongMatch = content.match(/<strong>(.*?)<\/strong>/s);
    
    return strongMatch ? cleanText(strongMatch[1]) : '';
  }

  private extractReference(html: string): string {
    const match = html.match(/<div class="clearfix text-formatted field field--name-field-teaser[^>]*>(.*?)<\/div>/s);
    if (!match) return '';
    
    const content = match[1];
    const strongMatches = content.match(/<strong>(.*?)<\/strong>/gs);
    
    if (strongMatches && strongMatches.length > 1) {
      return cleanText(strongMatches[1].replace(/<\/?strong>/g, ''));
    }
    
    return '';
  }

  private extractReflection(html: string): string {
    const match = html.match(/<div class="clearfix text-formatted field field--name-body[^>]*>(.*?)<\/div>/s);
    if (!match) return '';
    
    let content = match[1];
    
    // Remove the quote and reference parts that are repeated
    content = content.replace(/<p><strong>.*?<\/strong><\/p>\s*<p><strong>.*?<\/strong><\/p>/s, '');
    
    // Extract the reflection text
    const reflectionMatch = content.match(/<p>([^<].*?)<\/p>/s);
    
    return reflectionMatch ? cleanText(reflectionMatch[1]) : '';
  }

  private extractCopyright(html: string): string {
    const match = html.match(/<div class="copyright-block"[^>]*>.*?<p>(.*?)<\/p>/s);
    return match ? cleanText(match[1]) : '';
  }
}
