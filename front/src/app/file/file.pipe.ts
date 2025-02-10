import { Pipe, PipeTransform } from '@angular/core';
import { File } from './file';
import moment from 'moment/moment';

@Pipe({
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

    convertDate(date: Date) {
        return moment(date).startOf('minutes').fromNow();
    }

    castTypeFile(type: string) {
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

    detectTextMarkdown(text: string) {
        // This regex searches for all the special characters commonly used in Markdown syntax, including double asterisks for bold text,
        // underscores for italicized text, backticks for code text, brackets for links and images, and hashtags for headings.
        const markdownRegex = /(\*\*|_|`|#+|\[.\]|\n- .*)/gm;
        // The test method of the regex object returns true if any of the special characters are detected in the input text.
        return markdownRegex.test(text) || this.detectCode(text);
    }

    detectCode(text: string) {
        const codeRegex = /(<[a-z][\s\S]*>|<\s*[a-z][\s\S]*\/>|<\s*[a-z][\s\S]*>[\s\S]*<\/[a-z]+>|<\s*[a-z][\s\S]*>)/i;
        const cssRegex = /(\{[\s\S]*\})/i;
        const jsRegex = /(function[\s\S]*\()|(class[\s\S]*\()|(const[\s\S]*\()|(let[\s\S]*\()|(var[\s\S]*\()|(if[\s\S]*\()|(else[\s\S]*\()|(switch[\s\S]*\()|(case[\s\S]*\()|(break[\s\S]*\()|(for[\s\S]*\()|(while[\s\S]*\()|(do[\s\S]*\()|(return[\s\S]*\()|(console[\s\S]*\()|(alert[\s\S]*\()|(document[\s\S]*\()|(window[\s\S]*\()|(addEventListener[\s\S]*\()|(setTimeout[\s\S]*\()|(setInterval[\s\S]*\()|(clearInterval[\s\S]*\()|(clearTimeout[\s\S]*\()|(fetch[\s\S]*\()|(XMLHttpRequest[\s\S]*\()|(axios[\s\S]*\()|(async[\s\S]*\()|(await[\s\S]*\()|(try[\s\S]*\()|(catch[\s\S]*\()|(throw[\s\S]*\()|(typeof[\s\S]*\()|(instanceof[\s\S]*\()|(import[\s\S]*\()|(export[\s\S]*\()/i;
        const phpRegex = /(<\?php[\s\S]*\?>)|(<\?[\s\S]*\?>)/i;
        const cppRegex = /(cout[\s\S]*<<[\s\S]*;)|(cin[\s\S]*>>[\s\S]*;)|(for[\s\S]*\()|(while[\s\S]*\()|(do[\s\S]*\()|(if[\s\S]*\()|(else[\s\S]*\()|(switch[\s\S]*\()|(case[\s\S]*\()|(break[\s\S]*\()|(return[\s\S]*\()|(auto[\s\S]*[\s\S]*;)|(int[\s\S]*[\s\S]*;)|(double[\s\S]*[\s\S]*;)|(float[\s\S]*[\s\S]*;)|(char[\s\S]*[\s\S]*;)|(bool[\s\S]*[\s\S]*;)|(string[\s\S]*[\s\S]*;)/i;
        const pythonRegex = /^(\s*import\s+\w+|\s*from\s+\w+\s+import\s+\w+|\s*def\s+\w+\(.*\):\s*|\s*class\s+\w+.*:\s*|\s*if\s+\w+.*:\s*|\s*for\s+\w+.*:\s*|\s*while\s+\w+.*:\s*|\s*try:\s*|\s*except\s+\w+.*:\s*|\s*finally:\s*|\s*with\s+\w+.*:\s*|\s*async\s+def\s+\w+\(.*\):\s*)$/i;
        return codeRegex.test(text) || cssRegex.test(text) || jsRegex.test(text) || phpRegex.test(text) || cppRegex.test(text) || pythonRegex.test(text);
    }

    getTotalSize(files: File[]) {
        return files.reduce((acc, file) => acc + file.size, 0);
    }

    isFileEmailOrPhoneOrLink(type: string) {
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

    convertSize(size: number) {
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
