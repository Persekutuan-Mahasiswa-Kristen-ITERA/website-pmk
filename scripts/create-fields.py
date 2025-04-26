import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def duplicate_field(collection_name, old_field_name, new_field_name, batch_size=500):
    """
    Duplicates a field in all documents of a Firestore collection with a new field name.

    Args:
        collection_name (str): The name of the Firestore collection.
        old_field_name (str): The name of the field to duplicate.
        new_field_name (str): The new name for the duplicated field.
        batch_size (int): The number of documents to process in each batch.
    """

    db = firestore.client()  # Get firestore client

    collection_ref = db.collection(collection_name)
    docs = collection_ref.stream()  # Use .stream() for potentially large collections

    batch = db.batch()
    count = 0

    for doc in docs:
        doc_dict = doc.to_dict()
        if old_field_name in doc_dict:
            new_value = doc_dict[old_field_name]
            updated_data = {
                new_field_name: new_value
            }
            batch.set(collection_ref.document(doc.id), updated_data, merge=True)  # Duplicates the field

            count += 1

        if count >= batch_size:
            batch.commit()  # commits changes to documents
            batch = db.batch()  # creates a new batch after committing
            print(f"Processed {count} documents")  # prints how many documents have been updated
            count = 0

    if count > 0:  # commits the remaining documents
        batch.commit()
        print(f"Processed {count} documents")
    print("Field duplication complete!")

# Path to your service account key JSON file (replace with your actual path)
key_file_path = 'firebase_keys.json'

# Initialize Firebase Admin SDK
cred = credentials.Certificate(key_file_path)
firebase_admin.initialize_app(cred)  # initializes firebase

# Example usage (replace with your actual collection and field names)
collection_name = "devotionals"
old_field_name = "createdAt"
new_field_name = "updatedAt"
duplicate_field(collection_name, old_field_name, new_field_name)  # calls the function that duplicates the fields
