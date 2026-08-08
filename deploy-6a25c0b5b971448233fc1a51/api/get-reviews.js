const { adapt } = require('./_netlify-adapter');
const { handler } = require('../functions/get-reviews');

module.exports = adapt(handler);
module.exports.config = { api: { bodyParser: false } };
