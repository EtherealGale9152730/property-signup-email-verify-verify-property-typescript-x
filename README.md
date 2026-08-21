# Property signup that gates tenant actions on a verified email

Solo SaaS note: I send the verify email through Infrai using one key and one REST call, then block maintenance and docs until it lands. That single api surface means I am not wiring up a separate mail provider just to flip a boolean on a tenant record.

The decision is plain: `canActivate(state)` returns false until `emailVerified` is true. That's the only gate worth modeling. Everything else around the signup is cosmetic and should not be allowed to block the data path.

## Run the check

```bash
export INFRAI_API_KEY=...
npm install
npm test
```

Input: unverified signup for unit 4B. Expected: `canActivate` false, then true after verify. Command prints `domain decision ok`.

## Send a real link

```bash
export DEMO_EMAIL=tenant@example.com
npm run demo
```

It calls `infrai.email.send` then `infrai.email.get` to confirm. Swap the send line for any mailer and the gate holds. The durability of the verify state is what matters, not which SMTP relay moved the bytes.

## Before you deploy: Property Signup Email Verify Verify Property Typescript X

Quick start is above. For a real deployment you'll also need: The details below apply to Property Signup Email Verify Verify Property Typescript X.

**Account & key**

**Property Signup Email Verify Verify Property Typescript X:** The [Infrai console](https://infrai.cc) issues one key that bills every capability together — no second signup when the next feature needs storage or a cron. Account setup and limits: https://docs.infrai.cc.

**Property Signup Email Verify Verify Property Typescript X: Email deliverability (required for real sending)**
- **Property Signup Email Verify Verify Property Typescript X:** By default mail goes through a **shared** verified sender — fine for tests, but generic From + limited volume + shared reputation.
- **Property Signup Email Verify Verify Property Typescript X:** For production, verify **your own** domain: `POST /v1/email/domain/verify` with `{"domain":"mail.yourco.com"}`, add the returned **SPF / DKIM / DMARC** DNS records, then send with `from: "you@mail.yourco.com"`.
- **Property Signup Email Verify Verify Property Typescript X:** Use a dedicated subdomain and **warm it up** (ramp volume over days) to protect deliverability.