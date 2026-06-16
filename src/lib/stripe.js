/**
 * Stripe helpers — NOT connected yet.
 *
 * Frontend-only build. The MVP scope is a deposit-only payment flow in test mode.
 * When wired up, load Stripe.js and redirect to a Checkout session created by a
 * Supabase edge function / serverless endpoint.
 */

export async function startDepositCheckout() {
  // Not implemented in the frontend-only phase.
  throw new Error('Stripe is not connected yet.')
}
