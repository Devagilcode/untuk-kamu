import { useEffect, useRef, useState } from "react";
import "./App.css";

const photos = [
  {
    src: `${import.meta.env.BASE_URL}foto1.jpeg`,
    caption: "Senyummu adalah tempat ternyamanku ♡",
  },
  {
    src: `${import.meta.env.BASE_URL}foto2.jpeg`,
    caption: "Satu langkah kecil, bersama kamu.",
  },
  {
    src: `${import.meta.env.BASE_URL}foto3.jpeg`,
    caption: "Semoga ada lebih banyak cerita kita. ✨",
  },
  {
    src: `${import.meta.env.BASE_URL}foto4.jpeg`,
    caption: "Terima kasih sudah bertahan sejauh ini, sayang.",
  },
  {
    src: `${import.meta.env.BASE_URL}foto5.jpeg`,
    caption: "Kamu pantas mendapatkan cinta yang menenangkan hati. 🤍",
  },
  {
    src: `${import.meta.env.BASE_URL}foto6.jpeg`,
    caption: "Aku ingin menjadi bagian indah dari hari-harimu.",
  },
  {
    src: `${import.meta.env.BASE_URL}foto7.jpeg`,
    caption: "Tidak perlu sempurna, cukup jadi dirimu sendiri.",
  },
  {
    src: `${import.meta.env.BASE_URL}foto8.jpeg`,
    caption: "Bersamamu, hal sederhana terasa begitu istimewa. 🌷",
  },
  {
    src: `${import.meta.env.BASE_URL}foto9.jpeg`,
    caption: "Masa lalumu bukan batas bagi kebahagiaanmu.",
  },
  {
    src: `${import.meta.env.BASE_URL}foto10.jpeg`,
    caption: "Aku ingin mengenalmu lebih dalam, setiap harinya.",
  },
  {
    src: `${import.meta.env.BASE_URL}foto11.jpeg`,
    caption: "Semoga kita selalu punya alasan untuk tersenyum bersama.",
  },
  {
    src: `${import.meta.env.BASE_URL}foto12.jpeg`,
    caption: "Kamu tidak harus selalu kuat saat berada di sisiku.",
  },
  {
    src: `${import.meta.env.BASE_URL}foto13.jpeg`,
    caption: "Mari kita ciptakan kenangan baru yang penuh kehangatan. 💗",
  },
  {
    src: `${import.meta.env.BASE_URL}foto14.jpeg`,
    caption: "Aku ingin mendengar ceritamu, bahkan yang paling sederhana.",
  },
  {
    src: `${import.meta.env.BASE_URL}foto15.jpeg`,
    caption: "Semoga hari esok membawa lebih banyak tawa untuk kita.",
  },
  {
    src: `${import.meta.env.BASE_URL}foto16.jpeg`,
    caption: "Aku ingin tumbuh bersamamu, bukan mengubah siapa dirimu.",
  },
  {
    src: `${import.meta.env.BASE_URL}foto17.jpeg`,
    caption: "Hari ini, esok, dan seterusnya, semoga kita terus saling memilih. ♡",
  },
];

const quotes = [
  {
    title: "Kamu tetap berharga.",
    text: "Apa yang pernah terjadi di masa lalu bukan kesalahanmu. Kamu tetap layak dicintai dengan tulus, tanpa harus menjadi seseorang yang berbeda.",
  },
  {
    title: "Kamu boleh sembuh perlahan.",
    text: "Kamu tidak harus selalu kuat. Ambil waktumu, dengarkan hatimu, dan ingat bahwa tidak apa-apa jika hari ini belum terasa mudah.",
  },
  {
    title: "Kita bisa menulis cerita baru.",
    text: "Aku tidak ingin menghapus cerita lamamu. Aku ingin menemanimu menciptakan kenangan baru yang terasa hangat, jujur, dan menenangkan.",
  },
  {
    title: "Masa depan masih luas.",
    text: "Masih banyak senja yang bisa kita lihat, tawa yang bisa kita bagi, dan hal-hal sederhana yang bisa kita syukuri bersama.",
  },
];

