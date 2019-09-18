export interface Functor<T> {
  map<U>(f: (x: T) => U): Functor<U>
}

export interface Monad<T> extends Functor<T> {}
