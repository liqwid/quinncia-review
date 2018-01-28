import { Controller, Get } from 'routing-controllers'
import { getImageUrls } from 'services/images'

@Controller()
export class ImageController {
    @Get('/images')
    getAll() {
       return getImageUrls()
    }
}
