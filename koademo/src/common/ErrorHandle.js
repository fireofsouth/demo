export default (ctx, next) => {
  return next().catch((err) => {
    debugger
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: 'Protected resource, use Authorization header to get access\n'
      }
    } else {
      ctx.status = err.status || 500
      console.log(err.stack)
      ctx.body = Object.assign({
        code: 500,
        msg: err.message
      }, process.env.NODE_ENV === 'development' ? {
        stack: err.stack
      } : {})
    }
  })
}