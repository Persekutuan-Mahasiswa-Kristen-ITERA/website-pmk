// Test the timestamp serialization
import admin from "firebase-admin"

// Simulate what happens in our serializer
const testTimestamp = admin.firestore.Timestamp.fromDate(new Date())
const serializedTimestamp = testTimestamp.toDate().toISOString().replace(/\.\d{3}Z$/, 'Z')

console.log("Original timestamp:", testTimestamp)
console.log("Serialized timestamp:", serializedTimestamp)
console.log("Expected format: 2024-05-20T00:00:00Z")
