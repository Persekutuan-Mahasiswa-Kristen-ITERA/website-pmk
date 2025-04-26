import json
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Path to your Firebase service account key
SERVICE_ACCOUNT_KEY_PATH = 'firebase_keys.json'

# Initialize Firebase app
cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
firebase_admin.initialize_app(cred)

# Initialize Firestore client
db = firestore.client()

# Load devotional entries from JSON file
with open('devotionals_formatted.json', 'r', encoding='utf-8') as file:
    devotionals = json.load(file)

# Upload each devotional entry to Firestore
for idx, devotional in enumerate(devotionals, start=1):
    try:
        # If 'created_at' is a string, convert it to a datetime object
        if isinstance(devotional.get('created_at'), str):
            devotional['created_at'] = datetime.fromisoformat(devotional['created_at'].replace('Z', '+00:00'))

        # Add the devotional entry to the 'devotionals' collection
        db.collection('devotionals').add(devotional)
        print(f"Successfully uploaded devotional {idx}")
    except Exception as e:
        print(f"Error uploading devotional {idx}: {e}")
