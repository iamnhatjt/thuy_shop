import { createLogger, format, transports } from 'winston';

const options = {
  file: {
    filename: 'error.log',
    level: 'error',
  },
  console: {
    level: 'silly',
  },
};

const actualLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, requestId, stack, message }) => {
      return `${timestamp} - [${level
        .toUpperCase()
        .padEnd(7)}] - ${requestId} - ${stack || message}`;
    }),
  ),
  transports: [
    new transports.Console(options.console),
    new transports.File(options.file),
  ],
});
const getRequestId = (request) => {
  const requestId = request?.headers?.requestId || '';
  return requestId;
};
const logger = {
  log: (message: string, request?: any) => {
    const requestId = getRequestId(request);
    actualLogger.log(message, { requestId });
  },
  info: (message: string, request?: any) => {
    const requestId = getRequestId(request);
    actualLogger.info(message, { requestId });
  },
  debug: (message: string, request?: any) => {
    const requestId = getRequestId(request);
    actualLogger.debug(message, { requestId });
  },
  error: (message: string, request?: any) => {
    const requestId = getRequestId(request);
    actualLogger.error(message, { requestId });
  },
};
export default logger;
