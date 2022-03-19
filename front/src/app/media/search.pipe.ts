import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})
export class SearchPipe implements PipeTransform {

    transform(snapshotArr: any, searchValue: string) {
        if (searchValue) {
            return snapshotArr.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        } else return snapshotArr;
    }

}
