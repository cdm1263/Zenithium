import "server-only";

type GoogleCredentials = {
  client_email?: string;
  private_key?: string;
};

const getRequiredEnv = (name: string) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
};

export const getGoogleAnalyticsProperty = () =>
  getRequiredEnv("GOOGLE_ANALYTICS_PROPERTY");

export const getGoogleAnalyticsCredentials = (): GoogleCredentials => {
  const rawCredentials = getRequiredEnv("GOOGLE_APPLICATION_CREDENTIALS");

  try {
    const parsed = JSON.parse(rawCredentials) as GoogleCredentials;

    if (!parsed.client_email || !parsed.private_key) {
      throw new Error("Google credentials are missing required fields.");
    }

    return parsed;
  } catch (error) {
    throw new Error(
      `Invalid GOOGLE_APPLICATION_CREDENTIALS value: ${
        error instanceof Error ? error.message : "unknown error"
      }`
    );
  }
};

export const getGitHubToken = () => process.env.GITHUB_TOKEN || "";
