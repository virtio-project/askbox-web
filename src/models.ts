export interface Ask {
    id: number,
    askee: number,
    content: string,
    created_at: string | null | undefined,
    dedup: string,
}

export interface Askee {
    id: number,
    display_name: string,
    created_at: string | null | undefined,
}

export interface createAskRequest {
    askee: number,
    content: string,
    dedup: string,
}
