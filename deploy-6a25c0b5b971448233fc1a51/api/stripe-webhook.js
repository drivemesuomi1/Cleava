const { adapt } = require('./_netlify-adapter');
const { handler } = require('../functions/stripe-webhook');

module.exports = adapt(handler);
module.exports.config = { api: { bodyParser: false } };
