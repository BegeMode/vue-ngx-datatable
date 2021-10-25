if (typeof document !== 'undefined' && !document.elementsFromPoint) {
  document.elementsFromPoint = elementsFromPoint;
}

/**
 * Polyfill for `elementsFromPoint`
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/elementsFromPoint
 * https://gist.github.com/iddan/54d5d9e58311b0495a91bf06de661380
 * https://gist.github.com/oslego/7265412
 */
export function elementsFromPoint(x: number, y: number): Array<Element> {
  const elements: Array<Element> = [];
  const previousPointerEvents: Array<{ value: string; priority: string }> = [];
  let current: Element; // TODO: window.getComputedStyle should be used with inferred type (Element)
  let i: number;
  let d: { value: string; priority: string };

  // if (document === undefined) return elements;

  // get all elements via elementFromPoint, and remove them from hit-testing in order
  while ((current = document.elementFromPoint(x, y)) && current && elements.indexOf(current) === -1) {
    // push the element and its current style
    elements.push(current);
    previousPointerEvents.push({
      value: (current as HTMLElement).style.getPropertyValue('pointer-events'),
      priority: (current as HTMLElement).style.getPropertyPriority('pointer-events'),
    });
    // add "pointer-events: none", to get to the underlying element
    (current as HTMLElement).style.setProperty('pointer-events', 'none', 'important');
  }

  // restore the previous pointer-events values
  for (i = previousPointerEvents.length; (d = previousPointerEvents[i]); i--) {
    (elements[i] as HTMLElement).style.setProperty('pointer-events', d?.value ? d.value : '', d?.priority);
  }
  // return our results
  return elements;
}
