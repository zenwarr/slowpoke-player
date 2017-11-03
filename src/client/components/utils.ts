export function cn(base: string, ...extra: (string|null|undefined)[]): string {
  return base + ' ' + extra.map(x => x ? x : '').join(' ');
}

export function clientXToDoc(viewportX: number): number {
  return viewportX + (document.scrollingElement || document.documentElement).scrollLeft;
}

export function clientYToDoc(viewportY: number): number {
  return viewportY + (document.scrollingElement || document.documentElement).scrollTop;
}

export interface Position {
  left: number;
  top: number;
}

export function elemDocPosition(elem: HTMLElement): Position {
  let boundingRect = elem.getBoundingClientRect();
  return {
    left: clientXToDoc(boundingRect.left),
    top: clientYToDoc(boundingRect.top)
  };
}
