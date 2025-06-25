import DailyReflections from '../src/index';

async function example() {
  // Create a new instance (default language is English)
  const reflections = new DailyReflections();

  try {
    // Get today's reflection
    console.log('📖 Today\'s Daily Reflection:');
    const today = await reflections.getToday();
    console.log(`\n📅 ${today.monthName} ${today.day}`);
    console.log(`\n📝 ${today.title}`);
    console.log(`\n💭 "${today.quote}"`);
    console.log(`\n📚 ${today.reference}`);
    console.log(`\n🤔 ${today.reflection}`);
    console.log(`\n© ${today.copyright}`);

    // Get a specific reflection (June 25)
    console.log('\n\n🎯 Specific Date Reflection (June 25):');
    const specific = await reflections.getReflection(6, 25);
    console.log(`📝 ${specific.title}`);

    // Change language to Spanish
    reflections.setLanguage('es');
    console.log('\n\n🇪🇸 Spanish Reflection:');
    const spanish = await reflections.getReflection(6, 25);
    console.log(`📝 ${spanish.title}`);

  } catch (error) {
    console.error('Error fetching reflection:', error);
  }
}

// Run the example
if (require.main === module) {
  example();
}

export default example;
