import multer from 'multer';
import fs from 'fs';
import { Request } from 'express';

class FileUploader {
    constructor() {

    }

    private static getFolderPathName(fieldname: string) {
        const folderBasePath: string = "uploads";
        return `${folderBasePath}/${fieldname}/`;
    }

    public static getStorage() {
        const storage = multer.diskStorage({
            destination: (req: Request, file, cb)=> {             
                fs.mkdirSync(FileUploader.getFolderPathName(file.fieldname), { recursive: true })
                cb(null,  FileUploader.getFolderPathName(file.fieldname));
            },
            filename: (req: Request, file, cb)=> {
                cb(null, file.originalname);
            }
        });
        return storage;
    }
}

const GetStorage = FileUploader.getStorage;

export {
    GetStorage,
}