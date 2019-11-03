import * as R from 'ramda'
import { Left } from './Left'
import { Right } from './Right'
import { Functor } from '../typing'
import { Maybe, Nothing, Just } from '../Maybe'

type _Either<L, R> = Left<L> | Right<R>

export class Either<L, R> implements Functor<R> {
  private constructor(private v: _Either<L, R>) {}

  get isLeft(): boolean {
    return this.v instanceof Left
  }

  get isRight(): boolean {
    return this.v instanceof Right
  }

  get leftValue(): Maybe<L> {
    return this.isLeft ? Just(this.v.value as L) : Nothing
  }

  get rightValue(): Maybe<R> {
    return this.isRight ? Just(this.v.value as R) : Nothing
  }

  static left<L, R>(value: L): Either<L, R> {
    return new Either<L, R>(Left.of(value))
  }

  static right<L, R>(value: R): Either<L, R> {
    return new Either<L, R>(Right.of(value))
  }

  map<U>(f: (_: R) => U): Either<L, U> {
    const ap = R.compose<R, U, Either<L, U>>(
      Either.right,
      f
    )

    return this.fold<Either<L, U>>(Either.left, ap)
  }

  fold<U>(fl: (_: L) => U, fr: (_: R) => U): U {
    if (this.isLeft) {
      return fl(this.v.value as L)
    }

    return fr(this.v.value as R)
  }
}
