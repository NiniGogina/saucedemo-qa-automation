export const SAUCE_PASSWORD = "secret_sauce";

export const loginUsers = {
  standard: "standard_user",
  lockedOut: "locked_out_user",
  problem: "problem_user",
  performanceGlitch: "performance_glitch_user",
  error: "error_user",
  visual: "visual_user",
} as const;

export const allSauceUsers = [
  loginUsers.standard,
  loginUsers.lockedOut,
  loginUsers.problem,
  loginUsers.performanceGlitch,
  loginUsers.error,
  loginUsers.visual,
] as const;
