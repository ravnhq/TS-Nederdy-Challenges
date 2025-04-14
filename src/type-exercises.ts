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

// 1.1 Add here your solution:
type OmitByType<Type, Property> = {
    [K in keyof Type as Type[K] extends Property ? never : K]: Type[K]
}

// 1.2 Add here your example:
type AdminPrivilegue = {
    id: number
    name: string
    active: boolean
    privilege: symbol
}

type NormalUser = OmitByType<AdminPrivilegue, symbol>

/** 1.3 This example will return this type very useful to remove properties:
 *  type NormalUser = {
 *  id: number
 *  name: string;
 *  active: boolean}
 /*


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

// 2.1 Add here your solution:
type If<condition extends boolean, TrueArg, FalseArg> = condition extends true
    ? TrueArg
    : FalseArg

// 2.2 Add here your example:
type Usertype<IsPremium extends boolean> = {
    name: string
    type: If<IsPremium, 'premium', 'normal'>
}

type UserPremium = Usertype<true> // type: "premium"
type UserNormal = Usertype<false> // type: "normal"

/**
 * 2.3 This type is very useful to change privileges among users using just one type:
 
 * type UserPremium = {
    name: string;
    type: "premium";
}
    type UserNormal = {
    name: string;
    type: "normal";
}  
 */

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

// 3.1 Add here your solution
type MyReadonly<T> = {
    readonly [K in keyof T]: T[K]
}
// 3.2 Add here your example
type plants = {
    name: string
    water: boolean
    sunlight: boolean
}

type MyReadonlyplant = MyReadonly<plants>

/**
3.3 This example will return in compilation time type:
     MyReadonlyplant = {
     readonly name: string;
     readonly water: boolean;
     readonly sunlight: boolean}
     
     very important to protect the type from mutability.
 */

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

// 4.1 Add here your solution:
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

// 4.2 Add here your example:
function getuserinfo(id: number) {
    return {
        id,
        name: 'Gustavo',
        active: true,
    }
}

type InfoUser = MyReturnType<typeof getuserinfo>
/** 4.3 This example will return de information of a user API callback example:
 *  {
     id: number;
     name: string;
     active: boolean;
    }
*/

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

// 5.1 Add here your solution:
type MyAwaited<T> = T extends Promise<infer U> ? U : null

// 5.2 Add here your example:
async function obtainName(): Promise<string> {
    //This will simulate an API call
    return 'Alonso'
}

type ResultInfo = MyAwaited<ReturnType<typeof obtainName>>
/**5.3 The ResulInfo will return "string" very useful to obtain 
 * which type of data we are calling from an API.
/*

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

// 6.1 Add here your solution:
type RequiredByKeys<T, K extends keyof T = keyof T> = T &
{ [Prop in K]-?: T[Prop] } extends infer Combined
    ? {
        [Prop in keyof Combined]: Combined[Prop]
    }
    : never

// 6.2 Add here your example:
interface FormContact {
    name?: string
    email?: string
    phone?: string
}
type Validform = RequiredByKeys<FormContact, 'name'>
/**
 * 6.3 This will return type
 * type Validform = {
    name: string;
    email?: string | undefined;
    phone?: string | undefined;
    }
 * Very important if we need some required information in a form example
 */
