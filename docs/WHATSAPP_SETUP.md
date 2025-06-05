# WhatsApp Bot Integration Setup Guide

## Overview

This guide will help you set up the WhatsApp webhook API integration for your Next.js PMK ITERA website using the aldinokemal/go-whatsapp-web-multidevice backend.

## Prerequisites

1. **go-whatsapp-web-multidevice** server running
2. **Next.js** application (PMK ITERA website)
3. **Environment variables** configured
4. **Admin access** to the website

## Setup Steps

### 1. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp .env.whatsapp.example .env.local
```

Configure the following environment variables in `.env.local`:

```env
# WhatsApp API Configuration
WHATSAPP_API_URL=http://localhost:3000/api
WHATSAPP_WEBHOOK_SECRET=your-super-secret-webhook-key-here
WHATSAPP_API_TOKEN=your-whatsapp-api-token

# Admin Configuration
WHATSAPP_ADMIN_PHONES=6281234567890,6289876543210
ADMIN_TOKEN=your-existing-admin-token

# Bot Configuration
BOT_NAME=PMK ITERA Bot
BOT_WELCOME_MESSAGE=Selamat datang di PMK ITERA! Ketik 'help' untuk melihat perintah yang tersedia.
```

### 2. go-whatsapp-web-multidevice Setup

1. **Download and run** the go-whatsapp-web-multidevice server:

    ```bash
    git clone https://github.com/aldinokemal/go-whatsapp-web-multidevice
    cd go-whatsapp-web-multidevice
    go run main.go
    ```

2. **Configure webhook** in the go-whatsapp server to point to your Next.js application:
    - Webhook URL: `https://your-domain.com/api/whatsapp/webhook`
    - Include your webhook secret in the Authorization header

### 3. WhatsApp Device Connection

1. **Access QR code** from your go-whatsapp server (usually at `http://localhost:3000`)
2. **Scan QR code** with your WhatsApp mobile app
3. **Verify connection** in the server logs

### 4. Testing the Integration

1. **Send a test message** to your WhatsApp number
2. **Check webhook** is receiving messages in your Next.js logs
3. **Test bot commands**:
    - Send "help" to see available commands
    - Send "about" to test basic responses
    - Send "renungan" to test devotional features

## Available Bot Commands

### Basic Commands

-   `help` - Show available commands
-   `start` - Welcome message and introduction
-   `about` - Information about PMK ITERA
-   `contact` - Contact information

### PMK Information

-   `pengurus` - Show organization structure
-   `kegiatan` - Show upcoming activities
-   `visi` - Show vision and mission
-   `misi` - Show vision and mission

### Devotional Content

-   `renungan` - Get daily devotional
-   `ayat` - Get verse of the day
-   `renungan [date]` - Get devotional for specific date (YYYY-MM-DD)

### Articles

-   `artikel` - List latest articles
-   `artikel [id]` - Get specific article by ID
-   `cari artikel [keyword]` - Search articles by keyword

### Admin Commands (Admin only)

-   `/admin help` - Show admin commands
-   `/admin stats` - Show bot statistics
-   `/admin broadcast [message]` - Broadcast message to all members
-   `/admin add [phone]` - Add new member
-   `/admin remove [phone]` - Remove member

## File Structure

```
services/whatsapp/
├── whatsapp-service.ts      # Main WhatsApp service
├── message-processor.ts     # Message processing engine
├── logger.ts               # Logging service
└── handlers/
    ├── basic-commands.ts   # Basic bot commands
    ├── pmk-info.ts        # PMK organization info
    ├── devotional.ts      # Devotional content
    ├── article.ts         # Article management
    └── admin.ts           # Admin commands

app/api/whatsapp/
├── webhook/route.ts       # Webhook receiver
├── send/route.ts         # Send message API
└── send-media/route.ts   # Send media API

types/
└── whatsapp.ts           # TypeScript definitions
```

## API Endpoints

### 1. Webhook Receiver

-   **URL**: `POST /api/whatsapp/webhook`
-   **Auth**: Bearer token (webhook secret)
-   **Purpose**: Receives incoming WhatsApp messages and events

### 2. Send Message

-   **URL**: `POST /api/whatsapp/send`
-   **Auth**: Admin token
-   **Body**:
    ```json
    {
        "phone": "6281234567890",
        "message": "Hello from PMK ITERA!",
        "delay": 0
    }
    ```

### 3. Send Media

-   **URL**: `POST /api/whatsapp/send-media`
-   **Auth**: Admin token
-   **Body**:
    ```json
    {
        "phone": "6281234567890",
        "media_url": "https://example.com/image.jpg",
        "type": "image",
        "caption": "Check out this image!"
    }
    ```

## Customization

### Adding New Commands

1. **Create a new handler** in `services/whatsapp/handlers/`
2. **Implement MessageHandler interface**
3. **Add to MessageProcessor** in `message-processor.ts`

Example:

```typescript
export class CustomHandler {
    static getHandlers(): MessageHandler[] {
        return [
            {
                keyword: "custom",
                description: "Custom command",
                handler: CustomHandler.handleCustom,
            },
        ]
    }

    static async handleCustom(message: WhatsAppMessage, context: MessageContext): Promise<string> {
        return "This is a custom response!"
    }
}
```

### Integrating with Database

Replace mock data functions in handlers with actual database queries:

```typescript
// Replace this mock function
private static async getLatestArticles() {
  return mockData
}

// With actual database call
private static async getLatestArticles() {
  const articles = await db.article.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10
  })
  return articles
}
```

### Adding Media Support

The system supports sending images, documents, audio, and video through the `/api/whatsapp/send-media` endpoint.

## Security Considerations

1. **Webhook Secret**: Use a strong, unique secret for webhook validation
2. **Admin Tokens**: Secure admin authentication tokens
3. **Rate Limiting**: Implement rate limiting for API endpoints
4. **Input Validation**: Validate all incoming message content
5. **Phone Number Privacy**: Handle phone numbers securely

## Troubleshooting

### Common Issues

1. **Webhook not receiving messages**

    - Check webhook URL configuration in go-whatsapp server
    - Verify webhook secret matches
    - Check firewall/network settings

2. **Bot not responding**

    - Check message processor logs
    - Verify handler registration
    - Test individual handlers

3. **Media sending fails**
    - Check media URL accessibility
    - Verify media type support
    - Check file size limits

### Logs and Monitoring

Monitor the following logs:

-   Next.js application logs
-   go-whatsapp-web-multidevice server logs
-   WhatsApp webhook events
-   Bot command usage

## Production Deployment

1. **Use HTTPS** for webhook URLs
2. **Set proper environment variables**
3. **Configure proper logging**
4. **Set up monitoring** and alerts
5. **Backup WhatsApp session** data
6. **Implement health checks**

## Support

For support and questions:

-   Check the logs for error messages
-   Review the go-whatsapp-web-multidevice documentation
-   Test individual components separately
-   Verify environment configuration

---

This integration provides a flexible foundation for WhatsApp bot functionality that can be easily extended and customized for PMK ITERA's specific needs.
