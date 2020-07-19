/**
 * Converts strings from something to camel case
 * http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
 */
export function camelCase(str: string): string {
  // Replace special characters with a space
  // eslint-disable-next-line optimize-regex/optimize-regex
  str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
  // put a space before an uppercase letter
  str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');

  // Lower case first character and some other stuff
  str = str
    // eslint-disable-next-line optimize-regex/optimize-regex
    .replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '')
    .trim()
    .toLowerCase();

  // uppercase characters preceded by a space or number
  str = str.replace(/([\d ]+)([A-Za-z])/g, (a, b, c) => (b as string).trim() + (c as string).toUpperCase());

  return str;
}

/**
 * Converts strings from camel case to words
 * http://stackoverflow.com/questions/7225407/convert-camelcasetext-to-camel-case-text
 */
export function deCamelCase(str: string): string {
  return str.replace(/([A-Z])/g, match => ` ${match}`).replace(/^./, match => match.toUpperCase());
}
