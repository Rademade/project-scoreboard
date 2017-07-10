const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const root = path.join.bind(path, ROOT);

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

function getAppName() {
  return 'Scoreboard';
}

function getAppHost() {
  return process.env.HOST || '127.0.0.1';
}

function getAppPort() {
  return process.env.PORT || 3000;
}

function getCommonAppMetadata() {
  return {
    title: getAppName(),
    baseUrl: '/',
    isDevServer: isWebpackDevServer()
  }
}

function getAppMetaData(env) {
  return Object.assign(getCommonAppMetadata(), {
    host: getAppHost(),
    port: getAppPort(),
    ENV: env
  });
}

exports.isWebpackDevServer = isWebpackDevServer;
exports.getAppName = getAppName;
exports.getAppHost = getAppHost;
exports.getAppPort = getAppPort;
exports.getCommonAppMetadata = getCommonAppMetadata;
exports.getAppMetaData = getAppMetaData;
exports.root = root;
