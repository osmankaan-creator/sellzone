/**
 * SELL ZONE - İkinci El & Pazaryeri Frontend Uygulaması
 */

const TURKISH_CITIES = [
  { plate: '01', name: 'Adana' },
  { plate: '02', name: 'Adıyaman' },
  { plate: '03', name: 'Afyonkarahisar' },
  { plate: '04', name: 'Ağrı' },
  { plate: '05', name: 'Amasya' },
  { plate: '06', name: 'Ankara' },
  { plate: '07', name: 'Antalya' },
  { plate: '08', name: 'Artvin' },
  { plate: '09', name: 'Aydın' },
  { plate: '10', name: 'Balıkesir' },
  { plate: '11', name: 'Bilecik' },
  { plate: '12', name: 'Bingöl' },
  { plate: '13', name: 'Bitlis' },
  { plate: '14', name: 'Bolu' },
  { plate: '15', name: 'Burdur' },
  { plate: '16', name: 'Bursa' },
  { plate: '17', name: 'Çanakkale' },
  { plate: '18', name: 'Çankırı' },
  { plate: '19', name: 'Çorum' },
  { plate: '20', name: 'Denizli' },
  { plate: '21', name: 'Diyarbakır' },
  { plate: '22', name: 'Edirne' },
  { plate: '23', name: 'Elazığ' },
  { plate: '24', name: 'Erzincan' },
  { plate: '25', name: 'Erzurum' },
  { plate: '26', name: 'Eskişehir' },
  { plate: '27', name: 'Gaziantep' },
  { plate: '28', name: 'Giresun' },
  { plate: '29', name: 'Gümüşhane' },
  { plate: '30', name: 'Hakkari' },
  { plate: '31', name: 'Hatay' },
  { plate: '32', name: 'Isparta' },
  { plate: '33', name: 'Mersin' },
  { plate: '34', name: 'İstanbul' },
  { plate: '35', name: 'İzmir' },
  { plate: '36', name: 'Kars' },
  { plate: '37', name: 'Kastamonu' },
  { plate: '38', name: 'Kayseri' },
  { plate: '39', name: 'Kırklareli' },
  { plate: '40', name: 'Kırşehir' },
  { plate: '41', name: 'Kocaeli' },
  { plate: '42', name: 'Konya' },
  { plate: '43', name: 'Kütahya' },
  { plate: '44', name: 'Malatya' },
  { plate: '45', name: 'Manisa' },
  { plate: '46', name: 'Kahramanmaraş' },
  { plate: '47', name: 'Mardin' },
  { plate: '48', name: 'Muğla' },
  { plate: '49', name: 'Muş' },
  { plate: '50', name: 'Nevşehir' },
  { plate: '51', name: 'Niğde' },
  { plate: '52', name: 'Ordu' },
  { plate: '53', name: 'Rize' },
  { plate: '54', name: 'Sakarya' },
  { plate: '55', name: 'Samsun' },
  { plate: '56', name: 'Siirt' },
  { plate: '57', name: 'Sinop' },
  { plate: '58', name: 'Sivas' },
  { plate: '59', name: 'Tekirdağ' },
  { plate: '60', name: 'Tokat' },
  { plate: '61', name: 'Trabzon' },
  { plate: '62', name: 'Tunceli' },
  { plate: '63', name: 'Şanlıurfa' },
  { plate: '64', name: 'Uşak' },
  { plate: '65', name: 'Van' },
  { plate: '66', name: 'Yozgat' },
  { plate: '67', name: 'Zonguldak' },
  { plate: '68', name: 'Aksaray' },
  { plate: '69', name: 'Bayburt' },
  { plate: '70', name: 'Karaman' },
  { plate: '71', name: 'Kırıkkale' },
  { plate: '72', name: 'Batman' },
  { plate: '73', name: 'Şırnak' },
  { plate: '74', name: 'Bartın' },
  { plate: '75', name: 'Ardahan' },
  { plate: '76', name: 'Iğdır' },
  { plate: '77', name: 'Yalova' },
  { plate: '78', name: 'Karabük' },
  { plate: '79', name: 'Kilis' },
  { plate: '80', name: 'Osmaniye' },
  { plate: '81', name: 'Düzce' }
];

const POPULAR_CITIES = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 
  'Adana', 'Konya', 'Gaziantep', 'Kocaeli', 'Trabzon', 
  'Eskişehir', 'Samsun', 'Mersin', 'Kayseri', 'Diyarbakır', 'Muğla'
];

const TURKEY_REGIONS = {
  marmara: ['İstanbul', 'Edirne', 'Kırklareli', 'Tekirdağ', 'Çanakkale', 'Balıkesir', 'Bursa', 'Yalova', 'Kocaeli', 'Sakarya', 'Bilecik'],
  ege: ['İzmir', 'Manisa', 'Aydın', 'Denizli', 'Muğla', 'Afyonkarahisar', 'Kütahya', 'Uşak'],
  akdeniz: ['Antalya', 'Adana', 'Mersin', 'Hatay', 'Isparta', 'Burdur', 'Osmaniye', 'Kahramanmaraş'],
  ic_anadolu: ['Ankara', 'Konya', 'Kayseri', 'Eskişehir', 'Sivas', 'Kırıkkale', 'Aksaray', 'Karaman', 'Kırşehir', 'Niğde', 'Nevşehir', 'Yozgat', 'Çankırı'],
  karadeniz: ['Trabzon', 'Samsun', 'Ordu', 'Giresun', 'Rize', 'Artvin', 'Sinop', 'Kastamonu', 'Bartın', 'Zonguldak', 'Karabük', 'Düzce', 'Bolu', 'Çorum', 'Amasya', 'Tokat', 'Gümüşhane', 'Bayburt'],
  dogu: ['Erzurum', 'Malatya', 'Van', 'Elazığ', 'Ağrı', 'Kars', 'Muş', 'Bitlis', 'Hakkari', 'Bingöl', 'Tunceli', 'Erzincan', 'Ardahan', 'Iğdır'],
  guneydogu: ['Gaziantep', 'Diyarbakır', 'Şanlıurfa', 'Batman', 'Adıyaman', 'Mardin', 'Siirt', 'Şırnak', 'Kilis']
};

const TURKEY_DISTRICTS = {
  'Adana': ['Aladağ', 'Ceyhan', 'Çukurova', 'Feke', 'İmamoğlu', 'Karaisalı', 'Karataş', 'Kozan', 'Pozantı', 'Saimbeyli', 'Sarıçam', 'Seyhan', 'Tufanbeyli', 'Yumurtalık', 'Yüreğir'],
  'Adıyaman': ['Besni', 'Çelikhan', 'Gerger', 'Gölbaşı', 'Kahta', 'Merkez', 'Samsat', 'Sincik', 'Tut'],
  'Afyonkarahisar': ['Başmakçı', 'Bayat', 'Bolvadin', 'Çay', 'Çobanlar', 'Dazkırı', 'Dinar', 'Emirdağ', 'Evciler', 'Hocalar', 'İhsaniye', 'İscehisar', 'Kızılören', 'Merkez', 'Sandıklı', 'Sinanpaşa', 'Sultandağı', 'Şuhut'],
  'Ağrı': ['Diyadin', 'Doğubayazıt', 'Eleşkirt', 'Hamur', 'Merkez', 'Patnos', 'Taşlıçay', 'Tutak'],
  'Amasya': ['Göynücek', 'Gümüşhacıköy', 'Hamamözü', 'Merkez', 'Merzifon', 'Suluova', 'Taşova'],
  'Ankara': ['Akyurt', 'Altındağ', 'Ayaş', 'Bala', 'Beypazarı', 'Çamlıdere', 'Çankaya', 'Çubuk', 'Elmadağ', 'Etimesgut', 'Evren', 'Gölbaşı', 'Güdül', 'Haymana', 'Kahramankazan', 'Kalecik', 'Keçiören', 'Kızılcahamam', 'Mamak', 'Nallıhan', 'Polatlı', 'Pursaklar', 'Sincan', 'Şereflikoçhisar', 'Yenimahalle'],
  'Antalya': ['Akseki', 'Aksu', 'Alanya', 'Demre', 'Döşemealtı', 'Elmalı', 'Finike', 'Gazipaşa', 'Gündoğmuş', 'İbradı', 'Kaş', 'Kemer', 'Kepez', 'Konyaaltı', 'Korkuteli', 'Kumluca', 'Manavgat', 'Muratpaşa', 'Serik'],
  'Artvin': ['Ardanuç', 'Arhavi', 'Borçka', 'Hopa', 'Kemalpaşa', 'Merkez', 'Murgul', 'Şavşat', 'Yusufeli'],
  'Aydın': ['Bozdoğan', 'Buharkent', 'Çine', 'Didim', 'Efeler', 'Germencik', 'İncirliova', 'Karacasu', 'Karpuzlu', 'Koçarlı', 'Köşk', 'Kuşadası', 'Kuyucak', 'Nazilli', 'Söke', 'Sultanhisar', 'Yenipazar'],
  'Balıkesir': ['Altıeylül', 'Ayvalık', 'Balya', 'Bandırma', 'Bigadiç', 'Burhaniye', 'Dursunbey', 'Edremit', 'Erdek', 'Gömeç', 'Gönen', 'Havran', 'İvrindi', 'Karesi', 'Kepsut', 'Manyas', 'Marmara', 'Savaştepe', 'Sındırgı', 'Susurluk'],
  'Bilecik': ['Bozüyük', 'Gölpazarı', 'İnhisar', 'Merkez', 'Osmaneli', 'Pazaryeri', 'Söğüt', 'Yenipazar'],
  'Bingöl': ['Adaklı', 'Genç', 'Karlıova', 'Kiğı', 'Merkez', 'Solhan', 'Yayladere', 'Yedisu'],
  'Bitlis': ['Adilcevaz', 'Ahlat', 'Güroymak', 'Hizan', 'Merkez', 'Mutki', 'Tatvan'],
  'Bolu': ['Dörtdivan', 'Gerede', 'Göynük', 'Kıbrıscık', 'Mengen', 'Merkez', 'Mudurnu', 'Seben', 'Yeniçağa'],
  'Burdur': ['Ağlasun', 'Altınyayla', 'Bucak', 'Çavdır', 'Çeltikçi', 'Gölhisar', 'Karamanlı', 'Kemer', 'Merkez', 'Tefenni', 'Yeşilova'],
  'Bursa': ['Büyükorhan', 'Gemlik', 'Gürsu', 'Harmancık', 'İnegöl', 'İznik', 'Karacabey', 'Keles', 'Kestel', 'Mudanya', 'Mustafakemalpaşa', 'Nilüfer', 'Orhaneli', 'Orhangazi', 'Osmangazi', 'Yenişehir', 'Yıldırım'],
  'Çanakkale': ['Ayvacık', 'Bayramiç', 'Biga', 'Bozcaada', 'Çan', 'Eceabat', 'Ezine', 'Gelibolu', 'Gökçeada', 'Lapseki', 'Merkez', 'Yenice'],
  'Çankırı': ['Atkaracalar', 'Bayramören', 'Çerkeş', 'Eldivan', 'Ilgaz', 'Kızılırmak', 'Korgun', 'Kurşunlu', 'Merkez', 'Orta', 'Şabanözü', 'Yapraklı'],
  'Çorum': ['Alaca', 'Bayat', 'Boğazkale', 'Dodurga', 'İskilip', 'Kargı', 'Laçin', 'Mecitözü', 'Merkez', 'Oğuzlar', 'Ortaköy', 'Osmancık', 'Sungurlu', 'Uğurludağ'],
  'Denizli': ['Acıpayam', 'Babadağ', 'Baklan', 'Bekilli', 'Beyağaç', 'Bozkurt', 'Buldan', 'Çal', 'Çameli', 'Çardak', 'Çivril', 'Güney', 'Honaz', 'Kale', 'Merkezefendi', 'Pamukkale', 'Sarayköy', 'Serinhisar', 'Tavas'],
  'Diyarbakır': ['Bağlar', 'Bismil', 'Çermik', 'Çınar', 'Çüngüş', 'Dicle', 'Eğil', 'Ergani', 'Hani', 'Hazro', 'Kayapınar', 'Kocaköy', 'Kulp', 'Lice', 'Silvan', 'Sur', 'Yenişehir'],
  'Edirne': ['Enez', 'Havsa', 'İpsala', 'Keşan', 'Lalapaşa', 'Meriç', 'Merkez', 'Süloğlu', 'Uzunköprü'],
  'Elazığ': ['Ağın', 'Alacakaya', 'Arıcak', 'Baskil', 'Karakoçan', 'Keban', 'Kovancılar', 'Maden', 'Merkez', 'Palu', 'Sivrice'],
  'Erzincan': ['Çayırlı', 'İliç', 'Kemah', 'Kemaliye', 'Merkez', 'Otlukbeli', 'Refahiye', 'Tercan', 'Üzümlü'],
  'Erzurum': ['Aşkale', 'Aziziye', 'Çat', 'Hınıs', 'Horasan', 'İspir', 'Karaçoban', 'Karayazı', 'Köprüköy', 'Narman', 'Oltu', 'Olur', 'Palandöken', 'Pasinler', 'Pazaryolu', 'Şenkaya', 'Tekman', 'Tortum', 'Uzundere', 'Yakutiye'],
  'Eskişehir': ['Alpu', 'Beylikova', 'Çifteler', 'Günyüzü', 'Han', 'İnönü', 'Mahmudiye', 'Mihalgazi', 'Mihalıççık', 'Odunpazarı', 'Sarıcakaya', 'Seyitgazi', 'Sivrihisar', 'Tepebaşı'],
  'Gaziantep': ['Araban', 'İslahiye', 'Karkamış', 'Nizip', 'Nurdağı', 'Oğuzeli', 'Şahinbey', 'Şehitkamil', 'Yavuzeli'],
  'Giresun': ['Alucra', 'Bulancak', 'Çamoluk', 'Çanakçı', 'Dereli', 'Doğankent', 'Espiye', 'Eynesil', 'Görele', 'Güce', 'Keşap', 'Merkez', 'Piraziz', 'Şebinkarahisar', 'Tirebolu', 'Yağlıdere'],
  'Gümüşhane': ['Kelkit', 'Köse', 'Kürtün', 'Merkez', 'Şiran', 'Torul'],
  'Hakkari': ['Çukurca', 'Derecik', 'Merkez', 'Şemdinli', 'Yüksekova'],
  'Hatay': ['Altınözü', 'Antakya', 'Arsuz', 'Belen', 'Defne', 'Dörtyol', 'Erzin', 'Hassa', 'İskenderun', 'Kırıkhan', 'Kumlu', 'Payas', 'Reyhanlı', 'Samandağ', 'Yayladağı'],
  'Isparta': ['Aksu', 'Atabey', 'Eğirdir', 'Gelendost', 'Gönen', 'Keçiborlu', 'Merkez', 'Senirkent', 'Sütçüler', 'Şarkikaraağaç', 'Uluborlu', 'Yalvaç', 'Yenişarbademli'],
  'Mersin': ['Akdeniz', 'Anamur', 'Aydıncık', 'Bozyazı', 'Çamlıyayla', 'Erdemli', 'Gülnar', 'Mezitli', 'Mut', 'Silifke', 'Tarsus', 'Toroslar', 'Yenişehir'],
  'İstanbul': ['Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer', 'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu'],
  'İzmir': ['Aliağa', 'Balçova', 'Bayındır', 'Bayraklı', 'Bergama', 'Beydağ', 'Bornova', 'Buca', 'Çeşme', 'Çiğli', 'Dikili', 'Foça', 'Gaziemir', 'Güzelbahçe', 'Karabağlar', 'Karaburun', 'Karşıyaka', 'Kemalpaşa', 'Kınık', 'Kiraz', 'Konak', 'Menderes', 'Menemen', 'Narlıdere', 'Ödemiş', 'Seferihisar', 'Selçuk', 'Tire', 'Torbalı', 'Urla'],
  'Kars': ['Akyaka', 'Arpaçay', 'Digor', 'Kağızman', 'Merkez', 'Sarıkamış', 'Selim', 'Susuz'],
  'Kastamonu': ['Abana', 'Ağlı', 'Araç', 'Azdavay', 'Bozkurt', 'Cide', 'Çatalzeytin', 'Daday', 'Devrekani', 'Doğanyurt', 'Hanönü', 'İhsangazi', 'İnebolu', 'Küre', 'Merkez', 'Pınarbaşı', 'Seydiler', 'Şenpazar', 'Taşköprü', 'Tosya'],
  'Kayseri': ['Akkışla', 'Bünyan', 'Develi', 'Felahiye', 'Hacılar', 'İncesu', 'Kocasinan', 'Melikgazi', 'Özvatan', 'Pınarbaşı', 'Sarıoğlan', 'Sarız', 'Talas', 'Tomarza', 'Yahyalı', 'Yeşilhisar'],
  'Kırklareli': ['Babaeski', 'Demirköy', 'Kofçaz', 'Lüleburgaz', 'Merkez', 'Pehlivanköy', 'Pınarhisar', 'Vize'],
  'Kırşehir': ['Akçakent', 'Akpınar', 'Boztepe', 'Çiçekdağı', 'Kaman', 'Merkez', 'Mucur'],
  'Kocaeli': ['Başiskele', 'Çayırova', 'Darıca', 'Derince', 'Dilovası', 'Gebze', 'Gölcük', 'İzmit', 'Kandıra', 'Karamürsel', 'Kartepe', 'Körfez'],
  'Konya': ['Ahırlı', 'Akören', 'Akşehir', 'Altınekin', 'Beyşehir', 'Bozkır', 'Cihanbeyli', 'Çeltik', 'Çumra', 'Derbent', 'Derebucak', 'Doğanhisar', 'Emirgazi', 'Ereğli', 'Güneysınır', 'Hadim', 'Halkapınar', 'Hüyük', 'Ilgın', 'Kadınhanı', 'Karapınar', 'Karatay', 'Kulu', 'Meram', 'Sarayönü', 'Selçuklu', 'Seydişehir', 'Taşkent', 'Tuzlukçu', 'Yalıhüyük', 'Yunak'],
  'Kütahya': ['Altıntaş', 'Aslanapa', 'Çavdarhisar', 'Domaniç', 'Dumlupınar', 'Emet', 'Gediz', 'Hisarcık', 'Merkez', 'Pazarlar', 'Simav', 'Şaphane', 'Tavşanlı'],
  'Malatya': ['Akçadağ', 'Arapgir', 'Arguvan', 'Battalgazi', 'Darende', 'Doğanşehir', 'Doğanyol', 'Hekimhan', 'Kale', 'Kuluncak', 'Pütürge', 'Yazıhan', 'Yeşilyurt'],
  'Manisa': ['Ahmetli', 'Akhisar', 'Alaşehir', 'Demirci', 'Gölmarmara', 'Gördes', 'Kırkağaç', 'Köprübaşı', 'Kula', 'Salihli', 'Sarıgöl', 'Saruhanlı', 'Selendi', 'Soma', 'Şehzadeler', 'Turgutlu', 'Yunusemre'],
  'Kahramanmaraş': ['Afşin', 'Andırın', 'Çağlayancerit', 'Dulkadiroğlu', 'Ekinözü', 'Elbistan', 'Göksun', 'Nurhak', 'Onikişubat', 'Pazarcık', 'Türkoğlu'],
  'Mardin': ['Artuklu', 'Dargeçit', 'Derik', 'Kızıltepe', 'Mazıdağı', 'Midyat', 'Nusaybin', 'Ömerli', 'Savur', 'Yeşilli'],
  'Muğla': ['Bodrum', 'Dalaman', 'Datça', 'Fethiye', 'Kavaklıdere', 'Köyceğiz', 'Marmaris', 'Menteşe', 'Milas', 'Ortaca', 'Seydikemer', 'Ula', 'Yatağan'],
  'Muş': ['Bulanık', 'Hasköy', 'Korkut', 'Malazgirt', 'Merkez', 'Varto'],
  'Nevşehir': ['Acıgöl', 'Avanos', 'Derinkuyu', 'Gülşehir', 'Hacıbektaş', 'Kozaklı', 'Merkez', 'Ürgüp'],
  'Niğde': ['Altunhisar', 'Bor', 'Çamardı', 'Çiftlik', 'Merkez', 'Ulukışla'],
  'Ordu': ['Akkuş', 'Altınordu', 'Aybastı', 'Çamaş', 'Çatalpınar', 'Çaybaşı', 'Fatsa', 'Gölköy', 'Gülyalı', 'Gürgentepe', 'İkizce', 'Kabadüz', 'Kabataş', 'Korgan', 'Kumru', 'Mesudiye', 'Perşembe', 'Ulubey', 'Ünye'],
  'Rize': ['Ardeşen', 'Çamlıhemşin', 'Çayeli', 'Derepazarı', 'Fındıklı', 'Güneysu', 'Hemşin', 'İkizdere', 'İyidere', 'Kalkandere', 'Merkez', 'Pazar'],
  'Sakarya': ['Adapazarı', 'Akyazı', 'Arifiye', 'Erenler', 'Ferizli', 'Geyve', 'Hendek', 'Karapürçek', 'Karasu', 'Kaynarca', 'Kocaali', 'Pamukova', 'Sapanca', 'Serdivan', 'Söğütlü', 'Taraklı'],
  'Samsun': ['19 Mayıs', 'Alaçam', 'Asarcık', 'Atakum', 'Ayvacık', 'Bafra', 'Canik', 'Çarşamba', 'Havza', 'İlkadım', 'Kavak', 'Ladik', 'Salıpazarı', 'Tekkeköy', 'Terme', 'Vezirköprü', 'Yakakent'],
  'Siirt': ['Baykan', 'Eruh', 'Kurtalan', 'Merkez', 'Pervari', 'Şirvan', 'Tillo'],
  'Sinop': ['Ayancık', 'Boyabat', 'Dikmen', 'Durağan', 'Erfelek', 'Gerze', 'Merkez', 'Saraydüzü', 'Türkeli'],
  'Sivas': ['Akıncılar', 'Altınyayla', 'Divriği', 'Doğanşar', 'Gemerek', 'Gölova', 'Gürün', 'Hafik', 'İmranlı', 'Kangal', 'Koyulhisar', 'Merkez', 'Suşehri', 'Şarkışla', 'Ulaş', 'Yıldızeli', 'Zara'],
  'Tekirdağ': ['Çerkezköy', 'Çorlu', 'Ergene', 'Hayrabolu', 'Kapaklı', 'Malkara', 'Marmaraereğlisi', 'Muratlı', 'Saray', 'Süleymanpaşa', 'Şarköy'],
  'Tokat': ['Almus', 'Artova', 'Başçiftlik', 'Erbaa', 'Merkez', 'Niksar', 'Pazar', 'Reşadiye', 'Sulusaray', 'Turhal', 'Yeşilyurt', 'Zile'],
  'Trabzon': ['Akçaabat', 'Araklı', 'Arsin', 'Beşikdüzü', 'Çarşıbaşı', 'Çaykara', 'Dernekpazarı', 'Düzköy', 'Hayrat', 'Köprübaşı', 'Maçka', 'Of', 'Ortahisar', 'Sürmene', 'Şalpazarı', 'Tonya', 'Vakfıkebir', 'Yomra'],
  'Tunceli': ['Çemişgezek', 'Hozat', 'Mazgirt', 'Merkez', 'Nazımiye', 'Ovacık', 'Pertek', 'Pülümür'],
  'Şanlıurfa': ['Akçakale', 'Birecik', 'Bozova', 'Ceylanpınar', 'Eyyübiye', 'Halfeti', 'Haliliye', 'Harran', 'Hilvan', 'Karaköprü', 'Siverek', 'Suruç', 'Viranşehir'],
  'Uşak': ['Banaz', 'Eşme', 'Karahallı', 'Merkez', 'Sivaslı', 'Ulubey'],
  'Van': ['Bahçesaray', 'Başkale', 'Çaldıran', 'Çatak', 'Edremit', 'Erciş', 'Gevaş', 'Gürpınar', 'İpekyolu', 'Muradiye', 'Özalp', 'Saray', 'Tuşba'],
  'Yozgat': ['Akdağmadeni', 'Aydıncık', 'Boğazlıyan', 'Çandır', 'Çayıralan', 'Çekerek', 'Kadışehri', 'Merkez', 'Saraykent', 'Sarıkaya', 'Sorgun', 'Şefaatli', 'Yenifakılı', 'Yerköy'],
  'Zonguldak': ['Alaplı', 'Çaycuma', 'Devrek', 'Gökçebey', 'Karadeniz Ereğli', 'Kilimli', 'Kozlu', 'Merkez'],
  'Aksaray': ['Ağaçören', 'Eskil', 'Gülağaç', 'Güzelyurt', 'Merkez', 'Ortaköy', 'Sarıyahşi', 'Sultanhanı'],
  'Bayburt': ['Aydıntepe', 'Demirözü', 'Merkez'],
  'Karaman': ['Ayrancı', 'Başyayla', 'Ermenek', 'Kazımkarabekir', 'Merkez', 'Sarıveliler'],
  'Kırıkkale': ['Bahşılı', 'Balışeyh', 'Çelebi', 'Delice', 'Karakeçili', 'Keskin', 'Merkez', 'Sulakyurt', 'Yahşihan'],
  'Batman': ['Beşiri', 'Gercüş', 'Hasankeyf', 'Kozluk', 'Merkez', 'Sason'],
  'Şırnak': ['Beytüşşebap', 'Cizre', 'Güçlükonak', 'İdil', 'Merkez', 'Silopi', 'Uludere'],
  'Bartın': ['Amasra', 'Kurucaşile', 'Merkez', 'Ulus'],
  'Ardahan': ['Çıldır', 'Damal', 'Göle', 'Hanak', 'Merkez', 'Posof'],
  'Iğdır': ['Aralık', 'Karakoyunlu', 'Merkez', 'Tuzluca'],
  'Yalova': ['Altınova', 'Armutlu', 'Çınarcık', 'Çiftlikköy', 'Merkez', 'Termal'],
  'Karabük': ['Eflani', 'Eskipazar', 'Merkez', 'Ovacık', 'Safranbolu', 'Yenice'],
  'Kilis': ['Elbeyli', 'Merkez', 'Musabeyli', 'Polateli'],
  'Osmaniye': ['Bahçe', 'Düziçi', 'Hasanbeyli', 'Kadirli', 'Merkez', 'Sumbas', 'Toprakkale'],
  'Düzce': ['Akçakoca', 'Cumayeri', 'Çilimli', 'Gölyaka', 'Gümüşova', 'Kaynaşlı', 'Merkez', 'Yığılca']
};

