
import { MainLayout } from '@/components/layout/MainLayout';
import { SectionHeader } from '@/components/ui/section-header';
import Image from 'next/image';

const Profil = () => {
  return (
    <MainLayout>
      <div className="bg-brown-100 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brown-800 text-center">
            Profil PMK ITERA
          </h1>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionHeader 
                title="Sejarah PMK ITERA" 
                subtitle="Perjalanan persekutuan kami dari awal hingga saat ini"
              />
              
              <div className="prose prose-brown max-w-none">
                <p>
                  Persekutuan Mahasiswa Kristen (PMK) ITERA didirikan pada tahun 2014, tidak lama setelah Institut Teknologi Sumatera (ITERA) resmi dibuka. Berawal dari sekelompok kecil mahasiswa Kristen yang rindu akan persekutuan di lingkungan kampus, PMK ITERA tumbuh secara konsisten dari tahun ke tahun.
                </p>
                <p>
                  Pada awalnya, kegiatan persekutuan diadakan di ruang kelas yang dipinjam, dengan jadwal yang tidak tetap. Seiring bertambahnya jumlah mahasiswa Kristen di ITERA, PMK kemudian mendapatkan dukungan dari pihak kampus untuk menggunakan fasilitas yang lebih memadai.
                </p>
                <p>
                  Sejak tahun 2016, PMK ITERA resmi terdaftar sebagai Unit Kegiatan Mahasiswa (UKM) di bawah naungan kampus. Ini menjadi tonggak penting yang membuka lebih banyak kesempatan untuk mengadakan kegiatan-kegiatan yang lebih terstruktur dan berdampak lebih luas.
                </p>
                <p>
                  Hingga saat ini, PMK ITERA terus bertumbuh dan melayani komunitas Kristen di kampus, dengan berbagai program rutin seperti ibadah mingguan, kelompok kecil, retret, serta kegiatan sosial dan penginjilan.
                </p>
              </div>
            </div>
            
            <div className="space-y-8 mt-8 lg:mt-0">
              <Image 
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=700&q=80" 
                alt="PMK ITERA History" 
                className="w-full h-auto rounded-lg shadow-lg"
                width={1200}
                height={700}
              />
              
              <div className="bg-brown-50 p-8 rounded-lg">
                <h3 className="text-xl font-serif font-medium text-brown-800 mb-4">Tonggak Penting PMK ITERA</h3>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 font-medium text-brown-700">2014</div>
                    <div className="text-brown-600">Persekutuan pertama mahasiswa Kristen ITERA</div>
                  </div>
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 font-medium text-brown-700">2015</div>
                    <div className="text-brown-600">Pembentukan struktur pengurus pertama</div>
                  </div>
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 font-medium text-brown-700">2016</div>
                    <div className="text-brown-600">PMK resmi menjadi Unit Kegiatan Mahasiswa</div>
                  </div>
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 font-medium text-brown-700">2018</div>
                    <div className="text-brown-600">Retret PMK perdana dengan 50+ peserta</div>
                  </div>
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 font-medium text-brown-700">2020</div>
                    <div className="text-brown-600">Adaptasi ke persekutuan online saat pandemi</div>
                  </div>
                  <div className="flex">
                    <div className="w-24 flex-shrink-0 font-medium text-brown-700">2022</div>
                    <div className="text-brown-600">Kembali ke persekutuan tatap muka</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-brown-50">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Visi & Misi" 
            subtitle="Landasan yang membentuk arah pelayanan kami"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-serif text-brown-800 mb-4">Visi</h3>
              <p className="text-brown-700">
                Menjadi persekutuan yang beriman, bertumbuh, dan berbuah dalam Kristus untuk menjadi berkat bagi kampus ITERA dan masyarakat sekitar.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-serif text-brown-800 mb-4">Misi</h3>
              <ul className="text-brown-700 space-y-2">
                <li>1. Membangun persekutuan yang sehat secara rohani di antara mahasiswa Kristen ITERA</li>
                <li>2. Mengembangkan pemuridan yang efektif untuk pertumbuhan iman</li>
                <li>3. Melakukan penginjilan yang kontekstual di lingkungan kampus</li>
                <li>4. Melayani masyarakat sekitar kampus sebagai wujud kasih Kristus</li>
                <li>5. Mempersiapkan pemimpin Kristen yang berkarakter dan terampil</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Nilai-Nilai Kami" 
            subtitle="Prinsip yang memandu setiap langkah dan keputusan dalam persekutuan"
            centered
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-brown-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-serif text-brown-700">F</span>
              </div>
              <h3 className="text-xl font-serif text-brown-800 mb-2">Faith (Iman)</h3>
              <p className="text-brown-600">
                Berpegang teguh pada iman kepada Kristus sebagai dasar dan tujuan dari segala yang kita lakukan.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-brown-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-serif text-brown-700">L</span>
              </div>
              <h3 className="text-xl font-serif text-brown-800 mb-2">Love (Kasih)</h3>
              <p className="text-brown-600">
                Mengasihi Allah dan sesama sebagai wujud dari identitas kita sebagai pengikut Kristus.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-brown-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-serif text-brown-700">S</span>
              </div>
              <h3 className="text-xl font-serif text-brown-800 mb-2">Service (Pelayanan)</h3>
              <p className="text-brown-600">
                Melayani dengan kerendahan hati, mengutamakan kepentingan orang lain di atas diri sendiri.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-brown-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-serif text-brown-700">U</span>
              </div>
              <h3 className="text-xl font-serif text-brown-800 mb-2">Unity (Kesatuan)</h3>
              <p className="text-brown-600">
                Menjaga kesatuan dalam keberagaman, menghargai perbedaan denominasi namun tetap bersatu dalam Kristus.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-brown-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-serif text-brown-700">G</span>
              </div>
              <h3 className="text-xl font-serif text-brown-800 mb-2">Growth (Pertumbuhan)</h3>
              <p className="text-brown-600">
                Berkomitmen untuk terus bertumbuh dalam pengenalan akan Kristus dan dalam kedewasaan rohani.
              </p>
            </div>
            
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-brown-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-serif text-brown-700">E</span>
              </div>
              <h3 className="text-xl font-serif text-brown-800 mb-2">Excellence (Keunggulan)</h3>
              <p className="text-brown-600">
                Melakukan yang terbaik dalam setiap aspek pelayanan sebagai wujud persembahan kepada Tuhan.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Profil;
