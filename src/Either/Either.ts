import * as R from 'ramda'
import { Left } from './Left'
import { Right } from './Right'

type _Either<L, R> = Left<L> | Right<R>

export class Either<L, R> {
  private constructor(private v: _Either<L, R>) {}

  get isLeft(): boolean {
    return this.v instanceof Left
  }

  get isRight(): boolean {
    return this.v instanceof Right
  }

  static left<L, R>(value: L): Either<L, R> {
    return new Either<L, R>(Left.of(value))
  }

  static right<L, R>(value: R): Either<L, R> {
    return new Either<L, R>(Right.of(value))
  }
}
