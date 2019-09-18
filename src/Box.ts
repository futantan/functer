import { Functor } from './typing'

class Box<T> implements Functor<T> {
  constructor(private value: T) {}

  of<T>(value: T) {
    return new Box(value)
  }

  map<U>(f: (x: T) => U): Box<U> {
    return new Box(f(this.value))
  }

  toString() {
    return `Box(${String(this.value)})`
  }
}

export default Box
