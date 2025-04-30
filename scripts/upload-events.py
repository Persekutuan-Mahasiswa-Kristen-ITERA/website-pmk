import requests
import uuid
from datetime import datetime

def upload_events_to_firestore(events, id_token, collection_name, project_id):
    base_url = f"https://firestore.googleapis.com/v1/projects/{project_id}/databases/(default)/documents/{collection_name}"

    headers = {
        "Authorization": f"Bearer {id_token}",
        "Content-Type": "application/json"
    }

    for event in events:
        doc_id = event.get("id", str(uuid.uuid4()))
        doc_data = {
            "fields": {
                "title": {"stringValue": event["title"]},
                "date": {"stringValue": event["date"]},
                "time": {"stringValue": event["time"]},
                "location": {"stringValue": event["location"]},
                "description": {"stringValue": event["description"]},
                "createdAt": {"timestampValue": datetime.utcnow().isoformat() + "Z"},
                "updatedAt": {"timestampValue": datetime.utcnow().isoformat() + "Z"}
            }
        }

        if event.get("image"):
            doc_data["fields"]["image"] = {"stringValue": event["image"]}

        response = requests.post(f"{base_url}?documentId={doc_id}", headers=headers, json=doc_data)

        if response.status_code == 200:
            print(f"[✓] Uploaded '{event['title']}' successfully.")
        else:
            print(f"[✗] Failed to upload '{event['title']}': {response.text}")

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


# Ganti dengan data aktual
id_token = "YOUR_FIREBASE_ID_TOKEN"
collection_name = "events"
project_id = "YOUR_FIREBASE_PROJECT_ID"

upload_events_to_firestore(events, id_token, collection_name, project_id)
