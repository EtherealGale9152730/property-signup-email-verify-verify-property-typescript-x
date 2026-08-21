import { initialState, canActivate, SignupSchema } from "./signup_service";
import assert from "node:assert";

// Input: unverified signup for unit 4B with a maintenance note.
// Expected: canActivate is false until emailVerified flips.
const input = SignupSchema.parse({
  email: "tenant@4b.example",
  unit: "4B",
  maintenanceNote: "leak",
});
const state = initialState();
assert.strictEqual(canActivate(state), false, "must not activate before verify");
state.emailVerified = true;
assert.strictEqual(canActivate(state), true, "activates after verify");
console.log("domain decision ok");
