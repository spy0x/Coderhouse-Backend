import bcrypt from "bcrypt";
export const createHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};
export const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};
