import admin from "firebase-admin"

const serviceAccountBase64 = process.env.FIREBASE_ADMIN_SDK_CONFIG_BASE64
if (!serviceAccountBase64) {
    throw new Error("FIREBASE_ADMIN_SDK_CONFIG_BASE64 environment variable is not set.")
}

const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, "base64").toString("utf8"))

let app: admin.app.App | null = null

if (!app) {
    app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) }, "adminApp")
}
const firestore = admin.firestore(app)

export { app, firestore }
