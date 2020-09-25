export interface PaginatedResponse<T> {
    total: number,
    offset: number,
    items: T[]
}