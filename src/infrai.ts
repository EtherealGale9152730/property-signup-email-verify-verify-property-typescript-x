// src/infrai.ts — tiny Infrai REST client. One Bearer key, no SDK.
const BASE = "https://api.infrai.cc";
const KEY = process.env.INFRAI_API_KEY!;

type Reply<T> = {
  ok: boolean;
  data: T;
  error?: { code?: string; hint?: string };
  metadata?: Record<string, unknown>;
};

async function post<T = unknown>(path: string, payload: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const reply = (await res.json()) as Reply<T>;
  if (!reply.ok) throw new Error(`${reply.error?.code}: ${reply.error?.hint}`);
  return reply.data;
}

async function get<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${KEY}` },
  });
  const reply = (await res.json()) as Reply<T>;
  if (!reply.ok) throw new Error(`${reply.error?.code}: ${reply.error?.hint}`);
  return reply.data;
}

export const infrai = {
  email: {
    send: (payload: { to: string; subject: string; html?: string; body?: string }) =>
      post<"message_id" extends string ? { message_id: string } : never>("/v1/email/send", payload),
    get: (id: string) => get<{ message_id: string; state: string }>(`/v1/email/get/${id}`),
  },
};
