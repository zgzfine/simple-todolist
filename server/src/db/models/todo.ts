
export default class TodoModel {
    id: string
    status?: boolean
    userid?: number
    content?: string

    // 构造函数
    constructor(id: string,
        status?: boolean,
        userid?: number,
        content?: string,) {
        this.id = id;
        this.status = status;
        this.userid = userid;
        this.content = content;
    }
}