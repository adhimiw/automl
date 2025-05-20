
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model ConceptExplanation
 * 
 */
export type ConceptExplanation = $Result.DefaultSelection<Prisma.$ConceptExplanationPayload>
/**
 * Model Tutorial
 * 
 */
export type Tutorial = $Result.DefaultSelection<Prisma.$TutorialPayload>
/**
 * Model TutorialStep
 * 
 */
export type TutorialStep = $Result.DefaultSelection<Prisma.$TutorialStepPayload>
/**
 * Model Exercise
 * 
 */
export type Exercise = $Result.DefaultSelection<Prisma.$ExercisePayload>
/**
 * Model QuizQuestion
 * 
 */
export type QuizQuestion = $Result.DefaultSelection<Prisma.$QuizQuestionPayload>
/**
 * Model LearningPath
 * 
 */
export type LearningPath = $Result.DefaultSelection<Prisma.$LearningPathPayload>
/**
 * Model LearningPathItem
 * 
 */
export type LearningPathItem = $Result.DefaultSelection<Prisma.$LearningPathItemPayload>
/**
 * Model UserProgress
 * 
 */
export type UserProgress = $Result.DefaultSelection<Prisma.$UserProgressPayload>
/**
 * Model LearningPathProgress
 * 
 */
export type LearningPathProgress = $Result.DefaultSelection<Prisma.$LearningPathProgressPayload>
/**
 * Model UserSolution
 * 
 */
export type UserSolution = $Result.DefaultSelection<Prisma.$UserSolutionPayload>
/**
 * Model UserQuizAnswer
 * 
 */
export type UserQuizAnswer = $Result.DefaultSelection<Prisma.$UserQuizAnswerPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conceptExplanation`: Exposes CRUD operations for the **ConceptExplanation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ConceptExplanations
    * const conceptExplanations = await prisma.conceptExplanation.findMany()
    * ```
    */
  get conceptExplanation(): Prisma.ConceptExplanationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tutorial`: Exposes CRUD operations for the **Tutorial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tutorials
    * const tutorials = await prisma.tutorial.findMany()
    * ```
    */
  get tutorial(): Prisma.TutorialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tutorialStep`: Exposes CRUD operations for the **TutorialStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TutorialSteps
    * const tutorialSteps = await prisma.tutorialStep.findMany()
    * ```
    */
  get tutorialStep(): Prisma.TutorialStepDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exercise`: Exposes CRUD operations for the **Exercise** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Exercises
    * const exercises = await prisma.exercise.findMany()
    * ```
    */
  get exercise(): Prisma.ExerciseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.quizQuestion`: Exposes CRUD operations for the **QuizQuestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QuizQuestions
    * const quizQuestions = await prisma.quizQuestion.findMany()
    * ```
    */
  get quizQuestion(): Prisma.QuizQuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.learningPath`: Exposes CRUD operations for the **LearningPath** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningPaths
    * const learningPaths = await prisma.learningPath.findMany()
    * ```
    */
  get learningPath(): Prisma.LearningPathDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.learningPathItem`: Exposes CRUD operations for the **LearningPathItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningPathItems
    * const learningPathItems = await prisma.learningPathItem.findMany()
    * ```
    */
  get learningPathItem(): Prisma.LearningPathItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProgress`: Exposes CRUD operations for the **UserProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProgresses
    * const userProgresses = await prisma.userProgress.findMany()
    * ```
    */
  get userProgress(): Prisma.UserProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.learningPathProgress`: Exposes CRUD operations for the **LearningPathProgress** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningPathProgresses
    * const learningPathProgresses = await prisma.learningPathProgress.findMany()
    * ```
    */
  get learningPathProgress(): Prisma.LearningPathProgressDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSolution`: Exposes CRUD operations for the **UserSolution** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSolutions
    * const userSolutions = await prisma.userSolution.findMany()
    * ```
    */
  get userSolution(): Prisma.UserSolutionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userQuizAnswer`: Exposes CRUD operations for the **UserQuizAnswer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserQuizAnswers
    * const userQuizAnswers = await prisma.userQuizAnswer.findMany()
    * ```
    */
  get userQuizAnswer(): Prisma.UserQuizAnswerDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Project: 'Project',
    ConceptExplanation: 'ConceptExplanation',
    Tutorial: 'Tutorial',
    TutorialStep: 'TutorialStep',
    Exercise: 'Exercise',
    QuizQuestion: 'QuizQuestion',
    LearningPath: 'LearningPath',
    LearningPathItem: 'LearningPathItem',
    UserProgress: 'UserProgress',
    LearningPathProgress: 'LearningPathProgress',
    UserSolution: 'UserSolution',
    UserQuizAnswer: 'UserQuizAnswer'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "project" | "conceptExplanation" | "tutorial" | "tutorialStep" | "exercise" | "quizQuestion" | "learningPath" | "learningPathItem" | "userProgress" | "learningPathProgress" | "userSolution" | "userQuizAnswer"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      ConceptExplanation: {
        payload: Prisma.$ConceptExplanationPayload<ExtArgs>
        fields: Prisma.ConceptExplanationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConceptExplanationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConceptExplanationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConceptExplanationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConceptExplanationPayload>
          }
          findFirst: {
            args: Prisma.ConceptExplanationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConceptExplanationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConceptExplanationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConceptExplanationPayload>
          }
          findMany: {
            args: Prisma.ConceptExplanationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConceptExplanationPayload>[]
          }
          create: {
            args: Prisma.ConceptExplanationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConceptExplanationPayload>
          }
          createMany: {
            args: Prisma.ConceptExplanationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConceptExplanationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConceptExplanationPayload>[]
          }
          delete: {
            args: Prisma.ConceptExplanationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConceptExplanationPayload>
          }
          update: {
            args: Prisma.ConceptExplanationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConceptExplanationPayload>
          }
          deleteMany: {
            args: Prisma.ConceptExplanationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConceptExplanationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ConceptExplanationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConceptExplanationPayload>[]
          }
          upsert: {
            args: Prisma.ConceptExplanationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConceptExplanationPayload>
          }
          aggregate: {
            args: Prisma.ConceptExplanationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConceptExplanation>
          }
          groupBy: {
            args: Prisma.ConceptExplanationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConceptExplanationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConceptExplanationCountArgs<ExtArgs>
            result: $Utils.Optional<ConceptExplanationCountAggregateOutputType> | number
          }
        }
      }
      Tutorial: {
        payload: Prisma.$TutorialPayload<ExtArgs>
        fields: Prisma.TutorialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TutorialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TutorialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPayload>
          }
          findFirst: {
            args: Prisma.TutorialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TutorialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPayload>
          }
          findMany: {
            args: Prisma.TutorialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPayload>[]
          }
          create: {
            args: Prisma.TutorialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPayload>
          }
          createMany: {
            args: Prisma.TutorialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TutorialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPayload>[]
          }
          delete: {
            args: Prisma.TutorialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPayload>
          }
          update: {
            args: Prisma.TutorialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPayload>
          }
          deleteMany: {
            args: Prisma.TutorialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TutorialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TutorialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPayload>[]
          }
          upsert: {
            args: Prisma.TutorialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialPayload>
          }
          aggregate: {
            args: Prisma.TutorialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTutorial>
          }
          groupBy: {
            args: Prisma.TutorialGroupByArgs<ExtArgs>
            result: $Utils.Optional<TutorialGroupByOutputType>[]
          }
          count: {
            args: Prisma.TutorialCountArgs<ExtArgs>
            result: $Utils.Optional<TutorialCountAggregateOutputType> | number
          }
        }
      }
      TutorialStep: {
        payload: Prisma.$TutorialStepPayload<ExtArgs>
        fields: Prisma.TutorialStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TutorialStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TutorialStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialStepPayload>
          }
          findFirst: {
            args: Prisma.TutorialStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TutorialStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialStepPayload>
          }
          findMany: {
            args: Prisma.TutorialStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialStepPayload>[]
          }
          create: {
            args: Prisma.TutorialStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialStepPayload>
          }
          createMany: {
            args: Prisma.TutorialStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TutorialStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialStepPayload>[]
          }
          delete: {
            args: Prisma.TutorialStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialStepPayload>
          }
          update: {
            args: Prisma.TutorialStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialStepPayload>
          }
          deleteMany: {
            args: Prisma.TutorialStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TutorialStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TutorialStepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialStepPayload>[]
          }
          upsert: {
            args: Prisma.TutorialStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TutorialStepPayload>
          }
          aggregate: {
            args: Prisma.TutorialStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTutorialStep>
          }
          groupBy: {
            args: Prisma.TutorialStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<TutorialStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.TutorialStepCountArgs<ExtArgs>
            result: $Utils.Optional<TutorialStepCountAggregateOutputType> | number
          }
        }
      }
      Exercise: {
        payload: Prisma.$ExercisePayload<ExtArgs>
        fields: Prisma.ExerciseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExerciseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExerciseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findFirst: {
            args: Prisma.ExerciseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExerciseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          findMany: {
            args: Prisma.ExerciseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          create: {
            args: Prisma.ExerciseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          createMany: {
            args: Prisma.ExerciseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExerciseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          delete: {
            args: Prisma.ExerciseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          update: {
            args: Prisma.ExerciseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          deleteMany: {
            args: Prisma.ExerciseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExerciseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExerciseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>[]
          }
          upsert: {
            args: Prisma.ExerciseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExercisePayload>
          }
          aggregate: {
            args: Prisma.ExerciseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExercise>
          }
          groupBy: {
            args: Prisma.ExerciseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExerciseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExerciseCountArgs<ExtArgs>
            result: $Utils.Optional<ExerciseCountAggregateOutputType> | number
          }
        }
      }
      QuizQuestion: {
        payload: Prisma.$QuizQuestionPayload<ExtArgs>
        fields: Prisma.QuizQuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuizQuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuizQuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          findFirst: {
            args: Prisma.QuizQuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuizQuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          findMany: {
            args: Prisma.QuizQuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          create: {
            args: Prisma.QuizQuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          createMany: {
            args: Prisma.QuizQuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QuizQuestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          delete: {
            args: Prisma.QuizQuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          update: {
            args: Prisma.QuizQuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuizQuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuizQuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QuizQuestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>[]
          }
          upsert: {
            args: Prisma.QuizQuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuizQuestionPayload>
          }
          aggregate: {
            args: Prisma.QuizQuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuizQuestion>
          }
          groupBy: {
            args: Prisma.QuizQuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuizQuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuizQuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuizQuestionCountAggregateOutputType> | number
          }
        }
      }
      LearningPath: {
        payload: Prisma.$LearningPathPayload<ExtArgs>
        fields: Prisma.LearningPathFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningPathFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningPathFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathPayload>
          }
          findFirst: {
            args: Prisma.LearningPathFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningPathFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathPayload>
          }
          findMany: {
            args: Prisma.LearningPathFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathPayload>[]
          }
          create: {
            args: Prisma.LearningPathCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathPayload>
          }
          createMany: {
            args: Prisma.LearningPathCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningPathCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathPayload>[]
          }
          delete: {
            args: Prisma.LearningPathDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathPayload>
          }
          update: {
            args: Prisma.LearningPathUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathPayload>
          }
          deleteMany: {
            args: Prisma.LearningPathDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningPathUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningPathUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathPayload>[]
          }
          upsert: {
            args: Prisma.LearningPathUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathPayload>
          }
          aggregate: {
            args: Prisma.LearningPathAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningPath>
          }
          groupBy: {
            args: Prisma.LearningPathGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningPathGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningPathCountArgs<ExtArgs>
            result: $Utils.Optional<LearningPathCountAggregateOutputType> | number
          }
        }
      }
      LearningPathItem: {
        payload: Prisma.$LearningPathItemPayload<ExtArgs>
        fields: Prisma.LearningPathItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningPathItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningPathItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathItemPayload>
          }
          findFirst: {
            args: Prisma.LearningPathItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningPathItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathItemPayload>
          }
          findMany: {
            args: Prisma.LearningPathItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathItemPayload>[]
          }
          create: {
            args: Prisma.LearningPathItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathItemPayload>
          }
          createMany: {
            args: Prisma.LearningPathItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningPathItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathItemPayload>[]
          }
          delete: {
            args: Prisma.LearningPathItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathItemPayload>
          }
          update: {
            args: Prisma.LearningPathItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathItemPayload>
          }
          deleteMany: {
            args: Prisma.LearningPathItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningPathItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningPathItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathItemPayload>[]
          }
          upsert: {
            args: Prisma.LearningPathItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathItemPayload>
          }
          aggregate: {
            args: Prisma.LearningPathItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningPathItem>
          }
          groupBy: {
            args: Prisma.LearningPathItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningPathItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningPathItemCountArgs<ExtArgs>
            result: $Utils.Optional<LearningPathItemCountAggregateOutputType> | number
          }
        }
      }
      UserProgress: {
        payload: Prisma.$UserProgressPayload<ExtArgs>
        fields: Prisma.UserProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          findFirst: {
            args: Prisma.UserProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          findMany: {
            args: Prisma.UserProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>[]
          }
          create: {
            args: Prisma.UserProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          createMany: {
            args: Prisma.UserProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>[]
          }
          delete: {
            args: Prisma.UserProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          update: {
            args: Prisma.UserProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          deleteMany: {
            args: Prisma.UserProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>[]
          }
          upsert: {
            args: Prisma.UserProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProgressPayload>
          }
          aggregate: {
            args: Prisma.UserProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProgress>
          }
          groupBy: {
            args: Prisma.UserProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProgressCountArgs<ExtArgs>
            result: $Utils.Optional<UserProgressCountAggregateOutputType> | number
          }
        }
      }
      LearningPathProgress: {
        payload: Prisma.$LearningPathProgressPayload<ExtArgs>
        fields: Prisma.LearningPathProgressFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningPathProgressFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathProgressPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningPathProgressFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathProgressPayload>
          }
          findFirst: {
            args: Prisma.LearningPathProgressFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathProgressPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningPathProgressFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathProgressPayload>
          }
          findMany: {
            args: Prisma.LearningPathProgressFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathProgressPayload>[]
          }
          create: {
            args: Prisma.LearningPathProgressCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathProgressPayload>
          }
          createMany: {
            args: Prisma.LearningPathProgressCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningPathProgressCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathProgressPayload>[]
          }
          delete: {
            args: Prisma.LearningPathProgressDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathProgressPayload>
          }
          update: {
            args: Prisma.LearningPathProgressUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathProgressPayload>
          }
          deleteMany: {
            args: Prisma.LearningPathProgressDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningPathProgressUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningPathProgressUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathProgressPayload>[]
          }
          upsert: {
            args: Prisma.LearningPathProgressUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningPathProgressPayload>
          }
          aggregate: {
            args: Prisma.LearningPathProgressAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningPathProgress>
          }
          groupBy: {
            args: Prisma.LearningPathProgressGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningPathProgressGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningPathProgressCountArgs<ExtArgs>
            result: $Utils.Optional<LearningPathProgressCountAggregateOutputType> | number
          }
        }
      }
      UserSolution: {
        payload: Prisma.$UserSolutionPayload<ExtArgs>
        fields: Prisma.UserSolutionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSolutionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSolutionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSolutionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSolutionPayload>
          }
          findFirst: {
            args: Prisma.UserSolutionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSolutionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSolutionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSolutionPayload>
          }
          findMany: {
            args: Prisma.UserSolutionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSolutionPayload>[]
          }
          create: {
            args: Prisma.UserSolutionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSolutionPayload>
          }
          createMany: {
            args: Prisma.UserSolutionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSolutionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSolutionPayload>[]
          }
          delete: {
            args: Prisma.UserSolutionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSolutionPayload>
          }
          update: {
            args: Prisma.UserSolutionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSolutionPayload>
          }
          deleteMany: {
            args: Prisma.UserSolutionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSolutionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSolutionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSolutionPayload>[]
          }
          upsert: {
            args: Prisma.UserSolutionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSolutionPayload>
          }
          aggregate: {
            args: Prisma.UserSolutionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSolution>
          }
          groupBy: {
            args: Prisma.UserSolutionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSolutionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSolutionCountArgs<ExtArgs>
            result: $Utils.Optional<UserSolutionCountAggregateOutputType> | number
          }
        }
      }
      UserQuizAnswer: {
        payload: Prisma.$UserQuizAnswerPayload<ExtArgs>
        fields: Prisma.UserQuizAnswerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserQuizAnswerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuizAnswerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserQuizAnswerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuizAnswerPayload>
          }
          findFirst: {
            args: Prisma.UserQuizAnswerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuizAnswerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserQuizAnswerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuizAnswerPayload>
          }
          findMany: {
            args: Prisma.UserQuizAnswerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuizAnswerPayload>[]
          }
          create: {
            args: Prisma.UserQuizAnswerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuizAnswerPayload>
          }
          createMany: {
            args: Prisma.UserQuizAnswerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserQuizAnswerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuizAnswerPayload>[]
          }
          delete: {
            args: Prisma.UserQuizAnswerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuizAnswerPayload>
          }
          update: {
            args: Prisma.UserQuizAnswerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuizAnswerPayload>
          }
          deleteMany: {
            args: Prisma.UserQuizAnswerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserQuizAnswerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserQuizAnswerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuizAnswerPayload>[]
          }
          upsert: {
            args: Prisma.UserQuizAnswerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserQuizAnswerPayload>
          }
          aggregate: {
            args: Prisma.UserQuizAnswerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserQuizAnswer>
          }
          groupBy: {
            args: Prisma.UserQuizAnswerGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserQuizAnswerGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserQuizAnswerCountArgs<ExtArgs>
            result: $Utils.Optional<UserQuizAnswerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    project?: ProjectOmit
    conceptExplanation?: ConceptExplanationOmit
    tutorial?: TutorialOmit
    tutorialStep?: TutorialStepOmit
    exercise?: ExerciseOmit
    quizQuestion?: QuizQuestionOmit
    learningPath?: LearningPathOmit
    learningPathItem?: LearningPathItemOmit
    userProgress?: UserProgressOmit
    learningPathProgress?: LearningPathProgressOmit
    userSolution?: UserSolutionOmit
    userQuizAnswer?: UserQuizAnswerOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    projects: number
    user_progress: number
    learning_paths_progress: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | UserCountOutputTypeCountProjectsArgs
    user_progress?: boolean | UserCountOutputTypeCountUser_progressArgs
    learning_paths_progress?: boolean | UserCountOutputTypeCountLearning_paths_progressArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUser_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProgressWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountLearning_paths_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningPathProgressWhereInput
  }


  /**
   * Count Type ConceptExplanationCountOutputType
   */

  export type ConceptExplanationCountOutputType = {
    user_progress: number
  }

  export type ConceptExplanationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_progress?: boolean | ConceptExplanationCountOutputTypeCountUser_progressArgs
  }

  // Custom InputTypes
  /**
   * ConceptExplanationCountOutputType without action
   */
  export type ConceptExplanationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanationCountOutputType
     */
    select?: ConceptExplanationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConceptExplanationCountOutputType without action
   */
  export type ConceptExplanationCountOutputTypeCountUser_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProgressWhereInput
  }


  /**
   * Count Type TutorialCountOutputType
   */

  export type TutorialCountOutputType = {
    steps: number
    exercises: number
    quiz_questions: number
    user_progress: number
  }

  export type TutorialCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | TutorialCountOutputTypeCountStepsArgs
    exercises?: boolean | TutorialCountOutputTypeCountExercisesArgs
    quiz_questions?: boolean | TutorialCountOutputTypeCountQuiz_questionsArgs
    user_progress?: boolean | TutorialCountOutputTypeCountUser_progressArgs
  }

  // Custom InputTypes
  /**
   * TutorialCountOutputType without action
   */
  export type TutorialCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialCountOutputType
     */
    select?: TutorialCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TutorialCountOutputType without action
   */
  export type TutorialCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TutorialStepWhereInput
  }

  /**
   * TutorialCountOutputType without action
   */
  export type TutorialCountOutputTypeCountExercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
  }

  /**
   * TutorialCountOutputType without action
   */
  export type TutorialCountOutputTypeCountQuiz_questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizQuestionWhereInput
  }

  /**
   * TutorialCountOutputType without action
   */
  export type TutorialCountOutputTypeCountUser_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProgressWhereInput
  }


  /**
   * Count Type ExerciseCountOutputType
   */

  export type ExerciseCountOutputType = {
    user_solutions: number
  }

  export type ExerciseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_solutions?: boolean | ExerciseCountOutputTypeCountUser_solutionsArgs
  }

  // Custom InputTypes
  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExerciseCountOutputType
     */
    select?: ExerciseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExerciseCountOutputType without action
   */
  export type ExerciseCountOutputTypeCountUser_solutionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSolutionWhereInput
  }


  /**
   * Count Type QuizQuestionCountOutputType
   */

  export type QuizQuestionCountOutputType = {
    user_answers: number
  }

  export type QuizQuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_answers?: boolean | QuizQuestionCountOutputTypeCountUser_answersArgs
  }

  // Custom InputTypes
  /**
   * QuizQuestionCountOutputType without action
   */
  export type QuizQuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestionCountOutputType
     */
    select?: QuizQuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuizQuestionCountOutputType without action
   */
  export type QuizQuestionCountOutputTypeCountUser_answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserQuizAnswerWhereInput
  }


  /**
   * Count Type LearningPathCountOutputType
   */

  export type LearningPathCountOutputType = {
    learning_path_items: number
    learning_paths_progress: number
  }

  export type LearningPathCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    learning_path_items?: boolean | LearningPathCountOutputTypeCountLearning_path_itemsArgs
    learning_paths_progress?: boolean | LearningPathCountOutputTypeCountLearning_paths_progressArgs
  }

  // Custom InputTypes
  /**
   * LearningPathCountOutputType without action
   */
  export type LearningPathCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathCountOutputType
     */
    select?: LearningPathCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LearningPathCountOutputType without action
   */
  export type LearningPathCountOutputTypeCountLearning_path_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningPathItemWhereInput
  }

  /**
   * LearningPathCountOutputType without action
   */
  export type LearningPathCountOutputTypeCountLearning_paths_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningPathProgressWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password_hash: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    password_hash: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password_hash: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password_hash?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password_hash?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password_hash?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string
    password_hash: string
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password_hash?: boolean
    created_at?: boolean
    updated_at?: boolean
    projects?: boolean | User$projectsArgs<ExtArgs>
    user_progress?: boolean | User$user_progressArgs<ExtArgs>
    learning_paths_progress?: boolean | User$learning_paths_progressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password_hash?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    password_hash?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    password_hash?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "password_hash" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    projects?: boolean | User$projectsArgs<ExtArgs>
    user_progress?: boolean | User$user_progressArgs<ExtArgs>
    learning_paths_progress?: boolean | User$learning_paths_progressArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      projects: Prisma.$ProjectPayload<ExtArgs>[]
      user_progress: Prisma.$UserProgressPayload<ExtArgs>[]
      learning_paths_progress: Prisma.$LearningPathProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string
      password_hash: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    projects<T extends User$projectsArgs<ExtArgs> = {}>(args?: Subset<T, User$projectsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_progress<T extends User$user_progressArgs<ExtArgs> = {}>(args?: Subset<T, User$user_progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    learning_paths_progress<T extends User$learning_paths_progressArgs<ExtArgs> = {}>(args?: Subset<T, User$learning_paths_progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.projects
   */
  export type User$projectsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.user_progress
   */
  export type User$user_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    where?: UserProgressWhereInput
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    cursor?: UserProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * User.learning_paths_progress
   */
  export type User$learning_paths_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
    where?: LearningPathProgressWhereInput
    orderBy?: LearningPathProgressOrderByWithRelationInput | LearningPathProgressOrderByWithRelationInput[]
    cursor?: LearningPathProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LearningPathProgressScalarFieldEnum | LearningPathProgressScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type ProjectSumAggregateOutputType = {
    id: number | null
    user_id: number | null
  }

  export type ProjectMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    user_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    user_id: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    name: number
    description: number
    user_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type ProjectSumAggregateInputType = {
    id?: true
    user_id?: true
  }

  export type ProjectMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    user_id?: true
    created_at?: true
    updated_at?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    user_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: number
    name: string
    description: string | null
    user_id: number
    created_at: Date
    updated_at: Date
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "user_id" | "created_at" | "updated_at", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      user_id: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'Int'>
    readonly name: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly user_id: FieldRef<"Project", 'Int'>
    readonly created_at: FieldRef<"Project", 'DateTime'>
    readonly updated_at: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model ConceptExplanation
   */

  export type AggregateConceptExplanation = {
    _count: ConceptExplanationCountAggregateOutputType | null
    _avg: ConceptExplanationAvgAggregateOutputType | null
    _sum: ConceptExplanationSumAggregateOutputType | null
    _min: ConceptExplanationMinAggregateOutputType | null
    _max: ConceptExplanationMaxAggregateOutputType | null
  }

  export type ConceptExplanationAvgAggregateOutputType = {
    id: number | null
  }

  export type ConceptExplanationSumAggregateOutputType = {
    id: number | null
  }

  export type ConceptExplanationMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    summary: string | null
    difficulty: string | null
    category: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ConceptExplanationMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    summary: string | null
    difficulty: string | null
    category: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ConceptExplanationCountAggregateOutputType = {
    id: number
    title: number
    content: number
    summary: number
    related_concepts: number
    prerequisites: number
    difficulty: number
    visual_aids: number
    category: number
    tags: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ConceptExplanationAvgAggregateInputType = {
    id?: true
  }

  export type ConceptExplanationSumAggregateInputType = {
    id?: true
  }

  export type ConceptExplanationMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    summary?: true
    difficulty?: true
    category?: true
    created_at?: true
    updated_at?: true
  }

  export type ConceptExplanationMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    summary?: true
    difficulty?: true
    category?: true
    created_at?: true
    updated_at?: true
  }

  export type ConceptExplanationCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    summary?: true
    related_concepts?: true
    prerequisites?: true
    difficulty?: true
    visual_aids?: true
    category?: true
    tags?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ConceptExplanationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConceptExplanation to aggregate.
     */
    where?: ConceptExplanationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConceptExplanations to fetch.
     */
    orderBy?: ConceptExplanationOrderByWithRelationInput | ConceptExplanationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConceptExplanationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConceptExplanations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConceptExplanations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ConceptExplanations
    **/
    _count?: true | ConceptExplanationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ConceptExplanationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ConceptExplanationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConceptExplanationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConceptExplanationMaxAggregateInputType
  }

  export type GetConceptExplanationAggregateType<T extends ConceptExplanationAggregateArgs> = {
        [P in keyof T & keyof AggregateConceptExplanation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConceptExplanation[P]>
      : GetScalarType<T[P], AggregateConceptExplanation[P]>
  }




  export type ConceptExplanationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConceptExplanationWhereInput
    orderBy?: ConceptExplanationOrderByWithAggregationInput | ConceptExplanationOrderByWithAggregationInput[]
    by: ConceptExplanationScalarFieldEnum[] | ConceptExplanationScalarFieldEnum
    having?: ConceptExplanationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConceptExplanationCountAggregateInputType | true
    _avg?: ConceptExplanationAvgAggregateInputType
    _sum?: ConceptExplanationSumAggregateInputType
    _min?: ConceptExplanationMinAggregateInputType
    _max?: ConceptExplanationMaxAggregateInputType
  }

  export type ConceptExplanationGroupByOutputType = {
    id: number
    title: string
    content: string
    summary: string
    related_concepts: string[]
    prerequisites: string[]
    difficulty: string
    visual_aids: JsonValue
    category: string
    tags: string[]
    created_at: Date
    updated_at: Date
    _count: ConceptExplanationCountAggregateOutputType | null
    _avg: ConceptExplanationAvgAggregateOutputType | null
    _sum: ConceptExplanationSumAggregateOutputType | null
    _min: ConceptExplanationMinAggregateOutputType | null
    _max: ConceptExplanationMaxAggregateOutputType | null
  }

  type GetConceptExplanationGroupByPayload<T extends ConceptExplanationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConceptExplanationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConceptExplanationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConceptExplanationGroupByOutputType[P]>
            : GetScalarType<T[P], ConceptExplanationGroupByOutputType[P]>
        }
      >
    >


  export type ConceptExplanationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    summary?: boolean
    related_concepts?: boolean
    prerequisites?: boolean
    difficulty?: boolean
    visual_aids?: boolean
    category?: boolean
    tags?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_progress?: boolean | ConceptExplanation$user_progressArgs<ExtArgs>
    _count?: boolean | ConceptExplanationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conceptExplanation"]>

  export type ConceptExplanationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    summary?: boolean
    related_concepts?: boolean
    prerequisites?: boolean
    difficulty?: boolean
    visual_aids?: boolean
    category?: boolean
    tags?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["conceptExplanation"]>

  export type ConceptExplanationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    summary?: boolean
    related_concepts?: boolean
    prerequisites?: boolean
    difficulty?: boolean
    visual_aids?: boolean
    category?: boolean
    tags?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["conceptExplanation"]>

  export type ConceptExplanationSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    summary?: boolean
    related_concepts?: boolean
    prerequisites?: boolean
    difficulty?: boolean
    visual_aids?: boolean
    category?: boolean
    tags?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ConceptExplanationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "summary" | "related_concepts" | "prerequisites" | "difficulty" | "visual_aids" | "category" | "tags" | "created_at" | "updated_at", ExtArgs["result"]["conceptExplanation"]>
  export type ConceptExplanationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_progress?: boolean | ConceptExplanation$user_progressArgs<ExtArgs>
    _count?: boolean | ConceptExplanationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConceptExplanationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ConceptExplanationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ConceptExplanationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ConceptExplanation"
    objects: {
      user_progress: Prisma.$UserProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string
      summary: string
      related_concepts: string[]
      prerequisites: string[]
      difficulty: string
      visual_aids: Prisma.JsonValue
      category: string
      tags: string[]
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["conceptExplanation"]>
    composites: {}
  }

  type ConceptExplanationGetPayload<S extends boolean | null | undefined | ConceptExplanationDefaultArgs> = $Result.GetResult<Prisma.$ConceptExplanationPayload, S>

  type ConceptExplanationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ConceptExplanationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ConceptExplanationCountAggregateInputType | true
    }

  export interface ConceptExplanationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ConceptExplanation'], meta: { name: 'ConceptExplanation' } }
    /**
     * Find zero or one ConceptExplanation that matches the filter.
     * @param {ConceptExplanationFindUniqueArgs} args - Arguments to find a ConceptExplanation
     * @example
     * // Get one ConceptExplanation
     * const conceptExplanation = await prisma.conceptExplanation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConceptExplanationFindUniqueArgs>(args: SelectSubset<T, ConceptExplanationFindUniqueArgs<ExtArgs>>): Prisma__ConceptExplanationClient<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ConceptExplanation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ConceptExplanationFindUniqueOrThrowArgs} args - Arguments to find a ConceptExplanation
     * @example
     * // Get one ConceptExplanation
     * const conceptExplanation = await prisma.conceptExplanation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConceptExplanationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConceptExplanationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConceptExplanationClient<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConceptExplanation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptExplanationFindFirstArgs} args - Arguments to find a ConceptExplanation
     * @example
     * // Get one ConceptExplanation
     * const conceptExplanation = await prisma.conceptExplanation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConceptExplanationFindFirstArgs>(args?: SelectSubset<T, ConceptExplanationFindFirstArgs<ExtArgs>>): Prisma__ConceptExplanationClient<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ConceptExplanation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptExplanationFindFirstOrThrowArgs} args - Arguments to find a ConceptExplanation
     * @example
     * // Get one ConceptExplanation
     * const conceptExplanation = await prisma.conceptExplanation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConceptExplanationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConceptExplanationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConceptExplanationClient<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ConceptExplanations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptExplanationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ConceptExplanations
     * const conceptExplanations = await prisma.conceptExplanation.findMany()
     * 
     * // Get first 10 ConceptExplanations
     * const conceptExplanations = await prisma.conceptExplanation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conceptExplanationWithIdOnly = await prisma.conceptExplanation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConceptExplanationFindManyArgs>(args?: SelectSubset<T, ConceptExplanationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ConceptExplanation.
     * @param {ConceptExplanationCreateArgs} args - Arguments to create a ConceptExplanation.
     * @example
     * // Create one ConceptExplanation
     * const ConceptExplanation = await prisma.conceptExplanation.create({
     *   data: {
     *     // ... data to create a ConceptExplanation
     *   }
     * })
     * 
     */
    create<T extends ConceptExplanationCreateArgs>(args: SelectSubset<T, ConceptExplanationCreateArgs<ExtArgs>>): Prisma__ConceptExplanationClient<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ConceptExplanations.
     * @param {ConceptExplanationCreateManyArgs} args - Arguments to create many ConceptExplanations.
     * @example
     * // Create many ConceptExplanations
     * const conceptExplanation = await prisma.conceptExplanation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConceptExplanationCreateManyArgs>(args?: SelectSubset<T, ConceptExplanationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ConceptExplanations and returns the data saved in the database.
     * @param {ConceptExplanationCreateManyAndReturnArgs} args - Arguments to create many ConceptExplanations.
     * @example
     * // Create many ConceptExplanations
     * const conceptExplanation = await prisma.conceptExplanation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ConceptExplanations and only return the `id`
     * const conceptExplanationWithIdOnly = await prisma.conceptExplanation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConceptExplanationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConceptExplanationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ConceptExplanation.
     * @param {ConceptExplanationDeleteArgs} args - Arguments to delete one ConceptExplanation.
     * @example
     * // Delete one ConceptExplanation
     * const ConceptExplanation = await prisma.conceptExplanation.delete({
     *   where: {
     *     // ... filter to delete one ConceptExplanation
     *   }
     * })
     * 
     */
    delete<T extends ConceptExplanationDeleteArgs>(args: SelectSubset<T, ConceptExplanationDeleteArgs<ExtArgs>>): Prisma__ConceptExplanationClient<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ConceptExplanation.
     * @param {ConceptExplanationUpdateArgs} args - Arguments to update one ConceptExplanation.
     * @example
     * // Update one ConceptExplanation
     * const conceptExplanation = await prisma.conceptExplanation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConceptExplanationUpdateArgs>(args: SelectSubset<T, ConceptExplanationUpdateArgs<ExtArgs>>): Prisma__ConceptExplanationClient<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ConceptExplanations.
     * @param {ConceptExplanationDeleteManyArgs} args - Arguments to filter ConceptExplanations to delete.
     * @example
     * // Delete a few ConceptExplanations
     * const { count } = await prisma.conceptExplanation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConceptExplanationDeleteManyArgs>(args?: SelectSubset<T, ConceptExplanationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConceptExplanations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptExplanationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ConceptExplanations
     * const conceptExplanation = await prisma.conceptExplanation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConceptExplanationUpdateManyArgs>(args: SelectSubset<T, ConceptExplanationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ConceptExplanations and returns the data updated in the database.
     * @param {ConceptExplanationUpdateManyAndReturnArgs} args - Arguments to update many ConceptExplanations.
     * @example
     * // Update many ConceptExplanations
     * const conceptExplanation = await prisma.conceptExplanation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ConceptExplanations and only return the `id`
     * const conceptExplanationWithIdOnly = await prisma.conceptExplanation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ConceptExplanationUpdateManyAndReturnArgs>(args: SelectSubset<T, ConceptExplanationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ConceptExplanation.
     * @param {ConceptExplanationUpsertArgs} args - Arguments to update or create a ConceptExplanation.
     * @example
     * // Update or create a ConceptExplanation
     * const conceptExplanation = await prisma.conceptExplanation.upsert({
     *   create: {
     *     // ... data to create a ConceptExplanation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ConceptExplanation we want to update
     *   }
     * })
     */
    upsert<T extends ConceptExplanationUpsertArgs>(args: SelectSubset<T, ConceptExplanationUpsertArgs<ExtArgs>>): Prisma__ConceptExplanationClient<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ConceptExplanations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptExplanationCountArgs} args - Arguments to filter ConceptExplanations to count.
     * @example
     * // Count the number of ConceptExplanations
     * const count = await prisma.conceptExplanation.count({
     *   where: {
     *     // ... the filter for the ConceptExplanations we want to count
     *   }
     * })
    **/
    count<T extends ConceptExplanationCountArgs>(
      args?: Subset<T, ConceptExplanationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConceptExplanationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ConceptExplanation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptExplanationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ConceptExplanationAggregateArgs>(args: Subset<T, ConceptExplanationAggregateArgs>): Prisma.PrismaPromise<GetConceptExplanationAggregateType<T>>

    /**
     * Group by ConceptExplanation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConceptExplanationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ConceptExplanationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConceptExplanationGroupByArgs['orderBy'] }
        : { orderBy?: ConceptExplanationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ConceptExplanationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConceptExplanationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ConceptExplanation model
   */
  readonly fields: ConceptExplanationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ConceptExplanation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConceptExplanationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user_progress<T extends ConceptExplanation$user_progressArgs<ExtArgs> = {}>(args?: Subset<T, ConceptExplanation$user_progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ConceptExplanation model
   */
  interface ConceptExplanationFieldRefs {
    readonly id: FieldRef<"ConceptExplanation", 'Int'>
    readonly title: FieldRef<"ConceptExplanation", 'String'>
    readonly content: FieldRef<"ConceptExplanation", 'String'>
    readonly summary: FieldRef<"ConceptExplanation", 'String'>
    readonly related_concepts: FieldRef<"ConceptExplanation", 'String[]'>
    readonly prerequisites: FieldRef<"ConceptExplanation", 'String[]'>
    readonly difficulty: FieldRef<"ConceptExplanation", 'String'>
    readonly visual_aids: FieldRef<"ConceptExplanation", 'Json'>
    readonly category: FieldRef<"ConceptExplanation", 'String'>
    readonly tags: FieldRef<"ConceptExplanation", 'String[]'>
    readonly created_at: FieldRef<"ConceptExplanation", 'DateTime'>
    readonly updated_at: FieldRef<"ConceptExplanation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ConceptExplanation findUnique
   */
  export type ConceptExplanationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConceptExplanationInclude<ExtArgs> | null
    /**
     * Filter, which ConceptExplanation to fetch.
     */
    where: ConceptExplanationWhereUniqueInput
  }

  /**
   * ConceptExplanation findUniqueOrThrow
   */
  export type ConceptExplanationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConceptExplanationInclude<ExtArgs> | null
    /**
     * Filter, which ConceptExplanation to fetch.
     */
    where: ConceptExplanationWhereUniqueInput
  }

  /**
   * ConceptExplanation findFirst
   */
  export type ConceptExplanationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConceptExplanationInclude<ExtArgs> | null
    /**
     * Filter, which ConceptExplanation to fetch.
     */
    where?: ConceptExplanationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConceptExplanations to fetch.
     */
    orderBy?: ConceptExplanationOrderByWithRelationInput | ConceptExplanationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConceptExplanations.
     */
    cursor?: ConceptExplanationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConceptExplanations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConceptExplanations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConceptExplanations.
     */
    distinct?: ConceptExplanationScalarFieldEnum | ConceptExplanationScalarFieldEnum[]
  }

  /**
   * ConceptExplanation findFirstOrThrow
   */
  export type ConceptExplanationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConceptExplanationInclude<ExtArgs> | null
    /**
     * Filter, which ConceptExplanation to fetch.
     */
    where?: ConceptExplanationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConceptExplanations to fetch.
     */
    orderBy?: ConceptExplanationOrderByWithRelationInput | ConceptExplanationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ConceptExplanations.
     */
    cursor?: ConceptExplanationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConceptExplanations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConceptExplanations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ConceptExplanations.
     */
    distinct?: ConceptExplanationScalarFieldEnum | ConceptExplanationScalarFieldEnum[]
  }

  /**
   * ConceptExplanation findMany
   */
  export type ConceptExplanationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConceptExplanationInclude<ExtArgs> | null
    /**
     * Filter, which ConceptExplanations to fetch.
     */
    where?: ConceptExplanationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ConceptExplanations to fetch.
     */
    orderBy?: ConceptExplanationOrderByWithRelationInput | ConceptExplanationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ConceptExplanations.
     */
    cursor?: ConceptExplanationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ConceptExplanations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ConceptExplanations.
     */
    skip?: number
    distinct?: ConceptExplanationScalarFieldEnum | ConceptExplanationScalarFieldEnum[]
  }

  /**
   * ConceptExplanation create
   */
  export type ConceptExplanationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConceptExplanationInclude<ExtArgs> | null
    /**
     * The data needed to create a ConceptExplanation.
     */
    data: XOR<ConceptExplanationCreateInput, ConceptExplanationUncheckedCreateInput>
  }

  /**
   * ConceptExplanation createMany
   */
  export type ConceptExplanationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ConceptExplanations.
     */
    data: ConceptExplanationCreateManyInput | ConceptExplanationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConceptExplanation createManyAndReturn
   */
  export type ConceptExplanationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * The data used to create many ConceptExplanations.
     */
    data: ConceptExplanationCreateManyInput | ConceptExplanationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ConceptExplanation update
   */
  export type ConceptExplanationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConceptExplanationInclude<ExtArgs> | null
    /**
     * The data needed to update a ConceptExplanation.
     */
    data: XOR<ConceptExplanationUpdateInput, ConceptExplanationUncheckedUpdateInput>
    /**
     * Choose, which ConceptExplanation to update.
     */
    where: ConceptExplanationWhereUniqueInput
  }

  /**
   * ConceptExplanation updateMany
   */
  export type ConceptExplanationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ConceptExplanations.
     */
    data: XOR<ConceptExplanationUpdateManyMutationInput, ConceptExplanationUncheckedUpdateManyInput>
    /**
     * Filter which ConceptExplanations to update
     */
    where?: ConceptExplanationWhereInput
    /**
     * Limit how many ConceptExplanations to update.
     */
    limit?: number
  }

  /**
   * ConceptExplanation updateManyAndReturn
   */
  export type ConceptExplanationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * The data used to update ConceptExplanations.
     */
    data: XOR<ConceptExplanationUpdateManyMutationInput, ConceptExplanationUncheckedUpdateManyInput>
    /**
     * Filter which ConceptExplanations to update
     */
    where?: ConceptExplanationWhereInput
    /**
     * Limit how many ConceptExplanations to update.
     */
    limit?: number
  }

  /**
   * ConceptExplanation upsert
   */
  export type ConceptExplanationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConceptExplanationInclude<ExtArgs> | null
    /**
     * The filter to search for the ConceptExplanation to update in case it exists.
     */
    where: ConceptExplanationWhereUniqueInput
    /**
     * In case the ConceptExplanation found by the `where` argument doesn't exist, create a new ConceptExplanation with this data.
     */
    create: XOR<ConceptExplanationCreateInput, ConceptExplanationUncheckedCreateInput>
    /**
     * In case the ConceptExplanation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConceptExplanationUpdateInput, ConceptExplanationUncheckedUpdateInput>
  }

  /**
   * ConceptExplanation delete
   */
  export type ConceptExplanationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConceptExplanationInclude<ExtArgs> | null
    /**
     * Filter which ConceptExplanation to delete.
     */
    where: ConceptExplanationWhereUniqueInput
  }

  /**
   * ConceptExplanation deleteMany
   */
  export type ConceptExplanationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ConceptExplanations to delete
     */
    where?: ConceptExplanationWhereInput
    /**
     * Limit how many ConceptExplanations to delete.
     */
    limit?: number
  }

  /**
   * ConceptExplanation.user_progress
   */
  export type ConceptExplanation$user_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    where?: UserProgressWhereInput
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    cursor?: UserProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * ConceptExplanation without action
   */
  export type ConceptExplanationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConceptExplanationInclude<ExtArgs> | null
  }


  /**
   * Model Tutorial
   */

  export type AggregateTutorial = {
    _count: TutorialCountAggregateOutputType | null
    _avg: TutorialAvgAggregateOutputType | null
    _sum: TutorialSumAggregateOutputType | null
    _min: TutorialMinAggregateOutputType | null
    _max: TutorialMaxAggregateOutputType | null
  }

  export type TutorialAvgAggregateOutputType = {
    id: number | null
    estimated_time: number | null
  }

  export type TutorialSumAggregateOutputType = {
    id: number | null
    estimated_time: number | null
  }

  export type TutorialMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    summary: string | null
    estimated_time: number | null
    difficulty: string | null
    category: string | null
    completion_certificate: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TutorialMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    summary: string | null
    estimated_time: number | null
    difficulty: string | null
    category: string | null
    completion_certificate: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TutorialCountAggregateOutputType = {
    id: number
    title: number
    description: number
    summary: number
    learning_objectives: number
    prerequisites: number
    estimated_time: number
    difficulty: number
    category: number
    tags: number
    completion_certificate: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TutorialAvgAggregateInputType = {
    id?: true
    estimated_time?: true
  }

  export type TutorialSumAggregateInputType = {
    id?: true
    estimated_time?: true
  }

  export type TutorialMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    summary?: true
    estimated_time?: true
    difficulty?: true
    category?: true
    completion_certificate?: true
    created_at?: true
    updated_at?: true
  }

  export type TutorialMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    summary?: true
    estimated_time?: true
    difficulty?: true
    category?: true
    completion_certificate?: true
    created_at?: true
    updated_at?: true
  }

  export type TutorialCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    summary?: true
    learning_objectives?: true
    prerequisites?: true
    estimated_time?: true
    difficulty?: true
    category?: true
    tags?: true
    completion_certificate?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TutorialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tutorial to aggregate.
     */
    where?: TutorialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tutorials to fetch.
     */
    orderBy?: TutorialOrderByWithRelationInput | TutorialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TutorialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tutorials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tutorials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tutorials
    **/
    _count?: true | TutorialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TutorialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TutorialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TutorialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TutorialMaxAggregateInputType
  }

  export type GetTutorialAggregateType<T extends TutorialAggregateArgs> = {
        [P in keyof T & keyof AggregateTutorial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTutorial[P]>
      : GetScalarType<T[P], AggregateTutorial[P]>
  }




  export type TutorialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TutorialWhereInput
    orderBy?: TutorialOrderByWithAggregationInput | TutorialOrderByWithAggregationInput[]
    by: TutorialScalarFieldEnum[] | TutorialScalarFieldEnum
    having?: TutorialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TutorialCountAggregateInputType | true
    _avg?: TutorialAvgAggregateInputType
    _sum?: TutorialSumAggregateInputType
    _min?: TutorialMinAggregateInputType
    _max?: TutorialMaxAggregateInputType
  }

  export type TutorialGroupByOutputType = {
    id: number
    title: string
    description: string
    summary: string
    learning_objectives: string[]
    prerequisites: string[]
    estimated_time: number
    difficulty: string
    category: string
    tags: string[]
    completion_certificate: boolean
    created_at: Date
    updated_at: Date
    _count: TutorialCountAggregateOutputType | null
    _avg: TutorialAvgAggregateOutputType | null
    _sum: TutorialSumAggregateOutputType | null
    _min: TutorialMinAggregateOutputType | null
    _max: TutorialMaxAggregateOutputType | null
  }

  type GetTutorialGroupByPayload<T extends TutorialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TutorialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TutorialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TutorialGroupByOutputType[P]>
            : GetScalarType<T[P], TutorialGroupByOutputType[P]>
        }
      >
    >


  export type TutorialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    summary?: boolean
    learning_objectives?: boolean
    prerequisites?: boolean
    estimated_time?: boolean
    difficulty?: boolean
    category?: boolean
    tags?: boolean
    completion_certificate?: boolean
    created_at?: boolean
    updated_at?: boolean
    steps?: boolean | Tutorial$stepsArgs<ExtArgs>
    exercises?: boolean | Tutorial$exercisesArgs<ExtArgs>
    quiz_questions?: boolean | Tutorial$quiz_questionsArgs<ExtArgs>
    user_progress?: boolean | Tutorial$user_progressArgs<ExtArgs>
    _count?: boolean | TutorialCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tutorial"]>

  export type TutorialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    summary?: boolean
    learning_objectives?: boolean
    prerequisites?: boolean
    estimated_time?: boolean
    difficulty?: boolean
    category?: boolean
    tags?: boolean
    completion_certificate?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["tutorial"]>

  export type TutorialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    summary?: boolean
    learning_objectives?: boolean
    prerequisites?: boolean
    estimated_time?: boolean
    difficulty?: boolean
    category?: boolean
    tags?: boolean
    completion_certificate?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["tutorial"]>

  export type TutorialSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    summary?: boolean
    learning_objectives?: boolean
    prerequisites?: boolean
    estimated_time?: boolean
    difficulty?: boolean
    category?: boolean
    tags?: boolean
    completion_certificate?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TutorialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "summary" | "learning_objectives" | "prerequisites" | "estimated_time" | "difficulty" | "category" | "tags" | "completion_certificate" | "created_at" | "updated_at", ExtArgs["result"]["tutorial"]>
  export type TutorialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | Tutorial$stepsArgs<ExtArgs>
    exercises?: boolean | Tutorial$exercisesArgs<ExtArgs>
    quiz_questions?: boolean | Tutorial$quiz_questionsArgs<ExtArgs>
    user_progress?: boolean | Tutorial$user_progressArgs<ExtArgs>
    _count?: boolean | TutorialCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TutorialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TutorialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TutorialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tutorial"
    objects: {
      steps: Prisma.$TutorialStepPayload<ExtArgs>[]
      exercises: Prisma.$ExercisePayload<ExtArgs>[]
      quiz_questions: Prisma.$QuizQuestionPayload<ExtArgs>[]
      user_progress: Prisma.$UserProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      summary: string
      learning_objectives: string[]
      prerequisites: string[]
      estimated_time: number
      difficulty: string
      category: string
      tags: string[]
      completion_certificate: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["tutorial"]>
    composites: {}
  }

  type TutorialGetPayload<S extends boolean | null | undefined | TutorialDefaultArgs> = $Result.GetResult<Prisma.$TutorialPayload, S>

  type TutorialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TutorialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TutorialCountAggregateInputType | true
    }

  export interface TutorialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tutorial'], meta: { name: 'Tutorial' } }
    /**
     * Find zero or one Tutorial that matches the filter.
     * @param {TutorialFindUniqueArgs} args - Arguments to find a Tutorial
     * @example
     * // Get one Tutorial
     * const tutorial = await prisma.tutorial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TutorialFindUniqueArgs>(args: SelectSubset<T, TutorialFindUniqueArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tutorial that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TutorialFindUniqueOrThrowArgs} args - Arguments to find a Tutorial
     * @example
     * // Get one Tutorial
     * const tutorial = await prisma.tutorial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TutorialFindUniqueOrThrowArgs>(args: SelectSubset<T, TutorialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tutorial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialFindFirstArgs} args - Arguments to find a Tutorial
     * @example
     * // Get one Tutorial
     * const tutorial = await prisma.tutorial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TutorialFindFirstArgs>(args?: SelectSubset<T, TutorialFindFirstArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tutorial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialFindFirstOrThrowArgs} args - Arguments to find a Tutorial
     * @example
     * // Get one Tutorial
     * const tutorial = await prisma.tutorial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TutorialFindFirstOrThrowArgs>(args?: SelectSubset<T, TutorialFindFirstOrThrowArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tutorials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tutorials
     * const tutorials = await prisma.tutorial.findMany()
     * 
     * // Get first 10 Tutorials
     * const tutorials = await prisma.tutorial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tutorialWithIdOnly = await prisma.tutorial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TutorialFindManyArgs>(args?: SelectSubset<T, TutorialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tutorial.
     * @param {TutorialCreateArgs} args - Arguments to create a Tutorial.
     * @example
     * // Create one Tutorial
     * const Tutorial = await prisma.tutorial.create({
     *   data: {
     *     // ... data to create a Tutorial
     *   }
     * })
     * 
     */
    create<T extends TutorialCreateArgs>(args: SelectSubset<T, TutorialCreateArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tutorials.
     * @param {TutorialCreateManyArgs} args - Arguments to create many Tutorials.
     * @example
     * // Create many Tutorials
     * const tutorial = await prisma.tutorial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TutorialCreateManyArgs>(args?: SelectSubset<T, TutorialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tutorials and returns the data saved in the database.
     * @param {TutorialCreateManyAndReturnArgs} args - Arguments to create many Tutorials.
     * @example
     * // Create many Tutorials
     * const tutorial = await prisma.tutorial.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tutorials and only return the `id`
     * const tutorialWithIdOnly = await prisma.tutorial.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TutorialCreateManyAndReturnArgs>(args?: SelectSubset<T, TutorialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tutorial.
     * @param {TutorialDeleteArgs} args - Arguments to delete one Tutorial.
     * @example
     * // Delete one Tutorial
     * const Tutorial = await prisma.tutorial.delete({
     *   where: {
     *     // ... filter to delete one Tutorial
     *   }
     * })
     * 
     */
    delete<T extends TutorialDeleteArgs>(args: SelectSubset<T, TutorialDeleteArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tutorial.
     * @param {TutorialUpdateArgs} args - Arguments to update one Tutorial.
     * @example
     * // Update one Tutorial
     * const tutorial = await prisma.tutorial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TutorialUpdateArgs>(args: SelectSubset<T, TutorialUpdateArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tutorials.
     * @param {TutorialDeleteManyArgs} args - Arguments to filter Tutorials to delete.
     * @example
     * // Delete a few Tutorials
     * const { count } = await prisma.tutorial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TutorialDeleteManyArgs>(args?: SelectSubset<T, TutorialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tutorials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tutorials
     * const tutorial = await prisma.tutorial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TutorialUpdateManyArgs>(args: SelectSubset<T, TutorialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tutorials and returns the data updated in the database.
     * @param {TutorialUpdateManyAndReturnArgs} args - Arguments to update many Tutorials.
     * @example
     * // Update many Tutorials
     * const tutorial = await prisma.tutorial.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tutorials and only return the `id`
     * const tutorialWithIdOnly = await prisma.tutorial.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TutorialUpdateManyAndReturnArgs>(args: SelectSubset<T, TutorialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tutorial.
     * @param {TutorialUpsertArgs} args - Arguments to update or create a Tutorial.
     * @example
     * // Update or create a Tutorial
     * const tutorial = await prisma.tutorial.upsert({
     *   create: {
     *     // ... data to create a Tutorial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tutorial we want to update
     *   }
     * })
     */
    upsert<T extends TutorialUpsertArgs>(args: SelectSubset<T, TutorialUpsertArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tutorials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialCountArgs} args - Arguments to filter Tutorials to count.
     * @example
     * // Count the number of Tutorials
     * const count = await prisma.tutorial.count({
     *   where: {
     *     // ... the filter for the Tutorials we want to count
     *   }
     * })
    **/
    count<T extends TutorialCountArgs>(
      args?: Subset<T, TutorialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TutorialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tutorial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TutorialAggregateArgs>(args: Subset<T, TutorialAggregateArgs>): Prisma.PrismaPromise<GetTutorialAggregateType<T>>

    /**
     * Group by Tutorial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TutorialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TutorialGroupByArgs['orderBy'] }
        : { orderBy?: TutorialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TutorialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTutorialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tutorial model
   */
  readonly fields: TutorialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tutorial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TutorialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    steps<T extends Tutorial$stepsArgs<ExtArgs> = {}>(args?: Subset<T, Tutorial$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    exercises<T extends Tutorial$exercisesArgs<ExtArgs> = {}>(args?: Subset<T, Tutorial$exercisesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    quiz_questions<T extends Tutorial$quiz_questionsArgs<ExtArgs> = {}>(args?: Subset<T, Tutorial$quiz_questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_progress<T extends Tutorial$user_progressArgs<ExtArgs> = {}>(args?: Subset<T, Tutorial$user_progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tutorial model
   */
  interface TutorialFieldRefs {
    readonly id: FieldRef<"Tutorial", 'Int'>
    readonly title: FieldRef<"Tutorial", 'String'>
    readonly description: FieldRef<"Tutorial", 'String'>
    readonly summary: FieldRef<"Tutorial", 'String'>
    readonly learning_objectives: FieldRef<"Tutorial", 'String[]'>
    readonly prerequisites: FieldRef<"Tutorial", 'String[]'>
    readonly estimated_time: FieldRef<"Tutorial", 'Int'>
    readonly difficulty: FieldRef<"Tutorial", 'String'>
    readonly category: FieldRef<"Tutorial", 'String'>
    readonly tags: FieldRef<"Tutorial", 'String[]'>
    readonly completion_certificate: FieldRef<"Tutorial", 'Boolean'>
    readonly created_at: FieldRef<"Tutorial", 'DateTime'>
    readonly updated_at: FieldRef<"Tutorial", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tutorial findUnique
   */
  export type TutorialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialInclude<ExtArgs> | null
    /**
     * Filter, which Tutorial to fetch.
     */
    where: TutorialWhereUniqueInput
  }

  /**
   * Tutorial findUniqueOrThrow
   */
  export type TutorialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialInclude<ExtArgs> | null
    /**
     * Filter, which Tutorial to fetch.
     */
    where: TutorialWhereUniqueInput
  }

  /**
   * Tutorial findFirst
   */
  export type TutorialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialInclude<ExtArgs> | null
    /**
     * Filter, which Tutorial to fetch.
     */
    where?: TutorialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tutorials to fetch.
     */
    orderBy?: TutorialOrderByWithRelationInput | TutorialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tutorials.
     */
    cursor?: TutorialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tutorials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tutorials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tutorials.
     */
    distinct?: TutorialScalarFieldEnum | TutorialScalarFieldEnum[]
  }

  /**
   * Tutorial findFirstOrThrow
   */
  export type TutorialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialInclude<ExtArgs> | null
    /**
     * Filter, which Tutorial to fetch.
     */
    where?: TutorialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tutorials to fetch.
     */
    orderBy?: TutorialOrderByWithRelationInput | TutorialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tutorials.
     */
    cursor?: TutorialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tutorials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tutorials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tutorials.
     */
    distinct?: TutorialScalarFieldEnum | TutorialScalarFieldEnum[]
  }

  /**
   * Tutorial findMany
   */
  export type TutorialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialInclude<ExtArgs> | null
    /**
     * Filter, which Tutorials to fetch.
     */
    where?: TutorialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tutorials to fetch.
     */
    orderBy?: TutorialOrderByWithRelationInput | TutorialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tutorials.
     */
    cursor?: TutorialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tutorials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tutorials.
     */
    skip?: number
    distinct?: TutorialScalarFieldEnum | TutorialScalarFieldEnum[]
  }

  /**
   * Tutorial create
   */
  export type TutorialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialInclude<ExtArgs> | null
    /**
     * The data needed to create a Tutorial.
     */
    data: XOR<TutorialCreateInput, TutorialUncheckedCreateInput>
  }

  /**
   * Tutorial createMany
   */
  export type TutorialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tutorials.
     */
    data: TutorialCreateManyInput | TutorialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tutorial createManyAndReturn
   */
  export type TutorialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * The data used to create many Tutorials.
     */
    data: TutorialCreateManyInput | TutorialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tutorial update
   */
  export type TutorialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialInclude<ExtArgs> | null
    /**
     * The data needed to update a Tutorial.
     */
    data: XOR<TutorialUpdateInput, TutorialUncheckedUpdateInput>
    /**
     * Choose, which Tutorial to update.
     */
    where: TutorialWhereUniqueInput
  }

  /**
   * Tutorial updateMany
   */
  export type TutorialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tutorials.
     */
    data: XOR<TutorialUpdateManyMutationInput, TutorialUncheckedUpdateManyInput>
    /**
     * Filter which Tutorials to update
     */
    where?: TutorialWhereInput
    /**
     * Limit how many Tutorials to update.
     */
    limit?: number
  }

  /**
   * Tutorial updateManyAndReturn
   */
  export type TutorialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * The data used to update Tutorials.
     */
    data: XOR<TutorialUpdateManyMutationInput, TutorialUncheckedUpdateManyInput>
    /**
     * Filter which Tutorials to update
     */
    where?: TutorialWhereInput
    /**
     * Limit how many Tutorials to update.
     */
    limit?: number
  }

  /**
   * Tutorial upsert
   */
  export type TutorialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialInclude<ExtArgs> | null
    /**
     * The filter to search for the Tutorial to update in case it exists.
     */
    where: TutorialWhereUniqueInput
    /**
     * In case the Tutorial found by the `where` argument doesn't exist, create a new Tutorial with this data.
     */
    create: XOR<TutorialCreateInput, TutorialUncheckedCreateInput>
    /**
     * In case the Tutorial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TutorialUpdateInput, TutorialUncheckedUpdateInput>
  }

  /**
   * Tutorial delete
   */
  export type TutorialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialInclude<ExtArgs> | null
    /**
     * Filter which Tutorial to delete.
     */
    where: TutorialWhereUniqueInput
  }

  /**
   * Tutorial deleteMany
   */
  export type TutorialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tutorials to delete
     */
    where?: TutorialWhereInput
    /**
     * Limit how many Tutorials to delete.
     */
    limit?: number
  }

  /**
   * Tutorial.steps
   */
  export type Tutorial$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepInclude<ExtArgs> | null
    where?: TutorialStepWhereInput
    orderBy?: TutorialStepOrderByWithRelationInput | TutorialStepOrderByWithRelationInput[]
    cursor?: TutorialStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TutorialStepScalarFieldEnum | TutorialStepScalarFieldEnum[]
  }

  /**
   * Tutorial.exercises
   */
  export type Tutorial$exercisesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    cursor?: ExerciseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Tutorial.quiz_questions
   */
  export type Tutorial$quiz_questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    where?: QuizQuestionWhereInput
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    cursor?: QuizQuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * Tutorial.user_progress
   */
  export type Tutorial$user_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    where?: UserProgressWhereInput
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    cursor?: UserProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * Tutorial without action
   */
  export type TutorialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialInclude<ExtArgs> | null
  }


  /**
   * Model TutorialStep
   */

  export type AggregateTutorialStep = {
    _count: TutorialStepCountAggregateOutputType | null
    _avg: TutorialStepAvgAggregateOutputType | null
    _sum: TutorialStepSumAggregateOutputType | null
    _min: TutorialStepMinAggregateOutputType | null
    _max: TutorialStepMaxAggregateOutputType | null
  }

  export type TutorialStepAvgAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
    estimated_time: number | null
    order: number | null
  }

  export type TutorialStepSumAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
    estimated_time: number | null
    order: number | null
  }

  export type TutorialStepMinAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
    title: string | null
    content: string | null
    code: string | null
    estimated_time: number | null
    checkpoint: boolean | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TutorialStepMaxAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
    title: string | null
    content: string | null
    code: string | null
    estimated_time: number | null
    checkpoint: boolean | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TutorialStepCountAggregateOutputType = {
    id: number
    tutorial_id: number
    title: number
    content: number
    code: number
    visual_aids: number
    estimated_time: number
    checkpoint: number
    order: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TutorialStepAvgAggregateInputType = {
    id?: true
    tutorial_id?: true
    estimated_time?: true
    order?: true
  }

  export type TutorialStepSumAggregateInputType = {
    id?: true
    tutorial_id?: true
    estimated_time?: true
    order?: true
  }

  export type TutorialStepMinAggregateInputType = {
    id?: true
    tutorial_id?: true
    title?: true
    content?: true
    code?: true
    estimated_time?: true
    checkpoint?: true
    order?: true
    created_at?: true
    updated_at?: true
  }

  export type TutorialStepMaxAggregateInputType = {
    id?: true
    tutorial_id?: true
    title?: true
    content?: true
    code?: true
    estimated_time?: true
    checkpoint?: true
    order?: true
    created_at?: true
    updated_at?: true
  }

  export type TutorialStepCountAggregateInputType = {
    id?: true
    tutorial_id?: true
    title?: true
    content?: true
    code?: true
    visual_aids?: true
    estimated_time?: true
    checkpoint?: true
    order?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TutorialStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TutorialStep to aggregate.
     */
    where?: TutorialStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutorialSteps to fetch.
     */
    orderBy?: TutorialStepOrderByWithRelationInput | TutorialStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TutorialStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutorialSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutorialSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TutorialSteps
    **/
    _count?: true | TutorialStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TutorialStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TutorialStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TutorialStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TutorialStepMaxAggregateInputType
  }

  export type GetTutorialStepAggregateType<T extends TutorialStepAggregateArgs> = {
        [P in keyof T & keyof AggregateTutorialStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTutorialStep[P]>
      : GetScalarType<T[P], AggregateTutorialStep[P]>
  }




  export type TutorialStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TutorialStepWhereInput
    orderBy?: TutorialStepOrderByWithAggregationInput | TutorialStepOrderByWithAggregationInput[]
    by: TutorialStepScalarFieldEnum[] | TutorialStepScalarFieldEnum
    having?: TutorialStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TutorialStepCountAggregateInputType | true
    _avg?: TutorialStepAvgAggregateInputType
    _sum?: TutorialStepSumAggregateInputType
    _min?: TutorialStepMinAggregateInputType
    _max?: TutorialStepMaxAggregateInputType
  }

  export type TutorialStepGroupByOutputType = {
    id: number
    tutorial_id: number
    title: string
    content: string
    code: string | null
    visual_aids: JsonValue | null
    estimated_time: number | null
    checkpoint: boolean | null
    order: number
    created_at: Date
    updated_at: Date
    _count: TutorialStepCountAggregateOutputType | null
    _avg: TutorialStepAvgAggregateOutputType | null
    _sum: TutorialStepSumAggregateOutputType | null
    _min: TutorialStepMinAggregateOutputType | null
    _max: TutorialStepMaxAggregateOutputType | null
  }

  type GetTutorialStepGroupByPayload<T extends TutorialStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TutorialStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TutorialStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TutorialStepGroupByOutputType[P]>
            : GetScalarType<T[P], TutorialStepGroupByOutputType[P]>
        }
      >
    >


  export type TutorialStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tutorial_id?: boolean
    title?: boolean
    content?: boolean
    code?: boolean
    visual_aids?: boolean
    estimated_time?: boolean
    checkpoint?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tutorialStep"]>

  export type TutorialStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tutorial_id?: boolean
    title?: boolean
    content?: boolean
    code?: boolean
    visual_aids?: boolean
    estimated_time?: boolean
    checkpoint?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tutorialStep"]>

  export type TutorialStepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tutorial_id?: boolean
    title?: boolean
    content?: boolean
    code?: boolean
    visual_aids?: boolean
    estimated_time?: boolean
    checkpoint?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tutorialStep"]>

  export type TutorialStepSelectScalar = {
    id?: boolean
    tutorial_id?: boolean
    title?: boolean
    content?: boolean
    code?: boolean
    visual_aids?: boolean
    estimated_time?: boolean
    checkpoint?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TutorialStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tutorial_id" | "title" | "content" | "code" | "visual_aids" | "estimated_time" | "checkpoint" | "order" | "created_at" | "updated_at", ExtArgs["result"]["tutorialStep"]>
  export type TutorialStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }
  export type TutorialStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }
  export type TutorialStepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }

  export type $TutorialStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TutorialStep"
    objects: {
      tutorial: Prisma.$TutorialPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tutorial_id: number
      title: string
      content: string
      code: string | null
      visual_aids: Prisma.JsonValue | null
      estimated_time: number | null
      checkpoint: boolean | null
      order: number
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["tutorialStep"]>
    composites: {}
  }

  type TutorialStepGetPayload<S extends boolean | null | undefined | TutorialStepDefaultArgs> = $Result.GetResult<Prisma.$TutorialStepPayload, S>

  type TutorialStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TutorialStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TutorialStepCountAggregateInputType | true
    }

  export interface TutorialStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TutorialStep'], meta: { name: 'TutorialStep' } }
    /**
     * Find zero or one TutorialStep that matches the filter.
     * @param {TutorialStepFindUniqueArgs} args - Arguments to find a TutorialStep
     * @example
     * // Get one TutorialStep
     * const tutorialStep = await prisma.tutorialStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TutorialStepFindUniqueArgs>(args: SelectSubset<T, TutorialStepFindUniqueArgs<ExtArgs>>): Prisma__TutorialStepClient<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TutorialStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TutorialStepFindUniqueOrThrowArgs} args - Arguments to find a TutorialStep
     * @example
     * // Get one TutorialStep
     * const tutorialStep = await prisma.tutorialStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TutorialStepFindUniqueOrThrowArgs>(args: SelectSubset<T, TutorialStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TutorialStepClient<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TutorialStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialStepFindFirstArgs} args - Arguments to find a TutorialStep
     * @example
     * // Get one TutorialStep
     * const tutorialStep = await prisma.tutorialStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TutorialStepFindFirstArgs>(args?: SelectSubset<T, TutorialStepFindFirstArgs<ExtArgs>>): Prisma__TutorialStepClient<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TutorialStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialStepFindFirstOrThrowArgs} args - Arguments to find a TutorialStep
     * @example
     * // Get one TutorialStep
     * const tutorialStep = await prisma.tutorialStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TutorialStepFindFirstOrThrowArgs>(args?: SelectSubset<T, TutorialStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__TutorialStepClient<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TutorialSteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TutorialSteps
     * const tutorialSteps = await prisma.tutorialStep.findMany()
     * 
     * // Get first 10 TutorialSteps
     * const tutorialSteps = await prisma.tutorialStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tutorialStepWithIdOnly = await prisma.tutorialStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TutorialStepFindManyArgs>(args?: SelectSubset<T, TutorialStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TutorialStep.
     * @param {TutorialStepCreateArgs} args - Arguments to create a TutorialStep.
     * @example
     * // Create one TutorialStep
     * const TutorialStep = await prisma.tutorialStep.create({
     *   data: {
     *     // ... data to create a TutorialStep
     *   }
     * })
     * 
     */
    create<T extends TutorialStepCreateArgs>(args: SelectSubset<T, TutorialStepCreateArgs<ExtArgs>>): Prisma__TutorialStepClient<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TutorialSteps.
     * @param {TutorialStepCreateManyArgs} args - Arguments to create many TutorialSteps.
     * @example
     * // Create many TutorialSteps
     * const tutorialStep = await prisma.tutorialStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TutorialStepCreateManyArgs>(args?: SelectSubset<T, TutorialStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TutorialSteps and returns the data saved in the database.
     * @param {TutorialStepCreateManyAndReturnArgs} args - Arguments to create many TutorialSteps.
     * @example
     * // Create many TutorialSteps
     * const tutorialStep = await prisma.tutorialStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TutorialSteps and only return the `id`
     * const tutorialStepWithIdOnly = await prisma.tutorialStep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TutorialStepCreateManyAndReturnArgs>(args?: SelectSubset<T, TutorialStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TutorialStep.
     * @param {TutorialStepDeleteArgs} args - Arguments to delete one TutorialStep.
     * @example
     * // Delete one TutorialStep
     * const TutorialStep = await prisma.tutorialStep.delete({
     *   where: {
     *     // ... filter to delete one TutorialStep
     *   }
     * })
     * 
     */
    delete<T extends TutorialStepDeleteArgs>(args: SelectSubset<T, TutorialStepDeleteArgs<ExtArgs>>): Prisma__TutorialStepClient<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TutorialStep.
     * @param {TutorialStepUpdateArgs} args - Arguments to update one TutorialStep.
     * @example
     * // Update one TutorialStep
     * const tutorialStep = await prisma.tutorialStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TutorialStepUpdateArgs>(args: SelectSubset<T, TutorialStepUpdateArgs<ExtArgs>>): Prisma__TutorialStepClient<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TutorialSteps.
     * @param {TutorialStepDeleteManyArgs} args - Arguments to filter TutorialSteps to delete.
     * @example
     * // Delete a few TutorialSteps
     * const { count } = await prisma.tutorialStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TutorialStepDeleteManyArgs>(args?: SelectSubset<T, TutorialStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TutorialSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TutorialSteps
     * const tutorialStep = await prisma.tutorialStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TutorialStepUpdateManyArgs>(args: SelectSubset<T, TutorialStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TutorialSteps and returns the data updated in the database.
     * @param {TutorialStepUpdateManyAndReturnArgs} args - Arguments to update many TutorialSteps.
     * @example
     * // Update many TutorialSteps
     * const tutorialStep = await prisma.tutorialStep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TutorialSteps and only return the `id`
     * const tutorialStepWithIdOnly = await prisma.tutorialStep.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TutorialStepUpdateManyAndReturnArgs>(args: SelectSubset<T, TutorialStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TutorialStep.
     * @param {TutorialStepUpsertArgs} args - Arguments to update or create a TutorialStep.
     * @example
     * // Update or create a TutorialStep
     * const tutorialStep = await prisma.tutorialStep.upsert({
     *   create: {
     *     // ... data to create a TutorialStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TutorialStep we want to update
     *   }
     * })
     */
    upsert<T extends TutorialStepUpsertArgs>(args: SelectSubset<T, TutorialStepUpsertArgs<ExtArgs>>): Prisma__TutorialStepClient<$Result.GetResult<Prisma.$TutorialStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TutorialSteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialStepCountArgs} args - Arguments to filter TutorialSteps to count.
     * @example
     * // Count the number of TutorialSteps
     * const count = await prisma.tutorialStep.count({
     *   where: {
     *     // ... the filter for the TutorialSteps we want to count
     *   }
     * })
    **/
    count<T extends TutorialStepCountArgs>(
      args?: Subset<T, TutorialStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TutorialStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TutorialStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TutorialStepAggregateArgs>(args: Subset<T, TutorialStepAggregateArgs>): Prisma.PrismaPromise<GetTutorialStepAggregateType<T>>

    /**
     * Group by TutorialStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TutorialStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TutorialStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TutorialStepGroupByArgs['orderBy'] }
        : { orderBy?: TutorialStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TutorialStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTutorialStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TutorialStep model
   */
  readonly fields: TutorialStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TutorialStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TutorialStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tutorial<T extends TutorialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TutorialDefaultArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TutorialStep model
   */
  interface TutorialStepFieldRefs {
    readonly id: FieldRef<"TutorialStep", 'Int'>
    readonly tutorial_id: FieldRef<"TutorialStep", 'Int'>
    readonly title: FieldRef<"TutorialStep", 'String'>
    readonly content: FieldRef<"TutorialStep", 'String'>
    readonly code: FieldRef<"TutorialStep", 'String'>
    readonly visual_aids: FieldRef<"TutorialStep", 'Json'>
    readonly estimated_time: FieldRef<"TutorialStep", 'Int'>
    readonly checkpoint: FieldRef<"TutorialStep", 'Boolean'>
    readonly order: FieldRef<"TutorialStep", 'Int'>
    readonly created_at: FieldRef<"TutorialStep", 'DateTime'>
    readonly updated_at: FieldRef<"TutorialStep", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TutorialStep findUnique
   */
  export type TutorialStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepInclude<ExtArgs> | null
    /**
     * Filter, which TutorialStep to fetch.
     */
    where: TutorialStepWhereUniqueInput
  }

  /**
   * TutorialStep findUniqueOrThrow
   */
  export type TutorialStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepInclude<ExtArgs> | null
    /**
     * Filter, which TutorialStep to fetch.
     */
    where: TutorialStepWhereUniqueInput
  }

  /**
   * TutorialStep findFirst
   */
  export type TutorialStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepInclude<ExtArgs> | null
    /**
     * Filter, which TutorialStep to fetch.
     */
    where?: TutorialStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutorialSteps to fetch.
     */
    orderBy?: TutorialStepOrderByWithRelationInput | TutorialStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TutorialSteps.
     */
    cursor?: TutorialStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutorialSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutorialSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TutorialSteps.
     */
    distinct?: TutorialStepScalarFieldEnum | TutorialStepScalarFieldEnum[]
  }

  /**
   * TutorialStep findFirstOrThrow
   */
  export type TutorialStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepInclude<ExtArgs> | null
    /**
     * Filter, which TutorialStep to fetch.
     */
    where?: TutorialStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutorialSteps to fetch.
     */
    orderBy?: TutorialStepOrderByWithRelationInput | TutorialStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TutorialSteps.
     */
    cursor?: TutorialStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutorialSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutorialSteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TutorialSteps.
     */
    distinct?: TutorialStepScalarFieldEnum | TutorialStepScalarFieldEnum[]
  }

  /**
   * TutorialStep findMany
   */
  export type TutorialStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepInclude<ExtArgs> | null
    /**
     * Filter, which TutorialSteps to fetch.
     */
    where?: TutorialStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TutorialSteps to fetch.
     */
    orderBy?: TutorialStepOrderByWithRelationInput | TutorialStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TutorialSteps.
     */
    cursor?: TutorialStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TutorialSteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TutorialSteps.
     */
    skip?: number
    distinct?: TutorialStepScalarFieldEnum | TutorialStepScalarFieldEnum[]
  }

  /**
   * TutorialStep create
   */
  export type TutorialStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepInclude<ExtArgs> | null
    /**
     * The data needed to create a TutorialStep.
     */
    data: XOR<TutorialStepCreateInput, TutorialStepUncheckedCreateInput>
  }

  /**
   * TutorialStep createMany
   */
  export type TutorialStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TutorialSteps.
     */
    data: TutorialStepCreateManyInput | TutorialStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TutorialStep createManyAndReturn
   */
  export type TutorialStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * The data used to create many TutorialSteps.
     */
    data: TutorialStepCreateManyInput | TutorialStepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TutorialStep update
   */
  export type TutorialStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepInclude<ExtArgs> | null
    /**
     * The data needed to update a TutorialStep.
     */
    data: XOR<TutorialStepUpdateInput, TutorialStepUncheckedUpdateInput>
    /**
     * Choose, which TutorialStep to update.
     */
    where: TutorialStepWhereUniqueInput
  }

  /**
   * TutorialStep updateMany
   */
  export type TutorialStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TutorialSteps.
     */
    data: XOR<TutorialStepUpdateManyMutationInput, TutorialStepUncheckedUpdateManyInput>
    /**
     * Filter which TutorialSteps to update
     */
    where?: TutorialStepWhereInput
    /**
     * Limit how many TutorialSteps to update.
     */
    limit?: number
  }

  /**
   * TutorialStep updateManyAndReturn
   */
  export type TutorialStepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * The data used to update TutorialSteps.
     */
    data: XOR<TutorialStepUpdateManyMutationInput, TutorialStepUncheckedUpdateManyInput>
    /**
     * Filter which TutorialSteps to update
     */
    where?: TutorialStepWhereInput
    /**
     * Limit how many TutorialSteps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TutorialStep upsert
   */
  export type TutorialStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepInclude<ExtArgs> | null
    /**
     * The filter to search for the TutorialStep to update in case it exists.
     */
    where: TutorialStepWhereUniqueInput
    /**
     * In case the TutorialStep found by the `where` argument doesn't exist, create a new TutorialStep with this data.
     */
    create: XOR<TutorialStepCreateInput, TutorialStepUncheckedCreateInput>
    /**
     * In case the TutorialStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TutorialStepUpdateInput, TutorialStepUncheckedUpdateInput>
  }

  /**
   * TutorialStep delete
   */
  export type TutorialStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepInclude<ExtArgs> | null
    /**
     * Filter which TutorialStep to delete.
     */
    where: TutorialStepWhereUniqueInput
  }

  /**
   * TutorialStep deleteMany
   */
  export type TutorialStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TutorialSteps to delete
     */
    where?: TutorialStepWhereInput
    /**
     * Limit how many TutorialSteps to delete.
     */
    limit?: number
  }

  /**
   * TutorialStep without action
   */
  export type TutorialStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TutorialStep
     */
    select?: TutorialStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TutorialStep
     */
    omit?: TutorialStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialStepInclude<ExtArgs> | null
  }


  /**
   * Model Exercise
   */

  export type AggregateExercise = {
    _count: ExerciseCountAggregateOutputType | null
    _avg: ExerciseAvgAggregateOutputType | null
    _sum: ExerciseSumAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  export type ExerciseAvgAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
  }

  export type ExerciseSumAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
  }

  export type ExerciseMinAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
    title: string | null
    description: string | null
    instructions: string | null
    starter_code: string | null
    solution_code: string | null
    validation_tests: string | null
    difficulty: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ExerciseMaxAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
    title: string | null
    description: string | null
    instructions: string | null
    starter_code: string | null
    solution_code: string | null
    validation_tests: string | null
    difficulty: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ExerciseCountAggregateOutputType = {
    id: number
    tutorial_id: number
    title: number
    description: number
    instructions: number
    starter_code: number
    solution_code: number
    validation_tests: number
    hints: number
    difficulty: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ExerciseAvgAggregateInputType = {
    id?: true
    tutorial_id?: true
  }

  export type ExerciseSumAggregateInputType = {
    id?: true
    tutorial_id?: true
  }

  export type ExerciseMinAggregateInputType = {
    id?: true
    tutorial_id?: true
    title?: true
    description?: true
    instructions?: true
    starter_code?: true
    solution_code?: true
    validation_tests?: true
    difficulty?: true
    created_at?: true
    updated_at?: true
  }

  export type ExerciseMaxAggregateInputType = {
    id?: true
    tutorial_id?: true
    title?: true
    description?: true
    instructions?: true
    starter_code?: true
    solution_code?: true
    validation_tests?: true
    difficulty?: true
    created_at?: true
    updated_at?: true
  }

  export type ExerciseCountAggregateInputType = {
    id?: true
    tutorial_id?: true
    title?: true
    description?: true
    instructions?: true
    starter_code?: true
    solution_code?: true
    validation_tests?: true
    hints?: true
    difficulty?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ExerciseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercise to aggregate.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Exercises
    **/
    _count?: true | ExerciseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExerciseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExerciseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExerciseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExerciseMaxAggregateInputType
  }

  export type GetExerciseAggregateType<T extends ExerciseAggregateArgs> = {
        [P in keyof T & keyof AggregateExercise]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExercise[P]>
      : GetScalarType<T[P], AggregateExercise[P]>
  }




  export type ExerciseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExerciseWhereInput
    orderBy?: ExerciseOrderByWithAggregationInput | ExerciseOrderByWithAggregationInput[]
    by: ExerciseScalarFieldEnum[] | ExerciseScalarFieldEnum
    having?: ExerciseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExerciseCountAggregateInputType | true
    _avg?: ExerciseAvgAggregateInputType
    _sum?: ExerciseSumAggregateInputType
    _min?: ExerciseMinAggregateInputType
    _max?: ExerciseMaxAggregateInputType
  }

  export type ExerciseGroupByOutputType = {
    id: number
    tutorial_id: number
    title: string
    description: string
    instructions: string
    starter_code: string | null
    solution_code: string
    validation_tests: string
    hints: string[]
    difficulty: string
    created_at: Date
    updated_at: Date
    _count: ExerciseCountAggregateOutputType | null
    _avg: ExerciseAvgAggregateOutputType | null
    _sum: ExerciseSumAggregateOutputType | null
    _min: ExerciseMinAggregateOutputType | null
    _max: ExerciseMaxAggregateOutputType | null
  }

  type GetExerciseGroupByPayload<T extends ExerciseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExerciseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExerciseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
            : GetScalarType<T[P], ExerciseGroupByOutputType[P]>
        }
      >
    >


  export type ExerciseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tutorial_id?: boolean
    title?: boolean
    description?: boolean
    instructions?: boolean
    starter_code?: boolean
    solution_code?: boolean
    validation_tests?: boolean
    hints?: boolean
    difficulty?: boolean
    created_at?: boolean
    updated_at?: boolean
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
    user_solutions?: boolean | Exercise$user_solutionsArgs<ExtArgs>
    _count?: boolean | ExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tutorial_id?: boolean
    title?: boolean
    description?: boolean
    instructions?: boolean
    starter_code?: boolean
    solution_code?: boolean
    validation_tests?: boolean
    hints?: boolean
    difficulty?: boolean
    created_at?: boolean
    updated_at?: boolean
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tutorial_id?: boolean
    title?: boolean
    description?: boolean
    instructions?: boolean
    starter_code?: boolean
    solution_code?: boolean
    validation_tests?: boolean
    hints?: boolean
    difficulty?: boolean
    created_at?: boolean
    updated_at?: boolean
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["exercise"]>

  export type ExerciseSelectScalar = {
    id?: boolean
    tutorial_id?: boolean
    title?: boolean
    description?: boolean
    instructions?: boolean
    starter_code?: boolean
    solution_code?: boolean
    validation_tests?: boolean
    hints?: boolean
    difficulty?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ExerciseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tutorial_id" | "title" | "description" | "instructions" | "starter_code" | "solution_code" | "validation_tests" | "hints" | "difficulty" | "created_at" | "updated_at", ExtArgs["result"]["exercise"]>
  export type ExerciseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
    user_solutions?: boolean | Exercise$user_solutionsArgs<ExtArgs>
    _count?: boolean | ExerciseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExerciseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }
  export type ExerciseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }

  export type $ExercisePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Exercise"
    objects: {
      tutorial: Prisma.$TutorialPayload<ExtArgs>
      user_solutions: Prisma.$UserSolutionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tutorial_id: number
      title: string
      description: string
      instructions: string
      starter_code: string | null
      solution_code: string
      validation_tests: string
      hints: string[]
      difficulty: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["exercise"]>
    composites: {}
  }

  type ExerciseGetPayload<S extends boolean | null | undefined | ExerciseDefaultArgs> = $Result.GetResult<Prisma.$ExercisePayload, S>

  type ExerciseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExerciseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExerciseCountAggregateInputType | true
    }

  export interface ExerciseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Exercise'], meta: { name: 'Exercise' } }
    /**
     * Find zero or one Exercise that matches the filter.
     * @param {ExerciseFindUniqueArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExerciseFindUniqueArgs>(args: SelectSubset<T, ExerciseFindUniqueArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Exercise that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExerciseFindUniqueOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExerciseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExerciseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExerciseFindFirstArgs>(args?: SelectSubset<T, ExerciseFindFirstArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Exercise that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindFirstOrThrowArgs} args - Arguments to find a Exercise
     * @example
     * // Get one Exercise
     * const exercise = await prisma.exercise.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExerciseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExerciseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Exercises that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Exercises
     * const exercises = await prisma.exercise.findMany()
     * 
     * // Get first 10 Exercises
     * const exercises = await prisma.exercise.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exerciseWithIdOnly = await prisma.exercise.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExerciseFindManyArgs>(args?: SelectSubset<T, ExerciseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Exercise.
     * @param {ExerciseCreateArgs} args - Arguments to create a Exercise.
     * @example
     * // Create one Exercise
     * const Exercise = await prisma.exercise.create({
     *   data: {
     *     // ... data to create a Exercise
     *   }
     * })
     * 
     */
    create<T extends ExerciseCreateArgs>(args: SelectSubset<T, ExerciseCreateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Exercises.
     * @param {ExerciseCreateManyArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExerciseCreateManyArgs>(args?: SelectSubset<T, ExerciseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Exercises and returns the data saved in the database.
     * @param {ExerciseCreateManyAndReturnArgs} args - Arguments to create many Exercises.
     * @example
     * // Create many Exercises
     * const exercise = await prisma.exercise.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExerciseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExerciseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Exercise.
     * @param {ExerciseDeleteArgs} args - Arguments to delete one Exercise.
     * @example
     * // Delete one Exercise
     * const Exercise = await prisma.exercise.delete({
     *   where: {
     *     // ... filter to delete one Exercise
     *   }
     * })
     * 
     */
    delete<T extends ExerciseDeleteArgs>(args: SelectSubset<T, ExerciseDeleteArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Exercise.
     * @param {ExerciseUpdateArgs} args - Arguments to update one Exercise.
     * @example
     * // Update one Exercise
     * const exercise = await prisma.exercise.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExerciseUpdateArgs>(args: SelectSubset<T, ExerciseUpdateArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Exercises.
     * @param {ExerciseDeleteManyArgs} args - Arguments to filter Exercises to delete.
     * @example
     * // Delete a few Exercises
     * const { count } = await prisma.exercise.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExerciseDeleteManyArgs>(args?: SelectSubset<T, ExerciseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExerciseUpdateManyArgs>(args: SelectSubset<T, ExerciseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Exercises and returns the data updated in the database.
     * @param {ExerciseUpdateManyAndReturnArgs} args - Arguments to update many Exercises.
     * @example
     * // Update many Exercises
     * const exercise = await prisma.exercise.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Exercises and only return the `id`
     * const exerciseWithIdOnly = await prisma.exercise.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExerciseUpdateManyAndReturnArgs>(args: SelectSubset<T, ExerciseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Exercise.
     * @param {ExerciseUpsertArgs} args - Arguments to update or create a Exercise.
     * @example
     * // Update or create a Exercise
     * const exercise = await prisma.exercise.upsert({
     *   create: {
     *     // ... data to create a Exercise
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Exercise we want to update
     *   }
     * })
     */
    upsert<T extends ExerciseUpsertArgs>(args: SelectSubset<T, ExerciseUpsertArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Exercises.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseCountArgs} args - Arguments to filter Exercises to count.
     * @example
     * // Count the number of Exercises
     * const count = await prisma.exercise.count({
     *   where: {
     *     // ... the filter for the Exercises we want to count
     *   }
     * })
    **/
    count<T extends ExerciseCountArgs>(
      args?: Subset<T, ExerciseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExerciseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExerciseAggregateArgs>(args: Subset<T, ExerciseAggregateArgs>): Prisma.PrismaPromise<GetExerciseAggregateType<T>>

    /**
     * Group by Exercise.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExerciseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExerciseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExerciseGroupByArgs['orderBy'] }
        : { orderBy?: ExerciseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExerciseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExerciseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Exercise model
   */
  readonly fields: ExerciseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Exercise.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExerciseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tutorial<T extends TutorialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TutorialDefaultArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user_solutions<T extends Exercise$user_solutionsArgs<ExtArgs> = {}>(args?: Subset<T, Exercise$user_solutionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Exercise model
   */
  interface ExerciseFieldRefs {
    readonly id: FieldRef<"Exercise", 'Int'>
    readonly tutorial_id: FieldRef<"Exercise", 'Int'>
    readonly title: FieldRef<"Exercise", 'String'>
    readonly description: FieldRef<"Exercise", 'String'>
    readonly instructions: FieldRef<"Exercise", 'String'>
    readonly starter_code: FieldRef<"Exercise", 'String'>
    readonly solution_code: FieldRef<"Exercise", 'String'>
    readonly validation_tests: FieldRef<"Exercise", 'String'>
    readonly hints: FieldRef<"Exercise", 'String[]'>
    readonly difficulty: FieldRef<"Exercise", 'String'>
    readonly created_at: FieldRef<"Exercise", 'DateTime'>
    readonly updated_at: FieldRef<"Exercise", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Exercise findUnique
   */
  export type ExerciseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findUniqueOrThrow
   */
  export type ExerciseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise findFirst
   */
  export type ExerciseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findFirstOrThrow
   */
  export type ExerciseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercise to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Exercises.
     */
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise findMany
   */
  export type ExerciseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter, which Exercises to fetch.
     */
    where?: ExerciseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Exercises to fetch.
     */
    orderBy?: ExerciseOrderByWithRelationInput | ExerciseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Exercises.
     */
    cursor?: ExerciseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Exercises from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Exercises.
     */
    skip?: number
    distinct?: ExerciseScalarFieldEnum | ExerciseScalarFieldEnum[]
  }

  /**
   * Exercise create
   */
  export type ExerciseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to create a Exercise.
     */
    data: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
  }

  /**
   * Exercise createMany
   */
  export type ExerciseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Exercise createManyAndReturn
   */
  export type ExerciseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to create many Exercises.
     */
    data: ExerciseCreateManyInput | ExerciseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exercise update
   */
  export type ExerciseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The data needed to update a Exercise.
     */
    data: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
    /**
     * Choose, which Exercise to update.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise updateMany
   */
  export type ExerciseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
  }

  /**
   * Exercise updateManyAndReturn
   */
  export type ExerciseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * The data used to update Exercises.
     */
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyInput>
    /**
     * Filter which Exercises to update
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Exercise upsert
   */
  export type ExerciseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * The filter to search for the Exercise to update in case it exists.
     */
    where: ExerciseWhereUniqueInput
    /**
     * In case the Exercise found by the `where` argument doesn't exist, create a new Exercise with this data.
     */
    create: XOR<ExerciseCreateInput, ExerciseUncheckedCreateInput>
    /**
     * In case the Exercise was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExerciseUpdateInput, ExerciseUncheckedUpdateInput>
  }

  /**
   * Exercise delete
   */
  export type ExerciseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
    /**
     * Filter which Exercise to delete.
     */
    where: ExerciseWhereUniqueInput
  }

  /**
   * Exercise deleteMany
   */
  export type ExerciseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Exercises to delete
     */
    where?: ExerciseWhereInput
    /**
     * Limit how many Exercises to delete.
     */
    limit?: number
  }

  /**
   * Exercise.user_solutions
   */
  export type Exercise$user_solutionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionInclude<ExtArgs> | null
    where?: UserSolutionWhereInput
    orderBy?: UserSolutionOrderByWithRelationInput | UserSolutionOrderByWithRelationInput[]
    cursor?: UserSolutionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSolutionScalarFieldEnum | UserSolutionScalarFieldEnum[]
  }

  /**
   * Exercise without action
   */
  export type ExerciseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Exercise
     */
    select?: ExerciseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Exercise
     */
    omit?: ExerciseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExerciseInclude<ExtArgs> | null
  }


  /**
   * Model QuizQuestion
   */

  export type AggregateQuizQuestion = {
    _count: QuizQuestionCountAggregateOutputType | null
    _avg: QuizQuestionAvgAggregateOutputType | null
    _sum: QuizQuestionSumAggregateOutputType | null
    _min: QuizQuestionMinAggregateOutputType | null
    _max: QuizQuestionMaxAggregateOutputType | null
  }

  export type QuizQuestionAvgAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
    correct_answer: number | null
  }

  export type QuizQuestionSumAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
    correct_answer: number | null
  }

  export type QuizQuestionMinAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
    question: string | null
    correct_answer: number | null
    explanation: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type QuizQuestionMaxAggregateOutputType = {
    id: number | null
    tutorial_id: number | null
    question: string | null
    correct_answer: number | null
    explanation: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type QuizQuestionCountAggregateOutputType = {
    id: number
    tutorial_id: number
    question: number
    options: number
    correct_answer: number
    explanation: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type QuizQuestionAvgAggregateInputType = {
    id?: true
    tutorial_id?: true
    correct_answer?: true
  }

  export type QuizQuestionSumAggregateInputType = {
    id?: true
    tutorial_id?: true
    correct_answer?: true
  }

  export type QuizQuestionMinAggregateInputType = {
    id?: true
    tutorial_id?: true
    question?: true
    correct_answer?: true
    explanation?: true
    created_at?: true
    updated_at?: true
  }

  export type QuizQuestionMaxAggregateInputType = {
    id?: true
    tutorial_id?: true
    question?: true
    correct_answer?: true
    explanation?: true
    created_at?: true
    updated_at?: true
  }

  export type QuizQuestionCountAggregateInputType = {
    id?: true
    tutorial_id?: true
    question?: true
    options?: true
    correct_answer?: true
    explanation?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type QuizQuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizQuestion to aggregate.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QuizQuestions
    **/
    _count?: true | QuizQuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuizQuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuizQuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuizQuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuizQuestionMaxAggregateInputType
  }

  export type GetQuizQuestionAggregateType<T extends QuizQuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuizQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuizQuestion[P]>
      : GetScalarType<T[P], AggregateQuizQuestion[P]>
  }




  export type QuizQuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuizQuestionWhereInput
    orderBy?: QuizQuestionOrderByWithAggregationInput | QuizQuestionOrderByWithAggregationInput[]
    by: QuizQuestionScalarFieldEnum[] | QuizQuestionScalarFieldEnum
    having?: QuizQuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuizQuestionCountAggregateInputType | true
    _avg?: QuizQuestionAvgAggregateInputType
    _sum?: QuizQuestionSumAggregateInputType
    _min?: QuizQuestionMinAggregateInputType
    _max?: QuizQuestionMaxAggregateInputType
  }

  export type QuizQuestionGroupByOutputType = {
    id: number
    tutorial_id: number
    question: string
    options: string[]
    correct_answer: number
    explanation: string
    created_at: Date
    updated_at: Date
    _count: QuizQuestionCountAggregateOutputType | null
    _avg: QuizQuestionAvgAggregateOutputType | null
    _sum: QuizQuestionSumAggregateOutputType | null
    _min: QuizQuestionMinAggregateOutputType | null
    _max: QuizQuestionMaxAggregateOutputType | null
  }

  type GetQuizQuestionGroupByPayload<T extends QuizQuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuizQuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuizQuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuizQuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuizQuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuizQuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tutorial_id?: boolean
    question?: boolean
    options?: boolean
    correct_answer?: boolean
    explanation?: boolean
    created_at?: boolean
    updated_at?: boolean
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
    user_answers?: boolean | QuizQuestion$user_answersArgs<ExtArgs>
    _count?: boolean | QuizQuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tutorial_id?: boolean
    question?: boolean
    options?: boolean
    correct_answer?: boolean
    explanation?: boolean
    created_at?: boolean
    updated_at?: boolean
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tutorial_id?: boolean
    question?: boolean
    options?: boolean
    correct_answer?: boolean
    explanation?: boolean
    created_at?: boolean
    updated_at?: boolean
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["quizQuestion"]>

  export type QuizQuestionSelectScalar = {
    id?: boolean
    tutorial_id?: boolean
    question?: boolean
    options?: boolean
    correct_answer?: boolean
    explanation?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type QuizQuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tutorial_id" | "question" | "options" | "correct_answer" | "explanation" | "created_at" | "updated_at", ExtArgs["result"]["quizQuestion"]>
  export type QuizQuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
    user_answers?: boolean | QuizQuestion$user_answersArgs<ExtArgs>
    _count?: boolean | QuizQuestionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QuizQuestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }
  export type QuizQuestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tutorial?: boolean | TutorialDefaultArgs<ExtArgs>
  }

  export type $QuizQuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QuizQuestion"
    objects: {
      tutorial: Prisma.$TutorialPayload<ExtArgs>
      user_answers: Prisma.$UserQuizAnswerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tutorial_id: number
      question: string
      options: string[]
      correct_answer: number
      explanation: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["quizQuestion"]>
    composites: {}
  }

  type QuizQuestionGetPayload<S extends boolean | null | undefined | QuizQuestionDefaultArgs> = $Result.GetResult<Prisma.$QuizQuestionPayload, S>

  type QuizQuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuizQuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuizQuestionCountAggregateInputType | true
    }

  export interface QuizQuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QuizQuestion'], meta: { name: 'QuizQuestion' } }
    /**
     * Find zero or one QuizQuestion that matches the filter.
     * @param {QuizQuestionFindUniqueArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuizQuestionFindUniqueArgs>(args: SelectSubset<T, QuizQuestionFindUniqueArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QuizQuestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuizQuestionFindUniqueOrThrowArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuizQuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuizQuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizQuestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindFirstArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuizQuestionFindFirstArgs>(args?: SelectSubset<T, QuizQuestionFindFirstArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QuizQuestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindFirstOrThrowArgs} args - Arguments to find a QuizQuestion
     * @example
     * // Get one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuizQuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuizQuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QuizQuestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QuizQuestions
     * const quizQuestions = await prisma.quizQuestion.findMany()
     * 
     * // Get first 10 QuizQuestions
     * const quizQuestions = await prisma.quizQuestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuizQuestionFindManyArgs>(args?: SelectSubset<T, QuizQuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QuizQuestion.
     * @param {QuizQuestionCreateArgs} args - Arguments to create a QuizQuestion.
     * @example
     * // Create one QuizQuestion
     * const QuizQuestion = await prisma.quizQuestion.create({
     *   data: {
     *     // ... data to create a QuizQuestion
     *   }
     * })
     * 
     */
    create<T extends QuizQuestionCreateArgs>(args: SelectSubset<T, QuizQuestionCreateArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QuizQuestions.
     * @param {QuizQuestionCreateManyArgs} args - Arguments to create many QuizQuestions.
     * @example
     * // Create many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuizQuestionCreateManyArgs>(args?: SelectSubset<T, QuizQuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QuizQuestions and returns the data saved in the database.
     * @param {QuizQuestionCreateManyAndReturnArgs} args - Arguments to create many QuizQuestions.
     * @example
     * // Create many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QuizQuestions and only return the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QuizQuestionCreateManyAndReturnArgs>(args?: SelectSubset<T, QuizQuestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QuizQuestion.
     * @param {QuizQuestionDeleteArgs} args - Arguments to delete one QuizQuestion.
     * @example
     * // Delete one QuizQuestion
     * const QuizQuestion = await prisma.quizQuestion.delete({
     *   where: {
     *     // ... filter to delete one QuizQuestion
     *   }
     * })
     * 
     */
    delete<T extends QuizQuestionDeleteArgs>(args: SelectSubset<T, QuizQuestionDeleteArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QuizQuestion.
     * @param {QuizQuestionUpdateArgs} args - Arguments to update one QuizQuestion.
     * @example
     * // Update one QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuizQuestionUpdateArgs>(args: SelectSubset<T, QuizQuestionUpdateArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QuizQuestions.
     * @param {QuizQuestionDeleteManyArgs} args - Arguments to filter QuizQuestions to delete.
     * @example
     * // Delete a few QuizQuestions
     * const { count } = await prisma.quizQuestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuizQuestionDeleteManyArgs>(args?: SelectSubset<T, QuizQuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuizQuestionUpdateManyArgs>(args: SelectSubset<T, QuizQuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QuizQuestions and returns the data updated in the database.
     * @param {QuizQuestionUpdateManyAndReturnArgs} args - Arguments to update many QuizQuestions.
     * @example
     * // Update many QuizQuestions
     * const quizQuestion = await prisma.quizQuestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QuizQuestions and only return the `id`
     * const quizQuestionWithIdOnly = await prisma.quizQuestion.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QuizQuestionUpdateManyAndReturnArgs>(args: SelectSubset<T, QuizQuestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QuizQuestion.
     * @param {QuizQuestionUpsertArgs} args - Arguments to update or create a QuizQuestion.
     * @example
     * // Update or create a QuizQuestion
     * const quizQuestion = await prisma.quizQuestion.upsert({
     *   create: {
     *     // ... data to create a QuizQuestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QuizQuestion we want to update
     *   }
     * })
     */
    upsert<T extends QuizQuestionUpsertArgs>(args: SelectSubset<T, QuizQuestionUpsertArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QuizQuestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionCountArgs} args - Arguments to filter QuizQuestions to count.
     * @example
     * // Count the number of QuizQuestions
     * const count = await prisma.quizQuestion.count({
     *   where: {
     *     // ... the filter for the QuizQuestions we want to count
     *   }
     * })
    **/
    count<T extends QuizQuestionCountArgs>(
      args?: Subset<T, QuizQuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuizQuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QuizQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuizQuestionAggregateArgs>(args: Subset<T, QuizQuestionAggregateArgs>): Prisma.PrismaPromise<GetQuizQuestionAggregateType<T>>

    /**
     * Group by QuizQuestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuizQuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuizQuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuizQuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuizQuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuizQuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuizQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QuizQuestion model
   */
  readonly fields: QuizQuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QuizQuestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuizQuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tutorial<T extends TutorialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TutorialDefaultArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user_answers<T extends QuizQuestion$user_answersArgs<ExtArgs> = {}>(args?: Subset<T, QuizQuestion$user_answersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QuizQuestion model
   */
  interface QuizQuestionFieldRefs {
    readonly id: FieldRef<"QuizQuestion", 'Int'>
    readonly tutorial_id: FieldRef<"QuizQuestion", 'Int'>
    readonly question: FieldRef<"QuizQuestion", 'String'>
    readonly options: FieldRef<"QuizQuestion", 'String[]'>
    readonly correct_answer: FieldRef<"QuizQuestion", 'Int'>
    readonly explanation: FieldRef<"QuizQuestion", 'String'>
    readonly created_at: FieldRef<"QuizQuestion", 'DateTime'>
    readonly updated_at: FieldRef<"QuizQuestion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * QuizQuestion findUnique
   */
  export type QuizQuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion findUniqueOrThrow
   */
  export type QuizQuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion findFirst
   */
  export type QuizQuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizQuestions.
     */
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion findFirstOrThrow
   */
  export type QuizQuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestion to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QuizQuestions.
     */
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion findMany
   */
  export type QuizQuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter, which QuizQuestions to fetch.
     */
    where?: QuizQuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QuizQuestions to fetch.
     */
    orderBy?: QuizQuestionOrderByWithRelationInput | QuizQuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QuizQuestions.
     */
    cursor?: QuizQuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QuizQuestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QuizQuestions.
     */
    skip?: number
    distinct?: QuizQuestionScalarFieldEnum | QuizQuestionScalarFieldEnum[]
  }

  /**
   * QuizQuestion create
   */
  export type QuizQuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a QuizQuestion.
     */
    data: XOR<QuizQuestionCreateInput, QuizQuestionUncheckedCreateInput>
  }

  /**
   * QuizQuestion createMany
   */
  export type QuizQuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QuizQuestions.
     */
    data: QuizQuestionCreateManyInput | QuizQuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QuizQuestion createManyAndReturn
   */
  export type QuizQuestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * The data used to create many QuizQuestions.
     */
    data: QuizQuestionCreateManyInput | QuizQuestionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizQuestion update
   */
  export type QuizQuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a QuizQuestion.
     */
    data: XOR<QuizQuestionUpdateInput, QuizQuestionUncheckedUpdateInput>
    /**
     * Choose, which QuizQuestion to update.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion updateMany
   */
  export type QuizQuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QuizQuestions.
     */
    data: XOR<QuizQuestionUpdateManyMutationInput, QuizQuestionUncheckedUpdateManyInput>
    /**
     * Filter which QuizQuestions to update
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to update.
     */
    limit?: number
  }

  /**
   * QuizQuestion updateManyAndReturn
   */
  export type QuizQuestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * The data used to update QuizQuestions.
     */
    data: XOR<QuizQuestionUpdateManyMutationInput, QuizQuestionUncheckedUpdateManyInput>
    /**
     * Filter which QuizQuestions to update
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QuizQuestion upsert
   */
  export type QuizQuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the QuizQuestion to update in case it exists.
     */
    where: QuizQuestionWhereUniqueInput
    /**
     * In case the QuizQuestion found by the `where` argument doesn't exist, create a new QuizQuestion with this data.
     */
    create: XOR<QuizQuestionCreateInput, QuizQuestionUncheckedCreateInput>
    /**
     * In case the QuizQuestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuizQuestionUpdateInput, QuizQuestionUncheckedUpdateInput>
  }

  /**
   * QuizQuestion delete
   */
  export type QuizQuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
    /**
     * Filter which QuizQuestion to delete.
     */
    where: QuizQuestionWhereUniqueInput
  }

  /**
   * QuizQuestion deleteMany
   */
  export type QuizQuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QuizQuestions to delete
     */
    where?: QuizQuestionWhereInput
    /**
     * Limit how many QuizQuestions to delete.
     */
    limit?: number
  }

  /**
   * QuizQuestion.user_answers
   */
  export type QuizQuestion$user_answersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerInclude<ExtArgs> | null
    where?: UserQuizAnswerWhereInput
    orderBy?: UserQuizAnswerOrderByWithRelationInput | UserQuizAnswerOrderByWithRelationInput[]
    cursor?: UserQuizAnswerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserQuizAnswerScalarFieldEnum | UserQuizAnswerScalarFieldEnum[]
  }

  /**
   * QuizQuestion without action
   */
  export type QuizQuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuizQuestion
     */
    select?: QuizQuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QuizQuestion
     */
    omit?: QuizQuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuizQuestionInclude<ExtArgs> | null
  }


  /**
   * Model LearningPath
   */

  export type AggregateLearningPath = {
    _count: LearningPathCountAggregateOutputType | null
    _avg: LearningPathAvgAggregateOutputType | null
    _sum: LearningPathSumAggregateOutputType | null
    _min: LearningPathMinAggregateOutputType | null
    _max: LearningPathMaxAggregateOutputType | null
  }

  export type LearningPathAvgAggregateOutputType = {
    id: number | null
    estimated_time: number | null
  }

  export type LearningPathSumAggregateOutputType = {
    id: number | null
    estimated_time: number | null
  }

  export type LearningPathMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    difficulty: string | null
    estimated_time: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LearningPathMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    difficulty: string | null
    estimated_time: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LearningPathCountAggregateOutputType = {
    id: number
    title: number
    description: number
    difficulty: number
    estimated_time: number
    prerequisites: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type LearningPathAvgAggregateInputType = {
    id?: true
    estimated_time?: true
  }

  export type LearningPathSumAggregateInputType = {
    id?: true
    estimated_time?: true
  }

  export type LearningPathMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    difficulty?: true
    estimated_time?: true
    created_at?: true
    updated_at?: true
  }

  export type LearningPathMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    difficulty?: true
    estimated_time?: true
    created_at?: true
    updated_at?: true
  }

  export type LearningPathCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    difficulty?: true
    estimated_time?: true
    prerequisites?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type LearningPathAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningPath to aggregate.
     */
    where?: LearningPathWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPaths to fetch.
     */
    orderBy?: LearningPathOrderByWithRelationInput | LearningPathOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningPathWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPaths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPaths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningPaths
    **/
    _count?: true | LearningPathCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LearningPathAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LearningPathSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningPathMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningPathMaxAggregateInputType
  }

  export type GetLearningPathAggregateType<T extends LearningPathAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningPath]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningPath[P]>
      : GetScalarType<T[P], AggregateLearningPath[P]>
  }




  export type LearningPathGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningPathWhereInput
    orderBy?: LearningPathOrderByWithAggregationInput | LearningPathOrderByWithAggregationInput[]
    by: LearningPathScalarFieldEnum[] | LearningPathScalarFieldEnum
    having?: LearningPathScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningPathCountAggregateInputType | true
    _avg?: LearningPathAvgAggregateInputType
    _sum?: LearningPathSumAggregateInputType
    _min?: LearningPathMinAggregateInputType
    _max?: LearningPathMaxAggregateInputType
  }

  export type LearningPathGroupByOutputType = {
    id: number
    title: string
    description: string
    difficulty: string
    estimated_time: number
    prerequisites: string[]
    created_at: Date
    updated_at: Date
    _count: LearningPathCountAggregateOutputType | null
    _avg: LearningPathAvgAggregateOutputType | null
    _sum: LearningPathSumAggregateOutputType | null
    _min: LearningPathMinAggregateOutputType | null
    _max: LearningPathMaxAggregateOutputType | null
  }

  type GetLearningPathGroupByPayload<T extends LearningPathGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningPathGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningPathGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningPathGroupByOutputType[P]>
            : GetScalarType<T[P], LearningPathGroupByOutputType[P]>
        }
      >
    >


  export type LearningPathSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    estimated_time?: boolean
    prerequisites?: boolean
    created_at?: boolean
    updated_at?: boolean
    learning_path_items?: boolean | LearningPath$learning_path_itemsArgs<ExtArgs>
    learning_paths_progress?: boolean | LearningPath$learning_paths_progressArgs<ExtArgs>
    _count?: boolean | LearningPathCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningPath"]>

  export type LearningPathSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    estimated_time?: boolean
    prerequisites?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["learningPath"]>

  export type LearningPathSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    estimated_time?: boolean
    prerequisites?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["learningPath"]>

  export type LearningPathSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    difficulty?: boolean
    estimated_time?: boolean
    prerequisites?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type LearningPathOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "difficulty" | "estimated_time" | "prerequisites" | "created_at" | "updated_at", ExtArgs["result"]["learningPath"]>
  export type LearningPathInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    learning_path_items?: boolean | LearningPath$learning_path_itemsArgs<ExtArgs>
    learning_paths_progress?: boolean | LearningPath$learning_paths_progressArgs<ExtArgs>
    _count?: boolean | LearningPathCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LearningPathIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LearningPathIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LearningPathPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningPath"
    objects: {
      learning_path_items: Prisma.$LearningPathItemPayload<ExtArgs>[]
      learning_paths_progress: Prisma.$LearningPathProgressPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      difficulty: string
      estimated_time: number
      prerequisites: string[]
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["learningPath"]>
    composites: {}
  }

  type LearningPathGetPayload<S extends boolean | null | undefined | LearningPathDefaultArgs> = $Result.GetResult<Prisma.$LearningPathPayload, S>

  type LearningPathCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningPathFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningPathCountAggregateInputType | true
    }

  export interface LearningPathDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningPath'], meta: { name: 'LearningPath' } }
    /**
     * Find zero or one LearningPath that matches the filter.
     * @param {LearningPathFindUniqueArgs} args - Arguments to find a LearningPath
     * @example
     * // Get one LearningPath
     * const learningPath = await prisma.learningPath.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningPathFindUniqueArgs>(args: SelectSubset<T, LearningPathFindUniqueArgs<ExtArgs>>): Prisma__LearningPathClient<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningPath that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningPathFindUniqueOrThrowArgs} args - Arguments to find a LearningPath
     * @example
     * // Get one LearningPath
     * const learningPath = await prisma.learningPath.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningPathFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningPathFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningPathClient<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningPath that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathFindFirstArgs} args - Arguments to find a LearningPath
     * @example
     * // Get one LearningPath
     * const learningPath = await prisma.learningPath.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningPathFindFirstArgs>(args?: SelectSubset<T, LearningPathFindFirstArgs<ExtArgs>>): Prisma__LearningPathClient<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningPath that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathFindFirstOrThrowArgs} args - Arguments to find a LearningPath
     * @example
     * // Get one LearningPath
     * const learningPath = await prisma.learningPath.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningPathFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningPathFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningPathClient<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningPaths that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningPaths
     * const learningPaths = await prisma.learningPath.findMany()
     * 
     * // Get first 10 LearningPaths
     * const learningPaths = await prisma.learningPath.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningPathWithIdOnly = await prisma.learningPath.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningPathFindManyArgs>(args?: SelectSubset<T, LearningPathFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningPath.
     * @param {LearningPathCreateArgs} args - Arguments to create a LearningPath.
     * @example
     * // Create one LearningPath
     * const LearningPath = await prisma.learningPath.create({
     *   data: {
     *     // ... data to create a LearningPath
     *   }
     * })
     * 
     */
    create<T extends LearningPathCreateArgs>(args: SelectSubset<T, LearningPathCreateArgs<ExtArgs>>): Prisma__LearningPathClient<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningPaths.
     * @param {LearningPathCreateManyArgs} args - Arguments to create many LearningPaths.
     * @example
     * // Create many LearningPaths
     * const learningPath = await prisma.learningPath.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningPathCreateManyArgs>(args?: SelectSubset<T, LearningPathCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningPaths and returns the data saved in the database.
     * @param {LearningPathCreateManyAndReturnArgs} args - Arguments to create many LearningPaths.
     * @example
     * // Create many LearningPaths
     * const learningPath = await prisma.learningPath.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningPaths and only return the `id`
     * const learningPathWithIdOnly = await prisma.learningPath.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningPathCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningPathCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningPath.
     * @param {LearningPathDeleteArgs} args - Arguments to delete one LearningPath.
     * @example
     * // Delete one LearningPath
     * const LearningPath = await prisma.learningPath.delete({
     *   where: {
     *     // ... filter to delete one LearningPath
     *   }
     * })
     * 
     */
    delete<T extends LearningPathDeleteArgs>(args: SelectSubset<T, LearningPathDeleteArgs<ExtArgs>>): Prisma__LearningPathClient<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningPath.
     * @param {LearningPathUpdateArgs} args - Arguments to update one LearningPath.
     * @example
     * // Update one LearningPath
     * const learningPath = await prisma.learningPath.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningPathUpdateArgs>(args: SelectSubset<T, LearningPathUpdateArgs<ExtArgs>>): Prisma__LearningPathClient<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningPaths.
     * @param {LearningPathDeleteManyArgs} args - Arguments to filter LearningPaths to delete.
     * @example
     * // Delete a few LearningPaths
     * const { count } = await prisma.learningPath.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningPathDeleteManyArgs>(args?: SelectSubset<T, LearningPathDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningPaths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningPaths
     * const learningPath = await prisma.learningPath.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningPathUpdateManyArgs>(args: SelectSubset<T, LearningPathUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningPaths and returns the data updated in the database.
     * @param {LearningPathUpdateManyAndReturnArgs} args - Arguments to update many LearningPaths.
     * @example
     * // Update many LearningPaths
     * const learningPath = await prisma.learningPath.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningPaths and only return the `id`
     * const learningPathWithIdOnly = await prisma.learningPath.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningPathUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningPathUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningPath.
     * @param {LearningPathUpsertArgs} args - Arguments to update or create a LearningPath.
     * @example
     * // Update or create a LearningPath
     * const learningPath = await prisma.learningPath.upsert({
     *   create: {
     *     // ... data to create a LearningPath
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningPath we want to update
     *   }
     * })
     */
    upsert<T extends LearningPathUpsertArgs>(args: SelectSubset<T, LearningPathUpsertArgs<ExtArgs>>): Prisma__LearningPathClient<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningPaths.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathCountArgs} args - Arguments to filter LearningPaths to count.
     * @example
     * // Count the number of LearningPaths
     * const count = await prisma.learningPath.count({
     *   where: {
     *     // ... the filter for the LearningPaths we want to count
     *   }
     * })
    **/
    count<T extends LearningPathCountArgs>(
      args?: Subset<T, LearningPathCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningPathCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningPath.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningPathAggregateArgs>(args: Subset<T, LearningPathAggregateArgs>): Prisma.PrismaPromise<GetLearningPathAggregateType<T>>

    /**
     * Group by LearningPath.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningPathGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningPathGroupByArgs['orderBy'] }
        : { orderBy?: LearningPathGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningPathGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningPathGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningPath model
   */
  readonly fields: LearningPathFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningPath.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningPathClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    learning_path_items<T extends LearningPath$learning_path_itemsArgs<ExtArgs> = {}>(args?: Subset<T, LearningPath$learning_path_itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    learning_paths_progress<T extends LearningPath$learning_paths_progressArgs<ExtArgs> = {}>(args?: Subset<T, LearningPath$learning_paths_progressArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningPath model
   */
  interface LearningPathFieldRefs {
    readonly id: FieldRef<"LearningPath", 'Int'>
    readonly title: FieldRef<"LearningPath", 'String'>
    readonly description: FieldRef<"LearningPath", 'String'>
    readonly difficulty: FieldRef<"LearningPath", 'String'>
    readonly estimated_time: FieldRef<"LearningPath", 'Int'>
    readonly prerequisites: FieldRef<"LearningPath", 'String[]'>
    readonly created_at: FieldRef<"LearningPath", 'DateTime'>
    readonly updated_at: FieldRef<"LearningPath", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LearningPath findUnique
   */
  export type LearningPathFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathInclude<ExtArgs> | null
    /**
     * Filter, which LearningPath to fetch.
     */
    where: LearningPathWhereUniqueInput
  }

  /**
   * LearningPath findUniqueOrThrow
   */
  export type LearningPathFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathInclude<ExtArgs> | null
    /**
     * Filter, which LearningPath to fetch.
     */
    where: LearningPathWhereUniqueInput
  }

  /**
   * LearningPath findFirst
   */
  export type LearningPathFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathInclude<ExtArgs> | null
    /**
     * Filter, which LearningPath to fetch.
     */
    where?: LearningPathWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPaths to fetch.
     */
    orderBy?: LearningPathOrderByWithRelationInput | LearningPathOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningPaths.
     */
    cursor?: LearningPathWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPaths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPaths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningPaths.
     */
    distinct?: LearningPathScalarFieldEnum | LearningPathScalarFieldEnum[]
  }

  /**
   * LearningPath findFirstOrThrow
   */
  export type LearningPathFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathInclude<ExtArgs> | null
    /**
     * Filter, which LearningPath to fetch.
     */
    where?: LearningPathWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPaths to fetch.
     */
    orderBy?: LearningPathOrderByWithRelationInput | LearningPathOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningPaths.
     */
    cursor?: LearningPathWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPaths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPaths.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningPaths.
     */
    distinct?: LearningPathScalarFieldEnum | LearningPathScalarFieldEnum[]
  }

  /**
   * LearningPath findMany
   */
  export type LearningPathFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathInclude<ExtArgs> | null
    /**
     * Filter, which LearningPaths to fetch.
     */
    where?: LearningPathWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPaths to fetch.
     */
    orderBy?: LearningPathOrderByWithRelationInput | LearningPathOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningPaths.
     */
    cursor?: LearningPathWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPaths from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPaths.
     */
    skip?: number
    distinct?: LearningPathScalarFieldEnum | LearningPathScalarFieldEnum[]
  }

  /**
   * LearningPath create
   */
  export type LearningPathCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathInclude<ExtArgs> | null
    /**
     * The data needed to create a LearningPath.
     */
    data: XOR<LearningPathCreateInput, LearningPathUncheckedCreateInput>
  }

  /**
   * LearningPath createMany
   */
  export type LearningPathCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningPaths.
     */
    data: LearningPathCreateManyInput | LearningPathCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningPath createManyAndReturn
   */
  export type LearningPathCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * The data used to create many LearningPaths.
     */
    data: LearningPathCreateManyInput | LearningPathCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningPath update
   */
  export type LearningPathUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathInclude<ExtArgs> | null
    /**
     * The data needed to update a LearningPath.
     */
    data: XOR<LearningPathUpdateInput, LearningPathUncheckedUpdateInput>
    /**
     * Choose, which LearningPath to update.
     */
    where: LearningPathWhereUniqueInput
  }

  /**
   * LearningPath updateMany
   */
  export type LearningPathUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningPaths.
     */
    data: XOR<LearningPathUpdateManyMutationInput, LearningPathUncheckedUpdateManyInput>
    /**
     * Filter which LearningPaths to update
     */
    where?: LearningPathWhereInput
    /**
     * Limit how many LearningPaths to update.
     */
    limit?: number
  }

  /**
   * LearningPath updateManyAndReturn
   */
  export type LearningPathUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * The data used to update LearningPaths.
     */
    data: XOR<LearningPathUpdateManyMutationInput, LearningPathUncheckedUpdateManyInput>
    /**
     * Filter which LearningPaths to update
     */
    where?: LearningPathWhereInput
    /**
     * Limit how many LearningPaths to update.
     */
    limit?: number
  }

  /**
   * LearningPath upsert
   */
  export type LearningPathUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathInclude<ExtArgs> | null
    /**
     * The filter to search for the LearningPath to update in case it exists.
     */
    where: LearningPathWhereUniqueInput
    /**
     * In case the LearningPath found by the `where` argument doesn't exist, create a new LearningPath with this data.
     */
    create: XOR<LearningPathCreateInput, LearningPathUncheckedCreateInput>
    /**
     * In case the LearningPath was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningPathUpdateInput, LearningPathUncheckedUpdateInput>
  }

  /**
   * LearningPath delete
   */
  export type LearningPathDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathInclude<ExtArgs> | null
    /**
     * Filter which LearningPath to delete.
     */
    where: LearningPathWhereUniqueInput
  }

  /**
   * LearningPath deleteMany
   */
  export type LearningPathDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningPaths to delete
     */
    where?: LearningPathWhereInput
    /**
     * Limit how many LearningPaths to delete.
     */
    limit?: number
  }

  /**
   * LearningPath.learning_path_items
   */
  export type LearningPath$learning_path_itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemInclude<ExtArgs> | null
    where?: LearningPathItemWhereInput
    orderBy?: LearningPathItemOrderByWithRelationInput | LearningPathItemOrderByWithRelationInput[]
    cursor?: LearningPathItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LearningPathItemScalarFieldEnum | LearningPathItemScalarFieldEnum[]
  }

  /**
   * LearningPath.learning_paths_progress
   */
  export type LearningPath$learning_paths_progressArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
    where?: LearningPathProgressWhereInput
    orderBy?: LearningPathProgressOrderByWithRelationInput | LearningPathProgressOrderByWithRelationInput[]
    cursor?: LearningPathProgressWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LearningPathProgressScalarFieldEnum | LearningPathProgressScalarFieldEnum[]
  }

  /**
   * LearningPath without action
   */
  export type LearningPathDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPath
     */
    select?: LearningPathSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPath
     */
    omit?: LearningPathOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathInclude<ExtArgs> | null
  }


  /**
   * Model LearningPathItem
   */

  export type AggregateLearningPathItem = {
    _count: LearningPathItemCountAggregateOutputType | null
    _avg: LearningPathItemAvgAggregateOutputType | null
    _sum: LearningPathItemSumAggregateOutputType | null
    _min: LearningPathItemMinAggregateOutputType | null
    _max: LearningPathItemMaxAggregateOutputType | null
  }

  export type LearningPathItemAvgAggregateOutputType = {
    id: number | null
    learning_path_id: number | null
    item_id: number | null
    order: number | null
  }

  export type LearningPathItemSumAggregateOutputType = {
    id: number | null
    learning_path_id: number | null
    item_id: number | null
    order: number | null
  }

  export type LearningPathItemMinAggregateOutputType = {
    id: number | null
    learning_path_id: number | null
    item_type: string | null
    item_id: number | null
    order: number | null
    required: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LearningPathItemMaxAggregateOutputType = {
    id: number | null
    learning_path_id: number | null
    item_type: string | null
    item_id: number | null
    order: number | null
    required: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LearningPathItemCountAggregateOutputType = {
    id: number
    learning_path_id: number
    item_type: number
    item_id: number
    order: number
    required: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type LearningPathItemAvgAggregateInputType = {
    id?: true
    learning_path_id?: true
    item_id?: true
    order?: true
  }

  export type LearningPathItemSumAggregateInputType = {
    id?: true
    learning_path_id?: true
    item_id?: true
    order?: true
  }

  export type LearningPathItemMinAggregateInputType = {
    id?: true
    learning_path_id?: true
    item_type?: true
    item_id?: true
    order?: true
    required?: true
    created_at?: true
    updated_at?: true
  }

  export type LearningPathItemMaxAggregateInputType = {
    id?: true
    learning_path_id?: true
    item_type?: true
    item_id?: true
    order?: true
    required?: true
    created_at?: true
    updated_at?: true
  }

  export type LearningPathItemCountAggregateInputType = {
    id?: true
    learning_path_id?: true
    item_type?: true
    item_id?: true
    order?: true
    required?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type LearningPathItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningPathItem to aggregate.
     */
    where?: LearningPathItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPathItems to fetch.
     */
    orderBy?: LearningPathItemOrderByWithRelationInput | LearningPathItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningPathItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPathItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPathItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningPathItems
    **/
    _count?: true | LearningPathItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LearningPathItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LearningPathItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningPathItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningPathItemMaxAggregateInputType
  }

  export type GetLearningPathItemAggregateType<T extends LearningPathItemAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningPathItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningPathItem[P]>
      : GetScalarType<T[P], AggregateLearningPathItem[P]>
  }




  export type LearningPathItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningPathItemWhereInput
    orderBy?: LearningPathItemOrderByWithAggregationInput | LearningPathItemOrderByWithAggregationInput[]
    by: LearningPathItemScalarFieldEnum[] | LearningPathItemScalarFieldEnum
    having?: LearningPathItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningPathItemCountAggregateInputType | true
    _avg?: LearningPathItemAvgAggregateInputType
    _sum?: LearningPathItemSumAggregateInputType
    _min?: LearningPathItemMinAggregateInputType
    _max?: LearningPathItemMaxAggregateInputType
  }

  export type LearningPathItemGroupByOutputType = {
    id: number
    learning_path_id: number
    item_type: string
    item_id: number
    order: number
    required: boolean
    created_at: Date
    updated_at: Date
    _count: LearningPathItemCountAggregateOutputType | null
    _avg: LearningPathItemAvgAggregateOutputType | null
    _sum: LearningPathItemSumAggregateOutputType | null
    _min: LearningPathItemMinAggregateOutputType | null
    _max: LearningPathItemMaxAggregateOutputType | null
  }

  type GetLearningPathItemGroupByPayload<T extends LearningPathItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningPathItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningPathItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningPathItemGroupByOutputType[P]>
            : GetScalarType<T[P], LearningPathItemGroupByOutputType[P]>
        }
      >
    >


  export type LearningPathItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    learning_path_id?: boolean
    item_type?: boolean
    item_id?: boolean
    order?: boolean
    required?: boolean
    created_at?: boolean
    updated_at?: boolean
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningPathItem"]>

  export type LearningPathItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    learning_path_id?: boolean
    item_type?: boolean
    item_id?: boolean
    order?: boolean
    required?: boolean
    created_at?: boolean
    updated_at?: boolean
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningPathItem"]>

  export type LearningPathItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    learning_path_id?: boolean
    item_type?: boolean
    item_id?: boolean
    order?: boolean
    required?: boolean
    created_at?: boolean
    updated_at?: boolean
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningPathItem"]>

  export type LearningPathItemSelectScalar = {
    id?: boolean
    learning_path_id?: boolean
    item_type?: boolean
    item_id?: boolean
    order?: boolean
    required?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type LearningPathItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "learning_path_id" | "item_type" | "item_id" | "order" | "required" | "created_at" | "updated_at", ExtArgs["result"]["learningPathItem"]>
  export type LearningPathItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }
  export type LearningPathItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }
  export type LearningPathItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }

  export type $LearningPathItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningPathItem"
    objects: {
      learning_path: Prisma.$LearningPathPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      learning_path_id: number
      item_type: string
      item_id: number
      order: number
      required: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["learningPathItem"]>
    composites: {}
  }

  type LearningPathItemGetPayload<S extends boolean | null | undefined | LearningPathItemDefaultArgs> = $Result.GetResult<Prisma.$LearningPathItemPayload, S>

  type LearningPathItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningPathItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningPathItemCountAggregateInputType | true
    }

  export interface LearningPathItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningPathItem'], meta: { name: 'LearningPathItem' } }
    /**
     * Find zero or one LearningPathItem that matches the filter.
     * @param {LearningPathItemFindUniqueArgs} args - Arguments to find a LearningPathItem
     * @example
     * // Get one LearningPathItem
     * const learningPathItem = await prisma.learningPathItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningPathItemFindUniqueArgs>(args: SelectSubset<T, LearningPathItemFindUniqueArgs<ExtArgs>>): Prisma__LearningPathItemClient<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningPathItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningPathItemFindUniqueOrThrowArgs} args - Arguments to find a LearningPathItem
     * @example
     * // Get one LearningPathItem
     * const learningPathItem = await prisma.learningPathItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningPathItemFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningPathItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningPathItemClient<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningPathItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathItemFindFirstArgs} args - Arguments to find a LearningPathItem
     * @example
     * // Get one LearningPathItem
     * const learningPathItem = await prisma.learningPathItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningPathItemFindFirstArgs>(args?: SelectSubset<T, LearningPathItemFindFirstArgs<ExtArgs>>): Prisma__LearningPathItemClient<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningPathItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathItemFindFirstOrThrowArgs} args - Arguments to find a LearningPathItem
     * @example
     * // Get one LearningPathItem
     * const learningPathItem = await prisma.learningPathItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningPathItemFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningPathItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningPathItemClient<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningPathItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningPathItems
     * const learningPathItems = await prisma.learningPathItem.findMany()
     * 
     * // Get first 10 LearningPathItems
     * const learningPathItems = await prisma.learningPathItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningPathItemWithIdOnly = await prisma.learningPathItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningPathItemFindManyArgs>(args?: SelectSubset<T, LearningPathItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningPathItem.
     * @param {LearningPathItemCreateArgs} args - Arguments to create a LearningPathItem.
     * @example
     * // Create one LearningPathItem
     * const LearningPathItem = await prisma.learningPathItem.create({
     *   data: {
     *     // ... data to create a LearningPathItem
     *   }
     * })
     * 
     */
    create<T extends LearningPathItemCreateArgs>(args: SelectSubset<T, LearningPathItemCreateArgs<ExtArgs>>): Prisma__LearningPathItemClient<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningPathItems.
     * @param {LearningPathItemCreateManyArgs} args - Arguments to create many LearningPathItems.
     * @example
     * // Create many LearningPathItems
     * const learningPathItem = await prisma.learningPathItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningPathItemCreateManyArgs>(args?: SelectSubset<T, LearningPathItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningPathItems and returns the data saved in the database.
     * @param {LearningPathItemCreateManyAndReturnArgs} args - Arguments to create many LearningPathItems.
     * @example
     * // Create many LearningPathItems
     * const learningPathItem = await prisma.learningPathItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningPathItems and only return the `id`
     * const learningPathItemWithIdOnly = await prisma.learningPathItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningPathItemCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningPathItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningPathItem.
     * @param {LearningPathItemDeleteArgs} args - Arguments to delete one LearningPathItem.
     * @example
     * // Delete one LearningPathItem
     * const LearningPathItem = await prisma.learningPathItem.delete({
     *   where: {
     *     // ... filter to delete one LearningPathItem
     *   }
     * })
     * 
     */
    delete<T extends LearningPathItemDeleteArgs>(args: SelectSubset<T, LearningPathItemDeleteArgs<ExtArgs>>): Prisma__LearningPathItemClient<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningPathItem.
     * @param {LearningPathItemUpdateArgs} args - Arguments to update one LearningPathItem.
     * @example
     * // Update one LearningPathItem
     * const learningPathItem = await prisma.learningPathItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningPathItemUpdateArgs>(args: SelectSubset<T, LearningPathItemUpdateArgs<ExtArgs>>): Prisma__LearningPathItemClient<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningPathItems.
     * @param {LearningPathItemDeleteManyArgs} args - Arguments to filter LearningPathItems to delete.
     * @example
     * // Delete a few LearningPathItems
     * const { count } = await prisma.learningPathItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningPathItemDeleteManyArgs>(args?: SelectSubset<T, LearningPathItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningPathItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningPathItems
     * const learningPathItem = await prisma.learningPathItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningPathItemUpdateManyArgs>(args: SelectSubset<T, LearningPathItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningPathItems and returns the data updated in the database.
     * @param {LearningPathItemUpdateManyAndReturnArgs} args - Arguments to update many LearningPathItems.
     * @example
     * // Update many LearningPathItems
     * const learningPathItem = await prisma.learningPathItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningPathItems and only return the `id`
     * const learningPathItemWithIdOnly = await prisma.learningPathItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningPathItemUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningPathItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningPathItem.
     * @param {LearningPathItemUpsertArgs} args - Arguments to update or create a LearningPathItem.
     * @example
     * // Update or create a LearningPathItem
     * const learningPathItem = await prisma.learningPathItem.upsert({
     *   create: {
     *     // ... data to create a LearningPathItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningPathItem we want to update
     *   }
     * })
     */
    upsert<T extends LearningPathItemUpsertArgs>(args: SelectSubset<T, LearningPathItemUpsertArgs<ExtArgs>>): Prisma__LearningPathItemClient<$Result.GetResult<Prisma.$LearningPathItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningPathItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathItemCountArgs} args - Arguments to filter LearningPathItems to count.
     * @example
     * // Count the number of LearningPathItems
     * const count = await prisma.learningPathItem.count({
     *   where: {
     *     // ... the filter for the LearningPathItems we want to count
     *   }
     * })
    **/
    count<T extends LearningPathItemCountArgs>(
      args?: Subset<T, LearningPathItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningPathItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningPathItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningPathItemAggregateArgs>(args: Subset<T, LearningPathItemAggregateArgs>): Prisma.PrismaPromise<GetLearningPathItemAggregateType<T>>

    /**
     * Group by LearningPathItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningPathItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningPathItemGroupByArgs['orderBy'] }
        : { orderBy?: LearningPathItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningPathItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningPathItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningPathItem model
   */
  readonly fields: LearningPathItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningPathItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningPathItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    learning_path<T extends LearningPathDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LearningPathDefaultArgs<ExtArgs>>): Prisma__LearningPathClient<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningPathItem model
   */
  interface LearningPathItemFieldRefs {
    readonly id: FieldRef<"LearningPathItem", 'Int'>
    readonly learning_path_id: FieldRef<"LearningPathItem", 'Int'>
    readonly item_type: FieldRef<"LearningPathItem", 'String'>
    readonly item_id: FieldRef<"LearningPathItem", 'Int'>
    readonly order: FieldRef<"LearningPathItem", 'Int'>
    readonly required: FieldRef<"LearningPathItem", 'Boolean'>
    readonly created_at: FieldRef<"LearningPathItem", 'DateTime'>
    readonly updated_at: FieldRef<"LearningPathItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LearningPathItem findUnique
   */
  export type LearningPathItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemInclude<ExtArgs> | null
    /**
     * Filter, which LearningPathItem to fetch.
     */
    where: LearningPathItemWhereUniqueInput
  }

  /**
   * LearningPathItem findUniqueOrThrow
   */
  export type LearningPathItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemInclude<ExtArgs> | null
    /**
     * Filter, which LearningPathItem to fetch.
     */
    where: LearningPathItemWhereUniqueInput
  }

  /**
   * LearningPathItem findFirst
   */
  export type LearningPathItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemInclude<ExtArgs> | null
    /**
     * Filter, which LearningPathItem to fetch.
     */
    where?: LearningPathItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPathItems to fetch.
     */
    orderBy?: LearningPathItemOrderByWithRelationInput | LearningPathItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningPathItems.
     */
    cursor?: LearningPathItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPathItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPathItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningPathItems.
     */
    distinct?: LearningPathItemScalarFieldEnum | LearningPathItemScalarFieldEnum[]
  }

  /**
   * LearningPathItem findFirstOrThrow
   */
  export type LearningPathItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemInclude<ExtArgs> | null
    /**
     * Filter, which LearningPathItem to fetch.
     */
    where?: LearningPathItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPathItems to fetch.
     */
    orderBy?: LearningPathItemOrderByWithRelationInput | LearningPathItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningPathItems.
     */
    cursor?: LearningPathItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPathItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPathItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningPathItems.
     */
    distinct?: LearningPathItemScalarFieldEnum | LearningPathItemScalarFieldEnum[]
  }

  /**
   * LearningPathItem findMany
   */
  export type LearningPathItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemInclude<ExtArgs> | null
    /**
     * Filter, which LearningPathItems to fetch.
     */
    where?: LearningPathItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPathItems to fetch.
     */
    orderBy?: LearningPathItemOrderByWithRelationInput | LearningPathItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningPathItems.
     */
    cursor?: LearningPathItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPathItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPathItems.
     */
    skip?: number
    distinct?: LearningPathItemScalarFieldEnum | LearningPathItemScalarFieldEnum[]
  }

  /**
   * LearningPathItem create
   */
  export type LearningPathItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemInclude<ExtArgs> | null
    /**
     * The data needed to create a LearningPathItem.
     */
    data: XOR<LearningPathItemCreateInput, LearningPathItemUncheckedCreateInput>
  }

  /**
   * LearningPathItem createMany
   */
  export type LearningPathItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningPathItems.
     */
    data: LearningPathItemCreateManyInput | LearningPathItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningPathItem createManyAndReturn
   */
  export type LearningPathItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * The data used to create many LearningPathItems.
     */
    data: LearningPathItemCreateManyInput | LearningPathItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningPathItem update
   */
  export type LearningPathItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemInclude<ExtArgs> | null
    /**
     * The data needed to update a LearningPathItem.
     */
    data: XOR<LearningPathItemUpdateInput, LearningPathItemUncheckedUpdateInput>
    /**
     * Choose, which LearningPathItem to update.
     */
    where: LearningPathItemWhereUniqueInput
  }

  /**
   * LearningPathItem updateMany
   */
  export type LearningPathItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningPathItems.
     */
    data: XOR<LearningPathItemUpdateManyMutationInput, LearningPathItemUncheckedUpdateManyInput>
    /**
     * Filter which LearningPathItems to update
     */
    where?: LearningPathItemWhereInput
    /**
     * Limit how many LearningPathItems to update.
     */
    limit?: number
  }

  /**
   * LearningPathItem updateManyAndReturn
   */
  export type LearningPathItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * The data used to update LearningPathItems.
     */
    data: XOR<LearningPathItemUpdateManyMutationInput, LearningPathItemUncheckedUpdateManyInput>
    /**
     * Filter which LearningPathItems to update
     */
    where?: LearningPathItemWhereInput
    /**
     * Limit how many LearningPathItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningPathItem upsert
   */
  export type LearningPathItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemInclude<ExtArgs> | null
    /**
     * The filter to search for the LearningPathItem to update in case it exists.
     */
    where: LearningPathItemWhereUniqueInput
    /**
     * In case the LearningPathItem found by the `where` argument doesn't exist, create a new LearningPathItem with this data.
     */
    create: XOR<LearningPathItemCreateInput, LearningPathItemUncheckedCreateInput>
    /**
     * In case the LearningPathItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningPathItemUpdateInput, LearningPathItemUncheckedUpdateInput>
  }

  /**
   * LearningPathItem delete
   */
  export type LearningPathItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemInclude<ExtArgs> | null
    /**
     * Filter which LearningPathItem to delete.
     */
    where: LearningPathItemWhereUniqueInput
  }

  /**
   * LearningPathItem deleteMany
   */
  export type LearningPathItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningPathItems to delete
     */
    where?: LearningPathItemWhereInput
    /**
     * Limit how many LearningPathItems to delete.
     */
    limit?: number
  }

  /**
   * LearningPathItem without action
   */
  export type LearningPathItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathItem
     */
    select?: LearningPathItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathItem
     */
    omit?: LearningPathItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathItemInclude<ExtArgs> | null
  }


  /**
   * Model UserProgress
   */

  export type AggregateUserProgress = {
    _count: UserProgressCountAggregateOutputType | null
    _avg: UserProgressAvgAggregateOutputType | null
    _sum: UserProgressSumAggregateOutputType | null
    _min: UserProgressMinAggregateOutputType | null
    _max: UserProgressMaxAggregateOutputType | null
  }

  export type UserProgressAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    content_id: number | null
    progress_percentage: number | null
    concept_id: number | null
    tutorial_id: number | null
  }

  export type UserProgressSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    content_id: number | null
    progress_percentage: number | null
    concept_id: number | null
    tutorial_id: number | null
  }

  export type UserProgressMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    content_type: string | null
    content_id: number | null
    progress_percentage: number | null
    completed: boolean | null
    last_accessed: Date | null
    created_at: Date | null
    updated_at: Date | null
    concept_id: number | null
    tutorial_id: number | null
  }

  export type UserProgressMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    content_type: string | null
    content_id: number | null
    progress_percentage: number | null
    completed: boolean | null
    last_accessed: Date | null
    created_at: Date | null
    updated_at: Date | null
    concept_id: number | null
    tutorial_id: number | null
  }

  export type UserProgressCountAggregateOutputType = {
    id: number
    user_id: number
    content_type: number
    content_id: number
    progress_percentage: number
    completed: number
    last_accessed: number
    created_at: number
    updated_at: number
    concept_id: number
    tutorial_id: number
    _all: number
  }


  export type UserProgressAvgAggregateInputType = {
    id?: true
    user_id?: true
    content_id?: true
    progress_percentage?: true
    concept_id?: true
    tutorial_id?: true
  }

  export type UserProgressSumAggregateInputType = {
    id?: true
    user_id?: true
    content_id?: true
    progress_percentage?: true
    concept_id?: true
    tutorial_id?: true
  }

  export type UserProgressMinAggregateInputType = {
    id?: true
    user_id?: true
    content_type?: true
    content_id?: true
    progress_percentage?: true
    completed?: true
    last_accessed?: true
    created_at?: true
    updated_at?: true
    concept_id?: true
    tutorial_id?: true
  }

  export type UserProgressMaxAggregateInputType = {
    id?: true
    user_id?: true
    content_type?: true
    content_id?: true
    progress_percentage?: true
    completed?: true
    last_accessed?: true
    created_at?: true
    updated_at?: true
    concept_id?: true
    tutorial_id?: true
  }

  export type UserProgressCountAggregateInputType = {
    id?: true
    user_id?: true
    content_type?: true
    content_id?: true
    progress_percentage?: true
    completed?: true
    last_accessed?: true
    created_at?: true
    updated_at?: true
    concept_id?: true
    tutorial_id?: true
    _all?: true
  }

  export type UserProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProgress to aggregate.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProgresses
    **/
    _count?: true | UserProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProgressMaxAggregateInputType
  }

  export type GetUserProgressAggregateType<T extends UserProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProgress[P]>
      : GetScalarType<T[P], AggregateUserProgress[P]>
  }




  export type UserProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProgressWhereInput
    orderBy?: UserProgressOrderByWithAggregationInput | UserProgressOrderByWithAggregationInput[]
    by: UserProgressScalarFieldEnum[] | UserProgressScalarFieldEnum
    having?: UserProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProgressCountAggregateInputType | true
    _avg?: UserProgressAvgAggregateInputType
    _sum?: UserProgressSumAggregateInputType
    _min?: UserProgressMinAggregateInputType
    _max?: UserProgressMaxAggregateInputType
  }

  export type UserProgressGroupByOutputType = {
    id: number
    user_id: number
    content_type: string
    content_id: number
    progress_percentage: number
    completed: boolean
    last_accessed: Date
    created_at: Date
    updated_at: Date
    concept_id: number | null
    tutorial_id: number | null
    _count: UserProgressCountAggregateOutputType | null
    _avg: UserProgressAvgAggregateOutputType | null
    _sum: UserProgressSumAggregateOutputType | null
    _min: UserProgressMinAggregateOutputType | null
    _max: UserProgressMaxAggregateOutputType | null
  }

  type GetUserProgressGroupByPayload<T extends UserProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProgressGroupByOutputType[P]>
            : GetScalarType<T[P], UserProgressGroupByOutputType[P]>
        }
      >
    >


  export type UserProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    content_type?: boolean
    content_id?: boolean
    progress_percentage?: boolean
    completed?: boolean
    last_accessed?: boolean
    created_at?: boolean
    updated_at?: boolean
    concept_id?: boolean
    tutorial_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    concept?: boolean | UserProgress$conceptArgs<ExtArgs>
    tutorial?: boolean | UserProgress$tutorialArgs<ExtArgs>
  }, ExtArgs["result"]["userProgress"]>

  export type UserProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    content_type?: boolean
    content_id?: boolean
    progress_percentage?: boolean
    completed?: boolean
    last_accessed?: boolean
    created_at?: boolean
    updated_at?: boolean
    concept_id?: boolean
    tutorial_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    concept?: boolean | UserProgress$conceptArgs<ExtArgs>
    tutorial?: boolean | UserProgress$tutorialArgs<ExtArgs>
  }, ExtArgs["result"]["userProgress"]>

  export type UserProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    content_type?: boolean
    content_id?: boolean
    progress_percentage?: boolean
    completed?: boolean
    last_accessed?: boolean
    created_at?: boolean
    updated_at?: boolean
    concept_id?: boolean
    tutorial_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    concept?: boolean | UserProgress$conceptArgs<ExtArgs>
    tutorial?: boolean | UserProgress$tutorialArgs<ExtArgs>
  }, ExtArgs["result"]["userProgress"]>

  export type UserProgressSelectScalar = {
    id?: boolean
    user_id?: boolean
    content_type?: boolean
    content_id?: boolean
    progress_percentage?: boolean
    completed?: boolean
    last_accessed?: boolean
    created_at?: boolean
    updated_at?: boolean
    concept_id?: boolean
    tutorial_id?: boolean
  }

  export type UserProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "content_type" | "content_id" | "progress_percentage" | "completed" | "last_accessed" | "created_at" | "updated_at" | "concept_id" | "tutorial_id", ExtArgs["result"]["userProgress"]>
  export type UserProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    concept?: boolean | UserProgress$conceptArgs<ExtArgs>
    tutorial?: boolean | UserProgress$tutorialArgs<ExtArgs>
  }
  export type UserProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    concept?: boolean | UserProgress$conceptArgs<ExtArgs>
    tutorial?: boolean | UserProgress$tutorialArgs<ExtArgs>
  }
  export type UserProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    concept?: boolean | UserProgress$conceptArgs<ExtArgs>
    tutorial?: boolean | UserProgress$tutorialArgs<ExtArgs>
  }

  export type $UserProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      concept: Prisma.$ConceptExplanationPayload<ExtArgs> | null
      tutorial: Prisma.$TutorialPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      content_type: string
      content_id: number
      progress_percentage: number
      completed: boolean
      last_accessed: Date
      created_at: Date
      updated_at: Date
      concept_id: number | null
      tutorial_id: number | null
    }, ExtArgs["result"]["userProgress"]>
    composites: {}
  }

  type UserProgressGetPayload<S extends boolean | null | undefined | UserProgressDefaultArgs> = $Result.GetResult<Prisma.$UserProgressPayload, S>

  type UserProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProgressCountAggregateInputType | true
    }

  export interface UserProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProgress'], meta: { name: 'UserProgress' } }
    /**
     * Find zero or one UserProgress that matches the filter.
     * @param {UserProgressFindUniqueArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProgressFindUniqueArgs>(args: SelectSubset<T, UserProgressFindUniqueArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProgressFindUniqueOrThrowArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressFindFirstArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProgressFindFirstArgs>(args?: SelectSubset<T, UserProgressFindFirstArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressFindFirstOrThrowArgs} args - Arguments to find a UserProgress
     * @example
     * // Get one UserProgress
     * const userProgress = await prisma.userProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProgresses
     * const userProgresses = await prisma.userProgress.findMany()
     * 
     * // Get first 10 UserProgresses
     * const userProgresses = await prisma.userProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProgressWithIdOnly = await prisma.userProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProgressFindManyArgs>(args?: SelectSubset<T, UserProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProgress.
     * @param {UserProgressCreateArgs} args - Arguments to create a UserProgress.
     * @example
     * // Create one UserProgress
     * const UserProgress = await prisma.userProgress.create({
     *   data: {
     *     // ... data to create a UserProgress
     *   }
     * })
     * 
     */
    create<T extends UserProgressCreateArgs>(args: SelectSubset<T, UserProgressCreateArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProgresses.
     * @param {UserProgressCreateManyArgs} args - Arguments to create many UserProgresses.
     * @example
     * // Create many UserProgresses
     * const userProgress = await prisma.userProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProgressCreateManyArgs>(args?: SelectSubset<T, UserProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProgresses and returns the data saved in the database.
     * @param {UserProgressCreateManyAndReturnArgs} args - Arguments to create many UserProgresses.
     * @example
     * // Create many UserProgresses
     * const userProgress = await prisma.userProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProgresses and only return the `id`
     * const userProgressWithIdOnly = await prisma.userProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProgress.
     * @param {UserProgressDeleteArgs} args - Arguments to delete one UserProgress.
     * @example
     * // Delete one UserProgress
     * const UserProgress = await prisma.userProgress.delete({
     *   where: {
     *     // ... filter to delete one UserProgress
     *   }
     * })
     * 
     */
    delete<T extends UserProgressDeleteArgs>(args: SelectSubset<T, UserProgressDeleteArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProgress.
     * @param {UserProgressUpdateArgs} args - Arguments to update one UserProgress.
     * @example
     * // Update one UserProgress
     * const userProgress = await prisma.userProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProgressUpdateArgs>(args: SelectSubset<T, UserProgressUpdateArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProgresses.
     * @param {UserProgressDeleteManyArgs} args - Arguments to filter UserProgresses to delete.
     * @example
     * // Delete a few UserProgresses
     * const { count } = await prisma.userProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProgressDeleteManyArgs>(args?: SelectSubset<T, UserProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProgresses
     * const userProgress = await prisma.userProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProgressUpdateManyArgs>(args: SelectSubset<T, UserProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProgresses and returns the data updated in the database.
     * @param {UserProgressUpdateManyAndReturnArgs} args - Arguments to update many UserProgresses.
     * @example
     * // Update many UserProgresses
     * const userProgress = await prisma.userProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProgresses and only return the `id`
     * const userProgressWithIdOnly = await prisma.userProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProgress.
     * @param {UserProgressUpsertArgs} args - Arguments to update or create a UserProgress.
     * @example
     * // Update or create a UserProgress
     * const userProgress = await prisma.userProgress.upsert({
     *   create: {
     *     // ... data to create a UserProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProgress we want to update
     *   }
     * })
     */
    upsert<T extends UserProgressUpsertArgs>(args: SelectSubset<T, UserProgressUpsertArgs<ExtArgs>>): Prisma__UserProgressClient<$Result.GetResult<Prisma.$UserProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressCountArgs} args - Arguments to filter UserProgresses to count.
     * @example
     * // Count the number of UserProgresses
     * const count = await prisma.userProgress.count({
     *   where: {
     *     // ... the filter for the UserProgresses we want to count
     *   }
     * })
    **/
    count<T extends UserProgressCountArgs>(
      args?: Subset<T, UserProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProgressAggregateArgs>(args: Subset<T, UserProgressAggregateArgs>): Prisma.PrismaPromise<GetUserProgressAggregateType<T>>

    /**
     * Group by UserProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProgressGroupByArgs['orderBy'] }
        : { orderBy?: UserProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProgress model
   */
  readonly fields: UserProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    concept<T extends UserProgress$conceptArgs<ExtArgs> = {}>(args?: Subset<T, UserProgress$conceptArgs<ExtArgs>>): Prisma__ConceptExplanationClient<$Result.GetResult<Prisma.$ConceptExplanationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tutorial<T extends UserProgress$tutorialArgs<ExtArgs> = {}>(args?: Subset<T, UserProgress$tutorialArgs<ExtArgs>>): Prisma__TutorialClient<$Result.GetResult<Prisma.$TutorialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProgress model
   */
  interface UserProgressFieldRefs {
    readonly id: FieldRef<"UserProgress", 'Int'>
    readonly user_id: FieldRef<"UserProgress", 'Int'>
    readonly content_type: FieldRef<"UserProgress", 'String'>
    readonly content_id: FieldRef<"UserProgress", 'Int'>
    readonly progress_percentage: FieldRef<"UserProgress", 'Int'>
    readonly completed: FieldRef<"UserProgress", 'Boolean'>
    readonly last_accessed: FieldRef<"UserProgress", 'DateTime'>
    readonly created_at: FieldRef<"UserProgress", 'DateTime'>
    readonly updated_at: FieldRef<"UserProgress", 'DateTime'>
    readonly concept_id: FieldRef<"UserProgress", 'Int'>
    readonly tutorial_id: FieldRef<"UserProgress", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UserProgress findUnique
   */
  export type UserProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress findUniqueOrThrow
   */
  export type UserProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress findFirst
   */
  export type UserProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProgresses.
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProgresses.
     */
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * UserProgress findFirstOrThrow
   */
  export type UserProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserProgress to fetch.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProgresses.
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProgresses.
     */
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * UserProgress findMany
   */
  export type UserProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter, which UserProgresses to fetch.
     */
    where?: UserProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProgresses to fetch.
     */
    orderBy?: UserProgressOrderByWithRelationInput | UserProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProgresses.
     */
    cursor?: UserProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProgresses.
     */
    skip?: number
    distinct?: UserProgressScalarFieldEnum | UserProgressScalarFieldEnum[]
  }

  /**
   * UserProgress create
   */
  export type UserProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProgress.
     */
    data: XOR<UserProgressCreateInput, UserProgressUncheckedCreateInput>
  }

  /**
   * UserProgress createMany
   */
  export type UserProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProgresses.
     */
    data: UserProgressCreateManyInput | UserProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProgress createManyAndReturn
   */
  export type UserProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * The data used to create many UserProgresses.
     */
    data: UserProgressCreateManyInput | UserProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProgress update
   */
  export type UserProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProgress.
     */
    data: XOR<UserProgressUpdateInput, UserProgressUncheckedUpdateInput>
    /**
     * Choose, which UserProgress to update.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress updateMany
   */
  export type UserProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProgresses.
     */
    data: XOR<UserProgressUpdateManyMutationInput, UserProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserProgresses to update
     */
    where?: UserProgressWhereInput
    /**
     * Limit how many UserProgresses to update.
     */
    limit?: number
  }

  /**
   * UserProgress updateManyAndReturn
   */
  export type UserProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * The data used to update UserProgresses.
     */
    data: XOR<UserProgressUpdateManyMutationInput, UserProgressUncheckedUpdateManyInput>
    /**
     * Filter which UserProgresses to update
     */
    where?: UserProgressWhereInput
    /**
     * Limit how many UserProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProgress upsert
   */
  export type UserProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProgress to update in case it exists.
     */
    where: UserProgressWhereUniqueInput
    /**
     * In case the UserProgress found by the `where` argument doesn't exist, create a new UserProgress with this data.
     */
    create: XOR<UserProgressCreateInput, UserProgressUncheckedCreateInput>
    /**
     * In case the UserProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProgressUpdateInput, UserProgressUncheckedUpdateInput>
  }

  /**
   * UserProgress delete
   */
  export type UserProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
    /**
     * Filter which UserProgress to delete.
     */
    where: UserProgressWhereUniqueInput
  }

  /**
   * UserProgress deleteMany
   */
  export type UserProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProgresses to delete
     */
    where?: UserProgressWhereInput
    /**
     * Limit how many UserProgresses to delete.
     */
    limit?: number
  }

  /**
   * UserProgress.concept
   */
  export type UserProgress$conceptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConceptExplanation
     */
    select?: ConceptExplanationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ConceptExplanation
     */
    omit?: ConceptExplanationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConceptExplanationInclude<ExtArgs> | null
    where?: ConceptExplanationWhereInput
  }

  /**
   * UserProgress.tutorial
   */
  export type UserProgress$tutorialArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tutorial
     */
    select?: TutorialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tutorial
     */
    omit?: TutorialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TutorialInclude<ExtArgs> | null
    where?: TutorialWhereInput
  }

  /**
   * UserProgress without action
   */
  export type UserProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProgress
     */
    select?: UserProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProgress
     */
    omit?: UserProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProgressInclude<ExtArgs> | null
  }


  /**
   * Model LearningPathProgress
   */

  export type AggregateLearningPathProgress = {
    _count: LearningPathProgressCountAggregateOutputType | null
    _avg: LearningPathProgressAvgAggregateOutputType | null
    _sum: LearningPathProgressSumAggregateOutputType | null
    _min: LearningPathProgressMinAggregateOutputType | null
    _max: LearningPathProgressMaxAggregateOutputType | null
  }

  export type LearningPathProgressAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    learning_path_id: number | null
    progress_percentage: number | null
  }

  export type LearningPathProgressSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    learning_path_id: number | null
    progress_percentage: number | null
  }

  export type LearningPathProgressMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    learning_path_id: number | null
    progress_percentage: number | null
    completed: boolean | null
    last_accessed: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LearningPathProgressMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    learning_path_id: number | null
    progress_percentage: number | null
    completed: boolean | null
    last_accessed: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type LearningPathProgressCountAggregateOutputType = {
    id: number
    user_id: number
    learning_path_id: number
    progress_percentage: number
    completed: number
    last_accessed: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type LearningPathProgressAvgAggregateInputType = {
    id?: true
    user_id?: true
    learning_path_id?: true
    progress_percentage?: true
  }

  export type LearningPathProgressSumAggregateInputType = {
    id?: true
    user_id?: true
    learning_path_id?: true
    progress_percentage?: true
  }

  export type LearningPathProgressMinAggregateInputType = {
    id?: true
    user_id?: true
    learning_path_id?: true
    progress_percentage?: true
    completed?: true
    last_accessed?: true
    created_at?: true
    updated_at?: true
  }

  export type LearningPathProgressMaxAggregateInputType = {
    id?: true
    user_id?: true
    learning_path_id?: true
    progress_percentage?: true
    completed?: true
    last_accessed?: true
    created_at?: true
    updated_at?: true
  }

  export type LearningPathProgressCountAggregateInputType = {
    id?: true
    user_id?: true
    learning_path_id?: true
    progress_percentage?: true
    completed?: true
    last_accessed?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type LearningPathProgressAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningPathProgress to aggregate.
     */
    where?: LearningPathProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPathProgresses to fetch.
     */
    orderBy?: LearningPathProgressOrderByWithRelationInput | LearningPathProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningPathProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPathProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPathProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningPathProgresses
    **/
    _count?: true | LearningPathProgressCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LearningPathProgressAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LearningPathProgressSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningPathProgressMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningPathProgressMaxAggregateInputType
  }

  export type GetLearningPathProgressAggregateType<T extends LearningPathProgressAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningPathProgress]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningPathProgress[P]>
      : GetScalarType<T[P], AggregateLearningPathProgress[P]>
  }




  export type LearningPathProgressGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningPathProgressWhereInput
    orderBy?: LearningPathProgressOrderByWithAggregationInput | LearningPathProgressOrderByWithAggregationInput[]
    by: LearningPathProgressScalarFieldEnum[] | LearningPathProgressScalarFieldEnum
    having?: LearningPathProgressScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningPathProgressCountAggregateInputType | true
    _avg?: LearningPathProgressAvgAggregateInputType
    _sum?: LearningPathProgressSumAggregateInputType
    _min?: LearningPathProgressMinAggregateInputType
    _max?: LearningPathProgressMaxAggregateInputType
  }

  export type LearningPathProgressGroupByOutputType = {
    id: number
    user_id: number
    learning_path_id: number
    progress_percentage: number
    completed: boolean
    last_accessed: Date
    created_at: Date
    updated_at: Date
    _count: LearningPathProgressCountAggregateOutputType | null
    _avg: LearningPathProgressAvgAggregateOutputType | null
    _sum: LearningPathProgressSumAggregateOutputType | null
    _min: LearningPathProgressMinAggregateOutputType | null
    _max: LearningPathProgressMaxAggregateOutputType | null
  }

  type GetLearningPathProgressGroupByPayload<T extends LearningPathProgressGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningPathProgressGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningPathProgressGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningPathProgressGroupByOutputType[P]>
            : GetScalarType<T[P], LearningPathProgressGroupByOutputType[P]>
        }
      >
    >


  export type LearningPathProgressSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    learning_path_id?: boolean
    progress_percentage?: boolean
    completed?: boolean
    last_accessed?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningPathProgress"]>

  export type LearningPathProgressSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    learning_path_id?: boolean
    progress_percentage?: boolean
    completed?: boolean
    last_accessed?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningPathProgress"]>

  export type LearningPathProgressSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    learning_path_id?: boolean
    progress_percentage?: boolean
    completed?: boolean
    last_accessed?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningPathProgress"]>

  export type LearningPathProgressSelectScalar = {
    id?: boolean
    user_id?: boolean
    learning_path_id?: boolean
    progress_percentage?: boolean
    completed?: boolean
    last_accessed?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type LearningPathProgressOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "learning_path_id" | "progress_percentage" | "completed" | "last_accessed" | "created_at" | "updated_at", ExtArgs["result"]["learningPathProgress"]>
  export type LearningPathProgressInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }
  export type LearningPathProgressIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }
  export type LearningPathProgressIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    learning_path?: boolean | LearningPathDefaultArgs<ExtArgs>
  }

  export type $LearningPathProgressPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningPathProgress"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      learning_path: Prisma.$LearningPathPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      learning_path_id: number
      progress_percentage: number
      completed: boolean
      last_accessed: Date
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["learningPathProgress"]>
    composites: {}
  }

  type LearningPathProgressGetPayload<S extends boolean | null | undefined | LearningPathProgressDefaultArgs> = $Result.GetResult<Prisma.$LearningPathProgressPayload, S>

  type LearningPathProgressCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningPathProgressFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningPathProgressCountAggregateInputType | true
    }

  export interface LearningPathProgressDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningPathProgress'], meta: { name: 'LearningPathProgress' } }
    /**
     * Find zero or one LearningPathProgress that matches the filter.
     * @param {LearningPathProgressFindUniqueArgs} args - Arguments to find a LearningPathProgress
     * @example
     * // Get one LearningPathProgress
     * const learningPathProgress = await prisma.learningPathProgress.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningPathProgressFindUniqueArgs>(args: SelectSubset<T, LearningPathProgressFindUniqueArgs<ExtArgs>>): Prisma__LearningPathProgressClient<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningPathProgress that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningPathProgressFindUniqueOrThrowArgs} args - Arguments to find a LearningPathProgress
     * @example
     * // Get one LearningPathProgress
     * const learningPathProgress = await prisma.learningPathProgress.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningPathProgressFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningPathProgressFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningPathProgressClient<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningPathProgress that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathProgressFindFirstArgs} args - Arguments to find a LearningPathProgress
     * @example
     * // Get one LearningPathProgress
     * const learningPathProgress = await prisma.learningPathProgress.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningPathProgressFindFirstArgs>(args?: SelectSubset<T, LearningPathProgressFindFirstArgs<ExtArgs>>): Prisma__LearningPathProgressClient<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningPathProgress that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathProgressFindFirstOrThrowArgs} args - Arguments to find a LearningPathProgress
     * @example
     * // Get one LearningPathProgress
     * const learningPathProgress = await prisma.learningPathProgress.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningPathProgressFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningPathProgressFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningPathProgressClient<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningPathProgresses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathProgressFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningPathProgresses
     * const learningPathProgresses = await prisma.learningPathProgress.findMany()
     * 
     * // Get first 10 LearningPathProgresses
     * const learningPathProgresses = await prisma.learningPathProgress.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningPathProgressWithIdOnly = await prisma.learningPathProgress.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningPathProgressFindManyArgs>(args?: SelectSubset<T, LearningPathProgressFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningPathProgress.
     * @param {LearningPathProgressCreateArgs} args - Arguments to create a LearningPathProgress.
     * @example
     * // Create one LearningPathProgress
     * const LearningPathProgress = await prisma.learningPathProgress.create({
     *   data: {
     *     // ... data to create a LearningPathProgress
     *   }
     * })
     * 
     */
    create<T extends LearningPathProgressCreateArgs>(args: SelectSubset<T, LearningPathProgressCreateArgs<ExtArgs>>): Prisma__LearningPathProgressClient<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningPathProgresses.
     * @param {LearningPathProgressCreateManyArgs} args - Arguments to create many LearningPathProgresses.
     * @example
     * // Create many LearningPathProgresses
     * const learningPathProgress = await prisma.learningPathProgress.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningPathProgressCreateManyArgs>(args?: SelectSubset<T, LearningPathProgressCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningPathProgresses and returns the data saved in the database.
     * @param {LearningPathProgressCreateManyAndReturnArgs} args - Arguments to create many LearningPathProgresses.
     * @example
     * // Create many LearningPathProgresses
     * const learningPathProgress = await prisma.learningPathProgress.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningPathProgresses and only return the `id`
     * const learningPathProgressWithIdOnly = await prisma.learningPathProgress.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningPathProgressCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningPathProgressCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningPathProgress.
     * @param {LearningPathProgressDeleteArgs} args - Arguments to delete one LearningPathProgress.
     * @example
     * // Delete one LearningPathProgress
     * const LearningPathProgress = await prisma.learningPathProgress.delete({
     *   where: {
     *     // ... filter to delete one LearningPathProgress
     *   }
     * })
     * 
     */
    delete<T extends LearningPathProgressDeleteArgs>(args: SelectSubset<T, LearningPathProgressDeleteArgs<ExtArgs>>): Prisma__LearningPathProgressClient<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningPathProgress.
     * @param {LearningPathProgressUpdateArgs} args - Arguments to update one LearningPathProgress.
     * @example
     * // Update one LearningPathProgress
     * const learningPathProgress = await prisma.learningPathProgress.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningPathProgressUpdateArgs>(args: SelectSubset<T, LearningPathProgressUpdateArgs<ExtArgs>>): Prisma__LearningPathProgressClient<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningPathProgresses.
     * @param {LearningPathProgressDeleteManyArgs} args - Arguments to filter LearningPathProgresses to delete.
     * @example
     * // Delete a few LearningPathProgresses
     * const { count } = await prisma.learningPathProgress.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningPathProgressDeleteManyArgs>(args?: SelectSubset<T, LearningPathProgressDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningPathProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathProgressUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningPathProgresses
     * const learningPathProgress = await prisma.learningPathProgress.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningPathProgressUpdateManyArgs>(args: SelectSubset<T, LearningPathProgressUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningPathProgresses and returns the data updated in the database.
     * @param {LearningPathProgressUpdateManyAndReturnArgs} args - Arguments to update many LearningPathProgresses.
     * @example
     * // Update many LearningPathProgresses
     * const learningPathProgress = await prisma.learningPathProgress.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningPathProgresses and only return the `id`
     * const learningPathProgressWithIdOnly = await prisma.learningPathProgress.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningPathProgressUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningPathProgressUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningPathProgress.
     * @param {LearningPathProgressUpsertArgs} args - Arguments to update or create a LearningPathProgress.
     * @example
     * // Update or create a LearningPathProgress
     * const learningPathProgress = await prisma.learningPathProgress.upsert({
     *   create: {
     *     // ... data to create a LearningPathProgress
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningPathProgress we want to update
     *   }
     * })
     */
    upsert<T extends LearningPathProgressUpsertArgs>(args: SelectSubset<T, LearningPathProgressUpsertArgs<ExtArgs>>): Prisma__LearningPathProgressClient<$Result.GetResult<Prisma.$LearningPathProgressPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningPathProgresses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathProgressCountArgs} args - Arguments to filter LearningPathProgresses to count.
     * @example
     * // Count the number of LearningPathProgresses
     * const count = await prisma.learningPathProgress.count({
     *   where: {
     *     // ... the filter for the LearningPathProgresses we want to count
     *   }
     * })
    **/
    count<T extends LearningPathProgressCountArgs>(
      args?: Subset<T, LearningPathProgressCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningPathProgressCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningPathProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathProgressAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningPathProgressAggregateArgs>(args: Subset<T, LearningPathProgressAggregateArgs>): Prisma.PrismaPromise<GetLearningPathProgressAggregateType<T>>

    /**
     * Group by LearningPathProgress.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningPathProgressGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningPathProgressGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningPathProgressGroupByArgs['orderBy'] }
        : { orderBy?: LearningPathProgressGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningPathProgressGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningPathProgressGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningPathProgress model
   */
  readonly fields: LearningPathProgressFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningPathProgress.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningPathProgressClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    learning_path<T extends LearningPathDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LearningPathDefaultArgs<ExtArgs>>): Prisma__LearningPathClient<$Result.GetResult<Prisma.$LearningPathPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningPathProgress model
   */
  interface LearningPathProgressFieldRefs {
    readonly id: FieldRef<"LearningPathProgress", 'Int'>
    readonly user_id: FieldRef<"LearningPathProgress", 'Int'>
    readonly learning_path_id: FieldRef<"LearningPathProgress", 'Int'>
    readonly progress_percentage: FieldRef<"LearningPathProgress", 'Int'>
    readonly completed: FieldRef<"LearningPathProgress", 'Boolean'>
    readonly last_accessed: FieldRef<"LearningPathProgress", 'DateTime'>
    readonly created_at: FieldRef<"LearningPathProgress", 'DateTime'>
    readonly updated_at: FieldRef<"LearningPathProgress", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LearningPathProgress findUnique
   */
  export type LearningPathProgressFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
    /**
     * Filter, which LearningPathProgress to fetch.
     */
    where: LearningPathProgressWhereUniqueInput
  }

  /**
   * LearningPathProgress findUniqueOrThrow
   */
  export type LearningPathProgressFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
    /**
     * Filter, which LearningPathProgress to fetch.
     */
    where: LearningPathProgressWhereUniqueInput
  }

  /**
   * LearningPathProgress findFirst
   */
  export type LearningPathProgressFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
    /**
     * Filter, which LearningPathProgress to fetch.
     */
    where?: LearningPathProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPathProgresses to fetch.
     */
    orderBy?: LearningPathProgressOrderByWithRelationInput | LearningPathProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningPathProgresses.
     */
    cursor?: LearningPathProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPathProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPathProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningPathProgresses.
     */
    distinct?: LearningPathProgressScalarFieldEnum | LearningPathProgressScalarFieldEnum[]
  }

  /**
   * LearningPathProgress findFirstOrThrow
   */
  export type LearningPathProgressFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
    /**
     * Filter, which LearningPathProgress to fetch.
     */
    where?: LearningPathProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPathProgresses to fetch.
     */
    orderBy?: LearningPathProgressOrderByWithRelationInput | LearningPathProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningPathProgresses.
     */
    cursor?: LearningPathProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPathProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPathProgresses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningPathProgresses.
     */
    distinct?: LearningPathProgressScalarFieldEnum | LearningPathProgressScalarFieldEnum[]
  }

  /**
   * LearningPathProgress findMany
   */
  export type LearningPathProgressFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
    /**
     * Filter, which LearningPathProgresses to fetch.
     */
    where?: LearningPathProgressWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningPathProgresses to fetch.
     */
    orderBy?: LearningPathProgressOrderByWithRelationInput | LearningPathProgressOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningPathProgresses.
     */
    cursor?: LearningPathProgressWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningPathProgresses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningPathProgresses.
     */
    skip?: number
    distinct?: LearningPathProgressScalarFieldEnum | LearningPathProgressScalarFieldEnum[]
  }

  /**
   * LearningPathProgress create
   */
  export type LearningPathProgressCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
    /**
     * The data needed to create a LearningPathProgress.
     */
    data: XOR<LearningPathProgressCreateInput, LearningPathProgressUncheckedCreateInput>
  }

  /**
   * LearningPathProgress createMany
   */
  export type LearningPathProgressCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningPathProgresses.
     */
    data: LearningPathProgressCreateManyInput | LearningPathProgressCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningPathProgress createManyAndReturn
   */
  export type LearningPathProgressCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * The data used to create many LearningPathProgresses.
     */
    data: LearningPathProgressCreateManyInput | LearningPathProgressCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningPathProgress update
   */
  export type LearningPathProgressUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
    /**
     * The data needed to update a LearningPathProgress.
     */
    data: XOR<LearningPathProgressUpdateInput, LearningPathProgressUncheckedUpdateInput>
    /**
     * Choose, which LearningPathProgress to update.
     */
    where: LearningPathProgressWhereUniqueInput
  }

  /**
   * LearningPathProgress updateMany
   */
  export type LearningPathProgressUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningPathProgresses.
     */
    data: XOR<LearningPathProgressUpdateManyMutationInput, LearningPathProgressUncheckedUpdateManyInput>
    /**
     * Filter which LearningPathProgresses to update
     */
    where?: LearningPathProgressWhereInput
    /**
     * Limit how many LearningPathProgresses to update.
     */
    limit?: number
  }

  /**
   * LearningPathProgress updateManyAndReturn
   */
  export type LearningPathProgressUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * The data used to update LearningPathProgresses.
     */
    data: XOR<LearningPathProgressUpdateManyMutationInput, LearningPathProgressUncheckedUpdateManyInput>
    /**
     * Filter which LearningPathProgresses to update
     */
    where?: LearningPathProgressWhereInput
    /**
     * Limit how many LearningPathProgresses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningPathProgress upsert
   */
  export type LearningPathProgressUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
    /**
     * The filter to search for the LearningPathProgress to update in case it exists.
     */
    where: LearningPathProgressWhereUniqueInput
    /**
     * In case the LearningPathProgress found by the `where` argument doesn't exist, create a new LearningPathProgress with this data.
     */
    create: XOR<LearningPathProgressCreateInput, LearningPathProgressUncheckedCreateInput>
    /**
     * In case the LearningPathProgress was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningPathProgressUpdateInput, LearningPathProgressUncheckedUpdateInput>
  }

  /**
   * LearningPathProgress delete
   */
  export type LearningPathProgressDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
    /**
     * Filter which LearningPathProgress to delete.
     */
    where: LearningPathProgressWhereUniqueInput
  }

  /**
   * LearningPathProgress deleteMany
   */
  export type LearningPathProgressDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningPathProgresses to delete
     */
    where?: LearningPathProgressWhereInput
    /**
     * Limit how many LearningPathProgresses to delete.
     */
    limit?: number
  }

  /**
   * LearningPathProgress without action
   */
  export type LearningPathProgressDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningPathProgress
     */
    select?: LearningPathProgressSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningPathProgress
     */
    omit?: LearningPathProgressOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningPathProgressInclude<ExtArgs> | null
  }


  /**
   * Model UserSolution
   */

  export type AggregateUserSolution = {
    _count: UserSolutionCountAggregateOutputType | null
    _avg: UserSolutionAvgAggregateOutputType | null
    _sum: UserSolutionSumAggregateOutputType | null
    _min: UserSolutionMinAggregateOutputType | null
    _max: UserSolutionMaxAggregateOutputType | null
  }

  export type UserSolutionAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    exercise_id: number | null
  }

  export type UserSolutionSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    exercise_id: number | null
  }

  export type UserSolutionMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    exercise_id: number | null
    code: string | null
    is_correct: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserSolutionMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    exercise_id: number | null
    code: string | null
    is_correct: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserSolutionCountAggregateOutputType = {
    id: number
    user_id: number
    exercise_id: number
    code: number
    is_correct: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserSolutionAvgAggregateInputType = {
    id?: true
    user_id?: true
    exercise_id?: true
  }

  export type UserSolutionSumAggregateInputType = {
    id?: true
    user_id?: true
    exercise_id?: true
  }

  export type UserSolutionMinAggregateInputType = {
    id?: true
    user_id?: true
    exercise_id?: true
    code?: true
    is_correct?: true
    created_at?: true
    updated_at?: true
  }

  export type UserSolutionMaxAggregateInputType = {
    id?: true
    user_id?: true
    exercise_id?: true
    code?: true
    is_correct?: true
    created_at?: true
    updated_at?: true
  }

  export type UserSolutionCountAggregateInputType = {
    id?: true
    user_id?: true
    exercise_id?: true
    code?: true
    is_correct?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserSolutionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSolution to aggregate.
     */
    where?: UserSolutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSolutions to fetch.
     */
    orderBy?: UserSolutionOrderByWithRelationInput | UserSolutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSolutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSolutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSolutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSolutions
    **/
    _count?: true | UserSolutionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserSolutionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSolutionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSolutionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSolutionMaxAggregateInputType
  }

  export type GetUserSolutionAggregateType<T extends UserSolutionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSolution]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSolution[P]>
      : GetScalarType<T[P], AggregateUserSolution[P]>
  }




  export type UserSolutionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSolutionWhereInput
    orderBy?: UserSolutionOrderByWithAggregationInput | UserSolutionOrderByWithAggregationInput[]
    by: UserSolutionScalarFieldEnum[] | UserSolutionScalarFieldEnum
    having?: UserSolutionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSolutionCountAggregateInputType | true
    _avg?: UserSolutionAvgAggregateInputType
    _sum?: UserSolutionSumAggregateInputType
    _min?: UserSolutionMinAggregateInputType
    _max?: UserSolutionMaxAggregateInputType
  }

  export type UserSolutionGroupByOutputType = {
    id: number
    user_id: number
    exercise_id: number
    code: string
    is_correct: boolean
    created_at: Date
    updated_at: Date
    _count: UserSolutionCountAggregateOutputType | null
    _avg: UserSolutionAvgAggregateOutputType | null
    _sum: UserSolutionSumAggregateOutputType | null
    _min: UserSolutionMinAggregateOutputType | null
    _max: UserSolutionMaxAggregateOutputType | null
  }

  type GetUserSolutionGroupByPayload<T extends UserSolutionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSolutionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSolutionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSolutionGroupByOutputType[P]>
            : GetScalarType<T[P], UserSolutionGroupByOutputType[P]>
        }
      >
    >


  export type UserSolutionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    exercise_id?: boolean
    code?: boolean
    is_correct?: boolean
    created_at?: boolean
    updated_at?: boolean
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSolution"]>

  export type UserSolutionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    exercise_id?: boolean
    code?: boolean
    is_correct?: boolean
    created_at?: boolean
    updated_at?: boolean
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSolution"]>

  export type UserSolutionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    exercise_id?: boolean
    code?: boolean
    is_correct?: boolean
    created_at?: boolean
    updated_at?: boolean
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSolution"]>

  export type UserSolutionSelectScalar = {
    id?: boolean
    user_id?: boolean
    exercise_id?: boolean
    code?: boolean
    is_correct?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserSolutionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "exercise_id" | "code" | "is_correct" | "created_at" | "updated_at", ExtArgs["result"]["userSolution"]>
  export type UserSolutionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }
  export type UserSolutionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }
  export type UserSolutionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    exercise?: boolean | ExerciseDefaultArgs<ExtArgs>
  }

  export type $UserSolutionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSolution"
    objects: {
      exercise: Prisma.$ExercisePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      exercise_id: number
      code: string
      is_correct: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["userSolution"]>
    composites: {}
  }

  type UserSolutionGetPayload<S extends boolean | null | undefined | UserSolutionDefaultArgs> = $Result.GetResult<Prisma.$UserSolutionPayload, S>

  type UserSolutionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSolutionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSolutionCountAggregateInputType | true
    }

  export interface UserSolutionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSolution'], meta: { name: 'UserSolution' } }
    /**
     * Find zero or one UserSolution that matches the filter.
     * @param {UserSolutionFindUniqueArgs} args - Arguments to find a UserSolution
     * @example
     * // Get one UserSolution
     * const userSolution = await prisma.userSolution.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSolutionFindUniqueArgs>(args: SelectSubset<T, UserSolutionFindUniqueArgs<ExtArgs>>): Prisma__UserSolutionClient<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSolution that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSolutionFindUniqueOrThrowArgs} args - Arguments to find a UserSolution
     * @example
     * // Get one UserSolution
     * const userSolution = await prisma.userSolution.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSolutionFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSolutionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSolutionClient<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSolution that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSolutionFindFirstArgs} args - Arguments to find a UserSolution
     * @example
     * // Get one UserSolution
     * const userSolution = await prisma.userSolution.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSolutionFindFirstArgs>(args?: SelectSubset<T, UserSolutionFindFirstArgs<ExtArgs>>): Prisma__UserSolutionClient<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSolution that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSolutionFindFirstOrThrowArgs} args - Arguments to find a UserSolution
     * @example
     * // Get one UserSolution
     * const userSolution = await prisma.userSolution.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSolutionFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSolutionFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSolutionClient<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSolutions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSolutionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSolutions
     * const userSolutions = await prisma.userSolution.findMany()
     * 
     * // Get first 10 UserSolutions
     * const userSolutions = await prisma.userSolution.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSolutionWithIdOnly = await prisma.userSolution.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSolutionFindManyArgs>(args?: SelectSubset<T, UserSolutionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSolution.
     * @param {UserSolutionCreateArgs} args - Arguments to create a UserSolution.
     * @example
     * // Create one UserSolution
     * const UserSolution = await prisma.userSolution.create({
     *   data: {
     *     // ... data to create a UserSolution
     *   }
     * })
     * 
     */
    create<T extends UserSolutionCreateArgs>(args: SelectSubset<T, UserSolutionCreateArgs<ExtArgs>>): Prisma__UserSolutionClient<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSolutions.
     * @param {UserSolutionCreateManyArgs} args - Arguments to create many UserSolutions.
     * @example
     * // Create many UserSolutions
     * const userSolution = await prisma.userSolution.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSolutionCreateManyArgs>(args?: SelectSubset<T, UserSolutionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSolutions and returns the data saved in the database.
     * @param {UserSolutionCreateManyAndReturnArgs} args - Arguments to create many UserSolutions.
     * @example
     * // Create many UserSolutions
     * const userSolution = await prisma.userSolution.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSolutions and only return the `id`
     * const userSolutionWithIdOnly = await prisma.userSolution.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSolutionCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSolutionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSolution.
     * @param {UserSolutionDeleteArgs} args - Arguments to delete one UserSolution.
     * @example
     * // Delete one UserSolution
     * const UserSolution = await prisma.userSolution.delete({
     *   where: {
     *     // ... filter to delete one UserSolution
     *   }
     * })
     * 
     */
    delete<T extends UserSolutionDeleteArgs>(args: SelectSubset<T, UserSolutionDeleteArgs<ExtArgs>>): Prisma__UserSolutionClient<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSolution.
     * @param {UserSolutionUpdateArgs} args - Arguments to update one UserSolution.
     * @example
     * // Update one UserSolution
     * const userSolution = await prisma.userSolution.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSolutionUpdateArgs>(args: SelectSubset<T, UserSolutionUpdateArgs<ExtArgs>>): Prisma__UserSolutionClient<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSolutions.
     * @param {UserSolutionDeleteManyArgs} args - Arguments to filter UserSolutions to delete.
     * @example
     * // Delete a few UserSolutions
     * const { count } = await prisma.userSolution.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSolutionDeleteManyArgs>(args?: SelectSubset<T, UserSolutionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSolutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSolutionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSolutions
     * const userSolution = await prisma.userSolution.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSolutionUpdateManyArgs>(args: SelectSubset<T, UserSolutionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSolutions and returns the data updated in the database.
     * @param {UserSolutionUpdateManyAndReturnArgs} args - Arguments to update many UserSolutions.
     * @example
     * // Update many UserSolutions
     * const userSolution = await prisma.userSolution.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSolutions and only return the `id`
     * const userSolutionWithIdOnly = await prisma.userSolution.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSolutionUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSolutionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSolution.
     * @param {UserSolutionUpsertArgs} args - Arguments to update or create a UserSolution.
     * @example
     * // Update or create a UserSolution
     * const userSolution = await prisma.userSolution.upsert({
     *   create: {
     *     // ... data to create a UserSolution
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSolution we want to update
     *   }
     * })
     */
    upsert<T extends UserSolutionUpsertArgs>(args: SelectSubset<T, UserSolutionUpsertArgs<ExtArgs>>): Prisma__UserSolutionClient<$Result.GetResult<Prisma.$UserSolutionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSolutions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSolutionCountArgs} args - Arguments to filter UserSolutions to count.
     * @example
     * // Count the number of UserSolutions
     * const count = await prisma.userSolution.count({
     *   where: {
     *     // ... the filter for the UserSolutions we want to count
     *   }
     * })
    **/
    count<T extends UserSolutionCountArgs>(
      args?: Subset<T, UserSolutionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSolutionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSolution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSolutionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSolutionAggregateArgs>(args: Subset<T, UserSolutionAggregateArgs>): Prisma.PrismaPromise<GetUserSolutionAggregateType<T>>

    /**
     * Group by UserSolution.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSolutionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSolutionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSolutionGroupByArgs['orderBy'] }
        : { orderBy?: UserSolutionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSolutionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSolutionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSolution model
   */
  readonly fields: UserSolutionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSolution.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSolutionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    exercise<T extends ExerciseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExerciseDefaultArgs<ExtArgs>>): Prisma__ExerciseClient<$Result.GetResult<Prisma.$ExercisePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSolution model
   */
  interface UserSolutionFieldRefs {
    readonly id: FieldRef<"UserSolution", 'Int'>
    readonly user_id: FieldRef<"UserSolution", 'Int'>
    readonly exercise_id: FieldRef<"UserSolution", 'Int'>
    readonly code: FieldRef<"UserSolution", 'String'>
    readonly is_correct: FieldRef<"UserSolution", 'Boolean'>
    readonly created_at: FieldRef<"UserSolution", 'DateTime'>
    readonly updated_at: FieldRef<"UserSolution", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSolution findUnique
   */
  export type UserSolutionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionInclude<ExtArgs> | null
    /**
     * Filter, which UserSolution to fetch.
     */
    where: UserSolutionWhereUniqueInput
  }

  /**
   * UserSolution findUniqueOrThrow
   */
  export type UserSolutionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionInclude<ExtArgs> | null
    /**
     * Filter, which UserSolution to fetch.
     */
    where: UserSolutionWhereUniqueInput
  }

  /**
   * UserSolution findFirst
   */
  export type UserSolutionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionInclude<ExtArgs> | null
    /**
     * Filter, which UserSolution to fetch.
     */
    where?: UserSolutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSolutions to fetch.
     */
    orderBy?: UserSolutionOrderByWithRelationInput | UserSolutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSolutions.
     */
    cursor?: UserSolutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSolutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSolutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSolutions.
     */
    distinct?: UserSolutionScalarFieldEnum | UserSolutionScalarFieldEnum[]
  }

  /**
   * UserSolution findFirstOrThrow
   */
  export type UserSolutionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionInclude<ExtArgs> | null
    /**
     * Filter, which UserSolution to fetch.
     */
    where?: UserSolutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSolutions to fetch.
     */
    orderBy?: UserSolutionOrderByWithRelationInput | UserSolutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSolutions.
     */
    cursor?: UserSolutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSolutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSolutions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSolutions.
     */
    distinct?: UserSolutionScalarFieldEnum | UserSolutionScalarFieldEnum[]
  }

  /**
   * UserSolution findMany
   */
  export type UserSolutionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionInclude<ExtArgs> | null
    /**
     * Filter, which UserSolutions to fetch.
     */
    where?: UserSolutionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSolutions to fetch.
     */
    orderBy?: UserSolutionOrderByWithRelationInput | UserSolutionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSolutions.
     */
    cursor?: UserSolutionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSolutions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSolutions.
     */
    skip?: number
    distinct?: UserSolutionScalarFieldEnum | UserSolutionScalarFieldEnum[]
  }

  /**
   * UserSolution create
   */
  export type UserSolutionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSolution.
     */
    data: XOR<UserSolutionCreateInput, UserSolutionUncheckedCreateInput>
  }

  /**
   * UserSolution createMany
   */
  export type UserSolutionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSolutions.
     */
    data: UserSolutionCreateManyInput | UserSolutionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSolution createManyAndReturn
   */
  export type UserSolutionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * The data used to create many UserSolutions.
     */
    data: UserSolutionCreateManyInput | UserSolutionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSolution update
   */
  export type UserSolutionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSolution.
     */
    data: XOR<UserSolutionUpdateInput, UserSolutionUncheckedUpdateInput>
    /**
     * Choose, which UserSolution to update.
     */
    where: UserSolutionWhereUniqueInput
  }

  /**
   * UserSolution updateMany
   */
  export type UserSolutionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSolutions.
     */
    data: XOR<UserSolutionUpdateManyMutationInput, UserSolutionUncheckedUpdateManyInput>
    /**
     * Filter which UserSolutions to update
     */
    where?: UserSolutionWhereInput
    /**
     * Limit how many UserSolutions to update.
     */
    limit?: number
  }

  /**
   * UserSolution updateManyAndReturn
   */
  export type UserSolutionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * The data used to update UserSolutions.
     */
    data: XOR<UserSolutionUpdateManyMutationInput, UserSolutionUncheckedUpdateManyInput>
    /**
     * Filter which UserSolutions to update
     */
    where?: UserSolutionWhereInput
    /**
     * Limit how many UserSolutions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSolution upsert
   */
  export type UserSolutionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSolution to update in case it exists.
     */
    where: UserSolutionWhereUniqueInput
    /**
     * In case the UserSolution found by the `where` argument doesn't exist, create a new UserSolution with this data.
     */
    create: XOR<UserSolutionCreateInput, UserSolutionUncheckedCreateInput>
    /**
     * In case the UserSolution was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSolutionUpdateInput, UserSolutionUncheckedUpdateInput>
  }

  /**
   * UserSolution delete
   */
  export type UserSolutionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionInclude<ExtArgs> | null
    /**
     * Filter which UserSolution to delete.
     */
    where: UserSolutionWhereUniqueInput
  }

  /**
   * UserSolution deleteMany
   */
  export type UserSolutionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSolutions to delete
     */
    where?: UserSolutionWhereInput
    /**
     * Limit how many UserSolutions to delete.
     */
    limit?: number
  }

  /**
   * UserSolution without action
   */
  export type UserSolutionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSolution
     */
    select?: UserSolutionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSolution
     */
    omit?: UserSolutionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSolutionInclude<ExtArgs> | null
  }


  /**
   * Model UserQuizAnswer
   */

  export type AggregateUserQuizAnswer = {
    _count: UserQuizAnswerCountAggregateOutputType | null
    _avg: UserQuizAnswerAvgAggregateOutputType | null
    _sum: UserQuizAnswerSumAggregateOutputType | null
    _min: UserQuizAnswerMinAggregateOutputType | null
    _max: UserQuizAnswerMaxAggregateOutputType | null
  }

  export type UserQuizAnswerAvgAggregateOutputType = {
    id: number | null
    user_id: number | null
    quiz_question_id: number | null
    selected_option: number | null
  }

  export type UserQuizAnswerSumAggregateOutputType = {
    id: number | null
    user_id: number | null
    quiz_question_id: number | null
    selected_option: number | null
  }

  export type UserQuizAnswerMinAggregateOutputType = {
    id: number | null
    user_id: number | null
    quiz_question_id: number | null
    selected_option: number | null
    is_correct: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserQuizAnswerMaxAggregateOutputType = {
    id: number | null
    user_id: number | null
    quiz_question_id: number | null
    selected_option: number | null
    is_correct: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserQuizAnswerCountAggregateOutputType = {
    id: number
    user_id: number
    quiz_question_id: number
    selected_option: number
    is_correct: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserQuizAnswerAvgAggregateInputType = {
    id?: true
    user_id?: true
    quiz_question_id?: true
    selected_option?: true
  }

  export type UserQuizAnswerSumAggregateInputType = {
    id?: true
    user_id?: true
    quiz_question_id?: true
    selected_option?: true
  }

  export type UserQuizAnswerMinAggregateInputType = {
    id?: true
    user_id?: true
    quiz_question_id?: true
    selected_option?: true
    is_correct?: true
    created_at?: true
    updated_at?: true
  }

  export type UserQuizAnswerMaxAggregateInputType = {
    id?: true
    user_id?: true
    quiz_question_id?: true
    selected_option?: true
    is_correct?: true
    created_at?: true
    updated_at?: true
  }

  export type UserQuizAnswerCountAggregateInputType = {
    id?: true
    user_id?: true
    quiz_question_id?: true
    selected_option?: true
    is_correct?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserQuizAnswerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserQuizAnswer to aggregate.
     */
    where?: UserQuizAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuizAnswers to fetch.
     */
    orderBy?: UserQuizAnswerOrderByWithRelationInput | UserQuizAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserQuizAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuizAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuizAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserQuizAnswers
    **/
    _count?: true | UserQuizAnswerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserQuizAnswerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserQuizAnswerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserQuizAnswerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserQuizAnswerMaxAggregateInputType
  }

  export type GetUserQuizAnswerAggregateType<T extends UserQuizAnswerAggregateArgs> = {
        [P in keyof T & keyof AggregateUserQuizAnswer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserQuizAnswer[P]>
      : GetScalarType<T[P], AggregateUserQuizAnswer[P]>
  }




  export type UserQuizAnswerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserQuizAnswerWhereInput
    orderBy?: UserQuizAnswerOrderByWithAggregationInput | UserQuizAnswerOrderByWithAggregationInput[]
    by: UserQuizAnswerScalarFieldEnum[] | UserQuizAnswerScalarFieldEnum
    having?: UserQuizAnswerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserQuizAnswerCountAggregateInputType | true
    _avg?: UserQuizAnswerAvgAggregateInputType
    _sum?: UserQuizAnswerSumAggregateInputType
    _min?: UserQuizAnswerMinAggregateInputType
    _max?: UserQuizAnswerMaxAggregateInputType
  }

  export type UserQuizAnswerGroupByOutputType = {
    id: number
    user_id: number
    quiz_question_id: number
    selected_option: number
    is_correct: boolean
    created_at: Date
    updated_at: Date
    _count: UserQuizAnswerCountAggregateOutputType | null
    _avg: UserQuizAnswerAvgAggregateOutputType | null
    _sum: UserQuizAnswerSumAggregateOutputType | null
    _min: UserQuizAnswerMinAggregateOutputType | null
    _max: UserQuizAnswerMaxAggregateOutputType | null
  }

  type GetUserQuizAnswerGroupByPayload<T extends UserQuizAnswerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserQuizAnswerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserQuizAnswerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserQuizAnswerGroupByOutputType[P]>
            : GetScalarType<T[P], UserQuizAnswerGroupByOutputType[P]>
        }
      >
    >


  export type UserQuizAnswerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    quiz_question_id?: boolean
    selected_option?: boolean
    is_correct?: boolean
    created_at?: boolean
    updated_at?: boolean
    quiz_question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userQuizAnswer"]>

  export type UserQuizAnswerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    quiz_question_id?: boolean
    selected_option?: boolean
    is_correct?: boolean
    created_at?: boolean
    updated_at?: boolean
    quiz_question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userQuizAnswer"]>

  export type UserQuizAnswerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    quiz_question_id?: boolean
    selected_option?: boolean
    is_correct?: boolean
    created_at?: boolean
    updated_at?: boolean
    quiz_question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userQuizAnswer"]>

  export type UserQuizAnswerSelectScalar = {
    id?: boolean
    user_id?: boolean
    quiz_question_id?: boolean
    selected_option?: boolean
    is_correct?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserQuizAnswerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "quiz_question_id" | "selected_option" | "is_correct" | "created_at" | "updated_at", ExtArgs["result"]["userQuizAnswer"]>
  export type UserQuizAnswerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz_question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }
  export type UserQuizAnswerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz_question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }
  export type UserQuizAnswerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    quiz_question?: boolean | QuizQuestionDefaultArgs<ExtArgs>
  }

  export type $UserQuizAnswerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserQuizAnswer"
    objects: {
      quiz_question: Prisma.$QuizQuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user_id: number
      quiz_question_id: number
      selected_option: number
      is_correct: boolean
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["userQuizAnswer"]>
    composites: {}
  }

  type UserQuizAnswerGetPayload<S extends boolean | null | undefined | UserQuizAnswerDefaultArgs> = $Result.GetResult<Prisma.$UserQuizAnswerPayload, S>

  type UserQuizAnswerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserQuizAnswerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserQuizAnswerCountAggregateInputType | true
    }

  export interface UserQuizAnswerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserQuizAnswer'], meta: { name: 'UserQuizAnswer' } }
    /**
     * Find zero or one UserQuizAnswer that matches the filter.
     * @param {UserQuizAnswerFindUniqueArgs} args - Arguments to find a UserQuizAnswer
     * @example
     * // Get one UserQuizAnswer
     * const userQuizAnswer = await prisma.userQuizAnswer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserQuizAnswerFindUniqueArgs>(args: SelectSubset<T, UserQuizAnswerFindUniqueArgs<ExtArgs>>): Prisma__UserQuizAnswerClient<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserQuizAnswer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserQuizAnswerFindUniqueOrThrowArgs} args - Arguments to find a UserQuizAnswer
     * @example
     * // Get one UserQuizAnswer
     * const userQuizAnswer = await prisma.userQuizAnswer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserQuizAnswerFindUniqueOrThrowArgs>(args: SelectSubset<T, UserQuizAnswerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserQuizAnswerClient<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserQuizAnswer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuizAnswerFindFirstArgs} args - Arguments to find a UserQuizAnswer
     * @example
     * // Get one UserQuizAnswer
     * const userQuizAnswer = await prisma.userQuizAnswer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserQuizAnswerFindFirstArgs>(args?: SelectSubset<T, UserQuizAnswerFindFirstArgs<ExtArgs>>): Prisma__UserQuizAnswerClient<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserQuizAnswer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuizAnswerFindFirstOrThrowArgs} args - Arguments to find a UserQuizAnswer
     * @example
     * // Get one UserQuizAnswer
     * const userQuizAnswer = await prisma.userQuizAnswer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserQuizAnswerFindFirstOrThrowArgs>(args?: SelectSubset<T, UserQuizAnswerFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserQuizAnswerClient<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserQuizAnswers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuizAnswerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserQuizAnswers
     * const userQuizAnswers = await prisma.userQuizAnswer.findMany()
     * 
     * // Get first 10 UserQuizAnswers
     * const userQuizAnswers = await prisma.userQuizAnswer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userQuizAnswerWithIdOnly = await prisma.userQuizAnswer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserQuizAnswerFindManyArgs>(args?: SelectSubset<T, UserQuizAnswerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserQuizAnswer.
     * @param {UserQuizAnswerCreateArgs} args - Arguments to create a UserQuizAnswer.
     * @example
     * // Create one UserQuizAnswer
     * const UserQuizAnswer = await prisma.userQuizAnswer.create({
     *   data: {
     *     // ... data to create a UserQuizAnswer
     *   }
     * })
     * 
     */
    create<T extends UserQuizAnswerCreateArgs>(args: SelectSubset<T, UserQuizAnswerCreateArgs<ExtArgs>>): Prisma__UserQuizAnswerClient<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserQuizAnswers.
     * @param {UserQuizAnswerCreateManyArgs} args - Arguments to create many UserQuizAnswers.
     * @example
     * // Create many UserQuizAnswers
     * const userQuizAnswer = await prisma.userQuizAnswer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserQuizAnswerCreateManyArgs>(args?: SelectSubset<T, UserQuizAnswerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserQuizAnswers and returns the data saved in the database.
     * @param {UserQuizAnswerCreateManyAndReturnArgs} args - Arguments to create many UserQuizAnswers.
     * @example
     * // Create many UserQuizAnswers
     * const userQuizAnswer = await prisma.userQuizAnswer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserQuizAnswers and only return the `id`
     * const userQuizAnswerWithIdOnly = await prisma.userQuizAnswer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserQuizAnswerCreateManyAndReturnArgs>(args?: SelectSubset<T, UserQuizAnswerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserQuizAnswer.
     * @param {UserQuizAnswerDeleteArgs} args - Arguments to delete one UserQuizAnswer.
     * @example
     * // Delete one UserQuizAnswer
     * const UserQuizAnswer = await prisma.userQuizAnswer.delete({
     *   where: {
     *     // ... filter to delete one UserQuizAnswer
     *   }
     * })
     * 
     */
    delete<T extends UserQuizAnswerDeleteArgs>(args: SelectSubset<T, UserQuizAnswerDeleteArgs<ExtArgs>>): Prisma__UserQuizAnswerClient<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserQuizAnswer.
     * @param {UserQuizAnswerUpdateArgs} args - Arguments to update one UserQuizAnswer.
     * @example
     * // Update one UserQuizAnswer
     * const userQuizAnswer = await prisma.userQuizAnswer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserQuizAnswerUpdateArgs>(args: SelectSubset<T, UserQuizAnswerUpdateArgs<ExtArgs>>): Prisma__UserQuizAnswerClient<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserQuizAnswers.
     * @param {UserQuizAnswerDeleteManyArgs} args - Arguments to filter UserQuizAnswers to delete.
     * @example
     * // Delete a few UserQuizAnswers
     * const { count } = await prisma.userQuizAnswer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserQuizAnswerDeleteManyArgs>(args?: SelectSubset<T, UserQuizAnswerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserQuizAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuizAnswerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserQuizAnswers
     * const userQuizAnswer = await prisma.userQuizAnswer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserQuizAnswerUpdateManyArgs>(args: SelectSubset<T, UserQuizAnswerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserQuizAnswers and returns the data updated in the database.
     * @param {UserQuizAnswerUpdateManyAndReturnArgs} args - Arguments to update many UserQuizAnswers.
     * @example
     * // Update many UserQuizAnswers
     * const userQuizAnswer = await prisma.userQuizAnswer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserQuizAnswers and only return the `id`
     * const userQuizAnswerWithIdOnly = await prisma.userQuizAnswer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserQuizAnswerUpdateManyAndReturnArgs>(args: SelectSubset<T, UserQuizAnswerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserQuizAnswer.
     * @param {UserQuizAnswerUpsertArgs} args - Arguments to update or create a UserQuizAnswer.
     * @example
     * // Update or create a UserQuizAnswer
     * const userQuizAnswer = await prisma.userQuizAnswer.upsert({
     *   create: {
     *     // ... data to create a UserQuizAnswer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserQuizAnswer we want to update
     *   }
     * })
     */
    upsert<T extends UserQuizAnswerUpsertArgs>(args: SelectSubset<T, UserQuizAnswerUpsertArgs<ExtArgs>>): Prisma__UserQuizAnswerClient<$Result.GetResult<Prisma.$UserQuizAnswerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserQuizAnswers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuizAnswerCountArgs} args - Arguments to filter UserQuizAnswers to count.
     * @example
     * // Count the number of UserQuizAnswers
     * const count = await prisma.userQuizAnswer.count({
     *   where: {
     *     // ... the filter for the UserQuizAnswers we want to count
     *   }
     * })
    **/
    count<T extends UserQuizAnswerCountArgs>(
      args?: Subset<T, UserQuizAnswerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserQuizAnswerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserQuizAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuizAnswerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserQuizAnswerAggregateArgs>(args: Subset<T, UserQuizAnswerAggregateArgs>): Prisma.PrismaPromise<GetUserQuizAnswerAggregateType<T>>

    /**
     * Group by UserQuizAnswer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserQuizAnswerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserQuizAnswerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserQuizAnswerGroupByArgs['orderBy'] }
        : { orderBy?: UserQuizAnswerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserQuizAnswerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserQuizAnswerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserQuizAnswer model
   */
  readonly fields: UserQuizAnswerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserQuizAnswer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserQuizAnswerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    quiz_question<T extends QuizQuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuizQuestionDefaultArgs<ExtArgs>>): Prisma__QuizQuestionClient<$Result.GetResult<Prisma.$QuizQuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserQuizAnswer model
   */
  interface UserQuizAnswerFieldRefs {
    readonly id: FieldRef<"UserQuizAnswer", 'Int'>
    readonly user_id: FieldRef<"UserQuizAnswer", 'Int'>
    readonly quiz_question_id: FieldRef<"UserQuizAnswer", 'Int'>
    readonly selected_option: FieldRef<"UserQuizAnswer", 'Int'>
    readonly is_correct: FieldRef<"UserQuizAnswer", 'Boolean'>
    readonly created_at: FieldRef<"UserQuizAnswer", 'DateTime'>
    readonly updated_at: FieldRef<"UserQuizAnswer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserQuizAnswer findUnique
   */
  export type UserQuizAnswerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserQuizAnswer to fetch.
     */
    where: UserQuizAnswerWhereUniqueInput
  }

  /**
   * UserQuizAnswer findUniqueOrThrow
   */
  export type UserQuizAnswerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserQuizAnswer to fetch.
     */
    where: UserQuizAnswerWhereUniqueInput
  }

  /**
   * UserQuizAnswer findFirst
   */
  export type UserQuizAnswerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserQuizAnswer to fetch.
     */
    where?: UserQuizAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuizAnswers to fetch.
     */
    orderBy?: UserQuizAnswerOrderByWithRelationInput | UserQuizAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserQuizAnswers.
     */
    cursor?: UserQuizAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuizAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuizAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserQuizAnswers.
     */
    distinct?: UserQuizAnswerScalarFieldEnum | UserQuizAnswerScalarFieldEnum[]
  }

  /**
   * UserQuizAnswer findFirstOrThrow
   */
  export type UserQuizAnswerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserQuizAnswer to fetch.
     */
    where?: UserQuizAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuizAnswers to fetch.
     */
    orderBy?: UserQuizAnswerOrderByWithRelationInput | UserQuizAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserQuizAnswers.
     */
    cursor?: UserQuizAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuizAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuizAnswers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserQuizAnswers.
     */
    distinct?: UserQuizAnswerScalarFieldEnum | UserQuizAnswerScalarFieldEnum[]
  }

  /**
   * UserQuizAnswer findMany
   */
  export type UserQuizAnswerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerInclude<ExtArgs> | null
    /**
     * Filter, which UserQuizAnswers to fetch.
     */
    where?: UserQuizAnswerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserQuizAnswers to fetch.
     */
    orderBy?: UserQuizAnswerOrderByWithRelationInput | UserQuizAnswerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserQuizAnswers.
     */
    cursor?: UserQuizAnswerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserQuizAnswers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserQuizAnswers.
     */
    skip?: number
    distinct?: UserQuizAnswerScalarFieldEnum | UserQuizAnswerScalarFieldEnum[]
  }

  /**
   * UserQuizAnswer create
   */
  export type UserQuizAnswerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerInclude<ExtArgs> | null
    /**
     * The data needed to create a UserQuizAnswer.
     */
    data: XOR<UserQuizAnswerCreateInput, UserQuizAnswerUncheckedCreateInput>
  }

  /**
   * UserQuizAnswer createMany
   */
  export type UserQuizAnswerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserQuizAnswers.
     */
    data: UserQuizAnswerCreateManyInput | UserQuizAnswerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserQuizAnswer createManyAndReturn
   */
  export type UserQuizAnswerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * The data used to create many UserQuizAnswers.
     */
    data: UserQuizAnswerCreateManyInput | UserQuizAnswerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserQuizAnswer update
   */
  export type UserQuizAnswerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerInclude<ExtArgs> | null
    /**
     * The data needed to update a UserQuizAnswer.
     */
    data: XOR<UserQuizAnswerUpdateInput, UserQuizAnswerUncheckedUpdateInput>
    /**
     * Choose, which UserQuizAnswer to update.
     */
    where: UserQuizAnswerWhereUniqueInput
  }

  /**
   * UserQuizAnswer updateMany
   */
  export type UserQuizAnswerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserQuizAnswers.
     */
    data: XOR<UserQuizAnswerUpdateManyMutationInput, UserQuizAnswerUncheckedUpdateManyInput>
    /**
     * Filter which UserQuizAnswers to update
     */
    where?: UserQuizAnswerWhereInput
    /**
     * Limit how many UserQuizAnswers to update.
     */
    limit?: number
  }

  /**
   * UserQuizAnswer updateManyAndReturn
   */
  export type UserQuizAnswerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * The data used to update UserQuizAnswers.
     */
    data: XOR<UserQuizAnswerUpdateManyMutationInput, UserQuizAnswerUncheckedUpdateManyInput>
    /**
     * Filter which UserQuizAnswers to update
     */
    where?: UserQuizAnswerWhereInput
    /**
     * Limit how many UserQuizAnswers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserQuizAnswer upsert
   */
  export type UserQuizAnswerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerInclude<ExtArgs> | null
    /**
     * The filter to search for the UserQuizAnswer to update in case it exists.
     */
    where: UserQuizAnswerWhereUniqueInput
    /**
     * In case the UserQuizAnswer found by the `where` argument doesn't exist, create a new UserQuizAnswer with this data.
     */
    create: XOR<UserQuizAnswerCreateInput, UserQuizAnswerUncheckedCreateInput>
    /**
     * In case the UserQuizAnswer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserQuizAnswerUpdateInput, UserQuizAnswerUncheckedUpdateInput>
  }

  /**
   * UserQuizAnswer delete
   */
  export type UserQuizAnswerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerInclude<ExtArgs> | null
    /**
     * Filter which UserQuizAnswer to delete.
     */
    where: UserQuizAnswerWhereUniqueInput
  }

  /**
   * UserQuizAnswer deleteMany
   */
  export type UserQuizAnswerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserQuizAnswers to delete
     */
    where?: UserQuizAnswerWhereInput
    /**
     * Limit how many UserQuizAnswers to delete.
     */
    limit?: number
  }

  /**
   * UserQuizAnswer without action
   */
  export type UserQuizAnswerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserQuizAnswer
     */
    select?: UserQuizAnswerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserQuizAnswer
     */
    omit?: UserQuizAnswerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserQuizAnswerInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password_hash: 'password_hash',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    user_id: 'user_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const ConceptExplanationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    summary: 'summary',
    related_concepts: 'related_concepts',
    prerequisites: 'prerequisites',
    difficulty: 'difficulty',
    visual_aids: 'visual_aids',
    category: 'category',
    tags: 'tags',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ConceptExplanationScalarFieldEnum = (typeof ConceptExplanationScalarFieldEnum)[keyof typeof ConceptExplanationScalarFieldEnum]


  export const TutorialScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    summary: 'summary',
    learning_objectives: 'learning_objectives',
    prerequisites: 'prerequisites',
    estimated_time: 'estimated_time',
    difficulty: 'difficulty',
    category: 'category',
    tags: 'tags',
    completion_certificate: 'completion_certificate',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TutorialScalarFieldEnum = (typeof TutorialScalarFieldEnum)[keyof typeof TutorialScalarFieldEnum]


  export const TutorialStepScalarFieldEnum: {
    id: 'id',
    tutorial_id: 'tutorial_id',
    title: 'title',
    content: 'content',
    code: 'code',
    visual_aids: 'visual_aids',
    estimated_time: 'estimated_time',
    checkpoint: 'checkpoint',
    order: 'order',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TutorialStepScalarFieldEnum = (typeof TutorialStepScalarFieldEnum)[keyof typeof TutorialStepScalarFieldEnum]


  export const ExerciseScalarFieldEnum: {
    id: 'id',
    tutorial_id: 'tutorial_id',
    title: 'title',
    description: 'description',
    instructions: 'instructions',
    starter_code: 'starter_code',
    solution_code: 'solution_code',
    validation_tests: 'validation_tests',
    hints: 'hints',
    difficulty: 'difficulty',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ExerciseScalarFieldEnum = (typeof ExerciseScalarFieldEnum)[keyof typeof ExerciseScalarFieldEnum]


  export const QuizQuestionScalarFieldEnum: {
    id: 'id',
    tutorial_id: 'tutorial_id',
    question: 'question',
    options: 'options',
    correct_answer: 'correct_answer',
    explanation: 'explanation',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type QuizQuestionScalarFieldEnum = (typeof QuizQuestionScalarFieldEnum)[keyof typeof QuizQuestionScalarFieldEnum]


  export const LearningPathScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    difficulty: 'difficulty',
    estimated_time: 'estimated_time',
    prerequisites: 'prerequisites',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type LearningPathScalarFieldEnum = (typeof LearningPathScalarFieldEnum)[keyof typeof LearningPathScalarFieldEnum]


  export const LearningPathItemScalarFieldEnum: {
    id: 'id',
    learning_path_id: 'learning_path_id',
    item_type: 'item_type',
    item_id: 'item_id',
    order: 'order',
    required: 'required',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type LearningPathItemScalarFieldEnum = (typeof LearningPathItemScalarFieldEnum)[keyof typeof LearningPathItemScalarFieldEnum]


  export const UserProgressScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    content_type: 'content_type',
    content_id: 'content_id',
    progress_percentage: 'progress_percentage',
    completed: 'completed',
    last_accessed: 'last_accessed',
    created_at: 'created_at',
    updated_at: 'updated_at',
    concept_id: 'concept_id',
    tutorial_id: 'tutorial_id'
  };

  export type UserProgressScalarFieldEnum = (typeof UserProgressScalarFieldEnum)[keyof typeof UserProgressScalarFieldEnum]


  export const LearningPathProgressScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    learning_path_id: 'learning_path_id',
    progress_percentage: 'progress_percentage',
    completed: 'completed',
    last_accessed: 'last_accessed',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type LearningPathProgressScalarFieldEnum = (typeof LearningPathProgressScalarFieldEnum)[keyof typeof LearningPathProgressScalarFieldEnum]


  export const UserSolutionScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    exercise_id: 'exercise_id',
    code: 'code',
    is_correct: 'is_correct',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserSolutionScalarFieldEnum = (typeof UserSolutionScalarFieldEnum)[keyof typeof UserSolutionScalarFieldEnum]


  export const UserQuizAnswerScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    quiz_question_id: 'quiz_question_id',
    selected_option: 'selected_option',
    is_correct: 'is_correct',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserQuizAnswerScalarFieldEnum = (typeof UserQuizAnswerScalarFieldEnum)[keyof typeof UserQuizAnswerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
    user_progress?: UserProgressListRelationFilter
    learning_paths_progress?: LearningPathProgressListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    projects?: ProjectOrderByRelationAggregateInput
    user_progress?: UserProgressOrderByRelationAggregateInput
    learning_paths_progress?: LearningPathProgressOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password_hash?: StringFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    projects?: ProjectListRelationFilter
    user_progress?: UserProgressListRelationFilter
    learning_paths_progress?: LearningPathProgressListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    password_hash?: StringWithAggregatesFilter<"User"> | string
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: IntFilter<"Project"> | number
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    user_id?: IntFilter<"Project"> | number
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    user_id?: IntFilter<"Project"> | number
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Project"> | number
    name?: StringWithAggregatesFilter<"Project"> | string
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    user_id?: IntWithAggregatesFilter<"Project"> | number
    created_at?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ConceptExplanationWhereInput = {
    AND?: ConceptExplanationWhereInput | ConceptExplanationWhereInput[]
    OR?: ConceptExplanationWhereInput[]
    NOT?: ConceptExplanationWhereInput | ConceptExplanationWhereInput[]
    id?: IntFilter<"ConceptExplanation"> | number
    title?: StringFilter<"ConceptExplanation"> | string
    content?: StringFilter<"ConceptExplanation"> | string
    summary?: StringFilter<"ConceptExplanation"> | string
    related_concepts?: StringNullableListFilter<"ConceptExplanation">
    prerequisites?: StringNullableListFilter<"ConceptExplanation">
    difficulty?: StringFilter<"ConceptExplanation"> | string
    visual_aids?: JsonFilter<"ConceptExplanation">
    category?: StringFilter<"ConceptExplanation"> | string
    tags?: StringNullableListFilter<"ConceptExplanation">
    created_at?: DateTimeFilter<"ConceptExplanation"> | Date | string
    updated_at?: DateTimeFilter<"ConceptExplanation"> | Date | string
    user_progress?: UserProgressListRelationFilter
  }

  export type ConceptExplanationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    summary?: SortOrder
    related_concepts?: SortOrder
    prerequisites?: SortOrder
    difficulty?: SortOrder
    visual_aids?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_progress?: UserProgressOrderByRelationAggregateInput
  }

  export type ConceptExplanationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ConceptExplanationWhereInput | ConceptExplanationWhereInput[]
    OR?: ConceptExplanationWhereInput[]
    NOT?: ConceptExplanationWhereInput | ConceptExplanationWhereInput[]
    title?: StringFilter<"ConceptExplanation"> | string
    content?: StringFilter<"ConceptExplanation"> | string
    summary?: StringFilter<"ConceptExplanation"> | string
    related_concepts?: StringNullableListFilter<"ConceptExplanation">
    prerequisites?: StringNullableListFilter<"ConceptExplanation">
    difficulty?: StringFilter<"ConceptExplanation"> | string
    visual_aids?: JsonFilter<"ConceptExplanation">
    category?: StringFilter<"ConceptExplanation"> | string
    tags?: StringNullableListFilter<"ConceptExplanation">
    created_at?: DateTimeFilter<"ConceptExplanation"> | Date | string
    updated_at?: DateTimeFilter<"ConceptExplanation"> | Date | string
    user_progress?: UserProgressListRelationFilter
  }, "id">

  export type ConceptExplanationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    summary?: SortOrder
    related_concepts?: SortOrder
    prerequisites?: SortOrder
    difficulty?: SortOrder
    visual_aids?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ConceptExplanationCountOrderByAggregateInput
    _avg?: ConceptExplanationAvgOrderByAggregateInput
    _max?: ConceptExplanationMaxOrderByAggregateInput
    _min?: ConceptExplanationMinOrderByAggregateInput
    _sum?: ConceptExplanationSumOrderByAggregateInput
  }

  export type ConceptExplanationScalarWhereWithAggregatesInput = {
    AND?: ConceptExplanationScalarWhereWithAggregatesInput | ConceptExplanationScalarWhereWithAggregatesInput[]
    OR?: ConceptExplanationScalarWhereWithAggregatesInput[]
    NOT?: ConceptExplanationScalarWhereWithAggregatesInput | ConceptExplanationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ConceptExplanation"> | number
    title?: StringWithAggregatesFilter<"ConceptExplanation"> | string
    content?: StringWithAggregatesFilter<"ConceptExplanation"> | string
    summary?: StringWithAggregatesFilter<"ConceptExplanation"> | string
    related_concepts?: StringNullableListFilter<"ConceptExplanation">
    prerequisites?: StringNullableListFilter<"ConceptExplanation">
    difficulty?: StringWithAggregatesFilter<"ConceptExplanation"> | string
    visual_aids?: JsonWithAggregatesFilter<"ConceptExplanation">
    category?: StringWithAggregatesFilter<"ConceptExplanation"> | string
    tags?: StringNullableListFilter<"ConceptExplanation">
    created_at?: DateTimeWithAggregatesFilter<"ConceptExplanation"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ConceptExplanation"> | Date | string
  }

  export type TutorialWhereInput = {
    AND?: TutorialWhereInput | TutorialWhereInput[]
    OR?: TutorialWhereInput[]
    NOT?: TutorialWhereInput | TutorialWhereInput[]
    id?: IntFilter<"Tutorial"> | number
    title?: StringFilter<"Tutorial"> | string
    description?: StringFilter<"Tutorial"> | string
    summary?: StringFilter<"Tutorial"> | string
    learning_objectives?: StringNullableListFilter<"Tutorial">
    prerequisites?: StringNullableListFilter<"Tutorial">
    estimated_time?: IntFilter<"Tutorial"> | number
    difficulty?: StringFilter<"Tutorial"> | string
    category?: StringFilter<"Tutorial"> | string
    tags?: StringNullableListFilter<"Tutorial">
    completion_certificate?: BoolFilter<"Tutorial"> | boolean
    created_at?: DateTimeFilter<"Tutorial"> | Date | string
    updated_at?: DateTimeFilter<"Tutorial"> | Date | string
    steps?: TutorialStepListRelationFilter
    exercises?: ExerciseListRelationFilter
    quiz_questions?: QuizQuestionListRelationFilter
    user_progress?: UserProgressListRelationFilter
  }

  export type TutorialOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    summary?: SortOrder
    learning_objectives?: SortOrder
    prerequisites?: SortOrder
    estimated_time?: SortOrder
    difficulty?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    completion_certificate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    steps?: TutorialStepOrderByRelationAggregateInput
    exercises?: ExerciseOrderByRelationAggregateInput
    quiz_questions?: QuizQuestionOrderByRelationAggregateInput
    user_progress?: UserProgressOrderByRelationAggregateInput
  }

  export type TutorialWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TutorialWhereInput | TutorialWhereInput[]
    OR?: TutorialWhereInput[]
    NOT?: TutorialWhereInput | TutorialWhereInput[]
    title?: StringFilter<"Tutorial"> | string
    description?: StringFilter<"Tutorial"> | string
    summary?: StringFilter<"Tutorial"> | string
    learning_objectives?: StringNullableListFilter<"Tutorial">
    prerequisites?: StringNullableListFilter<"Tutorial">
    estimated_time?: IntFilter<"Tutorial"> | number
    difficulty?: StringFilter<"Tutorial"> | string
    category?: StringFilter<"Tutorial"> | string
    tags?: StringNullableListFilter<"Tutorial">
    completion_certificate?: BoolFilter<"Tutorial"> | boolean
    created_at?: DateTimeFilter<"Tutorial"> | Date | string
    updated_at?: DateTimeFilter<"Tutorial"> | Date | string
    steps?: TutorialStepListRelationFilter
    exercises?: ExerciseListRelationFilter
    quiz_questions?: QuizQuestionListRelationFilter
    user_progress?: UserProgressListRelationFilter
  }, "id">

  export type TutorialOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    summary?: SortOrder
    learning_objectives?: SortOrder
    prerequisites?: SortOrder
    estimated_time?: SortOrder
    difficulty?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    completion_certificate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TutorialCountOrderByAggregateInput
    _avg?: TutorialAvgOrderByAggregateInput
    _max?: TutorialMaxOrderByAggregateInput
    _min?: TutorialMinOrderByAggregateInput
    _sum?: TutorialSumOrderByAggregateInput
  }

  export type TutorialScalarWhereWithAggregatesInput = {
    AND?: TutorialScalarWhereWithAggregatesInput | TutorialScalarWhereWithAggregatesInput[]
    OR?: TutorialScalarWhereWithAggregatesInput[]
    NOT?: TutorialScalarWhereWithAggregatesInput | TutorialScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tutorial"> | number
    title?: StringWithAggregatesFilter<"Tutorial"> | string
    description?: StringWithAggregatesFilter<"Tutorial"> | string
    summary?: StringWithAggregatesFilter<"Tutorial"> | string
    learning_objectives?: StringNullableListFilter<"Tutorial">
    prerequisites?: StringNullableListFilter<"Tutorial">
    estimated_time?: IntWithAggregatesFilter<"Tutorial"> | number
    difficulty?: StringWithAggregatesFilter<"Tutorial"> | string
    category?: StringWithAggregatesFilter<"Tutorial"> | string
    tags?: StringNullableListFilter<"Tutorial">
    completion_certificate?: BoolWithAggregatesFilter<"Tutorial"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"Tutorial"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Tutorial"> | Date | string
  }

  export type TutorialStepWhereInput = {
    AND?: TutorialStepWhereInput | TutorialStepWhereInput[]
    OR?: TutorialStepWhereInput[]
    NOT?: TutorialStepWhereInput | TutorialStepWhereInput[]
    id?: IntFilter<"TutorialStep"> | number
    tutorial_id?: IntFilter<"TutorialStep"> | number
    title?: StringFilter<"TutorialStep"> | string
    content?: StringFilter<"TutorialStep"> | string
    code?: StringNullableFilter<"TutorialStep"> | string | null
    visual_aids?: JsonNullableFilter<"TutorialStep">
    estimated_time?: IntNullableFilter<"TutorialStep"> | number | null
    checkpoint?: BoolNullableFilter<"TutorialStep"> | boolean | null
    order?: IntFilter<"TutorialStep"> | number
    created_at?: DateTimeFilter<"TutorialStep"> | Date | string
    updated_at?: DateTimeFilter<"TutorialStep"> | Date | string
    tutorial?: XOR<TutorialScalarRelationFilter, TutorialWhereInput>
  }

  export type TutorialStepOrderByWithRelationInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    code?: SortOrderInput | SortOrder
    visual_aids?: SortOrderInput | SortOrder
    estimated_time?: SortOrderInput | SortOrder
    checkpoint?: SortOrderInput | SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tutorial?: TutorialOrderByWithRelationInput
  }

  export type TutorialStepWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TutorialStepWhereInput | TutorialStepWhereInput[]
    OR?: TutorialStepWhereInput[]
    NOT?: TutorialStepWhereInput | TutorialStepWhereInput[]
    tutorial_id?: IntFilter<"TutorialStep"> | number
    title?: StringFilter<"TutorialStep"> | string
    content?: StringFilter<"TutorialStep"> | string
    code?: StringNullableFilter<"TutorialStep"> | string | null
    visual_aids?: JsonNullableFilter<"TutorialStep">
    estimated_time?: IntNullableFilter<"TutorialStep"> | number | null
    checkpoint?: BoolNullableFilter<"TutorialStep"> | boolean | null
    order?: IntFilter<"TutorialStep"> | number
    created_at?: DateTimeFilter<"TutorialStep"> | Date | string
    updated_at?: DateTimeFilter<"TutorialStep"> | Date | string
    tutorial?: XOR<TutorialScalarRelationFilter, TutorialWhereInput>
  }, "id">

  export type TutorialStepOrderByWithAggregationInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    code?: SortOrderInput | SortOrder
    visual_aids?: SortOrderInput | SortOrder
    estimated_time?: SortOrderInput | SortOrder
    checkpoint?: SortOrderInput | SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TutorialStepCountOrderByAggregateInput
    _avg?: TutorialStepAvgOrderByAggregateInput
    _max?: TutorialStepMaxOrderByAggregateInput
    _min?: TutorialStepMinOrderByAggregateInput
    _sum?: TutorialStepSumOrderByAggregateInput
  }

  export type TutorialStepScalarWhereWithAggregatesInput = {
    AND?: TutorialStepScalarWhereWithAggregatesInput | TutorialStepScalarWhereWithAggregatesInput[]
    OR?: TutorialStepScalarWhereWithAggregatesInput[]
    NOT?: TutorialStepScalarWhereWithAggregatesInput | TutorialStepScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TutorialStep"> | number
    tutorial_id?: IntWithAggregatesFilter<"TutorialStep"> | number
    title?: StringWithAggregatesFilter<"TutorialStep"> | string
    content?: StringWithAggregatesFilter<"TutorialStep"> | string
    code?: StringNullableWithAggregatesFilter<"TutorialStep"> | string | null
    visual_aids?: JsonNullableWithAggregatesFilter<"TutorialStep">
    estimated_time?: IntNullableWithAggregatesFilter<"TutorialStep"> | number | null
    checkpoint?: BoolNullableWithAggregatesFilter<"TutorialStep"> | boolean | null
    order?: IntWithAggregatesFilter<"TutorialStep"> | number
    created_at?: DateTimeWithAggregatesFilter<"TutorialStep"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"TutorialStep"> | Date | string
  }

  export type ExerciseWhereInput = {
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    id?: IntFilter<"Exercise"> | number
    tutorial_id?: IntFilter<"Exercise"> | number
    title?: StringFilter<"Exercise"> | string
    description?: StringFilter<"Exercise"> | string
    instructions?: StringFilter<"Exercise"> | string
    starter_code?: StringNullableFilter<"Exercise"> | string | null
    solution_code?: StringFilter<"Exercise"> | string
    validation_tests?: StringFilter<"Exercise"> | string
    hints?: StringNullableListFilter<"Exercise">
    difficulty?: StringFilter<"Exercise"> | string
    created_at?: DateTimeFilter<"Exercise"> | Date | string
    updated_at?: DateTimeFilter<"Exercise"> | Date | string
    tutorial?: XOR<TutorialScalarRelationFilter, TutorialWhereInput>
    user_solutions?: UserSolutionListRelationFilter
  }

  export type ExerciseOrderByWithRelationInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    starter_code?: SortOrderInput | SortOrder
    solution_code?: SortOrder
    validation_tests?: SortOrder
    hints?: SortOrder
    difficulty?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tutorial?: TutorialOrderByWithRelationInput
    user_solutions?: UserSolutionOrderByRelationAggregateInput
  }

  export type ExerciseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ExerciseWhereInput | ExerciseWhereInput[]
    OR?: ExerciseWhereInput[]
    NOT?: ExerciseWhereInput | ExerciseWhereInput[]
    tutorial_id?: IntFilter<"Exercise"> | number
    title?: StringFilter<"Exercise"> | string
    description?: StringFilter<"Exercise"> | string
    instructions?: StringFilter<"Exercise"> | string
    starter_code?: StringNullableFilter<"Exercise"> | string | null
    solution_code?: StringFilter<"Exercise"> | string
    validation_tests?: StringFilter<"Exercise"> | string
    hints?: StringNullableListFilter<"Exercise">
    difficulty?: StringFilter<"Exercise"> | string
    created_at?: DateTimeFilter<"Exercise"> | Date | string
    updated_at?: DateTimeFilter<"Exercise"> | Date | string
    tutorial?: XOR<TutorialScalarRelationFilter, TutorialWhereInput>
    user_solutions?: UserSolutionListRelationFilter
  }, "id">

  export type ExerciseOrderByWithAggregationInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    starter_code?: SortOrderInput | SortOrder
    solution_code?: SortOrder
    validation_tests?: SortOrder
    hints?: SortOrder
    difficulty?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ExerciseCountOrderByAggregateInput
    _avg?: ExerciseAvgOrderByAggregateInput
    _max?: ExerciseMaxOrderByAggregateInput
    _min?: ExerciseMinOrderByAggregateInput
    _sum?: ExerciseSumOrderByAggregateInput
  }

  export type ExerciseScalarWhereWithAggregatesInput = {
    AND?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    OR?: ExerciseScalarWhereWithAggregatesInput[]
    NOT?: ExerciseScalarWhereWithAggregatesInput | ExerciseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Exercise"> | number
    tutorial_id?: IntWithAggregatesFilter<"Exercise"> | number
    title?: StringWithAggregatesFilter<"Exercise"> | string
    description?: StringWithAggregatesFilter<"Exercise"> | string
    instructions?: StringWithAggregatesFilter<"Exercise"> | string
    starter_code?: StringNullableWithAggregatesFilter<"Exercise"> | string | null
    solution_code?: StringWithAggregatesFilter<"Exercise"> | string
    validation_tests?: StringWithAggregatesFilter<"Exercise"> | string
    hints?: StringNullableListFilter<"Exercise">
    difficulty?: StringWithAggregatesFilter<"Exercise"> | string
    created_at?: DateTimeWithAggregatesFilter<"Exercise"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Exercise"> | Date | string
  }

  export type QuizQuestionWhereInput = {
    AND?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    OR?: QuizQuestionWhereInput[]
    NOT?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    id?: IntFilter<"QuizQuestion"> | number
    tutorial_id?: IntFilter<"QuizQuestion"> | number
    question?: StringFilter<"QuizQuestion"> | string
    options?: StringNullableListFilter<"QuizQuestion">
    correct_answer?: IntFilter<"QuizQuestion"> | number
    explanation?: StringFilter<"QuizQuestion"> | string
    created_at?: DateTimeFilter<"QuizQuestion"> | Date | string
    updated_at?: DateTimeFilter<"QuizQuestion"> | Date | string
    tutorial?: XOR<TutorialScalarRelationFilter, TutorialWhereInput>
    user_answers?: UserQuizAnswerListRelationFilter
  }

  export type QuizQuestionOrderByWithRelationInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    question?: SortOrder
    options?: SortOrder
    correct_answer?: SortOrder
    explanation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    tutorial?: TutorialOrderByWithRelationInput
    user_answers?: UserQuizAnswerOrderByRelationAggregateInput
  }

  export type QuizQuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    OR?: QuizQuestionWhereInput[]
    NOT?: QuizQuestionWhereInput | QuizQuestionWhereInput[]
    tutorial_id?: IntFilter<"QuizQuestion"> | number
    question?: StringFilter<"QuizQuestion"> | string
    options?: StringNullableListFilter<"QuizQuestion">
    correct_answer?: IntFilter<"QuizQuestion"> | number
    explanation?: StringFilter<"QuizQuestion"> | string
    created_at?: DateTimeFilter<"QuizQuestion"> | Date | string
    updated_at?: DateTimeFilter<"QuizQuestion"> | Date | string
    tutorial?: XOR<TutorialScalarRelationFilter, TutorialWhereInput>
    user_answers?: UserQuizAnswerListRelationFilter
  }, "id">

  export type QuizQuestionOrderByWithAggregationInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    question?: SortOrder
    options?: SortOrder
    correct_answer?: SortOrder
    explanation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: QuizQuestionCountOrderByAggregateInput
    _avg?: QuizQuestionAvgOrderByAggregateInput
    _max?: QuizQuestionMaxOrderByAggregateInput
    _min?: QuizQuestionMinOrderByAggregateInput
    _sum?: QuizQuestionSumOrderByAggregateInput
  }

  export type QuizQuestionScalarWhereWithAggregatesInput = {
    AND?: QuizQuestionScalarWhereWithAggregatesInput | QuizQuestionScalarWhereWithAggregatesInput[]
    OR?: QuizQuestionScalarWhereWithAggregatesInput[]
    NOT?: QuizQuestionScalarWhereWithAggregatesInput | QuizQuestionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"QuizQuestion"> | number
    tutorial_id?: IntWithAggregatesFilter<"QuizQuestion"> | number
    question?: StringWithAggregatesFilter<"QuizQuestion"> | string
    options?: StringNullableListFilter<"QuizQuestion">
    correct_answer?: IntWithAggregatesFilter<"QuizQuestion"> | number
    explanation?: StringWithAggregatesFilter<"QuizQuestion"> | string
    created_at?: DateTimeWithAggregatesFilter<"QuizQuestion"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"QuizQuestion"> | Date | string
  }

  export type LearningPathWhereInput = {
    AND?: LearningPathWhereInput | LearningPathWhereInput[]
    OR?: LearningPathWhereInput[]
    NOT?: LearningPathWhereInput | LearningPathWhereInput[]
    id?: IntFilter<"LearningPath"> | number
    title?: StringFilter<"LearningPath"> | string
    description?: StringFilter<"LearningPath"> | string
    difficulty?: StringFilter<"LearningPath"> | string
    estimated_time?: IntFilter<"LearningPath"> | number
    prerequisites?: StringNullableListFilter<"LearningPath">
    created_at?: DateTimeFilter<"LearningPath"> | Date | string
    updated_at?: DateTimeFilter<"LearningPath"> | Date | string
    learning_path_items?: LearningPathItemListRelationFilter
    learning_paths_progress?: LearningPathProgressListRelationFilter
  }

  export type LearningPathOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    estimated_time?: SortOrder
    prerequisites?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    learning_path_items?: LearningPathItemOrderByRelationAggregateInput
    learning_paths_progress?: LearningPathProgressOrderByRelationAggregateInput
  }

  export type LearningPathWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LearningPathWhereInput | LearningPathWhereInput[]
    OR?: LearningPathWhereInput[]
    NOT?: LearningPathWhereInput | LearningPathWhereInput[]
    title?: StringFilter<"LearningPath"> | string
    description?: StringFilter<"LearningPath"> | string
    difficulty?: StringFilter<"LearningPath"> | string
    estimated_time?: IntFilter<"LearningPath"> | number
    prerequisites?: StringNullableListFilter<"LearningPath">
    created_at?: DateTimeFilter<"LearningPath"> | Date | string
    updated_at?: DateTimeFilter<"LearningPath"> | Date | string
    learning_path_items?: LearningPathItemListRelationFilter
    learning_paths_progress?: LearningPathProgressListRelationFilter
  }, "id">

  export type LearningPathOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    estimated_time?: SortOrder
    prerequisites?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: LearningPathCountOrderByAggregateInput
    _avg?: LearningPathAvgOrderByAggregateInput
    _max?: LearningPathMaxOrderByAggregateInput
    _min?: LearningPathMinOrderByAggregateInput
    _sum?: LearningPathSumOrderByAggregateInput
  }

  export type LearningPathScalarWhereWithAggregatesInput = {
    AND?: LearningPathScalarWhereWithAggregatesInput | LearningPathScalarWhereWithAggregatesInput[]
    OR?: LearningPathScalarWhereWithAggregatesInput[]
    NOT?: LearningPathScalarWhereWithAggregatesInput | LearningPathScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LearningPath"> | number
    title?: StringWithAggregatesFilter<"LearningPath"> | string
    description?: StringWithAggregatesFilter<"LearningPath"> | string
    difficulty?: StringWithAggregatesFilter<"LearningPath"> | string
    estimated_time?: IntWithAggregatesFilter<"LearningPath"> | number
    prerequisites?: StringNullableListFilter<"LearningPath">
    created_at?: DateTimeWithAggregatesFilter<"LearningPath"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"LearningPath"> | Date | string
  }

  export type LearningPathItemWhereInput = {
    AND?: LearningPathItemWhereInput | LearningPathItemWhereInput[]
    OR?: LearningPathItemWhereInput[]
    NOT?: LearningPathItemWhereInput | LearningPathItemWhereInput[]
    id?: IntFilter<"LearningPathItem"> | number
    learning_path_id?: IntFilter<"LearningPathItem"> | number
    item_type?: StringFilter<"LearningPathItem"> | string
    item_id?: IntFilter<"LearningPathItem"> | number
    order?: IntFilter<"LearningPathItem"> | number
    required?: BoolFilter<"LearningPathItem"> | boolean
    created_at?: DateTimeFilter<"LearningPathItem"> | Date | string
    updated_at?: DateTimeFilter<"LearningPathItem"> | Date | string
    learning_path?: XOR<LearningPathScalarRelationFilter, LearningPathWhereInput>
  }

  export type LearningPathItemOrderByWithRelationInput = {
    id?: SortOrder
    learning_path_id?: SortOrder
    item_type?: SortOrder
    item_id?: SortOrder
    order?: SortOrder
    required?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    learning_path?: LearningPathOrderByWithRelationInput
  }

  export type LearningPathItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LearningPathItemWhereInput | LearningPathItemWhereInput[]
    OR?: LearningPathItemWhereInput[]
    NOT?: LearningPathItemWhereInput | LearningPathItemWhereInput[]
    learning_path_id?: IntFilter<"LearningPathItem"> | number
    item_type?: StringFilter<"LearningPathItem"> | string
    item_id?: IntFilter<"LearningPathItem"> | number
    order?: IntFilter<"LearningPathItem"> | number
    required?: BoolFilter<"LearningPathItem"> | boolean
    created_at?: DateTimeFilter<"LearningPathItem"> | Date | string
    updated_at?: DateTimeFilter<"LearningPathItem"> | Date | string
    learning_path?: XOR<LearningPathScalarRelationFilter, LearningPathWhereInput>
  }, "id">

  export type LearningPathItemOrderByWithAggregationInput = {
    id?: SortOrder
    learning_path_id?: SortOrder
    item_type?: SortOrder
    item_id?: SortOrder
    order?: SortOrder
    required?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: LearningPathItemCountOrderByAggregateInput
    _avg?: LearningPathItemAvgOrderByAggregateInput
    _max?: LearningPathItemMaxOrderByAggregateInput
    _min?: LearningPathItemMinOrderByAggregateInput
    _sum?: LearningPathItemSumOrderByAggregateInput
  }

  export type LearningPathItemScalarWhereWithAggregatesInput = {
    AND?: LearningPathItemScalarWhereWithAggregatesInput | LearningPathItemScalarWhereWithAggregatesInput[]
    OR?: LearningPathItemScalarWhereWithAggregatesInput[]
    NOT?: LearningPathItemScalarWhereWithAggregatesInput | LearningPathItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LearningPathItem"> | number
    learning_path_id?: IntWithAggregatesFilter<"LearningPathItem"> | number
    item_type?: StringWithAggregatesFilter<"LearningPathItem"> | string
    item_id?: IntWithAggregatesFilter<"LearningPathItem"> | number
    order?: IntWithAggregatesFilter<"LearningPathItem"> | number
    required?: BoolWithAggregatesFilter<"LearningPathItem"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"LearningPathItem"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"LearningPathItem"> | Date | string
  }

  export type UserProgressWhereInput = {
    AND?: UserProgressWhereInput | UserProgressWhereInput[]
    OR?: UserProgressWhereInput[]
    NOT?: UserProgressWhereInput | UserProgressWhereInput[]
    id?: IntFilter<"UserProgress"> | number
    user_id?: IntFilter<"UserProgress"> | number
    content_type?: StringFilter<"UserProgress"> | string
    content_id?: IntFilter<"UserProgress"> | number
    progress_percentage?: IntFilter<"UserProgress"> | number
    completed?: BoolFilter<"UserProgress"> | boolean
    last_accessed?: DateTimeFilter<"UserProgress"> | Date | string
    created_at?: DateTimeFilter<"UserProgress"> | Date | string
    updated_at?: DateTimeFilter<"UserProgress"> | Date | string
    concept_id?: IntNullableFilter<"UserProgress"> | number | null
    tutorial_id?: IntNullableFilter<"UserProgress"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    concept?: XOR<ConceptExplanationNullableScalarRelationFilter, ConceptExplanationWhereInput> | null
    tutorial?: XOR<TutorialNullableScalarRelationFilter, TutorialWhereInput> | null
  }

  export type UserProgressOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    content_type?: SortOrder
    content_id?: SortOrder
    progress_percentage?: SortOrder
    completed?: SortOrder
    last_accessed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    concept_id?: SortOrderInput | SortOrder
    tutorial_id?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    concept?: ConceptExplanationOrderByWithRelationInput
    tutorial?: TutorialOrderByWithRelationInput
  }

  export type UserProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id_content_type_content_id?: UserProgressUser_idContent_typeContent_idCompoundUniqueInput
    AND?: UserProgressWhereInput | UserProgressWhereInput[]
    OR?: UserProgressWhereInput[]
    NOT?: UserProgressWhereInput | UserProgressWhereInput[]
    user_id?: IntFilter<"UserProgress"> | number
    content_type?: StringFilter<"UserProgress"> | string
    content_id?: IntFilter<"UserProgress"> | number
    progress_percentage?: IntFilter<"UserProgress"> | number
    completed?: BoolFilter<"UserProgress"> | boolean
    last_accessed?: DateTimeFilter<"UserProgress"> | Date | string
    created_at?: DateTimeFilter<"UserProgress"> | Date | string
    updated_at?: DateTimeFilter<"UserProgress"> | Date | string
    concept_id?: IntNullableFilter<"UserProgress"> | number | null
    tutorial_id?: IntNullableFilter<"UserProgress"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    concept?: XOR<ConceptExplanationNullableScalarRelationFilter, ConceptExplanationWhereInput> | null
    tutorial?: XOR<TutorialNullableScalarRelationFilter, TutorialWhereInput> | null
  }, "id" | "user_id_content_type_content_id">

  export type UserProgressOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    content_type?: SortOrder
    content_id?: SortOrder
    progress_percentage?: SortOrder
    completed?: SortOrder
    last_accessed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    concept_id?: SortOrderInput | SortOrder
    tutorial_id?: SortOrderInput | SortOrder
    _count?: UserProgressCountOrderByAggregateInput
    _avg?: UserProgressAvgOrderByAggregateInput
    _max?: UserProgressMaxOrderByAggregateInput
    _min?: UserProgressMinOrderByAggregateInput
    _sum?: UserProgressSumOrderByAggregateInput
  }

  export type UserProgressScalarWhereWithAggregatesInput = {
    AND?: UserProgressScalarWhereWithAggregatesInput | UserProgressScalarWhereWithAggregatesInput[]
    OR?: UserProgressScalarWhereWithAggregatesInput[]
    NOT?: UserProgressScalarWhereWithAggregatesInput | UserProgressScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserProgress"> | number
    user_id?: IntWithAggregatesFilter<"UserProgress"> | number
    content_type?: StringWithAggregatesFilter<"UserProgress"> | string
    content_id?: IntWithAggregatesFilter<"UserProgress"> | number
    progress_percentage?: IntWithAggregatesFilter<"UserProgress"> | number
    completed?: BoolWithAggregatesFilter<"UserProgress"> | boolean
    last_accessed?: DateTimeWithAggregatesFilter<"UserProgress"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"UserProgress"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"UserProgress"> | Date | string
    concept_id?: IntNullableWithAggregatesFilter<"UserProgress"> | number | null
    tutorial_id?: IntNullableWithAggregatesFilter<"UserProgress"> | number | null
  }

  export type LearningPathProgressWhereInput = {
    AND?: LearningPathProgressWhereInput | LearningPathProgressWhereInput[]
    OR?: LearningPathProgressWhereInput[]
    NOT?: LearningPathProgressWhereInput | LearningPathProgressWhereInput[]
    id?: IntFilter<"LearningPathProgress"> | number
    user_id?: IntFilter<"LearningPathProgress"> | number
    learning_path_id?: IntFilter<"LearningPathProgress"> | number
    progress_percentage?: IntFilter<"LearningPathProgress"> | number
    completed?: BoolFilter<"LearningPathProgress"> | boolean
    last_accessed?: DateTimeFilter<"LearningPathProgress"> | Date | string
    created_at?: DateTimeFilter<"LearningPathProgress"> | Date | string
    updated_at?: DateTimeFilter<"LearningPathProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    learning_path?: XOR<LearningPathScalarRelationFilter, LearningPathWhereInput>
  }

  export type LearningPathProgressOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    learning_path_id?: SortOrder
    progress_percentage?: SortOrder
    completed?: SortOrder
    last_accessed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    learning_path?: LearningPathOrderByWithRelationInput
  }

  export type LearningPathProgressWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_id_learning_path_id?: LearningPathProgressUser_idLearning_path_idCompoundUniqueInput
    AND?: LearningPathProgressWhereInput | LearningPathProgressWhereInput[]
    OR?: LearningPathProgressWhereInput[]
    NOT?: LearningPathProgressWhereInput | LearningPathProgressWhereInput[]
    user_id?: IntFilter<"LearningPathProgress"> | number
    learning_path_id?: IntFilter<"LearningPathProgress"> | number
    progress_percentage?: IntFilter<"LearningPathProgress"> | number
    completed?: BoolFilter<"LearningPathProgress"> | boolean
    last_accessed?: DateTimeFilter<"LearningPathProgress"> | Date | string
    created_at?: DateTimeFilter<"LearningPathProgress"> | Date | string
    updated_at?: DateTimeFilter<"LearningPathProgress"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    learning_path?: XOR<LearningPathScalarRelationFilter, LearningPathWhereInput>
  }, "id" | "user_id_learning_path_id">

  export type LearningPathProgressOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    learning_path_id?: SortOrder
    progress_percentage?: SortOrder
    completed?: SortOrder
    last_accessed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: LearningPathProgressCountOrderByAggregateInput
    _avg?: LearningPathProgressAvgOrderByAggregateInput
    _max?: LearningPathProgressMaxOrderByAggregateInput
    _min?: LearningPathProgressMinOrderByAggregateInput
    _sum?: LearningPathProgressSumOrderByAggregateInput
  }

  export type LearningPathProgressScalarWhereWithAggregatesInput = {
    AND?: LearningPathProgressScalarWhereWithAggregatesInput | LearningPathProgressScalarWhereWithAggregatesInput[]
    OR?: LearningPathProgressScalarWhereWithAggregatesInput[]
    NOT?: LearningPathProgressScalarWhereWithAggregatesInput | LearningPathProgressScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LearningPathProgress"> | number
    user_id?: IntWithAggregatesFilter<"LearningPathProgress"> | number
    learning_path_id?: IntWithAggregatesFilter<"LearningPathProgress"> | number
    progress_percentage?: IntWithAggregatesFilter<"LearningPathProgress"> | number
    completed?: BoolWithAggregatesFilter<"LearningPathProgress"> | boolean
    last_accessed?: DateTimeWithAggregatesFilter<"LearningPathProgress"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"LearningPathProgress"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"LearningPathProgress"> | Date | string
  }

  export type UserSolutionWhereInput = {
    AND?: UserSolutionWhereInput | UserSolutionWhereInput[]
    OR?: UserSolutionWhereInput[]
    NOT?: UserSolutionWhereInput | UserSolutionWhereInput[]
    id?: IntFilter<"UserSolution"> | number
    user_id?: IntFilter<"UserSolution"> | number
    exercise_id?: IntFilter<"UserSolution"> | number
    code?: StringFilter<"UserSolution"> | string
    is_correct?: BoolFilter<"UserSolution"> | boolean
    created_at?: DateTimeFilter<"UserSolution"> | Date | string
    updated_at?: DateTimeFilter<"UserSolution"> | Date | string
    exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>
  }

  export type UserSolutionOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    exercise_id?: SortOrder
    code?: SortOrder
    is_correct?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    exercise?: ExerciseOrderByWithRelationInput
  }

  export type UserSolutionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserSolutionWhereInput | UserSolutionWhereInput[]
    OR?: UserSolutionWhereInput[]
    NOT?: UserSolutionWhereInput | UserSolutionWhereInput[]
    user_id?: IntFilter<"UserSolution"> | number
    exercise_id?: IntFilter<"UserSolution"> | number
    code?: StringFilter<"UserSolution"> | string
    is_correct?: BoolFilter<"UserSolution"> | boolean
    created_at?: DateTimeFilter<"UserSolution"> | Date | string
    updated_at?: DateTimeFilter<"UserSolution"> | Date | string
    exercise?: XOR<ExerciseScalarRelationFilter, ExerciseWhereInput>
  }, "id">

  export type UserSolutionOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    exercise_id?: SortOrder
    code?: SortOrder
    is_correct?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserSolutionCountOrderByAggregateInput
    _avg?: UserSolutionAvgOrderByAggregateInput
    _max?: UserSolutionMaxOrderByAggregateInput
    _min?: UserSolutionMinOrderByAggregateInput
    _sum?: UserSolutionSumOrderByAggregateInput
  }

  export type UserSolutionScalarWhereWithAggregatesInput = {
    AND?: UserSolutionScalarWhereWithAggregatesInput | UserSolutionScalarWhereWithAggregatesInput[]
    OR?: UserSolutionScalarWhereWithAggregatesInput[]
    NOT?: UserSolutionScalarWhereWithAggregatesInput | UserSolutionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserSolution"> | number
    user_id?: IntWithAggregatesFilter<"UserSolution"> | number
    exercise_id?: IntWithAggregatesFilter<"UserSolution"> | number
    code?: StringWithAggregatesFilter<"UserSolution"> | string
    is_correct?: BoolWithAggregatesFilter<"UserSolution"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"UserSolution"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"UserSolution"> | Date | string
  }

  export type UserQuizAnswerWhereInput = {
    AND?: UserQuizAnswerWhereInput | UserQuizAnswerWhereInput[]
    OR?: UserQuizAnswerWhereInput[]
    NOT?: UserQuizAnswerWhereInput | UserQuizAnswerWhereInput[]
    id?: IntFilter<"UserQuizAnswer"> | number
    user_id?: IntFilter<"UserQuizAnswer"> | number
    quiz_question_id?: IntFilter<"UserQuizAnswer"> | number
    selected_option?: IntFilter<"UserQuizAnswer"> | number
    is_correct?: BoolFilter<"UserQuizAnswer"> | boolean
    created_at?: DateTimeFilter<"UserQuizAnswer"> | Date | string
    updated_at?: DateTimeFilter<"UserQuizAnswer"> | Date | string
    quiz_question?: XOR<QuizQuestionScalarRelationFilter, QuizQuestionWhereInput>
  }

  export type UserQuizAnswerOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_question_id?: SortOrder
    selected_option?: SortOrder
    is_correct?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    quiz_question?: QuizQuestionOrderByWithRelationInput
  }

  export type UserQuizAnswerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UserQuizAnswerWhereInput | UserQuizAnswerWhereInput[]
    OR?: UserQuizAnswerWhereInput[]
    NOT?: UserQuizAnswerWhereInput | UserQuizAnswerWhereInput[]
    user_id?: IntFilter<"UserQuizAnswer"> | number
    quiz_question_id?: IntFilter<"UserQuizAnswer"> | number
    selected_option?: IntFilter<"UserQuizAnswer"> | number
    is_correct?: BoolFilter<"UserQuizAnswer"> | boolean
    created_at?: DateTimeFilter<"UserQuizAnswer"> | Date | string
    updated_at?: DateTimeFilter<"UserQuizAnswer"> | Date | string
    quiz_question?: XOR<QuizQuestionScalarRelationFilter, QuizQuestionWhereInput>
  }, "id">

  export type UserQuizAnswerOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_question_id?: SortOrder
    selected_option?: SortOrder
    is_correct?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserQuizAnswerCountOrderByAggregateInput
    _avg?: UserQuizAnswerAvgOrderByAggregateInput
    _max?: UserQuizAnswerMaxOrderByAggregateInput
    _min?: UserQuizAnswerMinOrderByAggregateInput
    _sum?: UserQuizAnswerSumOrderByAggregateInput
  }

  export type UserQuizAnswerScalarWhereWithAggregatesInput = {
    AND?: UserQuizAnswerScalarWhereWithAggregatesInput | UserQuizAnswerScalarWhereWithAggregatesInput[]
    OR?: UserQuizAnswerScalarWhereWithAggregatesInput[]
    NOT?: UserQuizAnswerScalarWhereWithAggregatesInput | UserQuizAnswerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserQuizAnswer"> | number
    user_id?: IntWithAggregatesFilter<"UserQuizAnswer"> | number
    quiz_question_id?: IntWithAggregatesFilter<"UserQuizAnswer"> | number
    selected_option?: IntWithAggregatesFilter<"UserQuizAnswer"> | number
    is_correct?: BoolWithAggregatesFilter<"UserQuizAnswer"> | boolean
    created_at?: DateTimeWithAggregatesFilter<"UserQuizAnswer"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"UserQuizAnswer"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    name: string
    password_hash: string
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    user_progress?: UserProgressCreateNestedManyWithoutUserInput
    learning_paths_progress?: LearningPathProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name: string
    password_hash: string
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    user_progress?: UserProgressUncheckedCreateNestedManyWithoutUserInput
    learning_paths_progress?: LearningPathProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    user_progress?: UserProgressUpdateManyWithoutUserNestedInput
    learning_paths_progress?: LearningPathProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    user_progress?: UserProgressUncheckedUpdateManyWithoutUserNestedInput
    learning_paths_progress?: LearningPathProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    name: string
    password_hash: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    user_id: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConceptExplanationCreateInput = {
    title: string
    content: string
    summary: string
    related_concepts?: ConceptExplanationCreaterelated_conceptsInput | string[]
    prerequisites?: ConceptExplanationCreateprerequisitesInput | string[]
    difficulty: string
    visual_aids: JsonNullValueInput | InputJsonValue
    category: string
    tags?: ConceptExplanationCreatetagsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    user_progress?: UserProgressCreateNestedManyWithoutConceptInput
  }

  export type ConceptExplanationUncheckedCreateInput = {
    id?: number
    title: string
    content: string
    summary: string
    related_concepts?: ConceptExplanationCreaterelated_conceptsInput | string[]
    prerequisites?: ConceptExplanationCreateprerequisitesInput | string[]
    difficulty: string
    visual_aids: JsonNullValueInput | InputJsonValue
    category: string
    tags?: ConceptExplanationCreatetagsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    user_progress?: UserProgressUncheckedCreateNestedManyWithoutConceptInput
  }

  export type ConceptExplanationUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    related_concepts?: ConceptExplanationUpdaterelated_conceptsInput | string[]
    prerequisites?: ConceptExplanationUpdateprerequisitesInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    visual_aids?: JsonNullValueInput | InputJsonValue
    category?: StringFieldUpdateOperationsInput | string
    tags?: ConceptExplanationUpdatetagsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_progress?: UserProgressUpdateManyWithoutConceptNestedInput
  }

  export type ConceptExplanationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    related_concepts?: ConceptExplanationUpdaterelated_conceptsInput | string[]
    prerequisites?: ConceptExplanationUpdateprerequisitesInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    visual_aids?: JsonNullValueInput | InputJsonValue
    category?: StringFieldUpdateOperationsInput | string
    tags?: ConceptExplanationUpdatetagsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_progress?: UserProgressUncheckedUpdateManyWithoutConceptNestedInput
  }

  export type ConceptExplanationCreateManyInput = {
    id?: number
    title: string
    content: string
    summary: string
    related_concepts?: ConceptExplanationCreaterelated_conceptsInput | string[]
    prerequisites?: ConceptExplanationCreateprerequisitesInput | string[]
    difficulty: string
    visual_aids: JsonNullValueInput | InputJsonValue
    category: string
    tags?: ConceptExplanationCreatetagsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ConceptExplanationUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    related_concepts?: ConceptExplanationUpdaterelated_conceptsInput | string[]
    prerequisites?: ConceptExplanationUpdateprerequisitesInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    visual_aids?: JsonNullValueInput | InputJsonValue
    category?: StringFieldUpdateOperationsInput | string
    tags?: ConceptExplanationUpdatetagsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConceptExplanationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    related_concepts?: ConceptExplanationUpdaterelated_conceptsInput | string[]
    prerequisites?: ConceptExplanationUpdateprerequisitesInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    visual_aids?: JsonNullValueInput | InputJsonValue
    category?: StringFieldUpdateOperationsInput | string
    tags?: ConceptExplanationUpdatetagsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutorialCreateInput = {
    title: string
    description: string
    summary: string
    learning_objectives?: TutorialCreatelearning_objectivesInput | string[]
    prerequisites?: TutorialCreateprerequisitesInput | string[]
    estimated_time: number
    difficulty: string
    category: string
    tags?: TutorialCreatetagsInput | string[]
    completion_certificate?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    steps?: TutorialStepCreateNestedManyWithoutTutorialInput
    exercises?: ExerciseCreateNestedManyWithoutTutorialInput
    quiz_questions?: QuizQuestionCreateNestedManyWithoutTutorialInput
    user_progress?: UserProgressCreateNestedManyWithoutTutorialInput
  }

  export type TutorialUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    summary: string
    learning_objectives?: TutorialCreatelearning_objectivesInput | string[]
    prerequisites?: TutorialCreateprerequisitesInput | string[]
    estimated_time: number
    difficulty: string
    category: string
    tags?: TutorialCreatetagsInput | string[]
    completion_certificate?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    steps?: TutorialStepUncheckedCreateNestedManyWithoutTutorialInput
    exercises?: ExerciseUncheckedCreateNestedManyWithoutTutorialInput
    quiz_questions?: QuizQuestionUncheckedCreateNestedManyWithoutTutorialInput
    user_progress?: UserProgressUncheckedCreateNestedManyWithoutTutorialInput
  }

  export type TutorialUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: TutorialStepUpdateManyWithoutTutorialNestedInput
    exercises?: ExerciseUpdateManyWithoutTutorialNestedInput
    quiz_questions?: QuizQuestionUpdateManyWithoutTutorialNestedInput
    user_progress?: UserProgressUpdateManyWithoutTutorialNestedInput
  }

  export type TutorialUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: TutorialStepUncheckedUpdateManyWithoutTutorialNestedInput
    exercises?: ExerciseUncheckedUpdateManyWithoutTutorialNestedInput
    quiz_questions?: QuizQuestionUncheckedUpdateManyWithoutTutorialNestedInput
    user_progress?: UserProgressUncheckedUpdateManyWithoutTutorialNestedInput
  }

  export type TutorialCreateManyInput = {
    id?: number
    title: string
    description: string
    summary: string
    learning_objectives?: TutorialCreatelearning_objectivesInput | string[]
    prerequisites?: TutorialCreateprerequisitesInput | string[]
    estimated_time: number
    difficulty: string
    category: string
    tags?: TutorialCreatetagsInput | string[]
    completion_certificate?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TutorialUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutorialUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutorialStepCreateInput = {
    title: string
    content: string
    code?: string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: number | null
    checkpoint?: boolean | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    tutorial: TutorialCreateNestedOneWithoutStepsInput
  }

  export type TutorialStepUncheckedCreateInput = {
    id?: number
    tutorial_id: number
    title: string
    content: string
    code?: string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: number | null
    checkpoint?: boolean | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TutorialStepUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: NullableIntFieldUpdateOperationsInput | number | null
    checkpoint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorial?: TutorialUpdateOneRequiredWithoutStepsNestedInput
  }

  export type TutorialStepUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tutorial_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: NullableIntFieldUpdateOperationsInput | number | null
    checkpoint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutorialStepCreateManyInput = {
    id?: number
    tutorial_id: number
    title: string
    content: string
    code?: string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: number | null
    checkpoint?: boolean | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TutorialStepUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: NullableIntFieldUpdateOperationsInput | number | null
    checkpoint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutorialStepUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tutorial_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: NullableIntFieldUpdateOperationsInput | number | null
    checkpoint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseCreateInput = {
    title: string
    description: string
    instructions: string
    starter_code?: string | null
    solution_code: string
    validation_tests: string
    hints?: ExerciseCreatehintsInput | string[]
    difficulty: string
    created_at?: Date | string
    updated_at?: Date | string
    tutorial: TutorialCreateNestedOneWithoutExercisesInput
    user_solutions?: UserSolutionCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseUncheckedCreateInput = {
    id?: number
    tutorial_id: number
    title: string
    description: string
    instructions: string
    starter_code?: string | null
    solution_code: string
    validation_tests: string
    hints?: ExerciseCreatehintsInput | string[]
    difficulty: string
    created_at?: Date | string
    updated_at?: Date | string
    user_solutions?: UserSolutionUncheckedCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    starter_code?: NullableStringFieldUpdateOperationsInput | string | null
    solution_code?: StringFieldUpdateOperationsInput | string
    validation_tests?: StringFieldUpdateOperationsInput | string
    hints?: ExerciseUpdatehintsInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorial?: TutorialUpdateOneRequiredWithoutExercisesNestedInput
    user_solutions?: UserSolutionUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tutorial_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    starter_code?: NullableStringFieldUpdateOperationsInput | string | null
    solution_code?: StringFieldUpdateOperationsInput | string
    validation_tests?: StringFieldUpdateOperationsInput | string
    hints?: ExerciseUpdatehintsInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_solutions?: UserSolutionUncheckedUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseCreateManyInput = {
    id?: number
    tutorial_id: number
    title: string
    description: string
    instructions: string
    starter_code?: string | null
    solution_code: string
    validation_tests: string
    hints?: ExerciseCreatehintsInput | string[]
    difficulty: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExerciseUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    starter_code?: NullableStringFieldUpdateOperationsInput | string | null
    solution_code?: StringFieldUpdateOperationsInput | string
    validation_tests?: StringFieldUpdateOperationsInput | string
    hints?: ExerciseUpdatehintsInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tutorial_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    starter_code?: NullableStringFieldUpdateOperationsInput | string | null
    solution_code?: StringFieldUpdateOperationsInput | string
    validation_tests?: StringFieldUpdateOperationsInput | string
    hints?: ExerciseUpdatehintsInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizQuestionCreateInput = {
    question: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correct_answer: number
    explanation: string
    created_at?: Date | string
    updated_at?: Date | string
    tutorial: TutorialCreateNestedOneWithoutQuiz_questionsInput
    user_answers?: UserQuizAnswerCreateNestedManyWithoutQuiz_questionInput
  }

  export type QuizQuestionUncheckedCreateInput = {
    id?: number
    tutorial_id: number
    question: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correct_answer: number
    explanation: string
    created_at?: Date | string
    updated_at?: Date | string
    user_answers?: UserQuizAnswerUncheckedCreateNestedManyWithoutQuiz_questionInput
  }

  export type QuizQuestionUpdateInput = {
    question?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correct_answer?: IntFieldUpdateOperationsInput | number
    explanation?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorial?: TutorialUpdateOneRequiredWithoutQuiz_questionsNestedInput
    user_answers?: UserQuizAnswerUpdateManyWithoutQuiz_questionNestedInput
  }

  export type QuizQuestionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tutorial_id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correct_answer?: IntFieldUpdateOperationsInput | number
    explanation?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_answers?: UserQuizAnswerUncheckedUpdateManyWithoutQuiz_questionNestedInput
  }

  export type QuizQuestionCreateManyInput = {
    id?: number
    tutorial_id: number
    question: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correct_answer: number
    explanation: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type QuizQuestionUpdateManyMutationInput = {
    question?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correct_answer?: IntFieldUpdateOperationsInput | number
    explanation?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizQuestionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tutorial_id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correct_answer?: IntFieldUpdateOperationsInput | number
    explanation?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathCreateInput = {
    title: string
    description: string
    difficulty: string
    estimated_time: number
    prerequisites?: LearningPathCreateprerequisitesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    learning_path_items?: LearningPathItemCreateNestedManyWithoutLearning_pathInput
    learning_paths_progress?: LearningPathProgressCreateNestedManyWithoutLearning_pathInput
  }

  export type LearningPathUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    difficulty: string
    estimated_time: number
    prerequisites?: LearningPathCreateprerequisitesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    learning_path_items?: LearningPathItemUncheckedCreateNestedManyWithoutLearning_pathInput
    learning_paths_progress?: LearningPathProgressUncheckedCreateNestedManyWithoutLearning_pathInput
  }

  export type LearningPathUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    estimated_time?: IntFieldUpdateOperationsInput | number
    prerequisites?: LearningPathUpdateprerequisitesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    learning_path_items?: LearningPathItemUpdateManyWithoutLearning_pathNestedInput
    learning_paths_progress?: LearningPathProgressUpdateManyWithoutLearning_pathNestedInput
  }

  export type LearningPathUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    estimated_time?: IntFieldUpdateOperationsInput | number
    prerequisites?: LearningPathUpdateprerequisitesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    learning_path_items?: LearningPathItemUncheckedUpdateManyWithoutLearning_pathNestedInput
    learning_paths_progress?: LearningPathProgressUncheckedUpdateManyWithoutLearning_pathNestedInput
  }

  export type LearningPathCreateManyInput = {
    id?: number
    title: string
    description: string
    difficulty: string
    estimated_time: number
    prerequisites?: LearningPathCreateprerequisitesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LearningPathUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    estimated_time?: IntFieldUpdateOperationsInput | number
    prerequisites?: LearningPathUpdateprerequisitesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    estimated_time?: IntFieldUpdateOperationsInput | number
    prerequisites?: LearningPathUpdateprerequisitesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathItemCreateInput = {
    item_type: string
    item_id: number
    order: number
    required?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    learning_path: LearningPathCreateNestedOneWithoutLearning_path_itemsInput
  }

  export type LearningPathItemUncheckedCreateInput = {
    id?: number
    learning_path_id: number
    item_type: string
    item_id: number
    order: number
    required?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LearningPathItemUpdateInput = {
    item_type?: StringFieldUpdateOperationsInput | string
    item_id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    learning_path?: LearningPathUpdateOneRequiredWithoutLearning_path_itemsNestedInput
  }

  export type LearningPathItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    learning_path_id?: IntFieldUpdateOperationsInput | number
    item_type?: StringFieldUpdateOperationsInput | string
    item_id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathItemCreateManyInput = {
    id?: number
    learning_path_id: number
    item_type: string
    item_id: number
    order: number
    required?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LearningPathItemUpdateManyMutationInput = {
    item_type?: StringFieldUpdateOperationsInput | string
    item_id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    learning_path_id?: IntFieldUpdateOperationsInput | number
    item_type?: StringFieldUpdateOperationsInput | string
    item_id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProgressCreateInput = {
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutUser_progressInput
    concept?: ConceptExplanationCreateNestedOneWithoutUser_progressInput
    tutorial?: TutorialCreateNestedOneWithoutUser_progressInput
  }

  export type UserProgressUncheckedCreateInput = {
    id?: number
    user_id: number
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    concept_id?: number | null
    tutorial_id?: number | null
  }

  export type UserProgressUpdateInput = {
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUser_progressNestedInput
    concept?: ConceptExplanationUpdateOneWithoutUser_progressNestedInput
    tutorial?: TutorialUpdateOneWithoutUser_progressNestedInput
  }

  export type UserProgressUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    concept_id?: NullableIntFieldUpdateOperationsInput | number | null
    tutorial_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserProgressCreateManyInput = {
    id?: number
    user_id: number
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    concept_id?: number | null
    tutorial_id?: number | null
  }

  export type UserProgressUpdateManyMutationInput = {
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProgressUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    concept_id?: NullableIntFieldUpdateOperationsInput | number | null
    tutorial_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LearningPathProgressCreateInput = {
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutLearning_paths_progressInput
    learning_path: LearningPathCreateNestedOneWithoutLearning_paths_progressInput
  }

  export type LearningPathProgressUncheckedCreateInput = {
    id?: number
    user_id: number
    learning_path_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LearningPathProgressUpdateInput = {
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLearning_paths_progressNestedInput
    learning_path?: LearningPathUpdateOneRequiredWithoutLearning_paths_progressNestedInput
  }

  export type LearningPathProgressUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    learning_path_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathProgressCreateManyInput = {
    id?: number
    user_id: number
    learning_path_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LearningPathProgressUpdateManyMutationInput = {
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathProgressUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    learning_path_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSolutionCreateInput = {
    user_id: number
    code: string
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
    exercise: ExerciseCreateNestedOneWithoutUser_solutionsInput
  }

  export type UserSolutionUncheckedCreateInput = {
    id?: number
    user_id: number
    exercise_id: number
    code: string
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserSolutionUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    exercise?: ExerciseUpdateOneRequiredWithoutUser_solutionsNestedInput
  }

  export type UserSolutionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    exercise_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSolutionCreateManyInput = {
    id?: number
    user_id: number
    exercise_id: number
    code: string
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserSolutionUpdateManyMutationInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSolutionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    exercise_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuizAnswerCreateInput = {
    user_id: number
    selected_option: number
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
    quiz_question: QuizQuestionCreateNestedOneWithoutUser_answersInput
  }

  export type UserQuizAnswerUncheckedCreateInput = {
    id?: number
    user_id: number
    quiz_question_id: number
    selected_option: number
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserQuizAnswerUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    selected_option?: IntFieldUpdateOperationsInput | number
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    quiz_question?: QuizQuestionUpdateOneRequiredWithoutUser_answersNestedInput
  }

  export type UserQuizAnswerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    quiz_question_id?: IntFieldUpdateOperationsInput | number
    selected_option?: IntFieldUpdateOperationsInput | number
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuizAnswerCreateManyInput = {
    id?: number
    user_id: number
    quiz_question_id: number
    selected_option: number
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserQuizAnswerUpdateManyMutationInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    selected_option?: IntFieldUpdateOperationsInput | number
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuizAnswerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    quiz_question_id?: IntFieldUpdateOperationsInput | number
    selected_option?: IntFieldUpdateOperationsInput | number
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type UserProgressListRelationFilter = {
    every?: UserProgressWhereInput
    some?: UserProgressWhereInput
    none?: UserProgressWhereInput
  }

  export type LearningPathProgressListRelationFilter = {
    every?: LearningPathProgressWhereInput
    some?: LearningPathProgressWhereInput
    none?: LearningPathProgressWhereInput
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LearningPathProgressOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password_hash?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ConceptExplanationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    summary?: SortOrder
    related_concepts?: SortOrder
    prerequisites?: SortOrder
    difficulty?: SortOrder
    visual_aids?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ConceptExplanationAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ConceptExplanationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    summary?: SortOrder
    difficulty?: SortOrder
    category?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ConceptExplanationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    summary?: SortOrder
    difficulty?: SortOrder
    category?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ConceptExplanationSumOrderByAggregateInput = {
    id?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TutorialStepListRelationFilter = {
    every?: TutorialStepWhereInput
    some?: TutorialStepWhereInput
    none?: TutorialStepWhereInput
  }

  export type ExerciseListRelationFilter = {
    every?: ExerciseWhereInput
    some?: ExerciseWhereInput
    none?: ExerciseWhereInput
  }

  export type QuizQuestionListRelationFilter = {
    every?: QuizQuestionWhereInput
    some?: QuizQuestionWhereInput
    none?: QuizQuestionWhereInput
  }

  export type TutorialStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExerciseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuizQuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TutorialCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    summary?: SortOrder
    learning_objectives?: SortOrder
    prerequisites?: SortOrder
    estimated_time?: SortOrder
    difficulty?: SortOrder
    category?: SortOrder
    tags?: SortOrder
    completion_certificate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TutorialAvgOrderByAggregateInput = {
    id?: SortOrder
    estimated_time?: SortOrder
  }

  export type TutorialMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    summary?: SortOrder
    estimated_time?: SortOrder
    difficulty?: SortOrder
    category?: SortOrder
    completion_certificate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TutorialMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    summary?: SortOrder
    estimated_time?: SortOrder
    difficulty?: SortOrder
    category?: SortOrder
    completion_certificate?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TutorialSumOrderByAggregateInput = {
    id?: SortOrder
    estimated_time?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type TutorialScalarRelationFilter = {
    is?: TutorialWhereInput
    isNot?: TutorialWhereInput
  }

  export type TutorialStepCountOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    code?: SortOrder
    visual_aids?: SortOrder
    estimated_time?: SortOrder
    checkpoint?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TutorialStepAvgOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    estimated_time?: SortOrder
    order?: SortOrder
  }

  export type TutorialStepMaxOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    code?: SortOrder
    estimated_time?: SortOrder
    checkpoint?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TutorialStepMinOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    code?: SortOrder
    estimated_time?: SortOrder
    checkpoint?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TutorialStepSumOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    estimated_time?: SortOrder
    order?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type UserSolutionListRelationFilter = {
    every?: UserSolutionWhereInput
    some?: UserSolutionWhereInput
    none?: UserSolutionWhereInput
  }

  export type UserSolutionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExerciseCountOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    starter_code?: SortOrder
    solution_code?: SortOrder
    validation_tests?: SortOrder
    hints?: SortOrder
    difficulty?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExerciseAvgOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
  }

  export type ExerciseMaxOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    starter_code?: SortOrder
    solution_code?: SortOrder
    validation_tests?: SortOrder
    difficulty?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExerciseMinOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    instructions?: SortOrder
    starter_code?: SortOrder
    solution_code?: SortOrder
    validation_tests?: SortOrder
    difficulty?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExerciseSumOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
  }

  export type UserQuizAnswerListRelationFilter = {
    every?: UserQuizAnswerWhereInput
    some?: UserQuizAnswerWhereInput
    none?: UserQuizAnswerWhereInput
  }

  export type UserQuizAnswerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuizQuestionCountOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    question?: SortOrder
    options?: SortOrder
    correct_answer?: SortOrder
    explanation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type QuizQuestionAvgOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    correct_answer?: SortOrder
  }

  export type QuizQuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    question?: SortOrder
    correct_answer?: SortOrder
    explanation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type QuizQuestionMinOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    question?: SortOrder
    correct_answer?: SortOrder
    explanation?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type QuizQuestionSumOrderByAggregateInput = {
    id?: SortOrder
    tutorial_id?: SortOrder
    correct_answer?: SortOrder
  }

  export type LearningPathItemListRelationFilter = {
    every?: LearningPathItemWhereInput
    some?: LearningPathItemWhereInput
    none?: LearningPathItemWhereInput
  }

  export type LearningPathItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LearningPathCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    estimated_time?: SortOrder
    prerequisites?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LearningPathAvgOrderByAggregateInput = {
    id?: SortOrder
    estimated_time?: SortOrder
  }

  export type LearningPathMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    estimated_time?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LearningPathMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    difficulty?: SortOrder
    estimated_time?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LearningPathSumOrderByAggregateInput = {
    id?: SortOrder
    estimated_time?: SortOrder
  }

  export type LearningPathScalarRelationFilter = {
    is?: LearningPathWhereInput
    isNot?: LearningPathWhereInput
  }

  export type LearningPathItemCountOrderByAggregateInput = {
    id?: SortOrder
    learning_path_id?: SortOrder
    item_type?: SortOrder
    item_id?: SortOrder
    order?: SortOrder
    required?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LearningPathItemAvgOrderByAggregateInput = {
    id?: SortOrder
    learning_path_id?: SortOrder
    item_id?: SortOrder
    order?: SortOrder
  }

  export type LearningPathItemMaxOrderByAggregateInput = {
    id?: SortOrder
    learning_path_id?: SortOrder
    item_type?: SortOrder
    item_id?: SortOrder
    order?: SortOrder
    required?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LearningPathItemMinOrderByAggregateInput = {
    id?: SortOrder
    learning_path_id?: SortOrder
    item_type?: SortOrder
    item_id?: SortOrder
    order?: SortOrder
    required?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LearningPathItemSumOrderByAggregateInput = {
    id?: SortOrder
    learning_path_id?: SortOrder
    item_id?: SortOrder
    order?: SortOrder
  }

  export type ConceptExplanationNullableScalarRelationFilter = {
    is?: ConceptExplanationWhereInput | null
    isNot?: ConceptExplanationWhereInput | null
  }

  export type TutorialNullableScalarRelationFilter = {
    is?: TutorialWhereInput | null
    isNot?: TutorialWhereInput | null
  }

  export type UserProgressUser_idContent_typeContent_idCompoundUniqueInput = {
    user_id: number
    content_type: string
    content_id: number
  }

  export type UserProgressCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    content_type?: SortOrder
    content_id?: SortOrder
    progress_percentage?: SortOrder
    completed?: SortOrder
    last_accessed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    concept_id?: SortOrder
    tutorial_id?: SortOrder
  }

  export type UserProgressAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    content_id?: SortOrder
    progress_percentage?: SortOrder
    concept_id?: SortOrder
    tutorial_id?: SortOrder
  }

  export type UserProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    content_type?: SortOrder
    content_id?: SortOrder
    progress_percentage?: SortOrder
    completed?: SortOrder
    last_accessed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    concept_id?: SortOrder
    tutorial_id?: SortOrder
  }

  export type UserProgressMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    content_type?: SortOrder
    content_id?: SortOrder
    progress_percentage?: SortOrder
    completed?: SortOrder
    last_accessed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    concept_id?: SortOrder
    tutorial_id?: SortOrder
  }

  export type UserProgressSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    content_id?: SortOrder
    progress_percentage?: SortOrder
    concept_id?: SortOrder
    tutorial_id?: SortOrder
  }

  export type LearningPathProgressUser_idLearning_path_idCompoundUniqueInput = {
    user_id: number
    learning_path_id: number
  }

  export type LearningPathProgressCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    learning_path_id?: SortOrder
    progress_percentage?: SortOrder
    completed?: SortOrder
    last_accessed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LearningPathProgressAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    learning_path_id?: SortOrder
    progress_percentage?: SortOrder
  }

  export type LearningPathProgressMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    learning_path_id?: SortOrder
    progress_percentage?: SortOrder
    completed?: SortOrder
    last_accessed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LearningPathProgressMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    learning_path_id?: SortOrder
    progress_percentage?: SortOrder
    completed?: SortOrder
    last_accessed?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type LearningPathProgressSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    learning_path_id?: SortOrder
    progress_percentage?: SortOrder
  }

  export type ExerciseScalarRelationFilter = {
    is?: ExerciseWhereInput
    isNot?: ExerciseWhereInput
  }

  export type UserSolutionCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    exercise_id?: SortOrder
    code?: SortOrder
    is_correct?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSolutionAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    exercise_id?: SortOrder
  }

  export type UserSolutionMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    exercise_id?: SortOrder
    code?: SortOrder
    is_correct?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSolutionMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    exercise_id?: SortOrder
    code?: SortOrder
    is_correct?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSolutionSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    exercise_id?: SortOrder
  }

  export type QuizQuestionScalarRelationFilter = {
    is?: QuizQuestionWhereInput
    isNot?: QuizQuestionWhereInput
  }

  export type UserQuizAnswerCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_question_id?: SortOrder
    selected_option?: SortOrder
    is_correct?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserQuizAnswerAvgOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_question_id?: SortOrder
    selected_option?: SortOrder
  }

  export type UserQuizAnswerMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_question_id?: SortOrder
    selected_option?: SortOrder
    is_correct?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserQuizAnswerMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_question_id?: SortOrder
    selected_option?: SortOrder
    is_correct?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserQuizAnswerSumOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    quiz_question_id?: SortOrder
    selected_option?: SortOrder
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type UserProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput> | UserProgressCreateWithoutUserInput[] | UserProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutUserInput | UserProgressCreateOrConnectWithoutUserInput[]
    createMany?: UserProgressCreateManyUserInputEnvelope
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
  }

  export type LearningPathProgressCreateNestedManyWithoutUserInput = {
    create?: XOR<LearningPathProgressCreateWithoutUserInput, LearningPathProgressUncheckedCreateWithoutUserInput> | LearningPathProgressCreateWithoutUserInput[] | LearningPathProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningPathProgressCreateOrConnectWithoutUserInput | LearningPathProgressCreateOrConnectWithoutUserInput[]
    createMany?: LearningPathProgressCreateManyUserInputEnvelope
    connect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
  }

  export type UserProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput> | UserProgressCreateWithoutUserInput[] | UserProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutUserInput | UserProgressCreateOrConnectWithoutUserInput[]
    createMany?: UserProgressCreateManyUserInputEnvelope
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
  }

  export type LearningPathProgressUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LearningPathProgressCreateWithoutUserInput, LearningPathProgressUncheckedCreateWithoutUserInput> | LearningPathProgressCreateWithoutUserInput[] | LearningPathProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningPathProgressCreateOrConnectWithoutUserInput | LearningPathProgressCreateOrConnectWithoutUserInput[]
    createMany?: LearningPathProgressCreateManyUserInputEnvelope
    connect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput> | UserProgressCreateWithoutUserInput[] | UserProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutUserInput | UserProgressCreateOrConnectWithoutUserInput[]
    upsert?: UserProgressUpsertWithWhereUniqueWithoutUserInput | UserProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserProgressCreateManyUserInputEnvelope
    set?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    disconnect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    delete?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    update?: UserProgressUpdateWithWhereUniqueWithoutUserInput | UserProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserProgressUpdateManyWithWhereWithoutUserInput | UserProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
  }

  export type LearningPathProgressUpdateManyWithoutUserNestedInput = {
    create?: XOR<LearningPathProgressCreateWithoutUserInput, LearningPathProgressUncheckedCreateWithoutUserInput> | LearningPathProgressCreateWithoutUserInput[] | LearningPathProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningPathProgressCreateOrConnectWithoutUserInput | LearningPathProgressCreateOrConnectWithoutUserInput[]
    upsert?: LearningPathProgressUpsertWithWhereUniqueWithoutUserInput | LearningPathProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LearningPathProgressCreateManyUserInputEnvelope
    set?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    disconnect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    delete?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    connect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    update?: LearningPathProgressUpdateWithWhereUniqueWithoutUserInput | LearningPathProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LearningPathProgressUpdateManyWithWhereWithoutUserInput | LearningPathProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LearningPathProgressScalarWhereInput | LearningPathProgressScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput> | ProjectCreateWithoutUserInput[] | ProjectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProjectCreateOrConnectWithoutUserInput | ProjectCreateOrConnectWithoutUserInput[]
    upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput | ProjectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    disconnect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    delete?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    connect?: ProjectWhereUniqueInput | ProjectWhereUniqueInput[]
    update?: ProjectUpdateWithWhereUniqueWithoutUserInput | ProjectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProjectUpdateManyWithWhereWithoutUserInput | ProjectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
  }

  export type UserProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput> | UserProgressCreateWithoutUserInput[] | UserProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutUserInput | UserProgressCreateOrConnectWithoutUserInput[]
    upsert?: UserProgressUpsertWithWhereUniqueWithoutUserInput | UserProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserProgressCreateManyUserInputEnvelope
    set?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    disconnect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    delete?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    update?: UserProgressUpdateWithWhereUniqueWithoutUserInput | UserProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserProgressUpdateManyWithWhereWithoutUserInput | UserProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
  }

  export type LearningPathProgressUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LearningPathProgressCreateWithoutUserInput, LearningPathProgressUncheckedCreateWithoutUserInput> | LearningPathProgressCreateWithoutUserInput[] | LearningPathProgressUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningPathProgressCreateOrConnectWithoutUserInput | LearningPathProgressCreateOrConnectWithoutUserInput[]
    upsert?: LearningPathProgressUpsertWithWhereUniqueWithoutUserInput | LearningPathProgressUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LearningPathProgressCreateManyUserInputEnvelope
    set?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    disconnect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    delete?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    connect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    update?: LearningPathProgressUpdateWithWhereUniqueWithoutUserInput | LearningPathProgressUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LearningPathProgressUpdateManyWithWhereWithoutUserInput | LearningPathProgressUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LearningPathProgressScalarWhereInput | LearningPathProgressScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectsInput, UserUpdateWithoutProjectsInput>, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ConceptExplanationCreaterelated_conceptsInput = {
    set: string[]
  }

  export type ConceptExplanationCreateprerequisitesInput = {
    set: string[]
  }

  export type ConceptExplanationCreatetagsInput = {
    set: string[]
  }

  export type UserProgressCreateNestedManyWithoutConceptInput = {
    create?: XOR<UserProgressCreateWithoutConceptInput, UserProgressUncheckedCreateWithoutConceptInput> | UserProgressCreateWithoutConceptInput[] | UserProgressUncheckedCreateWithoutConceptInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutConceptInput | UserProgressCreateOrConnectWithoutConceptInput[]
    createMany?: UserProgressCreateManyConceptInputEnvelope
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
  }

  export type UserProgressUncheckedCreateNestedManyWithoutConceptInput = {
    create?: XOR<UserProgressCreateWithoutConceptInput, UserProgressUncheckedCreateWithoutConceptInput> | UserProgressCreateWithoutConceptInput[] | UserProgressUncheckedCreateWithoutConceptInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutConceptInput | UserProgressCreateOrConnectWithoutConceptInput[]
    createMany?: UserProgressCreateManyConceptInputEnvelope
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
  }

  export type ConceptExplanationUpdaterelated_conceptsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ConceptExplanationUpdateprerequisitesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ConceptExplanationUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserProgressUpdateManyWithoutConceptNestedInput = {
    create?: XOR<UserProgressCreateWithoutConceptInput, UserProgressUncheckedCreateWithoutConceptInput> | UserProgressCreateWithoutConceptInput[] | UserProgressUncheckedCreateWithoutConceptInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutConceptInput | UserProgressCreateOrConnectWithoutConceptInput[]
    upsert?: UserProgressUpsertWithWhereUniqueWithoutConceptInput | UserProgressUpsertWithWhereUniqueWithoutConceptInput[]
    createMany?: UserProgressCreateManyConceptInputEnvelope
    set?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    disconnect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    delete?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    update?: UserProgressUpdateWithWhereUniqueWithoutConceptInput | UserProgressUpdateWithWhereUniqueWithoutConceptInput[]
    updateMany?: UserProgressUpdateManyWithWhereWithoutConceptInput | UserProgressUpdateManyWithWhereWithoutConceptInput[]
    deleteMany?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
  }

  export type UserProgressUncheckedUpdateManyWithoutConceptNestedInput = {
    create?: XOR<UserProgressCreateWithoutConceptInput, UserProgressUncheckedCreateWithoutConceptInput> | UserProgressCreateWithoutConceptInput[] | UserProgressUncheckedCreateWithoutConceptInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutConceptInput | UserProgressCreateOrConnectWithoutConceptInput[]
    upsert?: UserProgressUpsertWithWhereUniqueWithoutConceptInput | UserProgressUpsertWithWhereUniqueWithoutConceptInput[]
    createMany?: UserProgressCreateManyConceptInputEnvelope
    set?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    disconnect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    delete?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    update?: UserProgressUpdateWithWhereUniqueWithoutConceptInput | UserProgressUpdateWithWhereUniqueWithoutConceptInput[]
    updateMany?: UserProgressUpdateManyWithWhereWithoutConceptInput | UserProgressUpdateManyWithWhereWithoutConceptInput[]
    deleteMany?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
  }

  export type TutorialCreatelearning_objectivesInput = {
    set: string[]
  }

  export type TutorialCreateprerequisitesInput = {
    set: string[]
  }

  export type TutorialCreatetagsInput = {
    set: string[]
  }

  export type TutorialStepCreateNestedManyWithoutTutorialInput = {
    create?: XOR<TutorialStepCreateWithoutTutorialInput, TutorialStepUncheckedCreateWithoutTutorialInput> | TutorialStepCreateWithoutTutorialInput[] | TutorialStepUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: TutorialStepCreateOrConnectWithoutTutorialInput | TutorialStepCreateOrConnectWithoutTutorialInput[]
    createMany?: TutorialStepCreateManyTutorialInputEnvelope
    connect?: TutorialStepWhereUniqueInput | TutorialStepWhereUniqueInput[]
  }

  export type ExerciseCreateNestedManyWithoutTutorialInput = {
    create?: XOR<ExerciseCreateWithoutTutorialInput, ExerciseUncheckedCreateWithoutTutorialInput> | ExerciseCreateWithoutTutorialInput[] | ExerciseUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutTutorialInput | ExerciseCreateOrConnectWithoutTutorialInput[]
    createMany?: ExerciseCreateManyTutorialInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type QuizQuestionCreateNestedManyWithoutTutorialInput = {
    create?: XOR<QuizQuestionCreateWithoutTutorialInput, QuizQuestionUncheckedCreateWithoutTutorialInput> | QuizQuestionCreateWithoutTutorialInput[] | QuizQuestionUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutTutorialInput | QuizQuestionCreateOrConnectWithoutTutorialInput[]
    createMany?: QuizQuestionCreateManyTutorialInputEnvelope
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
  }

  export type UserProgressCreateNestedManyWithoutTutorialInput = {
    create?: XOR<UserProgressCreateWithoutTutorialInput, UserProgressUncheckedCreateWithoutTutorialInput> | UserProgressCreateWithoutTutorialInput[] | UserProgressUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutTutorialInput | UserProgressCreateOrConnectWithoutTutorialInput[]
    createMany?: UserProgressCreateManyTutorialInputEnvelope
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
  }

  export type TutorialStepUncheckedCreateNestedManyWithoutTutorialInput = {
    create?: XOR<TutorialStepCreateWithoutTutorialInput, TutorialStepUncheckedCreateWithoutTutorialInput> | TutorialStepCreateWithoutTutorialInput[] | TutorialStepUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: TutorialStepCreateOrConnectWithoutTutorialInput | TutorialStepCreateOrConnectWithoutTutorialInput[]
    createMany?: TutorialStepCreateManyTutorialInputEnvelope
    connect?: TutorialStepWhereUniqueInput | TutorialStepWhereUniqueInput[]
  }

  export type ExerciseUncheckedCreateNestedManyWithoutTutorialInput = {
    create?: XOR<ExerciseCreateWithoutTutorialInput, ExerciseUncheckedCreateWithoutTutorialInput> | ExerciseCreateWithoutTutorialInput[] | ExerciseUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutTutorialInput | ExerciseCreateOrConnectWithoutTutorialInput[]
    createMany?: ExerciseCreateManyTutorialInputEnvelope
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
  }

  export type QuizQuestionUncheckedCreateNestedManyWithoutTutorialInput = {
    create?: XOR<QuizQuestionCreateWithoutTutorialInput, QuizQuestionUncheckedCreateWithoutTutorialInput> | QuizQuestionCreateWithoutTutorialInput[] | QuizQuestionUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutTutorialInput | QuizQuestionCreateOrConnectWithoutTutorialInput[]
    createMany?: QuizQuestionCreateManyTutorialInputEnvelope
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
  }

  export type UserProgressUncheckedCreateNestedManyWithoutTutorialInput = {
    create?: XOR<UserProgressCreateWithoutTutorialInput, UserProgressUncheckedCreateWithoutTutorialInput> | UserProgressCreateWithoutTutorialInput[] | UserProgressUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutTutorialInput | UserProgressCreateOrConnectWithoutTutorialInput[]
    createMany?: UserProgressCreateManyTutorialInputEnvelope
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
  }

  export type TutorialUpdatelearning_objectivesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TutorialUpdateprerequisitesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TutorialUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TutorialStepUpdateManyWithoutTutorialNestedInput = {
    create?: XOR<TutorialStepCreateWithoutTutorialInput, TutorialStepUncheckedCreateWithoutTutorialInput> | TutorialStepCreateWithoutTutorialInput[] | TutorialStepUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: TutorialStepCreateOrConnectWithoutTutorialInput | TutorialStepCreateOrConnectWithoutTutorialInput[]
    upsert?: TutorialStepUpsertWithWhereUniqueWithoutTutorialInput | TutorialStepUpsertWithWhereUniqueWithoutTutorialInput[]
    createMany?: TutorialStepCreateManyTutorialInputEnvelope
    set?: TutorialStepWhereUniqueInput | TutorialStepWhereUniqueInput[]
    disconnect?: TutorialStepWhereUniqueInput | TutorialStepWhereUniqueInput[]
    delete?: TutorialStepWhereUniqueInput | TutorialStepWhereUniqueInput[]
    connect?: TutorialStepWhereUniqueInput | TutorialStepWhereUniqueInput[]
    update?: TutorialStepUpdateWithWhereUniqueWithoutTutorialInput | TutorialStepUpdateWithWhereUniqueWithoutTutorialInput[]
    updateMany?: TutorialStepUpdateManyWithWhereWithoutTutorialInput | TutorialStepUpdateManyWithWhereWithoutTutorialInput[]
    deleteMany?: TutorialStepScalarWhereInput | TutorialStepScalarWhereInput[]
  }

  export type ExerciseUpdateManyWithoutTutorialNestedInput = {
    create?: XOR<ExerciseCreateWithoutTutorialInput, ExerciseUncheckedCreateWithoutTutorialInput> | ExerciseCreateWithoutTutorialInput[] | ExerciseUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutTutorialInput | ExerciseCreateOrConnectWithoutTutorialInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutTutorialInput | ExerciseUpsertWithWhereUniqueWithoutTutorialInput[]
    createMany?: ExerciseCreateManyTutorialInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutTutorialInput | ExerciseUpdateWithWhereUniqueWithoutTutorialInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutTutorialInput | ExerciseUpdateManyWithWhereWithoutTutorialInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type QuizQuestionUpdateManyWithoutTutorialNestedInput = {
    create?: XOR<QuizQuestionCreateWithoutTutorialInput, QuizQuestionUncheckedCreateWithoutTutorialInput> | QuizQuestionCreateWithoutTutorialInput[] | QuizQuestionUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutTutorialInput | QuizQuestionCreateOrConnectWithoutTutorialInput[]
    upsert?: QuizQuestionUpsertWithWhereUniqueWithoutTutorialInput | QuizQuestionUpsertWithWhereUniqueWithoutTutorialInput[]
    createMany?: QuizQuestionCreateManyTutorialInputEnvelope
    set?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    disconnect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    delete?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    update?: QuizQuestionUpdateWithWhereUniqueWithoutTutorialInput | QuizQuestionUpdateWithWhereUniqueWithoutTutorialInput[]
    updateMany?: QuizQuestionUpdateManyWithWhereWithoutTutorialInput | QuizQuestionUpdateManyWithWhereWithoutTutorialInput[]
    deleteMany?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
  }

  export type UserProgressUpdateManyWithoutTutorialNestedInput = {
    create?: XOR<UserProgressCreateWithoutTutorialInput, UserProgressUncheckedCreateWithoutTutorialInput> | UserProgressCreateWithoutTutorialInput[] | UserProgressUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutTutorialInput | UserProgressCreateOrConnectWithoutTutorialInput[]
    upsert?: UserProgressUpsertWithWhereUniqueWithoutTutorialInput | UserProgressUpsertWithWhereUniqueWithoutTutorialInput[]
    createMany?: UserProgressCreateManyTutorialInputEnvelope
    set?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    disconnect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    delete?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    update?: UserProgressUpdateWithWhereUniqueWithoutTutorialInput | UserProgressUpdateWithWhereUniqueWithoutTutorialInput[]
    updateMany?: UserProgressUpdateManyWithWhereWithoutTutorialInput | UserProgressUpdateManyWithWhereWithoutTutorialInput[]
    deleteMany?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
  }

  export type TutorialStepUncheckedUpdateManyWithoutTutorialNestedInput = {
    create?: XOR<TutorialStepCreateWithoutTutorialInput, TutorialStepUncheckedCreateWithoutTutorialInput> | TutorialStepCreateWithoutTutorialInput[] | TutorialStepUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: TutorialStepCreateOrConnectWithoutTutorialInput | TutorialStepCreateOrConnectWithoutTutorialInput[]
    upsert?: TutorialStepUpsertWithWhereUniqueWithoutTutorialInput | TutorialStepUpsertWithWhereUniqueWithoutTutorialInput[]
    createMany?: TutorialStepCreateManyTutorialInputEnvelope
    set?: TutorialStepWhereUniqueInput | TutorialStepWhereUniqueInput[]
    disconnect?: TutorialStepWhereUniqueInput | TutorialStepWhereUniqueInput[]
    delete?: TutorialStepWhereUniqueInput | TutorialStepWhereUniqueInput[]
    connect?: TutorialStepWhereUniqueInput | TutorialStepWhereUniqueInput[]
    update?: TutorialStepUpdateWithWhereUniqueWithoutTutorialInput | TutorialStepUpdateWithWhereUniqueWithoutTutorialInput[]
    updateMany?: TutorialStepUpdateManyWithWhereWithoutTutorialInput | TutorialStepUpdateManyWithWhereWithoutTutorialInput[]
    deleteMany?: TutorialStepScalarWhereInput | TutorialStepScalarWhereInput[]
  }

  export type ExerciseUncheckedUpdateManyWithoutTutorialNestedInput = {
    create?: XOR<ExerciseCreateWithoutTutorialInput, ExerciseUncheckedCreateWithoutTutorialInput> | ExerciseCreateWithoutTutorialInput[] | ExerciseUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: ExerciseCreateOrConnectWithoutTutorialInput | ExerciseCreateOrConnectWithoutTutorialInput[]
    upsert?: ExerciseUpsertWithWhereUniqueWithoutTutorialInput | ExerciseUpsertWithWhereUniqueWithoutTutorialInput[]
    createMany?: ExerciseCreateManyTutorialInputEnvelope
    set?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    disconnect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    delete?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    connect?: ExerciseWhereUniqueInput | ExerciseWhereUniqueInput[]
    update?: ExerciseUpdateWithWhereUniqueWithoutTutorialInput | ExerciseUpdateWithWhereUniqueWithoutTutorialInput[]
    updateMany?: ExerciseUpdateManyWithWhereWithoutTutorialInput | ExerciseUpdateManyWithWhereWithoutTutorialInput[]
    deleteMany?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
  }

  export type QuizQuestionUncheckedUpdateManyWithoutTutorialNestedInput = {
    create?: XOR<QuizQuestionCreateWithoutTutorialInput, QuizQuestionUncheckedCreateWithoutTutorialInput> | QuizQuestionCreateWithoutTutorialInput[] | QuizQuestionUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutTutorialInput | QuizQuestionCreateOrConnectWithoutTutorialInput[]
    upsert?: QuizQuestionUpsertWithWhereUniqueWithoutTutorialInput | QuizQuestionUpsertWithWhereUniqueWithoutTutorialInput[]
    createMany?: QuizQuestionCreateManyTutorialInputEnvelope
    set?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    disconnect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    delete?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    connect?: QuizQuestionWhereUniqueInput | QuizQuestionWhereUniqueInput[]
    update?: QuizQuestionUpdateWithWhereUniqueWithoutTutorialInput | QuizQuestionUpdateWithWhereUniqueWithoutTutorialInput[]
    updateMany?: QuizQuestionUpdateManyWithWhereWithoutTutorialInput | QuizQuestionUpdateManyWithWhereWithoutTutorialInput[]
    deleteMany?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
  }

  export type UserProgressUncheckedUpdateManyWithoutTutorialNestedInput = {
    create?: XOR<UserProgressCreateWithoutTutorialInput, UserProgressUncheckedCreateWithoutTutorialInput> | UserProgressCreateWithoutTutorialInput[] | UserProgressUncheckedCreateWithoutTutorialInput[]
    connectOrCreate?: UserProgressCreateOrConnectWithoutTutorialInput | UserProgressCreateOrConnectWithoutTutorialInput[]
    upsert?: UserProgressUpsertWithWhereUniqueWithoutTutorialInput | UserProgressUpsertWithWhereUniqueWithoutTutorialInput[]
    createMany?: UserProgressCreateManyTutorialInputEnvelope
    set?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    disconnect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    delete?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    connect?: UserProgressWhereUniqueInput | UserProgressWhereUniqueInput[]
    update?: UserProgressUpdateWithWhereUniqueWithoutTutorialInput | UserProgressUpdateWithWhereUniqueWithoutTutorialInput[]
    updateMany?: UserProgressUpdateManyWithWhereWithoutTutorialInput | UserProgressUpdateManyWithWhereWithoutTutorialInput[]
    deleteMany?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
  }

  export type TutorialCreateNestedOneWithoutStepsInput = {
    create?: XOR<TutorialCreateWithoutStepsInput, TutorialUncheckedCreateWithoutStepsInput>
    connectOrCreate?: TutorialCreateOrConnectWithoutStepsInput
    connect?: TutorialWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type TutorialUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<TutorialCreateWithoutStepsInput, TutorialUncheckedCreateWithoutStepsInput>
    connectOrCreate?: TutorialCreateOrConnectWithoutStepsInput
    upsert?: TutorialUpsertWithoutStepsInput
    connect?: TutorialWhereUniqueInput
    update?: XOR<XOR<TutorialUpdateToOneWithWhereWithoutStepsInput, TutorialUpdateWithoutStepsInput>, TutorialUncheckedUpdateWithoutStepsInput>
  }

  export type ExerciseCreatehintsInput = {
    set: string[]
  }

  export type TutorialCreateNestedOneWithoutExercisesInput = {
    create?: XOR<TutorialCreateWithoutExercisesInput, TutorialUncheckedCreateWithoutExercisesInput>
    connectOrCreate?: TutorialCreateOrConnectWithoutExercisesInput
    connect?: TutorialWhereUniqueInput
  }

  export type UserSolutionCreateNestedManyWithoutExerciseInput = {
    create?: XOR<UserSolutionCreateWithoutExerciseInput, UserSolutionUncheckedCreateWithoutExerciseInput> | UserSolutionCreateWithoutExerciseInput[] | UserSolutionUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: UserSolutionCreateOrConnectWithoutExerciseInput | UserSolutionCreateOrConnectWithoutExerciseInput[]
    createMany?: UserSolutionCreateManyExerciseInputEnvelope
    connect?: UserSolutionWhereUniqueInput | UserSolutionWhereUniqueInput[]
  }

  export type UserSolutionUncheckedCreateNestedManyWithoutExerciseInput = {
    create?: XOR<UserSolutionCreateWithoutExerciseInput, UserSolutionUncheckedCreateWithoutExerciseInput> | UserSolutionCreateWithoutExerciseInput[] | UserSolutionUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: UserSolutionCreateOrConnectWithoutExerciseInput | UserSolutionCreateOrConnectWithoutExerciseInput[]
    createMany?: UserSolutionCreateManyExerciseInputEnvelope
    connect?: UserSolutionWhereUniqueInput | UserSolutionWhereUniqueInput[]
  }

  export type ExerciseUpdatehintsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TutorialUpdateOneRequiredWithoutExercisesNestedInput = {
    create?: XOR<TutorialCreateWithoutExercisesInput, TutorialUncheckedCreateWithoutExercisesInput>
    connectOrCreate?: TutorialCreateOrConnectWithoutExercisesInput
    upsert?: TutorialUpsertWithoutExercisesInput
    connect?: TutorialWhereUniqueInput
    update?: XOR<XOR<TutorialUpdateToOneWithWhereWithoutExercisesInput, TutorialUpdateWithoutExercisesInput>, TutorialUncheckedUpdateWithoutExercisesInput>
  }

  export type UserSolutionUpdateManyWithoutExerciseNestedInput = {
    create?: XOR<UserSolutionCreateWithoutExerciseInput, UserSolutionUncheckedCreateWithoutExerciseInput> | UserSolutionCreateWithoutExerciseInput[] | UserSolutionUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: UserSolutionCreateOrConnectWithoutExerciseInput | UserSolutionCreateOrConnectWithoutExerciseInput[]
    upsert?: UserSolutionUpsertWithWhereUniqueWithoutExerciseInput | UserSolutionUpsertWithWhereUniqueWithoutExerciseInput[]
    createMany?: UserSolutionCreateManyExerciseInputEnvelope
    set?: UserSolutionWhereUniqueInput | UserSolutionWhereUniqueInput[]
    disconnect?: UserSolutionWhereUniqueInput | UserSolutionWhereUniqueInput[]
    delete?: UserSolutionWhereUniqueInput | UserSolutionWhereUniqueInput[]
    connect?: UserSolutionWhereUniqueInput | UserSolutionWhereUniqueInput[]
    update?: UserSolutionUpdateWithWhereUniqueWithoutExerciseInput | UserSolutionUpdateWithWhereUniqueWithoutExerciseInput[]
    updateMany?: UserSolutionUpdateManyWithWhereWithoutExerciseInput | UserSolutionUpdateManyWithWhereWithoutExerciseInput[]
    deleteMany?: UserSolutionScalarWhereInput | UserSolutionScalarWhereInput[]
  }

  export type UserSolutionUncheckedUpdateManyWithoutExerciseNestedInput = {
    create?: XOR<UserSolutionCreateWithoutExerciseInput, UserSolutionUncheckedCreateWithoutExerciseInput> | UserSolutionCreateWithoutExerciseInput[] | UserSolutionUncheckedCreateWithoutExerciseInput[]
    connectOrCreate?: UserSolutionCreateOrConnectWithoutExerciseInput | UserSolutionCreateOrConnectWithoutExerciseInput[]
    upsert?: UserSolutionUpsertWithWhereUniqueWithoutExerciseInput | UserSolutionUpsertWithWhereUniqueWithoutExerciseInput[]
    createMany?: UserSolutionCreateManyExerciseInputEnvelope
    set?: UserSolutionWhereUniqueInput | UserSolutionWhereUniqueInput[]
    disconnect?: UserSolutionWhereUniqueInput | UserSolutionWhereUniqueInput[]
    delete?: UserSolutionWhereUniqueInput | UserSolutionWhereUniqueInput[]
    connect?: UserSolutionWhereUniqueInput | UserSolutionWhereUniqueInput[]
    update?: UserSolutionUpdateWithWhereUniqueWithoutExerciseInput | UserSolutionUpdateWithWhereUniqueWithoutExerciseInput[]
    updateMany?: UserSolutionUpdateManyWithWhereWithoutExerciseInput | UserSolutionUpdateManyWithWhereWithoutExerciseInput[]
    deleteMany?: UserSolutionScalarWhereInput | UserSolutionScalarWhereInput[]
  }

  export type QuizQuestionCreateoptionsInput = {
    set: string[]
  }

  export type TutorialCreateNestedOneWithoutQuiz_questionsInput = {
    create?: XOR<TutorialCreateWithoutQuiz_questionsInput, TutorialUncheckedCreateWithoutQuiz_questionsInput>
    connectOrCreate?: TutorialCreateOrConnectWithoutQuiz_questionsInput
    connect?: TutorialWhereUniqueInput
  }

  export type UserQuizAnswerCreateNestedManyWithoutQuiz_questionInput = {
    create?: XOR<UserQuizAnswerCreateWithoutQuiz_questionInput, UserQuizAnswerUncheckedCreateWithoutQuiz_questionInput> | UserQuizAnswerCreateWithoutQuiz_questionInput[] | UserQuizAnswerUncheckedCreateWithoutQuiz_questionInput[]
    connectOrCreate?: UserQuizAnswerCreateOrConnectWithoutQuiz_questionInput | UserQuizAnswerCreateOrConnectWithoutQuiz_questionInput[]
    createMany?: UserQuizAnswerCreateManyQuiz_questionInputEnvelope
    connect?: UserQuizAnswerWhereUniqueInput | UserQuizAnswerWhereUniqueInput[]
  }

  export type UserQuizAnswerUncheckedCreateNestedManyWithoutQuiz_questionInput = {
    create?: XOR<UserQuizAnswerCreateWithoutQuiz_questionInput, UserQuizAnswerUncheckedCreateWithoutQuiz_questionInput> | UserQuizAnswerCreateWithoutQuiz_questionInput[] | UserQuizAnswerUncheckedCreateWithoutQuiz_questionInput[]
    connectOrCreate?: UserQuizAnswerCreateOrConnectWithoutQuiz_questionInput | UserQuizAnswerCreateOrConnectWithoutQuiz_questionInput[]
    createMany?: UserQuizAnswerCreateManyQuiz_questionInputEnvelope
    connect?: UserQuizAnswerWhereUniqueInput | UserQuizAnswerWhereUniqueInput[]
  }

  export type QuizQuestionUpdateoptionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type TutorialUpdateOneRequiredWithoutQuiz_questionsNestedInput = {
    create?: XOR<TutorialCreateWithoutQuiz_questionsInput, TutorialUncheckedCreateWithoutQuiz_questionsInput>
    connectOrCreate?: TutorialCreateOrConnectWithoutQuiz_questionsInput
    upsert?: TutorialUpsertWithoutQuiz_questionsInput
    connect?: TutorialWhereUniqueInput
    update?: XOR<XOR<TutorialUpdateToOneWithWhereWithoutQuiz_questionsInput, TutorialUpdateWithoutQuiz_questionsInput>, TutorialUncheckedUpdateWithoutQuiz_questionsInput>
  }

  export type UserQuizAnswerUpdateManyWithoutQuiz_questionNestedInput = {
    create?: XOR<UserQuizAnswerCreateWithoutQuiz_questionInput, UserQuizAnswerUncheckedCreateWithoutQuiz_questionInput> | UserQuizAnswerCreateWithoutQuiz_questionInput[] | UserQuizAnswerUncheckedCreateWithoutQuiz_questionInput[]
    connectOrCreate?: UserQuizAnswerCreateOrConnectWithoutQuiz_questionInput | UserQuizAnswerCreateOrConnectWithoutQuiz_questionInput[]
    upsert?: UserQuizAnswerUpsertWithWhereUniqueWithoutQuiz_questionInput | UserQuizAnswerUpsertWithWhereUniqueWithoutQuiz_questionInput[]
    createMany?: UserQuizAnswerCreateManyQuiz_questionInputEnvelope
    set?: UserQuizAnswerWhereUniqueInput | UserQuizAnswerWhereUniqueInput[]
    disconnect?: UserQuizAnswerWhereUniqueInput | UserQuizAnswerWhereUniqueInput[]
    delete?: UserQuizAnswerWhereUniqueInput | UserQuizAnswerWhereUniqueInput[]
    connect?: UserQuizAnswerWhereUniqueInput | UserQuizAnswerWhereUniqueInput[]
    update?: UserQuizAnswerUpdateWithWhereUniqueWithoutQuiz_questionInput | UserQuizAnswerUpdateWithWhereUniqueWithoutQuiz_questionInput[]
    updateMany?: UserQuizAnswerUpdateManyWithWhereWithoutQuiz_questionInput | UserQuizAnswerUpdateManyWithWhereWithoutQuiz_questionInput[]
    deleteMany?: UserQuizAnswerScalarWhereInput | UserQuizAnswerScalarWhereInput[]
  }

  export type UserQuizAnswerUncheckedUpdateManyWithoutQuiz_questionNestedInput = {
    create?: XOR<UserQuizAnswerCreateWithoutQuiz_questionInput, UserQuizAnswerUncheckedCreateWithoutQuiz_questionInput> | UserQuizAnswerCreateWithoutQuiz_questionInput[] | UserQuizAnswerUncheckedCreateWithoutQuiz_questionInput[]
    connectOrCreate?: UserQuizAnswerCreateOrConnectWithoutQuiz_questionInput | UserQuizAnswerCreateOrConnectWithoutQuiz_questionInput[]
    upsert?: UserQuizAnswerUpsertWithWhereUniqueWithoutQuiz_questionInput | UserQuizAnswerUpsertWithWhereUniqueWithoutQuiz_questionInput[]
    createMany?: UserQuizAnswerCreateManyQuiz_questionInputEnvelope
    set?: UserQuizAnswerWhereUniqueInput | UserQuizAnswerWhereUniqueInput[]
    disconnect?: UserQuizAnswerWhereUniqueInput | UserQuizAnswerWhereUniqueInput[]
    delete?: UserQuizAnswerWhereUniqueInput | UserQuizAnswerWhereUniqueInput[]
    connect?: UserQuizAnswerWhereUniqueInput | UserQuizAnswerWhereUniqueInput[]
    update?: UserQuizAnswerUpdateWithWhereUniqueWithoutQuiz_questionInput | UserQuizAnswerUpdateWithWhereUniqueWithoutQuiz_questionInput[]
    updateMany?: UserQuizAnswerUpdateManyWithWhereWithoutQuiz_questionInput | UserQuizAnswerUpdateManyWithWhereWithoutQuiz_questionInput[]
    deleteMany?: UserQuizAnswerScalarWhereInput | UserQuizAnswerScalarWhereInput[]
  }

  export type LearningPathCreateprerequisitesInput = {
    set: string[]
  }

  export type LearningPathItemCreateNestedManyWithoutLearning_pathInput = {
    create?: XOR<LearningPathItemCreateWithoutLearning_pathInput, LearningPathItemUncheckedCreateWithoutLearning_pathInput> | LearningPathItemCreateWithoutLearning_pathInput[] | LearningPathItemUncheckedCreateWithoutLearning_pathInput[]
    connectOrCreate?: LearningPathItemCreateOrConnectWithoutLearning_pathInput | LearningPathItemCreateOrConnectWithoutLearning_pathInput[]
    createMany?: LearningPathItemCreateManyLearning_pathInputEnvelope
    connect?: LearningPathItemWhereUniqueInput | LearningPathItemWhereUniqueInput[]
  }

  export type LearningPathProgressCreateNestedManyWithoutLearning_pathInput = {
    create?: XOR<LearningPathProgressCreateWithoutLearning_pathInput, LearningPathProgressUncheckedCreateWithoutLearning_pathInput> | LearningPathProgressCreateWithoutLearning_pathInput[] | LearningPathProgressUncheckedCreateWithoutLearning_pathInput[]
    connectOrCreate?: LearningPathProgressCreateOrConnectWithoutLearning_pathInput | LearningPathProgressCreateOrConnectWithoutLearning_pathInput[]
    createMany?: LearningPathProgressCreateManyLearning_pathInputEnvelope
    connect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
  }

  export type LearningPathItemUncheckedCreateNestedManyWithoutLearning_pathInput = {
    create?: XOR<LearningPathItemCreateWithoutLearning_pathInput, LearningPathItemUncheckedCreateWithoutLearning_pathInput> | LearningPathItemCreateWithoutLearning_pathInput[] | LearningPathItemUncheckedCreateWithoutLearning_pathInput[]
    connectOrCreate?: LearningPathItemCreateOrConnectWithoutLearning_pathInput | LearningPathItemCreateOrConnectWithoutLearning_pathInput[]
    createMany?: LearningPathItemCreateManyLearning_pathInputEnvelope
    connect?: LearningPathItemWhereUniqueInput | LearningPathItemWhereUniqueInput[]
  }

  export type LearningPathProgressUncheckedCreateNestedManyWithoutLearning_pathInput = {
    create?: XOR<LearningPathProgressCreateWithoutLearning_pathInput, LearningPathProgressUncheckedCreateWithoutLearning_pathInput> | LearningPathProgressCreateWithoutLearning_pathInput[] | LearningPathProgressUncheckedCreateWithoutLearning_pathInput[]
    connectOrCreate?: LearningPathProgressCreateOrConnectWithoutLearning_pathInput | LearningPathProgressCreateOrConnectWithoutLearning_pathInput[]
    createMany?: LearningPathProgressCreateManyLearning_pathInputEnvelope
    connect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
  }

  export type LearningPathUpdateprerequisitesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type LearningPathItemUpdateManyWithoutLearning_pathNestedInput = {
    create?: XOR<LearningPathItemCreateWithoutLearning_pathInput, LearningPathItemUncheckedCreateWithoutLearning_pathInput> | LearningPathItemCreateWithoutLearning_pathInput[] | LearningPathItemUncheckedCreateWithoutLearning_pathInput[]
    connectOrCreate?: LearningPathItemCreateOrConnectWithoutLearning_pathInput | LearningPathItemCreateOrConnectWithoutLearning_pathInput[]
    upsert?: LearningPathItemUpsertWithWhereUniqueWithoutLearning_pathInput | LearningPathItemUpsertWithWhereUniqueWithoutLearning_pathInput[]
    createMany?: LearningPathItemCreateManyLearning_pathInputEnvelope
    set?: LearningPathItemWhereUniqueInput | LearningPathItemWhereUniqueInput[]
    disconnect?: LearningPathItemWhereUniqueInput | LearningPathItemWhereUniqueInput[]
    delete?: LearningPathItemWhereUniqueInput | LearningPathItemWhereUniqueInput[]
    connect?: LearningPathItemWhereUniqueInput | LearningPathItemWhereUniqueInput[]
    update?: LearningPathItemUpdateWithWhereUniqueWithoutLearning_pathInput | LearningPathItemUpdateWithWhereUniqueWithoutLearning_pathInput[]
    updateMany?: LearningPathItemUpdateManyWithWhereWithoutLearning_pathInput | LearningPathItemUpdateManyWithWhereWithoutLearning_pathInput[]
    deleteMany?: LearningPathItemScalarWhereInput | LearningPathItemScalarWhereInput[]
  }

  export type LearningPathProgressUpdateManyWithoutLearning_pathNestedInput = {
    create?: XOR<LearningPathProgressCreateWithoutLearning_pathInput, LearningPathProgressUncheckedCreateWithoutLearning_pathInput> | LearningPathProgressCreateWithoutLearning_pathInput[] | LearningPathProgressUncheckedCreateWithoutLearning_pathInput[]
    connectOrCreate?: LearningPathProgressCreateOrConnectWithoutLearning_pathInput | LearningPathProgressCreateOrConnectWithoutLearning_pathInput[]
    upsert?: LearningPathProgressUpsertWithWhereUniqueWithoutLearning_pathInput | LearningPathProgressUpsertWithWhereUniqueWithoutLearning_pathInput[]
    createMany?: LearningPathProgressCreateManyLearning_pathInputEnvelope
    set?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    disconnect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    delete?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    connect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    update?: LearningPathProgressUpdateWithWhereUniqueWithoutLearning_pathInput | LearningPathProgressUpdateWithWhereUniqueWithoutLearning_pathInput[]
    updateMany?: LearningPathProgressUpdateManyWithWhereWithoutLearning_pathInput | LearningPathProgressUpdateManyWithWhereWithoutLearning_pathInput[]
    deleteMany?: LearningPathProgressScalarWhereInput | LearningPathProgressScalarWhereInput[]
  }

  export type LearningPathItemUncheckedUpdateManyWithoutLearning_pathNestedInput = {
    create?: XOR<LearningPathItemCreateWithoutLearning_pathInput, LearningPathItemUncheckedCreateWithoutLearning_pathInput> | LearningPathItemCreateWithoutLearning_pathInput[] | LearningPathItemUncheckedCreateWithoutLearning_pathInput[]
    connectOrCreate?: LearningPathItemCreateOrConnectWithoutLearning_pathInput | LearningPathItemCreateOrConnectWithoutLearning_pathInput[]
    upsert?: LearningPathItemUpsertWithWhereUniqueWithoutLearning_pathInput | LearningPathItemUpsertWithWhereUniqueWithoutLearning_pathInput[]
    createMany?: LearningPathItemCreateManyLearning_pathInputEnvelope
    set?: LearningPathItemWhereUniqueInput | LearningPathItemWhereUniqueInput[]
    disconnect?: LearningPathItemWhereUniqueInput | LearningPathItemWhereUniqueInput[]
    delete?: LearningPathItemWhereUniqueInput | LearningPathItemWhereUniqueInput[]
    connect?: LearningPathItemWhereUniqueInput | LearningPathItemWhereUniqueInput[]
    update?: LearningPathItemUpdateWithWhereUniqueWithoutLearning_pathInput | LearningPathItemUpdateWithWhereUniqueWithoutLearning_pathInput[]
    updateMany?: LearningPathItemUpdateManyWithWhereWithoutLearning_pathInput | LearningPathItemUpdateManyWithWhereWithoutLearning_pathInput[]
    deleteMany?: LearningPathItemScalarWhereInput | LearningPathItemScalarWhereInput[]
  }

  export type LearningPathProgressUncheckedUpdateManyWithoutLearning_pathNestedInput = {
    create?: XOR<LearningPathProgressCreateWithoutLearning_pathInput, LearningPathProgressUncheckedCreateWithoutLearning_pathInput> | LearningPathProgressCreateWithoutLearning_pathInput[] | LearningPathProgressUncheckedCreateWithoutLearning_pathInput[]
    connectOrCreate?: LearningPathProgressCreateOrConnectWithoutLearning_pathInput | LearningPathProgressCreateOrConnectWithoutLearning_pathInput[]
    upsert?: LearningPathProgressUpsertWithWhereUniqueWithoutLearning_pathInput | LearningPathProgressUpsertWithWhereUniqueWithoutLearning_pathInput[]
    createMany?: LearningPathProgressCreateManyLearning_pathInputEnvelope
    set?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    disconnect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    delete?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    connect?: LearningPathProgressWhereUniqueInput | LearningPathProgressWhereUniqueInput[]
    update?: LearningPathProgressUpdateWithWhereUniqueWithoutLearning_pathInput | LearningPathProgressUpdateWithWhereUniqueWithoutLearning_pathInput[]
    updateMany?: LearningPathProgressUpdateManyWithWhereWithoutLearning_pathInput | LearningPathProgressUpdateManyWithWhereWithoutLearning_pathInput[]
    deleteMany?: LearningPathProgressScalarWhereInput | LearningPathProgressScalarWhereInput[]
  }

  export type LearningPathCreateNestedOneWithoutLearning_path_itemsInput = {
    create?: XOR<LearningPathCreateWithoutLearning_path_itemsInput, LearningPathUncheckedCreateWithoutLearning_path_itemsInput>
    connectOrCreate?: LearningPathCreateOrConnectWithoutLearning_path_itemsInput
    connect?: LearningPathWhereUniqueInput
  }

  export type LearningPathUpdateOneRequiredWithoutLearning_path_itemsNestedInput = {
    create?: XOR<LearningPathCreateWithoutLearning_path_itemsInput, LearningPathUncheckedCreateWithoutLearning_path_itemsInput>
    connectOrCreate?: LearningPathCreateOrConnectWithoutLearning_path_itemsInput
    upsert?: LearningPathUpsertWithoutLearning_path_itemsInput
    connect?: LearningPathWhereUniqueInput
    update?: XOR<XOR<LearningPathUpdateToOneWithWhereWithoutLearning_path_itemsInput, LearningPathUpdateWithoutLearning_path_itemsInput>, LearningPathUncheckedUpdateWithoutLearning_path_itemsInput>
  }

  export type UserCreateNestedOneWithoutUser_progressInput = {
    create?: XOR<UserCreateWithoutUser_progressInput, UserUncheckedCreateWithoutUser_progressInput>
    connectOrCreate?: UserCreateOrConnectWithoutUser_progressInput
    connect?: UserWhereUniqueInput
  }

  export type ConceptExplanationCreateNestedOneWithoutUser_progressInput = {
    create?: XOR<ConceptExplanationCreateWithoutUser_progressInput, ConceptExplanationUncheckedCreateWithoutUser_progressInput>
    connectOrCreate?: ConceptExplanationCreateOrConnectWithoutUser_progressInput
    connect?: ConceptExplanationWhereUniqueInput
  }

  export type TutorialCreateNestedOneWithoutUser_progressInput = {
    create?: XOR<TutorialCreateWithoutUser_progressInput, TutorialUncheckedCreateWithoutUser_progressInput>
    connectOrCreate?: TutorialCreateOrConnectWithoutUser_progressInput
    connect?: TutorialWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUser_progressNestedInput = {
    create?: XOR<UserCreateWithoutUser_progressInput, UserUncheckedCreateWithoutUser_progressInput>
    connectOrCreate?: UserCreateOrConnectWithoutUser_progressInput
    upsert?: UserUpsertWithoutUser_progressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUser_progressInput, UserUpdateWithoutUser_progressInput>, UserUncheckedUpdateWithoutUser_progressInput>
  }

  export type ConceptExplanationUpdateOneWithoutUser_progressNestedInput = {
    create?: XOR<ConceptExplanationCreateWithoutUser_progressInput, ConceptExplanationUncheckedCreateWithoutUser_progressInput>
    connectOrCreate?: ConceptExplanationCreateOrConnectWithoutUser_progressInput
    upsert?: ConceptExplanationUpsertWithoutUser_progressInput
    disconnect?: ConceptExplanationWhereInput | boolean
    delete?: ConceptExplanationWhereInput | boolean
    connect?: ConceptExplanationWhereUniqueInput
    update?: XOR<XOR<ConceptExplanationUpdateToOneWithWhereWithoutUser_progressInput, ConceptExplanationUpdateWithoutUser_progressInput>, ConceptExplanationUncheckedUpdateWithoutUser_progressInput>
  }

  export type TutorialUpdateOneWithoutUser_progressNestedInput = {
    create?: XOR<TutorialCreateWithoutUser_progressInput, TutorialUncheckedCreateWithoutUser_progressInput>
    connectOrCreate?: TutorialCreateOrConnectWithoutUser_progressInput
    upsert?: TutorialUpsertWithoutUser_progressInput
    disconnect?: TutorialWhereInput | boolean
    delete?: TutorialWhereInput | boolean
    connect?: TutorialWhereUniqueInput
    update?: XOR<XOR<TutorialUpdateToOneWithWhereWithoutUser_progressInput, TutorialUpdateWithoutUser_progressInput>, TutorialUncheckedUpdateWithoutUser_progressInput>
  }

  export type UserCreateNestedOneWithoutLearning_paths_progressInput = {
    create?: XOR<UserCreateWithoutLearning_paths_progressInput, UserUncheckedCreateWithoutLearning_paths_progressInput>
    connectOrCreate?: UserCreateOrConnectWithoutLearning_paths_progressInput
    connect?: UserWhereUniqueInput
  }

  export type LearningPathCreateNestedOneWithoutLearning_paths_progressInput = {
    create?: XOR<LearningPathCreateWithoutLearning_paths_progressInput, LearningPathUncheckedCreateWithoutLearning_paths_progressInput>
    connectOrCreate?: LearningPathCreateOrConnectWithoutLearning_paths_progressInput
    connect?: LearningPathWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutLearning_paths_progressNestedInput = {
    create?: XOR<UserCreateWithoutLearning_paths_progressInput, UserUncheckedCreateWithoutLearning_paths_progressInput>
    connectOrCreate?: UserCreateOrConnectWithoutLearning_paths_progressInput
    upsert?: UserUpsertWithoutLearning_paths_progressInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutLearning_paths_progressInput, UserUpdateWithoutLearning_paths_progressInput>, UserUncheckedUpdateWithoutLearning_paths_progressInput>
  }

  export type LearningPathUpdateOneRequiredWithoutLearning_paths_progressNestedInput = {
    create?: XOR<LearningPathCreateWithoutLearning_paths_progressInput, LearningPathUncheckedCreateWithoutLearning_paths_progressInput>
    connectOrCreate?: LearningPathCreateOrConnectWithoutLearning_paths_progressInput
    upsert?: LearningPathUpsertWithoutLearning_paths_progressInput
    connect?: LearningPathWhereUniqueInput
    update?: XOR<XOR<LearningPathUpdateToOneWithWhereWithoutLearning_paths_progressInput, LearningPathUpdateWithoutLearning_paths_progressInput>, LearningPathUncheckedUpdateWithoutLearning_paths_progressInput>
  }

  export type ExerciseCreateNestedOneWithoutUser_solutionsInput = {
    create?: XOR<ExerciseCreateWithoutUser_solutionsInput, ExerciseUncheckedCreateWithoutUser_solutionsInput>
    connectOrCreate?: ExerciseCreateOrConnectWithoutUser_solutionsInput
    connect?: ExerciseWhereUniqueInput
  }

  export type ExerciseUpdateOneRequiredWithoutUser_solutionsNestedInput = {
    create?: XOR<ExerciseCreateWithoutUser_solutionsInput, ExerciseUncheckedCreateWithoutUser_solutionsInput>
    connectOrCreate?: ExerciseCreateOrConnectWithoutUser_solutionsInput
    upsert?: ExerciseUpsertWithoutUser_solutionsInput
    connect?: ExerciseWhereUniqueInput
    update?: XOR<XOR<ExerciseUpdateToOneWithWhereWithoutUser_solutionsInput, ExerciseUpdateWithoutUser_solutionsInput>, ExerciseUncheckedUpdateWithoutUser_solutionsInput>
  }

  export type QuizQuestionCreateNestedOneWithoutUser_answersInput = {
    create?: XOR<QuizQuestionCreateWithoutUser_answersInput, QuizQuestionUncheckedCreateWithoutUser_answersInput>
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutUser_answersInput
    connect?: QuizQuestionWhereUniqueInput
  }

  export type QuizQuestionUpdateOneRequiredWithoutUser_answersNestedInput = {
    create?: XOR<QuizQuestionCreateWithoutUser_answersInput, QuizQuestionUncheckedCreateWithoutUser_answersInput>
    connectOrCreate?: QuizQuestionCreateOrConnectWithoutUser_answersInput
    upsert?: QuizQuestionUpsertWithoutUser_answersInput
    connect?: QuizQuestionWhereUniqueInput
    update?: XOR<XOR<QuizQuestionUpdateToOneWithWhereWithoutUser_answersInput, QuizQuestionUpdateWithoutUser_answersInput>, QuizQuestionUncheckedUpdateWithoutUser_answersInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type ProjectCreateWithoutUserInput = {
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: ProjectCreateManyUserInput | ProjectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserProgressCreateWithoutUserInput = {
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    concept?: ConceptExplanationCreateNestedOneWithoutUser_progressInput
    tutorial?: TutorialCreateNestedOneWithoutUser_progressInput
  }

  export type UserProgressUncheckedCreateWithoutUserInput = {
    id?: number
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    concept_id?: number | null
    tutorial_id?: number | null
  }

  export type UserProgressCreateOrConnectWithoutUserInput = {
    where: UserProgressWhereUniqueInput
    create: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput>
  }

  export type UserProgressCreateManyUserInputEnvelope = {
    data: UserProgressCreateManyUserInput | UserProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LearningPathProgressCreateWithoutUserInput = {
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    learning_path: LearningPathCreateNestedOneWithoutLearning_paths_progressInput
  }

  export type LearningPathProgressUncheckedCreateWithoutUserInput = {
    id?: number
    learning_path_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LearningPathProgressCreateOrConnectWithoutUserInput = {
    where: LearningPathProgressWhereUniqueInput
    create: XOR<LearningPathProgressCreateWithoutUserInput, LearningPathProgressUncheckedCreateWithoutUserInput>
  }

  export type LearningPathProgressCreateManyUserInputEnvelope = {
    data: LearningPathProgressCreateManyUserInput | LearningPathProgressCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutUserInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    OR?: ProjectScalarWhereInput[]
    NOT?: ProjectScalarWhereInput | ProjectScalarWhereInput[]
    id?: IntFilter<"Project"> | number
    name?: StringFilter<"Project"> | string
    description?: StringNullableFilter<"Project"> | string | null
    user_id?: IntFilter<"Project"> | number
    created_at?: DateTimeFilter<"Project"> | Date | string
    updated_at?: DateTimeFilter<"Project"> | Date | string
  }

  export type UserProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: UserProgressWhereUniqueInput
    update: XOR<UserProgressUpdateWithoutUserInput, UserProgressUncheckedUpdateWithoutUserInput>
    create: XOR<UserProgressCreateWithoutUserInput, UserProgressUncheckedCreateWithoutUserInput>
  }

  export type UserProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: UserProgressWhereUniqueInput
    data: XOR<UserProgressUpdateWithoutUserInput, UserProgressUncheckedUpdateWithoutUserInput>
  }

  export type UserProgressUpdateManyWithWhereWithoutUserInput = {
    where: UserProgressScalarWhereInput
    data: XOR<UserProgressUpdateManyMutationInput, UserProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type UserProgressScalarWhereInput = {
    AND?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
    OR?: UserProgressScalarWhereInput[]
    NOT?: UserProgressScalarWhereInput | UserProgressScalarWhereInput[]
    id?: IntFilter<"UserProgress"> | number
    user_id?: IntFilter<"UserProgress"> | number
    content_type?: StringFilter<"UserProgress"> | string
    content_id?: IntFilter<"UserProgress"> | number
    progress_percentage?: IntFilter<"UserProgress"> | number
    completed?: BoolFilter<"UserProgress"> | boolean
    last_accessed?: DateTimeFilter<"UserProgress"> | Date | string
    created_at?: DateTimeFilter<"UserProgress"> | Date | string
    updated_at?: DateTimeFilter<"UserProgress"> | Date | string
    concept_id?: IntNullableFilter<"UserProgress"> | number | null
    tutorial_id?: IntNullableFilter<"UserProgress"> | number | null
  }

  export type LearningPathProgressUpsertWithWhereUniqueWithoutUserInput = {
    where: LearningPathProgressWhereUniqueInput
    update: XOR<LearningPathProgressUpdateWithoutUserInput, LearningPathProgressUncheckedUpdateWithoutUserInput>
    create: XOR<LearningPathProgressCreateWithoutUserInput, LearningPathProgressUncheckedCreateWithoutUserInput>
  }

  export type LearningPathProgressUpdateWithWhereUniqueWithoutUserInput = {
    where: LearningPathProgressWhereUniqueInput
    data: XOR<LearningPathProgressUpdateWithoutUserInput, LearningPathProgressUncheckedUpdateWithoutUserInput>
  }

  export type LearningPathProgressUpdateManyWithWhereWithoutUserInput = {
    where: LearningPathProgressScalarWhereInput
    data: XOR<LearningPathProgressUpdateManyMutationInput, LearningPathProgressUncheckedUpdateManyWithoutUserInput>
  }

  export type LearningPathProgressScalarWhereInput = {
    AND?: LearningPathProgressScalarWhereInput | LearningPathProgressScalarWhereInput[]
    OR?: LearningPathProgressScalarWhereInput[]
    NOT?: LearningPathProgressScalarWhereInput | LearningPathProgressScalarWhereInput[]
    id?: IntFilter<"LearningPathProgress"> | number
    user_id?: IntFilter<"LearningPathProgress"> | number
    learning_path_id?: IntFilter<"LearningPathProgress"> | number
    progress_percentage?: IntFilter<"LearningPathProgress"> | number
    completed?: BoolFilter<"LearningPathProgress"> | boolean
    last_accessed?: DateTimeFilter<"LearningPathProgress"> | Date | string
    created_at?: DateTimeFilter<"LearningPathProgress"> | Date | string
    updated_at?: DateTimeFilter<"LearningPathProgress"> | Date | string
  }

  export type UserCreateWithoutProjectsInput = {
    email: string
    name: string
    password_hash: string
    created_at?: Date | string
    updated_at?: Date | string
    user_progress?: UserProgressCreateNestedManyWithoutUserInput
    learning_paths_progress?: LearningPathProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: number
    email: string
    name: string
    password_hash: string
    created_at?: Date | string
    updated_at?: Date | string
    user_progress?: UserProgressUncheckedCreateNestedManyWithoutUserInput
    learning_paths_progress?: LearningPathProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_progress?: UserProgressUpdateManyWithoutUserNestedInput
    learning_paths_progress?: LearningPathProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_progress?: UserProgressUncheckedUpdateManyWithoutUserNestedInput
    learning_paths_progress?: LearningPathProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserProgressCreateWithoutConceptInput = {
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutUser_progressInput
    tutorial?: TutorialCreateNestedOneWithoutUser_progressInput
  }

  export type UserProgressUncheckedCreateWithoutConceptInput = {
    id?: number
    user_id: number
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    tutorial_id?: number | null
  }

  export type UserProgressCreateOrConnectWithoutConceptInput = {
    where: UserProgressWhereUniqueInput
    create: XOR<UserProgressCreateWithoutConceptInput, UserProgressUncheckedCreateWithoutConceptInput>
  }

  export type UserProgressCreateManyConceptInputEnvelope = {
    data: UserProgressCreateManyConceptInput | UserProgressCreateManyConceptInput[]
    skipDuplicates?: boolean
  }

  export type UserProgressUpsertWithWhereUniqueWithoutConceptInput = {
    where: UserProgressWhereUniqueInput
    update: XOR<UserProgressUpdateWithoutConceptInput, UserProgressUncheckedUpdateWithoutConceptInput>
    create: XOR<UserProgressCreateWithoutConceptInput, UserProgressUncheckedCreateWithoutConceptInput>
  }

  export type UserProgressUpdateWithWhereUniqueWithoutConceptInput = {
    where: UserProgressWhereUniqueInput
    data: XOR<UserProgressUpdateWithoutConceptInput, UserProgressUncheckedUpdateWithoutConceptInput>
  }

  export type UserProgressUpdateManyWithWhereWithoutConceptInput = {
    where: UserProgressScalarWhereInput
    data: XOR<UserProgressUpdateManyMutationInput, UserProgressUncheckedUpdateManyWithoutConceptInput>
  }

  export type TutorialStepCreateWithoutTutorialInput = {
    title: string
    content: string
    code?: string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: number | null
    checkpoint?: boolean | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TutorialStepUncheckedCreateWithoutTutorialInput = {
    id?: number
    title: string
    content: string
    code?: string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: number | null
    checkpoint?: boolean | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TutorialStepCreateOrConnectWithoutTutorialInput = {
    where: TutorialStepWhereUniqueInput
    create: XOR<TutorialStepCreateWithoutTutorialInput, TutorialStepUncheckedCreateWithoutTutorialInput>
  }

  export type TutorialStepCreateManyTutorialInputEnvelope = {
    data: TutorialStepCreateManyTutorialInput | TutorialStepCreateManyTutorialInput[]
    skipDuplicates?: boolean
  }

  export type ExerciseCreateWithoutTutorialInput = {
    title: string
    description: string
    instructions: string
    starter_code?: string | null
    solution_code: string
    validation_tests: string
    hints?: ExerciseCreatehintsInput | string[]
    difficulty: string
    created_at?: Date | string
    updated_at?: Date | string
    user_solutions?: UserSolutionCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseUncheckedCreateWithoutTutorialInput = {
    id?: number
    title: string
    description: string
    instructions: string
    starter_code?: string | null
    solution_code: string
    validation_tests: string
    hints?: ExerciseCreatehintsInput | string[]
    difficulty: string
    created_at?: Date | string
    updated_at?: Date | string
    user_solutions?: UserSolutionUncheckedCreateNestedManyWithoutExerciseInput
  }

  export type ExerciseCreateOrConnectWithoutTutorialInput = {
    where: ExerciseWhereUniqueInput
    create: XOR<ExerciseCreateWithoutTutorialInput, ExerciseUncheckedCreateWithoutTutorialInput>
  }

  export type ExerciseCreateManyTutorialInputEnvelope = {
    data: ExerciseCreateManyTutorialInput | ExerciseCreateManyTutorialInput[]
    skipDuplicates?: boolean
  }

  export type QuizQuestionCreateWithoutTutorialInput = {
    question: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correct_answer: number
    explanation: string
    created_at?: Date | string
    updated_at?: Date | string
    user_answers?: UserQuizAnswerCreateNestedManyWithoutQuiz_questionInput
  }

  export type QuizQuestionUncheckedCreateWithoutTutorialInput = {
    id?: number
    question: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correct_answer: number
    explanation: string
    created_at?: Date | string
    updated_at?: Date | string
    user_answers?: UserQuizAnswerUncheckedCreateNestedManyWithoutQuiz_questionInput
  }

  export type QuizQuestionCreateOrConnectWithoutTutorialInput = {
    where: QuizQuestionWhereUniqueInput
    create: XOR<QuizQuestionCreateWithoutTutorialInput, QuizQuestionUncheckedCreateWithoutTutorialInput>
  }

  export type QuizQuestionCreateManyTutorialInputEnvelope = {
    data: QuizQuestionCreateManyTutorialInput | QuizQuestionCreateManyTutorialInput[]
    skipDuplicates?: boolean
  }

  export type UserProgressCreateWithoutTutorialInput = {
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutUser_progressInput
    concept?: ConceptExplanationCreateNestedOneWithoutUser_progressInput
  }

  export type UserProgressUncheckedCreateWithoutTutorialInput = {
    id?: number
    user_id: number
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    concept_id?: number | null
  }

  export type UserProgressCreateOrConnectWithoutTutorialInput = {
    where: UserProgressWhereUniqueInput
    create: XOR<UserProgressCreateWithoutTutorialInput, UserProgressUncheckedCreateWithoutTutorialInput>
  }

  export type UserProgressCreateManyTutorialInputEnvelope = {
    data: UserProgressCreateManyTutorialInput | UserProgressCreateManyTutorialInput[]
    skipDuplicates?: boolean
  }

  export type TutorialStepUpsertWithWhereUniqueWithoutTutorialInput = {
    where: TutorialStepWhereUniqueInput
    update: XOR<TutorialStepUpdateWithoutTutorialInput, TutorialStepUncheckedUpdateWithoutTutorialInput>
    create: XOR<TutorialStepCreateWithoutTutorialInput, TutorialStepUncheckedCreateWithoutTutorialInput>
  }

  export type TutorialStepUpdateWithWhereUniqueWithoutTutorialInput = {
    where: TutorialStepWhereUniqueInput
    data: XOR<TutorialStepUpdateWithoutTutorialInput, TutorialStepUncheckedUpdateWithoutTutorialInput>
  }

  export type TutorialStepUpdateManyWithWhereWithoutTutorialInput = {
    where: TutorialStepScalarWhereInput
    data: XOR<TutorialStepUpdateManyMutationInput, TutorialStepUncheckedUpdateManyWithoutTutorialInput>
  }

  export type TutorialStepScalarWhereInput = {
    AND?: TutorialStepScalarWhereInput | TutorialStepScalarWhereInput[]
    OR?: TutorialStepScalarWhereInput[]
    NOT?: TutorialStepScalarWhereInput | TutorialStepScalarWhereInput[]
    id?: IntFilter<"TutorialStep"> | number
    tutorial_id?: IntFilter<"TutorialStep"> | number
    title?: StringFilter<"TutorialStep"> | string
    content?: StringFilter<"TutorialStep"> | string
    code?: StringNullableFilter<"TutorialStep"> | string | null
    visual_aids?: JsonNullableFilter<"TutorialStep">
    estimated_time?: IntNullableFilter<"TutorialStep"> | number | null
    checkpoint?: BoolNullableFilter<"TutorialStep"> | boolean | null
    order?: IntFilter<"TutorialStep"> | number
    created_at?: DateTimeFilter<"TutorialStep"> | Date | string
    updated_at?: DateTimeFilter<"TutorialStep"> | Date | string
  }

  export type ExerciseUpsertWithWhereUniqueWithoutTutorialInput = {
    where: ExerciseWhereUniqueInput
    update: XOR<ExerciseUpdateWithoutTutorialInput, ExerciseUncheckedUpdateWithoutTutorialInput>
    create: XOR<ExerciseCreateWithoutTutorialInput, ExerciseUncheckedCreateWithoutTutorialInput>
  }

  export type ExerciseUpdateWithWhereUniqueWithoutTutorialInput = {
    where: ExerciseWhereUniqueInput
    data: XOR<ExerciseUpdateWithoutTutorialInput, ExerciseUncheckedUpdateWithoutTutorialInput>
  }

  export type ExerciseUpdateManyWithWhereWithoutTutorialInput = {
    where: ExerciseScalarWhereInput
    data: XOR<ExerciseUpdateManyMutationInput, ExerciseUncheckedUpdateManyWithoutTutorialInput>
  }

  export type ExerciseScalarWhereInput = {
    AND?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    OR?: ExerciseScalarWhereInput[]
    NOT?: ExerciseScalarWhereInput | ExerciseScalarWhereInput[]
    id?: IntFilter<"Exercise"> | number
    tutorial_id?: IntFilter<"Exercise"> | number
    title?: StringFilter<"Exercise"> | string
    description?: StringFilter<"Exercise"> | string
    instructions?: StringFilter<"Exercise"> | string
    starter_code?: StringNullableFilter<"Exercise"> | string | null
    solution_code?: StringFilter<"Exercise"> | string
    validation_tests?: StringFilter<"Exercise"> | string
    hints?: StringNullableListFilter<"Exercise">
    difficulty?: StringFilter<"Exercise"> | string
    created_at?: DateTimeFilter<"Exercise"> | Date | string
    updated_at?: DateTimeFilter<"Exercise"> | Date | string
  }

  export type QuizQuestionUpsertWithWhereUniqueWithoutTutorialInput = {
    where: QuizQuestionWhereUniqueInput
    update: XOR<QuizQuestionUpdateWithoutTutorialInput, QuizQuestionUncheckedUpdateWithoutTutorialInput>
    create: XOR<QuizQuestionCreateWithoutTutorialInput, QuizQuestionUncheckedCreateWithoutTutorialInput>
  }

  export type QuizQuestionUpdateWithWhereUniqueWithoutTutorialInput = {
    where: QuizQuestionWhereUniqueInput
    data: XOR<QuizQuestionUpdateWithoutTutorialInput, QuizQuestionUncheckedUpdateWithoutTutorialInput>
  }

  export type QuizQuestionUpdateManyWithWhereWithoutTutorialInput = {
    where: QuizQuestionScalarWhereInput
    data: XOR<QuizQuestionUpdateManyMutationInput, QuizQuestionUncheckedUpdateManyWithoutTutorialInput>
  }

  export type QuizQuestionScalarWhereInput = {
    AND?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
    OR?: QuizQuestionScalarWhereInput[]
    NOT?: QuizQuestionScalarWhereInput | QuizQuestionScalarWhereInput[]
    id?: IntFilter<"QuizQuestion"> | number
    tutorial_id?: IntFilter<"QuizQuestion"> | number
    question?: StringFilter<"QuizQuestion"> | string
    options?: StringNullableListFilter<"QuizQuestion">
    correct_answer?: IntFilter<"QuizQuestion"> | number
    explanation?: StringFilter<"QuizQuestion"> | string
    created_at?: DateTimeFilter<"QuizQuestion"> | Date | string
    updated_at?: DateTimeFilter<"QuizQuestion"> | Date | string
  }

  export type UserProgressUpsertWithWhereUniqueWithoutTutorialInput = {
    where: UserProgressWhereUniqueInput
    update: XOR<UserProgressUpdateWithoutTutorialInput, UserProgressUncheckedUpdateWithoutTutorialInput>
    create: XOR<UserProgressCreateWithoutTutorialInput, UserProgressUncheckedCreateWithoutTutorialInput>
  }

  export type UserProgressUpdateWithWhereUniqueWithoutTutorialInput = {
    where: UserProgressWhereUniqueInput
    data: XOR<UserProgressUpdateWithoutTutorialInput, UserProgressUncheckedUpdateWithoutTutorialInput>
  }

  export type UserProgressUpdateManyWithWhereWithoutTutorialInput = {
    where: UserProgressScalarWhereInput
    data: XOR<UserProgressUpdateManyMutationInput, UserProgressUncheckedUpdateManyWithoutTutorialInput>
  }

  export type TutorialCreateWithoutStepsInput = {
    title: string
    description: string
    summary: string
    learning_objectives?: TutorialCreatelearning_objectivesInput | string[]
    prerequisites?: TutorialCreateprerequisitesInput | string[]
    estimated_time: number
    difficulty: string
    category: string
    tags?: TutorialCreatetagsInput | string[]
    completion_certificate?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    exercises?: ExerciseCreateNestedManyWithoutTutorialInput
    quiz_questions?: QuizQuestionCreateNestedManyWithoutTutorialInput
    user_progress?: UserProgressCreateNestedManyWithoutTutorialInput
  }

  export type TutorialUncheckedCreateWithoutStepsInput = {
    id?: number
    title: string
    description: string
    summary: string
    learning_objectives?: TutorialCreatelearning_objectivesInput | string[]
    prerequisites?: TutorialCreateprerequisitesInput | string[]
    estimated_time: number
    difficulty: string
    category: string
    tags?: TutorialCreatetagsInput | string[]
    completion_certificate?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    exercises?: ExerciseUncheckedCreateNestedManyWithoutTutorialInput
    quiz_questions?: QuizQuestionUncheckedCreateNestedManyWithoutTutorialInput
    user_progress?: UserProgressUncheckedCreateNestedManyWithoutTutorialInput
  }

  export type TutorialCreateOrConnectWithoutStepsInput = {
    where: TutorialWhereUniqueInput
    create: XOR<TutorialCreateWithoutStepsInput, TutorialUncheckedCreateWithoutStepsInput>
  }

  export type TutorialUpsertWithoutStepsInput = {
    update: XOR<TutorialUpdateWithoutStepsInput, TutorialUncheckedUpdateWithoutStepsInput>
    create: XOR<TutorialCreateWithoutStepsInput, TutorialUncheckedCreateWithoutStepsInput>
    where?: TutorialWhereInput
  }

  export type TutorialUpdateToOneWithWhereWithoutStepsInput = {
    where?: TutorialWhereInput
    data: XOR<TutorialUpdateWithoutStepsInput, TutorialUncheckedUpdateWithoutStepsInput>
  }

  export type TutorialUpdateWithoutStepsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    exercises?: ExerciseUpdateManyWithoutTutorialNestedInput
    quiz_questions?: QuizQuestionUpdateManyWithoutTutorialNestedInput
    user_progress?: UserProgressUpdateManyWithoutTutorialNestedInput
  }

  export type TutorialUncheckedUpdateWithoutStepsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    exercises?: ExerciseUncheckedUpdateManyWithoutTutorialNestedInput
    quiz_questions?: QuizQuestionUncheckedUpdateManyWithoutTutorialNestedInput
    user_progress?: UserProgressUncheckedUpdateManyWithoutTutorialNestedInput
  }

  export type TutorialCreateWithoutExercisesInput = {
    title: string
    description: string
    summary: string
    learning_objectives?: TutorialCreatelearning_objectivesInput | string[]
    prerequisites?: TutorialCreateprerequisitesInput | string[]
    estimated_time: number
    difficulty: string
    category: string
    tags?: TutorialCreatetagsInput | string[]
    completion_certificate?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    steps?: TutorialStepCreateNestedManyWithoutTutorialInput
    quiz_questions?: QuizQuestionCreateNestedManyWithoutTutorialInput
    user_progress?: UserProgressCreateNestedManyWithoutTutorialInput
  }

  export type TutorialUncheckedCreateWithoutExercisesInput = {
    id?: number
    title: string
    description: string
    summary: string
    learning_objectives?: TutorialCreatelearning_objectivesInput | string[]
    prerequisites?: TutorialCreateprerequisitesInput | string[]
    estimated_time: number
    difficulty: string
    category: string
    tags?: TutorialCreatetagsInput | string[]
    completion_certificate?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    steps?: TutorialStepUncheckedCreateNestedManyWithoutTutorialInput
    quiz_questions?: QuizQuestionUncheckedCreateNestedManyWithoutTutorialInput
    user_progress?: UserProgressUncheckedCreateNestedManyWithoutTutorialInput
  }

  export type TutorialCreateOrConnectWithoutExercisesInput = {
    where: TutorialWhereUniqueInput
    create: XOR<TutorialCreateWithoutExercisesInput, TutorialUncheckedCreateWithoutExercisesInput>
  }

  export type UserSolutionCreateWithoutExerciseInput = {
    user_id: number
    code: string
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserSolutionUncheckedCreateWithoutExerciseInput = {
    id?: number
    user_id: number
    code: string
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserSolutionCreateOrConnectWithoutExerciseInput = {
    where: UserSolutionWhereUniqueInput
    create: XOR<UserSolutionCreateWithoutExerciseInput, UserSolutionUncheckedCreateWithoutExerciseInput>
  }

  export type UserSolutionCreateManyExerciseInputEnvelope = {
    data: UserSolutionCreateManyExerciseInput | UserSolutionCreateManyExerciseInput[]
    skipDuplicates?: boolean
  }

  export type TutorialUpsertWithoutExercisesInput = {
    update: XOR<TutorialUpdateWithoutExercisesInput, TutorialUncheckedUpdateWithoutExercisesInput>
    create: XOR<TutorialCreateWithoutExercisesInput, TutorialUncheckedCreateWithoutExercisesInput>
    where?: TutorialWhereInput
  }

  export type TutorialUpdateToOneWithWhereWithoutExercisesInput = {
    where?: TutorialWhereInput
    data: XOR<TutorialUpdateWithoutExercisesInput, TutorialUncheckedUpdateWithoutExercisesInput>
  }

  export type TutorialUpdateWithoutExercisesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: TutorialStepUpdateManyWithoutTutorialNestedInput
    quiz_questions?: QuizQuestionUpdateManyWithoutTutorialNestedInput
    user_progress?: UserProgressUpdateManyWithoutTutorialNestedInput
  }

  export type TutorialUncheckedUpdateWithoutExercisesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: TutorialStepUncheckedUpdateManyWithoutTutorialNestedInput
    quiz_questions?: QuizQuestionUncheckedUpdateManyWithoutTutorialNestedInput
    user_progress?: UserProgressUncheckedUpdateManyWithoutTutorialNestedInput
  }

  export type UserSolutionUpsertWithWhereUniqueWithoutExerciseInput = {
    where: UserSolutionWhereUniqueInput
    update: XOR<UserSolutionUpdateWithoutExerciseInput, UserSolutionUncheckedUpdateWithoutExerciseInput>
    create: XOR<UserSolutionCreateWithoutExerciseInput, UserSolutionUncheckedCreateWithoutExerciseInput>
  }

  export type UserSolutionUpdateWithWhereUniqueWithoutExerciseInput = {
    where: UserSolutionWhereUniqueInput
    data: XOR<UserSolutionUpdateWithoutExerciseInput, UserSolutionUncheckedUpdateWithoutExerciseInput>
  }

  export type UserSolutionUpdateManyWithWhereWithoutExerciseInput = {
    where: UserSolutionScalarWhereInput
    data: XOR<UserSolutionUpdateManyMutationInput, UserSolutionUncheckedUpdateManyWithoutExerciseInput>
  }

  export type UserSolutionScalarWhereInput = {
    AND?: UserSolutionScalarWhereInput | UserSolutionScalarWhereInput[]
    OR?: UserSolutionScalarWhereInput[]
    NOT?: UserSolutionScalarWhereInput | UserSolutionScalarWhereInput[]
    id?: IntFilter<"UserSolution"> | number
    user_id?: IntFilter<"UserSolution"> | number
    exercise_id?: IntFilter<"UserSolution"> | number
    code?: StringFilter<"UserSolution"> | string
    is_correct?: BoolFilter<"UserSolution"> | boolean
    created_at?: DateTimeFilter<"UserSolution"> | Date | string
    updated_at?: DateTimeFilter<"UserSolution"> | Date | string
  }

  export type TutorialCreateWithoutQuiz_questionsInput = {
    title: string
    description: string
    summary: string
    learning_objectives?: TutorialCreatelearning_objectivesInput | string[]
    prerequisites?: TutorialCreateprerequisitesInput | string[]
    estimated_time: number
    difficulty: string
    category: string
    tags?: TutorialCreatetagsInput | string[]
    completion_certificate?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    steps?: TutorialStepCreateNestedManyWithoutTutorialInput
    exercises?: ExerciseCreateNestedManyWithoutTutorialInput
    user_progress?: UserProgressCreateNestedManyWithoutTutorialInput
  }

  export type TutorialUncheckedCreateWithoutQuiz_questionsInput = {
    id?: number
    title: string
    description: string
    summary: string
    learning_objectives?: TutorialCreatelearning_objectivesInput | string[]
    prerequisites?: TutorialCreateprerequisitesInput | string[]
    estimated_time: number
    difficulty: string
    category: string
    tags?: TutorialCreatetagsInput | string[]
    completion_certificate?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    steps?: TutorialStepUncheckedCreateNestedManyWithoutTutorialInput
    exercises?: ExerciseUncheckedCreateNestedManyWithoutTutorialInput
    user_progress?: UserProgressUncheckedCreateNestedManyWithoutTutorialInput
  }

  export type TutorialCreateOrConnectWithoutQuiz_questionsInput = {
    where: TutorialWhereUniqueInput
    create: XOR<TutorialCreateWithoutQuiz_questionsInput, TutorialUncheckedCreateWithoutQuiz_questionsInput>
  }

  export type UserQuizAnswerCreateWithoutQuiz_questionInput = {
    user_id: number
    selected_option: number
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserQuizAnswerUncheckedCreateWithoutQuiz_questionInput = {
    id?: number
    user_id: number
    selected_option: number
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserQuizAnswerCreateOrConnectWithoutQuiz_questionInput = {
    where: UserQuizAnswerWhereUniqueInput
    create: XOR<UserQuizAnswerCreateWithoutQuiz_questionInput, UserQuizAnswerUncheckedCreateWithoutQuiz_questionInput>
  }

  export type UserQuizAnswerCreateManyQuiz_questionInputEnvelope = {
    data: UserQuizAnswerCreateManyQuiz_questionInput | UserQuizAnswerCreateManyQuiz_questionInput[]
    skipDuplicates?: boolean
  }

  export type TutorialUpsertWithoutQuiz_questionsInput = {
    update: XOR<TutorialUpdateWithoutQuiz_questionsInput, TutorialUncheckedUpdateWithoutQuiz_questionsInput>
    create: XOR<TutorialCreateWithoutQuiz_questionsInput, TutorialUncheckedCreateWithoutQuiz_questionsInput>
    where?: TutorialWhereInput
  }

  export type TutorialUpdateToOneWithWhereWithoutQuiz_questionsInput = {
    where?: TutorialWhereInput
    data: XOR<TutorialUpdateWithoutQuiz_questionsInput, TutorialUncheckedUpdateWithoutQuiz_questionsInput>
  }

  export type TutorialUpdateWithoutQuiz_questionsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: TutorialStepUpdateManyWithoutTutorialNestedInput
    exercises?: ExerciseUpdateManyWithoutTutorialNestedInput
    user_progress?: UserProgressUpdateManyWithoutTutorialNestedInput
  }

  export type TutorialUncheckedUpdateWithoutQuiz_questionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: TutorialStepUncheckedUpdateManyWithoutTutorialNestedInput
    exercises?: ExerciseUncheckedUpdateManyWithoutTutorialNestedInput
    user_progress?: UserProgressUncheckedUpdateManyWithoutTutorialNestedInput
  }

  export type UserQuizAnswerUpsertWithWhereUniqueWithoutQuiz_questionInput = {
    where: UserQuizAnswerWhereUniqueInput
    update: XOR<UserQuizAnswerUpdateWithoutQuiz_questionInput, UserQuizAnswerUncheckedUpdateWithoutQuiz_questionInput>
    create: XOR<UserQuizAnswerCreateWithoutQuiz_questionInput, UserQuizAnswerUncheckedCreateWithoutQuiz_questionInput>
  }

  export type UserQuizAnswerUpdateWithWhereUniqueWithoutQuiz_questionInput = {
    where: UserQuizAnswerWhereUniqueInput
    data: XOR<UserQuizAnswerUpdateWithoutQuiz_questionInput, UserQuizAnswerUncheckedUpdateWithoutQuiz_questionInput>
  }

  export type UserQuizAnswerUpdateManyWithWhereWithoutQuiz_questionInput = {
    where: UserQuizAnswerScalarWhereInput
    data: XOR<UserQuizAnswerUpdateManyMutationInput, UserQuizAnswerUncheckedUpdateManyWithoutQuiz_questionInput>
  }

  export type UserQuizAnswerScalarWhereInput = {
    AND?: UserQuizAnswerScalarWhereInput | UserQuizAnswerScalarWhereInput[]
    OR?: UserQuizAnswerScalarWhereInput[]
    NOT?: UserQuizAnswerScalarWhereInput | UserQuizAnswerScalarWhereInput[]
    id?: IntFilter<"UserQuizAnswer"> | number
    user_id?: IntFilter<"UserQuizAnswer"> | number
    quiz_question_id?: IntFilter<"UserQuizAnswer"> | number
    selected_option?: IntFilter<"UserQuizAnswer"> | number
    is_correct?: BoolFilter<"UserQuizAnswer"> | boolean
    created_at?: DateTimeFilter<"UserQuizAnswer"> | Date | string
    updated_at?: DateTimeFilter<"UserQuizAnswer"> | Date | string
  }

  export type LearningPathItemCreateWithoutLearning_pathInput = {
    item_type: string
    item_id: number
    order: number
    required?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LearningPathItemUncheckedCreateWithoutLearning_pathInput = {
    id?: number
    item_type: string
    item_id: number
    order: number
    required?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LearningPathItemCreateOrConnectWithoutLearning_pathInput = {
    where: LearningPathItemWhereUniqueInput
    create: XOR<LearningPathItemCreateWithoutLearning_pathInput, LearningPathItemUncheckedCreateWithoutLearning_pathInput>
  }

  export type LearningPathItemCreateManyLearning_pathInputEnvelope = {
    data: LearningPathItemCreateManyLearning_pathInput | LearningPathItemCreateManyLearning_pathInput[]
    skipDuplicates?: boolean
  }

  export type LearningPathProgressCreateWithoutLearning_pathInput = {
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutLearning_paths_progressInput
  }

  export type LearningPathProgressUncheckedCreateWithoutLearning_pathInput = {
    id?: number
    user_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LearningPathProgressCreateOrConnectWithoutLearning_pathInput = {
    where: LearningPathProgressWhereUniqueInput
    create: XOR<LearningPathProgressCreateWithoutLearning_pathInput, LearningPathProgressUncheckedCreateWithoutLearning_pathInput>
  }

  export type LearningPathProgressCreateManyLearning_pathInputEnvelope = {
    data: LearningPathProgressCreateManyLearning_pathInput | LearningPathProgressCreateManyLearning_pathInput[]
    skipDuplicates?: boolean
  }

  export type LearningPathItemUpsertWithWhereUniqueWithoutLearning_pathInput = {
    where: LearningPathItemWhereUniqueInput
    update: XOR<LearningPathItemUpdateWithoutLearning_pathInput, LearningPathItemUncheckedUpdateWithoutLearning_pathInput>
    create: XOR<LearningPathItemCreateWithoutLearning_pathInput, LearningPathItemUncheckedCreateWithoutLearning_pathInput>
  }

  export type LearningPathItemUpdateWithWhereUniqueWithoutLearning_pathInput = {
    where: LearningPathItemWhereUniqueInput
    data: XOR<LearningPathItemUpdateWithoutLearning_pathInput, LearningPathItemUncheckedUpdateWithoutLearning_pathInput>
  }

  export type LearningPathItemUpdateManyWithWhereWithoutLearning_pathInput = {
    where: LearningPathItemScalarWhereInput
    data: XOR<LearningPathItemUpdateManyMutationInput, LearningPathItemUncheckedUpdateManyWithoutLearning_pathInput>
  }

  export type LearningPathItemScalarWhereInput = {
    AND?: LearningPathItemScalarWhereInput | LearningPathItemScalarWhereInput[]
    OR?: LearningPathItemScalarWhereInput[]
    NOT?: LearningPathItemScalarWhereInput | LearningPathItemScalarWhereInput[]
    id?: IntFilter<"LearningPathItem"> | number
    learning_path_id?: IntFilter<"LearningPathItem"> | number
    item_type?: StringFilter<"LearningPathItem"> | string
    item_id?: IntFilter<"LearningPathItem"> | number
    order?: IntFilter<"LearningPathItem"> | number
    required?: BoolFilter<"LearningPathItem"> | boolean
    created_at?: DateTimeFilter<"LearningPathItem"> | Date | string
    updated_at?: DateTimeFilter<"LearningPathItem"> | Date | string
  }

  export type LearningPathProgressUpsertWithWhereUniqueWithoutLearning_pathInput = {
    where: LearningPathProgressWhereUniqueInput
    update: XOR<LearningPathProgressUpdateWithoutLearning_pathInput, LearningPathProgressUncheckedUpdateWithoutLearning_pathInput>
    create: XOR<LearningPathProgressCreateWithoutLearning_pathInput, LearningPathProgressUncheckedCreateWithoutLearning_pathInput>
  }

  export type LearningPathProgressUpdateWithWhereUniqueWithoutLearning_pathInput = {
    where: LearningPathProgressWhereUniqueInput
    data: XOR<LearningPathProgressUpdateWithoutLearning_pathInput, LearningPathProgressUncheckedUpdateWithoutLearning_pathInput>
  }

  export type LearningPathProgressUpdateManyWithWhereWithoutLearning_pathInput = {
    where: LearningPathProgressScalarWhereInput
    data: XOR<LearningPathProgressUpdateManyMutationInput, LearningPathProgressUncheckedUpdateManyWithoutLearning_pathInput>
  }

  export type LearningPathCreateWithoutLearning_path_itemsInput = {
    title: string
    description: string
    difficulty: string
    estimated_time: number
    prerequisites?: LearningPathCreateprerequisitesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    learning_paths_progress?: LearningPathProgressCreateNestedManyWithoutLearning_pathInput
  }

  export type LearningPathUncheckedCreateWithoutLearning_path_itemsInput = {
    id?: number
    title: string
    description: string
    difficulty: string
    estimated_time: number
    prerequisites?: LearningPathCreateprerequisitesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    learning_paths_progress?: LearningPathProgressUncheckedCreateNestedManyWithoutLearning_pathInput
  }

  export type LearningPathCreateOrConnectWithoutLearning_path_itemsInput = {
    where: LearningPathWhereUniqueInput
    create: XOR<LearningPathCreateWithoutLearning_path_itemsInput, LearningPathUncheckedCreateWithoutLearning_path_itemsInput>
  }

  export type LearningPathUpsertWithoutLearning_path_itemsInput = {
    update: XOR<LearningPathUpdateWithoutLearning_path_itemsInput, LearningPathUncheckedUpdateWithoutLearning_path_itemsInput>
    create: XOR<LearningPathCreateWithoutLearning_path_itemsInput, LearningPathUncheckedCreateWithoutLearning_path_itemsInput>
    where?: LearningPathWhereInput
  }

  export type LearningPathUpdateToOneWithWhereWithoutLearning_path_itemsInput = {
    where?: LearningPathWhereInput
    data: XOR<LearningPathUpdateWithoutLearning_path_itemsInput, LearningPathUncheckedUpdateWithoutLearning_path_itemsInput>
  }

  export type LearningPathUpdateWithoutLearning_path_itemsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    estimated_time?: IntFieldUpdateOperationsInput | number
    prerequisites?: LearningPathUpdateprerequisitesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    learning_paths_progress?: LearningPathProgressUpdateManyWithoutLearning_pathNestedInput
  }

  export type LearningPathUncheckedUpdateWithoutLearning_path_itemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    estimated_time?: IntFieldUpdateOperationsInput | number
    prerequisites?: LearningPathUpdateprerequisitesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    learning_paths_progress?: LearningPathProgressUncheckedUpdateManyWithoutLearning_pathNestedInput
  }

  export type UserCreateWithoutUser_progressInput = {
    email: string
    name: string
    password_hash: string
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    learning_paths_progress?: LearningPathProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUser_progressInput = {
    id?: number
    email: string
    name: string
    password_hash: string
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    learning_paths_progress?: LearningPathProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUser_progressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUser_progressInput, UserUncheckedCreateWithoutUser_progressInput>
  }

  export type ConceptExplanationCreateWithoutUser_progressInput = {
    title: string
    content: string
    summary: string
    related_concepts?: ConceptExplanationCreaterelated_conceptsInput | string[]
    prerequisites?: ConceptExplanationCreateprerequisitesInput | string[]
    difficulty: string
    visual_aids: JsonNullValueInput | InputJsonValue
    category: string
    tags?: ConceptExplanationCreatetagsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ConceptExplanationUncheckedCreateWithoutUser_progressInput = {
    id?: number
    title: string
    content: string
    summary: string
    related_concepts?: ConceptExplanationCreaterelated_conceptsInput | string[]
    prerequisites?: ConceptExplanationCreateprerequisitesInput | string[]
    difficulty: string
    visual_aids: JsonNullValueInput | InputJsonValue
    category: string
    tags?: ConceptExplanationCreatetagsInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ConceptExplanationCreateOrConnectWithoutUser_progressInput = {
    where: ConceptExplanationWhereUniqueInput
    create: XOR<ConceptExplanationCreateWithoutUser_progressInput, ConceptExplanationUncheckedCreateWithoutUser_progressInput>
  }

  export type TutorialCreateWithoutUser_progressInput = {
    title: string
    description: string
    summary: string
    learning_objectives?: TutorialCreatelearning_objectivesInput | string[]
    prerequisites?: TutorialCreateprerequisitesInput | string[]
    estimated_time: number
    difficulty: string
    category: string
    tags?: TutorialCreatetagsInput | string[]
    completion_certificate?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    steps?: TutorialStepCreateNestedManyWithoutTutorialInput
    exercises?: ExerciseCreateNestedManyWithoutTutorialInput
    quiz_questions?: QuizQuestionCreateNestedManyWithoutTutorialInput
  }

  export type TutorialUncheckedCreateWithoutUser_progressInput = {
    id?: number
    title: string
    description: string
    summary: string
    learning_objectives?: TutorialCreatelearning_objectivesInput | string[]
    prerequisites?: TutorialCreateprerequisitesInput | string[]
    estimated_time: number
    difficulty: string
    category: string
    tags?: TutorialCreatetagsInput | string[]
    completion_certificate?: boolean
    created_at?: Date | string
    updated_at?: Date | string
    steps?: TutorialStepUncheckedCreateNestedManyWithoutTutorialInput
    exercises?: ExerciseUncheckedCreateNestedManyWithoutTutorialInput
    quiz_questions?: QuizQuestionUncheckedCreateNestedManyWithoutTutorialInput
  }

  export type TutorialCreateOrConnectWithoutUser_progressInput = {
    where: TutorialWhereUniqueInput
    create: XOR<TutorialCreateWithoutUser_progressInput, TutorialUncheckedCreateWithoutUser_progressInput>
  }

  export type UserUpsertWithoutUser_progressInput = {
    update: XOR<UserUpdateWithoutUser_progressInput, UserUncheckedUpdateWithoutUser_progressInput>
    create: XOR<UserCreateWithoutUser_progressInput, UserUncheckedCreateWithoutUser_progressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUser_progressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUser_progressInput, UserUncheckedUpdateWithoutUser_progressInput>
  }

  export type UserUpdateWithoutUser_progressInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    learning_paths_progress?: LearningPathProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUser_progressInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    learning_paths_progress?: LearningPathProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ConceptExplanationUpsertWithoutUser_progressInput = {
    update: XOR<ConceptExplanationUpdateWithoutUser_progressInput, ConceptExplanationUncheckedUpdateWithoutUser_progressInput>
    create: XOR<ConceptExplanationCreateWithoutUser_progressInput, ConceptExplanationUncheckedCreateWithoutUser_progressInput>
    where?: ConceptExplanationWhereInput
  }

  export type ConceptExplanationUpdateToOneWithWhereWithoutUser_progressInput = {
    where?: ConceptExplanationWhereInput
    data: XOR<ConceptExplanationUpdateWithoutUser_progressInput, ConceptExplanationUncheckedUpdateWithoutUser_progressInput>
  }

  export type ConceptExplanationUpdateWithoutUser_progressInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    related_concepts?: ConceptExplanationUpdaterelated_conceptsInput | string[]
    prerequisites?: ConceptExplanationUpdateprerequisitesInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    visual_aids?: JsonNullValueInput | InputJsonValue
    category?: StringFieldUpdateOperationsInput | string
    tags?: ConceptExplanationUpdatetagsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConceptExplanationUncheckedUpdateWithoutUser_progressInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    related_concepts?: ConceptExplanationUpdaterelated_conceptsInput | string[]
    prerequisites?: ConceptExplanationUpdateprerequisitesInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    visual_aids?: JsonNullValueInput | InputJsonValue
    category?: StringFieldUpdateOperationsInput | string
    tags?: ConceptExplanationUpdatetagsInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutorialUpsertWithoutUser_progressInput = {
    update: XOR<TutorialUpdateWithoutUser_progressInput, TutorialUncheckedUpdateWithoutUser_progressInput>
    create: XOR<TutorialCreateWithoutUser_progressInput, TutorialUncheckedCreateWithoutUser_progressInput>
    where?: TutorialWhereInput
  }

  export type TutorialUpdateToOneWithWhereWithoutUser_progressInput = {
    where?: TutorialWhereInput
    data: XOR<TutorialUpdateWithoutUser_progressInput, TutorialUncheckedUpdateWithoutUser_progressInput>
  }

  export type TutorialUpdateWithoutUser_progressInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: TutorialStepUpdateManyWithoutTutorialNestedInput
    exercises?: ExerciseUpdateManyWithoutTutorialNestedInput
    quiz_questions?: QuizQuestionUpdateManyWithoutTutorialNestedInput
  }

  export type TutorialUncheckedUpdateWithoutUser_progressInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    summary?: StringFieldUpdateOperationsInput | string
    learning_objectives?: TutorialUpdatelearning_objectivesInput | string[]
    prerequisites?: TutorialUpdateprerequisitesInput | string[]
    estimated_time?: IntFieldUpdateOperationsInput | number
    difficulty?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    tags?: TutorialUpdatetagsInput | string[]
    completion_certificate?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: TutorialStepUncheckedUpdateManyWithoutTutorialNestedInput
    exercises?: ExerciseUncheckedUpdateManyWithoutTutorialNestedInput
    quiz_questions?: QuizQuestionUncheckedUpdateManyWithoutTutorialNestedInput
  }

  export type UserCreateWithoutLearning_paths_progressInput = {
    email: string
    name: string
    password_hash: string
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
    user_progress?: UserProgressCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutLearning_paths_progressInput = {
    id?: number
    email: string
    name: string
    password_hash: string
    created_at?: Date | string
    updated_at?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    user_progress?: UserProgressUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutLearning_paths_progressInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutLearning_paths_progressInput, UserUncheckedCreateWithoutLearning_paths_progressInput>
  }

  export type LearningPathCreateWithoutLearning_paths_progressInput = {
    title: string
    description: string
    difficulty: string
    estimated_time: number
    prerequisites?: LearningPathCreateprerequisitesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    learning_path_items?: LearningPathItemCreateNestedManyWithoutLearning_pathInput
  }

  export type LearningPathUncheckedCreateWithoutLearning_paths_progressInput = {
    id?: number
    title: string
    description: string
    difficulty: string
    estimated_time: number
    prerequisites?: LearningPathCreateprerequisitesInput | string[]
    created_at?: Date | string
    updated_at?: Date | string
    learning_path_items?: LearningPathItemUncheckedCreateNestedManyWithoutLearning_pathInput
  }

  export type LearningPathCreateOrConnectWithoutLearning_paths_progressInput = {
    where: LearningPathWhereUniqueInput
    create: XOR<LearningPathCreateWithoutLearning_paths_progressInput, LearningPathUncheckedCreateWithoutLearning_paths_progressInput>
  }

  export type UserUpsertWithoutLearning_paths_progressInput = {
    update: XOR<UserUpdateWithoutLearning_paths_progressInput, UserUncheckedUpdateWithoutLearning_paths_progressInput>
    create: XOR<UserCreateWithoutLearning_paths_progressInput, UserUncheckedCreateWithoutLearning_paths_progressInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutLearning_paths_progressInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutLearning_paths_progressInput, UserUncheckedUpdateWithoutLearning_paths_progressInput>
  }

  export type UserUpdateWithoutLearning_paths_progressInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
    user_progress?: UserProgressUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutLearning_paths_progressInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    user_progress?: UserProgressUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LearningPathUpsertWithoutLearning_paths_progressInput = {
    update: XOR<LearningPathUpdateWithoutLearning_paths_progressInput, LearningPathUncheckedUpdateWithoutLearning_paths_progressInput>
    create: XOR<LearningPathCreateWithoutLearning_paths_progressInput, LearningPathUncheckedCreateWithoutLearning_paths_progressInput>
    where?: LearningPathWhereInput
  }

  export type LearningPathUpdateToOneWithWhereWithoutLearning_paths_progressInput = {
    where?: LearningPathWhereInput
    data: XOR<LearningPathUpdateWithoutLearning_paths_progressInput, LearningPathUncheckedUpdateWithoutLearning_paths_progressInput>
  }

  export type LearningPathUpdateWithoutLearning_paths_progressInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    estimated_time?: IntFieldUpdateOperationsInput | number
    prerequisites?: LearningPathUpdateprerequisitesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    learning_path_items?: LearningPathItemUpdateManyWithoutLearning_pathNestedInput
  }

  export type LearningPathUncheckedUpdateWithoutLearning_paths_progressInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    estimated_time?: IntFieldUpdateOperationsInput | number
    prerequisites?: LearningPathUpdateprerequisitesInput | string[]
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    learning_path_items?: LearningPathItemUncheckedUpdateManyWithoutLearning_pathNestedInput
  }

  export type ExerciseCreateWithoutUser_solutionsInput = {
    title: string
    description: string
    instructions: string
    starter_code?: string | null
    solution_code: string
    validation_tests: string
    hints?: ExerciseCreatehintsInput | string[]
    difficulty: string
    created_at?: Date | string
    updated_at?: Date | string
    tutorial: TutorialCreateNestedOneWithoutExercisesInput
  }

  export type ExerciseUncheckedCreateWithoutUser_solutionsInput = {
    id?: number
    tutorial_id: number
    title: string
    description: string
    instructions: string
    starter_code?: string | null
    solution_code: string
    validation_tests: string
    hints?: ExerciseCreatehintsInput | string[]
    difficulty: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExerciseCreateOrConnectWithoutUser_solutionsInput = {
    where: ExerciseWhereUniqueInput
    create: XOR<ExerciseCreateWithoutUser_solutionsInput, ExerciseUncheckedCreateWithoutUser_solutionsInput>
  }

  export type ExerciseUpsertWithoutUser_solutionsInput = {
    update: XOR<ExerciseUpdateWithoutUser_solutionsInput, ExerciseUncheckedUpdateWithoutUser_solutionsInput>
    create: XOR<ExerciseCreateWithoutUser_solutionsInput, ExerciseUncheckedCreateWithoutUser_solutionsInput>
    where?: ExerciseWhereInput
  }

  export type ExerciseUpdateToOneWithWhereWithoutUser_solutionsInput = {
    where?: ExerciseWhereInput
    data: XOR<ExerciseUpdateWithoutUser_solutionsInput, ExerciseUncheckedUpdateWithoutUser_solutionsInput>
  }

  export type ExerciseUpdateWithoutUser_solutionsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    starter_code?: NullableStringFieldUpdateOperationsInput | string | null
    solution_code?: StringFieldUpdateOperationsInput | string
    validation_tests?: StringFieldUpdateOperationsInput | string
    hints?: ExerciseUpdatehintsInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorial?: TutorialUpdateOneRequiredWithoutExercisesNestedInput
  }

  export type ExerciseUncheckedUpdateWithoutUser_solutionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    tutorial_id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    starter_code?: NullableStringFieldUpdateOperationsInput | string | null
    solution_code?: StringFieldUpdateOperationsInput | string
    validation_tests?: StringFieldUpdateOperationsInput | string
    hints?: ExerciseUpdatehintsInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizQuestionCreateWithoutUser_answersInput = {
    question: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correct_answer: number
    explanation: string
    created_at?: Date | string
    updated_at?: Date | string
    tutorial: TutorialCreateNestedOneWithoutQuiz_questionsInput
  }

  export type QuizQuestionUncheckedCreateWithoutUser_answersInput = {
    id?: number
    tutorial_id: number
    question: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correct_answer: number
    explanation: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type QuizQuestionCreateOrConnectWithoutUser_answersInput = {
    where: QuizQuestionWhereUniqueInput
    create: XOR<QuizQuestionCreateWithoutUser_answersInput, QuizQuestionUncheckedCreateWithoutUser_answersInput>
  }

  export type QuizQuestionUpsertWithoutUser_answersInput = {
    update: XOR<QuizQuestionUpdateWithoutUser_answersInput, QuizQuestionUncheckedUpdateWithoutUser_answersInput>
    create: XOR<QuizQuestionCreateWithoutUser_answersInput, QuizQuestionUncheckedCreateWithoutUser_answersInput>
    where?: QuizQuestionWhereInput
  }

  export type QuizQuestionUpdateToOneWithWhereWithoutUser_answersInput = {
    where?: QuizQuestionWhereInput
    data: XOR<QuizQuestionUpdateWithoutUser_answersInput, QuizQuestionUncheckedUpdateWithoutUser_answersInput>
  }

  export type QuizQuestionUpdateWithoutUser_answersInput = {
    question?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correct_answer?: IntFieldUpdateOperationsInput | number
    explanation?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorial?: TutorialUpdateOneRequiredWithoutQuiz_questionsNestedInput
  }

  export type QuizQuestionUncheckedUpdateWithoutUser_answersInput = {
    id?: IntFieldUpdateOperationsInput | number
    tutorial_id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correct_answer?: IntFieldUpdateOperationsInput | number
    explanation?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateManyUserInput = {
    id?: number
    name: string
    description?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserProgressCreateManyUserInput = {
    id?: number
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    concept_id?: number | null
    tutorial_id?: number | null
  }

  export type LearningPathProgressCreateManyUserInput = {
    id?: number
    learning_path_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProgressUpdateWithoutUserInput = {
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    concept?: ConceptExplanationUpdateOneWithoutUser_progressNestedInput
    tutorial?: TutorialUpdateOneWithoutUser_progressNestedInput
  }

  export type UserProgressUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    concept_id?: NullableIntFieldUpdateOperationsInput | number | null
    tutorial_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserProgressUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    concept_id?: NullableIntFieldUpdateOperationsInput | number | null
    tutorial_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LearningPathProgressUpdateWithoutUserInput = {
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    learning_path?: LearningPathUpdateOneRequiredWithoutLearning_paths_progressNestedInput
  }

  export type LearningPathProgressUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    learning_path_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathProgressUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    learning_path_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProgressCreateManyConceptInput = {
    id?: number
    user_id: number
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    tutorial_id?: number | null
  }

  export type UserProgressUpdateWithoutConceptInput = {
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUser_progressNestedInput
    tutorial?: TutorialUpdateOneWithoutUser_progressNestedInput
  }

  export type UserProgressUncheckedUpdateWithoutConceptInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorial_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserProgressUncheckedUpdateManyWithoutConceptInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    tutorial_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TutorialStepCreateManyTutorialInput = {
    id?: number
    title: string
    content: string
    code?: string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: number | null
    checkpoint?: boolean | null
    order: number
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExerciseCreateManyTutorialInput = {
    id?: number
    title: string
    description: string
    instructions: string
    starter_code?: string | null
    solution_code: string
    validation_tests: string
    hints?: ExerciseCreatehintsInput | string[]
    difficulty: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type QuizQuestionCreateManyTutorialInput = {
    id?: number
    question: string
    options?: QuizQuestionCreateoptionsInput | string[]
    correct_answer: number
    explanation: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserProgressCreateManyTutorialInput = {
    id?: number
    user_id: number
    content_type: string
    content_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    concept_id?: number | null
  }

  export type TutorialStepUpdateWithoutTutorialInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: NullableIntFieldUpdateOperationsInput | number | null
    checkpoint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutorialStepUncheckedUpdateWithoutTutorialInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: NullableIntFieldUpdateOperationsInput | number | null
    checkpoint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TutorialStepUncheckedUpdateManyWithoutTutorialInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    visual_aids?: NullableJsonNullValueInput | InputJsonValue
    estimated_time?: NullableIntFieldUpdateOperationsInput | number | null
    checkpoint?: NullableBoolFieldUpdateOperationsInput | boolean | null
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExerciseUpdateWithoutTutorialInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    starter_code?: NullableStringFieldUpdateOperationsInput | string | null
    solution_code?: StringFieldUpdateOperationsInput | string
    validation_tests?: StringFieldUpdateOperationsInput | string
    hints?: ExerciseUpdatehintsInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_solutions?: UserSolutionUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateWithoutTutorialInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    starter_code?: NullableStringFieldUpdateOperationsInput | string | null
    solution_code?: StringFieldUpdateOperationsInput | string
    validation_tests?: StringFieldUpdateOperationsInput | string
    hints?: ExerciseUpdatehintsInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_solutions?: UserSolutionUncheckedUpdateManyWithoutExerciseNestedInput
  }

  export type ExerciseUncheckedUpdateManyWithoutTutorialInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    instructions?: StringFieldUpdateOperationsInput | string
    starter_code?: NullableStringFieldUpdateOperationsInput | string | null
    solution_code?: StringFieldUpdateOperationsInput | string
    validation_tests?: StringFieldUpdateOperationsInput | string
    hints?: ExerciseUpdatehintsInput | string[]
    difficulty?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuizQuestionUpdateWithoutTutorialInput = {
    question?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correct_answer?: IntFieldUpdateOperationsInput | number
    explanation?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_answers?: UserQuizAnswerUpdateManyWithoutQuiz_questionNestedInput
  }

  export type QuizQuestionUncheckedUpdateWithoutTutorialInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correct_answer?: IntFieldUpdateOperationsInput | number
    explanation?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user_answers?: UserQuizAnswerUncheckedUpdateManyWithoutQuiz_questionNestedInput
  }

  export type QuizQuestionUncheckedUpdateManyWithoutTutorialInput = {
    id?: IntFieldUpdateOperationsInput | number
    question?: StringFieldUpdateOperationsInput | string
    options?: QuizQuestionUpdateoptionsInput | string[]
    correct_answer?: IntFieldUpdateOperationsInput | number
    explanation?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProgressUpdateWithoutTutorialInput = {
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutUser_progressNestedInput
    concept?: ConceptExplanationUpdateOneWithoutUser_progressNestedInput
  }

  export type UserProgressUncheckedUpdateWithoutTutorialInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    concept_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserProgressUncheckedUpdateManyWithoutTutorialInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    content_type?: StringFieldUpdateOperationsInput | string
    content_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    concept_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserSolutionCreateManyExerciseInput = {
    id?: number
    user_id: number
    code: string
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserSolutionUpdateWithoutExerciseInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSolutionUncheckedUpdateWithoutExerciseInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSolutionUncheckedUpdateManyWithoutExerciseInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuizAnswerCreateManyQuiz_questionInput = {
    id?: number
    user_id: number
    selected_option: number
    is_correct: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserQuizAnswerUpdateWithoutQuiz_questionInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    selected_option?: IntFieldUpdateOperationsInput | number
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuizAnswerUncheckedUpdateWithoutQuiz_questionInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    selected_option?: IntFieldUpdateOperationsInput | number
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserQuizAnswerUncheckedUpdateManyWithoutQuiz_questionInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    selected_option?: IntFieldUpdateOperationsInput | number
    is_correct?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathItemCreateManyLearning_pathInput = {
    id?: number
    item_type: string
    item_id: number
    order: number
    required?: boolean
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LearningPathProgressCreateManyLearning_pathInput = {
    id?: number
    user_id: number
    progress_percentage?: number
    completed?: boolean
    last_accessed?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type LearningPathItemUpdateWithoutLearning_pathInput = {
    item_type?: StringFieldUpdateOperationsInput | string
    item_id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathItemUncheckedUpdateWithoutLearning_pathInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_type?: StringFieldUpdateOperationsInput | string
    item_id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathItemUncheckedUpdateManyWithoutLearning_pathInput = {
    id?: IntFieldUpdateOperationsInput | number
    item_type?: StringFieldUpdateOperationsInput | string
    item_id?: IntFieldUpdateOperationsInput | number
    order?: IntFieldUpdateOperationsInput | number
    required?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathProgressUpdateWithoutLearning_pathInput = {
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutLearning_paths_progressNestedInput
  }

  export type LearningPathProgressUncheckedUpdateWithoutLearning_pathInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningPathProgressUncheckedUpdateManyWithoutLearning_pathInput = {
    id?: IntFieldUpdateOperationsInput | number
    user_id?: IntFieldUpdateOperationsInput | number
    progress_percentage?: IntFieldUpdateOperationsInput | number
    completed?: BoolFieldUpdateOperationsInput | boolean
    last_accessed?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}