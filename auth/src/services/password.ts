import {scrypt, randomBytes} from "crypto";
import {promisify} from "util";

const scryptAsync = promisify(scrypt);

export class Password{
    
    static async toHash(password:string){
        const salt = randomBytes(8).toString('hex');
        const buffer = await scryptAsync(password, salt, 64) as Buffer

        return `${buffer.toString("hex")}.${salt}`
    }

    static async compare(storedHash:string, providedPassword:string){
        const [hashedPassword, salt] = storedHash.split('.');
        const buffer = await scryptAsync(providedPassword, salt, 64) as Buffer
        
        return buffer.toString('hex') === hashedPassword;
    }
}