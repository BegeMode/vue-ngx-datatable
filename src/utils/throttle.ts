/**
 * Throttle a function
 */
export function throttle(
  func: (...args: Array<unknown>) => unknown,
  wait: number,
  options?: { leading?: boolean; trailing?: boolean }
): (...args: Array<unknown>) => unknown {
  options = options || {};
  let context: unknown;
  let args: IArguments;
  let result: unknown;
  let timeout: number = null;
  let previous = 0;

  function later() {
    previous = options.leading === false ? 0 : Number(new Date());
    timeout = null;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    result = func.apply(context, args);
  }

  // eslint-disable-next-line prettier/prettier
  return function (this: unknown) {
    const now = Number(new Date());

    if (!previous && options.leading === false) {
      previous = now;
    }

    const remaining = wait - (now - previous);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    context = this;
    // eslint-disable-next-line prefer-rest-params
    args = arguments;

    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result = func.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining) as unknown as number;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  };
}

/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 */
export function throttleable(duration: number, options?: { leading?: boolean; trailing?: boolean }) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function innerDecorator(
    target: unknown,
    key: PropertyKey,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value: throttle(descriptor.value as (...args: Array<unknown>) => unknown, duration, options),
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return this[key];
      },
    };
  };
}
