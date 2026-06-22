import { Checkout } from "@polar-sh/nextjs";
import { NextResponse } from "next/server";

// Products are read from the `?products=` query param on each request
// (see `polarCheckoutUrl()` in `lib/polar.ts`). The handler is product-agnostic
// so we don't pass any product IDs into the config itself.

const polarServer =
  process.env.POLAR_SERVER === "production" ? "production" : "sandbox";

// The Polar SDK calls `new URL(successUrl)` and `new URL(returnUrl)` on these,
// so they must be absolute URLs (origin + path). Falling back to a relative
// path (e.g. "/donate/thank-you") throws "Invalid URL" inside the SDK.
const baseUrl = process.env.POLAR_SUCCESS_URL
  ? new URL(process.env.POLAR_SUCCESS_URL).origin
  : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const innerCheckout = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: `${baseUrl}/donate/thank-you`,
  returnUrl: `${baseUrl}/donate`,
  server: polarServer,
  theme: "dark",
});

export const GET = async (request: Request) => {
  // Fail fast with a useful error if Polar isn't configured server-side.
  // Without this the SDK throws deep inside the request handler and the
  // browser just sees a generic 500.
  if (!process.env.POLAR_ACCESS_TOKEN) {
    console.error(
      "[polar/checkout] POLAR_ACCESS_TOKEN is not configured on the server",
    );
    return NextResponse.json(
      {
        error:
          "Polar.sh is not configured on this deployment. Set POLAR_ACCESS_TOKEN in your environment.",
      },
      { status: 503 },
    );
  }

  try {
    return await innerCheckout(request);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    console.error("[polar/checkout] failed:", message);
    return NextResponse.json(
      { error: "Failed to create Polar checkout session." },
      { status: 500 },
    );
  }
};
