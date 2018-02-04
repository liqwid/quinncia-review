import { Controller, Get, Post, Delete, Param, UploadedFile } from 'routing-controllers'
import { getImageUrls, saveImage, deleteImage } from 'services/images'

const FILE_FIELD_NAME: string = 'file'

@Controller('/images')
export class ImageController {
  @Get()
  async getAll(): Promise<string[]> {
    return getImageUrls()
  }

  @Post()
  async uploadImage(@UploadedFile(FILE_FIELD_NAME) file: Express.Multer.File): Promise<{}> {
    await saveImage(file)

    return { status: 'OK' }
  }

  @Delete('/:fileName')
  async delete(@Param('fileName') fileName: string): Promise<{}> {
    await deleteImage(fileName)

    return { status: 'OK' }
  }
}
