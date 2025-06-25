/**
 * Validates if a date is valid
 * @param month - Month (1-12)
 * @param day - Day (1-31)
 * @throws Error if date is invalid
 */
export function validateDate(month: number, day: number): void {
  if (month < 1 || month > 12) {
    throw new Error('Month must be between 1 and 12');
  }
  
  if (day < 1 || day > 31) {
    throw new Error('Day must be between 1 and 31');
  }
  
  // Additional validation for days in specific months
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (day > daysInMonth[month - 1]) {
    throw new Error(`Day ${day} is not valid for month ${month}`);
  }
}

/**
 * Pads a number with leading zeros
 */
export function padNumber(num: number, length: number = 2): string {
  return num.toString().padStart(length, '0');
}

/**
 * Gets current date as month and day
 */
export function getCurrentDate(): { month: number; day: number } {
  const today = new Date();
  return {
    month: today.getMonth() + 1, // getMonth() returns 0-11
    day: today.getDate()
  };
}
