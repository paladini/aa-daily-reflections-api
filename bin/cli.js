#!/usr/bin/env node

const DailyReflections = require('../lib/index.js').default;

async function main() {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  let language = 'en';
  let month = null;
  let day = null;
  let help = false;
  let json = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--help':
      case '-h':
        help = true;
        break;
      case '--language':
      case '-l':
        language = args[++i];
        break;
      case '--date':
      case '-d':
        const dateStr = args[++i];
        const [monthStr, dayStr] = dateStr.split('/');
        month = parseInt(monthStr, 10);
        day = parseInt(dayStr, 10);
        break;
      case '--json':
      case '-j':
        json = true;
        break;
      default:
        // Try to parse as MM/DD format
        if (arg.includes('/')) {
          const [monthStr, dayStr] = arg.split('/');
          month = parseInt(monthStr, 10);
          day = parseInt(dayStr, 10);
        }
        break;
    }
  }

  if (help) {
    console.log(`
AA Daily Reflections CLI

Usage:
  aa-daily                          Get today's reflection (English)
  aa-daily MM/DD                    Get reflection for specific date
  aa-daily -l es                    Get today's reflection in Spanish
  aa-daily -l fr                    Get today's reflection in French
  aa-daily -d MM/DD -l es           Get specific date in Spanish

Options:
  -h, --help                        Show this help message
  -l, --language <lang>             Language (en, es, fr) [default: en]
  -d, --date <MM/DD>                Specific date to fetch
  -j, --json                        Output raw JSON instead of formatted text

Examples:
  aa-daily                          Today's reflection in English
  aa-daily 06/25                    June 25th reflection in English
  aa-daily -l es                    Today's reflection in Spanish
  aa-daily -d 12/24 -l fr           Christmas Eve reflection in French
  aa-daily --json                   Today's reflection as JSON

Note: This tool fetches content from aa.org. Please use responsibly.
    `);
    return;
  }

  try {
    const reflections = new DailyReflections(language);

    let reflection;
    if (month && day) {
      reflection = await reflections.getReflection(month, day);
    } else {
      reflection = await reflections.getToday();
    }

    if (json) {
      console.log(JSON.stringify(reflection, null, 2));
      return;
    }

    // Format and display the reflection
    console.log('═'.repeat(60));
    console.log(`📅 ${reflection.monthName} ${reflection.day}`);
    console.log(`🎯 ${reflection.title}`);
    console.log('═'.repeat(60));
    console.log();

    if (reflection.quote) {
      console.log(`💬 "${reflection.quote}"`);
      console.log();
    }

    if (reflection.reference) {
      console.log(`📖 ${reflection.reference}`);
      console.log();
    }

    if (reflection.reflection) {
      console.log('📝 Reflection:');
      console.log(reflection.reflection);
      console.log();
    }

    if (reflection.copyright) {
      console.log('ⓒ', reflection.copyright);
    }

    console.log('═'.repeat(60));

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
