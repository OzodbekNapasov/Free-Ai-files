# MedTest Pro - Tibbiyot Test Simulyatori

Tibbiyot kolleji talabalari uchun test simulyatori. Ko'p fanlar bo'yicha testlarni yechish, natijalarni saqlash va Google Sheets ga yuborish imkoniyati.

## Xususiyatlari

- **7 ta fan** bo'yicha test savollari
- **2 ta rejim**: Imtihon (vaqt bilan) va Mashq (darhol javob ko'rsatiladi)
- **Taymer**: 5, 10, 15, 20, 30 daqiqa yoki cheksiz
- **Savollar aralashtirish**: Har safar yangi tartibda
- **Natijalar tarixi**: Brauzerda saqlanadi
- **Google Sheets integratsiya**: Natijalar avtomatik jadvalga yoziladi
- **Rasm qo'llab-quvvatlash**: Savollarga rasm qo'shish mumkin
- **Dark/Light tema**: Qorong'u va yorug' rejim
- **Mobil moslashuvchan**: Barcha qurilmalarda ishlaydi
- **Klaviatura qisqa yo'llari**: A/B/C/D, 1/2/3/4, strelkalar, F (belgilash)

## Fanlar

| Fan | Savollar soni |
|-----|:---:|
| Terapiya | 10 |
| Farmakalogiya asoslari | 10 |
| Hamshiralik ishi | 10 |
| Pediatriya | 10 |
| Akusherlik va Ginekologiya | 10 |
| Jamoada hamshiralik ishi | 10 |
| Tibbiyotda Axborot Texnologiyalari | 10 |

## O'rnatish

### Oddiy usul (lokal)
1. Papkani yuklab oling
2. `index.html` faylini brauzerda oching
3. Tayyor!

### Deploy qilish (Vercel/Netlify/GitHub Pages)
1. `test-simulator` papkasini GitHub ga push qiling
2. Vercel yoki Netlify da yangi project yarating
3. Root directory: `test-simulator`
4. Deploy!

### GitHub Pages
1. Repository Settings > Pages
2. Source: main branch, folder: /test-simulator
3. Save

## Google Sheets sozlash

1. [Google Sheets](https://sheets.google.com) yarating
2. Sarlavhalar: `Sana | Ism | Guruh | Fan | Rejim | Ball | To'g'ri | Noto'g'ri | Javobsiz | Jami | Vaqt`
3. Extensions > Apps Script
4. `google-sheets-setup.js` dagi kodni joylashtiring
5. Deploy > New deployment > Web app
6. URL ni `app.js` dagi `GOOGLE_SHEETS_URL` ga qo'ying

## Yangi savollar qo'shish

`data/questions.js` faylida yangi fan yoki savollar qo'shing:

```javascript
{
  id: 11,
  question: "Savol matni?",
  options: [
    "A variant",
    "B variant",
    "C variant",
    "D variant"
  ],
  correctAnswer: 0, // 0=A, 1=B, 2=C, 3=D
  image: null // yoki "images/rasm.png"
}
```

## Rasm qo'shish

1. Rasmlarni `images/` papkasiga joylashtiring
2. Savolda `image: "images/rasm-nomi.png"` qilib ko'rsating

## Texnologiyalar

- Vanilla JavaScript (framework siz)
- CSS Custom Properties (tema uchun)
- LocalStorage (tarix uchun)
- Google Apps Script (natijalarni saqlash)
- Font Awesome (ikonlar)
- Google Fonts (Outfit, Plus Jakarta Sans)

## Loyiha tuzilishi

```
test-simulator/
├── index.html          # Asosiy HTML
├── styles.css          # Barcha stillar
├── app.js              # Asosiy JavaScript
├── data/
│   └── questions.js    # Savollar bazasi
├── images/             # Rasmlar (agar bor bo'lsa)
├── google-sheets-setup.js  # Google Sheets sozlash yo'riqnomasi
└── README.md           # Hujjat
```

## Litsenziya

MIT License - Bepul foydalanish mumkin.

---

**Muallif**: Medical Students Team  
**Versiya**: 1.0.0  
**Sana**: 2026
