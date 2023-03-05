## 简单的todolist demo

### 特点

- 前后端分离
- 增加用户注册、登录
- todolist的crud

### 技术栈

- 语言
  TypeScript
- 技术
   React、Axios、Ant-Design、React-Router、Redux、Koa、postgresql等

### 本地运行

- 下载项目
```bash
# clone
git clone https://github.com/zgzfine/simple-todolist.git
```

- 执行文件里面的sql(database.sql、todos.sql,users.sql)
```bash
cd /simple-todolist/server/doc

```

- 修改后端数据库的配置为你的本地的配置
```bash
vim /simple-todolist/server/src/config.ts

```

- 启动后端服务,监听本地 5000 端口
```bash
cd /simple-todolist/server

yarn

yarn start
```

- 启动前端服务
```bash
cd /simple-todolist

yarn

yarn start
```

- 浏览器登录
http://localhost:3000/

- 输入登录账号密码
admin/123456


- 寻求帮忙请联系zenggzh@gmail.com,感谢~

