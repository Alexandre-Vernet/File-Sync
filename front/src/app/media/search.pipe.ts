import { Pipe, PipeTransform } from '@angular/core';
import { MediaWithId } from './media';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(medias: MediaWithId[], searchValue: string) {
        if (searchValue) {
            return medias.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        } else return medias;
    }

}
