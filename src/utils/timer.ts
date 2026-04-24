export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateTimeLeft(targetDateStr: string): TimeLeft {
  const targetDate = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}
