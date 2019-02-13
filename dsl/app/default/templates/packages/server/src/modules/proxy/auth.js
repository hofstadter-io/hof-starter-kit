const authMiddleware = async (req, res, next) => {

  console.log("Auth Middleware", req.context.user, req.context.auth)
  if (!req.context.user || !req.context.auth.isAuthenticated) {
    res.status(401).send("Unauthorized")
  } else {
    next();
  }

}

export default authMiddleware;
