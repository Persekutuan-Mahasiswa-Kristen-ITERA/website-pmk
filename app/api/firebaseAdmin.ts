import { cert, getApps, initializeApp, type App } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

const serviceAccountBase64 = process.env.FIREBASE_ADMIN_SDK_CONFIG_BASE64
if (!serviceAccountBase64) {
    throw new Error("FIREBASE_ADMIN_SDK_CONFIG_BASE64 environment variable is not set.")
}

const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, "base64").toString("utf8"))

// Reuse the named app when this module is evaluated more than once (several
// route bundles, dev hot reload); initializeApp throws on a duplicate name.
const app: App =
    getApps().find((existing) => existing.name === "adminApp") ??
    initializeApp({ credential: cert(serviceAccount) }, "adminApp")
const firestore = getFirestore(app)

export { app, firestore }
