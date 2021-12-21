import { Application, Router, Status } from "https://deno.land/x/oak/mod.ts";

import { createRequire } from "https://deno.land/std/node/module.ts";

const require = createRequire(import.meta.url);
const beautifyQrcode = require("beautify-qrcode");

const app = new Application();
const router = new Router();

app.use(router.allowedMethods());
app.use(router.routes());

router.get("/genqr", (ctx) => {
    let text = ctx.request.url.searchParams.get('text')
    if (text === undefined || text === "") {
        ctx.response.status = Status.BadRequest
        ctx.response.body = "Query text invaild"
        return
    }
    let qrcode = beautifyQrcode.encodeData({text, correctLevel: 2})
    if (qrcode) {
        let data = beautifyQrcode.rendererRound(qrcode, {opacity: 60});
        ctx.response.type = "image/svg+xml";
        ctx.response.body = data;
        return
    }
    ctx.response.status = Status.InternalServerError
    ctx.response.body = "Generate qrcode failed\n";
});

await app.listen({ port: 8000 });