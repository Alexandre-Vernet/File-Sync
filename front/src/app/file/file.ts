import moment from 'moment';

export class File {
    name: string;
    url: string;
    type: string;
    size: number;
    date: Date;

    constructor(name: string, url: string, type: string, date: Date) {
        this.name = name;
        this.url = url;
        this.type = type;
        this.date = date;
    }

    static castTypeFile(type: string): string {
        // Get the type of file before the slash
        return type.split('/')[0];
    }

    static convertDate(date: Date): string {
        return moment(date).startOf('minutes').fromNow();
    }

    static isFileEmailOrPhoneOrLink(type: string): string {
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

    static convertSize(size: number): string {
        if (size < 1024) {
            return size + ' B';
        } else if (size < 1048576) {
            return (size / 1024).toFixed(2) + ' KB';
        } else if (size < 1073741824) {
            return (size / 1048576).toFixed(2) + ' MB';
        } else {
            return (size / 1073741824).toFixed(2) + ' GB';
        }
    }

    static determineFileType(fileName: string) {
        if (fileName.includes('.rar') || fileName.includes('.zip')) {
            return 'application/zip';
        }
        return 'application/octet-stream';
    }
}

export interface FileWithId extends File {
    id: string;
}

export interface FileWithoutUrl {
    name: string;
    type: string;
    size: number;
    date: Date;
}

export interface FileResponse {
    statusCode?: number;
    message: string;
}
