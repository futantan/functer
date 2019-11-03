import { inc } from 'ramda'
import { Right } from '../Either/Right'

test('should build a right type when call of', () => {
  const val = Right.of('Right')

  expect(val).toBeInstanceOf(Right)
  expect(val.value).toEqual('Right')
})

test('map should be able to map value in Right container', () => {
  const right: Right<number> = Right.of(1)
  const result = right.map(inc)
  expect(result.value).toBe(2)
})

test('ap should apply function in maybe', () => {
  const right = Right.of(1)
  const fn = Right.of(inc)
  const result = right.ap(fn)
  expect(result.value).toBe(2)
})

test('ap should apply function in maybe', () => {
  const right = Right.of(1)
  const fn = (a: number) => Right.of(`current value is: ${a}`)
  const result = right.chain(fn)
  expect(result.value).toEqual('current value is: 1')
})
