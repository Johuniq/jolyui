/**
 * Helpers for Polar.sh checkout links.
 *
 * The `@polar-sh/nextjs` `Checkout` handler reads the product(s) from the
 * `?products=` query string on every request, so any `<Link>` that points at
 * `/api/polar/checkout` must include the configured product id(s).
 */
export const POLAR_PRODUCT_ID =
  process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID ??
  process.env.POLAR_PRODUCT_ID ??
  "782fc43d-4cae-4720-9570-84c3de5357ee";

export const POLAR_CHECKOUT_PATH = "/api/polar/checkout";

/**
 * Build a checkout URL pointing at the configured Polar product. Pass extra
 * Polar query params (e.g. `customerEmail`) as the second argument.
 */
export function polarCheckoutUrl(
  extra?: Record<string, string | undefined>,
): string {
  const params = new URLSearchParams();
  params.set("products", POLAR_PRODUCT_ID);
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      if (value !== undefined && value !== "") params.set(key, value);
    }
  }
  return `${POLAR_CHECKOUT_PATH}?${params.toString()}`;
}
