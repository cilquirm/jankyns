const fs = require('fs');
const os = require('os');

const {env} = process;

const maybeRead = (key, keyPath) => key || keyPath && fs.readFileSync(keyPath);

module.exports = {
  aws: {
    ses: {
      from: env.AWS_SES_FROM,
      to: env.AWS_SES_TO
    }
  },
  envs: JSON.parse(env.ENVS || '{}'),
  docker: {
    host: env.DOCKER_HOST,
    port: env.DOCKER_PORT,
    protocol: env.DOCKER_PROTOCOL && parseInt(env.DOCKER_PROTOCOL),
    socketPath: env.DOCKER_SOCKET_PATH,
    ca: maybeRead(env.DOCKER_CA, env.DOCKER_CA_PATH),
    cert: maybeRead(env.DOCKER_CERT, env.DOCKER_CERT_PATH),
    key: maybeRead(env.DOCKER_KEY, env.DOCKER_KEY_PATH)
  },
  fs: {
    dir: env.FS_DIR
  },
  gcloud: {
    bucket: env.GCLOUD_BUCKET,
    clientEmail: env.GCLOUD_CLIENT_EMAIL,
    privateKey: env.GCLOUD_PRIVATE_KEY && JSON.parse(env.GCLOUD_PRIVATE_KEY)
  },
  maxConcurrentBuilds: parseInt(env.MAX_CONCURRENT_BUILDS) || os.cpus().length,
  publicUrl: env.PUBLIC_URL,
  store: env.STORE
};
