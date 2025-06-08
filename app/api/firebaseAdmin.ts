import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

/* eslint-disable @typescript-eslint/no-explicit-any */

let app: any = null
let firestore: any = null

// Only initialize during runtime, not build time
if (typeof window === "undefined" && process.env.NODE_ENV !== "test") {
    try {
        // Check if we have the required environment variables
        if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
            if (getApps().length === 0) {
                app = initializeApp({
                    credential: cert({
                        projectId: process.env.FIREBASE_PROJECT_ID,
                        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
                    }),
                })
            } else {
                app = getApps()[0]
            }

            if (app) {
                firestore = getFirestore(app)
            }
        } else {
            console.log("Firebase admin skipped: Missing environment variables")
        }
    } catch (error) {
        console.log("Firebase admin initialization skipped during build:", error)
    }
}

export { firestore }
