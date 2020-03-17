const morgan = require('morgan');
const chalk = require('chalk');

// const loggerString = '[:date[web]]: :method :url :status :response-time(ms)';
const logger = morgan((tokens, req, res) => {
  // Pick color for each case
  const status = tokens.status(req, res);
  const statusColor = status >= 500
    ? '#fc034e' : status >= 400
    ? '#fcf003' : '#2ed573';

  return [
    chalk.hex('#f78fb3').bold(`[${tokens.date(req, res)}]:`),
    chalk.hex('#34ace0').bold(tokens.method(req, res)),
    chalk.hex('#eb0951').bold(tokens.url(req, res)),
    chalk.hex(statusColor).bold(tokens.status(req, res)),
    chalk.hex('#0989eb').bold(`${tokens['response-time'](req, res)}(ms)`),
    // chalk.hex('#1e90ff')(tokens['user-agent'](req, res)),
  ].join(' ');
});

module.exports = logger;