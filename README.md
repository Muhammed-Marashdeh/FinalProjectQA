# HTU Final Project – Software Testing & QA

## Overview
This repository contains the complete **Software Testing & Quality Assurance final project** for the HTU ICT Upskilling Program.

The project demonstrates a **full QA testing lifecycle** applied to a retail demo system, covering:
- Manual testing & defect reporting
- API testing and automation (**Postman + Newman**)
- **Data-driven API testing** using CSV datasets
- API **performance testing** using **k6**
- UI automation (**Selenium Java**)
- Reports and presentation materials
- CI workflows using **GitHub Actions**

The goal of this project is not only to test functionality, but to apply **industry-aligned QA practices** with clear structure, automation, and evidence.

---

## System Under Test (SUT)
- **Web UI:** SauceDemo (Retail demo web application)
- **Backend API:** DummyJSON (REST API for auth, products, carts, users)

> All testing was performed using **test data only** in a non-production environment.

---

## Project Structure
FinalProjectQA/
│
├── .github/workflows/
├── 01-Planning/
├── 02-Manual-Testing/
├── 03-API-Postman/
├── 04-API-Performance-k6/
├── 05-UI-Automation/
├── 06-Report/
└── 07-Presentation/


---

## Test Types & Tools

### 1) Test Planning
- Defined scope, assumptions, risks, entry/exit criteria, and overall testing strategy.
- Focused on high-usage and high-risk retail user flows.

📁 Location: `01-Planning/`  
📄 File: `TEST PLAN.docx`

---

### 2) Manual Testing
- Designed and executed **21 manual test cases**
- Covered positive + negative scenarios
- Defects documented with severity/priority and clear steps to reproduce

📁 Location: `02-Manual-Testing/`  
📄 Files:
- `Test-Cases.xlsx`
- `Bug Report.xlsx`

---

### 3) API Testing (Postman + Newman)
#### Scope
- Authentication
- Products (CRUD + validation)
- Carts
- Users
- Positive & negative scenarios

#### Key Practices
- Environment variables
- Automated assertions (status code + key fields)
- Request chaining
- HTML reporting via Newman
- **Data-driven testing using CSV files**

📁 Location: `03-API-Postman/`  
📄 Files:
- `FinalProjectApiTest.json` (Postman collection)
- `DummyJson.postman_environment.json` (environment)
- `products_datadriven.csv` (data-driven file)
- `Run Script.txt` (Newman command)
- `newman-report.html` (HTML report)

---

### 4) Data-Driven API Testing
Data-driven testing was applied to selected API scenarios using **CSV datasets**, executed through Postman Runner and Newman.

Benefits:
- Increased coverage
- Better reusability
- Higher stability and repeatability

📁 Location: `03-API-Postman/`  
📄 File: `products_datadriven.csv`

---

### 5) CI – API Automation (Newman)
Functional API tests are executed automatically using **Newman** via **GitHub Actions**.

#### CI Behavior
- Trigger: On push to `main` (or as configured)
- Outcome: Automatic pass/fail feedback
- Reports can be uploaded as workflow artifacts (if enabled)

📁 Location: `.github/workflows/`

---

### 6) API Performance Testing (k6)
#### Objectives
- Measure API responsiveness and stability
- Validate performance under load
- Identify potential bottlenecks

#### Test Profiles
- Smoke Test
- Load Test

#### Metrics Observed
- Response time (p95)
- Error rate
- Throughput

📁 Location: `04-API-Performance-k6/`  
📄 File: `K6Testing.js`

---

### 7) CI – Performance Testing (k6)
Performance tests are executed via a **separate CI workflow**.

#### Design Decision
Performance tests are isolated from functional tests because:
- They are heavier and longer running
- They can be non-deterministic
- They should not block every code change

📁 Location: `.github/workflows/`

---

## CI Architecture Summary

| Layer | Tool | Execution |
|------|------|-----------|
| Functional API Tests | Postman + Newman | On push (CI) |
| Performance Tests | k6 | Separate workflow |
| Manual Testing | Excel-based | Pre-automation |
| UI Automation | Selenium (Java) | Selective coverage |

---

## How to Run Tests Locally

### 1) Run API Tests (Newman)
Go to:
03-API-Postman/


Run:
```bash
newman run FinalProjectApiTest.json ^
  -e DummyJson.postman_environment.json ^
  -d products_datadriven.csv ^
  -r htmlextra ^
  --reporter-htmlextra-export newman-report.html
```
If htmlextra is not installed:
```bash
npm install -g newman-reporter-htmlextra
```
✅ Output:

03-API-Postman/newman-report.html
---
2) Run API Performance Tests (k6)

Go to:

04-API-Performance-k6/


Run:

k6 run K6Testing.js
---
3) Run UI Automation Tests

Go to:

05-UI-Automation/


Follow the instructions inside:

05-UI-Automation/README.md
---
Reporting & Evidence

All evidence is included in the repository and referenced in the final report:

Manual test cases + execution: 02-Manual-Testing/

Defect log: 02-Manual-Testing/

Newman HTML report: 03-API-Postman/newman-report.html

k6 results: 04-API-Performance-k6/

Final report: 06-Report/

Presentation: 07-Presentation/
---
Key Takeaways

Applied a layered QA strategy (planning → manual → API automation → performance → UI automation)

Implemented data-driven API automation using CSV datasets

Generated readable automation reporting via Newman HTML reports

Integrated CI workflows using GitHub Actions

Followed real-world QA structure and best practices
---
Author

Muhammed-Marashdeh
HTU – ICT Upskilling Program
Software Testing & Quality Assurance Track
---
