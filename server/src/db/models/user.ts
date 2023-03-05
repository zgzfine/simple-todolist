export default class UserModel {
    id?: string
    usr?: string
    psd?: string

    // 构造函数
    constructor(id?: string,
        usr?: string,
        psd?: string) {
        this.id = id;
        this.usr = usr;
        this.psd = psd
    }
}