const { adapt } = require('./_netlify-adapter');
const { handler } = require('../functions/create-checkout');

module.exports = adapt(handler);
module.exports.config = { api: { bodyParser: false } };
