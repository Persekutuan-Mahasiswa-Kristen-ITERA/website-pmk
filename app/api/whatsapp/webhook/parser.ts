export function getCommandFromMessage(message: string): string | null {
    // check if message contains "renungan" case-insensitively
    const lowerMessage = message.toLowerCase()
    if (lowerMessage.includes("renungan")) {
        return "devotional"
    }

    return null // No command found
}
