export interface Article {
    id: number
    title: string
    slug: string
    excerpt: string
    content: string
    date: string
    author: Author
    tags: string[]
    readTime: number
    imageUrl: string
}

export interface Author {
    name: string
    image: string
}
