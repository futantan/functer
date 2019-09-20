import { Just, Maybe, Nothing } from '../Maybe'
import { compose, inc, map, multiply, prop } from 'ramda'

test('Just should return value of Maybe type', () => {
  const just: Maybe<number> = Just(10)
  expect(just.value).toBe(10)
})

test('Just should throw error when value is considered nothing', () => {
  expect(() => Just(null)).toThrow()
  expect(() => Just(undefined)).toThrow()
})

test('Nothing should return Maybe of null', () => {
  const nothing: Maybe<number> = Nothing
  expect(nothing.value).toBe(null)
})

test('of should put value in Maybe', () => {
  const just = Maybe.of(123)
  expect(just.value).toBe(123)

  const nothing: Maybe<number> = Maybe.of<number>(null)
  expect(nothing.value).toBe(null)
})

test('isNothing should return true for Maybe of nothing', () => {
  const nothing1 = Maybe.of(null)
  expect(Maybe.isNothing(nothing1)).toBe(true)

  const nothing2 = Maybe.of(undefined)
  expect(Maybe.isNothing(nothing2)).toBe(true)
})

test('isNothing should return false for Maybe of Just', () => {
  const just = Maybe.of(123)
  expect(Maybe.isNothing(just)).toBe(false)
})

test('map should be able to map value in Maybe container', () => {
  const just1: Maybe<number> = Just(1)
  const result = just1.map(inc)
  expect(result.value).toBe(2)
})

test('map should return nothing if map on nothing', () => {
  const nothing: Maybe<number> = Nothing
  const result = nothing.map(inc)
  expect(Maybe.isNothing(result)).toBe(true)
})

test('map on Maybe should be able to use via map in ramda', () => {
  const incThenDouble = compose(
    multiply(2),
    inc
  )
  const result = incThenDouble(2)
  const result1 = Maybe.of(2).map(incThenDouble)
  const result2 = map(incThenDouble, Maybe.of(2)) as Maybe<number>
  expect(result).toBe(6)
  expect(result1.value).toBe(result)
  expect(result2.value).toBe(result)
})

test('ap should return nothing it is nothing', () => {
  const fn: Maybe<(v: number) => number> = Maybe.of(inc)
  const result = Nothing.ap(fn)
  expect(Maybe.isNothing(result)).toBe(true)
})

test('ap should apply function in maybe', () => {
  const just1 = Just(1)
  const fn = Maybe.of(inc)
  const result = just1.ap(fn)
  expect(result.value).toBe(2)
})

interface User {
  address?: { province?: string }
}
const getProvinceDesc = (province: string) =>
  province === 'earth' ? Maybe.of('small') : Nothing

test('chain with nothing', () => {
  const user: User = {}
  const desc = Maybe.of(user)
    .map(v => v.address)
    .map(v => v.province)
    .chain(getProvinceDesc)
  expect(Maybe.isNothing(desc)).toBe(true)
})

test('chain should get value out of context', () => {
  const user: User = { address: { province: 'earth' } }
  const desc = Maybe.of(user)
    .map(prop('address'))
    .map(prop('province'))
    .chain(getProvinceDesc)
  expect(desc.value).toBe('small')
})

test('getOrElse should return value in Maybe if not nothing', () => {
  const just = Just(123)
  const result = just.getOrElse(222)
  expect(result).toBe(123)
})

test('getOrElse should return default if Maybe is nothing', () => {
  const nothing = Maybe.of<number>(null)
  const result = nothing.getOrElse(123)
  expect(result).toBe(123)
})
