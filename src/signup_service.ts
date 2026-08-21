import { z } from "zod";
import { infrai } from "./infrai";

export const SignupSchema = z.object({
  email: z.string().email(),
  unit: z.string().min(1),
  maintenanceNote: z.string().optional(),
  documentName: z.string().optional(),
  inspectionDate: z.string().optional(),
});

export type SignupInput = z.infer<typeof SignupSchema>;

export type SignupState = {
  emailVerified: boolean;
  maintenanceRequested: boolean;
  documentUploaded: boolean;
  inspectionScheduled: boolean;
};

export function initialState(): SignupState {
  return { emailVerified: false, maintenanceRequested: false, documentUploaded: false, inspectionScheduled: false };
}

// Decide whether the tenant can proceed to maintenance/docs/inspection.
// Rule: email must be verified first.
export function canActivate(state: SignupState): boolean {
  return state.emailVerified;
}

export async function sendVerificationLink(input: SignupInput): Promise<{ message_id: string }> {
  const link = `https://app.example.com/verify?email=${encodeURIComponent(input.email)}`;
  return infrai.email.send({
    to: input.email,
    subject: "Verify your property signup",
    html: `<p>Hello ${input.unit} tenant, click <a href="${link}">here</a> to verify.</p>`,
  });
}

// After email.get confirms delivery, flip the flag.
export async function confirmEmailSent(messageId: string): Promise<boolean> {
  const info = await infrai.email.get(messageId);
  return info.state === "delivered" || info.state === "sent";
}
