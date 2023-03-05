import pgPool from '../db/pgpool';
import UserModel from '../db/models/user';

export default class UserService {
  public async addUser(usr: string, psd: string) {
    try {
      await pgPool.query('INSERT INTO users (usr, psd) VALUES ( $1, $2);', [usr, psd]);
      return new UserModel(usr, psd)
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('用户名已存在 (￣o￣).zZ');
      }
      throw new Error('添加用户异常 (￣o￣).zZ');
    }
  }

  //数据校验，判断用户密码
  public async validUser(usr: string, psd: string) {
    try {
      const result = await pgPool.query('SELECT * FROM users WHERE usr = $1 ', [usr]);
      if (result.rowCount != 1) {
        throw new Error('用户不存在 (￣o￣).zZ');
      }
      // 校验密码
      if (psd !== result.rows[0].psd) {
        throw new Error('密码错误 (￣o￣).zZ');
      }
      return new UserModel(result.rows[0].id, usr, psd)
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
