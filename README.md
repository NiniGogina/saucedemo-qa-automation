# SauceDemo QA Automation (Playwright + TypeScript)

SauceDemo QA Automation project built with Playwright and TypeScript, focused on validating login scenarios using the Page Object Model approach.

## Technologies Used

- Playwright
- TypeScript
- Page Object Model (POM)
- HTML Reporter

## Project Structure

- `pages/LoginPage.ts` - page object for the login page
- `data/loginUsers.ts` - all 6 SauceDemo users + shared password constant
- `qa-library/auth.ts` - reusable `loginAsUser(username, password)` helper
- `tests/login.spec.ts` - positive, negative and edge login scenarios
- `playwright.config.ts` - Playwright config and browser project setup

## Installation

```bash
npm install
npx playwright install chromium
```

## How to Run Tests

```bash
npm test
```

Optional commands:

```bash
npm run test:headed
npm run test:ui
```

## How to View the Report

```bash
npm run report
```

Then open the generated HTML report in your browser.

## Covered users

- `standard_user`
- `locked_out_user`
- `problem_user`
- `performance_glitch_user`
- `error_user`
- `visual_user`

All users use password: `secret_sauce`.