const https = require('https');

const PLACE_ID = 'ChIJLcVmPnUn608REYWvMWFlBiM';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=3600',
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
  if (!API_KEY) return { statusCode: 500, headers, body: JSON.stringify({ error: 'Missing API key' }) };

  // reviews_sort=newest gets newest first, which is the only way to get most recent
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&reviews_sort=newest&language=fi&key=${API_KEY}`;

  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status !== 'OK') {
            console.error('Places API error:', json.status, json.error_message);
            return resolve({ statusCode: 500, headers, body: JSON.stringify({ error: json.status }) });
          }

          // Sort by time descending (newest first) and take all available
          const reviews = (json.result.reviews || [])
            .sort((a, b) => b.time - a.time)
            .map(r => ({
              name: r.author_name,
              rating: r.rating,
              text: r.text,
              date: r.relative_time_description,
              profile_photo: r.profile_photo_url,
              time: r.time,
            }));

          resolve({
            statusCode: 200,
            headers,
            body: JSON.stringify({
              reviews,
              rating: json.result.rating,
              total: json.result.user_ratings_total,
            }),
          });
        } catch (e) {
          resolve({ statusCode: 500, headers, body: JSON.stringify({ error: e.message }) });
        }
      });
    }).on('error', (e) => {
      resolve({ statusCode: 500, headers, body: JSON.stringify({ error: e.message }) });
    });
  });
};
