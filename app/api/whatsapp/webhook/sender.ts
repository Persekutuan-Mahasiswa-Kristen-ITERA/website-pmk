"use server"

export async function sendMessage(phone: string, message: string): Promise<Response> {
    const WHATSAPP_HOST = process.env.WHATSAPP_HOST || "http://localhost:3000"
    const WHATSAPP_AUTH = process.env.WHATSAPP_AUTH || ""

    return fetch(`${WHATSAPP_HOST}/send/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${WHATSAPP_AUTH}`,
        },
        body: JSON.stringify({
            phone,
            message,
            is_forwarded: false,
        }),
    })
}
