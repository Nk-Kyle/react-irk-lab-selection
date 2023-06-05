import { NavbarComponent } from '../components/navbar'
import { Accordion } from 'react-bootstrap'

export const About = () => {
  return (
    <div>
      <NavbarComponent />
      <h1 className="text-center">Rules</h1>
      <Accordion defaultActiveKey={['0', '1', '2', '3', '4']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Selection Scheme</Accordion.Header>
          <Accordion.Body>
            <p>
              Seleksi akan dilakukan dengan pengerjaan soal yang diberikan oleh
              masing-masing asisten yang akan menjadi penilai.
              <br />
              <br />
              Tipe dan skema tiap soal dapat berbeda setiap asisten.
              <br />
              Mahasiswa yang lolos seleksi berdasarkan skor tertinggi pada akhir
              seleksi yang diumumkan kemudian serta mempertimbangkan kebutuhan
              asisten Ganesha maupun Jatinangor.
              <br />
              <br />
              Skor dapat dilihat pada halaman{' '}
              <a href="/leaderboard">Leaderboard</a>.
              <br />
              <br />
              Soal yang dapat dikerjakan akan muncul secara bertahap pada
              halaman awal
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Scoring Scheme</Accordion.Header>
          <Accordion.Body>
            <p>
              Penilaian akan dilakukan oleh masing-masing asisten dengan
              ketentuan:
            </p>
            <ul>
              <li>
                <p>Skor maksimal dicantumkan pada task</p>
              </li>
              <li>
                <p>
                  Skor yang didapat adalah hasil perkalian bobot kecepatan
                  dengan skor dasar nilai
                </p>
              </li>
              <li>
                <p>
                  Bobot kecepatan untuk submisi terawal yang diacc adalah 100%
                  dan berkurang sebesar 5% setiap submisi peserta selanjutnya
                  dengan minimum 80%
                </p>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Submission Scheme</Accordion.Header>
          <Accordion.Body>
            <p>
              Submisi dilakukan dengan submit link hasil (github repository atau
              link lainnya sesuai task asisten).
              <br />
              <br />
              Submisi dapat diubah selama submisi belum dinilai oleh asisten.
              <br />
              <br />
              <b>
                Submisi dinilai adalah submisi terakhir beserta timestamp
                terakhir tersebut untuk bobot kecepatan
              </b>
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Account</Accordion.Header>
          <Accordion.Body>
            <p>
              Submisi hanya dapat dilakukan dengan akun{' '}
              <b>std.stei.itb.ac.id</b>
              <br />
              <br />
              Akun lain dapat digunakan untuk login dengan kapabilitas yang
              terbatas
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Problems</Accordion.Header>
          <Accordion.Body>
            <p>
              Bilamana terdapat masalah teknis website, silakan hubungi{' '}
              <b>Ng Kyle</b> melalui kontak yang tertera pada halaman{' '}
              <a href="/contact">Contact</a>
              <br />
              <br />
              Bilamana terdapat masalah pada soal tertentu, silakan hubungi
              asisten bersangkutan
            </p>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
