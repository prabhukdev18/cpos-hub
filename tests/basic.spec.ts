import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/CPOS Hub/);
});

test('login screen loaded by default', async ({ page }) => {
  await page.goto('/');

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('button', { name: 'Forgot your password?' })).toBeVisible();
});
