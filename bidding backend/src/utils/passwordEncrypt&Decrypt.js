import  bcrypt from "bcrypt";

const saltRound = 15

const passwordEncrypt = async (plainPassword) => {
    let encryptPassword = await bcrypt.hash(plainPassword, saltRound);

    return encryptPassword;
}

const passwordDecrypt = async (plainPassword,encryptPassword) => {
    let decryptPassword = await bcrypt.compare(plainPassword, encryptPassword);

    return decryptPassword;
}

export {passwordEncrypt, passwordDecrypt};