export type Morphism<T, U> = (value: T) => U

export interface Functor<T> {
  map<U>(fn: Morphism<T, U>): Functor<U>
}

export interface Apply<T> extends Functor<T> {
  ap<U>(fn: Apply<Morphism<T, U>>): Apply<U>
}

export interface Applicative<T> extends Apply<T> {
  of<U>(value: U): Applicative<U>
}

export interface Chain<T> extends Apply<T> {
  chain<U>(fn: (t: T) => Chain<U>): Chain<U>
}

export interface Monad<T> extends Applicative<T>, Chain<T> {}
