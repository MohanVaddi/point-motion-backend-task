import crypto from 'crypto';

export const hash = async (password: string) => {
    return new Promise((resolve, reject) => {
        // generate random 16 bytes long salt
        const salt = crypto.randomBytes(16).toString('hex');

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err)
                reject(err);
            resolve(salt + ':' + derivedKey.toString('hex'));
        });
    });
};
export const verify = async (password: string, hash: string) => {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(':');
        crypto.scrypt(password, salt as string, 64, (err, derivedKey) => {
            if (err)
                reject(err);
            resolve(key == derivedKey.toString('hex'));
        });
    });
};
