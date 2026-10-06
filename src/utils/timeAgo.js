/**
 * High precision time and milestone calculator.
 */

// Convert English digits to Bengali numerals
export function toBengaliNumber(num) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (w) => bnDigits[+w]);
}

export function calculateLoveTime(startDateString) {
  const start = new Date(startDateString);
  const now = new Date();
  let diffMs = now.getTime() - start.getTime();

  // Handle future dates gracefully
  const isFuture = diffMs < 0;
  if (isFuture) diffMs = Math.abs(diffMs);

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);

  const days = totalDays;
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  // Calculate upcoming anniversary
  let nextAnniversary = new Date(now.getFullYear(), start.getMonth(), start.getDate());
  if (nextAnniversary.getTime() <= now.getTime()) {
    nextAnniversary = new Date(now.getFullYear() + 1, start.getMonth(), start.getDate());
  }
  const daysUntilAnniversary = Math.ceil((nextAnniversary.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const yearsTogether = Math.max(1, Math.floor(totalDays / 365.25));

  // Milestone computation (e.g. next 100 or 500 or 1000 days)
  const nextDayMilestone = Math.ceil((totalDays + 1) / 100) * 100;
  const daysUntilMilestone = nextDayMilestone - totalDays;

  return {
    days,
    hours,
    minutes,
    seconds,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    yearsTogether,
    daysUntilAnniversary,
    nextDayMilestone,
    daysUntilMilestone,
    isFuture
  };
}

export function calculateDaysRemaining(targetDateString) {
  const target = new Date(targetDateString);
  const now = new Date();
  
  // Set both to start of day for clean day diff
  const t = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const n = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = t.getTime() - n.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