class MarketplaceApp {
  constructor() {
    this.token = localStorage.getItem('alsat_token') || null;
    this.currentUser = JSON.parse(localStorage.getItem('alsat_user') || 'null');
    
    this.categories = [];
    this.products = [];
    this.demoUsers = [];
    
    this.selectedCategory = null;
    this.searchQuery = '';
    this.filters = {
      city: '',
      condition: '',
      minPrice: null,
      maxPrice: null,
      sort: 'newest'
    };

    this.currentDetailProduct = null;
    this.selectedFiles = [];
    this.selectedPresetUrls = [];
    this.activeChatContext = null;
    this.chatPollingInterval = null;
    this.currentCityRegion = 'all';
    this.searchSuggestionsTimeout = null;
    this.selectedSuggestionIndex = -1;

    // Email OTP Verification State
    this.pendingRegistration = null;
    this.verifyCountdownInterval = null;
    this.resendCooldownInterval = null;
    this.resendCooldownSeconds = 0;

    // Modal Navigation & History Tracking
    this.chatReturnTarget = null;
    this.productDetailReturnTarget = null;
    this.newProductReturnTarget = null;
    this.authReturnAction = null;
    this.suppressChatReturn = false;
    this.suppressProductDetailReturn = false;

    this.init();
  }

  async init() {
    this.initTheme();
    this.setupDialogLightDismiss();
    this.initCitySelector();
    this.initSearchSuggestions();
    this.initNewProductCitySelect();
    this.initRegCitySelect();
    this.initEditProfCitySelect();
    this.initOtpInputs();
    this.checkCloudflareStatus();
    this.updateAuthUI();
    await this.fetchDemoUsers();
    await this.fetchCategories();
    await this.fetchStats();
    await this.fetchProducts();

    // Live sync notification badges periodically every 5 seconds
    setInterval(() => {
      if (this.currentUser && this.token) {
        this.updateHeaderBadges();
      }
    }, 5000);
  }

  /* ==========================================================================
     THEME MANAGEMENT (DARK & LIGHT MODE / MOR DALGALAR)
     ========================================================================== */
  initTheme() {
    // Sitenin varsayılanı Aydınlık (light) mod olarak başlar; kullanıcının seçimi hatırlanır
    const savedTheme = localStorage.getItem('sellzone_theme') || 'light';
    this.applyTheme(savedTheme, false);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(nextTheme, true);
  }

  applyTheme(theme, showNotification = false) {
    this.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sellzone_theme', theme);

    // Meta color-scheme güncelle
    const metaScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaScheme) {
      metaScheme.setAttribute('content', theme);
    }

    // Toggle butonunun ikon ve tooltip bilgilerini güncelle
    const toggleBtn = document.getElementById('themeToggleBtn');
    const toggleIcon = document.getElementById('themeToggleIcon');
    if (toggleBtn && toggleIcon) {
      if (theme === 'light') {
        toggleIcon.className = 'fa-solid fa-sun';
        toggleBtn.title = 'Karanlık Moda Geç';
        toggleBtn.setAttribute('aria-label', 'Karanlık Moda Geç');
      } else {
        toggleIcon.className = 'fa-solid fa-moon';
        toggleBtn.title = 'Aydınlık Moda Geç';
        toggleBtn.setAttribute('aria-label', 'Aydınlık Moda Geç');
      }
    }

    // Cloudflare Turnstile bileşeninin temasını güncelle
    const cfWidgets = document.querySelectorAll('.cf-turnstile');
    cfWidgets.forEach(widget => {
      widget.setAttribute('data-theme', theme);
    });

