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
    MARKDOWN = 'text/markdown',
    IMAGE = 'image',
    VIDEO = 'video',
    APPLICATION_PDF = 'application/pdf',
    APPLICATION_TXT = 'application/txt',
    ANDROID_PACKAGE = 'application/vnd.android.package-archive',
    MS_DOWNLOAD = 'application/x-msdownload',
    APPLICATION_ZIP = 'application/x-compressed',
    UNKNOWN = 'unknown',
}


export const fileTypes = [
    { key: FileType.NOTE, label: 'Note', icon: 'format_color_text', color: 'text-color' },
    { key: FileType.MARKDOWN, label: 'Markdown', icon: 'format_color_text', color: 'text-color' },
    { key: FileType.APPLICATION_TXT, label: 'Text', icon: 'description', color: 'txt-color' },
    { key: FileType.IMAGE, label: 'Image', icon: 'image', color: 'image-color' },
    { key: FileType.APPLICATION_PDF, label: 'PDF', icon: 'file_copy', color: 'pdf-color' },
    { key: FileType.VIDEO, label: 'Video', icon: 'movie', color: 'video-color' },
    { key: FileType.APPLICATION_ZIP, label: 'Archive', icon: 'archive', color: 'zip-color' },
    { key: FileType.UNKNOWN, label: 'Unknown', icon: 'description', color: 'unknown-color' }
];
