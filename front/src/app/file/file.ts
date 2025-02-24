export interface File {
    id?: string;
    name: string;
    url?: string;
    type: string;
    size: number;
    date: Date;
}

export enum FileType {
    NOTE = 'text/plain',
    IMAGE = 'image',
    VIDEO = 'video',
    MARKDOWN = 'markdown',
    APPLICATION_PDF = 'application/pdf',
    APPLICATION_TXT = 'application/txt',
    ANDROID_PACKAGE = 'application/vnd.android.package-archive',
    MS_DOWNLOAD = 'application/x-msdownload',
    APPLICATION_ZIP = 'application/x-compressed',
    UNKNOWN = 'unknown',
}
