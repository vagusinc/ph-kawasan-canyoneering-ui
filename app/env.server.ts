export function getEnv() {
  if (
    !process.env.STRAPI_API_KEY ||
    !process.env.STRAPI_API_URL ||
    !process.env.PAYPAL_CLIENT_ID
  )
    throw new Error("Missing environment variables.");

  return {
    NODE_ENV: process.env.NODE_ENV || "development",
    STRAPI_API_KEY: process.env.STRAPI_API_KEY,
    STRAPI_API_URL: process.env.STRAPI_API_URL,
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  };
}

type ENV = ReturnType<typeof getEnv>;

declare global {
  let ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
