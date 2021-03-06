export function checkVisibility(element: any, callback: any) {
  let timeout: any;

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
      timeout = setTimeout(() => check(), 50);
    }
  }

  check();
}
