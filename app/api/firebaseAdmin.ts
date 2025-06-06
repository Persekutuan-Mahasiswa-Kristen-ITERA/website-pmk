import * as admin from "firebase-admin"

// Your Firebase configuration should be added here
// For actual implementation, replace this with your project's Firebase config
const firebaseAdminConfig = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
}

// Initialize Firebase services
const app = admin.initializeApp(firebaseAdminConfig)
const firestore = admin.firestore(app)

export { app, firestore }
