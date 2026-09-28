// Central Error Handling Middleware
const notFound = (req, res, next) => {
  const error = new Error('Endpoint not found: ' + req.originalUrl);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? (err.statusCode || 500) : res.statusCode;
  console.error('[API ERROR] ' + req.method + ' ' + req.originalUrl + ' - Status ' + statusCode + ':', err.message || err);
  
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  notFound,
  errorHandler
};
