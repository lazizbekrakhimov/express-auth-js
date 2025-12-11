import { compare, hash } from "bcrypt";

class Crypto {
    async decode(data) {
        return await hash(data, 13);
    }

    async encode(data, hashedData) {
        return await compare(data, hashedData);
    }
}

export default new Crypto()