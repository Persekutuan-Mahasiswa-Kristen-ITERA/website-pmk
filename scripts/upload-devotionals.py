import firebase_admin
from firebase_admin import credentials, firestore
import json
from datetime import datetime
import uuid

def upload_devotionals_to_firestore(devotionals, service_account_path, collection_name):
    # Initialize Firebase Admin SDK
    if not firebase_admin._apps:
        cred = credentials.Certificate(service_account_path)
        firebase_admin.initialize_app(cred)

    db = firestore.client()

    for devotional in devotionals:
        doc_id = str(uuid.uuid4())
        doc_ref = db.collection(collection_name).document(doc_id)
        
        # Convert string dates to proper Firestore timestamps
        created_at = datetime.strptime(devotional["createdAt"], "%Y-%m-%dT%H:%M:%SZ")
        updated_at = datetime.strptime(devotional["updatedAt"], "%Y-%m-%dT%H:%M:%SZ")
        
        data = {
            "title": devotional["title"],
            "verse": devotional["verse"],
            "preview": devotional["preview"],
            "content": devotional["content"],
            "author": devotional["author"],
            "category": devotional["category"],
            "createdAt": created_at,
            "updatedAt": updated_at
        }

        doc_ref.set(data)
        print(f"[✓] Uploaded devotional '{devotional['title']}' successfully.")

# Load devotionals from JSON file
with open("devotionals_formatted.json", "r", encoding="utf-8") as f:
    devotionals = json.load(f)

# Path to service account JSON key
service_account_path = "firebase_keys.json"
collection_name = "devotionals"

upload_devotionals_to_firestore(devotionals, service_account_path, collection_name)
