API = {}
API.on = () => {}

API.on("POST /secrets", (ctx) => {
  ctx.res(200, { seed: seed })
})
