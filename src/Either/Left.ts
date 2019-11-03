import { Box } from './Box'
import { Morphism } from '../typing'

export class Left<T> extends Box<T> {
  static of<T>(value: T): Left<T> {
    return new Left(value)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map<U>(f: Morphism<T, U>): Left<T> {
    return this
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ap<U>(f: Left<(v: T) => U>): Left<T> {
    return this
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  chain<U>(f: (v: T) => Left<U>): Left<T> {
    return this
  }
}
