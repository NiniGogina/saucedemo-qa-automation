import { type Locator, type Page, expect } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly errorCloseButton: Locator;
  readonly loginLogo: Locator;
  readonly acceptedUsernamesText: Locator;
  readonly passwordHintText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#user-name");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#login-button");
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorCloseButton = page.locator('[data-test="error-button"]');
    this.loginLogo = page.locator(".login_logo");
    this.acceptedUsernamesText = page.locator("#login_credentials");
    this.passwordHintText = page.locator(".login_password");
  }

  async goto(): Promise<void> {
    await this.page.goto("/");
    await expect(this.usernameInput).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async clearLoginFields(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async getErrorMessageText(): Promise<string | null> {
    return this.errorMessage.textContent();
  }

  async expectErrorMessageContains(text: string): Promise<void> {
    await expect(this.errorMessage).toContainText(text);
  }

  async expectLoginElementsVisible(): Promise<void> {
    await expect(this.loginLogo).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.acceptedUsernamesText).toBeVisible();
    await expect(this.passwordHintText).toBeVisible();
  }
}
