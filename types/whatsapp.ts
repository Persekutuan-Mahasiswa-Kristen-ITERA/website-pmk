export interface WhatsappWebhook {
    from:      string;
    message:   Message;
    pushname:  string;
    timestamp: Date;
}

export interface Message {
    id:   string;
    text: string;
}
