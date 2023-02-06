export class File {
    name: string;
    url: string;
    type: string;
    size: number;
    date: Date;

    constructor(name: string, url: string, type: string, size: number, date: Date) {
        this.name = name;
        this.url = url;
        this.type = type;
        this.size = size;
        this.date = date;
    }

    static getTotalSize(files: File[]): number {
        let totalFilesSize: number = 0;
        files.forEach((file: FileWithId) => {
            totalFilesSize += file.size;
        });
        return totalFilesSize;
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
