# hungariansongbook.com – teljes weboldal-specifikáció

*Claude Code kezdőcsomag. Minden tartalom kész, bemásolható. A nyitó prompt a fájl legvégén.*

---

## 1. Cél és alapelvek

A weboldal a „Dalok az Óperencián túlról / Songs from Beyond the Seven Seas" könyv kísérőoldala. Három feladata van: (1) kiszolgálja a könyv két konkrét ígéretét (relatív hangolás leírása; táblázatvásárlás), (2) eladja a könyvet, (3) többletértéket ad a vásárlóknak.

**Kalózkodás-elv:** ami a könyvet *helyettesíti* (kottaoldalak, lókották, nagy felbontású táblázatok, PDF), az SOHA nem kerül fel. Ami *kiegészíti* (hangolás, szószedet, pengetésminták, hivatkozások, hanganyag), az szabadon vagy vásárlói kapu mögött elérhető.

**Hanganyag:** YouTube-on lesz, külön csatornán. Nyilvános: 3–5 minta-dal. A teljes készlet: **nem listázott (unlisted)** videók, amikhez csak a vásárlói oldalon közzétett playlist-linken lehet hozzáférni. Így nincs saját tárhely-költség, és a kapu-logika is egyszerű.

## 2. Technológia

- **Sima statikus HTML + CSS + minimális vanilla JS.** Nincs framework, nincs build-lépés, nincs npm. (Az Angular ide túl sok: egy tartalmi oldal tíz év múlva is forduljon fordítás nélkül.)
- Egy közös `style.css`, egy közös `script.js` (nyelvváltó + vásárlói kapu, ~60 sor).
- **Mobile-first, reszponzív**: a fő közönség fele telefonról jön (tábortűznél is!). Egyetlen töréspont elég: ~700px felett kétoszlopos/szélesebb elrendezés, alatta egyoszlopos. A hangolás- és pengetés-oldalakat kifejezetten telefonra optimalizáld (zenélés közben nézik).
- Hosting: a meglévő GoDaddy tárhely statikus fájlokat tud szolgálni; alternatíva GitHub Pages + a domain rámutatása. Mindkettő jó, válassz kényelem szerint.
- Nincs cookie, nincs tracking (a mostani GoDaddy-s cookie-banner is kuka) – egy daloskönyv-oldalnak nem kell, és a „privacy-mentes" oldal a célközönségnél bizalom-pont.

## 3. Design tokenek (a borítóból kinyerve)

```css
:root {
  --red:    #CF383F;  /* borító piros */
  --cream:  #F8EBDA;  /* borító krém háttér */
  --ink:    #1A1A1A;  /* fekete grafika/szöveg */
  --gray:   #595650;  /* másodlagos szöveg */
  --white:  #FFFFFF;
}
```

- Háttér: `--cream`, szöveg: `--ink`, kiemelés/gombok/linkek: `--red`.
- Tipográfia: címekhez egy meleg display-betű (pl. Google Fonts „Alegreya" vagy „Bree Serif"), szöveghez rendszer-sans (`system-ui`). **Kritérium: teljes magyar ékezetkészlet (ő, ű!) minden vágásban.**
- A borító madaras-gitáros motívuma a hero-kép; a kakas/madár sziluett kicsiben favicon és szekcio-díszítés lehet (Tóth Zoltántól érdemes SVG-t kérni).
- Lábléc minden oldalon: `© Egyedi Attila Levente, 2026 · hungariansongbook.com · Crossroads Music & Arts Foundation – crossroadsband.org`

## 4. Sitemap és fájlszerkezet

Kétnyelvű, tükörszerkezet (mint a könyv). Alapértelmezés: angol a gyökérben, magyar a `/hu/` alatt, minden oldalon HU/EN váltó a fejlécben, `hreflang` párokkal.

```
/                     Home (EN)            /hu/                  Főoldal
/book.html            The Book             /hu/konyv.html        A könyv
/buy.html             Buy                  /hu/vasarlas.html     Vásárlás
/tuning.html          Tuning the Ukulele   /hu/hangolas.html     Hangolás
/audio.html           Listen               /hu/hanganyag.html    Hanganyag
/glossary.html        Glossary             /hu/szoszedet.html    Szószedet
/strumming.html       Strumming Patterns   /hu/pengetes.html     Pengetésminták
/research.html        The Research         /hu/kutatasok.html    Kutatások
/charts.html          Chord Charts         /hu/tablazatok.html   Táblázatok
/errata.html          Errata               /hu/hibajegyzek.html  Hibajegyzék
/owners.html          For Book Owners      /hu/tulajdonosoknak.html  Vásárlói oldal
/contact.html         Contact              /hu/kapcsolat.html    Kapcsolat
/assets/  (képek, css, js)
```

