import { randomUUID } from "crypto";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";

export const multerOptions = {
    storage: diskStorage({
      destination(req, file, callback) {
        const uploadPath = './uploads/images_product';
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath);
        }
        callback(null, uploadPath);
      },
      filename(req, file, callback) {
        callback(null, `${randomUUID()}${extname(file.originalname)}`);
      },
    })
  }