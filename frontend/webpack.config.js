switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = require('./config/webpack.prod')({env: 'production'});
    break;
  case 'testing':
    module.exports = require('./config/webpack.test')({env: 'test'});
    break;
  case 'development':
  default:
    module.exports = require('./config/webpack.dev')({env: 'development'});
}
