import { Either } from '../Either/Either'
import { inc } from 'ramda'

test('right should build a right value in either', () => {
  const val = Either.right('rightValue')

  expect(val.isRight).toBe(true)
  expect(val.isLeft).toBe(false)
})

test('left should build a left value in either', () => {
  const val = Either.left('leftValue')

  expect(val.isRight).toBe(false)
  expect(val.isLeft).toBe(true)
})

test('leftValue should be 1 when it value exists', () => {
  const val = Either.left(1)
  expect(val.leftValue.value).toBe(1)
})

test('leftValue should be nothing when value exists', () => {
  const val = Either.right(1)
  expect(val.leftValue.value).toBe(null)
})

test('rightValue should be 2 when it value exists', () => {
  const val = Either.right(2)
  expect(val.rightValue.value).toBe(2)
})

test('rightValue should be nothing when value exists', () => {
  const val = Either.left(2)
  expect(val.rightValue.value).toBe(null)
})

test('map should be apply to either when value is right', () => {
  const val = Either.right(2)
  const v = val.map(inc)
  expect(v.rightValue.value).toBe(3)
})

test('map should not be apply to either when value is left', () => {
  const val = Either.left<string, number>('some errors occurred')
  const v = val.map(inc)
  expect(v.rightValue.value).toBe(null)
  expect(v.leftValue.value).toEqual('some errors occurred')
})
