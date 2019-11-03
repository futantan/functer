export class Box<T> {
  constructor(private v: T) {}

  get value(): T {
    return this.v
  }
}
