import Access from '../user/access';
import ServerModule from '../';

const contextMiddleware = async (req, res, next) => {

  var context = await ServerModule.createContext(req, res);
  req.context = context;

  // console.log(context);

  next();
}

export default contextMiddleware;
