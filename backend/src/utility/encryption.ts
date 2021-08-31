import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
const dotenv = require('dotenv');
dotenv.config();

const SECRET = process.env.SECRET;

class Encryption {
  constructor() {

  }

  public static encryptPassword = (password: string) => {
    return bcrypt.hashSync(password, 10);
  }

  public static decryptPassword = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
  }

  public static createToken = async (data: any) => {
    return new Promise((resolve, reject) => {
      try {
        const token = jwt.sign(data, SECRET, {
          expiresIn: '1d',
        });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    })
  }

  public static validateToken = (token: any) => {
    try {
      return jwt.verify(token, SECRET); 
    } catch (error) {
      console.log(error);
      
      return null;
    }
  }
}

export {
  Encryption
}