    if (showNotification) {
      const modeName = theme === 'light' ? 'Aydınlık Mod' : 'Karanlık Mod';
      this.showToast(`${modeName} aktif edildi`, 'info');
    }
  }

  /* ==========================================================================
     LIGHT-DISMISS FOR NATIVE DIALOGS
     ========================================================================== */
  setupDialogLightDismiss() {
    const dialogs = document.querySelectorAll('dialog.app-dialog');
    dialogs.forEach(dialog => {
      dialog.addEventListener('click', (event) => {
        // Ignore synthetic keyboard submit clicks (e.g. pressing Enter in form)
        if (event.detail === 0 || (event.clientX === 0 && event.clientY === 0)) {
          return;
        }

        const content = dialog.querySelector('.dialog-content');
        // If click originated from within the dialog content, do NOT close
        if (content && content.contains(event.target)) {
          return;
        }

        // Only close if user clicked the backdrop outside dialog-content
        if (event.target === dialog) {
          dialog.close();
          if (dialog.id === 'chatModal' && this.chatPollingInterval) {
            clearInterval(this.chatPollingInterval);
            this.chatPollingInterval = null;
          }
        }
      });

      // Dialog kapandığında (ESC, backdrop veya programatik close çağrısı)
      dialog.addEventListener('close', () => {
        if (dialog.id === 'authModal') {
          this.resetAuthForms();
        } else if (dialog.id === 'chatModal') {
          this.handleChatModalClosed();
        } else if (dialog.id === 'productDetailModal') {
          this.handleProductDetailModalClosed();
        } else if (dialog.id === 'newProductModal') {
          this.handleNewProductModalClosed();
        }
      });
    });
  }

  /* ==========================================================================
     AUTH & USER SESSION
     ========================================================================== */
  updateAuthUI() {
    const container = document.getElementById('authActionsContainer');
    if (!container) return;

    if (this.currentUser) {
      container.innerHTML = `
        <div class="user-profile-header-pill" onclick="app.openProfileOrLoginModal()" title="Hesabım & Profilim">
          <img src="${this.currentUser.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(this.currentUser.name)}" alt="${this.escapeHtml(this.currentUser.name)}" class="user-avatar-small">
          <span class="header-user-name">${this.escapeHtml(this.currentUser.name.split(' ')[0])}</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
      `;
      this.updateHeaderBadges();
    } else {
      container.innerHTML = `
        <button class="btn btn-header-login" onclick="app.openAuthModal('login')">
          <i class="fa-solid fa-arrow-right-to-bracket"></i>
          <span>Giriş Yap</span>
        </button>
      `;
      const favBadge = document.getElementById('headerFavBadge');
      const msgBadge = document.getElementById('headerMsgBadge');
      const mobileFavBadge = document.getElementById('mobileFavBadge');
      const mobileMsgBadge = document.getElementById('mobileMsgBadge');
      if (favBadge) favBadge.style.display = 'none';
      if (msgBadge) msgBadge.style.display = 'none';
      if (mobileFavBadge) mobileFavBadge.style.display = 'none';
      if (mobileMsgBadge) mobileMsgBadge.style.display = 'none';
    }
  }

  async updateHeaderBadges() {
    const favBadge = document.getElementById('headerFavBadge');
    const msgBadge = document.getElementById('headerMsgBadge');
    const mobileFavBadge = document.getElementById('mobileFavBadge');
    const mobileMsgBadge = document.getElementById('mobileMsgBadge');

    if (!this.currentUser || !this.token) {
      if (favBadge) favBadge.style.display = 'none';
      if (msgBadge) msgBadge.style.display = 'none';
      if (mobileFavBadge) mobileFavBadge.style.display = 'none';
      if (mobileMsgBadge) mobileMsgBadge.style.display = 'none';
      return;
    }

    try {
      // 1. Favoriler sayısı
      const favRes = await fetch('/api/favorites', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      if (favRes.ok) {
        const favs = await favRes.json();
        const count = Array.isArray(favs) ? favs.length : 0;
        if (favBadge) {
          favBadge.textContent = count;
          favBadge.style.display = count > 0 ? 'flex' : 'none';
        }
        if (mobileFavBadge) {
          mobileFavBadge.textContent = count;
          mobileFavBadge.style.display = count > 0 ? 'flex' : 'none';
        }
      }

      // 2. Okunmamış mesaj sayısı
      const unreadRes = await fetch('/api/messages/unread-count', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      if (unreadRes.ok) {
        const data = await unreadRes.json();
        const count = Number(data.unreadCount) || 0;

        if (msgBadge) {
          msgBadge.textContent = count;
          msgBadge.style.display = count > 0 ? 'flex' : 'none';
        }
        if (mobileMsgBadge) {
          mobileMsgBadge.textContent = count;
          mobileMsgBadge.style.display = count > 0 ? 'flex' : 'none';
        }
      }
    } catch (err) {
      console.warn('Header badge bildirim kontrolü:', err);
    }
  }

  async fetchDemoUsers() {
    this.demoUsers = [];
  }

  async quickLogin(userId) {
    try {
      const res = await fetch('/api/auth/quick-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      this.token = data.token;
      this.currentUser = data.user;
      localStorage.setItem('alsat_token', this.token);
      localStorage.setItem('alsat_user', JSON.stringify(this.currentUser));

      this.completeLoginSuccess(`Hoş geldin, ${this.currentUser.name}!`);
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  completeLoginSuccess(welcomeMessage = 'Giriş başarılı!') {
    this.updateAuthUI();
    this.closeAuthModal();
    this.showToast(welcomeMessage, 'success');
    this.fetchProducts();

    const postAction = this.authReturnAction;
    this.authReturnAction = null;
    if (postAction === 'messages') {
      setTimeout(() => this.openMessagesModal(), 150);
    } else if (postAction === 'favorites') {
      setTimeout(() => this.openFavoritesModal(), 150);
    } else if (postAction === 'newProduct') {
      setTimeout(() => this.openNewProductModal(), 150);
    } else if (postAction === 'profile') {
      setTimeout(() => this.openProfileOrLoginModal(), 150);
    } else if (postAction && postAction.type === 'chat' && postAction.productId) {
      setTimeout(() => this.openProductDetails(postAction.productId), 150);
    } else if (postAction && postAction.type === 'favorite' && postAction.productId) {
      this.toggleFavorite(postAction.productId);
    }
  }

  getTurnstileToken(formId) {
    const form = document.getElementById(formId);
    if (!form) return '';
    const input = form.querySelector('[name="cf-turnstile-response"]');
    if (input && input.value) return input.value;
    if (window.turnstile && typeof window.turnstile.getResponse === 'function') {
      try {
        return window.turnstile.getResponse() || '';
      } catch (e) {
        return '';
      }
    }
    return '';
  }

  resetTurnstile() {
    if (window.turnstile && typeof window.turnstile.reset === 'function') {
      try {
        window.turnstile.reset();
      } catch (e) {}
    }
  }

  async checkCloudflareStatus() {
    try {
      const res = await fetch('/api/cf-status');
      if (!res.ok) return;
      const data = await res.json();
      const statusText = document.getElementById('cfStatusText');
      if (statusText) {
        if (data.isProxiedByCloudflare) {
          statusText.textContent = `Cloudflare Korumalı Ağ • ${data.country || 'Global'} (${data.rayId ? data.rayId.slice(0, 8) : 'WAF'})`;
        } else {
          statusText.textContent = `Cloudflare WAF & DDoS Koruması Aktif`;
        }
      }
    } catch (e) {
      // silently ignore
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const turnstileToken = this.getTurnstileToken('loginForm');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, turnstileToken })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      this.token = data.token;
      this.currentUser = data.user;
      localStorage.setItem('alsat_token', this.token);
      localStorage.setItem('alsat_user', JSON.stringify(this.currentUser));

      this.completeLoginSuccess('Giriş başarılı!');
    } catch (err) {
      this.resetTurnstile();
      this.showToast(err.message, 'error');
    }
  }

  initOtpInputs() {
    const boxes = document.querySelectorAll('.otp-box');
    boxes.forEach((box, idx) => {
      box.addEventListener('input', (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        e.target.value = val ? val.slice(-1) : '';

        if (e.target.value) {
          e.target.classList.add('filled');
          if (idx < boxes.length - 1) {
            boxes[idx + 1].focus();
            boxes[idx + 1].select();
          }
        } else {
          e.target.classList.remove('filled');
        }

        const fullCode = Array.from(boxes).map(b => b.value.trim()).join('');
        if (fullCode.length === 6) {
          this.submitEmailVerification();
        }
      });

      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          if (!box.value && idx > 0) {
            boxes[idx - 1].focus();
            boxes[idx - 1].value = '';
            boxes[idx - 1].classList.remove('filled');
          } else {
            box.value = '';
            box.classList.remove('filled');
          }
        } else if (e.key === 'ArrowLeft' && idx > 0) {
          boxes[idx - 1].focus();
        } else if (e.key === 'ArrowRight' && idx < boxes.length - 1) {
          boxes[idx + 1].focus();
        }
      });

      box.addEventListener('paste', (e) => {
        e.preventDefault();
        const pasteData = (e.clipboardData || window.clipboardData).getData('text');
        const digits = pasteData.replace(/\D/g, '').slice(0, 6);
        if (!digits) return;

        digits.split('').forEach((d, i) => {
          if (boxes[i]) {
            boxes[i].value = d;
            boxes[i].classList.add('filled');
          }
        });

        const nextIdx = Math.min(digits.length, boxes.length - 1);
        if (boxes[nextIdx]) boxes[nextIdx].focus();

        if (digits.length === 6) {
          this.submitEmailVerification();
        }
      });
    });
  }

  async handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const phone = document.getElementById('regPhone').value.trim();
    const selectedCity = (document.getElementById('regCity')?.value || '').trim();
    const selectedDistrict = (document.getElementById('regDistrict')?.value || '').trim();
    const turnstileToken = this.getTurnstileToken('registerForm');
    const submitBtn = document.getElementById('btnRegisterSubmit');

    if (!name) {
      this.showToast('Lütfen ad ve soyadınızı giriniz.', 'warning');
      return;
    }
    if (!email || !email.includes('@')) {
      this.showToast('Lütfen geçerli bir e-posta adresi giriniz.', 'warning');
      return;
    }
    if (!selectedCity) {
      this.showToast('Lütfen yaşadığınız ili seçiniz.', 'warning');
      return;
    }
    if (!selectedDistrict) {
      this.showToast('Lütfen yaşadığınız ilçeyi seçiniz.', 'warning');
      return;
    }
    if (!password || password.length < 6) {
      this.showToast('Şifreniz en az 6 karakter olmalıdır.', 'warning');
      return;
    }

    const city = `${selectedCity}, ${selectedDistrict}`;

    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Doğrulama Kodu Gönder';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Kod Gönderiliyor...';
    }

    try {
      const res = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone, city, turnstileToken })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Save pending registration details
      this.pendingRegistration = { name, email, password, phone, city };

      // Switch view to OTP verification
      this.showVerificationView(email, data.devCode);
      this.showToast(data.message || `${email} adresine doğrulama kodu gönderildi.`, 'info');
    } catch (err) {
      this.resetTurnstile();
      this.showToast(err.message, 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    }
  }

  showVerificationView(email) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const verifyView = document.getElementById('emailVerifyView');
    const targetEmailSpan = document.getElementById('verifyTargetEmail');
    const authTabs = document.querySelector('.auth-tabs');

    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'none';
    if (authTabs) authTabs.style.display = 'none';

    if (targetEmailSpan) targetEmailSpan.textContent = email;
    if (verifyView) verifyView.style.display = 'block';

    // Reset OTP boxes
    const boxes = document.querySelectorAll('.otp-box');
    boxes.forEach(b => {
      b.value = '';
      b.classList.remove('filled');
      b.style.borderColor = '';
    });

    if (verifyView) verifyView.style.display = 'flex';

    // Start 10-minute expiry countdown
    this.startVerifyCountdown(600);

    // Start 60-second resend cooldown
    this.startResendCooldown(60);

    // Auto focus first box
    setTimeout(() => {
      if (boxes[0]) boxes[0].focus();
    }, 120);
  }

  startVerifyCountdown(seconds) {
    if (this.verifyCountdownInterval) {
      clearInterval(this.verifyCountdownInterval);
    }

    let remaining = seconds;
    const countdownEl = document.getElementById('verifyCountdown');

    const updateDisplay = () => {
      const mins = Math.floor(remaining / 60).toString().padStart(2, '0');
      const secs = (remaining % 60).toString().padStart(2, '0');
      if (countdownEl) {
        countdownEl.textContent = `${mins}:${secs}`;
      }
    };

    updateDisplay();

    this.verifyCountdownInterval = setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        clearInterval(this.verifyCountdownInterval);
        if (countdownEl) countdownEl.textContent = 'Süresi Doldu';
        this.showToast('Doğrulama kodunun süresi doldu. Lütfen tekrar kod isteyiniz.', 'warning');
      } else {
        updateDisplay();
      }
    }, 1000);
  }

  startResendCooldown(seconds) {
    if (this.resendCooldownInterval) {
      clearInterval(this.resendCooldownInterval);
    }

    this.resendCooldownSeconds = seconds;
    const resendBtn = document.getElementById('btnResendCode');
    const timerText = document.getElementById('resendTimerText');

    if (resendBtn) resendBtn.disabled = true;

    this.resendCooldownInterval = setInterval(() => {
      this.resendCooldownSeconds--;
      if (this.resendCooldownSeconds <= 0) {
        clearInterval(this.resendCooldownInterval);
        if (resendBtn) resendBtn.disabled = false;
        if (timerText) timerText.textContent = '';
      } else {
        if (timerText) timerText.textContent = `(${this.resendCooldownSeconds}s)`;
      }
    }, 1000);
  }

  async resendVerificationCode() {
    if (this.resendCooldownSeconds > 0) return;
    if (!this.pendingRegistration || !this.pendingRegistration.email) {
      this.showToast('Kayıt bilgisi bulunamadı. Lütfen formu tekrar doldurun.', 'error');
      this.backToRegisterForm();
      return;
    }

    const resendBtn = document.getElementById('btnResendCode');
    if (resendBtn) {
      resendBtn.disabled = true;
      resendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Gönderiliyor...';
    }

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.pendingRegistration.email,
          name: this.pendingRegistration.name
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.devCode) {
        const devBanner = document.getElementById('devCodeBanner');
        const devVal = document.getElementById('devCodeValue');
        if (devBanner) devBanner.style.display = 'block';
        if (devVal) devVal.textContent = data.devCode;
      }

      // Clear boxes
      const boxes = document.querySelectorAll('.otp-box');
      boxes.forEach(b => {
        b.value = '';
        b.classList.remove('filled');
      });
      if (boxes[0]) boxes[0].focus();

      this.startVerifyCountdown(600);
      this.startResendCooldown(60);
      this.showToast(data.message || 'Yeni doğrulama kodu gönderildi.', 'success');
    } catch (err) {
      this.showToast(err.message, 'error');
    } finally {
      if (resendBtn) {
        resendBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Kodu Tekrar Gönder <span id="resendTimerText"></span>';
      }
    }
  }

  backToRegisterForm() {
    if (this.verifyCountdownInterval) clearInterval(this.verifyCountdownInterval);
    if (this.resendCooldownInterval) clearInterval(this.resendCooldownInterval);

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authTabs = document.querySelector('.auth-tabs');
    const tabRegisterBtn = document.getElementById('tabRegisterBtn');
    const tabLoginBtn = document.getElementById('tabLoginBtn');

    if (verifyView) verifyView.style.display = 'none';
    if (authTabs) authTabs.style.display = 'flex';
    if (loginForm) loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'block';

    if (tabRegisterBtn) tabRegisterBtn.classList.add('active');
    if (tabLoginBtn) tabLoginBtn.classList.remove('active');
  }

  async submitEmailVerification() {
    if (!this.pendingRegistration || !this.pendingRegistration.email) {
      this.showToast('Doğrulama oturumu bulunamadı. Lütfen tekrar deneyin.', 'error');
      this.backToRegisterForm();
      return;
    }

    const boxes = document.querySelectorAll('.otp-box');
    const code = Array.from(boxes).map(b => b.value.trim()).join('');

    if (code.length !== 6) {
      this.showToast('Lütfen 6 haneli doğrulama kodunu eksiksiz giriniz.', 'warning');
      const emptyBox = Array.from(boxes).find(b => !b.value);
      if (emptyBox) emptyBox.focus();
      return;
    }

    const verifyBtn = document.getElementById('btnVerifySubmit');
    const originalBtnText = verifyBtn ? verifyBtn.innerHTML : 'Doğrula ve Hesabı Aç';
    if (verifyBtn) {
      verifyBtn.disabled = true;
      verifyBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Doğrulanıyor...';
    }

    try {
      const res = await fetch('/api/auth/verify-and-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.pendingRegistration.email,
          code: code,
          name: this.pendingRegistration.name,
          password: this.pendingRegistration.password,
          phone: this.pendingRegistration.phone,
          city: this.pendingRegistration.city
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (this.verifyCountdownInterval) clearInterval(this.verifyCountdownInterval);
      if (this.resendCooldownInterval) clearInterval(this.resendCooldownInterval);

      this.token = data.token;
      this.currentUser = data.user;
      localStorage.setItem('alsat_token', this.token);
      localStorage.setItem('alsat_user', JSON.stringify(this.currentUser));
      this.pendingRegistration = null;

      this.completeLoginSuccess('🎉 Tebrikler! E-posta adresiniz doğrulandı ve hesabınız açıldı!');
    } catch (err) {
      this.showToast(err.message, 'error');
      boxes.forEach(b => {
        b.style.borderColor = '#ef4444';
        setTimeout(() => { b.style.borderColor = ''; }, 2000);
      });
    } finally {
      if (verifyBtn) {
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = originalBtnText;
      }
    }
  }

  logout() {
    this.token = null;
    this.currentUser = null;
    localStorage.removeItem('alsat_token');
    localStorage.removeItem('alsat_user');
    this.updateAuthUI();
    this.closeProfileDrawer();
    this.showToast('Çıkış yapıldı.', 'info');
    this.fetchProducts();
  }

  /* ==========================================================================
     AUTH MODAL STATE & FORM RESET
     ========================================================================== */
  resetAuthForms() {
    // 1. Giriş ve Kayıt formlarını sıfırla
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    if (loginForm) loginForm.reset();
    if (registerForm) registerForm.reset();

    // 2. İlçe dropdown'ını ve il seçimini temizle
    const regDistrict = document.getElementById('regDistrict');
    if (regDistrict) {
      regDistrict.innerHTML = '<option value="">Önce İl Seçiniz</option>';
      regDistrict.disabled = true;
      regDistrict.value = '';
    }

    const regCity = document.getElementById('regCity');
    if (regCity) {
      regCity.value = '';
    }

    // 3. Şifre alanlarının görünürlüğünü gizle (varsayılan password tipine getir)
    ['loginPassword', 'regPassword'].forEach(id => {
      const input = document.getElementById(id);
      if (input) input.type = 'password';
      const wrapper = input ? input.closest('.password-input-wrapper') : null;
      if (wrapper) {
        const icon = wrapper.querySelector('.password-toggle-btn i');
        const btn = wrapper.querySelector('.password-toggle-btn');
        if (icon) icon.className = 'fa-solid fa-eye';
        if (btn) btn.setAttribute('title', 'Şifreyi Göster');
      }
    });

    // 4. Sayaç ve doğrulama durumunu temizle
    if (this.verifyCountdownInterval) {
      clearInterval(this.verifyCountdownInterval);
      this.verifyCountdownInterval = null;
    }
    if (this.resendCooldownInterval) {
      clearInterval(this.resendCooldownInterval);
      this.resendCooldownInterval = null;
    }
    this.pendingRegistration = null;

    // 5. OTP kutucuklarını temizle
    const otpBoxes = document.querySelectorAll('.otp-box');
    otpBoxes.forEach(b => {
      b.value = '';
      b.classList.remove('filled');
      b.style.borderColor = '';
    });

    const verifyView = document.getElementById('emailVerifyView');
    if (verifyView) verifyView.style.display = 'none';

    const devBanner = document.getElementById('devCodeBanner');
    if (devBanner) devBanner.style.display = 'none';

    // 6. Buton durumlarını ve metinlerini sıfırla
    const submitBtn = document.getElementById('btnRegisterSubmit');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Doğrulama Kodu Gönder';
    }

    const verifyBtn = document.getElementById('btnVerifySubmit');
    if (verifyBtn) {
      verifyBtn.disabled = false;
      verifyBtn.innerHTML = 'Doğrula ve Hesabı Aç';
    }

    // 7. Sekmeleri görünür kıl
    const authTabs = document.querySelector('.auth-tabs');
    if (authTabs) authTabs.style.display = 'flex';

    // 8. Turnstile doğrulamalarını sıfırla
    this.resetTurnstile();
  }

  openAuthModal(tab = 'login', returnAction = null) {
    if (returnAction !== null && returnAction !== undefined) {
      this.authReturnAction = returnAction;
    }
    this.resetAuthForms();
    this.switchAuthTab(tab);
    const modal = document.getElementById('authModal');
    if (modal) modal.showModal();
  }

  closeAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.close();
    this.resetAuthForms();
  }

  switchAuthTab(tab) {
    this.resetAuthForms();

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabRegisterBtn = document.getElementById('tabRegisterBtn');

    if (tab === 'login') {
      if (loginForm) loginForm.style.display = 'block';
      if (registerForm) registerForm.style.display = 'none';
      if (tabLoginBtn) tabLoginBtn.classList.add('active');
      if (tabRegisterBtn) tabRegisterBtn.classList.remove('active');
    } else {
      if (loginForm) loginForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'block';
      if (tabRegisterBtn) tabRegisterBtn.classList.add('active');
      if (tabLoginBtn) tabLoginBtn.classList.remove('active');
      this.initRegCitySelect();
    }
  }

  togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';

    const icon = btn ? btn.querySelector('i') : null;
    if (icon) {
      if (isPassword) {
        icon.className = 'fa-solid fa-eye-slash';
        btn.setAttribute('title', 'Şifreyi Gizle');
      } else {
        icon.className = 'fa-solid fa-eye';
        btn.setAttribute('title', 'Şifreyi Göster');
      }
    }
  }

  /* ==========================================================================
     CATEGORIES & STATS
     ========================================================================== */
  async fetchCategories() {
    try {
      const res = await fetch('/api/categories');
      this.categories = await res.json();

      const container = document.getElementById('categoriesContainer');
      const select = document.getElementById('newProdCategory');

      if (container) {
        container.innerHTML = this.categories.map(c => `
          <div class="category-card ${this.selectedCategory === c.id ? 'active' : ''}" 
               onclick="app.selectCategory('${c.id}')" data-cat="${c.id}">
            <div class="category-icon-box" style="color: ${c.color}; background: ${c.color}15;">
              <i class="fa-solid ${c.icon}"></i>
            </div>
            <span class="category-name">${c.name}</span>
            <span class="category-badge">${c.product_count} ilan</span>
          </div>
        `).join('');
      }

      if (select) {
        select.innerHTML = this.categories.map(c => `
          <option value="${c.id}">${c.name}</option>
        `).join('');
      }
    } catch (err) {
      console.error('Kategori yükleme hatası:', err);
    }
  }

  async fetchStats() {
    try {
      const res = await fetch('/api/stats');
      const stats = await res.json();

      const elProducts = document.getElementById('statProducts');
      const elUsers = document.getElementById('statUsers');
      const elMessages = document.getElementById('statMessages');
      const elCities = document.getElementById('statCities');

      if (elProducts) elProducts.textContent = (stats.activeProducts ?? '0') + '+';
      if (elUsers) elUsers.textContent = (stats.totalUsers ?? '0') + '+';
      if (elMessages) elMessages.textContent = (stats.totalMessages ?? '0') + '+';
      if (elCities) elCities.textContent = (stats.citiesCount || '5');
    } catch (err) {
      console.error('Stats error:', err);
    }
  }

  selectCategory(categoryId) {
    if (this.selectedCategory === categoryId) {
      this.selectedCategory = null; // Toggle off
    } else {
      this.selectedCategory = categoryId;
    }

    // Update active class on category cards
    document.querySelectorAll('.category-card').forEach(card => {
      card.classList.toggle('active', card.getAttribute('data-cat') === this.selectedCategory);
    });

    this.applyFilters();
  }

  /* ==========================================================================
     PRODUCTS / LISTINGS
     ========================================================================== */
  async fetchProducts() {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    const countBadge = document.getElementById('listingsCount');
    const titleEl = document.getElementById('listingsTitle');

    // Build query params
    const params = new URLSearchParams();
    if (this.searchQuery) params.append('q', this.searchQuery);
    if (this.selectedCategory) params.append('category', this.selectedCategory);
    if (this.filters.city) params.append('city', this.filters.city);
    if (this.filters.condition) params.append('condition', this.filters.condition);
    if (this.filters.minPrice) params.append('minPrice', this.filters.minPrice);
    if (this.filters.maxPrice) params.append('maxPrice', this.filters.maxPrice);
    if (this.filters.sort) params.append('sort', this.filters.sort);

    try {
      const headers = {};
      if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

      const res = await fetch(`/api/products?${params.toString()}`, { headers });
      this.products = await res.json();

      countBadge.textContent = `${this.products.length} ilan bulundu`;

      if (this.selectedCategory) {
        const catObj = this.categories.find(c => c.id === this.selectedCategory);
        titleEl.textContent = catObj ? `${catObj.name} İlanları` : 'İlanlar';
      } else if (this.searchQuery) {
        titleEl.textContent = `"${this.searchQuery}" için Sonuçlar`;
      } else {
        titleEl.textContent = 'Tüm İlanlar';
      }

      this.renderActiveFilterTags();

      if (this.products.length === 0) {
        grid.innerHTML = '';
        emptyState.style.display = 'block';
      } else {
        emptyState.style.display = 'none';
        grid.innerHTML = this.products.map(p => this.renderProductCardHtml(p)).join('');
      }

      this.updateHeaderBadges();
    } catch (err) {
      console.error('Ürünler çekilemedi:', err);
    }
  }

  renderProductCardHtml(p, origin = '') {
    const mainImg = p.images && p.images[0] ? p.images[0] : 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600';
    const formattedPrice = Number(p.price).toLocaleString('tr-TR');
    const isFav = Boolean(p.is_favorite);
    const isSold = p.status === 'sold';
    const originParam = origin ? `, '${origin}'` : '';

    return `
      <article class="product-card" onclick="app.openProductDetails(${p.id}${originParam})">
        <div class="product-card-img-wrap">
          <img src="${mainImg}" alt="${this.escapeHtml(p.title)}" loading="lazy">
          <span class="card-condition-pill">${p.condition}</span>
          <button class="card-fav-btn ${isFav ? 'active' : ''}" 
                  onclick="app.toggleFavorite(${p.id}, event)" title="Favorilere Ekle">
            <i class="fa-solid fa-heart"></i>
          </button>
          ${isSold ? '<div class="sold-badge-overlay"><i class="fa-solid fa-circle-check"></i> SATILDI</div>' : ''}
        </div>
        <div class="product-card-body">
          <div class="card-price-row">
            <span class="card-price">${formattedPrice} ₺</span>
          </div>
          <h3 class="card-title">${this.escapeHtml(p.title)}</h3>
          <div class="card-location-row">
            <span class="card-location"><i class="fa-solid fa-location-dot"></i> ${this.escapeHtml(p.location)}</span>
            <span class="card-date">${this.formatDate(p.created_at)}</span>
          </div>
        </div>
      </article>
    `;
  }

  renderActiveFilterTags() {
    const container = document.getElementById('activeFilterTags');
    const tags = [];

    if (this.selectedCategory) {
      const cat = this.categories.find(c => c.id === this.selectedCategory);
      if (cat) tags.push({ label: `Kategori: ${cat.name}`, clear: () => this.selectCategory(null) });
    }
    if (this.filters.city) {
      tags.push({ label: `Şehir: ${this.filters.city}`, clear: () => { document.getElementById('locationFilter').value = ''; this.handleFilterChange(); } });
    }
    if (this.filters.condition) {
      tags.push({ label: `Durum: ${this.filters.condition}`, clear: () => { document.getElementById('conditionFilter').value = ''; this.handleFilterChange(); } });
    }
    if (this.filters.minPrice || this.filters.maxPrice) {
      tags.push({ label: `Fiyat: ${this.filters.minPrice || '0'} - ${this.filters.maxPrice || '∞'} ₺`, clear: () => this.clearPriceFilter() });
    }

    if (tags.length > 0) {
      container.style.display = 'flex';
      container.innerHTML = tags.map((t, idx) => `
        <span class="filter-tag">
          ${t.label}
          <i class="fa-solid fa-xmark" onclick="app.clearTag(${idx})"></i>
        </span>
      `).join('');
      this._activeTags = tags;
    } else {
      container.style.display = 'none';
      this._activeTags = [];
    }
  }

  clearTag(index) {
    if (this._activeTags && this._activeTags[index]) {
      this._activeTags[index].clear();
    }
  }

  /* ==========================================================================
     LIVE SEARCH SUGGESTIONS & AUTOCOMPLETE (EN YAKIN SEÇENEKLER)
     ========================================================================== */

  initSearchSuggestions() {
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('searchSuggestionsDropdown');
      const searchWrap = document.querySelector('.search-input-wrap');
      if (dropdown && dropdown.style.display !== 'none' && dropdown.classList.contains('show')) {
        if (!dropdown.contains(e.target) && (!searchWrap || !searchWrap.contains(e.target))) {
          this.closeSearchSuggestions();
        }
      }
    });
  }

  handleSearchInput(event) {
    const val = event.target ? event.target.value : '';
    const clearBtn = document.getElementById('searchClearBtn');
    if (clearBtn) {
      clearBtn.style.display = val ? 'flex' : 'none';
    }

    if (this.searchSuggestionsTimeout) {
      clearTimeout(this.searchSuggestionsTimeout);
    }

    this.searchSuggestionsTimeout = setTimeout(() => {
      this.fetchAndRenderSuggestions(val);
    }, 120);
  }

  handleSearchInputFocus() {
    const searchInput = document.getElementById('searchInput');
    const val = searchInput ? searchInput.value : '';
    const clearBtn = document.getElementById('searchClearBtn');
    if (clearBtn) {
      clearBtn.style.display = val ? 'flex' : 'none';
    }
    this.closeCityDropdown();
    this.fetchAndRenderSuggestions(val);
  }

  handleSearchKeyDown(event) {
    const dropdown = document.getElementById('searchSuggestionsDropdown');
    const isVisible = dropdown && dropdown.style.display !== 'none' && dropdown.classList.contains('show');

    if (event.key === 'ArrowDown') {
      if (!isVisible) {
        this.fetchAndRenderSuggestions(event.target.value);
        return;
      }
      event.preventDefault();
      const items = dropdown.querySelectorAll('.suggestion-nav-item');
      if (items.length === 0) return;
      this.selectedSuggestionIndex = (this.selectedSuggestionIndex + 1) % items.length;
      items.forEach((item, idx) => {
        if (idx === this.selectedSuggestionIndex) {
          item.classList.add('selected');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('selected');
        }
      });
      return;
    }

    if (event.key === 'ArrowUp') {
      if (!isVisible) return;
      event.preventDefault();
      const items = dropdown.querySelectorAll('.suggestion-nav-item');
      if (items.length === 0) return;
      this.selectedSuggestionIndex = (this.selectedSuggestionIndex - 1 + items.length) % items.length;
      items.forEach((item, idx) => {
        if (idx === this.selectedSuggestionIndex) {
          item.classList.add('selected');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('selected');
        }
      });
      return;
    }

    if (event.key === 'Enter') {
      if (isVisible && this.selectedSuggestionIndex >= 0) {
        event.preventDefault();
        const items = dropdown.querySelectorAll('.suggestion-nav-item');
        if (items[this.selectedSuggestionIndex]) {
          items[this.selectedSuggestionIndex].click();
          return;
        }
      }
      this.closeSearchSuggestions();
      this.applyFilters();
      return;
    }

    if (event.key === 'Escape') {
      this.closeSearchSuggestions();
      return;
    }
  }

  async fetchAndRenderSuggestions(query) {
    const trimmed = (query || '').trim();
    this.selectedSuggestionIndex = -1;

    // 1. Fast instant local matching
    if (trimmed && this.products && this.products.length > 0) {
      const qNorm = this.normalizeTurkish(trimmed);
      const localMatches = this.products.filter(p => {
        const titleNorm = this.normalizeTurkish(p.title);
        const descNorm = this.normalizeTurkish(p.description || '');
        return titleNorm.includes(qNorm) || descNorm.includes(qNorm);
      }).slice(0, 6);

      const localCategories = (this.categories || []).filter(c => {
        return this.normalizeTurkish(c.name).includes(qNorm);
      }).slice(0, 3);

      if (localMatches.length > 0 || localCategories.length > 0) {
        this.renderSuggestionsContent({
          products: localMatches,
          categories: localCategories,
          totalCount: localMatches.length
        }, trimmed);
      }
    }

    // 2. Fetch server suggestions for complete data
    try {
      const url = trimmed 
        ? `/api/search/suggestions?q=${encodeURIComponent(trimmed)}`
        : '/api/search/suggestions';
      const res = await fetch(url);
      if (!res.ok) return;
      const data = await res.json();
      this.renderSuggestionsContent(data, trimmed);
    } catch (err) {
      console.warn('Search suggestions error:', err);
    }
  }

  highlightMatch(text, query) {
    if (!query || !text) return this.escapeHtml(text);
    const qLower = query.toLocaleLowerCase('tr-TR');
    const tLower = text.toLocaleLowerCase('tr-TR');
    const idx = tLower.indexOf(qLower);
    if (idx === -1) return this.escapeHtml(text);

    const before = this.escapeHtml(text.substring(0, idx));
    const match = this.escapeHtml(text.substring(idx, idx + query.length));
    const after = this.escapeHtml(text.substring(idx + query.length));
    return `${before}<span class="suggestion-highlight">${match}</span>${after}`;
  }

  renderSuggestionsContent(data, query) {
    const dropdown = document.getElementById('searchSuggestionsDropdown');
    if (!dropdown) return;

    const trimmedQuery = (query || '').trim();
    const products = data.products || [];
    const categories = data.categories || [];
    const popularQueries = data.popularQueries || [];
    const totalCount = data.totalCount !== undefined ? data.totalCount : products.length;

    // Case A: Query is empty, show Popular Searches & Categories
    if (!trimmedQuery) {
      dropdown.innerHTML = `
        <div class="popular-searches-box">
          <div class="suggestion-section-header">
            <span><i class="fa-solid fa-fire text-amber"></i> Popüler Aramalar</span>
          </div>
          <div class="popular-searches-tags">
            ${popularQueries.map(term => `
              <button type="button" class="popular-search-tag suggestion-nav-item" onclick="app.selectQuerySuggestion('${this.escapeHtml(term)}')">
                <i class="fa-solid fa-magnifying-glass"></i>
                <span>${this.escapeHtml(term)}</span>
              </button>
            `).join('')}
          </div>
        </div>

        ${categories.length > 0 ? `
          <div class="popular-searches-box" style="margin-top: 4px;">
            <div class="suggestion-section-header">
              <span><i class="fa-solid fa-layer-group"></i> Kategoriler</span>
            </div>
            <div class="popular-searches-tags">
              ${categories.map(cat => `
                <button type="button" class="popular-search-tag suggestion-nav-item" onclick="app.selectCategorySuggestion('${cat.id}', '')">
                  <i class="fa-solid ${cat.icon}"></i>
                  <span>${this.escapeHtml(cat.name)}</span>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `;
      this.openSearchSuggestions();
      return;
    }

    // Case B: Query has text but 0 matches
    if (products.length === 0 && categories.length === 0) {
      dropdown.innerHTML = `
        <div class="suggestion-empty-state">
          <i class="fa-solid fa-magnifying-glass"></i>
          <p>"${this.escapeHtml(trimmedQuery)}" için doğrudan eşleşme bulunamadı</p>
          <span>Enter tuşuna basarak veya Ara butonuna tıklayarak genel arama yapabilirsiniz.</span>
        </div>
        <button type="button" class="suggestion-view-all-btn suggestion-nav-item" onclick="app.applyFilters(); app.closeSearchSuggestions();">
          <span>"${this.escapeHtml(trimmedQuery)}" ile tüm sitede ara</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      `;
      this.openSearchSuggestions();
      return;
    }

    // Case C: Query has matches
    let html = '';

    // Category matches
    if (categories.length > 0) {
      html += `
        <div class="suggestion-section-header">
          <span><i class="fa-solid fa-layer-group"></i> Kategori Önerileri</span>
        </div>
        <div class="suggestion-products-list" style="margin-bottom: 6px;">
          ${categories.map(cat => `
            <div class="suggestion-category-item suggestion-nav-item" onclick="app.selectCategorySuggestion('${cat.id}', '${this.escapeHtml(trimmedQuery)}')">
              <i class="fa-solid ${cat.icon}"></i>
              <span>"${this.escapeHtml(trimmedQuery)}" aramasını <strong>${this.escapeHtml(cat.name)}</strong> kategorisinde yap</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    // Product matches
    if (products.length > 0) {
      html += `
        <div class="suggestion-section-header">
          <span><i class="fa-solid fa-bag-shopping"></i> En Yakın İlanlar</span>
        </div>
        <div class="suggestion-products-list">
          ${products.map(p => {
            const thumb = (p.images && p.images.length > 0) ? p.images[0] : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200';
            const priceFormatted = new Intl.NumberFormat('tr-TR').format(p.price);
            const highlightedTitle = this.highlightMatch(p.title, trimmedQuery);
            return `
              <div class="suggestion-product-item suggestion-nav-item" onclick="app.selectProductSuggestion(${p.id})">
                <div class="suggestion-product-left">
                  <img src="${thumb}" alt="${this.escapeHtml(p.title)}" class="suggestion-thumb" onerror="this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200'">
                  <div class="suggestion-info">
                    <span class="suggestion-title">${highlightedTitle}</span>
                    <div class="suggestion-meta">
                      ${p.category_name ? `<span><i class="fa-solid fa-tag"></i> ${this.escapeHtml(p.category_name)}</span>` : ''}
                      ${p.location ? `<span><i class="fa-solid fa-location-dot"></i> ${this.escapeHtml(p.location)}</span>` : ''}
                    </div>
                  </div>
                </div>
                <div class="suggestion-product-right">
                  <span class="suggestion-price">${priceFormatted} ₺</span>
                  <i class="fa-solid fa-chevron-right suggestion-arrow"></i>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // Bottom view all button
    html += `
      <button type="button" class="suggestion-view-all-btn suggestion-nav-item" onclick="app.applyFilters(); app.closeSearchSuggestions();">
        <span>"${this.escapeHtml(trimmedQuery)}" için tüm sonuçları gör (${totalCount} ilan)</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    `;

    dropdown.innerHTML = html;
    this.openSearchSuggestions();
  }

  selectProductSuggestion(productId) {
    this.closeSearchSuggestions();
    this.openProductDetails(productId);
  }

  selectCategorySuggestion(categoryId, query) {
    this.closeSearchSuggestions();
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = query || '';
    const clearBtn = document.getElementById('searchClearBtn');
    if (clearBtn) clearBtn.style.display = query ? 'flex' : 'none';
    this.selectCategory(categoryId);
  }

  selectQuerySuggestion(query) {
    this.closeSearchSuggestions();
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = query;
    const clearBtn = document.getElementById('searchClearBtn');
    if (clearBtn) clearBtn.style.display = 'flex';
    this.applyFilters();
  }

  clearSearchInput() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('searchClearBtn');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    if (clearBtn) clearBtn.style.display = 'none';
    this.closeSearchSuggestions();
    this.applyFilters();
  }

  openSearchSuggestions() {
    const dropdown = document.getElementById('searchSuggestionsDropdown');
    if (!dropdown) return;
    this.closeCityDropdown();
    dropdown.style.display = 'flex';
    requestAnimationFrame(() => {
      dropdown.classList.add('show');
    });
  }

  closeSearchSuggestions() {
    const dropdown = document.getElementById('searchSuggestionsDropdown');
    if (!dropdown) return;
    dropdown.classList.remove('show');
    this.selectedSuggestionIndex = -1;
    setTimeout(() => {
      if (!dropdown.classList.contains('show')) {
        dropdown.style.display = 'none';
      }
    }, 180);
  }

  handleFilterChange() {
    this.filters.city = document.getElementById('locationFilter').value;
    this.filters.condition = document.getElementById('conditionFilter').value;
    this.filters.sort = document.getElementById('sortFilter').value;
    this.updateSelectedCityDisplay(this.filters.city);
    this.applyFilters();
  }

  applyFilters() {
    this.closeSearchSuggestions();
    this.searchQuery = document.getElementById('searchInput').value.trim();
    this.fetchProducts();
  }

  resetFilters() {
    this.selectedCategory = null;
    this.searchQuery = '';
    this.filters = { city: '', condition: '', minPrice: null, maxPrice: null, sort: 'newest' };

    document.getElementById('searchInput').value = '';
    document.getElementById('locationFilter').value = '';
    document.getElementById('conditionFilter').value = '';
    document.getElementById('sortFilter').value = 'newest';
    this.updateSelectedCityDisplay('');

    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
    this.fetchProducts();
  }

  togglePriceFilterModal() {
    const modal = document.getElementById('priceFilterModal');
    if (modal.open) {
      modal.close();
    } else {
      document.getElementById('minPriceInput').value = this.filters.minPrice || '';
      document.getElementById('maxPriceInput').value = this.filters.maxPrice || '';
      modal.showModal();
    }
  }

  applyPriceFilter() {
    const min = document.getElementById('minPriceInput').value;
    const max = document.getElementById('maxPriceInput').value;
    this.filters.minPrice = min ? parseFloat(min) : null;
    this.filters.maxPrice = max ? parseFloat(max) : null;
    document.getElementById('priceFilterModal').close();
    this.applyFilters();
  }

  clearPriceFilter() {
    this.filters.minPrice = null;
    this.filters.maxPrice = null;
    document.getElementById('minPriceInput').value = '';
    document.getElementById('maxPriceInput').value = '';
    document.getElementById('priceFilterModal').close();
    this.applyFilters();
  }

  /* ==========================================================================
     81 PROVINCES CITY SELECTION MODAL & FILTERING
     ========================================================================== */

  normalizeTurkish(text) {
    if (!text) return '';
    return text
      .toLocaleLowerCase('tr-TR')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .trim();
  }

  initCitySelector() {
    // 1. Populate <datalist id="turkeyCitiesList">
    const datalist = document.getElementById('turkeyCitiesList');
    if (datalist) {
      datalist.innerHTML = TURKISH_CITIES.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
    }

    // 2. Render initial city dropdown grid
    this.renderCityPopoverGrid();

    // 3. Update display for currently active city
    this.updateSelectedCityDisplay(this.filters.city);

    // 4. Outside click dismiss listener
    document.addEventListener('click', (e) => {
      const popover = document.getElementById('cityDropdownPopover');
      const btn = document.getElementById('headerLocationBtn');
      if (popover && popover.style.display !== 'none' && popover.classList.contains('show')) {
        if (!popover.contains(e.target) && (!btn || !btn.contains(e.target))) {
          this.closeCityDropdown();
        }
      }
    });

    // 5. ESC key dismiss listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeCityDropdown();
      }
    });
  }

  toggleCityDropdown(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const popover = document.getElementById('cityDropdownPopover');
    if (!popover) return;

    if (popover.style.display === 'none' || !popover.classList.contains('show')) {
      this.openCityDropdown();
    } else {
      this.closeCityDropdown();
    }
  }

  openCityDropdown() {
    const popover = document.getElementById('cityDropdownPopover');
    const btn = document.getElementById('headerLocationBtn');
    if (!popover) return;

    this.closeSearchSuggestions();

    // Reset search
    this.citySearchQuery = '';
    const searchInput = document.getElementById('cityPopoverSearchInput');
    const clearBtn = document.getElementById('cityPopoverClearBtn');
    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.style.display = 'none';

    // Reset region tab to 'all'
    this.currentCityRegion = 'all';
    document.querySelectorAll('.city-region-tab').forEach(tab => {
      if (tab.getAttribute('data-region') === 'all') {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Highlight All Turkey card if no city selected
    const allTurkeyBtn = document.getElementById('popoverAllTurkeyBtn');
    if (allTurkeyBtn) {
      if (!this.filters.city) {
        allTurkeyBtn.classList.add('active');
      } else {
        allTurkeyBtn.classList.remove('active');
      }
    }

    // Render list
    this.renderCityPopoverGrid();

    // Open with animation
    popover.style.display = 'flex';
    requestAnimationFrame(() => {
      popover.classList.add('show');
    });

    if (btn) {
      btn.classList.add('is-active');
      btn.setAttribute('aria-expanded', 'true');
    }

    if (searchInput) {
      setTimeout(() => searchInput.focus(), 60);
    }
  }

  closeCityDropdown() {
    const popover = document.getElementById('cityDropdownPopover');
    const btn = document.getElementById('headerLocationBtn');
    if (!popover) return;

    popover.classList.remove('show');
    if (btn) {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded', 'false');
    }

    setTimeout(() => {
      if (!popover.classList.contains('show')) {
        popover.style.display = 'none';
      }
    }, 200);
  }

  // Aliases for backward compatibility
  openCityModal() {
    this.openCityDropdown();
  }

  closeCityModal() {
    this.closeCityDropdown();
  }

  filterCitiesByRegion(region) {
    this.currentCityRegion = region;

    // Update active tab styles
    document.querySelectorAll('.city-region-tab').forEach(tab => {
      if (tab.getAttribute('data-region') === region) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    this.renderCityPopoverGrid();
  }

  handleCityPopoverSearch(query) {
    this.citySearchQuery = (query || '').trim();
    const clearBtn = document.getElementById('cityPopoverClearBtn');
    if (clearBtn) {
      clearBtn.style.display = this.citySearchQuery ? 'flex' : 'none';
    }
    this.renderCityPopoverGrid();
  }

  clearCityPopoverSearch() {
    const searchInput = document.getElementById('cityPopoverSearchInput');
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
    this.handleCityPopoverSearch('');
  }

  renderCityPopoverGrid() {
    const grid = document.getElementById('cityPopoverGrid');
    const emptyState = document.getElementById('cityPopoverEmpty');
    if (!grid) return;

    // Determine base cities list for active region
    let list = TURKISH_CITIES.map(c => c.name);

    if (this.currentCityRegion === 'popular') {
      list = [...POPULAR_CITIES];
    } else if (this.currentCityRegion !== 'all' && TURKEY_REGIONS[this.currentCityRegion]) {
      list = [...TURKEY_REGIONS[this.currentCityRegion]];
    }

    // Filter by search query if any
    if (this.citySearchQuery) {
      const normQuery = this.normalizeTurkish(this.citySearchQuery);
      list = list.filter(cityName => {
        return this.normalizeTurkish(cityName).includes(normQuery);
      });

      // If query yielded 0 in current tab, search all 81 cities automatically
      if (list.length === 0 && this.currentCityRegion !== 'all') {
        const globalMatches = TURKISH_CITIES.map(c => c.name).filter(cityName => {
          return this.normalizeTurkish(cityName).includes(normQuery);
        });
        if (globalMatches.length > 0) {
          list = globalMatches;
          this.currentCityRegion = 'all';
          document.querySelectorAll('.city-region-tab').forEach(tab => {
            if (tab.getAttribute('data-region') === 'all') tab.classList.add('active');
            else tab.classList.remove('active');
          });
        }
      }
    }

    if (list.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    const currentCity = (this.filters.city || '').toLowerCase();

    grid.innerHTML = list.map(cityName => {
      const isSelected = currentCity === cityName.toLowerCase();
      return `
        <button type="button" class="popover-city-item ${isSelected ? 'active' : ''}" data-city="${cityName}" onclick="app.selectCity('${cityName}')">
          <span class="popover-city-left">
            <i class="fa-solid fa-location-dot popover-city-pin"></i>
            <span class="popover-city-name">${cityName}</span>
          </span>
          ${isSelected ? '<i class="fa-solid fa-check popover-city-check"></i>' : ''}
        </button>
      `;
    }).join('');
  }

  selectCity(cityName) {
    const hiddenInput = document.getElementById('locationFilter');
    if (hiddenInput) {
      hiddenInput.value = cityName || '';
    }
    this.handleFilterChange();
    this.closeCityDropdown();
  }

  updateSelectedCityDisplay(city) {
    const label = document.getElementById('selectedCityLabel');
    const btn = document.getElementById('headerLocationBtn');
    if (label) {
      label.textContent = city ? city : 'Tüm Türkiye';
    }
    if (btn) {
      if (city) {
        btn.classList.add('has-city-selected');
        btn.setAttribute('title', `Seçili Şehir: ${city} (Değiştirmek için tıkla)`);
      } else {
        btn.classList.remove('has-city-selected');
        btn.setAttribute('title', 'Şehir Seç (Tüm Türkiye)');
      }
    }

    const allTurkeyBtn = document.getElementById('popoverAllTurkeyBtn');
    if (allTurkeyBtn) {
      if (!city) {
        allTurkeyBtn.classList.add('active');
      } else {
        allTurkeyBtn.classList.remove('active');
      }
    }
  }

  /* ==========================================================================
     PRODUCT DETAIL MODAL
     ========================================================================== */
  async openProductDetails(productId, returnTarget = null) {
    if (returnTarget !== null && returnTarget !== undefined) {
      this.productDetailReturnTarget = returnTarget;
    }
    if (returnTarget === 'favorites') {
      this.closeFavoritesModal();
    } else if (returnTarget === 'profile') {
      this.closeProfileDrawer();
    }
    try {
      const headers = {
        'X-Visitor-Id': this.getVisitorId()
      };
      if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

      const res = await fetch(`/api/products/${productId}`, { headers });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const p = data.product;
      this.currentDetailProduct = p;

      // Update in local cache if present
      if (Array.isArray(this.products)) {
        const localProd = this.products.find(item => item.id === p.id);
        if (localProd) {
          localProd.views = p.views;
        }
      }

      // Populate Modal Fields
      const mainImg = p.images && p.images[0] ? p.images[0] : 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800';
      document.getElementById('modalMainImg').src = mainImg;
      document.getElementById('modalConditionTag').textContent = p.condition;
      document.getElementById('modalTitle').textContent = p.title;
      document.getElementById('modalPrice').textContent = Number(p.price).toLocaleString('tr-TR') + ' ₺';
      document.getElementById('modalLocation').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${p.location}`;
      document.getElementById('modalDescription').textContent = p.description;
      document.getElementById('modalViewsBadge').innerHTML = `<i class="fa-solid fa-eye"></i> ${p.views} görüntülenme`;
      document.getElementById('modalCategoryPill').innerHTML = `<i class="fa-solid ${p.category_icon || 'fa-tag'}"></i> ${p.category_name}`;

      // Fav button state in modal
      const favBtn = document.getElementById('modalFavBtn');
      favBtn.classList.toggle('active', Boolean(p.is_favorite));

      // Thumbnails
      const thumbContainer = document.getElementById('modalThumbnails');
      if (p.images && p.images.length > 1) {
        thumbContainer.style.display = 'flex';
        thumbContainer.innerHTML = p.images.map((img, idx) => `
          <img src="${img}" class="gallery-thumb ${idx === 0 ? 'active' : ''}" 
               onclick="app.switchMainModalImg('${img}', this)" alt="Fotoğraf">
        `).join('');
      } else {
        thumbContainer.style.display = 'none';
      }

      // Seller Info
      document.getElementById('modalSellerAvatar').src = p.seller_avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=' + p.seller_name;
      document.getElementById('modalSellerName').textContent = p.seller_name;
      document.getElementById('modalSellerRating').innerHTML = `<i class="fa-solid fa-star"></i> ${p.seller_rating || '5.0'}`;
      document.getElementById('modalSellerSubinfo').innerHTML = `
        <span><i class="fa-solid fa-map-pin"></i> ${p.seller_city || p.location}</span>
        <span> • </span>
        <span><i class="fa-solid fa-award"></i> Güvenilir Satıcı</span>
      `;

      // Actions Group (Chat, Offer, Call or Owner actions)
      const actionsContainer = document.getElementById('modalActionsGroup');
      const isOwner = this.currentUser && this.currentUser.id === p.user_id;

      if (isOwner) {
        actionsContainer.innerHTML = `
          <div class="modal-btn-row">
            ${p.status === 'active' ? `
              <button class="btn btn-secondary" onclick="app.toggleProductStatus(${p.id}, 'sold')">
                <i class="fa-solid fa-circle-check text-amber"></i> Satıldı İşaretle
              </button>
            ` : `
              <button class="btn btn-secondary" onclick="app.toggleProductStatus(${p.id}, 'active')">
                <i class="fa-solid fa-rotate-left"></i> Tekrar Yayına Al
              </button>
            `}
            <button class="btn btn-outline" style="color: var(--danger); border-color: var(--danger);" 
                    onclick="app.deleteProduct(${p.id})">
              <i class="fa-solid fa-trash"></i> İlanı Sil
            </button>
          </div>
        `;
      } else {
        // Buyer action buttons
        const whatsappNumber = p.seller_phone ? p.seller_phone.replace(/[^0-9]/g, '') : '';
        const whatsappLink = whatsappNumber ? `https://wa.me/90${whatsappNumber.replace(/^0/, '')}?text=Merhaba, Sell Zone üzerinden "${encodeURIComponent(p.title)}" ilanınız için yazıyorum.` : '#';

        actionsContainer.innerHTML = `
          <div class="modal-btn-row">
            <button class="btn btn-primary" onclick="app.openChatModalFromProduct()">
              <i class="fa-solid fa-comment-dots"></i> Satıcıya Mesaj Gönder
            </button>
            <button class="btn btn-secondary" onclick="app.openChatModalFromProduct(true)">
              <i class="fa-solid fa-handshake"></i> Pazarlık Teklifi Ver
            </button>
          </div>
          <div class="modal-btn-row">
            ${whatsappNumber ? `
              <a href="${whatsappLink}" target="_blank" class="btn btn-outline" style="color: #25D366; border-color: #25D366;">
                <i class="fa-brands fa-whatsapp"></i> WhatsApp ile Yaz
              </a>
            ` : ''}
            <button class="btn btn-outline" onclick="app.revealSellerPhone('${p.seller_phone || 'Gizli'}')">
              <i class="fa-solid fa-phone"></i> <span id="btnPhoneText">Telefonu Gör</span>
            </button>
          </div>
        `;
      }

      // Seller Other Items
      const otherSection = document.getElementById('sellerOtherSection');
      const otherGrid = document.getElementById('sellerOtherGrid');
      if (data.sellerOtherItems && data.sellerOtherItems.length > 0) {
        otherSection.style.display = 'block';
        otherGrid.innerHTML = data.sellerOtherItems.map(item => `
          <div class="seller-mini-card" onclick="app.openProductDetails(${item.id})">
            <img src="${item.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=150'}" alt="">
            <div class="seller-mini-info">
              <span class="seller-mini-title">${this.escapeHtml(item.title)}</span>
              <span class="seller-mini-price">${Number(item.price).toLocaleString('tr-TR')} ₺</span>
            </div>
          </div>
        `).join('');
      } else {
        otherSection.style.display = 'none';
      }

      document.getElementById('productDetailModal').showModal();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  switchMainModalImg(src, thumbEl) {
    document.getElementById('modalMainImg').src = src;
    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
    if (thumbEl) thumbEl.classList.add('active');
  }

  revealSellerPhone(phone) {
    const textEl = document.getElementById('btnPhoneText');
    if (textEl) textEl.textContent = phone;
  }

  closeProductDetailModal() {
    const modal = document.getElementById('productDetailModal');
    if (modal && modal.open) {
      modal.close();
    } else {
      this.handleProductDetailModalClosed();
    }
  }

  handleProductDetailModalClosed() {
    if (this.suppressProductDetailReturn) return;

    const target = this.productDetailReturnTarget;
    this.productDetailReturnTarget = null;

    if (target === 'favorites') {
      setTimeout(() => this.openFavoritesModal(), 50);
    } else if (target === 'profile') {
      setTimeout(() => this.openProfileOrLoginModal(), 50);
    } else if (target && target.type === 'chat') {
      setTimeout(() => {
        const c = target.chatContext;
        this.openThreadDirect(
          c.productId,
          c.receiverId,
          c.productTitle,
          c.productPrice,
          c.productImg,
          c.receiverName,
          c.receiverAvatar,
          target.chatReturnTarget
        );
      }, 50);
    }
  }

  async toggleCurrentProductFavorite() {
    if (!this.currentDetailProduct) return;
    await this.toggleFavorite(this.currentDetailProduct.id);
    const favBtn = document.getElementById('modalFavBtn');
    favBtn.classList.toggle('active');
  }

  async toggleFavorite(productId, event) {
    if (event) event.stopPropagation();

    if (!this.currentUser) {
      this.showToast('Favorilere eklemek için lütfen giriş yapın.', 'info');
      this.openAuthModal('login', { type: 'favorite', productId });
      return;
    }

    try {
      const res = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ productId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      this.showToast(data.message, data.isFavorite ? 'success' : 'info');

      // Update in local state
      const target = this.products.find(p => p.id === productId);
      if (target) target.is_favorite = data.isFavorite;

      // Re-render card button
      const gridBtn = document.querySelector(`.product-card[onclick*="(${productId})"] .card-fav-btn`);
      if (gridBtn) gridBtn.classList.toggle('active', data.isFavorite);

      this.updateHeaderBadges();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  async toggleProductStatus(productId, status) {
    try {
      const res = await fetch(`/api/products/${productId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      this.showToast(data.message, 'success');
      this.closeProductDetailModal();
      this.fetchProducts();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  async deleteProduct(productId) {
    if (!confirm('Bu ilanı silmek istediğinizden emin misiniz?')) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      this.showToast('İlan başarıyla silindi.', 'success');
      this.closeProductDetailModal();
      this.fetchProducts();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  /* ==========================================================================
     CREATE NEW LISTING (İLAN VER)
     ========================================================================== */
  openNewProductModal(returnTarget = null) {
    if (!this.currentUser) {
      this.showToast('İlan vermek için lütfen önce giriş yapın.', 'info');
      this.openAuthModal('login', 'newProduct');
      return;
    }
    if (returnTarget !== null && returnTarget !== undefined) {
      this.newProductReturnTarget = returnTarget;
    }
    if (returnTarget === 'profile') {
      this.closeProfileDrawer();
    }

    this.selectedFiles = [];
    this.selectedPresetUrls = [];
    this.renderPhotoPreviews();
    document.getElementById('newProductForm').reset();

    // Initialize & populate city and district dropdowns
    this.initNewProductCitySelect();

    let userCity = 'İstanbul';
    let userDistrict = 'Kadıköy';
    if (this.currentUser && this.currentUser.city) {
      const parts = this.currentUser.city.split(',').map(s => s.trim());
      if (parts[0] && TURKEY_DISTRICTS[parts[0]]) {
        userCity = parts[0];
        userDistrict = parts[1] || '';
      } else if (parts[0]) {
        userCity = parts[0];
      }
    }

    const citySelect = document.getElementById('newProdCity');
    if (citySelect) {
      citySelect.value = userCity;
      this.handleNewProdCityChange(userCity, userDistrict);
    }

    document.getElementById('newProductModal').showModal();
  }

  initNewProductCitySelect() {
    const citySelect = document.getElementById('newProdCity');
    if (!citySelect) return;
    citySelect.innerHTML = '<option value="">Şehir Seçiniz</option>' + 
      TURKISH_CITIES.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  }

  handleNewProdCityChange(cityName, preselectedDistrict = '') {
    const districtSelect = document.getElementById('newProdDistrict');
    if (!districtSelect) return;

    if (!cityName) {
      districtSelect.innerHTML = '<option value="">Önce Şehir Seçiniz</option>';
      districtSelect.disabled = true;
      return;
    }

    const districts = TURKEY_DISTRICTS[cityName] || [];
    districtSelect.disabled = false;
    districtSelect.innerHTML = '<option value="">İlçe Seçiniz</option>' + 
      districts.map(d => `<option value="${d}">${d}</option>`).join('');

    if (preselectedDistrict && districts.includes(preselectedDistrict)) {
      districtSelect.value = preselectedDistrict;
    }
  }

  initRegCitySelect() {
    const regCity = document.getElementById('regCity');
    if (!regCity) return;
    regCity.innerHTML = '<option value="">İl Seçiniz</option>' + 
      TURKISH_CITIES.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  }

  handleRegCityChange(cityName, preselectedDistrict = '') {
    const districtSelect = document.getElementById('regDistrict');
    if (!districtSelect) return;

    if (!cityName) {
      districtSelect.innerHTML = '<option value="">Önce İl Seçiniz</option>';
      districtSelect.disabled = true;
      return;
    }

    const districts = TURKEY_DISTRICTS[cityName] || [];
    districtSelect.disabled = false;
    districtSelect.innerHTML = '<option value="">İlçe Seçiniz</option>' + 
      districts.map(d => `<option value="${d}">${d}</option>`).join('');

    if (preselectedDistrict && districts.includes(preselectedDistrict)) {
      districtSelect.value = preselectedDistrict;
    }
  }

  initEditProfCitySelect() {
    const citySelect = document.getElementById('editProfCity');
    if (!citySelect) return;
    citySelect.innerHTML = '<option value="">İl Seçiniz</option>' + 
      TURKISH_CITIES.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
  }

  handleEditProfCityChange(cityName, preselectedDistrict = '') {
    const districtSelect = document.getElementById('editProfDistrict');
    if (!districtSelect) return;

    if (!cityName) {
      districtSelect.innerHTML = '<option value="">Önce İl Seçiniz</option>';
      districtSelect.disabled = true;
      return;
    }

    const districts = TURKEY_DISTRICTS[cityName] || [];
    districtSelect.disabled = false;
    districtSelect.innerHTML = '<option value="">İlçe Seçiniz</option>' + 
      districts.map(d => `<option value="${d}">${d}</option>`).join('');

    if (preselectedDistrict && districts.includes(preselectedDistrict)) {
      districtSelect.value = preselectedDistrict;
    }
  }

  closeNewProductModal() {
    const modal = document.getElementById('newProductModal');
    if (modal && modal.open) {
      modal.close();
    } else {
      this.handleNewProductModalClosed();
    }
  }

  handleNewProductModalClosed() {
    const target = this.newProductReturnTarget;
    this.newProductReturnTarget = null;
    if (target === 'profile') {
      setTimeout(() => this.openProfileOrLoginModal(), 50);
    }
  }

  handlePhotoSelection(event) {
    const files = Array.from(event.target.files);
    if (this.selectedFiles.length + files.length > 5) {
      this.showToast('En fazla 5 fotoğraf yükleyebilirsiniz.', 'error');
      return;
    }
    this.selectedFiles.push(...files);
    this.renderPhotoPreviews();
  }

  addPresetPhoto(type) {
    const presets = {
      matkap: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80',
      telefon: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
      bisiklet: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80',
      mobilya: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80',
      gitar: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&auto=format&fit=crop&q=80'
    };

    if (presets[type] && !this.selectedPresetUrls.includes(presets[type])) {
      this.selectedPresetUrls.push(presets[type]);
      this.renderPhotoPreviews();
      this.showToast('Örnek fotoğraf eklendi', 'info');
    }
  }

  renderPhotoPreviews() {
    const container = document.getElementById('photoPreviewsList');
    container.innerHTML = '';

    // Files
    this.selectedFiles.forEach((file, index) => {
      const url = URL.createObjectURL(file);
      const div = document.createElement('div');
      div.className = 'photo-preview-item';
      div.innerHTML = `
        <img src="${url}" alt="Önizleme">
        <button type="button" class="remove-photo-btn" onclick="app.removeFile(${index})">✕</button>
      `;
      container.appendChild(div);
    });

    // Preset URLs
    this.selectedPresetUrls.forEach((url, index) => {
      const div = document.createElement('div');
      div.className = 'photo-preview-item';
      div.innerHTML = `
        <img src="${url}" alt="Önizleme">
        <button type="button" class="remove-photo-btn" onclick="app.removePreset(${index})">✕</button>
      `;
      container.appendChild(div);
    });
  }

  removeFile(index) {
    this.selectedFiles.splice(index, 1);
    this.renderPhotoPreviews();
  }

  removePreset(index) {
    this.selectedPresetUrls.splice(index, 1);
    this.renderPhotoPreviews();
  }

  async handleCreateProduct(event) {
    event.preventDefault();

    const title = document.getElementById('newProdTitle').value.trim();
    const category_id = document.getElementById('newProdCategory').value;
    const price = document.getElementById('newProdPrice').value;
    const condition = document.getElementById('newProdCondition').value;
    const city = document.getElementById('newProdCity').value;
    const district = document.getElementById('newProdDistrict').value;

    if (!city) {
      this.showToast('Lütfen ilan için şehir (il) seçiniz.', 'warning');
      return;
    }
    if (!district) {
      this.showToast('Lütfen ilçe seçiniz.', 'warning');
      return;
    }

    const location = `${city}, ${district}`;
    const description = document.getElementById('newProdDescription').value.trim();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category_id', category_id);
    formData.append('price', price);
    formData.append('condition', condition);
    formData.append('location', location);
    formData.append('description', description);

    // Append files
    this.selectedFiles.forEach(file => {
      formData.append('photos', file);
    });

    // Append presets
    if (this.selectedPresetUrls.length > 0) {
      formData.append('imageUrls', JSON.stringify(this.selectedPresetUrls));
    }

    const btn = document.getElementById('btnPublishListing');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yayınlanıyor...';

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'X-Visitor-Id': this.getVisitorId()
        },
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      this.showToast('İlanınız başarıyla yayına alındı! 🎉', 'success');
      this.newProductReturnTarget = null;
      this.closeNewProductModal();
      await this.fetchProducts();
      await this.fetchCategories();
      await this.fetchStats();
      this.openProductDetails(data.id);
    } catch (err) {
      this.showToast(err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> İlanı Hemen Yayınla';
    }
  }

  /* ==========================================================================
     IN-APP MESSAGING & BARGAINING (PAZARLIK SİSTEMİ)
     ========================================================================== */
  openChatModalFromProduct(isOffer = false) {
    if (!this.currentUser) {
      this.showToast('Mesajlaşmak için lütfen giriş yapın.', 'info');
      this.openAuthModal('login', { type: 'chat', productId: this.currentDetailProduct ? this.currentDetailProduct.id : null });
      return;
    }

    const p = this.currentDetailProduct;
    if (!p) return;

    if (this.currentUser.id === p.user_id) {
      this.showToast('Kendi ilanınıza mesaj gönderemezsiniz.', 'info');
      return;
    }

    const prevTarget = this.productDetailReturnTarget;
    this.activeChatContext = {
      productId: p.id,
      receiverId: p.user_id,
      receiverName: p.seller_name || 'Satıcı',
      receiverAvatar: p.seller_avatar || '',
      receiverCity: p.location || '',
      productTitle: p.title,
      productPrice: p.price,
      productImg: (p.images && p.images[0]) || '',
      role: 'Satıcı'
    };

    this.chatReturnTarget = {
      type: 'product',
      productId: p.id,
      returnTarget: prevTarget
    };

    // Close detail modal, open chat modal
    this.suppressProductDetailReturn = true;
    this.closeProductDetailModal();
    this.suppressProductDetailReturn = false;

    this.updateChatHeaderUser(this.activeChatContext);

    document.getElementById('chatProductImg').src = this.activeChatContext.productImg || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100';
    document.getElementById('chatProductTitle').textContent = this.activeChatContext.productTitle;
    document.getElementById('chatProductPrice').textContent = Number(this.activeChatContext.productPrice).toLocaleString('tr-TR') + ' ₺';

    // Setup interactive offer panel and quick offer buttons
    this.setupOfferPanel(this.activeChatContext.productPrice);

    document.getElementById('chatModal').showModal();
    this.loadChatMessages();

    // Start auto polling for responses every 3 seconds
    if (this.chatPollingInterval) clearInterval(this.chatPollingInterval);
    this.chatPollingInterval = setInterval(() => this.loadChatMessages(true), 3000);

    if (isOffer) {
      setTimeout(() => this.openOfferPanel(), 180);
    }
  }

  /* ==========================================================================
     INTERACTIVE OFFER & BARGAIN PANEL METHODS
     ========================================================================== */

  setupOfferPanel(productPrice) {
    this.closeOfferPanel();

    const price = Number(productPrice) || 0;
    const origPriceEl = document.getElementById('offerPanelOriginalPrice');
    if (origPriceEl) {
      origPriceEl.textContent = price.toLocaleString('tr-TR') + ' ₺';
    }

    const presetsGrid = document.getElementById('offerPresetsGrid');
    const quickOffersList = document.getElementById('quickOfferButtons');

    const p5 = Math.round(price * 0.95);
    const p10 = Math.round(price * 0.90);
    const p15 = Math.round(price * 0.85);
    const p20 = Math.round(price * 0.80);

    const presets = [
      { label: '%5 İndirim', percent: 5, amount: p5 },
      { label: '%10 İndirim', percent: 10, amount: p10 },
      { label: '%15 İndirim', percent: 15, amount: p15 },
      { label: '%20 İndirim', percent: 20, amount: p20 },
    ];

    if (presetsGrid) {
      presetsGrid.innerHTML = presets.map(p => `
        <button type="button" class="preset-offer-btn ${p.percent === 10 ? 'active' : ''}" onclick="app.selectOfferPreset(${p.percent}, ${p.amount})">
          <span class="preset-percent">-%${p.percent}</span>
          <span class="preset-price">${p.amount.toLocaleString('tr-TR')} ₺</span>
        </button>
      `).join('');
    }

    if (quickOffersList) {
      quickOffersList.innerHTML = presets.slice(1).map(p => `
        <button type="button" class="quick-offer-pill" onclick="app.openOfferPanelWithPreset(${p.amount})">
          ${p.amount.toLocaleString('tr-TR')} ₺ (%${p.percent})
        </button>
      `).join('');
    }

    const input = document.getElementById('offerAmountInput');
    if (input) {
      input.value = p10;
      this.handleOfferAmountInput(p10);
    }

    const customMsg = document.getElementById('offerCustomMessage');
    if (customMsg) customMsg.value = '';
    document.querySelectorAll('.offer-note-chips .note-chip').forEach(c => c.classList.remove('active'));
  }

  toggleOfferPanel() {
    const panel = document.getElementById('chatOfferPanel');
    const btn = document.getElementById('btnChatOffer');
    if (!panel) return;

    if (panel.style.display === 'none' || !panel.style.display) {
      panel.style.display = 'flex';
      if (btn) btn.classList.add('active');
      const input = document.getElementById('offerAmountInput');
      if (input) {
        setTimeout(() => input.focus(), 80);
      }
    } else {
      panel.style.display = 'none';
      if (btn) btn.classList.remove('active');
    }
  }

  openOfferPanel(prefilledAmount = null) {
    const panel = document.getElementById('chatOfferPanel');
    const btn = document.getElementById('btnChatOffer');
    if (panel) {
      panel.style.display = 'flex';
      if (btn) btn.classList.add('active');
    }
    if (prefilledAmount) {
      const input = document.getElementById('offerAmountInput');
      if (input) {
        input.value = prefilledAmount;
        this.handleOfferAmountInput(prefilledAmount);
      }
    }
    const input = document.getElementById('offerAmountInput');
    if (input) {
      setTimeout(() => input.focus(), 80);
    }
  }

  openOfferPanelWithPreset(amount) {
    this.openOfferPanel(amount);
  }

  closeOfferPanel() {
    const panel = document.getElementById('chatOfferPanel');
    const btn = document.getElementById('btnChatOffer');
    if (panel) panel.style.display = 'none';
    if (btn) btn.classList.remove('active');
  }

  stepOfferAmount(delta) {
    const input = document.getElementById('offerAmountInput');
    if (!input) return;
    let current = Number(input.value) || 0;
    current = Math.max(1, current + delta);
    input.value = current;
    this.handleOfferAmountInput(current);
  }

  handleOfferAmountInput(val) {
    const amount = Number(val) || 0;
    const originalPrice = this.activeChatContext ? Number(this.activeChatContext.productPrice) || 0 : 0;
    const preview = document.getElementById('offerSavingsPreview');
    const pctBadge = document.getElementById('offerDiscountPercent');
    const savText = document.getElementById('offerSavingsAmount');
    const submitBtnText = document.getElementById('btnSubmitOfferText');

    if (submitBtnText) {
      submitBtnText.textContent = amount > 0 
        ? `${amount.toLocaleString('tr-TR')} ₺ Teklifi Gönder` 
        : 'Teklifi Gönder';
    }

    if (originalPrice > 0 && amount > 0 && amount < originalPrice) {
      const diff = originalPrice - amount;
      const pct = Math.round((diff / originalPrice) * 100);
      if (preview) preview.style.display = 'flex';
      if (pctBadge) pctBadge.textContent = `-%${pct}`;
      if (savText) savText.textContent = `${diff.toLocaleString('tr-TR')} ₺ daha uygun`;
    } else if (originalPrice > 0 && amount >= originalPrice) {
      if (preview) preview.style.display = 'flex';
      if (pctBadge) pctBadge.textContent = `Liste Fiyatı`;
      if (savText) savText.textContent = `İndirimsiz tutar`;
    } else {
      if (preview) preview.style.display = 'none';
    }

    document.querySelectorAll('.preset-offer-btn').forEach(btn => {
      const priceSpan = btn.querySelector('.preset-price');
      if (priceSpan && priceSpan.textContent.replace(/[^\d]/g, '') === String(amount)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  selectOfferPreset(percent, amount) {
    const input = document.getElementById('offerAmountInput');
    if (input) {
      input.value = amount;
      this.handleOfferAmountInput(amount);
    }
  }

  selectOfferNote(chipEl, noteText) {
    const input = document.getElementById('offerCustomMessage');
    if (input) {
      input.value = noteText;
      input.focus();
    }
    document.querySelectorAll('.offer-note-chips .note-chip').forEach(c => c.classList.remove('active'));
    if (chipEl) chipEl.classList.add('active');
  }

  async submitOffer() {
    const amountInput = document.getElementById('offerAmountInput');
    const messageInput = document.getElementById('offerCustomMessage');
    const amount = Number(amountInput ? amountInput.value : 0);
    const customNote = messageInput ? messageInput.value.trim() : '';

    if (!amount || amount <= 0) {
      this.showToast('Lütfen geçerli bir teklif tutarı giriniz.', 'warning');
      return;
    }

    const content = customNote 
      ? `🤝 Fiyat Teklifim: ${amount.toLocaleString('tr-TR')} ₺\nNot: "${customNote}"`
      : `🤝 Fiyat Teklifim: ${amount.toLocaleString('tr-TR')} ₺. Sizin için uygun mudur?`;

    await this.postMessageToApi(content, amount);

    this.closeOfferPanel();
    if (messageInput) messageInput.value = '';
    document.querySelectorAll('.offer-note-chips .note-chip').forEach(c => c.classList.remove('active'));
    this.showToast(`${amount.toLocaleString('tr-TR')} ₺ tutarındaki teklifiniz iletildi!`, 'success');
  }

  async respondToOffer(messageId, status) {
    try {
      const res = await fetch(`/api/messages/${messageId}/offer-response`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (status === 'accepted') {
        this.showToast('Teklifi kabul ettiniz! Satış detaylarını konuşabilirsiniz.', 'success');
      } else {
        this.showToast('Teklif reddedildi.', 'info');
      }

      await this.loadChatMessages();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  openCounterOffer(previousOffer) {
    const origPrice = this.activeChatContext ? Number(this.activeChatContext.productPrice) || 0 : 0;
    const counterAmount = Math.round((origPrice + Number(previousOffer)) / 2);
    this.openOfferPanelWithPreset(counterAmount);
    const msgInput = document.getElementById('offerCustomMessage');
    if (msgInput) {
      msgInput.value = `Karşı teklifim: ${counterAmount.toLocaleString('tr-TR')} ₺. Uygunsa anlaşabiliriz.`;
    }
  }

  async loadChatMessages(isSilent = false) {
    if (!this.activeChatContext) return;

    try {
      const res = await fetch(`/api/messages/chat?productId=${this.activeChatContext.productId}&otherUserId=${this.activeChatContext.receiverId}`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      if (data.otherUser) {
        const isSeller = data.product && Number(data.product.user_id) === Number(data.otherUser.id);
        this.activeChatContext.receiverName = data.otherUser.name;
        this.activeChatContext.receiverAvatar = data.otherUser.avatar;
        this.activeChatContext.receiverCity = data.otherUser.city;
        this.activeChatContext.role = isSeller ? 'Satıcı' : 'Alıcı';
        this.updateChatHeaderUser(this.activeChatContext);
      }

      const body = document.getElementById('chatMessagesBody');
      const messages = data.messages || [];

      if (messages.length === 0) {
        body.innerHTML = `
          <div style="text-align: center; color: var(--text-light); margin: auto; padding: 20px;">
            <i class="fa-solid fa-comments" style="font-size: 2.2rem; margin-bottom: 10px; display:block;"></i>
            Henüz mesaj yok. Satıcıya ilk soruyu sor veya pazarlık teklifinde bulun!
          </div>
        `;
        return;
      }

      const origPrice = this.activeChatContext ? Number(this.activeChatContext.productPrice) : null;

      body.innerHTML = messages.map(m => {
        const isOutgoing = m.sender_id === this.currentUser.id;

        if (m.offer_price) {
          const offerNum = Number(m.offer_price);
          let discountBadge = '';
          if (origPrice && origPrice > offerNum) {
            const pct = Math.round(((origPrice - offerNum) / origPrice) * 100);
            discountBadge = `<span class="offer-discount-badge">-%${pct} (${(origPrice - offerNum).toLocaleString('tr-TR')} ₺ indirim)</span>`;
          }

          const status = m.offer_status || 'pending';
          const statusLabels = {
            pending: '<span class="offer-status-badge status-pending"><i class="fa-solid fa-clock"></i> Yanıt Bekleniyor</span>',
            accepted: '<span class="offer-status-badge status-accepted"><i class="fa-solid fa-circle-check"></i> Kabul Edildi</span>',
            declined: '<span class="offer-status-badge status-declined"><i class="fa-solid fa-circle-xmark"></i> Reddedildi</span>'
          };

          const isReceiver = m.receiver_id === this.currentUser.id;
          const showActions = isReceiver && status === 'pending';

          return `
            <div class="chat-bubble ${isOutgoing ? 'outgoing' : 'incoming'} has-offer-card">
              <div class="chat-offer-card">
                <div class="offer-card-header">
                  <div class="offer-badge-pill">
                    <i class="fa-solid fa-handshake"></i>
                    <span>FİYAT TEKLİFİ</span>
                  </div>
                  ${statusLabels[status] || statusLabels.pending}
                </div>
                <div class="offer-card-price-row">
                  <span class="offer-amount-big">${offerNum.toLocaleString('tr-TR')} ₺</span>
                  ${origPrice ? `<span class="offer-original-striked">${origPrice.toLocaleString('tr-TR')} ₺</span>` : ''}
                  ${discountBadge}
                </div>
                <div class="offer-card-note">${this.escapeHtml(m.content)}</div>
                ${showActions ? `
                  <div class="offer-card-actions">
                    <button type="button" class="btn-offer-act accept" onclick="app.respondToOffer(${m.id}, 'accepted')">
                      <i class="fa-solid fa-check"></i> Kabul Et
                    </button>
                    <button type="button" class="btn-offer-act decline" onclick="app.respondToOffer(${m.id}, 'declined')">
                      <i class="fa-solid fa-xmark"></i> Reddet
                    </button>
                    <button type="button" class="btn-offer-act counter" onclick="app.openCounterOffer(${offerNum})">
                      <i class="fa-solid fa-rotate-left"></i> Karşı Teklif
                    </button>
                  </div>
                ` : ''}
              </div>
              <div class="chat-meta-row">
                <span class="chat-time">${this.formatTime(m.created_at)}</span>
                ${isOutgoing ? `
                  <span class="chat-read-ticks ${m.is_read ? 'read-seen' : 'sent-delivered'}" title="${m.is_read ? 'Görüldü (Okundu)' : 'İletildi'}">
                    <i class="fa-solid ${m.is_read ? 'fa-check-double' : 'fa-check'}"></i>
                  </span>
                ` : ''}
              </div>
            </div>
          `;
        }

        return `
          <div class="chat-bubble ${isOutgoing ? 'outgoing' : 'incoming'}">
            <div class="chat-text-content">${this.escapeHtml(m.content)}</div>
            <div class="chat-meta-row">
              <span class="chat-time">${this.formatTime(m.created_at)}</span>
              ${isOutgoing ? `
                <span class="chat-read-ticks ${m.is_read ? 'read-seen' : 'sent-delivered'}" title="${m.is_read ? 'Görüldü (Okundu)' : 'İletildi'}">
                  <i class="fa-solid ${m.is_read ? 'fa-check-double' : 'fa-check'}"></i>
                </span>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');

      // Auto scroll to bottom
      if (!isSilent) {
        body.scrollTop = body.scrollHeight;
      }

      // Gelen okunmamış mesajlar backend tarafından okundu işaretlendiği için sayaçları hemen senkronize et
      this.updateHeaderBadges();
    } catch (err) {
      console.error('Chat load error:', err);
    }
  }

  async handleSendMessage(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const input = document.getElementById('chatInputMessage');
    const text = input.value.trim();
    if (!text || !this.activeChatContext) return;

    input.value = '';
    input.focus();
    await this.postMessageToApi(text, null);
  }

  async postMessageToApi(content, offerPrice = null) {
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          productId: this.activeChatContext.productId,
          receiverId: this.activeChatContext.receiverId,
          content,
          offerPrice
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      await this.loadChatMessages();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  closeChatModal() {
    const modal = document.getElementById('chatModal');
    if (modal && modal.open) {
      modal.close();
    } else {
      this.handleChatModalClosed();
    }
  }

  handleChatModalClosed() {
    this.closeOfferPanel();
    if (this.chatPollingInterval) {
      clearInterval(this.chatPollingInterval);
      this.chatPollingInterval = null;
    }
    this.updateHeaderBadges();

    if (this.suppressChatReturn) return;

    const target = this.chatReturnTarget;
    this.chatReturnTarget = null;

    if (target === 'messages') {
      setTimeout(() => {
        this.openMessagesModal();
      }, 50);
    } else if (target && target.type === 'product') {
      setTimeout(() => {
        this.openProductDetails(target.productId, target.returnTarget);
      }, 50);
    }
  }

  openProductFromChat() {
    if (!this.activeChatContext || !this.activeChatContext.productId) return;
    const currentChat = { ...this.activeChatContext };
    const prevTarget = this.chatReturnTarget;

    this.suppressChatReturn = true;
    this.closeChatModal();
    this.suppressChatReturn = false;

    this.openProductDetails(currentChat.productId, {
      type: 'chat',
      chatContext: currentChat,
      chatReturnTarget: prevTarget
    });
  }

  updateChatHeaderUser(info = {}) {
    const backBtn = document.getElementById('chatBackBtn');
    if (backBtn) {
      if (this.chatReturnTarget === 'messages') {
        backBtn.title = 'Mesajlarıma Dön';
      } else if (this.chatReturnTarget && this.chatReturnTarget.type === 'product') {
        backBtn.title = 'İlana Dön';
      } else {
        backBtn.title = 'Geri Dön';
      }
    }

    const avatarEl = document.getElementById('chatUserAvatar');
    const nameEl = document.getElementById('chatUserName');
    const roleEl = document.getElementById('chatUserRole');
    const cityEl = document.getElementById('chatUserCity');

    const name = info.receiverName || (this.activeChatContext && this.activeChatContext.receiverName) || 'Kullanıcı';
    if (nameEl) nameEl.textContent = name;

    const avatarUrl = info.receiverAvatar || (this.activeChatContext && this.activeChatContext.receiverAvatar) || '';
    if (avatarEl) {
      const fallbackAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=ff3f55,ff7a00,3b82f6`;
      avatarEl.src = avatarUrl || fallbackAvatar;
      avatarEl.alt = name;
      avatarEl.onerror = () => {
        avatarEl.src = fallbackAvatar;
      };
    }

    const role = info.role || (this.activeChatContext && this.activeChatContext.role) || 'Kullanıcı';
    if (roleEl) {
      roleEl.textContent = role;
    }

    const city = info.receiverCity || (this.activeChatContext && this.activeChatContext.receiverCity) || '';
    if (cityEl) {
      if (city) {
        cityEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${this.escapeHtml(city)}`;
        cityEl.style.display = 'inline-flex';
      } else {
        cityEl.style.display = 'none';
      }
    }
  }

  /* ==========================================================================
     MESSAGES & THREADS DRAWER
     ========================================================================== */
  async openMessagesModal() {
    if (!this.currentUser) {
      this.openAuthModal('login', 'messages');
      return;
    }

    try {
      const res = await fetch('/api/messages/threads', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });

      if (res.status === 401) {
        this.logout();
        this.showToast('Oturum süreniz dolmuş, lütfen tekrar giriş yapın.', 'info');
        this.openAuthModal('login', 'messages');
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Mesajlar alınamadı.');

      const threads = Array.isArray(data) ? data : [];
      this.currentThreads = threads;
      const container = document.getElementById('threadsListContainer');

      if (threads.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon"><i class="fa-solid fa-comment-slash"></i></div>
            <h3>Henüz bir mesajınız yok</h3>
            <p>İlgilendiğiniz bir ilanın detayına giderek satıcıyla hemen sohbet başlatabilirsiniz.</p>
          </div>
        `;
      } else {
        container.innerHTML = threads.map((t, idx) => {
          const hasUnread = t.unread_count > 0;
          return `
          <div class="drawer-thread-card ${hasUnread ? 'has-unread' : ''}" onclick="app.openThreadByIndex(${idx})">
            <img src="${t.product_images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100'}" class="thread-product-img" alt="">
            <div class="thread-info">
              <div class="thread-user-row">
                <span class="thread-user-name">${this.escapeHtml(t.other_user_name)}</span>
                <div class="thread-time-badge-group">
                  <span style="font-size: 0.75rem; color: var(--text-light);">${this.formatDate(t.created_at)}</span>
                  ${hasUnread ? `<span class="thread-unread-pill">${t.unread_count}</span>` : ''}
                </div>
              </div>
              <div class="thread-product-title">${this.escapeHtml(t.product_title)} • ${Number(t.product_price).toLocaleString('tr-TR')} ₺</div>
              <div class="thread-last-msg">${t.offer_price ? '🤝 <b>Teklif:</b> ' : ''}${this.escapeHtml(t.content)}</div>
            </div>
          </div>
        `;
        }).join('');
      }

      this.updateHeaderBadges();
      document.getElementById('messagesDrawer').showModal();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  openThreadByIndex(idx) {
    if (!this.currentThreads || !this.currentThreads[idx]) return;
    const t = this.currentThreads[idx];
    this.openThreadDirect(
      t.product_id,
      t.other_user_id,
      t.product_title,
      t.product_price,
      (t.product_images && t.product_images[0]) || '',
      t.other_user_name,
      t.other_user_avatar,
      'messages'
    );
  }

  openThreadDirect(productId, otherUserId, productTitle, productPrice, productImg, otherUserName = '', otherUserAvatar = '', returnTarget = 'messages') {
    if (returnTarget) {
      this.chatReturnTarget = returnTarget;
    }
    this.closeMessagesModal();
    this.activeChatContext = {
      productId,
      receiverId: otherUserId,
      receiverName: otherUserName || 'Kullanıcı',
      receiverAvatar: otherUserAvatar || '',
      productTitle,
      productPrice,
      productImg
    };

    this.updateChatHeaderUser(this.activeChatContext);

    document.getElementById('chatProductImg').src = productImg || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100';
    document.getElementById('chatProductTitle').textContent = productTitle;
    document.getElementById('chatProductPrice').textContent = Number(productPrice).toLocaleString('tr-TR') + ' ₺';

    this.setupOfferPanel(productPrice);

    document.getElementById('chatModal').showModal();
    this.loadChatMessages();
    if (this.chatPollingInterval) clearInterval(this.chatPollingInterval);
    this.chatPollingInterval = setInterval(() => this.loadChatMessages(true), 3000);
  }

  closeMessagesModal() {
    document.getElementById('messagesDrawer').close();
  }

  /* ==========================================================================
     FAVORITES DRAWER
     ========================================================================== */
  async openFavoritesModal() {
    if (!this.currentUser) {
      this.openAuthModal('login', 'favorites');
      return;
    }

    try {
      const res = await fetch('/api/favorites', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });

      if (res.status === 401) {
        this.logout();
        this.showToast('Oturum süreniz dolmuş, lütfen tekrar giriş yapın.', 'info');
        this.openAuthModal('login', 'favorites');
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Favoriler alınamadı.');

      const favorites = Array.isArray(data) ? data : [];
      const container = document.getElementById('favoritesListContainer');

      if (favorites.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon"><i class="fa-solid fa-heart-crack"></i></div>
            <h3>Favorileriniz henüz boş</h3>
            <p>Beğendiğiniz ilanların üzerindeki kalp ikonuna tıklayarak buraya kaydedebilirsiniz.</p>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="products-grid" style="grid-template-columns: 1fr;">
            ${favorites.map(p => this.renderProductCardHtml(p, 'favorites')).join('')}
          </div>
        `;
      }

      document.getElementById('favoritesDrawer').showModal();
    } catch (err) {
      this.showToast(err.message, 'error');
    }
  }

  closeFavoritesModal() {
    document.getElementById('favoritesDrawer').close();
  }

  /* ==========================================================================
     ADVANCED USER PROFILE
     ========================================================================== */
  async openProfileOrLoginModal() {
    if (!this.currentUser) {
      this.openAuthModal('login', 'profile');
      return;
    }

    // Populate header info
    const fallbackAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(this.currentUser.name)}&backgroundColor=ff3f55,ff7a00,3b82f6`;
    const userAvatarUrl = this.currentUser.avatar || fallbackAvatar;

    document.getElementById('profileUserAvatar').src = userAvatarUrl;
    document.getElementById('profileUserName').textContent = this.currentUser.name;
    document.getElementById('profileUserRating').textContent = this.currentUser.rating || '5.0';
    document.getElementById('profileReviewsCount').textContent = `(${this.currentUser.reviews_count || 12} değerlendirme)`;
    document.getElementById('profileUserLocation').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${this.escapeHtml(this.currentUser.city || 'İstanbul')}`;
    document.getElementById('profileUserMemberDate').innerHTML = `<i class="fa-solid fa-calendar-check"></i> Üye: ${this.currentUser.created_at ? new Date(this.currentUser.created_at).getFullYear() : '2026'}`;
    document.getElementById('profileUserPhone').innerHTML = `<i class="fa-solid fa-phone"></i> ${this.escapeHtml(this.currentUser.phone || 'Telefon belirtilmedi')}`;
    document.getElementById('profileUserBio').textContent = this.currentUser.bio || 'Sell Zone pazarında güvenilir alışverişin adresi.';

    // Populate edit form
    document.getElementById('editProfName').value = this.currentUser.name;
    document.getElementById('editProfPhone').value = this.currentUser.phone || '';
    document.getElementById('editProfBio').value = this.currentUser.bio || '';

    this.initEditProfCitySelect();
    let profCity = 'İstanbul';
    let profDistrict = 'Kadıköy';
    if (this.currentUser && this.currentUser.city) {
      const parts = this.currentUser.city.split(',').map(s => s.trim());
      if (parts[0] && TURKEY_DISTRICTS[parts[0]]) {
        profCity = parts[0];
        profDistrict = parts[1] || '';
      } else if (parts[0]) {
        profCity = parts[0];
      }
    }
    const editCityEl = document.getElementById('editProfCity');
    if (editCityEl) {
      editCityEl.value = profCity;
      this.handleEditProfCityChange(profCity, profDistrict);
    }

    // Set avatar preview and hidden value
    const editPreview = document.getElementById('editProfAvatarPreview');
    if (editPreview) editPreview.src = userAvatarUrl;
    const editHidden = document.getElementById('editProfAvatarValue');
    if (editHidden) editHidden.value = this.currentUser.avatar || '';

    // Load stats and listings
    await this.loadProfileStatsAndData();
    await this.loadMyListingsAndSold();

    // Default to listings tab
    this.switchProfileTab('listings');

    document.getElementById('profileDrawer').showModal();
  }

  closeProfileDrawer() {
    document.getElementById('profileDrawer').close();
  }

  triggerHeaderAvatarUpload() {
    const input = document.getElementById('headerAvatarFileInput');
    if (input) input.click();
  }

  triggerEditAvatarUpload() {
    const input = document.getElementById('editProfAvatarFileInput');
    if (input) input.click();
  }

  async uploadProfileAvatarFile(file) {
    if (!file) return null;

    if (!file.type.startsWith('image/')) {
      this.showToast('Lütfen geçerli bir fotoğraf seçiniz (JPG, PNG, WEBP).', 'warning');
      return null;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.showToast('Fotoğraf boyutu en fazla 5 MB olabilir.', 'warning');
      return null;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    const res = await fetch('/api/auth/avatar', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`
      },
      body: formData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Fotoğraf yüklenemedi.');
    return data;
  }

  async handleHeaderAvatarSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const avatarImg = document.getElementById('profileUserAvatar');
    const originalSrc = avatarImg ? avatarImg.src : '';

    if (avatarImg) {
      avatarImg.src = URL.createObjectURL(file);
      avatarImg.style.opacity = '0.6';
    }

    try {
      this.showToast('Profil fotoğrafınız yükleniyor...', 'info');
      const data = await this.uploadProfileAvatarFile(file);
      if (!data) {
        if (avatarImg) {
          avatarImg.src = originalSrc;
          avatarImg.style.opacity = '1';
        }
        return;
      }

      this.currentUser = { ...this.currentUser, ...data.user };
      localStorage.setItem('alsat_user', JSON.stringify(this.currentUser));

      if (avatarImg) {
        avatarImg.src = data.avatarUrl;
        avatarImg.style.opacity = '1';
      }

      const previewImg = document.getElementById('editProfAvatarPreview');
      if (previewImg) previewImg.src = data.avatarUrl;
      const hiddenVal = document.getElementById('editProfAvatarValue');
      if (hiddenVal) hiddenVal.value = data.avatarUrl;

      this.updateAuthUI();
      this.showToast('Profil fotoğrafınız başarıyla güncellendi! 🎉', 'success');
    } catch (err) {
      if (avatarImg) {
        avatarImg.src = originalSrc;
        avatarImg.style.opacity = '1';
      }
      this.showToast(err.message, 'error');
    } finally {
      event.target.value = '';
    }
  }

  async handleEditAvatarSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const previewImg = document.getElementById('editProfAvatarPreview');
    const originalSrc = previewImg ? previewImg.src : '';

    if (previewImg) {
      previewImg.src = URL.createObjectURL(file);
      previewImg.style.opacity = '0.6';
    }

    try {
      this.showToast('Fotoğraf yükleniyor...', 'info');
      const data = await this.uploadProfileAvatarFile(file);
      if (!data) {
        if (previewImg) {
          previewImg.src = originalSrc;
          previewImg.style.opacity = '1';
        }
        return;
      }

      this.currentUser = { ...this.currentUser, ...data.user };
      localStorage.setItem('alsat_user', JSON.stringify(this.currentUser));

      if (previewImg) {
        previewImg.src = data.avatarUrl;
        previewImg.style.opacity = '1';
      }

      const avatarImg = document.getElementById('profileUserAvatar');
      if (avatarImg) avatarImg.src = data.avatarUrl;

      const hiddenVal = document.getElementById('editProfAvatarValue');
      if (hiddenVal) hiddenVal.value = data.avatarUrl;

      this.updateAuthUI();
      this.showToast('Profil fotoğrafınız başarıyla güncellendi! 🎉', 'success');
    } catch (err) {
      if (previewImg) {
        previewImg.src = originalSrc;
        previewImg.style.opacity = '1';
      }
      this.showToast(err.message, 'error');
    } finally {
      event.target.value = '';
    }
  }

  resetAvatarToDefault() {
    if (!this.currentUser) return;
    const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(this.currentUser.name)}&backgroundColor=ff3f55,ff7a00,3b82f6`;

    const previewImg = document.getElementById('editProfAvatarPreview');
    if (previewImg) previewImg.src = defaultAvatar;

    const avatarImg = document.getElementById('profileUserAvatar');
    if (avatarImg) avatarImg.src = defaultAvatar;

    const hiddenVal = document.getElementById('editProfAvatarValue');
    if (hiddenVal) hiddenVal.value = defaultAvatar;

    this.showToast('Fotoğraf varsayılana sıfırlandı. Kaydetmek için formu güncelleyin.', 'info');
  }

  switchProfileTab(tabName) {
    // Buttons
    document.querySelectorAll('.profile-nav-btn').forEach(b => b.classList.remove('active'));
    // Panes
    ['paneListings', 'paneSold', 'paneEdit', 'paneSecurity'].forEach(id => {
      const pane = document.getElementById(id);
      if (pane) pane.style.display = 'none';
    });

    if (tabName === 'listings') {
      document.getElementById('profTabListings').classList.add('active');
      document.getElementById('paneListings').style.display = 'block';
    } else if (tabName === 'sold') {
      document.getElementById('profTabSold').classList.add('active');
      document.getElementById('paneSold').style.display = 'block';
    } else if (tabName === 'edit') {
      document.getElementById('profTabEdit').classList.add('active');
      document.getElementById('paneEdit').style.display = 'block';
    } else if (tabName === 'security') {
      document.getElementById('profTabSecurity').classList.add('active');
      document.getElementById('paneSecurity').style.display = 'block';
    }
  }

  async loadProfileStatsAndData() {
    try {
      const res = await fetch('/api/auth/profile-stats', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      const stats = await res.json();
      if (!res.ok) return;

      document.getElementById('kpiActiveCount').textContent = stats.active_count || '0';
      document.getElementById('kpiSoldCount').textContent = stats.sold_count || '0';
      document.getElementById('kpiViewsCount').textContent = stats.total_views || '0';
      document.getElementById('kpiChatsCount').textContent = stats.chats_count || '0';

      document.getElementById('tabCountActive').textContent = stats.active_count || '0';
      document.getElementById('tabCountSold').textContent = stats.sold_count || '0';
    } catch (err) {
      console.error('Stats error:', err);
    }
  }

  async loadMyListingsAndSold() {
    try {
      const res = await fetch(`/api/products?userId=${this.currentUser.id}&status=`, {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      const allProducts = await res.json();

      const activeProducts = allProducts.filter(p => p.status === 'active');
      const soldProducts = allProducts.filter(p => p.status === 'sold');

      const activeContainer = document.getElementById('myListingsContainer');
      const soldContainer = document.getElementById('mySoldListingsContainer');

      // Render Active
      if (activeProducts.length === 0) {
        activeContainer.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-icon"><i class="fa-solid fa-box-open"></i></div>
            <h3>Yayında aktif ilanınız bulunmuyor</h3>
            <p>Hemen elinizdeki eşyayı fotoğraflayıp birkaç dakikada yayına alabilirsiniz.</p>
            <button class="btn btn-primary" onclick="app.openNewProductModal('profile');">İlan Ver</button>
          </div>
        `;
      } else {
        activeContainer.innerHTML = activeProducts.map(p => this.renderOwnerProductCardHtml(p)).join('');
      }

      // Render Sold
      if (soldProducts.length === 0) {
        soldContainer.innerHTML = `
          <div class="empty-state" style="grid-column: 1 / -1;">
            <div class="empty-icon"><i class="fa-solid fa-handshake"></i></div>
            <h3>Henüz tamamlanmış satışınız yok</h3>
            <p>Satılan eşyalarınız burada listelenir ve satıcı profilinize başarı olarak yansır.</p>
          </div>
        `;
      } else {
        soldContainer.innerHTML = soldProducts.map(p => this.renderOwnerProductCardHtml(p)).join('');
      }
    } catch (err) {
      console.error('Listings load error:', err);
    }
  }

  renderOwnerProductCardHtml(p) {
    const mainImg = p.images && p.images[0] ? p.images[0] : 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400';
    const isSold = p.status === 'sold';

    return `
      <div class="product-card">
        <div class="product-card-img-wrap" onclick="app.openProductDetails(${p.id}, 'profile');">
          <img src="${mainImg}" alt="${this.escapeHtml(p.title)}" loading="lazy">
          <span class="card-condition-pill">${p.condition}</span>
          ${isSold ? '<div class="sold-badge-overlay"><i class="fa-solid fa-circle-check"></i> SATILDI</div>' : ''}
        </div>
        <div class="product-card-body">
          <div class="card-price-row">
            <span class="card-price">${Number(p.price).toLocaleString('tr-TR')} ₺</span>
          </div>
          <h4 class="card-title" onclick="app.openProductDetails(${p.id}, 'profile');" style="cursor:pointer;">
            ${this.escapeHtml(p.title)}
          </h4>
          <div style="display:flex; gap:6px; margin-top:10px;">
            ${!isSold ? `
              <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="app.toggleProductStatus(${p.id}, 'sold'); setTimeout(() => { app.loadProfileStatsAndData(); app.loadMyListingsAndSold(); }, 400);">
                <i class="fa-solid fa-check text-success"></i> Satıldı
              </button>
            ` : `
              <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="app.toggleProductStatus(${p.id}, 'active'); setTimeout(() => { app.loadProfileStatsAndData(); app.loadMyListingsAndSold(); }, 400);">
                <i class="fa-solid fa-rotate-left"></i> Yayına Al
              </button>
            `}
            <button class="btn btn-outline btn-sm" style="color:var(--danger); border-color:var(--danger);" onclick="app.deleteProduct(${p.id}); setTimeout(() => { app.loadProfileStatsAndData(); app.loadMyListingsAndSold(); }, 400);">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  async handleUpdateProfile(event) {
    event.preventDefault();
    const name = document.getElementById('editProfName').value.trim();
    const phone = document.getElementById('editProfPhone').value.trim();
    const selectedCity = (document.getElementById('editProfCity')?.value || '').trim();
    const selectedDistrict = (document.getElementById('editProfDistrict')?.value || '').trim();
    const city = selectedCity && selectedDistrict ? `${selectedCity}, ${selectedDistrict}` : (selectedCity || this.currentUser.city || 'İstanbul');
    const avatar = (document.getElementById('editProfAvatarValue')?.value || '').trim() || this.currentUser.avatar;
    const bio = document.getElementById('editProfBio').value.trim();

    const btn = document.getElementById('btnSaveProfile');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Güncelleniyor...';

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ name, phone, city, avatar, bio })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      this.currentUser = { ...this.currentUser, ...data.user };
      localStorage.setItem('alsat_user', JSON.stringify(this.currentUser));

      this.updateAuthUI();
      document.getElementById('profileUserName').textContent = this.currentUser.name;
      document.getElementById('profileUserAvatar').src = this.currentUser.avatar;
      document.getElementById('profileUserLocation').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${this.escapeHtml(this.currentUser.city)}`;
      document.getElementById('profileUserPhone').innerHTML = `<i class="fa-solid fa-phone"></i> ${this.escapeHtml(this.currentUser.phone)}`;
      document.getElementById('profileUserBio').textContent = this.currentUser.bio;

      this.showToast('Profil bilgileriniz güncellendi! 🎉', 'success');
    } catch (err) {
      this.showToast(err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Bilgileri Güncelle';
    }
  }

  async handleChangePassword(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('currentPasswordInput').value;
    const newPassword = document.getElementById('newPasswordInput').value;
    const confirmPassword = document.getElementById('newPasswordConfirmInput').value;

    if (newPassword !== confirmPassword) {
      this.showToast('Yeni şifreler birbiriyle uyuşmuyor.', 'error');
      return;
    }

    const btn = document.getElementById('btnSavePassword');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Güncelleniyor...';

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      document.getElementById('changePasswordForm').reset();
      this.showToast('Şifreniz başarıyla değiştirildi! 🔒', 'success');
    } catch (err) {
      this.showToast(err.message, 'error');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-key"></i> Şifreyi Güncelle';
    }
  }

  /* ==========================================================================
     NOTIFICATIONS / TOASTS
     ========================================================================== */
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${this.escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  /* ==========================================================================
     HELPERS
     ========================================================================== */
  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffHours < 1) return 'Az önce';
    if (diffHours < 24) return `${diffHours} saat önce`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Dün';
    if (diffDays < 7) return `${diffDays} gün önce`;
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  }

  getVisitorId() {
    let vid = localStorage.getItem('alsat_visitor_id');
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      localStorage.setItem('alsat_visitor_id', vid);
    }
    return vid;
  }

  formatTime(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  }
}

// Global instance
const app = new MarketplaceApp();
