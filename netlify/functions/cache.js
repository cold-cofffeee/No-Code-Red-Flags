
export default async (event, context) => {
  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (event.httpMethod === "POST") {
    const { query, response } = JSON.parse(event.body || "{}");
    const upstashRes = await fetch(`${UPSTASH_URL}/set/${encodeURIComponent(query)}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response),
    });
    const data = await upstashRes.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  if (event.httpMethod === "GET") {
    const q = event.queryStringParameters.query;
    const upstashRes = await fetch(`${UPSTASH_URL}/get/${encodeURIComponent(q)}`, {
      headers: {
        Authorization: `Bearer ${UPSTASH_TOKEN}`,
      },
    });
    const data = await upstashRes.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};