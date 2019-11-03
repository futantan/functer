import { Box } from './Box'
import { Monad } from '..'

export class Right<T> extends Box<T> implements Omit<Monad<T>, 'of'> {
  static of<T>(value: T): Right<T> {
    return new Right(value)
  }

  map<U>(f: (x: T) => U): Right<U> {
    return Right.of<U>(f(this.value))
  }

  ap<U>(f: Right<(v: T) => U>): Right<U> {
    return this.map<U>(f.value)
  }

  chain<U>(f: (v: T) => Right<U>): Right<U> {
    return f(this.value)
  }
}
