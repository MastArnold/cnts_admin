export interface SpringPageable{
    content: any[],
    page: {
        number: number,
        size: number,
        totalElements: number,
        totalPages: number
    }
}