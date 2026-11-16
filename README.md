# 🌌 Rafi Diandra Ardi Agusta - Cosmic Space Portfolio (React & Tailwind CSS)

Website portofolio personal bertema luar angkasa (*Cosmic Dark Mode*) dengan latar belakang hitam pekat, aksen neon biru kosmik (`#2c67ed`), animasi bintang dan meteor dinamis, serta navigasi melayang (*floating navbar*) dengan efek glow.

---

## ✨ Fitur Utama

1. **Tema Luar Angkasa & Efek Animasi**:
   - Background hitam gelap (`#02040a`) dengan kanvas interaktif bintang berkelap-kelip (*twinkling stars*), debu kosmik, dan hujan meteor / bintang jatuh (*shooting stars*).
   - Efek nebula ambient glow (`#2c67ed`, cyan, & violet) yang bergerak lembut di latar belakang.
   - Glassmorphism bernuansa antariksa dengan aksen cahaya border biru neon.

2. **Navbar Melayang (Floating Navbar)**:
   - Terletak melayang di bagian tengah atas layar (`fixed top-4 left-1/2 -translate-x-1/2`).
   - Efek glow biru kosmik (`shadow-[0_0_30px_rgba(44,103,237,0.45)]`).
   - Indikator menu aktif dengan animasi transisi pegas Framer Motion (*layoutId*).
   - Menu drawer responsif untuk perangkat mobile / smartphone.

3. **Halaman Utama (Hero Section)**:
   - Nama besar dengan gradien kosmik yang elegan.
   - Efek mesin tik (*typewriter effect*) otomatis yang berganti teks:
     - `'Junior Developer'`
     - `'Tech Enthusiast'`
     - `'Frontend Explorer'`
     - `'Creative Problem Solver'`
   - Kursor berkedip dengan efek glow biru neon.
   - Tombol CTA interaktif ("Jelajahi Portfolio", "Hubungi Saya", "Unduh CV").
   - Ilustrasi orbit kosmik 3D interaktif dengan satelit teknologi (React, Terminal, Chip, Globe).

4. **Section About Me**:
   - Foto profil avatar dengan orbit kosmik berputar dan badge status *"🟢 Available for Hire"*.
   - Tab interaktif untuk berpindah antara:
     - **Riwayat Pendidikan (Education History)**: Jenjang universitas, program Bangkit Academy Google/GoTo, hingga SMA dengan timeline bercahaya dan pencapaian akademik.
     - **Pengalaman (Experience)**: Magang Frontend, Freelance Web Developer, dan Asisten Lab Informatika beserta kontribusi riil dan tech stack.
     - **Statistik Project**: 4 metrik interaktif (Projects Completed, 1.8K+ Git Commits, Sertifikasi Terverifikasi, 99.8% Uptime/Satisfaction).

5. **Section Portfolio**:
   - Tab navigasi modern dengan efek kapsul bercahaya biru:
     - **Projects**: Filter kategori (*All*, *Web Apps*, *Fullstack*, *AI & Tools*, *UI/UX*), kartu proyek dengan preview gambar, tags teknologi, tombol demo live, link repository GitHub, dan modal popup detail.
     - **Certificates**: Kartu sertifikasi resmi IBM SkillsBuild terverifikasi Credly lengkap dengan ID kredensial, keahlian teruji, dan link verifikasi langsung.
     - **Tech Stack**: Bar progres animasi dan badge level untuk kategori *Frontend Architecture*, *Styling & Creative Motion*, *Backend & Database*, dan *Tools & Workflow*.

6. **Section Kontak & Media Sosial**:
   - Formulir pesan interaktif dengan validasi input, status loading pengiriman sinyal kosmik, dan toast notifikasi sukses.
   - Kartu kontak langsung: alamat email dengan fitur 1-klik salin (*copy to clipboard*), lokasi, dan waktu respons rata-rata.
   - Tautan media sosial bercahaya: GitHub, LinkedIn, Instagram, dan Discord.
   - Footer bertema kosmik dengan tombol roket kembali ke atas (*Back to Top*).

---

## 🛠️ Teknologi yang Digunakan

- **React 18**: UI Library berbasis komponen.
- **Tailwind CSS**: Utility-first CSS framework untuk styling responsif & dark mode.
- **Framer Motion**: Animasi fluid, transisi tab, dan hover interaction.
- **Lucide React**: Paket icon modern yang bersih dan konsisten.
- **HTML5 Canvas**: Sistem partikel bintang dan meteor real-time berperforma tinggi.
- **Vite**: Build tool dan dev server ultra-cepat.

---

## 🚀 Cara Menjalankan Proyek

1. **Jalankan Mode Pengembangan (Dev Server)**:
   ```bash
   npm run dev
   ```
   Buka browser pada alamat `http://localhost:3000` atau port yang tertera di terminal.

2. **Build untuk Produksi**:
   ```bash
   npm run build
   ```
   File hasil build yang siap dideploy akan tersedia di direktori `dist/`.

3. **Pratinjau Hasil Build**:
   ```bash
   npm run preview
   ```

---

## 📂 Struktur Direktori

```text
PORTO/
├── dist/                      # File bundle produksi
├── node_modules/              # Dependensi npm
├── public/                    # Aset statis
├── src/
│   ├── components/
│   │   ├── About.jsx          # Section Tentang Saya, Pendidikan, Pengalaman & Statistik
│   │   ├── Contact.jsx        # Section Kontak, Form & Link Media Sosial
│   │   ├── CosmicOrbs.jsx     # Ambient background nebula glow
│   │   ├── Footer.jsx         # Footer antariksa & Back-to-Top
│   │   ├── Hero.jsx           # Hero banner, nama besar & efek teks mengetik
│   │   ├── Navbar.jsx         # Floating navbar di tengah atas dengan glow biru
│   │   ├── Portfolio.jsx      # Section Portfolio (Tab Projects, Certs, Tech Stack)
│   │   ├── ProjectModal.jsx   # Modal preview detail proyek
│   │   └── StarBackground.jsx # Animasi canvas bintang berkelap-kelip & meteor
│   ├── data/
│   │   └── portfolioData.js   # Konfigurasi data personal, proyek, sertifikat, & tech stack
│   ├── App.jsx                # Komponen root aplikasi
│   ├── index.css              # Custom Tailwind styling & keyframes
│   └── main.jsx               # Entry point React
├── index.html                 # Template HTML utama
├── package.json               # Konfigurasi dependensi dan scripts
├── postcss.config.js          # Konfigurasi PostCSS
├── tailwind.config.js         # Konfigurasi kustom tema, warna #2c67ed, & glow
└── vite.config.js             # Konfigurasi bundler Vite
```

---

## 🎨 Kustomisasi Data Diri

Untuk mengubah nama, foto profil, riwayat pendidikan, pengalaman, proyek, dan kontak Anda sendiri, cukup sunting berkas:
👉 `src/data/portfolioData.js`

Semua data telah distrukturkan secara rapi dan modular sehingga sangat mudah disesuaikan dengan profil Anda!

