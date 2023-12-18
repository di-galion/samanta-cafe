export interface IGetAllProduct {
    perPage?: string | number
    page?: string | number
    filterSearch?: string
    filterCategory?: string
    sort?: string,
}

export interface IProduct {
    name: string
    price: number
    category: string
    slug: string
    images: string[]
    id: number
    description: string
}

export interface IProductCreate extends Omit<IProduct, "id"> {}