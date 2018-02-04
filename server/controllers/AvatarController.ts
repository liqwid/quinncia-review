import { JsonController, Get, Put, BodyParam } from 'routing-controllers'
import { readAvatarInfo, saveAvatarInfo } from 'services/avatar'

@JsonController('/avatar')
export class AvatarController {
  @Get()
  async getAvatar(): Promise<string | null> {
    return readAvatarInfo()
  }

  @Put()
  async setAvatar(@BodyParam('imageUrl') imageUrl: string): Promise<{}> {
    await saveAvatarInfo(imageUrl)

    return { status: 'OK' }
  }
}
