import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should fail with invalid credentials', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Fill in invalid credentials
    const email = Math.random().toString(36).substring(2,7) + '@example.com';
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill('wrongpassword123');
    
    // Click sign in button
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    
    // Wait for and verify error message
    const errorMessage = await page.getByText('Incorrect username or password');
    await expect(errorMessage).toBeVisible();
  });
});
