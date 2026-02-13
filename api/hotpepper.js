// api/hotpepper.js  (CommonJSで固定)
module.exports = async (req, res) => {
  try {
    const apiKey = process.env.HOTPEPPER_API_KEY;
    if (!apiKey) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      return res.end(JSON.stringify({ error: "HOTPEPPER_API_KEY is not set" }));
    }

    const upstream = new URL("https://webservice.recruit.co.jp/hotpepper/gourmet/v1/");
    upstream.searchParams.set("key", apiKey);
    upstream.searchParams.set("format", "json");

    for (const [k, v] of Object.entries(req.query || {})) {
      if (k === "key" || k === "format") continue;
      if (Array.isArray(v)) upstream.searchParams.set(k, v.join(","));
      else if (v != null) upstream.searchParams.set(k, String(v));
    }

    const r = await fetch(upstream.toString());
    const text = await r.text();

    res.statusCode = r.status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.end(text);
  } catch (e) {
    console.error("handler error:", e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.end(JSON.stringify({ error: String(e?.message || e) }));
  }
};
