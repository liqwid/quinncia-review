import { Controller, Get, Post, Delete, Param, UploadedFile } from 'routing-controllers'
import { getImageUrls, saveImage, deleteImage } from 'services/images'

const FILE_FIELD_NAME: string = 'file'

@Controller()
export class ImageController {
  @Get('/images')
  async getAll(): Promise<string[]> {
    return getImageUrls()
  }

  @Post('/images')
  async uploadImage(@UploadedFile(FILE_FIELD_NAME) file: Express.Multer.File): Promise<{}> {
    await saveImage(file)

    return { status: 'OK' }
  }

  @Delete('/images')
  async delete(@Param('fileName') fileName: string): Promise<{}> {
    await deleteImage(fileName)

    return { status: 'OK' }
  }
}
