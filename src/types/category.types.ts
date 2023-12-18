export interface ICategory {
    id: number,
    name: string,
    slug: string
}

export interface IGetAllCategory {
    page?: string | number,
    filterSearch?: string,
    perPage?: string | number,
    sort?: string,
    filterStatus?: string
}