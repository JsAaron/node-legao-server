import express from 'express';
import globalConfig from 'config-lite';
import db from './mongodb/db.js';
import chalk from 'chalk';

const app = express();
const config = globalConfig(__dirname)

app.listen(config.port, () => {
  console.log(
    chalk.green(`成功监听端口：${config.port}`)
  )
});
