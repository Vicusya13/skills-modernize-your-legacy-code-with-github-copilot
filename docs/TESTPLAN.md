# Test Plan - Student Account Management System

Test plan for validating the business logic of the COBOL application. The same cases will be used to verify the Node.js conversion.

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
|---|---|---|---|---|---|---|---|
| TC-01 | View current balance | App started, balance 1000.00 | 1. Select option 1 | Current balance: 1000.00 |  |  |  |
| TC-02 | Credit a valid amount | Balance 1000.00 | 1. Select option 2<br>2. Enter 100.00 | Amount credited. New balance: 1100.00 |  |  |  |
| TC-03 | Credit zero | Balance 1000.00 | 1. Select option 2<br>2. Enter 0 | Balance stays 1000.00 |  |  |  |
| TC-04 | Debit a valid amount | Balance 1000.00 | 1. Select option 3<br>2. Enter 50.00 | Amount debited. New balance: 950.00 |  |  |  |
| TC-05 | Debit the full balance | Balance 1000.00 | 1. Select option 3<br>2. Enter 1000.00 | Amount debited. New balance: 0.00 |  |  |  |
| TC-06 | Debit more than the balance | Balance 1000.00 | 1. Select option 3<br>2. Enter 2000.00 | Insufficient funds for this debit. Balance stays 1000.00 |  |  |  |
| TC-07 | Balance reflects previous operations | Balance 1000.00 | 1. Credit 200.00<br>2. Debit 50.00<br>3. Select option 1 | Current balance: 1150.00 |  |  |  |
| TC-08 | Invalid menu choice | App started | 1. Enter 9 | Invalid choice, please select 1-4. Menu is shown again |  |  |  |
| TC-09 | Exit the application | App started | 1. Select option 4 | Exiting the program. Goodbye! Program ends |  |  |  |
