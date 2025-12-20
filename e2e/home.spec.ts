import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Portfolio/);
});

test('hero section renders', async ({ page }) => {
    await page.goto('/');

    // Check for hero text
    await expect(page.getByRole('heading', { name: "Financial Systems Engineer & Full Stack Developer" })).toBeVisible();
});

test('contact form is present', async ({ page }) => {
    await page.goto('/');

    // Check for contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    // Check for inputs
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
});
