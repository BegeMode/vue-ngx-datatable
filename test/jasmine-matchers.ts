// <reference path="./jasmine-matchers.d.ts" />

export const addMatchers = (): void =>
  jasmine.addMatchers({
    toHaveText,
    toHaveCssClass,
  });

/**
 * `toHaveText()` adapted from https://angular.io/guide/testing
 */
function toHaveText(): jasmine.CustomMatcher {
  return {
    compare(actual: HTMLElement, expectedText: string, expectationFailOutput?: string): jasmine.CustomMatcherResult {
      const actualText = elementText(actual);
      const pass = actualText.indexOf(expectedText) > -1;
      const message = pass ? '' : composeMessage();
      return { pass, message };

      function composeMessage() {
        const a = actualText.length < 100 ? actualText : actualText.substr(0, 100) + '...';
        const efo = expectationFailOutput ? ` '${expectationFailOutput}'` : '';
        return `Expected element to have text content '${expectedText}' instead of '${a}'${efo}`;
      }
    },
  };
}

function elementText(n: Element): string {
  if (n instanceof Array) {
    return n.map(elementText).join('');
  }

  if (n.nodeType === Node.COMMENT_NODE) {
    return '';
  }

  if (n.nodeType === Node.ELEMENT_NODE && n.hasChildNodes()) {
    return elementText(Array.prototype.slice.call(n.childNodes) as Element);
  }

  if ((n as unknown as { nativeElement: Element }).nativeElement) {
    n = (n as unknown as { nativeElement: Element }).nativeElement;
  }

  return n.textContent;
}

/**
 * adapted from https://github.com/ng-bootstrap/ng-bootstrap/blob/master/src/test/matchers.ts
 */
function toHaveCssClass(util: unknown, customEqualityTests: unknown) {
  return { compare: buildError(false), negativeCompare: buildError(true) };

  function buildError(isNot: boolean) {
    return (actual: HTMLElement, className: string) => ({
      pass: actual.classList.contains(className) === !isNot,
      message: `Expected ${actual.outerHTML} ${isNot ? 'not ' : ''}to contain the CSS class "${className}"`,
    });
  }
}
