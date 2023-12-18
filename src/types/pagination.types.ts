export interface PaginationTypes {
    sort?: EnumOrderOrderBy,
    page?: number,
    perPage?: number
}

export enum EnumOrderOrderBy {
    NEWEST = "asc",
    OLDEST = "desc"
}