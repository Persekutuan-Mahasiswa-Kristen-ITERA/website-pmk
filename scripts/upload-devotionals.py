import firebase_admin
from firebase_admin import credentials, firestore
import uuid
from datetime import datetime

def upload_events_to_firestore_with_key(events, service_account_path, collection_name):
    # Inisialisasi Firebase Admin SDK
    if not firebase_admin._apps:
        cred = credentials.Certificate(service_account_path)
        firebase_admin.initialize_app(cred)

    db = firestore.client()

    for event in events:
        doc_id = event.get("id", str(uuid.uuid4()))
        doc_ref = db.collection(collection_name).document(doc_id)

        data = {
            "title": event["title"],
            "date": event["date"],
            "time": event["time"],
            "location": event["location"],
            "description": event["description"],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }

        if event.get("image"):
            data["image"] = event["image"]

        doc_ref.set(data)
        print(f"[✓] Uploaded '{event['title']}' successfully.")

# ==== Example usage ====

events = [
  {
    "id": "event-upgrading-bph",
    "title": "Upgrading BPH PMK ITERA",
    "date": "2025-03-01",
    "time": "TBD",
    "location": "TBD",
    "description": "Kegiatan internal namun terbuka untuk dokumentasi publik: Upgrading BPH untuk menyatukan visi dan membentuk tim yang solid."
  },
  {
    "id": "event-lustrum",
    "title": "Lustrum PMK ITERA",
    "date": "2025-03-17",
    "time": "TBD",
    "location": "TBD",
    "description": "Perayaan Lustrum PMK ITERA sebagai momentum refleksi dan syukur, terbuka untuk seluruh sivitas akademika dan alumni."
  },
  {
    "id": "event-paskah",
    "title": "Ibadah dan Perayaan Paskah",
    "date": "2025-05-04",
    "time": "TBD",
    "location": "TBD",
    "description": "Ibadah dan perayaan Paskah PMK ITERA, terbuka untuk umum sebagai bentuk sukacita memperingati kebangkitan Kristus."
  },
  {
    "id": "event-first-gathering",
    "title": "First Gathering",
    "date": "2025-08-18",
    "time": "TBD",
    "location": "TBD",
    "description": "First Gathering untuk menyambut anggota baru dan membangun kebersamaan antar anggota PMK ITERA."
  },
  {
    "id": "event-open-night-worship",
    "title": "Open Night Worship",
    "date": "2025-09-28",
    "time": "TBD",
    "location": "TBD",
    "description": "Ibadah malam terbuka yang dirancang untuk mempererat iman dan persekutuan bersama Tuhan dan sesama."
  },
  {
    "id": "event-natal",
    "title": "Ibadah Perayaan Natal",
    "date": "2025-12-07",
    "time": "TBD",
    "location": "TBD",
    "description": "Ibadah dan perayaan Natal PMK ITERA terbuka bagi mahasiswa dan umum sebagai bentuk perayaan kelahiran Kristus."
  },
  {
    "id": "event-pemira",
    "title": "Pemilihan Raya",
    "date": "2025-11-15",
    "time": "TBD",
    "location": "TBD",
    "description": "Pemilihan Raya PMK ITERA untuk memilih kepengurusan baru, terbuka bagi seluruh anggota PMK ITERA untuk berpartisipasi."
  }
]


# Ganti dengan path ke service account JSON key kamu
service_account_path = "firebase_keys.json"
collection_name = "events"

upload_events_to_firestore_with_key(events, service_account_path, collection_name)
