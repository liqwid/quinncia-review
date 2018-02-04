import 'reflect-metadata'
import * as express from 'express'
import { createExpressServer } from 'routing-controllers'
import { ImageController } from 'controllers/ImageController'
import { AvatarController } from 'controllers/AvatarController'
import { assetsPath } from 'utils/paths'

const app: express.Express = createExpressServer({
  controllers: [ ImageController, AvatarController ]
})

app.use(express.static(assetsPath))

export default app
