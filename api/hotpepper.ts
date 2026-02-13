// api/hotpepper.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  try {
    const apiKey = process.env.HOTPEPPER_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "HOTPEPPER_API_KEY is not set" });

    const upstream = new URL("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/");
    upstream.searchParams.set("key", apiKey);
    upstream.searchParams.set("format", "json");

    for (const [k, v] of Object.entries(req.query)) {
      if (k === "key" || k === "format") continue;
      if (Array.isArray(v)) upstream.searchParams.set(k, v.join(","));
      else if (v != null) upstream.searchParams.set(k, String(v));
    }

    const r = await fetch(upstream.toString());
    const text = await r.text();

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(r.status).send(text);
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ error: e?.message ?? "unknown error" });
  }
};
