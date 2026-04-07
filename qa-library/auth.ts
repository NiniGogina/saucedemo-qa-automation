import { type Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export async function loginAsUser(
  page: Page,
  username: string,
  password: string
): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
}
