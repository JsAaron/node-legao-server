import home from './home'

export default app => {
    //http://www.expressjs.com.cn/guide/using-middleware.html
    app.use('/home', home);
}
