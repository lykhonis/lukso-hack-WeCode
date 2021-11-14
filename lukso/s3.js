import { config, S3 } from 'aws-sdk';

config.update({
  region: process.env.NEXT_PUBLIC_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_S3_ACCESS_SECRET,
  },
});

const s3 = new S3({ apiVersion: '2006-03-01' });

const upload = async (key, body) => {
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
        Key: key,
        Body: body,
        ACL: 'public-read',
      },
      (err, data) => {
        if (err) reject(err);
        else resolve({
          location: data.Location,
        });
      },
    );
  });
};

const fetch = async (key) => {
  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
        Key: key,
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data.Body.toString('utf-8'));
      });
  });
};

export default {
  upload,
  fetch,
};
