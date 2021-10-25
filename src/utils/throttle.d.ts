/**
 * Throttle a function
 */
export declare function throttle(func: (...args: Array<unknown>) => unknown, wait: number, options?: {
    leading?: boolean;
    trailing?: boolean;
}): (...args: Array<unknown>) => unknown;
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 */
export declare function throttleable(duration: number, options?: {
    leading?: boolean;
    trailing?: boolean;
}): (target: unknown, key: PropertyKey, descriptor: PropertyDescriptor) => PropertyDescriptor;
