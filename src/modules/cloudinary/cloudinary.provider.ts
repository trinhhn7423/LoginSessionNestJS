// cloudinary.provider.ts

import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dit9enk6m',
      api_key: '162694156365821',
      api_secret: '6HzeukWKTJgYGt8rjnJ8nSyAACA',
    });
  },
};
