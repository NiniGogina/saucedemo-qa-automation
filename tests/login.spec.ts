import path from "node:path";
import { expect, test } from "@playwright/test";
import { SAUCE_PASSWORD, allSauceUsers, loginUsers } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";
import { loginAsUser } from "../qa-library/auth";

test.describe("SauceDemo Login - POM + QA Library", () => {
  test.afterEach(async ({ page }, testInfo) => {
    const safeTitle = testInfo.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
    const screenshotPath = path.join(testInfo.outputDir, `${safeTitle}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach("final-state-screenshot", {
      path: screenshotPath,
      contentType: "image/png",
    });
  });

  test("all login page elements are visible", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.expectLoginElementsVisible();
  });

  test("standard_user logs in successfully", async ({ page }) => {
    await loginAsUser(page, loginUsers.standard, SAUCE_PASSWORD);
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator(".inventory_list")).toBeVisible();
  });

  test("locked_out_user sees expected error message", async ({ page }) => {
    await loginAsUser(page, loginUsers.lockedOut, SAUCE_PASSWORD);
    await expect(page).toHaveURL(/.*saucedemo\.com\/?$/);
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Sorry, this user has been locked out"
    );
  });

  test("problem_user logs in and shows broken inventory image behavior", async ({
    page,
  }) => {
    await loginAsUser(page, loginUsers.problem, SAUCE_PASSWORD);
    await expect(page).toHaveURL(/.*inventory\.html/);

    const imageDiagnostics = await page
      .locator(".inventory_item img")
      .evaluateAll((images) =>
        images.map((img) => ({
          src: (img as HTMLImageElement).src,
          naturalWidth: (img as HTMLImageElement).naturalWidth,
        }))
      );

    const hasBrokenImageSignal = imageDiagnostics.some(
      (img) => img.naturalWidth === 0 || img.src.includes("sl-404")
    );
    expect(hasBrokenImageSignal).toBeTruthy();
  });

  test("performance_glitch_user logs in with noticeable delay", async ({
    page,
  }) => {
    const started = Date.now();
    await loginAsUser(page, loginUsers.performanceGlitch, SAUCE_PASSWORD);
    await expect(page).toHaveURL(/.*inventory\.html/);
    const elapsedMs = Date.now() - started;
    expect(elapsedMs).toBeGreaterThan(2000);
  });

  test("error_user logs in and shows known unstable UI signals", async ({
    page,
  }) => {
    await loginAsUser(page, loginUsers.error, SAUCE_PASSWORD);
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator(".inventory_item")).toHaveCount(6);
    // Error user is expected to have flaky/broken behavior in flows, but login lands on inventory.
    await expect(page.locator(".shopping_cart_link")).toBeVisible();
  });

  test("visual_user logs in and inventory UI is rendered", async ({ page }) => {
    await loginAsUser(page, loginUsers.visual, SAUCE_PASSWORD);
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.locator(".inventory_list")).toBeVisible();
  });

  test("edge case - empty username and password shows required error", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.clearLoginFields();
    await loginPage.clickLogin();
    await loginPage.expectErrorMessageContains("Username is required");
  });

  test("edge case - all known users use same password", async () => {
    expect(allSauceUsers).toHaveLength(6);
    for (const username of allSauceUsers) {
      expect(username).toMatch(/_user$/);
    }
    expect(SAUCE_PASSWORD).toBe("secret_sauce");
  });
});
