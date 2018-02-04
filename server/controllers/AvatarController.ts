import { Controller, Get, Put, BodyParam } from 'routing-controllers'
import { readAvatarInfo, saveAvatarInfo } from 'services/avatar'

@Controller()
export class AvatarController {
  @Get('/avatar')
  async getAvatar(): Promise<string | null> {
    return readAvatarInfo()
  }

  @Put('/avatar')
  async setAvatar(@BodyParam('imageUrl') imageUrl: string): Promise<{}> {
    await saveAvatarInfo(imageUrl)

    return { status: 'OK' }
  }
}
