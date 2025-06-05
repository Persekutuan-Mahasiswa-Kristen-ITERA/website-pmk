import { FirebaseService } from "@/services/firebase-service"
import { Article } from "@/types/article"

const collectionName = "articles"
const articlesService = new FirebaseService<Article>(collectionName)

export async function getArticles(count: number = 0) {
    if (count) {
        return (await articlesService.getWithCount(count)).items
    }
    const response = (await articlesService.getAll()).items
    return response
}

export async function getLatestArticles(amount: number) {
    const response = (await articlesService.getAll({ field: "createdAt", direction: "desc" })).items
    return response.slice(0, amount)
}

export async function getArticleById(id: string) {
    const response = await articlesService.getById(id)
    return response
}

export async function getArticleBySlug(slug: string) {
    const response = await articlesService.getByField("slug", slug)
    return response
}

export async function getArticlesByTag(tag: string) {
    const response = await articlesService.getByField("tags", tag)
    return response
}

export async function addArticle(article: Article) {
    const response = await articlesService.create(article)
    return response
}

export async function updateArticle(id: string, article: Partial<Article>) {
    const response = await articlesService.update(id, article)
    return response
}

export async function deleteArticle(id: string) {
    const response = await articlesService.delete(id)
    return response
}
