/**
 * Exercise #1: Filter object properties by type.
 *
 * Using a utility type `OmitByType`, this example demonstrates how to pick properties
 * from a type `T` whose values are *not* assignable to a specified type `U`.
 *
 * @example
 * type OmitBoolean = OmitByType<{
 *   name: string;
 *   count: number;
 *   isReadonly: boolean;
 *   isEnable: boolean;
 * }, boolean>;
 *
 * Resulting type:
 *
 * {
 * name: string;
 * count: number;
 * }
 */

// Add here your solution
type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
}

// Example usage
type Example = {
  id: number
  name: string
  isActive: boolean
  createdAt: Date
}

type Example2 = {
  a: string
  b: string
  c: string
  d: true
}

type ExampleWithoutBooleans = OmitByType<Example, boolean> // { id: number; name: string; createdAt: Date; }
type Example2WithoutStrings = OmitByType<Example2, string> // { d: true }

/**
 * Exercise #2: Implement the utility type `If<C, T, F>`, which evaluates a condition `C`
 * and returns one of two possible types:
 * - `T` if `C` is `true`
 * - `F` if `C` is `false`
 *
 * @description
 * - `C` is expected to be either `true` or `false`.
 * - `T` and `F` can be any type.
 *
 * @example
 * type A = If<true, 'a', 'b'>;  // expected to be 'a'
 * type B = If<false, 'a', 'b'>; // expected to be 'b'
 */
// Add here your solution
type If<C, T, F> = C extends true ? T : F

// Example usage
type A = If<true, 'a', 'b'> // 'a'
type B = If<false, 'a', 'b'> // 'b'
/**
 * Exercise #3: Recreate the built-in `Readonly<T>` utility type without using it.
 *
 * @description
 * Constructs a type that makes all properties of `T` readonly.
 * This means the properties of the resulting type cannot be reassigned.
 *
 * @example
 * interface Todo {
 *   title: string;
 *   description: string;
 * }
 *
 * const todo: MyReadonly<Todo> = {
 *   title: "Hey",
 *   description: "foobar"
 * };
 *
 * todo.title = "Hello";       // Error: cannot reassign a readonly property
 * todo.description = "barFoo"; // Error: cannot reassign a readonly property
 */

// Add here your solution

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

// Example usage
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
}

// Uncommenting these will cause errors:
// todo.title = 'Hello'
// todo.description = 'barFoo'

/**
 * Exercise #4: Recreate the built-in `ReturnType<T>` utility type without using it.
 *
 * @description
 * The `MyReturnType<T>` utility type extracts the return type of a function type `T`.
 *
 * @example
 * const fn = (v: boolean) => {
 *   if (v) {
 *     return 1;
 *   } else {
 *     return 2;
 *   }
 * };
 *
 * type a = MyReturnType<typeof fn>; // expected to be "1 | 2"
 */

// Add here your solution
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

// Example usage
const fn = (v: boolean) => (v ? 1 : 2)

type FnReturnType = MyReturnType<typeof fn> // 1 | 2

/**
 * Exercise #5: Extract the type inside a wrapped type like `Promise`.
 *
 * @description
 * Implement a utility type `MyAwaited<T>` that retrieves the type wrapped in a `Promise` or similar structure.
 *
 * If `T` is `Promise<ExampleType>`, the resulting type should be `ExampleType`.
 *
 * @example
 * type ExampleType = Promise<string>;
 *
 * type Result = MyAwaited<ExampleType>; // expected to be "string"
 */

// Add here your solution
type MyAwaited<T> = T extends Promise<infer U> ? U : T

// Example usage
type ExampleType = Promise<string>
type Result = MyAwaited<ExampleType> // string

/**
 * Exercise 6: Create a utility type `RequiredByKeys<T, K>` that makes specific keys of `T` required.
 *
 * @description
 * The type takes two arguments:
 * - `T`: The object type.
 * - `K`: A union of keys in `T` that should be made required.
 *
 * If `K` is not provided, the utility should behave like the built-in `Required<T>` type, making all properties required.
 *
 * @example
 * interface User {
 *   name?: string;
 *   age?: number;
 *   address?: string;
 * }
 *
 * type UserRequiredName = RequiredByKeys<User, 'name'>;
 * expected to be: { name: string; age?: number; address?: string }
 */

// Add here your solution
type RequiredByKeys<T, K extends keyof T = keyof T> = Omit<T, K> &
  Required<Pick<T, K>>

// K extends keyof T = keyof T, K parametro generico para valores de T, el extends de T es para que solo sean valores de propiedades T y el  = keyof T valores predeterminados

// Add here your example
interface User {
  name?: string
  age?: number
  address?: string
}

type UserRequiredName = RequiredByKeys<User, 'name'>

const a: UserRequiredName = { name: '' }
