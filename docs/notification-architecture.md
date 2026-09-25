# Notification Architecture

No Twilio or production email integration is connected in this prototype.

Prepared future notification hooks:

- SMS order notifications
- Pickup-ready notifications
- Service-ready notifications
- Back-in-stock notifications
- Marketing opt-in

Production email events are expected to come primarily from Shopify transactional workflows:

- Order confirmation
- Order processing
- Order modification where supported
- Cancellation
- Fulfillment
- Pickup readiness
- Refund and return status

Environment placeholders live in `.env.example`. Never commit real credentials.
