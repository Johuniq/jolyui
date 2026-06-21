import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET ?? "",
  onPayload: async (payload) => {
    // eslint-disable-next-line no-console
    console.info("[polar] webhook received", payload.type);
  },
  onOrderPaid: async (payload) => {
    // eslint-disable-next-line no-console
    console.info("[polar] order paid", {
      orderId: payload.data.id,
      amount: payload.data.total_amount,
      currency: payload.data.currency,
      productId: payload.data.product_id,
    });
  },
  onSubscriptionActive: async (payload) => {
    // eslint-disable-next-line no-console
    console.info("[polar] subscription active", {
      subscriptionId: payload.data.id,
      status: payload.data.status,
      productId: payload.data.product_id,
    });
  },
  onSubscriptionCanceled: async (payload) => {
    // eslint-disable-next-line no-console
    console.info("[polar] subscription canceled", {
      subscriptionId: payload.data.id,
    });
  },
});
