import * as R from 'ramda'
import { Left } from './Left'
import { Right } from './Right'
import { Monad } from '../typing'
import { Maybe, Nothing, Just } from '../Maybe'

type _Either<L, R> = Left<L> | Right<R>

export class Either<L, R> implements Omit<Monad<R>, 'of'> {
  private constructor(private v: _Either<L, R>) {}

  get isLeft(): boolean {
    return this.v instanceof Left
  }

  get isRight(): boolean {
    return this.v instanceof Right
  }

  get leftValue(): Maybe<L> {
    return this.isLeft ? Just(this.leftValueF) : Nothing
  }

  get rightValue(): Maybe<R> {
    return this.isRight ? Just(this.rightValueF) : Nothing
  }

  private get leftValueF(): L {
    return this.v.value as L
  }

  private get rightValueF(): R {
    return this.v.value as R
  }

  static left<L, R = never>(value: L): Either<L, R> {
    return new Either<L, R>(Left.of(value))
  }

  static right<R, L = never>(value: R): Either<L, R> {
    return new Either<L, R>(Right.of(value))
  }

  map<U>(f: (_: R) => U): Either<L, U> {
    const ap = R.compose<R, U, Either<L, U>>(
      Either.right,
      f
    )

    return this.fold<Either<L, U>>(Either.left, ap)
  }

  chain<U>(f: (_: R) => Either<L, U>): Either<L, U> {
    return this.fold<Either<L, U>>(Either.left, f)
  }

  ap<U>(f: Either<never, (_: R) => U>): Either<L, U> {
    const ap = R.compose<R, U, Either<L, U>>(
      Either.right,
      f.rightValueF
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
