# Mortgage Calculator

A responsive, frontend-only **Mortgage Calculator** built with vanilla HTML, CSS, and JavaScript.
Supports **Fixed**, **Adjustable (ARM)**, and **Interest-Only** mortgages, includes **Loan-to-Value (LTV)** calculation, and provides a built-in **test harness** with sample data.

---

## ✨ Features
* **Mortgage Types**
  * Fixed
  * Adjustable (ARM)
  * Interest-Only (with balloon payment note)
* **Calculations**
  * Monthly Payment
  * Total Payment
  * Total Interest
  * Loan-to-Value (LTV) ratio (if property value is provided)
* **Scenario Runner**
  * Validate against multiple loan scenarios with one click
* **Sharing**
  * Copy a link with pre-filled inputs via query parameters
* **Responsive UI**
  * Mobile-friendly, accessible form and results

---

## 📐 Formulas Used
* **Monthly Payment (Fixed/ARM)**
  $$
  M = \frac{P \times r}{1 - (1 + r)^{-n}}
  $$
  where:
  * $P$ = loan amount
  * $r$ = monthly interest rate (`annualRate / 12 / 100`)
  * $n$ = total payments in months (`termYears * 12`)
  
* **Interest-Only**
  $$
  M = P \times r
  $$
  Balloon payment: original loan $P$ due at the end.

* **LTV (Loan-to-Value)**
  $$
  LTV = \frac{Loan}{PropertyValue} \times 100\%
  $$

---

## 📊 Sample Data (Validation Scenarios)
| Loan (£) | Rate (%) | Term (years) | Type          | Expected Behavior            |
| -------- | -------- | ------------ | ------------- | ---------------------------- |
| 100,000  | 5        | 30           | Fixed         | Standard case                |
| 200,000  | 3.5      | 15           | Adjustable    | Lower rate, shorter term     |
| 150,000  | 4.5      | 30           | Interest-Only | Balloon payment              |
| 120,000  | 0        | 20           | Fixed         | Zero interest, payment = P/n |
| 300,000  | 6        | 25           | Adjustable    | Higher rate, longer term     |

---

Would you like me to also include a **screenshots / demo GIF section** in the README (so it looks professional on GitHub/Azure), or keep it lightweight text-only?
