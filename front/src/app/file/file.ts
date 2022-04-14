import * as moment from 'moment';

export class File {
    name: string;
    url: string;
    type: string;
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
}

export interface FileWithId extends File {
    id: string;
}

export interface FileWithoutUrl {
    name: string;
    type: string;
    date: Date;
}

export interface FileResponse {
    statusCode?: number;
    message: string;
}
