const { adapt } = require('./_netlify-adapter');
const { handler } = require('../functions/submit-offer-lead');

module.exports = adapt(handler);
module.exports.config = { api: { bodyParser: false } };
