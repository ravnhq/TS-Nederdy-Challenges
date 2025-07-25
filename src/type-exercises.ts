/* eslint-disable prettier/prettier */
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
 // eslint-disable-next-line prettier/prettier
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
// Partial solution
// type FilterProperties<Type, Omited> = {
//   Gets 2 Types
//   If Type = Omited Type then it gets replaced, else it stays the same
//   [K in keyof Type]: Type[K] extends Omited ? null : Type[K]
// }
// This solution only replaces the property, but it remains in the object

//Solution
type OmitByType<Type, Omited> = {
  //Gets 2 Types
  //If Type === Omited Type then the KEY gets reeplaced to never
  [K in keyof Type as Type[K] extends Omited ? never : K]: Type[K]
}

// Add here your example

// Object with string, string, boolean
const User = {
  name: 'chris',
  count: 2,
  isReadonly: true,
  isEnable: false,
}
//Extracting the types of the object with typeof and filtering booleans
type newType = OmitByType<typeof User, boolean>

/**
 * Resulting type:
 *
 * {
 * name: string;
 * count: number;
 * }
 */
//------------------------------------------------------------------------------------------------------
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
type A = If<true, 'a', 'b'> // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
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

interface Todo {
  //Basic interface
  title: string
  description: string
}

// Just add the readonly keyword and then map the object
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

// Add here your example

const readonlyObject: MyReadonly<Todo> = {
  //Object modified to be readonly
  title: 'Hello',
  description: 'Chris',
}

const notReadonlyObject: Todo = {
  //Object modified to be readonly
  title: 'Hello',
  description: 'Gerardo',
}

// Can be reassigned
notReadonlyObject.title = 'Goodbye'

//@ts-expect-error /Error: cannot reassign a readonly property
readonlyObject.title = 'Goodbye'

//------------------------------------------------------------------------------------------------------
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

const fn = (v: boolean) => {
  if (v) {
    return 1
  } else {
    return 2
  }
}

//Extends verifies if fn follows the structure () => type
type myReturnType<fn> = fn extends (...args: any) => infer X ? X : never

// Add here your example
// expected to be "1 | 2"
type a = myReturnType<typeof fn>

//------------------------------------------------------------------------------------------------------
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

//Extends verifies if it follows structure Promise<type>
type MyAwaited<exampleType> = exampleType extends Promise<infer X>
  ? NestedType<X>
  : never

//If it has nested types makes recursive call
type NestedType<exampleType> = exampleType extends Promise<infer X>
  ? NestedType<X>
  : exampleType

// Add here your example

type PromisedType = Promise<string>
type NestedPromise = Promise<Promise<Promise<number>>>
type Result = MyAwaited<PromisedType> //Expected to be string
type NestedResult = MyAwaited<NestedPromise> //Expected to be number

//-------------------------------------------------------------------------
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

interface User {
  //Basic interface
  name?: string
  age?: number
  address?: string
}

// Add here your solution
type RequireEverything<T> = {
  //The "-?" operator removes the ? operator
  [K in keyof T]-?: T[K]
} //This solution removes all ? operators

//This type split the type into 2 parts: The required key and the not required keys
type RequiredByKey<T, U = undefined> = U extends keyof T
  ? Merge<RequireEverything<Pick<T, U>> & Omit<T, U>>
  : RequireEverything<T>

//Typescript doesnt normalize the output of this type so it shows
//type test = Required<Pick<User, "name">> & Omit<User, "name">

//To normalize that output the Type Merge maps the output into an object type
type Merge<T> = {
  [K in keyof T]: T[K]
}

// Add here your example

//Type { name: string; age?: number; address?: string }
type RequireName = RequiredByKey<User, 'age'>
//Type { name: string; age: number; address: string }
type RequireUndefined = RequiredByKey<User>
