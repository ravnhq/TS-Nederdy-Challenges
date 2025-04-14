/**
 * Exercise #1: Filter object properties by type.
 *
 * Using a utility type `OmitByType`, this example demonstrates how to pick properties
 * from a type `T` whose values are *not* assignable to a specified type `U`.
 *
 * @example
 * type OmitBoolean = OmitByType<{
 *   name: string; key="name"
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

//T = 'name', 'count', 'isReadonly', 'isEnable'

// Add here your solution
type OmitByType<T, TProp> = {
  [K in keyof T as T[K] extends TProp ? never : K]: T[K]
}

type User1 = {
  id: number
  name: string
  age: number
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
}
type UserProps = OmitByType<User1, Date>

// Add here your example

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

type LogicType<C extends boolean, T, F> = C extends true ? T : F

// Add here your example
// type ButtonVariants = {S
//   primary: true
//   secondary: false
//   tertiary: false
// }

// type ButtonStyles = LogicType<ButtonVariants, 'bg-blue-500', 'bg-gray-300'>

interface Task {
  id: number
  title: string
  isCompleted: boolean
}

// Represents a user and their ability to edit completed tasks
type UserTaskPermissions<IsAdmin extends boolean> = {
  userId: number
  username: string
  isAdmin: IsAdmin
  canEditCompletedTasks: LogicType<IsAdmin, boolean, false> // Only admins can potentially edit completed tasks
}

// An administrator user who has the potential to edit completed tasks (flag is true)
const adminUserWithTaskPermissions: UserTaskPermissions<true> = {
  userId: 101,
  username: 'BossMan',
  isAdmin: true,
  canEditCompletedTasks: true, // This admin has the permission
}

// A regular user who cannot edit completed tasks (isAdmin is false, so permission is false)
const regularUserWithTaskPermissions: UserTaskPermissions<false> = {
  userId: 102,
  username: 'WorkerBee',
  isAdmin: false,
  canEditCompletedTasks: false,
}
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

// Add here your example
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
}
todo.title = 'Hi'

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
type MyReturnType<TFunction extends (...args: any[]) => any> =
  TFunction extends (...args: any[]) => infer Result ? Result : never

// Add here your example
// Simulated API call
const fetchUser = (id: number) => {
  return {
    id,
    name: 'Daniel',
    email: 'daniel.example@example.com',
  }
}

// Extract return type of fetchUser
type UserData = MyReturnType<typeof fetchUser>

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

type MyAwaitedType<T> = T extends (...args: any[]) => infer R
  ? MyAwaitedType<R>
  : T extends Promise<infer U>
  ? MyAwaitedType<U>
  : T

// Add here your example

const getData = () => {
  return Promise.resolve(
    Promise.resolve({
      userId: 1,
      name: 'Alice',
    }),
  )
}

const fetchPost = async () => {
  return {
    id: 101,
    title: 'Hello World',
    published: true,
  }
}

type Result = MyAwaitedType<typeof fetchPost>
type Result2 = MyAwaitedType<typeof getData>

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
// type RequiredByKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

type RequiredByKeys<T, K extends keyof T = keyof T> = [K] extends [never]
  ? {
      [V in keyof T]-?: T[V]
    }
  : T & { [P in K]-?: T[P] } extends infer O
  ? { [R in keyof O]: O[R] }
  : never

//

// type RequiredByKeys<T, K extends keyof T> = Required<Pick<T, K>> & T

// Add here your solution
// Add here your example

interface User {
  name?: string
  age?: number
  address?: string
}

type UserRequiredName = RequiredByKeys<User>

// T &
// {
//   [PropertieVar in K]-?: T[PropertieVar]
// } extends infer TemporaryVar
// ? {
//     [SecondPropertieVar in keyof TemporaryVar]: TemporaryVar[SecondPropertieVar]
//   }
// : never
