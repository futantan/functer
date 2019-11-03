import { Either } from '../Either/Either'

test('right should build a right value in either', () => {
  const val = Either.right('rightValue')

  expect(val.isRight).toBe(true)
  expect(val.isLeft).toBe(false)
})

test('right should build a left value in either', () => {
  const val = Either.left('leftValue')

  expect(val.isRight).toBe(false)
  expect(val.isLeft).toBe(true)
})
