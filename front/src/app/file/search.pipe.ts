import { Pipe, PipeTransform } from '@angular/core';
import { FileWithId } from './file';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(medias: FileWithId[], searchValue: string) {
        if (searchValue) {
            return medias.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        } else return medias;
    }

}
