import { NavbarComponent } from '../components/navbar'
import { Accordion } from 'react-bootstrap'
import { useFirebaseRoutesAnalytics } from '../utils/analytics'

export const About = () => {
  useFirebaseRoutesAnalytics()
  return (
    <div>
      <NavbarComponent />
      <h1 className="text-center">Rules</h1>
      <Accordion defaultActiveKey={['0', '1', '2', '3', '4']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Selection Scheme</Accordion.Header>
          <Accordion.Body>
            <p>
              Seleksi akan dilakukan dengan cara pengerjaan task yang diberikan oleh
              masing-masing asisten yang akan menjadi penilai.
              <br />
              <br />
              Tipe dan skema tiap task dapat berbeda setiap asisten.
              <br />
              Mahasiswa yang lolos seleksi dinilai berdasarkan leaderboard pada akhir
              seleksi yang diumumkan kemudian serta mempertimbangkan kebutuhan
              asisten Ganesha maupun Jatinangor.
              <br />
              <br />
              Skor dapat dilihat pada halaman{' '}
              <a href="/leaderboard">Leaderboard</a>.
              <br />
              <br />
              Task yang dapat dikerjakan akan muncul pada &nbsp;
              <a href="/">halaman awal</a>
              <br/>
              <br/>
              Task akan bertambah seiring jalannya waktu
              <br/>
              Setiap penambahan task akan diumumkan ke grup line
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
                  Skor yang didapat adalah hasil perkalian bobot kecepatan (Multiplier)
                  dengan skor dasar nilai
                </p>
              </li>
              <li>
                <p>
                  Multiplier untuk submisi pertama yang diacc oleh asisten adalah 100%
                </p>
              </li>
              <li>
                <p>
                  Multiplier akan dikurangi nilainya sebesar 5% untuk setiap submisi masuk yang diacc oleh asisten
                </p>
              </li>
              <li>
                <p>
                  Nilai minimum dari Multiplier adalah 80%
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
              <p>
              Submisi untuk setiap task dengan ketentuan tambahan:
              </p>
              <ul>
                <li>
                  <p>Untuk project, yang disubmit link ke <a href='https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository' target='_blank'> release github</a> </p>
                </li>
                <li>
                  <p>
                    Dilarang pakai url shortener. Contoh: bit.ly, tinyurl, dll
                  </p>
                </li>
              </ul>
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
