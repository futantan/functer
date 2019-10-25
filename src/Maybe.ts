import { Monad } from './typing'

let never: never

export class Maybe<T> implements Omit<Monad<T>, 'of'> {
  static isNothing<T>(m: Maybe<T>) {
    return m.value == null
  }

  static Just<T>(value: T) {
    if (value == null) {
      throw Error('Provided value must not be considered nothing')
    }
    return new Maybe(value)
  }

  static get Nothing() {
    return new Maybe<never>(null)
  }

  static of<T>(value: T | null): Maybe<T> {
    return value == null ? Maybe.Nothing : Maybe.Just<T>(value)
  }

  private constructor(private v: T | null) {}

  map<U>(f: (x: NonNullable<T>) => U): Maybe<U> {
    return this.v == null ? Maybe.Nothing : Maybe.of<U>(f(this.v!))
  }

  ap<U>(f: Maybe<(v: T) => U>): Maybe<U> {
    return f == null ? Maybe.Nothing : this.map<U>(f.getOrElse(never))
  }

  chain<U>(f: (v: NonNullable<T>) => Maybe<U>): Maybe<U> {
    return this.v == null ? Maybe.Nothing : f(this.v!)
  }

  getOrElse(defaultValue: T): T {
    return this.v == null ? defaultValue : this.v
  }

  get value(): T | null {
    return this.v
  }
}

export const Just = Maybe.Just
export const Nothing = Maybe.Nothing
