export function checkVisibility(element: HTMLElement, callback: () => void): void {
  let timeout: number;

  function check() {
    // https://davidwalsh.name/offsetheight-visibility
    const { offsetHeight, offsetWidth } = element;

    if (offsetHeight && offsetWidth) {
      clearTimeout(timeout);
      if (callback) {
        callback();
      }
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => check(), 50) as unknown as number;
    }
  }

  check();
}
