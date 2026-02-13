// api/hotpepper.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const apiKey = process.env.HOTPEPPER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "HOTPEPPER_API_KEY is not set" });

    const qs = new URLSearchParams(req.query as any);
    qs.set("key", apiKey);
    qs.set("format", "json");

    const url = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?${qs.toString()}`;
    const r = await fetch(url);
    const text = await r.text();

    console.log("query", req.query);
console.log("proxy url", url);
console.log("upstream status", r.status);
console.log("upstream content-type", r.headers.get("content-type"));
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(r.status).send(text);
  } catch (e: any) {
    res.status(500).json({ error: e?.message ?? "unknown error" });
  }
}
