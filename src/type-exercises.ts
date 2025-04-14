/*=============
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

// EXPLANATION 1:
// We go through all the keys in T, we exclude all the keys shared in U and present the resulting object.

// Add here your example
interface Example {
  name: string
  count: number
  isEnabled: boolean
  isReadonly: boolean
}

type WithoutBooleans = OmitByType<Example, boolean> // Expected: { name: string; count: number }
type WithoutNumbers = OmitByType<Example, number> // Expected: { name: string; isEnabled: boolean; isReadonly: boolean }
type WithoutStrings = OmitByType<Example, string> // Expected: { count: number; isEnabled: boolean; isReadonly: boolean }

/*=============
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
type If<C extends boolean, T, F> = C extends true ? T : F

// EXPLANATION 2:
// We make sure that C is from type boolean, and conditionally if C is true then it becomes the type of T and if false the type of F.

// Add here your example
type Bool1 = If<true, 'yes', 'no'> // Expected: 'yes'
type Bool2 = If<false, 'yes', 'no'> // Expected: 'no'

type TrueNumberOrString = If<true, number, string> // Expected: number
type FalseNumberOrString = If<false, number, string> // Expected: string

type Choose<T extends boolean> = If<T, 'Chosen', 'Not Chosen'>
type ChosenOne = Choose<true> // Expected: 'Chosen'
type NotChosen = Choose<false> // Expected: 'Not Chosen'

/*=============
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

// EXPLANATION 3:
// We go through all the keys in and we add the modifier readonly to each one of them and we finally get the type of each one of them.

// Add here your example
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: 'Lorem Ipsum',
  description: 'Dolor sit amet, consectetur adipiscing elit.',
}

console.log(todo.title) // "Lorem Ipsum"
console.log(todo.description) // "Dolor sit amet, consectetur adipiscing elit."

/*=============
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

// EXPLANATION 4:
// So we use parameter T that checks any number of arugments "args", then it infers the resulting types as R or it falls back to never if not.

// Add here your example
const fn1 = (v: boolean) => {
  if (v) {
    return 1
  } else {
    return 2
  }
}
type Result1 = MyReturnType<typeof fn1> // Result1: 1 | 2

function fn2(): string {
  return 'hello'
}
type Result2 = MyReturnType<typeof fn2> // Result2: string

const fn3 = (x: number, y: number): { sum: number } => {
  return { sum: x + y }
}
type Result3 = MyReturnType<typeof fn3> // Result3: { sum: number }

/*=============
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
type MyAwaited<T> = T extends Promise<infer U> ? U : never

// EXPLANATION 5:
// We take the type in Promise using the variable U and the extend it (pass it on) to T, in case this fails it fallsback to never.

// Add here your example
type A = MyAwaited<Promise<string>> // Expected: string
type B = MyAwaited<Promise<number>> // Expected: number
type C = MyAwaited<Promise<Promise<boolean>>> // Expected: Promise<boolean>
type D = MyAwaited<number> // Expected: never (because number is not assignable to Promise<any>)
type E = MyAwaited<Promise<string> | number> // Expected: string | never => simplifies to string

/*=============
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
type Merge<T> = {
  [K in keyof T]: T[K]
}

type RequiredByKeys<T, K = keyof T> = Merge<
  Required<Pick<T, Extract<K, keyof T>>> & Omit<T, Extract<K, keyof T>>
>

// EXPLANATION 6:
// We use Merge to create a single object called Merge<T> with every key from T matching its type.
// Then the type RequiredByKeys has T as the base objetct and K will default to the same ksy as T in case that they are missing.
// We follow up with a merge of a type that contains and requires the keys shared both in K and T and of a type that has the remaining keys of K as optional.

// Add here your example
interface User {
  name?: string
  lastname?: string
  age?: number
  address?: string
}

type UserRequiredName = RequiredByKeys<User, 'name'> // UserRequiredName: name parameter required
type UserRequiredNameAge = RequiredByKeys<User, 'name' | 'age'> // UserRequiredNameAge: name and age parameters required
type UserRequiredLastName = RequiredByKeys<User, 'lastname'> // // UserRequiredLastName: lastname parameter required
type UserFullyRequired = RequiredByKeys<User> // UserFullyRequired: all parameters required