Navigáció (fejléc): Home · The Book · Listen · Learn (legördülő: Tuning, Strumming, Glossary) · Charts · Buy · HU/EN. A többi (Research, Errata, Owners, Contact) láblécből érhető el.

---

## 5. Oldalankénti tartalom

> A magyar és angol szöveg kész, bemásolható. Ahol [SZÖGLETES] jelölés van, ott a te döntésed/adatod kell.

### 5.1 Home / Főoldal

**Hero:** borítókép + cím + egy mondat + két gomb (Buy the book / Listen).

HU szöveg:
> **Dalok az Óperencián túlról**
> Kétnyelvű magyar daloskönyv ukulele-gyorstalpalóval – a diaszpóra mindennapjaira.
> 67 dal akkordkísérettel, minden ütem jelölve. Gyerekdalok, népdalok, ünnepek dalai – Kalotaszegtől Kaliforniáig.
> [Megveszem] [Belehallgatok]

EN szöveg:
> **Songs from Beyond the Seven Seas**
> A bilingual Hungarian songbook with a ukulele bootcamp – for everyday life in the diaspora.
> 67 songs with chord accompaniment, every measure marked. Children's songs, folk songs, holiday songs – from Kalotaszeg to California.
> [Buy the book] [Listen]

Alatta 3 kártya: „Tanulj ukulelézni / Learn the ukulele" (→ Tuning), „Hallgasd meg a dalokat / Hear the songs" (→ Audio), „A könyvről / About the book" (→ Book). Alul a két ajánlásból 1-1 kiemelt mondat (Magyar Kálmán, Keszei Etelka – a könyvből átemelhető).

### 5.2 The Book / A könyv

- A könyv Bevezetőjének „Mi ez a könyv?" + „énekeskönyv akar lenni, nincs gerince" bekezdései (átemelhetők a könyvből, mindkét nyelven megvannak).
- 2-3 **kis felbontású** minta-oldalkép (egy gyorstalpaló-oldal, egy daloldal, a térkép) – max 900px széles, hogy nyomtatásra alkalmatlan legyen.
- Tartalomjegyzék-kivonat (fejezetcímek szintjén).
- Adatok: 7×10", [OLDALSZÁM] oldal, gerinc nélküli kötés, első kiadás, Palo Alto, 2026.

### 5.3 Buy / Vásárlás

- [ÁR], [VÁSÁRLÁSI CSATORNA: közvetlen/PayPal/Amazon/személyes átvétel a közösségi alkalmakon?]
- Külön bekezdés HU/RO vevőknek: [EU-TERJESZTÉS TERVE – ha lesz print-on-demand vagy helyi partner, ide].
- A könyv saját humorával: „Az idő pénz. Inkább vedd meg a könyvet, minthogy lemásolnád!" – ez a mondat ide kívánkozik a könyvből.

### 5.4 Tuning / Hangolás ← a könyv 43. oldala ígéri!

HU tartalom (kész):

> **Hogyan hangold össze a húrokat egymáshoz képest (relatív hangolás)**
>
> Ha nincs nálad hangológép, a húrokat egymáshoz képest is behangolhatod. Ilyenkor az ukulele önmagához képest lesz tiszta – ha másokkal játszol együtt, egyikőtök hangszeréhez vagy egy referenciahanghoz (zongora, hangolóapp, hangvilla) igazodjatok.
>
> 1. **Referenciahang.** Keress egy C hangot (zongora középső C-je, app, vagy egy biztosan jó hangolású hangszer), és hangold be hozzá a 3. (C) húrt. Ha semmi sincs kéznél, hagyd a C húrt úgy, ahogy van – a többit ehhez igazítod.
> 2. **E húr.** Fogd le a C húrt a 4. érintőnél: ez E hang. Hangold a 2. (E) húrt, amíg ugyanúgy nem szól.
> 3. **A húr.** Fogd le az E húrt az 5. érintőnél: ez A hang. Hangold az 1. (A) húrt hozzá.
> 4. **G húr.** Fogd le az E húrt a 3. érintőnél: ez G hang. A standard (magas G-s) hangolásnál a 4. (G) húr pontosan így szól – hangold hozzá. *Low G húrnál* a 4. húr egy oktávval mélyebb, mint a lefogott hang – a fülednek oktávnyi ugrást kell hallania, nem azonos hangot.
> 5. **Ellenőrzés.** Pengesd le a négy üres húrt (G–C–E–A), majd fogj egy C-dúrt. Ha valami „szúrja a füled", menj végig a lépéseken még egyszer.
>
> Tipp: a lefogott és az üres húr hangját ne egymás után, hanem szinte egyszerre szólaltasd meg – a lebegést (vibráló össze-széthangzást) könnyebb meghallani, mint a hangmagasság-különbséget. Ha a lebegés lassul, jó irányba tekersz.

