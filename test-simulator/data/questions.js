// Question Database - Add your questions here
// Structure: subject -> questions array
// correctAnswer is 0-indexed (0=A, 1=B, 2=C, 3=D)

const SUBJECTS_DATA = {
  subjects: [
    {
      id: "terapiya",
      name: "Terapiya",
      icon: "fa-heartbeat",
      year: 2,
      semester: 2,
      color: "#ef4444",
      questions: [
        {
          id: 1,
          question: "Gerontologiya nima?",
          options: [
            "Gerontologiya",
            "Xirurgiya",
            "Terapiya",
            "Gistologiya"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 2,
          question: "Anemiya nima?",
          options: [
            "qonda leykositlar miqdorining kamayishi",
            "qonda leykositlar miqdorining oshishi",
            "qonda trombositlar miqdorining kamayishi",
            "qonda eritrositlar va gemoglabin miqdorining kamayishi"
          ],
          correctAnswer: 3,
          image: null
        },
        {
          id: 3,
          question: "Etiologiya nima?",
          options: [
            "kasallik sababi",
            "kasallikni kechishi",
            "kasallikni avj olishi",
            "kasallik klinikasi"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 4,
          question: "Organizmning tashqi muhitga moslashish reaksiyasi nima deyiladi?",
          options: [
            "adaptatsiya",
            "reaktivlik",
            "kompensatsiya",
            "regeneratsiya"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 5,
          question: "Simptom nima?",
          options: [
            "kasallikning belgisi",
            "kasallikning sababi",
            "kasallikning kechishi",
            "kasallikning davosi"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 6,
          question: "Sindrom nima?",
          options: [
            "kasallikning belgisi",
            "kasallikning sababi",
            "kasallikning kechishi",
            "kasallik belgilarining yig'indisi"
          ],
          correctAnswer: 3,
          image: null
        },
        {
          id: 7,
          question: "Retsidiv nima?",
          options: [
            "kasallikning bosilishi",
            "kasallikning qo'zishi",
            "kasallikning yashirin davri",
            "kasallik belgilari"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 8,
          question: "Remissiya nima?",
          options: [
            "kasallikning qo'zishi",
            "kasallikning bosilishi",
            "kasallikning yashirin davri",
            "kasallik belgilari"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 9,
          question: "Profilaktika nima?",
          options: [
            "kasallikning oldini olish",
            "kasallikni davolash",
            "kasallikni aniqlash",
            "kasallikni kuzatish"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 10,
          question: "Diagnostika nima?",
          options: [
            "kasallikni davolash",
            "kasallikni aniqlash",
            "kasallikning oldini olish",
            "kasallikni kuzatish"
          ],
          correctAnswer: 1,
          image: null
        }
      ]
    },
    {
      id: "farmakalogiya",
      name: "Farmakalogiya asoslari",
      icon: "fa-pills",
      year: 2,
      semester: 2,
      color: "#8b5cf6",
      questions: [
        {
          id: 1,
          question: "\"Farmakologiya\" qanday so'zdan olingan?",
          options: [
            "grekcha \"pharmakon\"-dori, \"logos\"-fan",
            "lotincha \"pharmakon\"-dori, \"logos\"-fan",
            "grekcha \"pharmacon\"-dori, \"logos\"-fan",
            "lotincha \"pharmacon\"-dori, \"logos\"-fan"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 2,
          question: "Retsept (dorinoma) deb nimaga aytiladi?",
          options: [
            "dorixona xodimining yozgan murojaati",
            "tibbiy xodimning dorixonaga yozgan dori tayyorlash va berish to'g'risidagi murojaati",
            "bemorning shifoxonaga yozgan murojaati",
            "barcha javoblar to'g'ri"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 3,
          question: "Retsept (dorinoma)dagi D.t.d.N qanday ma'noni anglatadi?",
          options: [
            "belgila",
            "ol",
            "shunday miqdorda ber",
            "barcha javoblar to'g'ri"
          ],
          correctAnswer: 2,
          image: null
        },
        {
          id: 4,
          question: "Retsept (dorinoma)dagi Signa qismida nimalar ko'rsatiladi?",
          options: [
            "dorini ishlatish usuli",
            "ichish vaqti",
            "dozasi",
            "barcha javoblar to'g'ri"
          ],
          correctAnswer: 3,
          image: null
        },
        {
          id: 5,
          question: "Doza deb nimaga aytiladi?",
          options: [
            "ishlatiladigan dori preparatining miqdoriga",
            "tibbiy xodimning dorixonaga dari tayyorlash haqida ko'rsatmasi",
            "bemorning shifoxonaga yozgan murojaati",
            "enteral va parenteral, terapevtik"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 6,
          question: "Doza turlarini to'liq aytib bering?",
          options: [
            "uldiradigan, enteral",
            "zaharlovchi, parenteral",
            "uldiradigan, zaharlovchi va terapevtik",
            "enteral va parenteral, terapevtik"
          ],
          correctAnswer: 2,
          image: null
        },
        {
          id: 7,
          question: "Farmokopeya qanday xujjat?",
          options: [
            "dorilarni sifati, ularni tayyorlash, nazorat kilish, saklash va nomlarini belgilaydigan davlat xujjati",
            "dori vositalarini eng kichik mikdori",
            "dori moddalarini saqlash xujjati",
            "dori moddalarini mikdorini belgilaydigan xujjat"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 8,
          question: "A va B shkaflarda saklanadigan dorilarga qanday yorliklar yopishtirilgan bo'ladi?",
          options: [
            "sirtga",
            "ichishga",
            "in'eksiya uchun, ko'z tomchilari",
            "barchasi to'g'ri"
          ],
          correctAnswer: 3,
          image: null
        },
        {
          id: 9,
          question: "Dori moddalar organizmga qaysi yo'llar bilan yuboriladi?",
          options: [
            "ichki",
            "enteral va parenteral",
            "tashqi",
            "yuborib bo'lmaydi"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 10,
          question: "Enteral yo'l nima?",
          options: [
            "teri orqali",
            "oshqozon-ichak yo'li orqali",
            "vena orqali",
            "mushak orqali"
          ],
          correctAnswer: 1,
          image: null
        }
      ]
    },
    {
      id: "hamshiralik",
      name: "Hamshiralik ishi",
      icon: "fa-user-nurse",
      year: 2,
      semester: 2,
      color: "#06b6d4",
      questions: [
        {
          id: 1,
          question: "Hamshiralik jarayoni necha bosqichdan iborat?",
          options: [
            "3 bosqich",
            "4 bosqich",
            "5 bosqich",
            "6 bosqich"
          ],
          correctAnswer: 2,
          image: null
        },
        {
          id: 2,
          question: "Hamshiralik jarayonining birinchi bosqichi nima?",
          options: [
            "rejalashtirish",
            "bemor ahvolini baholash",
            "amalga oshirish",
            "baholash"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 3,
          question: "Tibbiy hamshira kasallikni aniqlashda qaysi usullardan foydalanadi?",
          options: [
            "sub'yektiv va ob'yektiv",
            "faqat sub'yektiv",
            "faqat ob'yektiv",
            "laborator"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 4,
          question: "Puls normada nechta?",
          options: [
            "40-60 marta/min",
            "60-80 marta/min",
            "80-100 marta/min",
            "100-120 marta/min"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 5,
          question: "Normal arterial qon bosimi qancha?",
          options: [
            "100/60 mm.sim.ust",
            "120/80 mm.sim.ust",
            "140/90 mm.sim.ust",
            "160/100 mm.sim.ust"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 6,
          question: "Tana haroratini o'lchash uchun termometr qayerga qo'yiladi?",
          options: [
            "faqat qo'ltiq ostiga",
            "faqat og'iz bo'shlig'iga",
            "qo'ltiq osti, og'iz bo'shlig'i, to'g'ri ichak",
            "faqat to'g'ri ichakka"
          ],
          correctAnswer: 2,
          image: null
        },
        {
          id: 7,
          question: "Normal tana harorati qancha?",
          options: [
            "35.5-36.0°C",
            "36.0-37.0°C",
            "37.0-38.0°C",
            "38.0-39.0°C"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 8,
          question: "Subfebril harorat qancha?",
          options: [
            "36.0-37.0°C",
            "37.0-38.0°C",
            "38.0-39.0°C",
            "39.0-40.0°C"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 9,
          question: "Giperpiretik harorat qancha?",
          options: [
            "38.0-39.0°C",
            "39.0-40.0°C",
            "40.0-41.0°C",
            "41.0°C dan yuqori"
          ],
          correctAnswer: 3,
          image: null
        },
        {
          id: 10,
          question: "Nafas olish chastotasi normada nechta?",
          options: [
            "10-14 marta/min",
            "16-20 marta/min",
            "22-26 marta/min",
            "28-32 marta/min"
          ],
          correctAnswer: 1,
          image: null
        }
      ]
    },
    {
      id: "pediatriya",
      name: "Pediatriya",
      icon: "fa-baby",
      year: 2,
      semester: 2,
      color: "#f59e0b",
      questions: [
        {
          id: 1,
          question: "Pediatriya fani nimani o'rganadi?",
          options: [
            "kattalar kasalliklarini",
            "bolalar kasalliklari, o'sishi va rivojlanishini",
            "jarrohlik kasalliklarini",
            "ruhiy kasalliklarini"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 2,
          question: "Yangi tug'ilgan chaqaloq davri qancha davom etadi?",
          options: [
            "1-7 kun",
            "1-28 kun",
            "1-3 oy",
            "1-12 oy"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 3,
          question: "Ko'krak suti bilan emizish necha oygacha tavsiya etiladi?",
          options: [
            "6 oygacha",
            "12 oygacha",
            "24 oygacha",
            "36 oygacha"
          ],
          correctAnswer: 2,
          image: null
        },
        {
          id: 4,
          question: "Yangi tug'ilgan chaqaloqning normal tana og'irligi qancha?",
          options: [
            "1500-2000 g",
            "2500-4000 g",
            "4000-5000 g",
            "5000-6000 g"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 5,
          question: "Bolaning birinchi tishlari qachon chiqadi?",
          options: [
            "3-4 oylikda",
            "6-7 oylikda",
            "9-10 oylikda",
            "12 oylikda"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 6,
          question: "Yangi tug'ilgan chaqaloqda yurak urishi normada qancha?",
          options: [
            "80-100 marta/min",
            "100-120 marta/min",
            "120-140 marta/min",
            "140-160 marta/min"
          ],
          correctAnswer: 3,
          image: null
        },
        {
          id: 7,
          question: "Apgar shkalasi nima uchun ishlatiladi?",
          options: [
            "homilaning vaznini aniqlash",
            "yangi tug'ilgan chaqaloq holatini baholash",
            "onaning holatini baholash",
            "kasallikni aniqlash"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 8,
          question: "Normal Apgar bali qancha?",
          options: [
            "3-5 ball",
            "5-7 ball",
            "7-10 ball",
            "10-12 ball"
          ],
          correctAnswer: 2,
          image: null
        },
        {
          id: 9,
          question: "Raxit kasalligi qaysi vitamin yetishmasligidan kelib chiqadi?",
          options: [
            "A vitamin",
            "B vitamin",
            "C vitamin",
            "D vitamin"
          ],
          correctAnswer: 3,
          image: null
        },
        {
          id: 10,
          question: "Bolaga qo'shimcha ovqat (prikorm) qachon boshlanadi?",
          options: [
            "3 oylikdan",
            "4 oylikdan",
            "6 oylikdan",
            "9 oylikdan"
          ],
          correctAnswer: 2,
          image: null
        }
      ]
    },
    {
      id: "akusherlik",
      name: "Akusherlik va Ginekologiya",
      icon: "fa-venus",
      year: 2,
      semester: 2,
      color: "#ec4899",
      questions: [
        {
          id: 1,
          question: "Homiladorlik normal qancha davom etadi?",
          options: [
            "36 hafta",
            "38 hafta",
            "40 hafta",
            "42 hafta"
          ],
          correctAnswer: 2,
          image: null
        },
        {
          id: 2,
          question: "Tug'ruq qancha davr (period)dan iborat?",
          options: [
            "2 davrdan",
            "3 davrdan",
            "4 davrdan",
            "5 davrdan"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 3,
          question: "Tug'ruqning birinchi davri nima?",
          options: [
            "homila tug'ilishi",
            "yo'ldosh ajralishi",
            "bachadon bo'yni ochilishi",
            "tug'ruqdan keyingi davr"
          ],
          correctAnswer: 2,
          image: null
        },
        {
          id: 4,
          question: "Bachadon bo'yni to'liq ochilishi qancha?",
          options: [
            "5 sm",
            "8 sm",
            "10 sm",
            "12 sm"
          ],
          correctAnswer: 2,
          image: null
        },
        {
          id: 5,
          question: "Gestoz nima?",
          options: [
            "homiladorlik toksikozi",
            "tug'ruq og'rig'i",
            "qon ketishi",
            "infeksiya"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 6,
          question: "Erta gestoz qachon boshlanadi?",
          options: [
            "1-12 hafta",
            "12-20 hafta",
            "20-28 hafta",
            "28-40 hafta"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 7,
          question: "Preeklampsiyaning asosiy belgilari qaysi?",
          options: [
            "bosh og'rig'i, qon bosimi oshishi, shish",
            "ich ketishi, qusish",
            "harorat ko'tarilishi",
            "kamqonlik"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 8,
          question: "Tug'ruqdan keyingi qon ketishning asosiy sababi?",
          options: [
            "bachadon atoniyasi",
            "infeksiya",
            "gipertenziya",
            "anemiya"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 9,
          question: "Kesarev kesimi uchun ko'rsatma bo'lmagan holat?",
          options: [
            "tor tos",
            "yo'ldosh oldindan kelishi",
            "normal homila holati",
            "bola ko'ndalang joylashishi"
          ],
          correctAnswer: 2,
          image: null
        },
        {
          id: 10,
          question: "Homiladorlikda gemoglobin norma darajasi qancha?",
          options: [
            "80-90 g/l",
            "90-100 g/l",
            "110-140 g/l",
            "150-170 g/l"
          ],
          correctAnswer: 2,
          image: null
        }
      ]
    },
    {
      id: "jamoada_hamshiralik",
      name: "Jamoada hamshiralik ishi",
      icon: "fa-people-group",
      year: 2,
      semester: 2,
      color: "#10b981",
      questions: [
        {
          id: 1,
          question: "Jamoada hamshiralik ishi nima?",
          options: [
            "shifoxonada ishlash",
            "aholi salomatligini saqlash va mustahkamlash bo'yicha profilaktik ish",
            "laboratoriyada ishlash",
            "dorixonada ishlash"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 2,
          question: "Patronaj nima?",
          options: [
            "kasalxonada parvarish",
            "uyga borib bemor va sog'lom kishilarni kuzatish",
            "poliklinikada qabul",
            "tez yordam"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 3,
          question: "Dispanserizatsiya nima?",
          options: [
            "bemor va sog'lom kishilarni muntazam tibbiy nazoratga olish",
            "kasallikni davolash",
            "dori yozish",
            "operatsiya qilish"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 4,
          question: "Oilaviy shifokor tarkibida nechta aholi biriktirilgan?",
          options: [
            "500-1000",
            "1000-1500",
            "1500-2000",
            "2000-2500"
          ],
          correctAnswer: 2,
          image: null
        },
        {
          id: 5,
          question: "Homiladorlarni patronaj qilish necha marta?",
          options: [
            "1-2 marta",
            "2-3 marta",
            "3-4 marta",
            "kamida 2 marta"
          ],
          correctAnswer: 3,
          image: null
        },
        {
          id: 6,
          question: "Yangi tug'ilgan chaqaloqni birinchi patronaji qachon?",
          options: [
            "tug'ruqxonadan chiqqan kundan 1-3 kun ichida",
            "1 hafta ichida",
            "2 hafta ichida",
            "1 oy ichida"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 7,
          question: "Immunoprofilaktika nima?",
          options: [
            "kasallikni davolash",
            "emlash orqali kasalliklar oldini olish",
            "dori berish",
            "operatsiya"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 8,
          question: "BCG emlashi nimaga qarshi?",
          options: [
            "qizamiq",
            "sil kasalligi",
            "poliomielit",
            "ko'k yo'tal"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 9,
          question: "BCG emlashi qachon qilinadi?",
          options: [
            "tug'ilgandan 1-4 kun",
            "1 oylikda",
            "2 oylikda",
            "6 oylikda"
          ],
          correctAnswer: 0,
          image: null
        },
        {
          id: 10,
          question: "Sanitariya ma'rifat ishi maqsadi nima?",
          options: [
            "kasalliklarni davolash",
            "aholining tibbiy bilimini oshirish va sog'lom turmush tarzini shakllantirish",
            "dori tarqatish",
            "operatsiya qilish"
          ],
          correctAnswer: 1,
          image: null
        }
      ]
    },
    {
      id: "tat",
      name: "Tibbiyotda Axborot Texnologiyalari",
      icon: "fa-laptop-medical",
      year: 2,
      semester: 2,
      color: "#3b82f6",
      questions: [
        {
          id: 1,
          question: "Axborot texnologiyalari (AT) nima?",
          options: [
            "faqat kompyuter bilan ishlash",
            "axborotni yig'ish, saqlash, qayta ishlash va uzatish usullari va vositalari majmui",
            "faqat internet bilan ishlash",
            "faqat telefon bilan ishlash"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 2,
          question: "Tibbiyot axborot tizimi (TАТ) nima?",
          options: [
            "faqat kasallik tarixi",
            "tibbiyot muassasalarida axborotni boshqarish tizimi",
            "faqat dori haqida ma'lumot",
            "faqat bemor ro'yxati"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 3,
          question: "Teletibbiyot nima?",
          options: [
            "televizor orqali davolash",
            "masofadan turib tibbiy xizmat ko'rsatish",
            "telefon orqali dori buyurtma qilish",
            "internet orqali dori sotib olish"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 4,
          question: "EHM (kompyuter) qanday avlodlarga bo'linadi?",
          options: [
            "2 avlod",
            "3 avlod",
            "4 avlod",
            "5 avlod"
          ],
          correctAnswer: 3,
          image: null
        },
        {
          id: 5,
          question: "Microsoft Word dasturi nima uchun ishlatiladi?",
          options: [
            "rasm chizish",
            "matn yaratish va tahrirlash",
            "hisob-kitob qilish",
            "prezentatsiya yaratish"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 6,
          question: "Microsoft Excel dasturi nima uchun ishlatiladi?",
          options: [
            "matn yozish",
            "jadvallar va hisob-kitoblar bilan ishlash",
            "rasm chizish",
            "video montaj"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 7,
          question: "Internet nima?",
          options: [
            "bitta kompyuter",
            "global kompyuter tarmog'i",
            "telefon tarmog'i",
            "televizion tarmoq"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 8,
          question: "Elektron pochta (e-mail) nima uchun ishlatiladi?",
          options: [
            "video ko'rish",
            "xabar va fayllarni yuborish va qabul qilish",
            "o'yin o'ynash",
            "musiqa tinglash"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 9,
          question: "Ma'lumotlar bazasi (database) nima?",
          options: [
            "faqat rasm to'plami",
            "tizimli ravishda saqlangan ma'lumotlar to'plami",
            "faqat matn fayli",
            "faqat video fayl"
          ],
          correctAnswer: 1,
          image: null
        },
        {
          id: 10,
          question: "Tibbiyotda axborot texnologiyalarini qo'llash afzalliklari?",
          options: [
            "faqat vaqtni tejash",
            "xatolarni kamaytirish, tezkorlik, samaradorlikni oshirish",
            "faqat qog'ozni tejash",
            "faqat xodimlarni qisqartirish"
          ],
          correctAnswer: 1,
          image: null
        }
      ]
    }
  ]
};
