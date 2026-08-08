function readBody(req) {
  if (typeof req.body === 'string') return Promise.resolve(req.body);
  if (req.body && typeof req.body === 'object') return Promise.resolve(JSON.stringify(req.body));

  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function toQuery(req) {
  const url = new URL(req.url || '/', `https://${req.headers.host || 'cleava.fi'}`);
  const query = {};
  url.searchParams.forEach((value, key) => {
    query[key] = value;
  });
  return query;
}

function send(res, result) {
  const statusCode = result.statusCode || 200;
  const headers = result.headers || {};

  Object.keys(headers).forEach((key) => {
    res.setHeader(key, headers[key]);
  });

  res.statusCode = statusCode;
  res.end(result.body || '');
}

function adapt(handler) {
  return async function vercelHandler(req, res) {
    try {
      const body = await readBody(req);
      const result = await handler({
        httpMethod: req.method,
        headers: req.headers || {},
        body,
        isBase64Encoded: false,
        queryStringParameters: toQuery(req),
      });
      send(res, result || { statusCode: 204, body: '' });
    } catch (error) {
      console.error(error);
      send(res, {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    }
  };
}

module.exports = { adapt };
