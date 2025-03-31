
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { FileText, Search, Calendar, ChevronRight } from 'lucide-react';

export type ArtikelData = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: {
    name: string;
    image?: string;
  };
  tags: string[];
  readTime: number;
  imageUrl: string;
};

export const ARTIKEL_DATA: ArtikelData[] = [
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
    {
        id: 4,
        title: "Mengatasi Keraguan Iman di Lingkungan Akademis",
        slug: "mengatasi-keraguan-iman-di-lingkungan-akademis",
        excerpt:
            "Bagaimana menghadapi tantangan intelektual terhadap iman Kristen di lingkungan kampus yang seringkali sekular.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        date: "20 Juni 2023",
        author: {
            name: "Rebecca Situmorang",
            image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
        },
        tags: ["Apologetika", "Akademik", "Keraguan"],
        readTime: 8,
        imageUrl:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=630&q=80",
    },
    {
        id: 5,
        title: "Pelayanan Sosial sebagai Wujud Kasih Kristus",
        slug: "pelayanan-sosial-sebagai-wujud-kasih",
        excerpt:
            "Pentingnya keterlibatan mahasiswa Kristen dalam aksi sosial sebagai bentuk nyata dari iman yang hidup.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        date: "15 Juni 2023",
        author: {
            name: "Samuel Pakpahan",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
        },
        tags: ["Sosial", "Pelayanan", "Kasih"],
        readTime: 5,
        imageUrl:
            "https://images.unsplash.com/photo-1488521787991-ed7bbafc3ceb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=630&q=80",
    },
    {
        id: 6,
        title: "Membangun Kebiasaan Doa dan Pembacaan Alkitab",
        slug: "membangun-kebiasaan-doa-dan-pembacaan-alkitab",
        excerpt:
            "Panduan praktis untuk mahasiswa Kristen dalam mengembangkan disiplin rohani di tengah kesibukan kuliah.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        date: "8 Juni 2023",
        author: {
            name: "Maria Hutapea",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80",
        },
        tags: ["Disiplin Rohani", "Doa", "Alkitab"],
        readTime: 6,
        imageUrl:
            "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=630&q=80",
    },
]

const ALL_TAGS = Array.from(new Set(ARTIKEL_DATA.flatMap(artikel => artikel.tags)));

const ArtikelPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredArtikels = ARTIKEL_DATA.filter(artikel => {
    const matchesSearch = searchQuery === '' || 
      artikel.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      artikel.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artikel.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === null || artikel.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const toggleTag = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  return (
    <MainLayout>
      <div className="bg-brown-100 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 text-center">
            Artikel
          </h1>
          <p className="text-center text-brown-600 mt-4 max-w-2xl mx-auto">
            Tulisan dan pemikiran seputar kehidupan Kristen di konteks kampus
          </p>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 mb-12">
            <div className="w-full md:w-2/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-400" />
                <Input 
                  placeholder="Cari artikel..." 
                  className="pl-10 border-brown-200 focus:border-brown-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex flex-wrap gap-2">
                {ALL_TAGS.map(tag => (
                  <Badge 
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedTag === tag ? 'bg-brown-700 hover:bg-brown-800' : 'border-brown-200 text-brown-700 hover:bg-brown-50'
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredArtikels.map(artikel => (
              <Card key={artikel.id} className="border-brown-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                  <div className="h-48 md:h-full bg-brown-200">
                    <img 
                      src={artikel.imageUrl} 
                      alt={artikel.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-3">
                        <FileText className="h-4 w-4 text-brown-400 mr-2" />
                        <span className="text-xs text-brown-500">{artikel.readTime} menit membaca</span>
                      </div>
                      <h3 className="text-xl font-serif text-brown-800 mb-2">{artikel.title}</h3>
                      <p className="text-brown-600 text-sm mb-4 line-clamp-2">{artikel.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {artikel.tags.map(tag => (
                          <Badge 
                            key={tag}
                            variant="outline"
                            className="border-brown-200 text-brown-600 text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={artikel.author.image} alt={artikel.author.name} />
                            <AvatarFallback className="bg-brown-200 text-brown-700 text-xs">
                              {artikel.author.name.split(' ').map(name => name[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-brown-700">{artikel.author.name}</p>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 text-brown-400 mr-1" />
                              <span className="text-xs text-brown-500">{artikel.date}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          asChild 
                          variant="ghost" 
                          size="sm"
                          className="text-brown-700 hover:text-brown-900 hover:bg-brown-50 p-0"
                        >
                          <Link to={`/artikel/${artikel.slug}`} className="flex items-center">
                            <span className="mr-1">Baca</span>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredArtikels.length === 0 && (
            <div className="text-center py-16">
              <p className="text-brown-600">Tidak ada artikel yang sesuai dengan kriteria pencarian.</p>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default ArtikelPage;
