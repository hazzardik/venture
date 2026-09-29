window.BIZONIQ_BILLING = {
  provider: "paddle",
  environment: "sandbox",
  clientToken: "",
  priceIds: {
    RUB: { monthly: "", yearly: "" },
    USD: { monthly: "", yearly: "" }
  },
  displayPrices: {
    RUB: { monthly: 99, yearly: 799 },
    USD: { monthly: 1.49, yearly: 11.99 }
  }
};
/*
  To enable checkout:
  1) Create Paddle recurring prices for both currencies:
     RUB: 99/month and 799/year.
     USD: $1.49/month and $11.99/year.
  2) Create a Paddle.js client-side token.
  3) Fill priceIds.RUB/USD and clientToken above.
  4) In Supabase Edge Function secrets set PADDLE_WEBHOOK_SECRET.
  5) For Customer Portal also set PADDLE_API_KEY and PADDLE_ENV.
  6) Webhook URL:
     https://qmjtmhtmbaseykmwttvn.supabase.co/functions/v1/paddle-webhook
*/