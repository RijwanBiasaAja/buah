import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { 
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDies7HBA_N8xfk_8DJlM-EFbi_GTXDJpI",
  authDomain: "insan-cemerlang-996a1.firebaseapp.com",
  projectId: "insan-cemerlang-996a1",
  storageBucket: "insan-cemerlang-996a1.appspot.com",
  messagingSenderId: "137591161633",
  appId: "1:137591161633:web:e89f54d3cf2a29d9fdb460",
  measurementId: "G-B5KFGBXLMV"
};

// Inisialisasi firebase
const aplikasi = initializeApp(firebaseConfig)
const basisdata = getFirestore(aplikasi)

export async function tambahBuah(nama, warna, harga) {
  try {
    // menyimpan data ke firebase
    const refDokumen = await addDoc(collection(basisdata, "buah"), {
      nama: nama,
      warna: warna,
      harga: harga
    })
    
    // menampilkan pesan berhasil
    console.log("berhasil menyimpan data buah")
  } catch (error) {
  // menampilkan pesan gagal
  console.console.log("gagal menyimpan data buah")
  }
}

export async function ambilDaftarBuah() {
  const refDokumen = collection(basisdata, "buah");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikankueri = await getDocs(kueri);
  
  let hasilkueri = [];
  cuplikankueri.forEach((dokumen) => {
    hasilkueri.push({
      id: dokumen.id,
      nama: dokumen.data().nama,
      warna: dokumen.data().warna,
      harga: dokumen.data().harga
    })
  })
  
  return hasilkueri;
}

export async function hapusBuah(id) {
  await deleteDoc(doc(basisdata, "buah", id))
}

export async function ubahBuah(id, namabaru, warnabaru, hargabaru) {
  await updateDoc(
    doc(basisdata, "buah", id),
    { nama: namabaru, warna: warnabaru, harga: hargabaru }
    )
}

export async function ambilBuah(id) {
  const refDokumen = await doc(basisdata, "buah", id)
  const snapshotDocumen = await getDoc(refDokumen)
  
  return await snapshotDocumen.data()
}