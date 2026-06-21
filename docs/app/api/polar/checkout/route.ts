import { Checkout } from "@polar-sh/nextjs";

const polarServer =
  process.env.POLAR_SERVER === "production" ? "production" : "sandbox";

// Products are read from the `?products=` query param on each request
// (see `polarCheckoutUrl()` in `lib/polar.ts`). The handler is product-agnostic
// so we don't pass any product IDs into the config itself.
export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.POLAR_SUCCESS_URL ?? "/donate/thank-you",
  returnUrl: "/donate",
  server: polarServer,
  theme: "dark",
});
