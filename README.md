# AA Daily Reflections

<img alt="Harness Score L0" src="https://paladini.github.io/harness-score/maturity/badge-l0.svg" height="20">
A lightweight, efficient Node.js library to fetch Daily Reflections from Alcoholics Anonymous (AA). This library provides both programmatic access through a JavaScript API and command-line interface.

[![npm version](https://badge.fury.io/js/aa-daily-reflections.svg)](https://badge.fury.io/js/aa-daily-reflections)
[![npm downloads](https://img.shields.io/npm/dm/aa-daily-reflections.svg)](https://www.npmjs.com/package/aa-daily-reflections)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Node.js Version](https://img.shields.io/node/v/aa-daily-reflections.svg)](https://nodejs.org/)
[![GitHub stars](https://img.shields.io/github/stars/paladini/aa-daily-reflections-api.svg?style=social&label=Star)](https://github.com/paladini/aa-daily-reflections-api)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/aa-daily-reflections.svg)](https://bundlephobia.com/package/aa-daily-reflections)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/paladini/aa-daily-reflections-api/graphs/commit-activity)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/paladini/aa-daily-reflections-api/pulls)

## ÔÜá´©Å Important Notice

This library fetches content from the public [AA.org](https://aa.org) API. Please use it responsibly and consider the following:

- **Respect the source**: This content is copyrighted by Alcoholics Anonymous World Services, Inc.
- **Rate limiting**: Don't make excessive requests to avoid overloading their servers
- **Educational use**: This library is intended for personal, educational, and recovery support purposes
- **No warranty**: This is an unofficial library and comes with no guarantees

## ­ƒÜÇ Installation

```bash
npm install aa-daily-reflections
```

## ­ƒôû Usage

### JavaScript/TypeScript API

```javascript
const { DailyReflections } = require('aa-daily-reflections');

// Create instance (default language: English)
const reflections = new DailyReflections();

// Get today's reflection
const todayReflection = await reflections.getToday();
console.log(todayReflection);

// Get reflection for specific date
const reflection = await reflections.getReflection(6, 25); // June 25th
console.log(reflection);

// Change language
reflections.setLanguage('es'); // Spanish
const spanishReflection = await reflections.getToday();

// Create instance with specific language
const frenchClient = new DailyReflections('fr');
const frenchReflection = await frenchClient.getToday();
```

### TypeScript

```typescript
import DailyReflections, { DailyReflection, Language } from 'aa-daily-reflections';

const reflections = new DailyReflections('en');

const reflection: DailyReflection = await reflections.getReflection(12, 24);
console.log(`Title: ${reflection.title}`);
console.log(`Quote: ${reflection.quote}`);
console.log(`Reflection: ${reflection.reflection}`);
```

### Command Line Interface

```bash
# Get today's reflection
aa-daily

# Get specific date
aa-daily 06/25

# Get reflection in Spanish
aa-daily -l es

# Get specific date in French
aa-daily -d 12/24 -l fr

# Show help
aa-daily --help
```

## ­ƒîì Supported Languages

- **English** (`en`) - Default
- **Spanish** (`es`) - Espa├▒ol
- **French** (`fr`) - Fran├ºais

## ­ƒôï API Reference

### Class: DailyReflections

#### Constructor

```typescript
new DailyReflections(language?: Language)
```

- `language` (optional): Language code ('en', 'es', 'fr'). Default: 'en'

#### Methods

##### `getToday(): Promise<DailyReflection>`

Fetches today's daily reflection.

##### `getReflection(month: number, day: number): Promise<DailyReflection>`

Fetches the daily reflection for a specific date.

- `month`: Month number (1-12)
- `day`: Day number (1-31)

##### `setLanguage(language: Language): void`

Changes the language for future requests.

##### `getLanguage(): Language`

Returns the current language setting.

### Interface: DailyReflection

```typescript
interface DailyReflection {
  title: string;        // Title of the reflection
  date: string;         // Date in MM-DD format
  day: number;          // Day number
  month: number;        // Month number
  monthName: string;    // Month name
  quote: string;        // Main quote/passage
  reference: string;    // Source reference (book, page)
  reflection: string;   // Personal reflection text
  copyright: string;    // Copyright information
}
```

## ­ƒøá´©Å Node.js Compatibility

This library supports:

- Ô£à Node.js 22.x
- Ô£à Node.js 20.x
- Ô£à Node.js 18.x
- Ô£à Node.js 16.x

**Note**: Node.js 18+ has built-in fetch. For Node.js 16, the library will attempt to use `node-fetch` if available, or provide clear error messages if not.

## ­ƒÅù´©Å Architecture

The library is structured for maintainability and clean separation of concerns:

```
src/
Ôö£ÔöÇÔöÇ index.ts              # Main DailyReflections class
Ôö£ÔöÇÔöÇ types.ts              # TypeScript interfaces
Ôö£ÔöÇÔöÇ utils/                # Utility functions
Ôöé   Ôö£ÔöÇÔöÇ date.ts          # Date validation & helpers
Ôöé   Ôö£ÔöÇÔöÇ text.ts          # Text cleaning utilities
Ôöé   ÔööÔöÇÔöÇ url.ts           # URL building
Ôö£ÔöÇÔöÇ services/             # External services
Ôöé   ÔööÔöÇÔöÇ http-client.ts   # HTTP request handling
ÔööÔöÇÔöÇ parsers/              # HTML parsing
    ÔööÔöÇÔöÇ reflection-parser.ts
```

Each module has focused responsibilities:
- **Utils**: Pure functions for common operations
- **Services**: Handle external dependencies (HTTP)
- **Parsers**: Transform API responses into clean data
- **Main class**: Orchestrates everything together

## ­ƒöº Development

```bash
# Clone the repository
git clone https://github.com/paladini/aa-daily-reflections.git
cd aa-daily-reflections

# Install dependencies
npm install

# Build the project
npm run build

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix
```

## ­ƒôØ Examples

### Basic Usage

```javascript
const { DailyReflections } = require('aa-daily-reflections');

async function example() {
  const reflections = new DailyReflections();
  
  try {
    const reflection = await reflections.getToday();
    
    console.log(`­ƒôà ${reflection.monthName} ${reflection.day}`);
    console.log(`­ƒÄ» ${reflection.title}`);
    console.log(`­ƒÆ¼ "${reflection.quote}"`);
    console.log(`­ƒôû ${reflection.reference}`);
    console.log(`­ƒôØ ${reflection.reflection}`);
  } catch (error) {
    console.error('Error fetching reflection:', error.message);
  }
}

example();
```

### Error Handling

```javascript
const { DailyReflections } = require('aa-daily-reflections');

async function robustExample() {
  const reflections = new DailyReflections();
  
  try {
    const reflection = await reflections.getReflection(2, 30); // Invalid date
  } catch (error) {
    if (error.message.includes('not valid for month')) {
      console.log('Invalid date provided');
    } else if (error.message.includes('Failed to fetch')) {
      console.log('Network or API error');
    } else {
      console.log('Unexpected error:', error.message);
    }
  }
}
```

### Multiple Languages

```javascript
const { DailyReflections } = require('aa-daily-reflections');

async function multiLanguageExample() {
  const languages = ['en', 'es', 'fr'];
  
  for (const lang of languages) {
    const client = new DailyReflections(lang);
    const reflection = await client.getReflection(6, 25);
    
    console.log(`\n--- ${lang.toUpperCase()} ---`);
    console.log(reflection.title);
  }
}
```

## ­ƒô£ License

MIT License - see [LICENSE](LICENSE) file for details.

## ­ƒñØ Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ÔÜá´©Å Disclaimer

This is an unofficial library. The Daily Reflections content is copyrighted by Alcoholics Anonymous World Services, Inc. This library simply provides a convenient interface to access publicly available content. Please respect their terms of service and use this tool responsibly.

## ­ƒÖÅ Acknowledgments

- Alcoholics Anonymous World Services, Inc. for providing the Daily Reflections
- The AA community for their ongoing support and recovery resources
- All contributors who help improve this library

---

**Remember**: Recovery is a journey, and daily reflection is a powerful tool in that journey. Use this library to support your spiritual practice and growth. ­ƒÖÅ
