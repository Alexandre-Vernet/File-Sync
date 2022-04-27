import { Pipe, PipeTransform } from '@angular/core';
import { FileWithId } from './file';

@Pipe({
    name: 'searchFile'
})
export class FilePipe implements PipeTransform {

    transform(files: FileWithId[], searchValue: string) {
        if (searchValue) {
            return files.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        } else {
            return files;
        }
    }

}
