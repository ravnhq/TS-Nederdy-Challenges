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
type OmitBoolean<T, U> = {
  [K in keyof T]: T[K] extends U ? never : K
}[keyof T]

type filterType<T, U> = Pick<T, OmitBoolean<T, U>>

// Add here your example
type omitingType = filterType<
  {
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  },
  boolean
>

const omitExample: omitingType = {
  name: 'KEV',
  count: 42,
  // isReadonly: true, //  might cause an error of type
  // isEnable: false,  //  might cause an error of type
}
// console.log(omitExample);

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
type If<C extends boolean, T, F> = C extends true ? T : F

// Add here your example
type A = If<true, 'a', 'b'>
type B = If<false, 'a', 'b'>

const egA: A = 'a'
const egB: B = 'b'

// const egA: A = 'b';
// const egB: B = 'a';---- might cause an error of type

console.log(egA)


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
type readOnly<T> = {
  readonly [K in keyof T]: T[K]
}

// Add here your example
interface all {
  title: string
  description: string
}

const todo: readOnly<all> = {
  title: 'Hey',
  description: 'foobar',
}

// todo.title = "Hello";
// todo.description = "barFoo";

// console.log(todo)

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
type ownReturn<T> = T extends (...args: any[]) => infer R ? R : never

// Add here your example
const fn = (v: boolean) => {
  if (v) {
    return 1
  } else {
    return 2
  }
}

type a = ownReturn<typeof fn>

const egTest: a = 1

// const egTestError: a = "string";

// console.log(egTest);

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

// Add here your solutionst
type AwaitExample<A> = A extends Promise<infer E> ? E : any;// also we can replace the any with "Y"

type ResultExample = AwaitExample<Promise<string>>

// Add here your example
const exampleResult: ResultExample = 'getString'
// const exampleResult: ResultExample = "trying"; this gonna be an error cuz the value is number and is specteted a strig

// console.log(exampleResult);

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
type Req<T> = {
  [K in keyof T]: T[K];
};

type RequiredByKeys<T, K extends keyof any = keyof T> = Req<
  {
    [P in keyof T as P extends K ? P : never]-?: T[P];
  } & {
    [P in keyof T as P extends K ? never : P]: T[P];
  }
>;

// Add here your example

interface User{
  name?: string;
  age?: number;
  address?: string; 
}

type RequiredName = RequiredByKeys<User, 'name' | 'age?' | 'address?'>;

const user: RequiredName = {
  name: 'Kev',
  // age: 20,
  // address: 'NY',
}
console.log(user)