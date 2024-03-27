import { expect, test } from 'vitest'
import Bank from '@/app/model/bank'

const bank = Bank.instance()

test('deposit 10,000', () => {
  expect(bank.deposit(10000)).toBe(10000)
})

test('with draw 5000', () => {
    expect(bank.withdraw(3000)).toBe(7000)
  })


test('check balance ', () => {
    expect(bank.balance).toBe(7000)
  })

  test('max deposit limit', () => {
    expect(bank.deposit(60000)).toBe(7000)
  })


  test('max withdraw limit', () => {
    expect(bank.deposit(30000)).toBe(7000)
  })


