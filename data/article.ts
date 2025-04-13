import { FirebaseService } from "@/services/firebase-service"
import { Article } from "@/types/article"

const collectionName = "articles"
const articlesService = new FirebaseService<Article>(collectionName)

async function getArticles() {
    const response = (await articlesService.getAll()).items
    return response
}

async function getArticleById(id: string) {
    const response = await articlesService.getById(id)
    return response
}

async function addArticle(article: Article) {
    const response = await articlesService.create(article)
    return response
}

async function updateArticle(id: string, article: Partial<Article>) {
    const response = await articlesService.update(id, article)
    return response
}

async function deleteArticle(id: string) {
    const response = await articlesService.delete(id)
    return response
}

export const articles: Article[] = [
    {
        id: 1,
        title: "The Reformation Rescued the Gospel (Reformasi Menyelamatkan Injil)",
        slug: "the-reformation-rescued-the-gospel",
        excerpt:
            "Kita tahu bagaimana perasaan Martin Luther terhadap kontroversi ini. Ia menyebut pembenaran oleh iman saja sebagai “pasal di mana gereja berdiri atau jatuh” (articulus stantis et cadentis ecclesiae). Penegasan akan pentingnya hal ini terkait dengan identifikasi Luther akan pembenaran oleh iman saja (sola fide) dengan Injil. “Kabar baik” dari Perjanjian Baru tidak hanya mencakup pengumuman tentang pribadi Kristus dan karya-Nya bagi kita, tetapi juga sebuah pernyataan tentang bagaimana manfaat dari karya Kristus digunakan oleh, di dalam, dan untuk orang percaya.",
        content: `
# The Reformation Rescued the Gospel (Reformasi Menyelamatkan Injil)

oleh: R.C. Sproul

Di kota tua Jenewa, Swiss, terdapat sebuah taman yang indah yang berdekatan dengan Universitas Jenewa, dekat dengan gereja tempat John Calvin berkhotbah dan mengajar setiap hari. Taman ini berisi peringatan abadi untuk Reformasi Protestan abad ke-16. Fitur utamanya adalah dinding megah yang dihiasi dengan patung-patung Calvin, John Knox, Huldrych Zwingli, Theodore Beza, dan lainnya. Terpahat di batu adalah kata-kata Latin *Post tenebras lux* ("Setelah gelap, terang").

Kata-kata ini menggambarkan kekuatan pendorong Reformasi. Kegelapan yang dimaksud adalah kegelapan Injil pada akhir Abad Pertengahan. Kegelapan yang berangsur-angsur mencapai titik nadirnya, dan terang dari doktrin pembenaran oleh iman saja telah padam.

## Bahan Bakar untuk Api

Badai api Reformasi disulut oleh isu yang paling bergejolak yang pernah diperdebatkan dalam sejarah gereja. Gereja telah menghadapi krisis-krisis yang parah di masa lalu, terutama pada abad keempat dan kelima ketika sifat Kristus dipertaruhkan. Aliran sesat Arianisme pada abad keempat memuncak pada Konsili Nicea dan Pengakuan Iman Nicea. Abad kelima menjadi saksi perjuangan gereja melawan aliran monofisit dan Nestorian yang menghasilkan deklarasi yang jelas dari Konsili Khalsedon tentang kemanusiaan dan keilahian Kristus. Sejak Nicea dan Khalsedon, keputusan ekumenis dari konsili-konsili ini telah menjadi tolok ukur bagi ortodoksi Kristen yang bersejarah. Doktrin Trinitas dan penyatuan kodrat ilahi dan manusiawi Kristus sejak itu dianggap, hampir secara universal, sebagai prinsip-prinsip penting dalam iman Kristen.

Setiap generasi di sepanjang sejarah gereja telah menyaksikan pergumulan dan perdebatan doktrinal. Ajaran sesat dalam berbagai bentuk telah menjangkiti gereja dan memicu perdebatan sengit, bahkan perpecahan.

Tetapi tidak ada perselisihan doktrinal yang pernah diperdebatkan dengan lebih sengit atau dengan konsekuensi jangka panjang seperti perdebatan terkait *justification* (pembenaran kepada orang percaya atas dosanya). Ada isu-isu pendukung lainnya yang diperdebatkan pada abad ke-16, tetapi tidak ada yang begitu sentral atau begitu panas seperti ini.

> "Tidak ada perselisihan doktrinal yang pernah diperdebatkan dengan begitu sengit atau dengan konsekuensi jangka panjang seperti perdebatan terkait justification (pembenaran kepada orang percaya atas dosanya)."

Para sejarawan sering menggambarkan pembenaran sebagai penyebab material dari Reformasi. Artinya, ini adalah isu substantif dan inti dari perdebatan tersebut. Doktrin inilah yang menyebabkan perpecahan terdalam dalam Kekristenan dan perpecahan gereja menjadi ribuan denominasi.

## Sola Fide atau Bust

Bagaimana mungkin sebuah perselisihan mengenai satu doktrin dapat menyebabkan begitu banyak serpihan dan memicu begitu banyak permusuhan? Apakah ini hanyalah kasus konflik di antara para teolog yang suka bertengkar, keras kepala, dan suka berperang hanya karena masalah-masalah sepele? Apakah ini merupakan kasus kesalahpahaman yang berulang-ulang yang memicu prahara di dalam teko—banyak basa-basi tentang hal yang tidak penting?

Kita tahu bagaimana perasaan Martin Luther terhadap kontroversi ini. Ia menyebut pembenaran oleh iman saja sebagai *“pasal di mana gereja berdiri atau jatuh”* (articulus stantis et cadentis ecclesiae). Penegasan akan pentingnya hal ini terkait dengan identifikasi Luther akan pembenaran oleh iman saja (*sola fide*) dengan Injil. *“Kabar baik”* dari Perjanjian Baru tidak hanya mencakup pengumuman tentang pribadi Kristus dan karya-Nya bagi kita, tetapi juga sebuah pernyataan tentang bagaimana manfaat dari karya Kristus digunakan oleh, di dalam, dan untuk orang percaya.

> *“Menolak pembenaran oleh iman saja berarti menolak Injil dan jatuh sebagai sebuah gereja.”*

Isu tentang bagaimana pembenaran dan keselamatan diterima menjadi titik perdebatan yang paling penting. Desakan Luther terhadap *sola fide* didasarkan pada keyakinan bahwa *“bagaimana”* pembenaran merupakan bagian integral dan esensial dari Injil itu sendiri. Ia memandang pembenaran oleh iman saja sebagai sesuatu yang penting dan esensial bagi Injil dan keselamatan.

Karena Injil berdiri di jantung iman Kristen, Luther dan para Reformator lainnya menganggap perdebatan mengenai pembenaran sebagai sesuatu yang melibatkan kebenaran esensial Kekristenan, sebuah doktrin yang tidak kalah pentingnya dengan Trinitas atau natur ganda Kristus. Tanpa Injil, gereja akan jatuh. Tanpa Injil, gereja tidak lagi menjadi gereja.

Para Reformator mengikuti logika ini:

1. Pembenaran oleh iman saja merupakan hal yang esensial bagi Injil.
2. Injil sangat penting bagi Kekristenan dan keselamatan.
3. Injil sangat penting bagi sebuah gereja untuk menjadi gereja yang sejati.
4. Menolak pembenaran oleh iman saja berarti menolak Injil dan jatuh sebagai gereja.

## Mendorong Kembali Kegelapan

Para Reformator menyimpulkan bahwa ketika gereja-gereja non-Protestan lain menolak dan mengutuk *sola fide*, gereja-gereja non-Protestan lain juga mengutuk dirinya sendiri dan tidak lagi menjadi gereja yang sejati. Hal ini mendorong terbentuknya persekutuan-persekutuan atau denominasi-denominasi baru yang berusaha untuk meneruskan kekristenan yang alkitabiah dan menjadi gereja yang benar dengan Injil yang benar. Mereka berusaha menyelamatkan Injil dari ancaman gerhana total yang akan datang.

Metafora gerhana sangat membantu. Gerhana matahari tidak menghancurkan matahari; gerhana mengaburkannya. Gerhana membawa kegelapan di tempat yang tadinya terang. Para Reformator berusaha untuk menghilangkan gerhana sehingga terang Injil dapat kembali bersinar dengan terang yang penuh.

---

**Link artikel referensi:**  
[The Gospel Coalition - The Reformation Rescued the Gospel](https://www.thegospelcoalition.org/article/reformation-rescued-the-gospel/)
`,
        date: "10 Juli 2023",
        author: {
            name: "Robert Charles Sproul",
            image: "https://davidccook.org/wp-content/uploads/rc-sproul.jpg",
        },
        tags: ["Apologetika"],
        readTime: 5,
        imageUrl: "https://davidccook.org/wp-content/uploads/rc-sproul.jpg",
    },
    {
        id: 2,
        title: "Membangun Komunitas Iman yang Inklusif di Kampus",
        slug: "membangun-komunitas-iman-yang-inklusif",
        excerpt:
            "Strategi praktis untuk menciptakan komunitas mahasiswa Kristen yang terbuka dan menyambut semua orang tanpa mengorbankan nilai-nilai iman.",
        content: `
# Membangun Komunitas Iman yang Inklusif di Kampus

## Pendahuluan

Sebagai mahasiswa Kristen, kita dipanggil untuk menciptakan komunitas yang mencerminkan kasih Kristus yang inklusif namun tetap berpegang pada kebenaran Firman Tuhan.

## Pentingnya Inklusivitas dalam Komunitas Kristen

Yesus sendiri memberi contoh dengan bergaul dengan berbagai lapisan masyarakat, termasuk mereka yang termarjinalkan. Komunitas Kristen yang sehat harus mencerminkan sikap ini.

> "Sebab itu terimalah satu akan yang lain, sama seperti Kristus juga telah menerima kita, untuk kemuliaan Allah." - Roma 15:7

## Langkah-langkah Praktis

### 1. Ciptakan Lingkungan yang Aman

- Jadikan persekutuan sebagai *safe space* bagi siapa saja
- Hargai perbedaan pendapat dan latar belakang
- Hindari sikap menghakimi

### 2. Buka Ruang Dialog yang Sehat

Diskusi terbuka tentang topik-topik sulit perlu difasilitasi dengan:
- Mendengarkan aktif
- Menghormati perspektif berbeda
- Berdasarkan Firman Tuhan

### 3. Tunjukkan Kasih dalam Tindakan Nyata

**Program-program yang dapat diimplementasikan:**
- Pelayanan sosial kampus
- Kelompok diskusi interfaith
- Mentoring bagi mahasiswa baru

## Kesimpulan

Komunitas Kristen yang inklusif tidak berarti mengorbankan kebenaran, tetapi justru menunjukkan kebenaran melalui kasih Kristus yang diwujudkan dalam sikap terbuka dan menyambut.
    `,
        date: "5 Juli 2023",
        author: {
            name: "Lydia Tambunan",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
        },
        tags: ["Komunitas", "Kampus", "Inklusivitas"],
        readTime: 7,
        imageUrl:
            "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=630&q=80",
    },
    {
        id: 3,
        title: "Menyeimbangkan Akademik dan Pelayanan",
        slug: "menyeimbangkan-akademik-dan-pelayanan",
        excerpt:
            "Tips praktis bagi mahasiswa Kristen untuk tetap unggul dalam studi sambil aktif dalam pelayanan gereja dan kampus.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        date: "28 Juni 2023",
        author: {
            name: "Daniel Hutabarat",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
        },
        tags: ["Akademik", "Pelayanan", "Keseimbangan"],
        readTime: 6,
        imageUrl:
            "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=630&q=80",
    },
]
