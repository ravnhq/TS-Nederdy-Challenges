/* eslint-disable no-console */
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
type OmitByType<TObject, TExcludedType> = Omit<
  TObject,
  {
    [TKey in keyof TObject]: TObject[TKey] extends TExcludedType ? TKey : never
  }[keyof TObject]
>

// Add here your example

type OmitBoolean = OmitByType<
  {
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  },
  boolean
>

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
type If<TCondition extends boolean, TTrueValue, TFalseValue> =
  TCondition extends true ? TTrueValue : TFalseValue

// Add here your example
console.log('Exercise #2: Implement the utility type `If<C, T, F>` 👀')
console.log('C is true')
type A = If<true, 'a', 1>
console.log('Type A:', 'a' as A)

console.log('C is false')
type B = If<false, 'a', 1>
console.log('Type B:', 2 as B)

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
type MyReadonly<TObject> = {
  readonly [TKey in keyof TObject]: TObject[TKey]
}

interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
}

// Add here your example
console.log(
  'Exercise #3: Recreate the built-in `Readonly<T>` utility type without using it ☃️',
)
todo.title = 'Hello'
console.log(todo.title)

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
// type If<C extends boolean, T, F> = C extends true ? T : F;
type MyReturnType<TFunction> = TFunction extends (
  ...args: any[]
) => infer TReturnType
  ? TReturnType
  : any

const fn = (v: boolean) => {
  if (v) {
    return true
  } else {
    return true
  }
}

// Add here your example
console.log(
  'Exercise #4: Recreate the built-in `ReturnType<T>` utility type without using it 🚀',
)
type custom = MyReturnType<typeof fn>
console.log('Type a:', typeof (true as custom))

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
type MyAwaited<TPromise> = TPromise extends Promise<infer TResolved>
  ? MyAwaited<TResolved>
  : TPromise

const promise = new Promise<string>((resolve) => resolve('Desoltala, Erika'))
const awaited: MyAwaited<typeof promise> = 'Asignando valor 👍'

// Add here your example
console.log(
  'Exercise #5: Extract the type inside a wrapped type like `Promise` 💡',
)
console.log(typeof awaited)
type Test = MyAwaited<Promise<Promise<number>>>
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
type RequiredByKeys<TObject, TKeys extends keyof TObject = keyof TObject> =
  Omit<TObject, TKeys> & Required<Pick<TObject, TKeys>>

interface User {
  name?: string
  age?: number
  address?: string
}

// Add here your example

console.log('Exercise #6: Create a utility type `RequiredByKeys<T, K>` 👻')
type UserRequiredName = RequiredByKeys<User, 'name'>
type UserRequiredAll = RequiredByKeys<User>
