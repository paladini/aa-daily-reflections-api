export interface DailyReflection {
  title: string;
  date: string;
  day: number;
  month: number;
  monthName: string;
  quote: string;
  reference: string;
  reflection: string;
  copyright: string;
}

export type Language = 'en' | 'es' | 'fr';

export interface ApiResponse {
  method: string;
  err: number;
  data: string;
  errMedia?: number;
  dataMedia?: string;
}