EN tartalom (kész):

> **Tuning the strings to each other (relative tuning)**
>
> If you don't have a tuner, you can tune the strings to each other. The ukulele will then be in tune with itself — if you play with others, match one instrument or a reference pitch (piano, tuning app, tuning fork).
>
> 1. **Reference pitch.** Find a C (middle C on a piano, an app, or a reliably tuned instrument) and tune the 3rd (C) string to it. If nothing is at hand, leave the C string as it is and tune the rest to match it.
> 2. **E string.** Press the C string at the 4th fret: that is an E. Tune the 2nd (E) string until it sounds the same.
> 3. **A string.** Press the E string at the 5th fret: that is an A. Tune the 1st (A) string to it.
> 4. **G string.** Press the E string at the 3rd fret: that is a G. With standard (high-G) tuning, the 4th (G) string sounds exactly like this — tune it to match. *With a low G string*, the 4th string is one octave lower than the fretted note — your ear should hear an octave leap, not the same pitch.
> 5. **Check.** Strum the four open strings (G–C–E–A), then play a C major chord. If something "pokes your ear," go through the steps once more.
>
> Tip: sound the fretted and the open string almost together rather than one after the other — beats (a pulsing in-and-out-of-tune shimmer) are easier to hear than pitch differences. If the beating slows down, you are turning the right way.

+ Lap alján link: „A hangológépes hangolás lépésről lépésre a könyvben: 42–43. oldal." / "Step-by-step tuner-based tuning is in the book, pages 42–43."

### 5.5 Listen / Hanganyag

