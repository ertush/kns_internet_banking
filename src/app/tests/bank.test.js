import { expect, test, beforeEach } from "vitest";
import Bank from "../model/bank.js";

let bank;

beforeEach(() => {
  // Create a fresh bank instance for each test
  bank = new Bank.instance();
  bank.resetBank();
});

test("deposit 10,000", () => {
  const result = bank.deposit(10000);
  expect(result).toBe(10000);
});

test("withdraw 5000", () => {
  bank.deposit(10000); // First deposit to have balance
  const result = bank.withdraw(5000);
  expect(result).toBe(5000);
});

test("check balance", () => {
  bank.deposit(10000);
  expect(bank.balance).toBe(10000);
});

test("max deposit limit per transaction", () => {
  bank.deposit(50000); // Over 40K limit
  expect(bank.error).toBe(
    "You have exceeded the maximum deposit amount per transaction",
  );
});

test("max withdrawal limit per transaction", () => {
  bank.deposit(40000); // First deposit to have balance
  bank.withdraw(25000); // Over 20K limit
  expect(bank.error).toBe(
    "You have exceeded the maximum withdrawal amount per transaction",
  );
});

test("insufficient balance", () => {
  bank.withdraw(1000); // No balance
  expect(bank.error).toBe("Your balance is insufficient");
});

test("daily deposit frequency limit", () => {
  // Make 4 deposits (max allowed)
  bank.deposit(1000);
  bank.deposit(1000);
  bank.deposit(1000);
  bank.deposit(1000);

  // 5th deposit should fail
  bank.deposit(1000);
  expect(bank.error).toBe(
    "You have exceeded the maximum number of deposit transactions per day",
  );
});

test("daily withdrawal frequency limit", () => {
  // Deposit 4 times (4 max allowed)
  bank.deposit(40000);
  bank.deposit(40000);
  bank.deposit(40000);
  bank.deposit(40000);

  // Make 3 withdrawals (3 max allowed)
  bank.withdraw(1000);
  bank.withdraw(1000);
  bank.withdraw(1000);

  // 4th withdrawal should fail
  bank.withdraw(1000);

  expect(bank.error).toBe(
    "You have exceeded the maximum number of withdrawal transactions per day",
  );
});

test("daily deposit amount limit", () => {
  // First make a small deposit to start the day
  bank.deposit(40000);
  bank.deposit(40000);
  bank.deposit(40000);

  // 4th deposit should fail total balance = 160000
  bank.deposit(40000);

  expect(bank.error).toBe(
    "You have exceeded the maximum deposit amount for the day",
  );
});

test("daily withdrawal amount limit", () => {
  // deposit ksh 120,000
  bank.deposit(40000);
  bank.deposit(40000);
  bank.deposit(40000);

  // make 2 withdrawals
  bank.withdraw(20000);
  bank.withdraw(20000);

  // 3rd withdrawal should fail max withdraw amount is 50,000 and current is 60,000
  bank.withdraw(20000);

  expect(bank.error).toBe(
    "You have exceeded the maximum withdrawal amount for the day",
  );
});

test("reset bank", () => {
  bank.deposit(10000);
  bank.resetBank();
  expect(bank.balance).toBe(0);
  expect(bank.error).toBe(null);
});
