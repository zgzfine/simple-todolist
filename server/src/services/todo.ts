import pgPool from '../db/pgpool';
import TodoModel from '../db/models/todo'

//业务控制层
export default class TodoService {

  //新增todo
  public async addTodo(userId: string, content: string) {
    try {
      //保存todo信息
      //先保存数据，再查询用户是否存在，如果存在就更新外检，不存在就
      let result = await pgPool.query('SELECT * FROM users WHERE id = $1 ', [userId]);
      if (result.rowCount === 0) {
        throw new Error('用户不存在 (￣o￣).zZ');
      }
      //保存todo信息
      pgPool.query('INSERT INTO todos (content,userid) VALUES ( $1 , $2) ', [content, userId]);
      result = await pgPool.query('SELECT * FROM todos WHERE userid = $1 ORDER BY id DESC LIMIT 1 ', [userId]);
      //返回的是刚插入的数据
      return new TodoModel(result.rows[0].id, result.rows[0].status, Number(userId), content);
    } catch (error) {
      throw new Error('新增失败 (￣o￣).zZ');
    }
  }

  //物理删除
  public async deleteTodo(todoId: string) {
    try {
      await pgPool.query('DELETE FROM todos WHERE id = $1 ', [todoId]);
      return new TodoModel(todoId);
    } catch (error) {
      throw new Error('删除失败 (￣o￣).zZ');
    }
  }

  //查询用户下的所有todo信息,返回的是列表
  public async getAllTodos(userId: string) {
    try {
      const result = await pgPool.query('SELECT id,content,status,userid FROM todos WHERE userid = $1 ', [userId]);
      return result.rows;
    } catch (error) {
      throw new Error('获取失败 (￣o￣).zZ');
    }
  }

  //翻转todo的状态
  public async updateTodoStatus(todoId: string) {
    try {
      const rs = await pgPool.query('SELECT id,content,status,userid FROM todos WHERE id = $1 ', [todoId]);
      if (rs.rows.length == 0) {
        throw new Error('更新状态失败 数据异常(￣o￣).zZ');
      }
      await pgPool.query('UPDATE todos SET  status = $2 WHERE id = $1 ', [todoId, !rs.rows[0].status]);
      return new TodoModel(todoId);
    } catch (error) {
      console.log(error)
      throw new Error('更新状态失败 (￣o￣).zZ');
    }
  }

  //更新todo内容
  public async updateTodoContent(todoId: string, content: string) {
    try {
      await pgPool.query('UPDATE todos SET content = $2 WHERE id = $1 ', [todoId, content]);
      return new TodoModel(todoId);
    } catch (error) {
      throw new Error('更新内容失败 (￣o￣).zZ');
    }
  }

  //模糊查询,根据query
  public async searchTodo(userId: string, query: string) {
    try {
      const result = await pgPool.query('SELECT * FROM todos WHERE content LIKE $1 ', ['\%' + query + '\%']);
      return result.rows;
    } catch (error) {
      throw new Error('查询失败 (￣o￣).zZ');
    }
  }
}
