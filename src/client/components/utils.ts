export function cn(base: string, ...extra: (string|null|undefined)[]): string {
  return base + ' ' + extra.map(x => x ? x : '').join(' ');
}
