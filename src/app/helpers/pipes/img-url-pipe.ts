import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl'
})

export class ImgUrlPipe implements PipeTransform {

  transform(value: string | null): string | null {
    if (!value) return null;

    const baseApiUrl = 'https://icherniakov.ru/yt-course'

    return value ? `${baseApiUrl}/${value}` : '';
  }

}
