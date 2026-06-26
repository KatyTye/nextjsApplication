# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: faillogin.spec.ts >> should fail at login form
- Location: tests\faillogin.spec.ts:3:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/admin
Call log:
  - navigating to "http://localhost:3000/admin", waiting until "load"

```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test'
  2 | 
  3 | test('should fail at login form', async ({ page }) => {
> 4 |   await page.goto('http://localhost:3000/admin')
    |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/admin
  5 |   await page.getByLabel("username").fill("Admin")
  6 |   await page.getByLabel("password").fill("4213")
  7 |   await page.click('text=Log Ind')
  8 |   await expect(page.locator('p:last-of-type')).toContainText('Invalid username or password.')
  9 | })
```