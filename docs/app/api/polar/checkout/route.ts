import { Checkout } from "@polar-sh/nextjs";
import { NextResponse, type NextRequest } from "next/server";

// Products are read from the `?products=` query param on each request
// (see `polarCheckoutUrl()` in `lib/polar.ts`). The handler is product-agnostic
// so we don't pass any product IDs into the config itself.

const polarServer =
  process.env.POLAR_SERVER === "production" ? "production" : "sandbox";

// Resolve an absolute origin at request-time, not module-load. At build time
// (e.g. Vercel page-data collection) env vars like POLAR_SUCCESS_URL may be
// missing, so we must avoid `new URL(undefined)` at the top level. The Polar
// SDK calls `new URL(successUrl)` and `new URL(returnUrl)` on these values,
// so they must always be absolute (origin + path).
function resolveOrigin(request: Request): string {
  const fromEnv =
    process.env.POLAR_SUCCESS_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  if (fromEnv && fromEnv.length > 0) {
    try {
      return new URL(fromEnv).origin;
    } catch {
      // fall through to the request-derived origin
    }
  }
  // Derive from the incoming request (works for both Vercel preview URLs
  // and localhost dev) as a final, never-fails fallback.
  return new URL(request.url).origin;
}

export const GET = async (request: NextRequest) => {
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

  const origin = resolveOrigin(request);

  // Build a fresh handler per request so URL parsing is always against a
  // current, absolute origin — no module-eval-time work.
  const checkout = Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    successUrl: `${origin}/donate/thank-you`,
    returnUrl: `${origin}/donate`,
    server: polarServer,
    theme: "dark",
  });

  try {
    return await checkout(request);
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
