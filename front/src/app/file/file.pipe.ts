import { Pipe, PipeTransform } from '@angular/core';
import { File } from './file';

@Pipe({
    standalone: true,
    name: 'searchFile'
})
export class FilePipe implements PipeTransform {

    transform(files: File[], searchValue: string) {
        if (searchValue) {
            return files.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        } else {
            return files;
        }
    }
}
