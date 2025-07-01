# PMK Website

A modern Next.js website for Persekutuan Mahasiswa Kristen (PMK) featuring content management, WhatsApp integration, and administrative tools.

## 🚀 Features

### Core Features
- **Content Management**: Articles, devotionals, events, and documentation
- **WhatsApp Bot Integration**: Automated messaging and content delivery
- **Admin Dashboard**: Complete CRUD operations for all content types
- **Daily Devotionals**: Structured devotional content with Bible verses
- **Event Management**: Upcoming events and registration system
- **Mobile Responsive**: Optimized for all device sizes

### Technical Features
- **Authentication**: Firebase Auth with Google provider
- **Database**: Firestore for data persistence
- **File Storage**: Firebase Storage for media files
- **Real-time Updates**: Live data synchronization
- **SEO Optimized**: Next.js SEO and sitemap generation
- **Modern UI**: Tailwind CSS with Radix UI components

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Runtime**: Bun
- **Styling**: Tailwind CSS + Radix UI
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query
- **Animations**: AOS (Animate On Scroll)

## 📁 Project Structure

```
app/
├── admin/          # Admin dashboard and management
├── api/            # API routes and Firebase admin
├── article/        # Article pages and layouts
├── devotional/     # Devotional content pages
├── documentation/  # Documentation system
├── event/          # Event management
└── management/     # Organization management

components/
├── admin/          # Admin-specific components
├── crud/           # CRUD operation components
├── hero/           # Hero section components
├── home/           # Homepage components
├── layout/         # Layout components
└── ui/             # Reusable UI components

types/              # TypeScript type definitions
services/           # External service integrations
hooks/              # Custom React hooks
lib/                # Utility libraries and Firebase config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Firebase project
- WhatsApp Business API (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd website-pmk
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Firebase Admin (for server-side operations)
   FIREBASE_ADMIN_PROJECT_ID=your_project_id
   FIREBASE_ADMIN_CLIENT_EMAIL=your_service_account_email
   FIREBASE_ADMIN_PRIVATE_KEY=your_private_key

   # WhatsApp Integration (optional)
   WHATSAPP_API_URL=your_whatsapp_api_url
   WHATSAPP_API_TOKEN=your_api_token
   ```

4. **Firebase Setup**
   - Create a Firebase project
   - Enable Firestore Database
   - Enable Authentication (Google provider)
   - Enable Storage
   - Download and configure service account keys

5. **Run the development server**
   ```bash
   bun dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

```bash
bun dev          # Start development server with Turbopack
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint
```

## 🔧 Configuration

### Firebase Rules
Configure Firestore security rules in your Firebase console for collections:
- `articles`
- `devotionals`
- `events`
- `documentation`
- `management`

### WhatsApp Integration
The project includes a complete WhatsApp bot system. See `docs/WHATSAPP_INTEGRATION_STATUS.md` for detailed setup instructions.

## 📱 Admin Features

Access the admin dashboard at `/admin` with the following features:
- Content management (CRUD operations)
- User management
- Analytics and statistics
- WhatsApp broadcast messaging
- File upload and management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in the `docs/` folder

---

Built with ❤️ for the PMK community
