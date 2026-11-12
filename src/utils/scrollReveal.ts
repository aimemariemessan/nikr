export const REVEAL_STAGGER_CLASSES = [
  'reveal-delay-0',
  'reveal-delay-1',
  'reveal-delay-2'
] as const;

export function getRevealDelayIndex(index: number, columns = 3): number {
  if (!Number.isFinite(index) || index < 0) return 0;
  const safeColumns = Math.max(1, Math.floor(columns));
  return Math.floor(index) % safeColumns;
}

export function getRevealDelayClass(index: number): string {
  const bucket = getRevealDelayIndex(index, REVEAL_STAGGER_CLASSES.length);
  return REVEAL_STAGGER_CLASSES[bucket];
}
