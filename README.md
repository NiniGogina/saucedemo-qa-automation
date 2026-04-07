# SauceDemo QA Automation (Playwright + TypeScript)

Playwright TypeScript project using the Page Object Model for the SauceDemo login page only.

## Project structure

- `pages/LoginPage.ts` - page object for the login page
- `data/loginUsers.ts` - all 6 SauceDemo users + shared password constant
- `qa-library/auth.ts` - reusable `loginAsUser(username, password)` helper
- `tests/login.spec.ts` - positive, negative and edge login scenarios
- `playwright.config.ts` - Playwright config and browser project setup

## Install

```bash
npm install
npx playwright install chromium
```

## Run tests

```bash
npm test
```

Other options:

```bash
npm run test:headed
npm run test:ui
npm run report
```

## Covered users

- `standard_user`
- `locked_out_user`
- `problem_user`
- `performance_glitch_user`
- `error_user`
- `visual_user`

All users use password: `secret_sauce`.