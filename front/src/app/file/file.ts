export interface File {
    name: string;
    url?: string;
    type: string;
    date: Date;
}

export interface FileWithId extends File {
    id: string;
}

export interface FileResponse {
    statusCode?: number;
    message?: string;
}