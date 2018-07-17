import home from './home'
import shopping from './shopping'

export default app => {
  //http://www.expressjs.com.cn/guide/using-middleware.html
  app.use('/home', home);
	app.use('/shopping', shopping);
}
