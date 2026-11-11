
// DATA JADWAL
let jadwal = JSON.parse(localStorage.getItem("jadwalSekolah")) || {
    Senin: [
        {mapel:"Matematika", mulai:"07:00", selesai:"08:30", guru:"Bu Rina"},
        {mapel:"Bahasa Indonesia", mulai:"08:30", selesai:"10:00", guru:"Pak Andi"},
        {mapel:"Bahasa Inggris", mulai:"10:15", selesai:"11:45", guru:"Bu Sari"}
    ],
    Selasa: [
        {mapel:"Biologi", mulai:"07:00", selesai:"08:30", guru:"Bu Dewi"},
        {mapel:"Sejarah", mulai:"08:30", selesai:"10:00", guru:"Pak Budi"}
    ],
    Rabu: [
        {mapel:"Kimia", mulai:"07:00", selesai:"08:30", guru:"Bu Lina"}
    ],
    Kamis: [
        {mapel:"Fisika", mulai:"07:00", selesai:"08:30", guru:"Pak Dedi"}
    ],
    Jumat: [
        {mapel:"Agama", mulai:"07:00", selesai:"08:30", guru:"Bu Siti"}
    ],
    Sabtu: [
        {mapel:"Olahraga", mulai:"07:00", selesai:"08:30", guru:"Pak Agus"}
    ]
};

let hariAktif = "Senin";

// SIMPAN DATA
function simpanData() {
    localStorage.setItem(
        "jadwalSekolah",
        JSON.stringify(jadwal)
    );
}

// TANGGAL HARI INI
const namaHari = [
    "Minggu", "Senin", "Selasa",
    "Rabu", "Kamis", "Jumat", "Sabtu"
];

function tampilTanggal() {
    const sekarang = new Date();

    document.getElementById("tanggal").innerText =
        namaHari[sekarang.getDay()] + ", " +
        sekarang.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

// PILIH HARI
function pilihHari(hari) {
    hariAktif = hari;
    tampilJadwal();
}

// TAMPILKAN JADWAL
function tampilJadwal() {
    const daftar = document.getElementById("daftarJadwal");

    document.getElementById("judulHari").innerText =
        "Jadwal Hari " + hariAktif;

    daftar.innerHTML = "";

    const data = jadwal[hariAktif] || [];

    if (data.length === 0) {
        daftar.innerHTML =
            "<p>Belum ada jadwal pelajaran 💗</p>";
        return;
    }

    data.forEach((item, index) => {
        daftar.innerHTML += `
            <div class="schedule">
                <h3>📖 ${item.mapel}</h3>
                <p>⏰ ${item.mulai} - ${item.selesai}</p>
                <p>👩‍🏫 Guru: ${item.guru}</p>
                <button class="delete-btn"
                    onclick="hapusJadwal(${index})">
                    Hapus
                </button>
            </div>
        `;
    });
}

// TAMBAH JADWAL
function tambahJadwal() {
    const hari = document.getElementById("hari").value;
    const mapel = document.getElementById("mapel").value.trim();
    const mulai = document.getElementById("mulai").value;
    const selesai = document.getElementById("selesai").value;
    const guru = document.getElementById("guru").value.trim();

    if (!mapel || !mulai || !selesai || !guru) {
        alert("Lengkapi semua data terlebih dahulu!");
        return;
    }

    if (mulai >= selesai) {
        alert("Jam selesai harus setelah jam mulai!");
        return;
    }

    if (!jadwal[hari]) {
        jadwal[hari] = [];
    }

    jadwal[hari].push({
        mapel,
        mulai,
        selesai,
        guru
    });

    jadwal[hari].sort((a, b) =>
        a.mulai.localeCompare(b.mulai)
    );

    simpanData();

    document.getElementById("mapel").value = "";
    document.getElementById("mulai").value = "";
    document.getElementById("selesai").value = "";
    document.getElementById("guru").value = "";

    hariAktif = hari;
    document.getElementById("hari").value = hari;

    tampilJadwal();

    alert("Jadwal berhasil ditambahkan! 💗");
}

// HAPUS JADWAL
function hapusJadwal(index) {
    if (confirm("Yakin ingin menghapus jadwal ini?")) {
        jadwal[hariAktif].splice(index, 1);
        simpanData();
        tampilJadwal();
    }
}

// MULAI APLIKASI
tampilTanggal();

const hariSekarang = namaHari[new Date().getDay()];

if (jadwal[hariSekarang]) {
    hariAktif = hariSekarang;
    document.getElementById("hari").value = hariSekarang;
}

tampilJadwal();