const petals = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${(i % 9) * -1.3}s`,
  duration: `${8 + (i % 7)}s`,
  size: `${12 + (i % 5) * 4}px`,
}));

export default function App() {
  const [started, setStarted] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [hearts, setHearts] = useState([]);
  const audioRef = useRef(null);
  // Galeri bergeser otomatis setiap 3 detik
  useEffect(() => {
    if (!started) return;

    const slideTimer = setInterval(() => {
      setPhotoIndex((current) => (current + 1) % photos.length);
    }, 3000);

    return () => clearInterval(slideTimer);
  }, [started]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    // Coba putar musik langsung saat web dibuka
    audio
      .play()
      .then(() => setMusicOn(true))
      .catch(() => {
        // Jika browser memblokir autoplay,
        // musik akan dicoba lagi setelah interaksi pertama.
        setMusicOn(false);
      });
  }, []);

  useEffect(() => {
    if (!musicOn || !audioRef.current) return;
    audioRef.current.play().catch(() => setMusicOn(false));
  }, [musicOn]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startMusic = () => {
      audio
        .play()
        .then(() => setMusicOn(true))
        .catch(() => {});
    };

    document.addEventListener("pointerdown", startMusic, {
      once: true,
    });

    return () => {
      document.removeEventListener("pointerdown", startMusic);
    };
  }, []);

  useEffect(() => {
    if (!started) return;

    const timer = window.setInterval(() => {
      setQuoteIndex((current) => (current + 1) % quotes.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [started]);

  function makeHeart(event) {
    const id = `${Date.now()}-${Math.random()}`;

    setHearts((current) => [
      ...current.slice(-14),
      {
        id,
        x: event.clientX,
        y: event.clientY,
      },
    ]);

    window.setTimeout(() => {
      setHearts((current) => current.filter((heart) => heart.id !== id));
    }, 1500);
  }

  async function toggleMusic() {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.pause();
      setMusicOn(false);
    } else {
      try {
        await audioRef.current.play();
        setMusicOn(true);
      } catch {
        alert("Tambahkan file public/music.mp3 terlebih dahulu ya ♡");
      }
    }
  }

  function changePhoto(direction) {
    setPhotoIndex((current) => (current + direction + photos.length) % photos.length);
  }

  return (
    <main className="love-app" onClick={makeHeart}>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}music.mp3`} loop preload="none" />

      <div className="night-sky" aria-hidden="true" />
      <div className="moon" aria-hidden="true" />
      <div className="ambient-glow glow-one" />
      <div className="ambient-glow glow-two" />

      <div className="petal-layer" aria-hidden="true">
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="petal"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: petal.size,
              height: petal.size,
            }}
          />
        ))}
      </div>

      {hearts.map((heart) => (
        <span key={heart.id} className="click-heart" style={{ left: heart.x, top: heart.y }}>
          ♥
        </span>
      ))}

      {!started ? (
        <section className="intro-screen">
          <div className="intro-stars">✧　·　♡　·　✧</div>
          <div className="intro-envelope">
            <span>💌</span>
          </div>
          <p className="eyebrow">A LITTLE SURPRISE FOR YOU</p>
          <h1>
            Hai, sayang.
            <br />
            <em>Ada sesuatu untukmu.</em>
          </h1>
          <p className="intro-description">Sebuah pesan kecil dari seseorang yang ingin berjalan bersamamu, hari ini dan nanti.</p>
          <button
            className="primary-button pulse-button"
            onClick={(event) => {
              event.stopPropagation();
              setStarted(true);
            }}
          >
            Buka cerita kita <span>♡</span>
          </button>
          <p className="tiny-note">dibuat khusus untuk kamu, dengan cinta.</p>
        </section>
      ) : (
        <>
          <header className="nav-bar">
            <a className="wordmark" href="#home">
              our little universe <span>♡</span>
            </a>
            <button
              className={`music-button ${musicOn ? "is-playing" : ""}`}
              onClick={(event) => {
                event.stopPropagation();
                toggleMusic();
              }}
            >
              <span>{musicOn ? "♫" : "♪"}</span>
              {musicOn ? "Musik menyala" : "Putar musik"}
              {musicOn && <span className="equalizer">▂ ▅ ▃ ▇</span>}
            </button>
          </header>

          <section className="hero-section" id="home">
            <div className="hero-copy">
              <p className="eyebrow">TO MY FAVORITE PERSON</p>
              <h1>
                Untuk kamu,
                <br />
                <em>yang ingin aku temani.</em>
              </h1>
              <p className="hero-description">
                Aku tahu perjalananmu tidak selalu mudah. Tapi aku bangga melihatmu sampai di hari ini. Kamu tidak harus melupakan kemarin untuk menikmati hari ini. Kita bisa melangkah perlahan menuju hari esok, bersama.
              </p>
              <a className="primary-button" href="#pesan">
                Baca pesan dariku <span>↓</span>
              </a>
              <div className="little-note">
                <span>✦</span> tidak perlu terburu-buru, sayang.
              </div>
            </div>

            <div className="hero-art">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="hero-heart">♡</div>
              <div className="glass-note">
                <span className="sparkle">✧</span>
                <p>My favorite place</p>
                <strong>is beside you.</strong>
                <span className="note-flower">✿</span>
              </div>
              <div className="hero-bottom-note">
                one day at a time <span>♡</span>
              </div>
            </div>
          </section>

          <section className="section-block" id="pesan">
            <div className="section-heading">
              <p className="eyebrow">A NOTE FOR YOUR HEART</p>
              <h2>
                Untuk hati yang
                <br />
                <em>sedang belajar percaya.</em>
              </h2>
            </div>

            <article className="letter-card">
              <div className="letter-top">
                <span>✿</span>
                <span>sebuah surat kecil</span>
                <span>✿</span>
              </div>
              <h3>Sayang, dengarkan aku sebentar, ya.</h3>
              <p>Aku mungkin tidak tahu persis bagaimana rasanya melewati semua yang pernah kamu alami. Aku juga tidak akan berpura-pura bisa menghapus rasa sakit itu hanya dengan beberapa kata.</p>
              <p>Tapi aku ingin kamu tahu: kamu tidak menjadi kurang berharga hanya karena pernah disakiti. Kamu tidak harus sempurna untuk dicintai, dan kamu tidak perlu menyembunyikan rasa takutmu agar seseorang tetap memilihmu.</p>
              <p>Aku tidak datang untuk bersaing dengan masa lalumu. Aku datang dengan niat mengenalmu, menghargai batasanmu, dan membangun sesuatu yang baik bersamamu, mulai dari hari ini.</p>
              <p className="letter-signature">
                Pelan-pelan saja, sayang.
                <br />
                <em>Aku ingin berjalan di sampingmu. ♡</em>
              </p>
            </article>
          </section>

          <section className="section-block gallery-section" id="kenangan">
            <div className="section-heading">
              <p className="eyebrow">LITTLE MOMENTS, BIG FEELINGS</p>
              <h2>
                Mt Princess
                <br />
                <em>kita simpan.</em>
              </h2>
            </div>

            <div className="gallery">
              <button
                className="gallery-arrow"
                onClick={(event) => {
                  event.stopPropagation();
                  changePhoto(-1);
                }}
                aria-label="Foto sebelumnya"
              >
                ←
              </button>

              <article className="polaroid" key={photoIndex}>
                <div className="photo-placeholder">
                  <img
                    src={photos[photoIndex].src}
                    alt={photos[photoIndex].caption}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                </div>

                <p className="photo-caption">{photos[photoIndex].caption}</p>

                <span className="photo-number">
                  {String(photoIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                </span>
              </article>

              <button
                className="gallery-arrow"
                onClick={(event) => {
                  event.stopPropagation();
                  changePhoto(1);
                }}
                aria-label="Foto berikutnya"
              >
                →
              </button>
            </div>

            <div className="gallery-dots">
              {photos.map((photo, index) => (
                <button
                  key={photo.src}
                  className={index === photoIndex ? "dot active" : "dot"}
                  onClick={(event) => {
                    event.stopPropagation();
                    setPhotoIndex(index);
                  }}
                  aria-label={`Lihat foto ${index + 1}`}
                />
              ))}
            </div>
          </section>

          <section className="quote-section" id="pengingat">
            <span className="quote-decoration">“</span>
            <p className="eyebrow">A GENTLE REMINDER</p>
            <div className="quote-content" key={quoteIndex}>
              <h2>{quotes[quoteIndex].title}</h2>
              <p>{quotes[quoteIndex].text}</p>
            </div>
            <div className="quote-controls">
              <button className="round-button" onClick={() => setQuoteIndex((quoteIndex - 1 + quotes.length) % quotes.length)} aria-label="Pesan sebelumnya">
                ←
              </button>
              <span>
                {quoteIndex + 1} / {quotes.length}
              </span>
              <button className="round-button" onClick={() => setQuoteIndex((quoteIndex + 1) % quotes.length)} aria-label="Pesan selanjutnya">
                →
              </button>
            </div>
          </section>

          <section className="section-block future-section" id="masa-depan">
            <div className="section-heading">
              <p className="eyebrow">OUR STORY IS STILL UNFOLDING</p>
              <h2>
                Hari ini, esok,
                <br />
                <em>dan hari-hari berikutnya.</em>
              </h2>
            </div>

            <div className="future-grid">
              <article className="future-card">
                <span className="future-icon">☼</span>
                <p className="future-label">01 — HARI INI</p>
                <h3>Menjadi tempat bercerita.</h3>
                <p>Mendengarkan tanpa menghakimi, tertawa bersama, dan menghargai hal-hal kecil yang membuat kita bahagia.</p>
              </article>
              <article className="future-card">
                <span className="future-icon">♡</span>
                <p className="future-label">02 — ESOK</p>
                <h3>Tumbuh bersama.</h3>
                <p>Belajar berkomunikasi, saling memahami, dan menyelesaikan masalah sebagai pasangan, bukan sebagai lawan.</p>
              </article>
              <article className="future-card">
                <span className="future-icon">✧</span>
                <p className="future-label">03 — SUATU HARI NANTI</p>
                <h3>Membangun rumah yang damai.</h3>
                <p>Bukan rumah yang sempurna, tetapi tempat kita bisa menjadi diri sendiri, merasa aman, dan tetap saling memilih.</p>
              </article>
            </div>
          </section>

          <section className="final-section" id="surat">
            <div className={`envelope ${letterOpen ? "opened" : ""}`}>
              <span className="envelope-flower">✿</span>
              <div className="envelope-icon">💌</div>
              <p className="eyebrow">ONE LAST LITTLE THING</p>
              <h2>
                Ada satu hal
                <br />
                <em>yang ingin aku janjikan.</em>
              </h2>

              {!letterOpen ? (
                <>
                  <p className="final-description">Bukan janji tentang cinta yang sempurna, tetapi tentang niat untuk terus belajar mencintaimu dengan lebih baik.</p>
                  <button className="primary-button" onClick={() => setLetterOpen(true)}>
                    Buka surat terakhir ♡
                  </button>
                </>
              ) : (
                <div className="final-letter">
                  <p>Aku tidak bisa menjanjikan bahwa hidup akan selalu mudah atau bahwa aku tidak akan pernah membuat kesalahan.</p>
                  <p>Tetapi aku ingin berusaha jujur kepadamu, mendengarkanmu, menghargai perasaanmu, dan bertanggung jawab atas pilihanku.</p>
                  <p>Aku ingin kita membangun cinta yang tidak membuat kita kehilangan diri sendiri, melainkan membuat kita merasa didukung untuk tumbuh.</p>
                  <p className="letter-signature">
                    Terima kasih sudah hadir di dunia ini.
                    <br />
                    <em>Aku senang bisa mengenalmu. ♡</em>
                  </p>
                  <button className="text-button" onClick={() => setLetterOpen(false)}>
                    Tutup surat
                  </button>
                </div>
              )}
            </div>
          </section>

          <footer className="footer">
            <div className="footer-heart">♡</div>
            <p>
              Masa lalumu adalah bagian dari perjalananmu.
              <br />
              <em>Dan masih banyak cerita indah menantimu.</em>
            </p>
            <span>dibuat dengan tulus, untuk kamu.</span>
            <a href="#home">Kembali ke atas ↑</a>
          </footer>
        </>
      )}
    </main>
  );
}
