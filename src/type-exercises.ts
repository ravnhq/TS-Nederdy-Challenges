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
type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P]
}

// Add here your example
type CreditCard = {
  cardNumber: string
  expirationDate: Date
  cvv: string
}

type Client = {
  name: string
  lastname: string
  emailAddres: string
  birthDate: Date
  active: boolean
  verified: boolean
  activeCreditCard: CreditCard
  alternativeCreditCard?: CreditCard
}

type toSendClient = OmitByType<Client, CreditCard>

// Defining a client object with all data, including sensitive information
const client: Client = {
  name: 'Javier',
  lastname: 'Flores',
  emailAddres: 'javier.flores@raven.co',
  birthDate: new Date('5/24/2002'),
  active: false,
  verified: true,
  activeCreditCard: {
    cardNumber: '111122223333444',
    cvv: '123',
    expirationDate: new Date('5/24/2032'),
  },
}

// Destructuring to exclude sensitive data
const {
  name: clientName,
  lastname,
  emailAddres,
  birthDate,
  active,
  verified,
} = client
const sendingClient: toSendClient = {
  name: clientName,
  lastname,
  emailAddres,
  birthDate,
  active,
  verified,
}

// Now we can do something (like calling an API, or something like that) only with the general dataa
const doSomething = (client: toSendClient) => {
  console.log(client)
}
doSomething(sendingClient)
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

// Usage examples:
type ClientWithoutCards = Omit<
  Client,
  'activeCreditCard' | 'alternativeCreditCard'
>
type ConditionalClient<C extends boolean> = If<C, Client, ClientWithoutCards>
type VerifiedClient = ConditionalClient<true>
type UnverifiedClient = ConditionalClient<false>

// Add here your example

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
  readonly [P in keyof T]: T[P]
}

type ReadOnlyClient = MyReadonly<Client>
const readClient = client as ReadOnlyClient

console.log(readClient)

//Now we can't modify any property of readClient
//readClient.active = false

// Add here your example

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
type MyReturnType<F> = F extends (...args: any) => infer R ? R : any
const readOrEditClient = (operation: 'read' | 'edit') => {
  if (operation === 'edit') {
    const verifiedClient: VerifiedClient = client as VerifiedClient
    return verifiedClient
  } else {
    const unverifiedClient: UnverifiedClient = client as UnverifiedClient
    return unverifiedClient
  }
}

type functionType = MyReturnType<typeof readOrEditClient>

// Add here your example

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
type MyAwaited<T extends Promise<any>> = T extends Promise<infer U> ? U : never

// Add here your example
type MyAwaitedClient = MyAwaited<Promise<Client>>

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
 * // expected to be: { name: string; age?: number; address?: string }
 */

type RequiredByKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

type FullRequiredClient = RequiredByKeys<Client, 'alternativeCreditCard'>

const fullClient: FullRequiredClient = {
  name: 'Javier',
  lastname: 'Flores',
  emailAddres: 'javier.flores@raven.co',
  birthDate: new Date('5/24/2002'),
  active: false,
  verified: true,
  activeCreditCard: {
    cardNumber: '111122223333444',
    cvv: '123',
    expirationDate: new Date('5/24/2032'),
  },
  alternativeCreditCard: {
    cardNumber: '4444333322221111',
    cvv: '321',
    expirationDate: new Date('5/20/2032'),
  },
}
