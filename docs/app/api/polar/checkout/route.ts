import { Checkout } from "@polar-sh/nextjs";

const POLAR_PRODUCT_ID =
  process.env.POLAR_PRODUCT_ID ?? "782fc43d-4cae-4720-9570-84c3de5357ee";

const polarServer =
  process.env.POLAR_SERVER === "production" ? "production" : "sandbox";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.POLAR_SUCCESS_URL ?? "/donate/thank-you",
  returnUrl: "/donate",
  server: polarServer,
  theme: "dark",
  products: [POLAR_PRODUCT_ID],
});
