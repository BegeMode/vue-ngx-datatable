/* eslint-disable no-undefined */
import { camelCase } from './camel-case';

const cache: Record<string, string> = {};
const testStyle = typeof document !== 'undefined' ? document.createElement('div').style : undefined;

// Get Prefix
// http://davidwalsh.name/vendor-prefix
// eslint-disable-next-line prettier/prettier
const prefix = (function () {
  const styles = typeof window !== 'undefined' ? window.getComputedStyle(document.documentElement, '') : undefined;
  let match: RegExpMatchArray = null;
  if (styles) {
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    match = Object.keys(styles)
      .join('')
      .match(/-(moz|webkit|ms)-/);
  }
  // const match: CSSStyleDeclaration = typeof styles !== 'undefined' ?
  //   Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) : null;
  const pre = match !== null ? match[1] : undefined;
  const dom = typeof pre !== 'undefined' ? new RegExp('(' + pre + ')', 'i').exec('WebKit|Moz|MS|O')[1] : undefined;

  return dom
    ? {
        dom,
        lowercase: pre,
        css: `-${pre}-`,
        js: pre[0].toUpperCase() + pre.substr(1),
      }
    : undefined;
})();

export function getVendorPrefixedName(property: string): string {
  const name = camelCase(property);

  if (!cache[name]) {
    if (prefix !== undefined && testStyle[prefix.css + property] !== undefined) {
      cache[name] = prefix.css + property;
    } else if (testStyle[property] !== undefined) {
      cache[name] = property;
    }
  }

  return cache[name];
}
