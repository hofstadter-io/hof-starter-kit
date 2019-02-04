import Access from '../user/access';
import ServerModule from '../';

const handler = async (req, res, next) => {

  console.log("PROXY AUTH - start");

  var context = await ServerModule.createContext(req, res);

  console.log("PROXY AUTH - context");
  console.log(context);

  req.context = context;

  console.log("PROXY AUTH - next");
  next();
}

export default handler;

