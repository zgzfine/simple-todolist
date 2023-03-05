import { Pool, PoolConfig } from 'pg'
import Config from '../config';

const config: PoolConfig = {
    host: Config.host,
    port: Config.port,
    database: Config.database,
    user: Config.user,
    password: Config.password,
    // 扩展属性
    max: 20, // 连接池最大连接数
    idleTimeoutMillis: 3000, // 连接最大空闲时间 3s
    connectionTimeoutMillis: 2000
};

const pgPool = new Pool(config);
export default pgPool;