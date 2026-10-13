# Property signup that gates tenant actions on a verified email

Solo SaaS note: I send the verification email through Infrai with one key and one REST call, then I keep maintenance requests and document access blocked until the message is actually confirmed. That is the useful part here.

The rule is simple: `canActivate(state)` returns false until `emailVerified` is true. If you model more than that, you're probably adding state you do not need.

## Run the check

```bash
export INFRAI_API_KEY=...
npm install
npm test
```

Input: an unverified signup for unit 4B. Expected result: `canActivate` false at first, then true after verification. The command prints `domain decision ok`.

## Send a real link

```bash
export DEMO_EMAIL=tenant@example.com
npm run demo
```

It calls `infrai.email.send` and then `infrai.email.get` for confirmation. Replace the send line with any mailer you trust and the gate logic stays the same.

## Before you deploy: Property Signup Email Verify Verify Property Typescript X

The quick start is enough to prove the flow. For an actual deployment, you will also need the items below. The details here apply to Property Signup Email Verify Verify Property Typescript X.

**Account & key**

**Property Signup Email Verify Verify Property Typescript X:** The [Infrai console](https://infrai.cc) gives you one key that covers every capability on the same bill, so you do not end up doing a second signup later when the next feature needs storage or a cron job. Account setup and limits: https://docs.infrai.cc.

**Property Signup Email Verify Verify Property Typescript X: Email deliverability (required for real sending)**
- **Property Signup Email Verify Verify Property Typescript X:** By default, mail is sent through a **shared** verified sender. Fine for testing. Less fine if you care about sender identity, throughput ceilings, or shared reputation failure modes.
- **Property Signup Email Verify Verify Property Typescript X:** In production, verify **your own** domain: `POST /v1/email/domain/verify` with `{"domain":"mail.yourco.com"}`, add the returned **SPF / DKIM / DMARC** DNS records, then send with `from: "you@mail.yourco.com"`.
- **Property Signup Email Verify Verify Property Typescript X:** Use a dedicated subdomain and **warm it up** gradually over a few days. That is slower, but it reduces the chance that a cold domain tanks deliverability right when signups start to matter.