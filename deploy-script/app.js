const axios = require('axios');
const Minio = require('minio');
const env = require('env-var');

const login = async(apiAddress, { username, password }) => {
  return axios({
    data: {
      username,
      password
    },
    method: 'POST',
    url: `${apiAddress}/login`
  }).then(res=> {
    if(res.status === 200)
      return res.headers.authorization;
  });
};

const postFirmware = async(token, { apiAddress, architecture, fileName, name, published, version }) => {
  return axios({
    headers: {
      Authorization: token
    },
    data: {
      architecture,
      file: fileName,
      name,
      published,
      releaseNotes: `${fileName} build`,
      version
    },
    method: 'POST',
    url: `${apiAddress}/software`
  });
};

const main = async() => {
  let secure = false;
  let port = 80;

  try {
    const token = await login(env.get('API').asString(), { username: env.get('API_USER').asString(), password: env.get('API_PASSWORD').asString()});
    const minioClient = new Minio.Client({
      accessKey: env.get('STORAGE_ACCESS_KEY_ID').asString(),
      endPoint: env.get('STORAGE_ADDRESS').asString(),
      port,
      secretKey: env.get('STORAGE_SECRET_ACCESS_KEY').asString(),
      secure
    });
    const version = `${env.get('SOFTWARE_VERSION').asString().trim()}-${env.get('GIT_BRANCH').asString().replace('-', '.')}-c${env.get('GIT_COMMIT').asString().slice(0, 8)}`;
    const filePath = `${env.get('FILE_PATH').asString()}/${env.get('FILE_NAME').asString()}`;
    const filePrettyName = `${env.get('PRETTY_NAME').asString()}_${version}-${env.get('ARCHITECTURE').asString()}.${env.get('FILE_NAME').asString().split('.')[1]}`;
    const upload = await minioClient.fPutObject(env.get('BUCKET_NAME').asString(), filePrettyName, filePath, 'application/octet-stream');

    if (upload) {
      const result = await postFirmware(token,
        {
        apiAddress: env.get('API').asString(),
        architecture: env.get('ARCHITECTURE').asString(),
        fileName: filePrettyName,
        name: env.get('PRETTY_NAME').asString(),
        published: true,
        version
      });

      console.log('########## Portal submited data ##########');
      console.log(result.data);
    } else {
      console.log('########## Binary upload fails #############');
    }
  } catch (e) {
    console.log(e);
  }
};

main();
