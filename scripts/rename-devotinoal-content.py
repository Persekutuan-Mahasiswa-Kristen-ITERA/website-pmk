import firebase_admin
from firebase_admin import credentials, firestore, auth
import json
import os

# --- Firebase Initialization ---
# Read Firebase service account key from firebase_keys.json
try:
    # Get the script directory to find the firebase_keys.json file
    script_dir = os.path.dirname(os.path.abspath(__file__))
    firebase_keys_path = os.path.join(script_dir, 'firebase_keys.json')
    
    # Check if file exists
    if not os.path.exists(firebase_keys_path):
        print("Error: firebase_keys.json not found. Please ensure the file exists in the project root.")
        exit(1)
    
    # Read and parse the Firebase service account key
    with open(firebase_keys_path, 'r') as f:
        firebase_config = json.load(f)
    
    print("Successfully loaded Firebase configuration from firebase_keys.json")
    
except json.JSONDecodeError as e:
    print(f"Error: Could not parse firebase_keys.json. Please ensure it's a valid JSON file. Error: {e}")
    exit(1)
except Exception as e:
    print(f"Error reading firebase_keys.json: {e}")
    exit(1)

# Initialize Firebase Admin SDK
if not firebase_admin._apps:
    try:
        # Initialize with service account credentials from firebase_keys.json
        cred = credentials.Certificate(firebase_config)
        firebase_admin.initialize_app(cred)
        print("Firebase Admin SDK initialized successfully with service account credentials.")
    except Exception as e:
        print(f"Error: Could not initialize Firebase Admin SDK. Error: {e}")
        exit(1)


db = firestore.client()

# Get app_id from firebase_config
app_id = firebase_config.get('project_id', 'default-app-id')

# --- Authentication ---
async def authenticate_and_run():
    """Authenticates the Firebase app and then runs the document update process."""
    try:
        print("Admin SDK is authenticated via service account credentials.")
        print(f"Using project ID: {app_id}")
        await update_devotional_content()

    except Exception as e:
        print(f"Authentication or script execution failed: {e}")

# --- Document Update Logic ---
async def update_devotional_content():
    """
    Iterates through documents in the 'devotional' collection,
    replaces "Tuhan" (case-insensitive) with "TUHAN" in the 'content' field,
    and updates the documents in Firestore.
    """
    print("Starting update process for 'devotional' collection...")

    # Define the collection path based on security rules for public data.
    # Collection path: /artifacts/{appId}/public/data/{your_collection_name}.
    collection_path = f"devotionals"
    devotional_ref = db.collection(collection_path)

    try:
        docs = devotional_ref.stream() # Get all documents in the collection

        updated_count = 0
        for doc in docs:
            doc_data = doc.to_dict()
            doc_id = doc.id
            print(f"Processing document: {doc_id}")

            if 'content' in doc_data and isinstance(doc_data['content'], str):
                original_content = doc_data['content']
                # Replace "Tuhan" (case-insensitive) with "TUHAN" (uppercase)
                # re.sub is used for case-insensitive replacement
                import re
                new_content = re.sub(r"Tuhan", "TUHAN", original_content, flags=re.IGNORECASE)

                if new_content != original_content:
                    # Update the document if content has changed
                    doc_ref = devotional_ref.document(doc_id)
                    doc_ref.update({'content': new_content})
                    print(f"  Updated document {doc_id}: Replaced 'Tuhan' with 'TUHAN'.")
                    updated_count += 1
                else:
                    print(f"  No 'Tuhan' found in content for document {doc_id}. Skipping update.")
            else:
                print(f"  Document {doc_id} does not have a 'content' field or it's not a string. Skipping.")

        print(f"Update process complete. Total documents updated: {updated_count}")

    except Exception as e:
        print(f"An error occurred during Firestore operation: {e}")

# --- Main execution block ---
# This block ensures the async function runs when the script is executed.
if __name__ == '__main__':
    import asyncio
    asyncio.run(authenticate_and_run())

