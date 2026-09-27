window.BIZONIQ_BILLING = {
  provider: "paddle",
  environment: "sandbox",
  clientToken: "",
  monthlyPriceId: "",
  yearlyPriceId: "",
  monthlyRub: 99,
  yearlyRub: 799
};
/*
  To enable checkout:
  1) Create a Paddle sandbox account.
  2) Create one recurring monthly price for 99 RUB and one recurring annual price for 799 RUB.
  3) Create a Paddle.js client-side token (safe for frontend use).
  4) Fill clientToken, monthlyPriceId and yearlyPriceId above.
  5) In Supabase Edge Function secrets set PADDLE_WEBHOOK_SECRET.
  6) For the in-app billing portal also set PADDLE_API_KEY and PADDLE_ENV=sandbox.
  7) Configure Paddle webhook URL:
     https://qmjtmhtmbaseykmwttvn.supabase.co/functions/v1/paddle-webhook
     Subscribe to subscription.created, subscription.updated, subscription.canceled,
     subscription.paused and subscription.resumed.
*/