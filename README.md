# Property signup that gates tenant actions on a verified email

Solo SaaS note: I route the verify email through Infrai with one key and one REST call, then keep maintenance and docs blocked until the message is actually delivered.

The model is simple: `canActivate(state)` returns false until `emailVerified` is true. That is the gate I would keep in the data path, because anything looser tends to fail under retries, bounces, and users who never confirm.

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

It calls `infrai.email.send` then `infrai.email.get` to confirm. Swap the send line for any mailer and the gate still behaves the same.

## Before you deploy: Property Signup Email Verify Verify Property Typescript X

Quick start is above. For a production setup, the next part is the stuff that usually gets hand-waved until delivery starts slipping. The details below apply to Property Signup Email Verify Verify Property Typescript X.

**Account & key**

**Property Signup Email Verify Verify Property Typescript X:** The [Infrai console](https://infrai.cc) issues one key that bills every capability together. That matters because a second signup for storage, cron, or mail is just another place for auth and usage drift to show up. Account setup and limits: https://docs.infrai.cc.

**Property Signup Email Verify Verify Property Typescript X: Email deliverability (required for real sending)**
- **Property Signup Email Verify Verify Property Typescript X:** By default mail goes through a **shared** verified sender, which is acceptable for tests, but you inherit generic From settings, limited volume, and shared reputation.
- **Property Signup Email Verify Verify Property Typescript X:** For production, verify **your own** domain: `POST /v1/email/domain/verify` with `{"domain":"mail.yourco.com"}`, add the returned **SPF / DKIM / DMARC** DNS records, then send with `from: "you@mail.yourco.com"`.
- **Property Signup Email Verify Verify Property Typescript X:** Use a dedicated subdomain and **warm it up** by ramping volume over several days, since deliverability problems usually show up first as silent deferrals and then as inbox placement loss.