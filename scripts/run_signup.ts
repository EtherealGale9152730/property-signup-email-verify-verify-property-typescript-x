import { SignupSchema, sendVerificationLink, confirmEmailSent } from "../src/signup_service";
import { infrai } from "../src/infrai";

const raw = {
  email: process.env.DEMO_EMAIL || "tenant@example.com",
  unit: "4B",
  maintenanceNote: "fix faucet",
};
const input = SignupSchema.parse(raw);
const sent = await sendVerificationLink(input);
console.log("sent", sent.message_id);
const ok = await confirmEmailSent(sent.message_id);
console.log("email active:", ok);
