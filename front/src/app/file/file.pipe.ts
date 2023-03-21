import { Pipe, PipeTransform } from '@angular/core';
import { FileWithId } from './file';
import moment from 'moment/moment';

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

    convertDate(date: Date): string {
        return moment(date).startOf('minutes').fromNow();
    }

    castTypeFile(type: string): string {
        // Get the type of file before the slash
        if (type.includes('/')) {
            return type.split('/')[0];
        } else {
            return 'unknown';
        }
    }

    determineFileType(fileName: string, type: string) {
        if (fileName.includes('.rar') || fileName.includes('.zip')) {
            return 'application/zip';
        }
        if (type.includes('audio')) {
            return 'unknown';
        }

        if (type === 'text/plain' && fileName.includes('.txt')) {
            type = 'application/txt';
        }
        return type;
    }

    detectTextMarkdown(text: string): boolean {
        // This regex searches for all the special characters commonly used in Markdown syntax, including double asterisks for bold text,
        // underscores for italicized text, backticks for code text, brackets for links and images, and hashtags for headings.
        const markdownRegex = /(\*\*|_|`|#+|\[.\]|\n- .*)/gm;
        // The test method of the regex object returns true if any of the special characters are detected in the input text.
        return markdownRegex.test(text);
    }

    getTotalSize(files: FileWithId[]): number {
        let totalFilesSize: number = 0;
        files.forEach((file) => {
            totalFilesSize += file.size;
        });
        return totalFilesSize;
    }

    isFileEmailOrPhoneOrLink(type: string): string {
        // Detect email
        if (type.includes('@')) {
            return 'email';
        }

        // Detect format phone number
        if (type.startsWith('+') || type.startsWith('0')) {
            return 'phone';
        }

        // Detect format link
        if (type.startsWith('http')) {
            return 'link';
        }
        return '';
    }

    convertSize(size: number): string {
        if (size < 1024) {
            return `${ size } B`;
        } else if (size < 1048576) {
            return (size / 1024).toFixed(2) + ' KB';
        } else if (size < 1073741824) {
            return (size / 1048576).toFixed(2) + ' MB';
        } else {
            return (size / 1073741824).toFixed(2) + ' GB';
        }
    }
}
