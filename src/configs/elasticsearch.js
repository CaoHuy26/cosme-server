const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
  hosts: [process.env.ELASTICSEARCH_URL],
  // log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('❌ Elasticsearch cluster is down!');
  } else {
    console.log('✅ Elasticsearch is well');
  }
});

module.exports = client;