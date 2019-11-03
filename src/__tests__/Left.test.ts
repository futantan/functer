import { Left } from '../Either/Left'

test('should build a install when call of', () => {
  const val = Left.of('left')

  expect(val).toBeInstanceOf(Left)
  expect(val.value).toEqual('left')
})

test('should do nothing when call map', () => {
  const val = Left.of('left')

  val.map(() => 64)

  expect(val.value).toEqual('left')
})

test('should do nothing when call chain', () => {
  const val = Left.of('left')

  val.chain(() => Left.of(64))

  expect(val.value).toEqual('left')
})

test('should do nothing when call map', () => {
  const val = Left.of('left')

  val.ap(Left.of(() => 64))

  expect(val.value).toEqual('left')
})
