import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'authentication'
})
export class AuthenticationPipe implements PipeTransform {


    transform(value: any, ...args: any[]): any {
    }

}
