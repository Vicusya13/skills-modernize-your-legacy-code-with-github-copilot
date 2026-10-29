#!/usr/bin/env node
/**
 * Account Management System - Node.js port of the legacy COBOL app.
 *
 * Mapping from the original COBOL programs:
 *   - data.cob       -> DataStore      (READ / WRITE of the stored balance)
 *   - operations.cob -> Operations     (TOTAL, CREDIT, DEBIT)
 *   - main.cob       -> main()         (interactive menu loop)
 *
 * Business rules preserved from COBOL:
 *   - Starting balance is 1000.00
 *   - Credit adds the amount to the balance
 *   - Debit only succeeds when balance >= amount ("Insufficient funds" otherwise)
 */

const readline = require("readline/promises");

const INITIAL_BALANCE = 1000.0;

// data.cob: holds the balance and supports READ / WRITE
class DataStore {
  constructor(initialBalance = INITIAL_BALANCE) {
    this.storageBalance = initialBalance;
  }

  read() {
    return this.storageBalance;
  }

  write(balance) {
    this.storageBalance = balance;
  }
}

const formatAmount = (value) => value.toFixed(2);

function parseAmount(input) {
  const amount = Number.parseFloat(input);
  if (!Number.isFinite(amount) || amount < 0) {
    return null;
  }
  return Math.round(amount * 100) / 100;
}

// operations.cob: TOTAL, CREDIT and DEBIT operations
class Operations {
  constructor(dataStore) {
    this.dataStore = dataStore;
  }

  total() {
    return this.dataStore.read();
  }

  credit(amount) {
    const newBalance = this.dataStore.read() + amount;
    this.dataStore.write(newBalance);
    return newBalance;
  }

  debit(amount) {
    const balance = this.dataStore.read();
    if (balance < amount) {
      return { ok: false, balance };
    }
    const newBalance = balance - amount;
    this.dataStore.write(newBalance);
    return { ok: true, balance: newBalance };
  }
}

// main.cob: interactive menu loop
async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const operations = new Operations(new DataStore());
  let continueFlag = true;

  while (continueFlag) {
    console.log("--------------------------------");
    console.log("Account Management System");
    console.log("1. View Balance");
    console.log("2. Credit Account");
    console.log("3. Debit Account");
    console.log("4. Exit");
    console.log("--------------------------------");
    const choice = (await rl.question("Enter your choice (1-4): ")).trim();

    switch (choice) {
      case "1":
        console.log(`Current balance: ${formatAmount(operations.total())}`);
        break;
      case "2": {
        const amount = parseAmount(await rl.question("Enter credit amount: "));
        if (amount === null) {
          console.log("Invalid amount.");
          break;
        }
        const balance = operations.credit(amount);
        console.log(`Amount credited. New balance: ${formatAmount(balance)}`);
        break;
      }
      case "3": {
        const amount = parseAmount(await rl.question("Enter debit amount: "));
        if (amount === null) {
          console.log("Invalid amount.");
          break;
        }
        const result = operations.debit(amount);
        if (result.ok) {
          console.log(`Amount debited. New balance: ${formatAmount(result.balance)}`);
        } else {
          console.log("Insufficient funds for this debit.");
        }
        break;
      }
      case "4":
        continueFlag = false;
        break;
      default:
        console.log("Invalid choice, please select 1-4.");
    }
  }

  console.log("Exiting the program. Goodbye!");
  rl.close();
}

if (require.main === module) {
  main();
}

module.exports = { DataStore, Operations, parseAmount, INITIAL_BALANCE };
