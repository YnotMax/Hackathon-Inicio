import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateTimeLeft } from './timer';

describe('calculateTimeLeft', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calculates the correct time difference', () => {
    // Setting "now" to Jan 1, 2026
    const mockNow = new Date('2026-01-01T00:00:00').getTime();
    vi.setSystemTime(mockNow);

    // Target is Jan 2, 2026 (Exactly 1 day later)
    const target = '2026-01-02T00:00:00';
    const result = calculateTimeLeft(target);

    expect(result.days).toBe(1);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });

  it('returns all zeros if target is in the past', () => {
    const mockNow = new Date('2026-01-02T00:00:00').getTime();
    vi.setSystemTime(mockNow);

    const target = '2026-01-01T00:00:00';
    const result = calculateTimeLeft(target);

    expect(result.days).toBe(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });
});
