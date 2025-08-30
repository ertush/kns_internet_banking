// ============================
// Transaction Rules
// ============================
const RULES = {
  DEPOSIT: {
    MAX_PER_TRANSACTION: 40000,
    MAX_PER_DAY: 150000,
    MAX_FREQUENCY: 4,
  },
  WITHDRAWAL: {
    MAX_PER_TRANSACTION: 20000,
    MAX_PER_DAY: 50000,
    MAX_FREQUENCY: 3,
  },
};

// ============================
// Bank Class
// ============================
class BankType {
  constructor(initialBalance = 0) {
    this.balance = initialBalance;
    this.deposits = [];
    this.withdrawals = [];
    this.error = null;
  }

  /**
   * Deposit funds
   * @param {number} amount
   * @return {number} Updated balance
   */
  deposit(amount) {
    this.error = null;
    if (!this.#validateTransaction("DEPOSIT", amount)) {
      return this.balance;
    }

    this.balance += amount;
    if (amount !== 0) this.deposits.push(amount);
    return this.balance;
  }

  /**
   * Withdraw funds
   * @param {number} amount
   * @return {number} Updated balance
   */
  withdraw(amount) {
    this.error = null;

    if (amount > this.balance) {
      this.error = "Your balance is insufficient";
      return this.balance;
    }

    if (!this.#validateTransaction("WITHDRAWAL", amount)) {
      return this.balance;
    }

    this.balance -= amount;
    if (amount !== 0) this.withdrawals.push(amount);
    return this.balance;
  }
  /**
   * Private method: Validate transaction against rules
   * @param {"DEPOSIT"|"WITHDRAWAL"} type
   * @param {number} amount
   * @return {boolean} valid or not
   */
  #validateTransaction(type, amount) {
    const rules = RULES[type];
    const transactions = type === "DEPOSIT" ? this.deposits : this.withdrawals;

    // check amount
    if (amount <= 0) {
      this.error = `Invalid ${type.toLowerCase()} amount`;
      return false;
    }

    // Rule 1: Max per transaction
    if (amount > rules.MAX_PER_TRANSACTION) {
      this.error = `You have exceeded the maximum ${type.toLowerCase()} amount per transaction`;
      return false;
    }

    // Rule 2: Max frequency
    if (transactions.length >= rules.MAX_FREQUENCY) {
      this.error = `You have exceeded the maximum number of ${type.toLowerCase()} transactions per day`;
      return false;
    }

    // Rule 3: Max per day
    const todayTotal = this.#getTotal(transactions);
    if (todayTotal + amount > rules.MAX_PER_DAY) {
      this.error = `You have exceeded the maximum ${type.toLowerCase()} amount for the day`;
      return false;
    }

    return true;
  }

  /**
   * Utility: Get total of transactions
   * @param {Array<number>} transactions
   * @return {number}
   */
  #getTotal(transactions) {
    return transactions.reduce((sum, value) => sum + value, 0);
  }

  /**
   * Reset daily counters (to be called once a day if needed)
   */
  resetBank() {
    this.balance = 0;
    this.deposits = [];
    this.withdrawals = [];
    this.error = null;
    this.lastResetDate = new Date().toDateString();

    return {
      success: true,
      balance: this.balance,
      error: null,
    };
  }
}

// ============================
// Singleton Bank Instance
// ============================
const Bank = (function () {
  let instance;

  function createInstance() {
    return new BankType();
  }

  return {
    instance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export default Bank;