- Bevezető: „A könyv dalaiból készült felvételek a YouTube-csatornánkon szólnak. Itt van néhány kedvcsináló – a teljes gyűjtemény a könyv tulajdonosainak elérhető." / EN tükörben.
- 3–5 **nyilvános** beágyazott videó. Javasolt minták (kezdő-barát + ismert): Lánc, lánc, eszterlánc · Érik a szőlő · Tavaszi szél vizet áraszt · A csitári hegyek alatt · Hull a pelyhes fehér hó.
- Gomb: „A teljes hanganyag → Vásárlói oldal" (owners.html).
- Playlist-link az ajánlott eredeti felvételekhez (Kalyi Jag, Parno Graszt, Gryllus, Koncz Zsuzsa... – a könyv „További dalok" listáiból összerakható nyilvános YouTube-playlist; mások tartalmára mutat, jogilag tiszta).

### 5.6 Glossary / Szószedet

Bevezető HU: „A népdalok a maguk korának és tájának nyelvén szólnak. A könyvben előforduló régies és tájszavak:" (EN: rövid tükörmondat + a magyarázatok angolul is.)

Kész szócikkek (HU definíció + EN gloss):

| Szó | Magyarázat | English |
|---|---|---|
| akó | régi űrmérték, kb. 50 liter (bornak) | old unit of volume, ~50 liters (for wine) |
| berukkol | bevonul katonának (német *rücken*) | to report for military service |
| cáp | bakkecske (román *ţap*) | billy goat |
| esztam | a kíséret hangsúlytalan–hangsúlyos lüktetése; „boom-chuck" | offbeat accompaniment pulse; “boom-chuck” |
| fuszulyka | bab (Erdélyben) | bean (Transylvanian word) |
| hárász | finom gyapjúfonal; hárászos ing: gyapjúdíszes ing | fine wool yarn; an embroidered wool shirt |
| heveder | nyeregszíj, amely a nyerget a ló hasán rögzíti | saddle girth |
| hombár | gabonatároló láda, magtár | grain chest, granary |
| kordován | finom kecskebőr (csizmának) | fine goat leather (cordovan) |
| málé | kukoricalepény, kukoricakása | corn bread / corn mush |
| napszentület | napnyugta (székely szó) | sunset (Székely word) |
| reguta | besorozott legény, regruta (német *Rekrut*) | conscript, recruit |
| salló | sarló (tájnyelvi alak) | sickle (dialect form) |
| sárig | sárga (székely szó) | yellow (Székely word) |
| talló | tarló: learatott gabonaföld (tájnyelvi alak) | stubble field (dialect form) |
| venyige | szőlővessző | vine shoot |

+ Záró mondat: „Ha olyan szóba botlasz a könyvben, ami ide kívánkozik, írd meg – bekerül." / EN tükör. *(Bővíthető lista – pont erre való a weboldal.)*

### 5.7 Strumming Patterns / Pengetésminták

Bevezető: „A könyv dalaihoz ez a néhány pengetés lefedi a repertoár nagy részét. A részletes tanítás a könyvben; itt az összefoglaló." Minden mintánál: név, grafika (↓↑ nyilak), mikor használd, mely daloknál (könyvbeli oldalszámmal).

1. **Egyszerű lefelé / Simple downstrokes** — `↓ ↓ ↓ ↓` — az első dalokhoz, gyerekdalokhoz. (Könyv: 56. o.-tól)
2. **Esztam / Boom-chuck** — `↓₂ ⇓₄ ↓₂ ⇓₄` (két húr hangsúlytalanul, négy húr hangsúlyosan) — magyar népdalok, csárdások. (Könyv: 64. o.)
3. **Standard gitárpengetés / Standard strum** — `↓ ↓ ↑ ↑ ↓ ↑` (le-le-fel-fel-le-fel) — pop-rock dalok, táborozós klasszikusok. (Könyv: Közösségi éneklés fejezet)
4. **Lassú aszimmetrikus / Slow asymmetric** — két lehúzás ütemenként, a második kicsit „siet": 40–60% arány — lassú lírai népdalok. (Könyv: 78. o., Szép szivárvány)
5. **Négyütéses zárlatos / Four-stroke with mute** — két gyors + némítás + hosszan kicsengő + záró — különleges ritmusú dalok. (Könyv: 90. o., Elmegyek, elmegyek)

EN tükörszöveg ugyanígy. *(A grafikákat CSS-sel/SVG-vel érdemes megoldani, ne képként – élesebb telefonon.)*

### 5.8 The Research / Kutatások

Bevezető HU: „A könyv Közösségi éneklés fejezetében azt írom: az éneklés boldoggá tesz, és ezt kutatások is bizonyítják. Itt vannak a kutatások." (EN tükör.) Utána a hat ellenőrzött tétel (a beszélgetésben leegyeztetett, DOI-s lista – Clift & Hancox 2001; Kreutz et al. 2004; Pearce–Launay–Dunbar 2015; Weinstein et al. 2016; Coulton et al. 2015; WHO/Fancourt & Finn 2019) az egysoros magyarázatokkal, mindkét nyelven.

### 5.9 Chord Charts / Táblázatok ← a könyv 211. oldala ígéri!

- Kis felbontású, **vízjeles** előnézet a 4 táblázatról (gitár, ukulele, brácsa, bariton gitár + Túlélő Akkordok).
- „Színes, laminált változat rendelhető: [ÁR] + szállítás. Írj a [EMAIL] címre." / EN tükör.
- NE legyen letölthető PDF, se nagy felbontású kép.

### 5.10 Errata / Hibajegyzék

Sablon: „Az első kiadásban talált hibák és javításaik. Találtál hibát? Írd meg – a következő utánnyomásban javítjuk, itt pedig azonnal." Üres táblázat: Oldal | Hiba | Helyesen. (EN tükör.)

### 5.11 For Book Owners / Vásárlói oldal (kapu)

- Szöveg: „Ez az oldal a könyv tulajdonosainak szól. A belépéshez írd be a könyv [OLDALSZÁM]. oldalán a [HÁNYADIK] szót." (EN tükör.)
- Mögötte: a teljes YouTube-hanganyag **nem listázott playlist-linkje** + későbbi extrák (nyomtatható anyagok, angol dalkivonatok).
- Mechanizmus (script.js):

```js
async function checkWord(input) {
  const norm = input.trim().toLowerCase();
  const buf = await crypto.subtle.digest('SHA-256',
      new TextEncoder().encode(norm));
  const hex = [...new Uint8Array(buf)]
      .map(b => b.toString(16).padStart(2,'0')).join('');
  if (hex === 'IDE_JON_A_HASH') {
    document.getElementById('gate').hidden = true;
    document.getElementById('content').hidden = false;
    localStorage.setItem('owner','1'); // visszatérőknek
  }
}
```

- A hash előállítása (terminálban): `echo -n "aszó" | shasum -a 256`
- Ez **szándékosan** nem erős védelem – kapu, nem páncélszekrény. A cél: a véletlen látogató ne lásson be, a vásárlónak 10 másodperc legyen.

### 5.12 Contact / Kapcsolat

A meglévő űrlap vagy egyszerű mailto: [EMAIL]. + „Dalt ajánlanál augusztus 20-ra? Hibát találtál? Írj!" (a könyv felhívásával összhangban).

---

## 6. YouTube-csatorna terv

- **Csatornanév-javaslat:** „Hungarian Songbook – Dalok az Óperencián túlról" (kereshető angolul ÉS magyarul).
- **Videó-formátum:** állókép + hang. A borító/arculat képe + dalcím, alatta a hang. Gyártás parancssorból, dalonként:

```bash
# 1) MP3 a MuseScore-fájlokból (macOS, MuseScore 4):
for f in *.mscz; do
  "/Applications/MuseScore 4.app/Contents/MacOS/mscore" \
    -o "mp3/${f%.mscz}.mp3" "$f"
done

# 2) MP4 a YouTube-hoz (állókép + hang, ffmpeg):
for f in mp3/*.mp3; do
  ffmpeg -loop 1 -i cover_video.png -i "$f" -shortest \
    -c:v libx264 -tune stillimage -c:a aac -pix_fmt yuv420p \
    "mp4/$(basename "${f%.mp3}").mp4"
done
```

- **Nyilvános:** a 3–5 minta-dal + esetleg egy csatorna-bemutató.
- **Nem listázott:** az összes többi dal, egyetlen nem listázott playlistben → a link CSAK a vásárlói oldalon.
- Videóleírás-sablon: dalcím HU+EN, „A kotta és az akkordok a Dalok az Óperencián túlról könyvben: hungariansongbook.com" – minden videó visszamutat az oldalra (ez a csatorna marketing-funkciója).
- Megjegyzés: a nem listázott linkek kiszivároghatnak – ez belefér, összhangban a kapu-filozófiával.

## 7. Asset-lista (te hozod)

1. Borítókép webre (a PDF-ből: 1600px széles JPG/PNG, HU és EN változat).
2. 2-3 minta-oldalkép kis felbontásban (gyorstalpaló-oldal, daloldal, térkép).
3. Vízjeles táblázat-előnézetek (4 db).
4. Madár/kakas motívum SVG-ben Tóth Zoltántól (favicon + díszítés).
5. MP3-ok és MP4-ek a fenti parancsokkal; YouTube-csatorna létrehozása.
6. Döntések: [ÁR], [VÁSÁRLÁSI CSATORNA], [EMAIL], [KAPU-SZÓ és oldalszáma].

## 8. SEO és meta

- Title-minta: `Hangolás – Dalok az Óperencián túlról | Hungarian Songbook` (oldalanként).
- `hreflang="hu"` / `hreflang="en"` párok minden oldalon; `lang` attribútum helyesen.
- Open Graph: borítókép + egy mondatos leírás (a Home hero-szövege).
- Kulcsszavak, amikre szervesen erős lehet az oldal: „magyar daloskönyv ukulele", „Hungarian songbook ukulele", „magyar népdalok akkordokkal", „ukulele hangolás magyarul".

---

## 9. Claude Code nyitó prompt (másold be ezt)

> Építsd fel a hungariansongbook.com statikus weboldalát a website-spec.md alapján. Sima HTML+CSS+vanilla JS, framework és build-lépés nélkül. Mobile-first, reszponzív (törésponttal ~700px-nél). Kétnyelvű tükörszerkezet: EN a gyökérben, HU a /hu/ alatt, fejlécben nyelvváltó, hreflang párokkal. Használd a spec 3. fejezetének design-tokenjeit és az 5. fejezet kész szövegeit szó szerint. A vásárlói kapu a spec 5.11 szerinti SHA-256-os megoldás legyen. A [SZÖGLETES] helyeket jelöld TODO-kommenttel. Először a vázat és a style.css-t készítsd el meg a Home oldalt mindkét nyelven, mutasd meg, és csak jóváhagyás után gyártsd le a többi oldalt.

