import express from 'express';
import globalConfig from 'config-lite';
import db from './mongodb/db.js';
import chalk from 'chalk';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import router from './routes/index.js';

const app = express();
const config = globalConfig(__dirname)

// 使用 cookieParser 中间件，cookieParser(secret, options)
// 其中 secret 用来加密 cookie 字符串（下面会提到 signedCookies）
// options 传入上面介绍的 cookie 可选参数
app.use(cookieParser());

app.all('*', (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", '*');
    // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Access-Control-Allow-Credentials", true); //可以带cookies
    // res.header("X-Powered-By", '3.2.1')
    next();
});

//挂载处理路由
router(app);

app.listen(config.port, () => {
    console.log(
        chalk.green(`成功监听端口：${config.port}`)
    )
});
