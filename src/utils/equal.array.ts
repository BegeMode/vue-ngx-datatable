export function isArrayEqual(array1: unknown[], array2: unknown[]): boolean {
  // if the other array is a falsy value, return
  if (!array1 || !array2 || !Array.isArray(array1) || !Array.isArray(array2)) {
    return false;
  }

  // compare lengths - can save a lot of time
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0, l = array1.length; i < l; i++) {
    // Check if we have nested arrays
    if (array1[i] instanceof Array && array2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!isArrayEqual(array1[i] as Array<unknown>, array2[i] as Array<unknown>)) {
        return false;
      }
    } else if (array1[i] !== array2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}
