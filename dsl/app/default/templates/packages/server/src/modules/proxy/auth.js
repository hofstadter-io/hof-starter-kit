const authMiddleware = async (req, res, next) => {

  if (!req.context.user || !req.context.auth.isAuthenticated) {
    res.status(401).send("Unauthorized")
  } else {
    next();
  }

}

export default authMiddleware;
