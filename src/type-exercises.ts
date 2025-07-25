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

type OmitByType<C, S> = {
  [P in keyof C as C[P] extends S ? never : P]: C[P]
}
// Add here your example

type withOutBoolean = OmitByType<
  {
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  },
  boolean
>

const data = {
  name: 'juan',
  count: 10,
  isReadonly: true,
  isEnable: false,
}
function ExampleOmitByType(data: withOutBoolean) {
  return data
}

ExampleOmitByType(data)

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

// Add here your example
type A = If<true, 'a', 'b'>
type B = If<false, 'a', 'b'>

function exampleCondition(a: A, b: B) {
  if (a) {
    return 'es true'
  } else if (b) {
    return 'es false'
  }
}

exampleCondition('a', 'b')
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
type MyReadonly<C> = {
  readonly [T in keyof C]: C[T]
}
// Add here your example

interface Todo {
  title: string
  description: 'foobar'
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
}

function ExampleTodo() {
  return todo
}

ExampleTodo()
// todo.title = "Hello";
// todo.description = "barFoo"
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
type MyReturnType<T> = T extends (...args: any) => infer R ? R : never

// Add here your example

const func = (check: boolean) => {
  if (check) {
    return 1
  } else {
    return 0
  }
}

type a = MyReturnType<typeof func>

function exampleReturnType(a: a) {
  return a
}

exampleReturnType(1)
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
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T

// Add here your example

type ExampleType = Promise<number>

type test = MyAwaited<ExampleType>

async function examplePromise(letter: test) {
  return letter
}

examplePromise(10)
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

// type FinalStpe<T, K> =  K extends keyof T ? Required<Pick<T, K>> & Omit<T,K>
type TypeConKat<T, K> = K extends keyof T
  ? Required<Pick<T, K>> & Omit<T, K>
  : T

type MyEditableRequiered<T, K = undefined> = K extends undefined | null
  ? Required<T>
  : TypeConKat<T, K>

interface User {
  name?: string
  age?: number
  address?: string
}

type Merge<T> = {
  [P in keyof T]: T[P]
}

type MutableRequired = Merge<MyEditableRequiered<User, 'name'>>

// Add here your example

const exampleConcat = {
  name: 'Brandon',
  age: 10,
  address: 'colonial',
}
function TestingConcat(example: MutableRequired) {
  return example
}

TestingConcat(exampleConcat)
