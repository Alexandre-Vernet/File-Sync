export interface File {
    name: string;
    url: string;
    type: string;
    size: number;
    date: Date;
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
