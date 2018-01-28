import 'reflect-metadata'
import * as express from 'express'
import { createExpressServer } from 'routing-controllers'
import { ImageController } from 'controllers/ImageController'
import { assetsPath } from 'utils/paths'

const app: express.Express = createExpressServer({
  controllers: [ ImageController ]
})

app.use(express.static(assetsPath))

export default app
