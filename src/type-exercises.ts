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
type Thing = {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

// commenting out bools generates error
// TS2741: Property isReadonly is missing in type
// adding a random prop also errors
// Object literal may only specify known properties, and somethingRandomExtra does not exist in type Thing
const aThing: Thing = {
  name: 'Ezra',
  count: 9000,
  isReadonly: false,
  isEnable: true,
  //somethingRandomExtra: "yes"
}

// eslint-disable-next-line no-console
console.log(aThing)

//defining ours based on existing type
type OmitByType<T, U> = Pick<
  T,
  {
    [Property in keyof T]: T[Property] extends U ? never : Property
  }[keyof T] // this line I got a nudge from chatgpt, explanation below
>

// mainly based on these two sources.
// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
// I was stuck here, I was trying to use pick or exclude to try to remove, the never returned type,
// which was the properties that I wanted to remove I set them to never. The nudge that I got was that a union "{}[keyof T]"
// omits never types as it sort of casts {} into T, so it cleans it up and also returns the types in a way
// that the Pick can use i.e. U has to be an extension of T (see last exercise) .
// I found this difficult, like when I first learned regex, mainly because it is so syntacically different.
// type OmitByType2<T, U> = Pick<
//   T,
//   {
//     [Property in keyof T]: T[Property] extends U ? never : Property
//   }
// >

const noBools: OmitByType<Thing, boolean> = {
  name: 'Ezra',
  count: 9000,
  //isReadonly: false,
  // isEnable: true,
  //somethingRandomExtra: 'yes',
}

// eslint-disable-next-line no-console
console.log(noBools)

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
// based on https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types
type If<C, T, F> = C extends true ? T : F

// Add here your example
type Cat = { name: string }
type Dog = { dogYears: number }

type petTypeTrue = If<true, Cat, Dog>
type petTypeFalse = If<false, Cat, Dog>

const doggy: petTypeFalse = { dogYears: 1 }
const kitty: petTypeTrue = { name: 'Meowsicles The First' }
// eslint-disable-next-line no-console
console.log(doggy)
// eslint-disable-next-line no-console
console.log(kitty)

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
type Todo = {
  title: string
  description: string
}

// https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#mapping-modifiers
// most important here is the plus
type MyReadonly<T> = {
  +readonly [Property in keyof T]: T[Property]
}

// Add here your example
const taskTodo: MyReadonly<Todo> = {
  title: 'Do 10 pushups',
  description: 'do not delete, if you see do the pushups!!!',
}

// eslint-disable-next-line no-console
console.log(taskTodo)

// this returns TS2540: Cannot assign to title because it is a read-only property.
//taskTodo.title = "DELETED NEVER DO THE PUSHUPS"

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
const fn = (v: boolean) => {
  if (v) {
    return 1
  } else {
    return 2
  }
}

// Add here your solution
// based on https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types
// https://blog.logrocket.com/understanding-infer-typescript/
// here we give the signature of a function, and get rid of args by hardcoding it to never, and then inferring the return
type MyReturnType<T> = T extends (...args: never[]) => infer Return
  ? Return
  : never

// Add here your example
type a = MyReturnType<typeof fn>

const one: a = 1
const two: a = 2
// this returns TS2322: Type 3 is not assignable to type 1 | 2
//const three: a = 3

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
// based on https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types
type MyAwaitedType<T> = T extends Promise<infer Inside> ? Inside : never
// Add here your example
type clock = Promise<string> // inside the promise there is an inspiring quote

type clockContent = MyAwaitedType<clock>

const quote: clockContent =
  'Coding like poetry should be short and concise. ― Santosh Kalwar'

// errors with TS2322: Type number is not assignable to type string
//const testClock: clockContent = 9000

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

type User = {
  name?: string
  age?: number
  address?: string
}
// Add here your solution
// fixed key not working in pick with https://stackoverflow.com/questions/66781778/type-keyof-t-does-not-satisfy-the-constraint
type MakeKeysRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>

const mike: User = {}

// Add here your example
const legallyRequiredToAskAge: MakeKeysRequired<User, 'age'> = { age: 25 }

// TS2322: Type { name: string; address: string; } is not assignable to type MakeKeysRequired<User, "age">
// Property age is missing in type { name: string; address: string; } but required in type Required<Pick<User, "age">>
// type-exercises. ts(244, 3): age is declared here.

// const underageOmittedGivingInfo: MakeKeysRequired<User, 'age'> = {
//   name: 'John',
//   address: 'Wallabe Street 42 Sydney',
// }
