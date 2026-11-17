"use client"

import { useCallback, useEffect, useState } from "react"
import { AdminLayout } from "@/components/layout/AdminLayout"

type Entry = {
    id: string
    actorEmail: string
    actorName: string | null
    action: "create" | "update" | "delete"
    collection: string
    docId: string
    title: string | null
    createdAt: number | null
}

const ACTION: Record<Entry["action"], string> = { create: "Tambah", update: "Ubah", delete: "Hapus" }
const MENU: Record<string, string> = {
    articles: "Artikel",
    devotionals: "Renungan",
    events: "Event",
    documentations: "Dokumentasi",
}

/** Who changed what in the admin area (Admin Website only; the API refuses others). */
export default function AdminHistoryPage() {
    const [items, setItems] = useState<Entry[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [done, setDone] = useState(false)

    const load = useCallback(async (before?: number) => {
        setLoading(true)
        setError("")
        try {
            const res = await fetch(`/api/admin/audit${before ? `?before=${before}` : ""}`)
            const data = await res.json()
            if (!res.ok) {
                setError(data.error || "Gagal memuat riwayat.")
                return
            }
            setItems((prev) => (before ? [...prev, ...data.items] : data.items))
            setDone(data.items.length < 50)
        } catch {
            setError("Gagal memuat riwayat.")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        void load()
    }, [load])

    return (
        <AdminLayout>
            <div className="space-y-4">
                <div>
                    <h1 className="text-2xl font-bold text-brown-800">Riwayat</h1>
                    <p className="text-sm text-brown-600">Setiap tambah, ubah dan hapus konten beserta pelakunya.</p>
                </div>
                {error && <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <div className="overflow-hidden rounded-lg border border-brown-200 bg-white">
                    {items.length === 0 && !loading ? (
                        <p className="p-6 text-sm text-brown-600">Belum ada riwayat.</p>
                    ) : (
                        <ul className="divide-y divide-brown-100">
                            {items.map((h) => (
                                <li key={h.id} className="flex flex-col gap-1 px-4 py-3 text-sm md:flex-row md:items-center md:gap-4">
                                    <span className="shrink-0 text-xs text-brown-500 md:w-40">
                                        {h.createdAt
                                            ? new Date(h.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
                                            : "-"}
                                    </span>
                                    <span className="w-fit shrink-0 rounded bg-brown-100 px-2 py-0.5 text-xs font-semibold text-brown-800">
                                        {ACTION[h.action] ?? h.action} · {MENU[h.collection] ?? h.collection}
                                    </span>
                                    <span className="min-w-0 flex-1 break-words text-brown-900">{h.title ?? h.docId}</span>
                                    <span className="shrink-0 text-xs text-brown-600 md:text-right">{h.actorName ?? h.actorEmail}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {!done && items.length > 0 && (
                    <button
                        type="button"
                        disabled={loading}
                        onClick={() => {
                            const last = items[items.length - 1]
                            if (last?.createdAt) void load(last.createdAt)
                        }}
                        className="rounded-md border border-brown-300 bg-white px-4 py-2 text-sm text-brown-800 disabled:opacity-50"
                    >
                        {loading ? "Memuat…" : "Muat lebih banyak"}
                    </button>
                )}
            </div>
        </AdminLayout>
    )
}
