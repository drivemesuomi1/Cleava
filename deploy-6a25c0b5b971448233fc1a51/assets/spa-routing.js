var _pageTitles = {"home": "Cleava | Siivouspalvelut Helsinki, Espoo & Vantaa", "home-cleaning": "Kotisiivous Helsinki & Espoo | Cleava", "moving-cleaning": "Muuttosiivous Helsinki & Espoo | Cleava", "office-cleaning": "Toimistosiivous Helsinki & Espoo | Cleava", "ikkunanpesu": "Ikkunanpesu Helsinki & Espoo | Cleava", "suursiivous": "Suursiivous Helsinki & Espoo | Cleava", "erikoissiivous": "Erikoissiivous Helsinki & Espoo | Cleava", "porrassiivous": "Porrassiivous Helsinki & Espoo | Cleava", "hinnasto": "Hinnasto | Cleava Siivouspalvelut", "tarinamme": "Tarinamme | Cleava Siivouspalvelut", "lahjakortti": "Lahjakortit | Cleava Siivouspalvelut", "yrityssiivous": "Yrityssiivous Helsinki & Espoo | Cleava", "myymalasiivous": "Myymäläsiivous Helsinki & Espoo | Cleava", "ravintolasiivous": "Ravintolasiivous Helsinki & Espoo | Cleava", "lattiahoito": "Lattiahoito Helsinki & Espoo | Cleava", "rakennussiivous": "Rakennussiivous Helsinki & Espoo | Cleava"};
var _pageUrlMap = {"home": "/", "home-cleaning": "/kotisiivous", "moving-cleaning": "/muuttosiivous", "office-cleaning": "/toimistosiivous", "ikkunanpesu": "/ikkunanpesu", "suursiivous": "/suursiivous", "erikoissiivous": "/erikoissiivous", "porrassiivous": "/porrassiivous", "hinnasto": "/hinnasto", "tarinamme": "/tarinamme", "lahjakortti": "/lahjakortti", "yrityssiivous": "/yrityssiivous", "myymalasiivous": "/myymalasiivous", "ravintolasiivous": "/ravintolasiivous", "lattiahoito": "/lattiahoito", "rakennussiivous": "/rakennussiivous"};
var _pageDescs = {"home": "Cleava – edullinen siivouspalvelu kotiin ja toimistoon Helsingissä, Espoossa ja Vantaalla. Pyydä ilmainen tarjous saman päivän aikana.", "home-cleaning": "Edullinen kotisiivous Helsinki, Espoo ja Vantaa – alkaen 39 €/tunti. Säännöllinen tai kertaluonteinen. Tyytyväisyystakuu. Pyydä tarjous.", "moving-cleaning": "Muuttosiivous Helsinki ja Espoo – perusteellinen loppusiivous luovutuskuntoon. ALV sis. Tyytyväisyystakuu. Pyydä tarjous.", "office-cleaning": "Toimistosiivous Helsinki ja Espoo – säännöllinen tai kertaluonteinen. Koulutetut ammattilaiset. Pyydä yritystarjous.", "ikkunanpesu": "Ikkunanpesu Helsinki ja Espoo – ammattimaisesti pestyt ikkunat sisältä ja ulkoa. Alkaen 39 €/tunti. Pyydä tarjous.", "suursiivous": "Suursiivous Helsinki ja Espoo – perusteellinen tehopuhdistus. Sopii kevätsiivoukseen ja ennen juhlia. Pyydä tarjous.", "erikoissiivous": "Erikoissiivous Helsinki ja Espoo – sauna, parveke tai muu erikoiskohde. Räätälöity palvelu. Pyydä tarjous.", "porrassiivous": "Porrassiivous Helsinki ja Espoo – kiinteistöjen yhteiset tilat siistiksi. Säännöllinen sopimus. Pyydä tarjous.", "yrityssiivous": "Yrityssiivous Helsinki ja Espoo – toimistot, myymälät ja toimitilat. Luotettava kumppani. Pyydä yritystarjous.", "hinnasto": "Cleava siivouspalvelujen hinnat – kotisiivous alkaen 39 €/tunti. Kotitalousvähennys mahdollinen. Selkeä hinnoittelu ilman yllätyksiä."};
function updateSEO(name) {
var url = 'https://cleava.fi' + (_pageUrlMap[name] || '/');
var title = _pageTitles[name] || 'Cleava | Siivouspalvelut Helsinki, Espoo & Vantaa';
document.title = title;
var desc = _pageDescs[name] || _pageDescs['home'];
var metaDesc = document.querySelector('meta[name="description"]'); if(metaDesc) metaDesc.content = desc;
var c = document.getElementById('canonicalTag'); if(c) c.href = url;
var ou = document.getElementById('ogUrl'); if(ou) ou.content = url;
var ot = document.getElementById('ogTitle'); if(ot) ot.content = title;
}
function showPage(name, push) {
if (name === 'kiitos') return;
document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
var p = document.getElementById('page-' + name);
if (p) p.classList.add('active');
var wrap = document.querySelector('.nav-dd-wrap');
if (wrap) {
wrap.classList.add('closing');
setTimeout(function(){ wrap.classList.remove('closing'); }, 600);
}
document.activeElement.blur();
window.scrollTo({top:0, behavior:'instant'});
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;
document.body.setAttribute('data-page', name); updateSEO(name); window._currentPage = name;
updateFctaText(name);
if (push !== false) {
var url = (_pageUrls[name] || '/');
history.pushState({page: name}, '', url);
}
var fcta = document.querySelector('.fcta-footer');
if (fcta) fcta.style.display = (name === 'lahjakortti') ? 'none' : '';
setTimeout(initReveal, 80);
}
function scrollTo(id) {
setTimeout(function(){
var el = document.getElementById(id);
if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
}, 100);
}
function openModal() {
document.getElementById('contactModal').classList.add('open');
document.body.style.overflow = 'hidden';
}
function closeModal() {
document.getElementById('contactModal').classList.remove('open');
document.body.style.overflow = '';
}
function handleModalBg(e) {
if(e.target === document.getElementById('contactModal')) closeModal();
}
document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeModal(); });
function submitForm(e, source) {
e.preventDefault();
try {
var form = e.target;
var zip = (form.zip && form.zip.value || '').trim();
var phone = (form.phone && form.phone.value || '').trim();
var emailEl = form.querySelector('input[name="email"]');
var email = (emailEl && emailEl.value || '').trim();
if(!zip || !phone || (source === 'hero' && !email)) return false;
var formName = source === 'hero' ? 'hero-lead' : 'contact-quick';
var service = form.service ? form.service.value : '';
var size = form.size ? form.size.value : '';
var payload = {
service: service,
zip: zip,
phone: phone,
email: email,
customer_email: email,
send_to_email: email,
source: source,
page: window.location.href,
lang: (document.documentElement.lang || '').slice(0,2) || 'fi'
};
if(size) payload.size = size;
fetch('/.netlify/functions/submit-offer-lead', {
method:'POST',
headers:{'Content-Type':'application/json'},
body: JSON.stringify(payload)
}).catch(function(){});
var params = new URLSearchParams();
params.append('form-name', formName);
params.append('zip', zip);
params.append('phone', phone);
if(email) params.append('email', email);
params.append('source', source);
params.append('page', window.location.href);
params.append('lang', payload.lang);
if(service) params.append('service', service);
if(size) params.append('size', size);
fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: params.toString() }).catch(function(){});
var btn = form.querySelector('button[type="submit"]');
if(btn){ btn.textContent = '✓ Lähetetty!'; btn.disabled = true; btn.style.background = '#22c55e'; }
if(typeof showTyPopup==='function') showTyPopup();
} catch(err) {}
return false;
}
function submitCtaForm(e, source) {
e.preventDefault();
try {
var form = e.target;
var zip = (form.zip && form.zip.value || '').trim();
var phone = (form.phone && form.phone.value || '').trim();
var service = (form.service && form.service.value || '').trim();
if(!zip || !phone) return false;
var params = new URLSearchParams();
params.append('form-name', 'footer-cta');
params.append('zip', zip);
params.append('phone', phone);
if(service) params.append('service', service);
params.append('source', source);
fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: params.toString() }).catch(function(){});
var btn = form.querySelector('button[type="submit"]');
if(btn){ btn.textContent = '✓ Lähetetty!'; btn.disabled = true; btn.style.background = '#22c55e'; }
if(typeof showTyPopup==='function') showTyPopup();
} catch(err) {}
return false;
}
function toggleFaq(btn) {
var answer = btn.nextElementSibling;
var isOpen = btn.classList.contains('open');
btn.classList.toggle('open');
answer.classList.toggle('open');
}
var LANG_CURRENT = 'fi';
var I18N_EN = {"Täysin vakuutettu": "Fully insured", "4.9/5 Google-arviot": "4.9/5 Google reviews", "Vastaus 24h sisällä": "Response within 24h", "Koulutetut ammattilaiset": "Trained professionals", "Ei sitoutumista": "No commitment", "Etusivu": "Home", "Kotisiivous": "Home Cleaning", "Muuttosiivous": "Moving Cleaning", "Ikkunanpesu": "Window Cleaning", "Erikoissiivous": "Specialist Cleaning", "Yrityssiivous": "Commercial Cleaning", "Toimistosiivous": "Office Cleaning", "Myymälä- ja liiketilasiivous": "Retail Cleaning", "Porrassiivous": "Stairwell Cleaning", "Ravintola- ja suurtaloussiivous": "Restaurant & Kitchen Cleaning", "Lattioiden ylläpito": "Floor Maintenance", "Suursiivous": "Deep Cleaning", "Hinnasto": "Pricing", "Tarinamme": "Our Story", "Lahjakortit": "Gift Cards", "Lahjakortit 🎁": "Gift Cards 🎁", "Tilaa Siivous": "Book Cleaning", "Soita": "Call", "tai": "or", "HELSINKI · ESPOO · VANTAA · KAUNIAINEN": "HELSINKI · ESPOO · VANTAA · KAUNIAINEN", "Siistimpi koti,": "A cleaner home,", "helpompi arki": "easier everyday life", "Edullisia siivouspalveluja kotiin ja toimistoon Helsingissä, Espoossa ja Vantaalla. Ammattitaitoiset siivoojamme huolehtivat puhtaudesta. Sinä käytät ajan muuhun.": "Professional cleaning services for homes and offices in Helsinki, Espoo and Vantaa. Our expert cleaners handle the cleaning. You spend the time on what matters.", "Google-arviointi": "Google rating", "Tyytyväisyystakuu": "Satisfaction guarantee", "Vastaustakuu": "Response guarantee", "Pyydä ilmainen tarjous": "Request a free quote", "Pyydä tarjous nyt →": "Request quote now →", "Ei sitoumuksia · 100% ilmainen tarjous": "No commitment · 100% free quote", "Vastaamme saman päivän aikana": "We respond the same day", "Palvelu": "Service", "Valitse palvelu": "Select service", "Postinumero": "Postal code", "Puhelin": "Phone", "Näin se toimii": "How it works", "Siivous helposti, neljässä vaiheessa": "Easy cleaning in four steps", "Olemme tehneet prosessista mahdollisimman sujuvan.": "We have made the process as smooth as possible.", "Request quote": "Request quote", "Jätä postinumero ja puhelinnumero. Teemme tarjouksen saman päivän aikana.": "Leave your postal code and phone number. We will make a quote the same day.", "Sovitaan ajankohta": "We agree on a time", "Otamme yhteyttä ja sovitaan sinulle sopiva ajankohta.": "We will contact you and agree on a suitable time.", "Ammattilaiset hoitavat": "Professionals handle it", "Siivoojat tulevat sovittuna aikana. Ei tarvitse olla paikalla.": "Cleaners arrive at the agreed time. No need to be present.", "Nauti puhtaasta kodista": "Enjoy a clean home", "Jos olet pettynyt lopputulokseen, korjaamme sen veloituksetta.": "If you are disappointed with the result, we will fix it free of charge.", "Mitä voimme tehdä puolestasi?": "What can we do for you?", "Räätälöimme jokaisen siivouspalvelun tarpeidesi mukaan.": "We tailor every cleaning service to your needs.", "Säännöllinen tai kertasiivous. Sama tuttu siivooja joka kerta.": "Regular or one-time cleaning. The same familiar cleaner every time.", "Perusteellinen siivous muuton yhteydessä. Tyytyväisyystakuu.": "Thorough cleaning when moving. Satisfaction guarantee.", "Puhdas toimisto lisää viihtyvyyttä ja tuottavuutta.": "A clean office increases comfort and productivity.", "Kirkkaat ikkunat tuovat valoa ja iloa kotiin.": "Clear windows bring light and joy to the home.", "Perusteellinen suursiivous joka nurkkaan. Ihanteellinen kevätsiivoukseen.": "Thorough deep cleaning in every corner. Ideal for spring cleaning.", "Sauna, parveke tai erikoiskohteet. Räätälöity ratkaisu.": "Sauna, balcony or special areas. Tailored solution.", "Lue lisää": "Read more", "Pyydä tarjous": "Request quote", "Miksi Cleava?": "Why Cleava?", "Miksi asiakkaamme palaavat aina uudelleen": "Why our customers keep coming back", "Täysin vakuutettu palvelu": "Fully insured service", "Jokainen siivous on vakuutettu. Jos jotain tapahtuu, me hoidamme sen.": "Every cleaning is insured. If something happens, we handle it.", "Huolellisesti valitut ammattilaiset": "Carefully selected professionals", "Kaikki siivoojamme ovat taustatarkistettuja. Tunnet olosi turvalliseksi kotona.": "All our cleaners are background-checked. You feel safe at home.", "100% tyytyväisyystakuu": "100% satisfaction guarantee", "Jos et ole tyytyväinen, palaamme korjaamaan veloituksetta.": "If you are not satisfied, we will return to fix it free of charge.", "Selkeä hinnoittelu, ei yllätyksiä": "Clear pricing, no surprises", "Tarjous aina etukäteen. Ei piilomaksuja.": "Quote always in advance. No hidden fees.", "Asiakaspalautteet": "Customer reviews", "Mitä asiakkaamme sanovat": "What our customers say", "Palvelualueet": "Service areas", "Palvelemme pääkaupunkiseudulla": "We serve the Helsinki metropolitan area", "Palvelemme tällä hetkellä pääkaupunkiseudulla.": "We currently serve the Helsinki metropolitan area.", "Kysymyksiä tai ajatuksia?": "Questions or thoughts?", "Soita tai jätä yhteystietosi.": "Call or leave your contact details.", "Haluatko siistin kodin tai toimiston?": "Want a clean home or office?", "Otamme yhteyttä 24h sisällä.": "We will contact you within 24 hours.", "Kiinnostiko kotisiivous?": "Interested in home cleaning?", "Soita tai jätä puhelinnumerosi.": "Call or leave your phone number.", "Pyydä kotisiivoustarjous": "Request a home cleaning quote", "Muutto edessä?": "Moving soon?", "Pyydä muuttosiivouksen tarjous": "Request a moving cleaning quote", "Kiinnostiko ikkunanpesu?": "Interested in window cleaning?", "Pyydä ikkunanpesun tarjous": "Request a window cleaning quote", "Kiinnostiko toimistosiivous?": "Interested in office cleaning?", "Pyydä toimistosiivouksen tarjous": "Request an office cleaning quote", "Luotettavia siivouspalveluja pääkaupunkiseudulla. Kotisiivous, muuttosiivous, toimistosiivous ja ikkunanpesu ammattitaidolla.": "Reliable cleaning services in the Helsinki metropolitan area. Home, moving, office cleaning and window cleaning with expertise.", "Palvelut": "Services", "Yritys": "Company", "Palveluehdot": "Terms of Service", "Tietosuoja": "Privacy Policy", "Evästeet": "Cookies", "Tietosuoja & Palveluehdot": "Privacy & Terms", "Evästekäytäntö": "Cookie Policy", "Lahjakortti": "Gift Card", "Y-tunnus:": "Business ID:", "Tietoa": "About", "Kaikki oikeudet pidätetään.": "All rights reserved.", "Kotisiivous · Helsinki & Espoo": "Home Cleaning · Helsinki & Espoo", "Kotisiivous, joka helpottaa arkeasi": "Home cleaning that eases your daily life", "Edullinen kotisiivous Helsingissä, Espoossa ja Vantaalla — alkaen 39 €/tunti. Kertaluonteinen tai säännöllinen. 100% tyytyväisyystakuu.": "Affordable home cleaning in Helsinki, Espoo and Vantaa — from 39 €/tunti. One-time or regular. 100% satisfaction guarantee.", "Our guarantee": "Our guarantee", "Miksi valita Cleava?": "Why choose Cleava?", "Jokaiseen siivoukseen sisältyy nämä lupaukset.": "Every cleaning includes these promises.", "100% satisfaction guarantee": "100% satisfaction guarantee", "Jos lopputulos ei miellytä, palaamme korjaamaan veloituksetta.": "If the result is not satisfactory, we will return to fix it free of charge.", "Background-checked professionals": "Background-checked professionals", "Kaikki siivoojamme on taustatarkistettu ja koulutettu.": "All our cleaners are background-checked and trained.", "Ekologiset puhdistusaineet": "Eco-friendly cleaning products", "Hajusteettomia ja ympäristöystävällisiä. Turvallisia perheille ja lemmikkikodeille.": "Fragrance-free and eco-friendly. Safe for families and pet homes.", "Mitä sisältyy": "What is included", "Palvelun sisältö": "Service contents", "Imurointi ja lattioiden pesu kaikissa huoneissa": "Vacuuming and floor washing in all rooms", "Pölyjen pyyhintä pinnoilta, hyllyiltä ja kalusteista": "Dusting surfaces, shelves and furniture", "Kylpyhuoneen ja WC:n perusteellinen puhdistus": "Thorough cleaning of bathroom and toilet", "Keittiön tasopintojen, lieden ja altaan siivous": "Cleaning kitchen countertops, stove and sink", "Roskien tyhjennys ja pussien vaihto": "Emptying bins and replacing bags", "Peilien ja lasipintojen puhdistus": "Cleaning mirrors and glass surfaces", "Lisäpalveluna: uunin puhdistus, jääkaapin puhdistus, kaappien sisäpuolet": "Optional extras: oven cleaning, fridge cleaning, inside cabinets", "Selkeä hinta": "Clear pricing", "Home Cleaning": "Home Cleaning", "Viikoittain 39 €/tunti · Joka toinen viikko 45 €/tunti · Kerran kuussa 49 €/tunti. ALV sisältyy hintaan.": "Weekly 39 €/tunti · Every two weeks 45 €/tunti · Once a month 49 €/tunti. VAT included.", "Kotitalousvähennys mahdollinen.": "Household tax deduction possible.", "FAQ": "FAQ", "Usein kysytyt kysymykset": "Frequently asked questions", "Kuinka usein kotisiivous kannattaa tilata?": "How often should I book home cleaning?", "Se riippuu kodistasi ja elämäntilanteestasi. Yleisin valinta on joka toinen viikko. Perheille tai lemmikkikodeille viikoittainen siivous sopii hyvin.": "It depends on your home and lifestyle. The most common choice is every two weeks. Weekly cleaning works well for families or pet homes.", "Pitääkö minun olla kotona siivouksen aikana?": "Do I need to be home during the cleaning?", "Ei tarvitse. Voit luovuttaa avaimen tai koodin siivoojalle. Siivoojamme ovat taustatarkistettuja ja vakuutettuja.": "No need. You can leave a key or code for the cleaner. Our cleaners are background-checked and insured.", "Mitä tarvikkeet siivooja tuo mukanaan?": "What supplies does the cleaner bring?", "Siivoojat tuovat omat välineet ja puhdistusaineet. Jos sinulla on erityistoiveita aineista tai allergia, kerrothan siitä etukäteen.": "Cleaners bring their own equipment and products. If you have specific preferences or allergies, please let us know in advance.", "Voinko pyytää samaa siivoojaa joka kerta?": "Can I request the same cleaner every time?", "Kyllä. Pyrimme lähettämään saman tutun siivooja joka kerralla, jos mahdollista.": "Yes. We aim to send the same familiar cleaner every time, if possible.", "Mitä jos lopputulos ei miellytä?": "What if the result is not satisfactory?", "Ota yhteyttä 24 tunnin sisällä ja palaamme korjaamaan puutteet veloituksetta. Tyytyväisyystakuu on meille tärkeä.": "Contact us within 24 hours and we will return to fix any issues free of charge. The satisfaction guarantee is important to us.", "Muuttosiivous · Helsinki, Espoo & Vantaa": "Moving Cleaning · Helsinki, Espoo & Vantaa", "Muuttosiivous, huoleton alku uuteen kotiin": "Moving cleaning, a carefree start in your new home", "Muuttosiivous tehtynä huolellisesti. Koti jätetään luovutuskuntoon.": "Moving cleaning done thoroughly. The home is left in handover condition.", "Moving Cleaning": "Moving Cleaning", "Kattava muuttosiivous alusta loppuun. ALV sisältyy hintaan.": "Comprehensive moving cleaning from start to finish. VAT included.", "Milloin muuttosiivous kannattaa tehdä?": "When should moving cleaning be done?", "Useimmiten vanhan kodin luovutuspäivänä tai sitä edeltävänä päivänä. Sovitaan aikataulu muuttosi mukaan.": "Usually on the handover day or the day before. We agree on a schedule to suit your move.", "Mitä eroa on lähtö- ja tulosiivouksella?": "What is the difference between move-out and move-in cleaning?", "Lähtösiivous tehdään kun muutat pois — koti jätetään luovutuskuntoon. Tulosiivous tehdään uuteen kotiin ennen muuttamista.": "Move-out cleaning is done when you leave. Move-in cleaning is done in the new home before moving in.", "Onko muuttosiivous erilainen kuin normaali kotisiivous?": "Is moving cleaning different from regular home cleaning?", "Kyllä. Muuttosiivous on paljon perusteellisempi — kaapit, kodinkoneet, uunit ja kaikki pinnat käydään läpi huolellisesti.": "Yes. Moving cleaning is much more thorough — cupboards, appliances, ovens and all surfaces are covered carefully.", "Kattaako muuttosiivous tarkastuksen vaatimukset?": "Does moving cleaning meet inspection requirements?", "Pyrimme aina täyttämään vuokranantajan tai kiinteistönvälittäjän vaatimukset. Jos tarkastuksessa ilmenee huomautuksia, palaamme korjaamaan veloituksetta.": "We always aim to meet the landlord requirements. If any issues arise during inspection, we will return to fix them free of charge.", "Tarvitseeko minun olla paikalla?": "Do I need to be present?", "Ei tarvitse. Sovitaan ajankohta — muutat rauhassa ja me hoidamme siivouksen.": "No need. We agree on a time and we handle the cleaning.", "Ikkunanpesu · Helsinki & Espoo": "Window Cleaning · Helsinki & Espoo", "Kirkkaat ikkunat, enemmän valoa kotiin": "Crystal clear windows, more light at home", "Ammattimaisesti pestyt ikkunat tuovat valoa kotiin. Hoidamme sekä sisä- että ulkopuolen.": "Professionally cleaned windows bring light to your home. We handle both inside and outside.", "Ammattimaisesti pestyt ikkunat tuovat valoa ja tekevät asunnosta viihtyisämmän. Hoidamme sekä sisä- että ulkopuolen.": "Professionally cleaned windows bring light and make your home more comfortable. We handle both inside and outside.", "Ikkunan lasin pesu sisältä ja ulkoa": "Washing window glass inside and outside", "Ikkunanpuitteiden ja listojen pyyhintä": "Wiping window frames and trims", "Karmien ja helkojen puhdistus": "Cleaning frames and handles", "Ikkunalaudat pyyhitään samalla": "Window sills wiped at the same time", "Parvekkeen ovet ja lasirakenteet": "Balcony doors and glass structures", "Terassi- ja parvekelasit sovitusti": "Terrace and balcony glass by agreement", "Ei tarvitse olla kotona": "No need to be home", "Window Cleaning": "Window Cleaning", "ALV sisältyy hintaan. Ikkunanpesun voi yhdistää kotisiivoukseen.": "VAT included. Window cleaning can be combined with home cleaning.", "Kuinka usein ikkunat kannattaa pestä?": "How often should windows be cleaned?", "Suosittelemme 1–2 kertaa vuodessa. Vilkasliikenteisten teiden varrella tai rakennustyömaiden lähellä useammin.": "We recommend 1-2 times a year. More often near busy roads or construction sites.", "Pestäänkö ikkunat myös ulkopuolelta?": "Are windows also cleaned on the outside?", "Kyllä, hoidamme sekä sisä- että ulkopuolen. Parvekkeen ovet ja terassilasit sisältyvät sovitusti.": "Yes, we handle both inside and outside. Balcony doors and terrace glass included by agreement.", "Milloin ikkunanpesu onnistuu parhaiten?": "When is the best time for window cleaning?", "Parhaiten pilvisellä tai puolipilvisellä säällä. Suora aurinko voi jättää tahroja kuivuvaan lasiin.": "Best on cloudy days. Direct sunlight can leave streaks on drying glass.", "Voidaanko ikkunanpesu yhdistää kotisiivoukseen?": "Can window cleaning be combined with home cleaning?", "Kyllä. Yhdistetty palvelu on kätevä ja usein edullisempi kuin erikseen tilattuna.": "Yes. A combined service is convenient and often cheaper than ordering separately.", "Ei tarvitse. Sovitaan sopiva ajankohta — löydät kirkkaat ikkunat kotiinpalatessasi.": "No need. We agree on a time and you come home to sparkling windows.", "Ei. Sovitaan ajankohta ja siivoojamme hoitavat kaiken. Löydät kirkkaat ikkunat kotiinpalatessasi.": "No. We agree on a time and our cleaners handle everything. You come home to sparkling windows.", "Toimistosiivous · Helsinki & Espoo": "Office Cleaning · Helsinki & Espoo", "Toimistosiivous, viihtyisä työympäristö": "Office cleaning, a pleasant working environment", "Puhdas toimisto lisää viihtyvyyttä ja tuottavuutta. Me hoidamme siivouksen, sinä keskityt työhön.": "A clean office increases comfort and productivity. We handle the cleaning, you focus on work.", "Office Cleaning": "Office Cleaning", "Siivous aukioloaikojen ulkopuolella: aamuisin, iltaisin tai viikonloppuisin.": "Cleaning outside opening hours: mornings, evenings or weekends.", "Koulutettu henkilökunta": "Trained staff", "Ammattitaitoisia, taustatarkistettuja ja vakuutettuja siivoojia.": "Skilled, background-checked and insured cleaners.", "Johdonmukainen laatu": "Consistent quality", "Siivouslistat ja tarkastukset varmistavat johdonmukaisen lopputuloksen.": "Cleaning checklists and inspections ensure consistent results.", "Ekologiset aineet": "Eco-friendly products", "Turvallisia henkilökunnalle ja asiakkaille.": "Safe for staff and customers.", "Hinta sovitaan tilojen koon ja siivoustarpeen mukaan. Otamme yhteyttä saman päivän aikana.": "Price agreed based on premises size and cleaning needs. We contact you the same day.", "Kuinka usein toimistosiivous kannattaa tehdä?": "How often should office cleaning be done?", "Riippuu toimiston koosta ja käyttäjämäärästä. Tyypillisesti 2–5 kertaa viikossa. Pienemmille toimistoille kerran viikossa riittää.": "Depends on office size and number of users. Typically 2-5 times a week. Once a week is enough for smaller offices.", "Voiko siivous tapahtua aukioloaikojen ulkopuolella?": "Can cleaning take place outside opening hours?", "Kyllä. Järjestämme siivouksen aamuisin, iltaisin tai viikonloppuisin niin, ettei se häiritse työskentelyä.": "Yes. We arrange cleaning in the mornings, evenings or weekends so it does not disrupt work.", "Miten hinta määräytyy toimistosiivouksessa?": "How is the price determined for office cleaning?", "Hinta sovitaan tilojen koon, siivoustiheyden ja tarpeiden mukaan. Pyydä maksuton kartoitus niin annamme tarjouksen.": "The price is agreed based on premises size, cleaning frequency and needs. Request a free assessment and we will give you a quote.", "Onko sopimus pitkäaikainen?": "Is the contract long-term?", "Ei ole pakko. Tarjoamme joustavia sopimuksia. Aloittaminen on helppoa ja lopettaminenkin joustavaa.": "It does not have to be. We offer flexible contracts. Starting is easy and ending is flexible too.", "Mitä ekologiset puhdistusaineet tarkoittavat käytännössä?": "What do eco-friendly cleaning products mean in practice?", "Käytämme hajusteettomia, ympäristöystävällisiä aineita jotka ovat turvallisia sekä henkilökunnalle että asiakkaille.": "We use fragrance-free, eco-friendly products that are safe for both staff and customers.", "Suursiivous · Helsinki & Espoo": "Deep Cleaning · Helsinki & Espoo", "Perusteellinen siivous joka nurkkaan": "Thorough cleaning in every corner", "Sopii kevätsiivoukseen, ennen juhlia tai kun koti kaipaa perusteellisen puhdistuksen.": "Ideal for spring cleaning, before a party, or when your home needs a thorough clean.", "Deep Cleaning": "Deep Cleaning", "ALV sisältyy hintaan. Suursiivous voidaan yhdistää ikkunanpesuun.": "VAT included. Deep cleaning can be combined with window cleaning.", "Suursiivous / Tehopuhdistus": "Deep Cleaning / Power Clean", "Mitä eroa on suursiivousella ja tavallisella kotisiivouksella?": "What is the difference between deep cleaning and regular home cleaning?", "Suursiivous on paljon perusteellisempi. Kaapit, kodinkoneet, seinät ja kaikki pinnat käydään läpi — ei vain ylläpito.": "Deep cleaning is much more thorough. Cupboards, appliances, walls and all surfaces are covered, not just maintenance.", "Kauanko suursiivous kestää?": "How long does deep cleaning take?", "Riippuu asunnon koosta ja kunnosta. Tavallisesti 3–6 tuntia. Annamme arvion etukäteen.": "Depends on the size and condition of the apartment. Usually 3-6 hours. We give an estimate in advance.", "Milloin suursiivous kannattaa tehdä?": "When should deep cleaning be done?", "Kevätsiivoukseen, ennen juhlia, muuton yhteydessä tai kerran vuodessa perusteelliseen puhdistukseen.": "For spring cleaning, before a party, when moving, or once a year for a thorough clean.", "Mitä minun tulee tehdä ennen siivousta?": "What do I need to do before the cleaning?", "Siirtää tavarat pois tieltä mahdollisuuksien mukaan. Me hoidamme kaiken muun.": "Move items out of the way as much as possible. We handle everything else.", "Voidaanko suursiivous yhdistää ikkunanpesuun?": "Can deep cleaning be combined with window cleaning?", "Kyllä — suosittu yhdistelmä. Kerro tarpeistasi niin sovitaan koko paketti kerralla.": "Yes, a popular combination. Tell us your needs and we will arrange the whole package at once.", "Erikoissiivous · Helsinki & Espoo": "Specialist Cleaning · Helsinki & Espoo", "Erikoiskohteet ammattitaidolla": "Specialist areas with expertise", "Erikoissiivous ammattitaidolla": "Specialist cleaning with expertise", "Sauna, parveke tai muu erikoiskohde. Räätälöimme palvelun tarpeen mukaan.": "Sauna, balcony or other special area. We tailor the service to your needs.", "Hinta sovitaan kohteen mukaan. Maksuton arvio saman päivän aikana.": "Price agreed based on the area. Free assessment the same day.", "Ota yhteyttä — sovitaan juuri sinulle sopiva ratkaisu.": "Get in touch and we will agree on a solution that suits you.", "Porrassiivous · Helsinki & Espoo": "Stairwell Cleaning · Helsinki & Espoo", "Porrassiivous, puhtaat yhteiset tilat": "Stairwell cleaning, clean shared spaces", "Siistiit portaat ja yhteiset tilat parantavat viihtyisyyttä ja turvallisuutta. Me hoidamme siivouksen säännöllisesti sovitun aikataulun mukaan.": "Clean stairs and shared spaces improve comfort and safety. We handle the cleaning regularly according to the agreed schedule.", "Säännöllinen ja luotettava": "Regular and reliable", "Siivous tapahtuu sovitun aikataulun mukaan. Voit luottaa siihen, että portaat ovat aina siistit.": "Cleaning takes place according to the agreed schedule. You can rely on the stairs always being clean.", "Joustava aikataulu": "Flexible schedule", "Sovitaan siivousväli tarpeidenne mukaan: viikoittain, joka toinen viikko tai kerran kuussa.": "We agree on cleaning intervals to suit your needs: weekly, every two weeks or once a month.", "Hinta sovitaan kohteen koon ja siivoustarpeen mukaan. Pyydä maksuton tarjous.": "Price agreed based on size and cleaning needs. Request a free quote.", "Maksuton arvio · Ei sitoumuksia": "Free assessment · No commitment", "Missä Cleava toimii?": "Where does Cleava operate?", "Pääkaupunkiseudulla: Helsinki, Espoo, Vantaa ja Kauniainen.": "In the Helsinki metropolitan area: Helsinki, Espoo, Vantaa and Kauniainen.", "Onko Cleava vakuutettu?": "Is Cleava insured?", "Kyllä. Kaikki siivoomme on vakuutettu. Jos jotain tapahtuu, me hoidamme sen.": "Yes. All our cleaning is insured. If something happens, we handle it.", "Käyttääkö Cleava ekologisia puhdistusaineita?": "Does Cleava use eco-friendly cleaning products?", "Kyllä. Käytämme hajusteettomia, ympäristöystävällisiä aineita jotka sopivat myös lapsiperheille ja lemmikkikodeille.": "Yes. We use fragrance-free, eco-friendly products suitable for families with children and pets.", "Miten voin tilata palvelun?": "How can I book the service?", "Helpoin tapa on täyttää tarjouslomakkeemme tai soittaa 045 187 8083. Vastaamme saman päivän aikana.": "The easiest way is to fill in our quote form or call 045 187 8083. We respond the same day.", "Yrityssiivous · Helsinki, Espoo & Vantaa": "Commercial Cleaning · Helsinki, Espoo & Vantaa", "Ammattimainen yrityssiivous, luotettava kumppani": "Professional commercial cleaning, a reliable partner", "Siistit toimitilat lisäävät tuottavuutta ja jättävät hyvän vaikutelman asiakkaisiin. Cleava hoitaa yrityksesi siivouksen — sovitusti, luotettavasti ja laadukkaasti.": "Clean premises increase productivity and leave a good impression. Cleava handles your business cleaning reliably and with quality.", "Toimistot ja toimitilat": "Offices and business premises", "Säännöllinen tai kertaluonteinen siivous kaikenkokoisiin toimistoihin.": "Regular or one-time cleaning for offices of all sizes.", "Myymälät ja liiketilat": "Shops and commercial spaces", "Siisti ja edustava liiketila parantaa asiakaskokemusta.": "A clean and presentable space improves the customer experience.", "Kiinteistön yhteisten tilojen siivous.": "Cleaning of the property shared spaces.", "Ravintolat ja suurtaloudet": "Restaurants and large kitchens", "Hygieeniset tilat elintarviketurvallisuusstandardien mukaan.": "Hygienic spaces according to food safety standards.", "Ikkunanpesu, lattiakäsittely ja muut erikoispalvelut.": "Window cleaning, floor treatment and other specialist services.", "Räätälöity sopimus": "Tailored contract", "Suunnittelemme palvelun juuri teidän tarpeidenne mukaan.": "We design the service to match your exact needs.", "Kuinka nopeasti voitte aloittaa?": "How quickly can you start?", "Yleensä 1–3 arkipäivän sisällä yhteydenotosta.": "Usually within 1-3 working days of contact.", "Voimmeko sopia säännöllisen sopimuksen?": "Can we agree on a regular contract?", "Kyllä — päivittäisiä, viikoittaisia ja kuukausittaisia sopimuksia.": "Yes, daily, weekly and monthly contracts available.", "Onko välineet mukana?": "Are supplies included?", "Kyllä, tuomme omat välineet ja ekologiset pesuaineet.": "Yes, we bring our own equipment and eco-friendly products.", "Myymäläsiivous · Helsinki, Espoo & Vantaa": "Retail Cleaning · Helsinki, Espoo & Vantaa", "Myymälä- ja liiketilasiivous, edustava joka päivä": "Retail and commercial space cleaning, presentable every day", "Pidämme myymäläsi ja liiketilasi siistinä ja houkuttelevana — ennen aukioloa, sen jälkeen tai molempina.": "We keep your shop and commercial space clean and attractive, before opening, after closing or both.", "Imurointi, moppaus ja pintojen pyyhintä päivittäin tai sovitusti.": "Vacuuming, mopping and wiping surfaces daily or as agreed.", "Kirkkaat näyteikkunat sisältä — houkuttelevat asiakkaita sisään.": "Clear display windows from inside, attracting customers in.", "WC-tilojen perusteellinen puhdistus ja desinfiointi.": "Thorough cleaning and disinfection of toilet facilities.", "Roskien tyhjennys ja kierrätys sovitun aikataulun mukaan.": "Waste removal and recycling according to the agreed schedule.", "Siivous ennen aukioloa, sen jälkeen tai molempina.": "Cleaning before opening, after closing or both.", "Kassapisteiden ja hyllyjen reunojen puhdistus.": "Cleaning of checkouts and shelf edges.", "Voitteko siivota kauppakeskuksessa?": "Can you clean in a shopping centre?", "Kyllä, meillä on kokemusta kauppakeskusten liiketiloista.": "Yes, we have experience with shopping centre commercial spaces.", "Saako aikataulun muuttaa?": "Can the schedule be changed?", "Kyllä, ilmoita muutoksesta vähintään 48 tuntia etukäteen.": "Yes, notify us at least 48 hours in advance.", "Käytättekö hajusteettomia tuotteita?": "Do you use fragrance-free products?", "Voimme käyttää hajusteettomia tuotteita pyydettäessä.": "We can use fragrance-free products on request.", "Ravintolasiivous · Helsinki, Espoo & Vantaa": "Restaurant Cleaning · Helsinki, Espoo & Vantaa", "Ravintola- ja suurtaloussiivous, hygienia etusijalla": "Restaurant and commercial kitchen cleaning, hygiene first", "Hygieeniset ja siistit tilat ovat ravintolan tärkein vaatimus. Huolehdimme keittiöistä, saleista ja tausta-alueista ammattimaisesti.": "Hygienic and clean spaces are the most important requirement for a restaurant. We professionally handle kitchens, dining rooms and back areas.", "Ammattikeittiöt": "Professional kitchens", "Rasvaisten pintojen, liesien, uunien ja huuvien puhdistus.": "Cleaning greasy surfaces, stoves, ovens and extractor hoods.", "Pöydät, tuolit, lattiat puhtaana joka päivä.": "Tables, chairs, floors clean every day.", "Desinfiointi": "Disinfection", "Omavalvontasuunnitelman mukainen desinfiointi kosketuspinnoille.": "Disinfection of touch surfaces according to the self-monitoring plan.", "Biojätteet, kierrätys ja roskien tyhjennys sovitusti.": "Biowaste, recycling and waste removal as agreed.", "Omavalvonta-tuki": "Self-monitoring support", "Siivouspäiväkirja ja dokumentointi omavalvontaa varten.": "Cleaning log and documentation for self-monitoring.", "Yösiivous": "Night cleaning", "Siivous aukioloajan ulkopuolella — aamulla tai yöllä.": "Cleaning outside opening hours, morning or night.", "Noudatatteko elintarvikehygieniavaatimuksia?": "Do you comply with food hygiene requirements?", "Kyllä, HACCP-periaatteiden mukaisesti.": "Yes, according to HACCP principles.", "Voitteko siivota yön aikana?": "Can you clean at night?", "Kyllä, tarjoamme yösiivouspalvelua.": "Yes, we offer a night cleaning service.", "Kuinka usein tarvitaan?": "How often is it needed?", "Useimmat ravintolat tarvitsevat päivittäisen palvelun.": "Most restaurants need daily service.", "Lattiahoito · Helsinki, Espoo & Vantaa": "Floor Maintenance · Helsinki, Espoo & Vantaa", "Lattioiden ylläpito, pitkäikäinen tulos": "Floor maintenance, long-lasting results", "Ammattimainen lattioiden hoito pidentää käyttöikää ja pitää tilat edustavina — kivi, laatta, parketti, laminaatti ja teollisuuslattiat.": "Professional floor care extends service life and keeps spaces presentable, stone, tile, parquet, laminate and industrial floors.", "Pesu ja kiillotus": "Washing and polishing", "Konepesulla ja kiillotuksella lattiasta tulee kuin uusi.": "Machine washing and polishing makes the floor look like new.", "Pinnoitus ja vahan ajo": "Coating and waxing", "Suojaava pinnoite kovaa kulutusta kestäville lattioille.": "Protective coating for high-traffic floors.", "Ylläpitopuhdistus": "Maintenance cleaning", "Päivittäinen tai viikoittainen ylläpito sovitusti.": "Daily or weekly maintenance as agreed.", "Teollisuuslattiat": "Industrial floors", "Epoksilattiat, betoni ja muut erikoismateriaalit.": "Epoxy floors, concrete and other specialist materials.", "Kivi- ja laattapinnat": "Stone and tile surfaces", "Graniitti, marmori, keramiikka — oikeat menetelmät.": "Granite, marble, ceramics, the right methods.", "Puu- ja laminaattilattiat": "Wood and laminate floors", "Turvallinen puhdistus ja hoito parketti-pinnoille.": "Safe cleaning and care for parquet surfaces.", "Kuinka usein tulisi käsitellä?": "How often should they be treated?", "Yleensä 1–4 kertaa vuodessa.": "Usually 1-4 times a year.", "Sopiiko koteihin?": "Suitable for homes?", "Kyllä, hoidamme myös kotien parketit ja kivilattiät.": "Yes, we also handle home parquet and stone floors.", "Poistatteko naarmuja?": "Do you remove scratches?", "Voimme vähentää naarmuja kiillotuksella.": "We can reduce scratches with polishing.", "Rakennussiivous · Helsinki, Espoo & Vantaa": "Post-construction Cleaning · Helsinki, Espoo & Vantaa", "Rakennus- ja loppusiivous, käyttövalmis tila": "Post-construction and final cleaning, ready to use", "Remontin tai rakentamisen jälkeinen perusteellinen siivous — poistetaan pöly, lika ja jätteet.": "Thorough cleaning after renovation or construction, dust, dirt and waste removed.", "Rakennuspölyn poisto": "Construction dust removal", "Kaikki pinnat ja nurkkat puhdistetaan rakennuspölystä.": "All surfaces and corners cleaned of construction dust.", "Ikkunat ja karmit": "Windows and frames", "Teipinjälkien ja maaliläiskien poisto ikkunoista.": "Removing tape marks and paint splashes from windows.", "Lattiat": "Floors", "Suojamuovien poisto ja lattioiden puhdistus.": "Removing protective plastics and cleaning floors.", "Kylpyhuone ja keittiö": "Bathroom and kitchen", "Kalkkijälkien ja rakennuslian perusteellinen poisto.": "Thorough removal of lime deposits and construction dirt.", "Loppusilaus": "Final polish", "Yksityiskohtainen tarkistus ennen luovutusta.": "Detailed inspection before handover.", "Jätteiden poisto": "Waste removal", "Pienet rakennusjätteet poistetaan sovitusti.": "Small construction waste removed as agreed.", "Kuinka kauan loppusiivous kestää?": "How long does final cleaning take?", "Tavallinen asunto vie 3–6 tuntia.": "A standard apartment takes 3-6 hours.", "Mitä tarvitaan ennen tiimiä?": "What is needed before the team arrives?", "Suuret rakennusjätteet tulee olla viety pois.": "Large construction waste must be removed.", "Teettekö saneerauskohteet?": "Do you handle renovation sites?", "Kyllä, myös laajat saneerauskohteet.": "Yes, including large renovation projects.", "Hinnat": "Prices", "Kotisiivous – hinnat": "Home Cleaning – Prices", "Kaikki hinnat sisältävät ALV:n. Kotisiivouspalveluista voit hakea kotitalousvähennystä.": "All prices include VAT. You can apply for the household tax deduction for home cleaning services.", "Kaikki hinnat sis. ALV. Kotitalousvähennys mahdollinen kotisiivouspalveluille.": "All prices incl. VAT. Household tax deduction possible for home cleaning services.", "ALV sisältyy hintaan.": "VAT included.", "Sisältyy ALV. Kotitalousvähennys mahdollinen.": "Includes VAT. Household tax deduction possible.", "Sisältyykö ALV kaikkiin hintoihin?": "Is VAT included in all prices?", "Kyllä. Kaikki Cleavan hinnat sisältävät arvonlisäveron. Ei piilokululja.": "Yes. All Cleava prices include VAT. No hidden fees.", "Miten kotitalousvähennys toimii?": "How does the household tax deduction work?", "Vähennys on 40% työn osuudesta, enintään 2 100€ henkilöä kohden vuodessa. Haetaan verotuksessa OmaVero-palvelussa.": "The deduction is 40% of the labour cost, up to 2,100 euros per person per year. Applied for in the MyTax service.", "Voinko muuttaa tai peruuttaa tilauksen?": "Can I change or cancel the booking?", "Kyllä. Peruutus on maksuton kun ilmoitat yli 48 tuntia etukäteen. Katso tarkat peruutusehdot palveluehdoistamme.": "Yes. Cancellation is free if you notify us more than 48 hours in advance.", "Onko minimiveloitusta?": "Is there a minimum charge?", "Kotisiivouksessa minimitilaus on 2 tuntia. Muissa palveluissa sovitaan erikseen kohteen mukaan.": "For home cleaning the minimum order is 2 hours. For other services it is agreed separately.", "Kotitalousvähennys": "Household tax deduction", "Kotisiivouspalveluista voit hakea kotitalousvähennystä.": "You can apply for the household tax deduction for home cleaning services.", "Vähennys on 40% työn osuudesta, enintään 2 100€ henkilöä kohden vuodessa.": "The deduction is 40% of the labour cost, up to 2,100 euros per person per year.", "Omavastuu on 150€.": "The excess is 150 euros.", "Vähennys haetaan OmaVero-palvelussa.": "The deduction is applied for in the MyTax service.", "Viikoittain": "Weekly", "Joka toinen viikko": "Every two weeks", "Kerran kuussa": "Once a month", "Hinta": "Price", "Alkaen": "From", "Paketti": "Package", "Perussiivous": "Basic cleaning", "Jatkuva ylläpito": "Ongoing maintenance", "Hinta sovitaan tapauskohtaisesti.": "Price agreed on a case-by-case basis.", "Kapina kaaosta vastaan": "A rebellion against chaos", "Tervetuloa Cleavaan – paikkaan, jossa puhtaus kohtaa luottamuksen": "Welcome to Cleava, where cleanliness meets trust", "Cleava syntyi aidosta tarpeesta. Tässä on tarina siitä, miksi ja miten.": "Cleava was born from a genuine need. Here is the story of why and how.", "Cleava lyhyesti": "Cleava in brief", "Tyytyväistä asiakasta": "Satisfied customers", "Pääkaupunkiseutu": "Helsinki Metro Area", "Yrityksen nimi": "Company name", "Y-tunnus": "Business ID", "Osoite": "Address", "Asiakaspalvelu": "Customer service", "Ma–Pe 8–18, La–Su 12–16": "Mon-Fri 8-18, Sat-Sun 12-16", "Mansio Group Oy (aputoiminimi Cleava Siivouspalvelut)": "Mansio Group Oy (aputoiminimi Cleava Siivouspalvelut)", "Miten kaikki alkoi": "How it all began", "Mitä Cleava edustaa": "What Cleava stands for", "Ihmislähtöinen työ": "People-centred work", "Onnelliset työntekijät luovat onnellisia koteja. Kohtelemme jokaista tiimin jäsentä kunnioituksella, tarjoamme reilun palkan ja turvallisen työympäristön.": "Happy employees create happy homes. We treat every team member with respect, offer fair pay and a safe working environment.", "Yksilöllinen palvelu": "Individual service", "Räätälöimme palvelun elämäntapasi ja aikataulusi mukaan.": "We tailor the service to your lifestyle and schedule.", "Nastia, Cleavan perustaja": "Nastia, founder of Cleava", "Cleava Lahjakortti – anna puhdas koti lahjaksi": "Cleava Gift Card, give a clean home as a gift", "Cleava-lahjakortti on täydellinen lahja ystävälle, perheelle tai itsellesi.": "The Cleava gift card is the perfect gift for a friend, family or yourself.", "Valitse sinulle sopiva lahjakortti": "Choose the right gift card for you", "Täydellinen kertaluonteiseen siivoukseen tai pienempään kotiin.": "Perfect for a one-time cleaning or a smaller home.", "Sopii isommalle asunnolle tai perusteellisempaan siivoukseen.": "Suitable for a larger apartment or more thorough cleaning.", "Isoimmille kodeille tai muuttosiivoukseen.": "For larger homes or moving cleaning.", "Valitse tai kirjoita summa:": "Choose or enter amount:", "Täytä tilauksen tiedot": "Fill in your order details", "Valitse paketti yllä": "Select a package above", "Sähköposti *": "Email *", "Hyväksyn palveluehdot ja lahjakortin ehdot.": "I accept the terms of service and gift card terms.", "Lahjakortti on voimassa 12 kuukautta ostopäivästä.": "The gift card is valid for 12 months from the date of purchase.", "Maksa": "Pay", "Siirrytään maksuun...": "Proceeding to payment...", "Tärkeää tietää ennen ostamista": "Important to know before purchasing", "Kysymyksiä?": "Questions?", "Tilaa siivous": "Book cleaning", "Täytä varauslomake": "Fill in the booking form", "Otamme yhteyttä ja vahvistamme ajankohdan.": "We will contact you and confirm the time.", "Kertaluonteinen siivous": "One-time cleaning", "Säännöllinen siivous": "Regular cleaning", "Lisäpalvelut (valinnainen)": "Additional services (optional)", "Uunin puhdistus": "Oven cleaning", "Jääkaapin puhdistus": "Fridge cleaning", "Parvekkeen siivous": "Balcony cleaning", "Kaappien sisäpuolet": "Inside cabinets", "Lisätiedot (valinnainen)": "Additional notes (optional)", "Lähetä varauslomake": "Send booking form", "Lähetetään...": "Sending...", "Vahvistamme saatavuuden tekstiviestillä, WhatsAppilla tai sähköpostilla.": "We confirm availability by text, WhatsApp or email.", "Varaa nyt": "Book now", "✓ Lähetetty!": "✓ Sent!", "Takaisin etusivulle": "Back to home", "Soita meille": "Call us", "Pyydä yritystarjous": "Request a business quote", "Pyydä yhteydenottoa": "Request a callback", "Ennen juhlia": "Before a party", "Asunnon myyntiä tai vuokrausta varten": "For selling or renting an apartment", "Joka toinen viikko suosittelemin": "Every two weeks recommended", "Yrityssiivous": "Commercial Cleaning", "️ Ravintola- ja suurtaloussiivous": "️ Restaurant Cleaning", "✨ Lattioiden ylläpito": "Floor Maintenance", "🎁 Lahjakortit": "🎁 Gift Cards", "3 päivää sitten": "3 days ago", "6 päivää sitten": "6 days ago", "Viikko sitten": "1 week ago", "2 viikkoa sitten": "2 weeks ago", "3 viikkoa sitten": "3 weeks ago", "1 kuukausi sitten": "1 month ago", "2 kuukautta sitten": "2 months ago", "3 kuukautta sitten": "3 months ago", "4 kuukautta sitten": "4 months ago", "5 kuukautta sitten": "5 months ago", "6 kuukautta sitten": "6 months ago", "7 kuukautta sitten": "7 months ago", "Palvelemme näillä alueilla": "We serve in these areas", "Tutustu muihin palveluihin": "Discover our other services", "Taustatarkistetut ammattilaiset": "Background-checked professionals", "Räätälöity palvelu juuri sinulle": "Service tailored just for you", "Luotettavuus ja joustavuus": "Reliability and flexibility", "Palvelutyyppi": "Service type", "Kohteen tiedot": "Property details", "Siivoustyyppi": "Cleaning type", "Toistuva siivous": "Regular cleaning", "Yhteystiedot": "Contact details", "Toivottu ajankohta": "Preferred time", "Koko m²": "Size m²", "Kellonaika": "Time", "Katuosoite": "Street address", "Kaupunki": "City", "Etunimi Sukunimi": "First name Last name", "Parveke": "Balcony"}
var I18N_FI = {"Fully insured": "Täysin vakuutettu", "4.9/5 Google reviews": "4.9/5 Google-arviot", "Response within 24h": "Vastaus 24h sisällä", "Trained professionals": "Koulutetut ammattilaiset", "No commitment": "Ei sitoutumista", "Home": "Etusivu", "Home Cleaning": "Kotisiivous", "Moving Cleaning": "Moving Cleaning", "Window Cleaning": "Ikkunanpesu", "Specialist Cleaning": "Erikoissiivous", "Commercial Cleaning": "Yrityssiivous", "Office Cleaning": "Toimistosiivous", "Retail & Commercial Cleaning": "Myymälä- ja liiketilasiivous", "Stairwell Cleaning": "Porrassiivous", "Restaurant & Kitchen Cleaning": "Ravintola- ja suurtaloussiivous", "Floor Maintenance": "Lattioiden ylläpito", "Deep Cleaning": "Suursiivous", "Pricing": "Hinnasto", "Our Story": "Tarinamme", "Gift Cards": "Lahjakortit", "Gift Cards 🎁": "Lahjakortit 🎁", "Book Cleaning": "Tilaa Siivous", "Call": "Soita", "or": "tai", "HELSINKI · ESPOO · VANTAA · KAUNIAINEN": "HELSINKI · ESPOO · VANTAA · KAUNIAINEN", "A cleaner home,": "Siistimpi koti,", "easier everyday life": "helpompi arki", "Professional cleaning services for homes and offices in Helsinki, Espoo and Vantaa. Our expert cleaners handle the cleaning. You spend the time on what matters.": "Edullisia siivouspalveluja kotiin ja toimistoon Helsingissä, Espoossa ja Vantaalla. Ammattitaitoiset siivoojamme huolehtivat puhtaudesta. Sinä käytät ajan muuhun.", "Google rating": "Google-arviointi", "Satisfaction guarantee": "Tyytyväisyystakuu", "Response guarantee": "Vastaustakuu", "Request a free quote": "Pyydä ilmainen tarjous", "Request quote now →": "Pyydä tarjous nyt →", "No commitment · 100% free quote": "Ei sitoumuksia · 100% ilmainen tarjous", "We respond the same day": "Vastaamme saman päivän aikana", "Service": "Palvelu", "Select service": "Valitse palvelu", "Postal code": "Postinumero", "Phone": "Puhelin", "How it works": "Näin se toimii", "Easy cleaning in four steps": "Siivous helposti, neljässä vaiheessa", "We have made the process as smooth as possible.": "Olemme tehneet prosessista mahdollisimman sujuvan.", "Request quote": "Pyydä tarjous", "Leave your postal code and phone number. We will make a quote the same day.": "Jätä postinumero ja puhelinnumero. Teemme tarjouksen saman päivän aikana.", "We agree on a time": "Sovitaan ajankohta", "We will contact you and agree on a suitable time.": "Otamme yhteyttä ja sovitaan sinulle sopiva ajankohta.", "Professionals handle it": "Ammattilaiset hoitavat", "Cleaners arrive at the agreed time. No need to be present.": "Siivoojat tulevat sovittuna aikana. Ei tarvitse olla paikalla.", "Enjoy a clean home": "Nauti puhtaasta kodista", "If you are disappointed with the result, we will fix it free of charge.": "Jos olet pettynyt lopputulokseen, korjaamme sen veloituksetta.", "What can we do for you?": "Mitä voimme tehdä puolestasi?", "We tailor every cleaning service to your needs.": "Räätälöimme jokaisen siivouspalvelun tarpeidesi mukaan.", "Regular or one-time cleaning. The same familiar cleaner every time.": "Säännöllinen tai kertasiivous. Sama tuttu siivooja joka kerta.", "Thorough cleaning when moving. Satisfaction guarantee.": "Perusteellinen siivous muuton yhteydessä. Tyytyväisyystakuu.", "A clean office increases comfort and productivity.": "Puhdas toimisto lisää viihtyvyyttä ja tuottavuutta.", "Clear windows bring light and joy to the home.": "Kirkkaat ikkunat tuovat valoa ja iloa kotiin.", "Thorough deep cleaning in every corner. Ideal for spring cleaning.": "Perusteellinen suursiivous joka nurkkaan. Ihanteellinen kevätsiivoukseen.", "Sauna, balcony or special areas. Tailored solution.": "Sauna, parveke tai erikoiskohteet. Räätälöity ratkaisu.", "Read more": "Lue lisää", "Why Cleava?": "Miksi Cleava?", "Why our customers keep coming back": "Miksi asiakkaamme palaavat aina uudelleen", "Fully insured service": "Täysin vakuutettu palvelu", "Every cleaning is insured. If something happens, we handle it.": "Jokainen siivous on vakuutettu. Jos jotain tapahtuu, me hoidamme sen.", "Carefully selected professionals": "Huolellisesti valitut ammattilaiset", "All our cleaners are background-checked. You feel safe at home.": "Kaikki siivoojamme ovat taustatarkistettuja. Tunnet olosi turvalliseksi kotona.", "100% satisfaction guarantee": "100% satisfaction guarantee", "If you are not satisfied, we will return to fix it free of charge.": "Jos et ole tyytyväinen, palaamme korjaamaan veloituksetta.", "Clear pricing, no surprises": "Selkeä hinnoittelu, ei yllätyksiä", "Quote always in advance. No hidden fees.": "Tarjous aina etukäteen. Ei piilomaksuja.", "Customer reviews": "Asiakaspalautteet", "What our customers say": "Mitä asiakkaamme sanovat", "Service areas": "Palvelualueet", "We serve the Helsinki metropolitan area": "Palvelemme pääkaupunkiseudulla", "We currently serve the Helsinki metropolitan area.": "Palvelemme tällä hetkellä pääkaupunkiseudulla.", "Questions or thoughts?": "Kysymyksiä tai ajatuksia?", "Call or leave your contact details.": "Soita tai jätä yhteystietosi.", "Want a clean home or office?": "Haluatko siistin kodin tai toimiston?", "We will contact you within 24 hours.": "Otamme yhteyttä 24h sisällä.", "Interested in home cleaning?": "Kiinnostiko kotisiivous?", "Call or leave your phone number.": "Soita tai jätä puhelinnumerosi.", "Request a home cleaning quote": "Pyydä kotisiivoustarjous", "Moving soon?": "Muutto edessä?", "Request a moving cleaning quote": "Pyydä muuttosiivouksen tarjous", "Interested in window cleaning?": "Kiinnostiko ikkunanpesu?", "Request a window cleaning quote": "Pyydä ikkunanpesun tarjous", "Interested in office cleaning?": "Kiinnostiko toimistosiivous?", "Request an office cleaning quote": "Pyydä toimistosiivouksen tarjous", "Reliable cleaning services in the Helsinki metropolitan area. Home, moving, office cleaning and window cleaning with expertise.": "Luotettavia siivouspalveluja pääkaupunkiseudulla. Kotisiivous, muuttosiivous, toimistosiivous ja ikkunanpesu ammattitaidolla.", "Services": "Palvelut", "Company": "Yritys", "Terms of Service": "Palveluehdot", "Privacy Policy": "Tietosuoja", "Cookies": "Evästeet", "Privacy & Terms": "Tietosuoja & Palveluehdot", "Cookie Policy": "Evästekäytäntö", "Gift Card": "Lahjakortti", "Business ID:": "Y-tunnus:", "About": "Tietoa", "All rights reserved.": "Kaikki oikeudet pidätetään.", "Home Cleaning · Helsinki & Espoo": "Kotisiivous · Helsinki & Espoo", "Home cleaning that eases your daily life": "Kotisiivous, joka helpottaa arkeasi", "Affordable home cleaning in Helsinki, Espoo and Vantaa — from 39 €/tunti. One-time or regular. 100% satisfaction guarantee.": "Edullinen kotisiivous Helsingissä, Espoossa ja Vantaalla — alkaen 39 €/tunti. Kertaluonteinen tai säännöllinen. 100% tyytyväisyystakuu.", "Our guarantee": "Our guarantee", "Why choose Cleava?": "Miksi valita Cleava?", "Every cleaning includes these promises.": "Jokaiseen siivoukseen sisältyy nämä lupaukset.", "If the result is not satisfactory, we will return to fix it free of charge.": "Jos lopputulos ei miellytä, palaamme korjaamaan veloituksetta.", "Background-checked professionals": "Background-checked professionals", "All our cleaners are background-checked and trained.": "Kaikki siivoojamme on taustatarkistettu ja koulutettu.", "Eco-friendly cleaning products": "Ekologiset puhdistusaineet", "Fragrance-free and eco-friendly. Safe for families and pet homes.": "Hajusteettomia ja ympäristöystävällisiä. Turvallisia perheille ja lemmikkikodeille.", "What is included": "Mitä sisältyy", "Service contents": "Palvelun sisältö", "Vacuuming and floor washing in all rooms": "Imurointi ja lattioiden pesu kaikissa huoneissa", "Dusting surfaces, shelves and furniture": "Pölyjen pyyhintä pinnoilta, hyllyiltä ja kalusteista", "Thorough cleaning of bathroom and toilet": "Kylpyhuoneen ja WC:n perusteellinen puhdistus", "Cleaning kitchen countertops, stove and sink": "Keittiön tasopintojen, lieden ja altaan siivous", "Emptying bins and replacing bags": "Roskien tyhjennys ja pussien vaihto", "Cleaning mirrors and glass surfaces": "Peilien ja lasipintojen puhdistus", "Optional extras: oven cleaning, fridge cleaning, inside cabinets": "Lisäpalveluna: uunin puhdistus, jääkaapin puhdistus, kaappien sisäpuolet", "Clear pricing": "Selkeä hinta", "Weekly 39 €/tunti · Every two weeks 45 €/tunti · Once a month 49 €/tunti. VAT included.": "Viikoittain 39 €/tunti · Joka toinen viikko 45 €/tunti · Kerran kuussa 49 €/tunti. ALV sisältyy hintaan.", "Household tax deduction possible.": "Kotitalousvähennys mahdollinen.", "FAQ": "FAQ", "Frequently asked questions": "Usein kysytyt kysymykset", "How often should I book home cleaning?": "Kuinka usein kotisiivous kannattaa tilata?", "It depends on your home and lifestyle. The most common choice is every two weeks. Weekly cleaning works well for families or pet homes.": "Se riippuu kodistasi ja elämäntilanteestasi. Yleisin valinta on joka toinen viikko. Perheille tai lemmikkikodeille viikoittainen siivous sopii hyvin.", "Do I need to be home during the cleaning?": "Pitääkö minun olla kotona siivouksen aikana?", "No need. You can leave a key or code for the cleaner. Our cleaners are background-checked and insured.": "Ei tarvitse. Voit luovuttaa avaimen tai koodin siivoojalle. Siivoojamme ovat taustatarkistettuja ja vakuutettuja.", "What supplies does the cleaner bring?": "Mitä tarvikkeet siivooja tuo mukanaan?", "Cleaners bring their own equipment and products. If you have specific preferences or allergies, please let us know in advance.": "Siivoojat tuovat omat välineet ja puhdistusaineet. Jos sinulla on erityistoiveita aineista tai allergia, kerrothan siitä etukäteen.", "Can I request the same cleaner every time?": "Voinko pyytää samaa siivoojaa joka kerta?", "Yes. We aim to send the same familiar cleaner every time, if possible.": "Kyllä. Pyrimme lähettämään saman tutun siivooja joka kerralla, jos mahdollista.", "What if the result is not satisfactory?": "Mitä jos lopputulos ei miellytä?", "Contact us within 24 hours and we will return to fix any issues free of charge. The satisfaction guarantee is important to us.": "Ota yhteyttä 24 tunnin sisällä ja palaamme korjaamaan puutteet veloituksetta. Tyytyväisyystakuu on meille tärkeä.", "Moving Cleaning · Helsinki, Espoo & Vantaa": "Muuttosiivous · Helsinki, Espoo & Vantaa", "Moving cleaning, a carefree start in your new home": "Muuttosiivous, huoleton alku uuteen kotiin", "Moving cleaning done thoroughly. The home is left in handover condition.": "Muuttosiivous tehtynä huolellisesti. Koti jätetään luovutuskuntoon.", "Comprehensive moving cleaning from start to finish. VAT included.": "Kattava muuttosiivous alusta loppuun. ALV sisältyy hintaan.", "When should moving cleaning be done?": "Milloin muuttosiivous kannattaa tehdä?", "Usually on the handover day or the day before. We agree on a schedule to suit your move.": "Useimmiten vanhan kodin luovutuspäivänä tai sitä edeltävänä päivänä. Sovitaan aikataulu muuttosi mukaan.", "What is the difference between move-out and move-in cleaning?": "Mitä eroa on lähtö- ja tulosiivouksella?", "Move-out cleaning is done when you leave. Move-in cleaning is done in the new home before moving in.": "Lähtösiivous tehdään kun muutat pois — koti jätetään luovutuskuntoon. Tulosiivous tehdään uuteen kotiin ennen muuttamista.", "Is moving cleaning different from regular home cleaning?": "Onko muuttosiivous erilainen kuin normaali kotisiivous?", "Yes. Moving cleaning is much more thorough — cupboards, appliances, ovens and all surfaces are covered carefully.": "Kyllä. Muuttosiivous on paljon perusteellisempi — kaapit, kodinkoneet, uunit ja kaikki pinnat käydään läpi huolellisesti.", "Does moving cleaning meet inspection requirements?": "Kattaako muuttosiivous tarkastuksen vaatimukset?", "We always aim to meet the landlord requirements. If any issues arise during inspection, we will return to fix them free of charge.": "Pyrimme aina täyttämään vuokranantajan tai kiinteistönvälittäjän vaatimukset. Jos tarkastuksessa ilmenee huomautuksia, palaamme korjaamaan veloituksetta.", "Do I need to be present?": "Tarvitseeko minun olla paikalla?", "No need. We agree on a time and we handle the cleaning.": "Ei tarvitse. Sovitaan ajankohta — muutat rauhassa ja me hoidamme siivouksen.", "Window Cleaning · Helsinki & Espoo": "Ikkunanpesu · Helsinki & Espoo", "Crystal clear windows, more light at home": "Kirkkaat ikkunat, enemmän valoa kotiin", "Professionally cleaned windows bring light to your home. We handle both inside and outside.": "Ammattimaisesti pestyt ikkunat tuovat valoa kotiin. Hoidamme sekä sisä- että ulkopuolen.", "Professionally cleaned windows bring light and make your home more comfortable. We handle both inside and outside.": "Ammattimaisesti pestyt ikkunat tuovat valoa ja tekevät asunnosta viihtyisämmän. Hoidamme sekä sisä- että ulkopuolen.", "Washing window glass inside and outside": "Ikkunan lasin pesu sisältä ja ulkoa", "Wiping window frames and trims": "Ikkunanpuitteiden ja listojen pyyhintä", "Cleaning frames and handles": "Karmien ja helkojen puhdistus", "Window sills wiped at the same time": "Ikkunalaudat pyyhitään samalla", "Balcony doors and glass structures": "Parvekkeen ovet ja lasirakenteet", "Terrace and balcony glass by agreement": "Terassi- ja parvekelasit sovitusti", "No need to be home": "Ei tarvitse olla kotona", "VAT included. Window cleaning can be combined with home cleaning.": "ALV sisältyy hintaan. Ikkunanpesun voi yhdistää kotisiivoukseen.", "How often should windows be cleaned?": "Kuinka usein ikkunat kannattaa pestä?", "We recommend 1-2 times a year. More often near busy roads or construction sites.": "Suosittelemme 1–2 kertaa vuodessa. Vilkasliikenteisten teiden varrella tai rakennustyömaiden lähellä useammin.", "Are windows also cleaned on the outside?": "Pestäänkö ikkunat myös ulkopuolelta?", "Yes, we handle both inside and outside. Balcony doors and terrace glass included by agreement.": "Kyllä, hoidamme sekä sisä- että ulkopuolen. Parvekkeen ovet ja terassilasit sisältyvät sovitusti.", "When is the best time for window cleaning?": "Milloin ikkunanpesu onnistuu parhaiten?", "Best on cloudy days. Direct sunlight can leave streaks on drying glass.": "Parhaiten pilvisellä tai puolipilvisellä säällä. Suora aurinko voi jättää tahroja kuivuvaan lasiin.", "Can window cleaning be combined with home cleaning?": "Voidaanko ikkunanpesu yhdistää kotisiivoukseen?", "Yes. A combined service is convenient and often cheaper than ordering separately.": "Kyllä. Yhdistetty palvelu on kätevä ja usein edullisempi kuin erikseen tilattuna.", "No need. We agree on a time and you come home to sparkling windows.": "Ei tarvitse. Sovitaan sopiva ajankohta — löydät kirkkaat ikkunat kotiinpalatessasi.", "No. We agree on a time and our cleaners handle everything. You come home to sparkling windows.": "Ei. Sovitaan ajankohta ja siivoojamme hoitavat kaiken. Löydät kirkkaat ikkunat kotiinpalatessasi.", "Office Cleaning · Helsinki & Espoo": "Toimistosiivous · Helsinki & Espoo", "Office cleaning, a pleasant working environment": "Toimistosiivous, viihtyisä työympäristö", "A clean office increases comfort and productivity. We handle the cleaning, you focus on work.": "Puhdas toimisto lisää viihtyvyyttä ja tuottavuutta. Me hoidamme siivouksen, sinä keskityt työhön.", "Cleaning outside opening hours: mornings, evenings or weekends.": "Siivous aukioloaikojen ulkopuolella: aamuisin, iltaisin tai viikonloppuisin.", "Trained staff": "Koulutettu henkilökunta", "Skilled, background-checked and insured cleaners.": "Ammattitaitoisia, taustatarkistettuja ja vakuutettuja siivoojia.", "Consistent quality": "Johdonmukainen laatu", "Cleaning checklists and inspections ensure consistent results.": "Siivouslistat ja tarkastukset varmistavat johdonmukaisen lopputuloksen.", "Eco-friendly products": "Ekologiset aineet", "Safe for staff and customers.": "Turvallisia henkilökunnalle ja asiakkaille.", "Price agreed based on premises size and cleaning needs. We contact you the same day.": "Hinta sovitaan tilojen koon ja siivoustarpeen mukaan. Otamme yhteyttä saman päivän aikana.", "How often should office cleaning be done?": "Kuinka usein toimistosiivous kannattaa tehdä?", "Depends on office size and number of users. Typically 2-5 times a week. Once a week is enough for smaller offices.": "Riippuu toimiston koosta ja käyttäjämäärästä. Tyypillisesti 2–5 kertaa viikossa. Pienemmille toimistoille kerran viikossa riittää.", "Can cleaning take place outside opening hours?": "Voiko siivous tapahtua aukioloaikojen ulkopuolella?", "Yes. We arrange cleaning in the mornings, evenings or weekends so it does not disrupt work.": "Kyllä. Järjestämme siivouksen aamuisin, iltaisin tai viikonloppuisin niin, ettei se häiritse työskentelyä.", "How is the price determined for office cleaning?": "Miten hinta määräytyy toimistosiivouksessa?", "The price is agreed based on premises size, cleaning frequency and needs. Request a free assessment and we will give you a quote.": "Hinta sovitaan tilojen koon, siivoustiheyden ja tarpeiden mukaan. Pyydä maksuton kartoitus niin annamme tarjouksen.", "Is the contract long-term?": "Onko sopimus pitkäaikainen?", "It does not have to be. We offer flexible contracts. Starting is easy and ending is flexible too.": "Ei ole pakko. Tarjoamme joustavia sopimuksia. Aloittaminen on helppoa ja lopettaminenkin joustavaa.", "What do eco-friendly cleaning products mean in practice?": "Mitä ekologiset puhdistusaineet tarkoittavat käytännössä?", "We use fragrance-free, eco-friendly products that are safe for both staff and customers.": "Käytämme hajusteettomia, ympäristöystävällisiä aineita jotka ovat turvallisia sekä henkilökunnalle että asiakkaille.", "Deep Cleaning · Helsinki & Espoo": "Suursiivous · Helsinki & Espoo", "Thorough cleaning in every corner": "Perusteellinen siivous joka nurkkaan", "Ideal for spring cleaning, before a party, or when your home needs a thorough clean.": "Sopii kevätsiivoukseen, ennen juhlia tai kun koti kaipaa perusteellisen puhdistuksen.", "VAT included. Deep cleaning can be combined with window cleaning.": "ALV sisältyy hintaan. Suursiivous voidaan yhdistää ikkunanpesuun.", "Deep Cleaning / Power Clean": "Suursiivous / Tehopuhdistus", "What is the difference between deep cleaning and regular home cleaning?": "Mitä eroa on suursiivousella ja tavallisella kotisiivouksella?", "Deep cleaning is much more thorough. Cupboards, appliances, walls and all surfaces are covered, not just maintenance.": "Suursiivous on paljon perusteellisempi. Kaapit, kodinkoneet, seinät ja kaikki pinnat käydään läpi — ei vain ylläpito.", "How long does deep cleaning take?": "Kauanko suursiivous kestää?", "Depends on the size and condition of the apartment. Usually 3-6 hours. We give an estimate in advance.": "Riippuu asunnon koosta ja kunnosta. Tavallisesti 3–6 tuntia. Annamme arvion etukäteen.", "When should deep cleaning be done?": "Milloin suursiivous kannattaa tehdä?", "For spring cleaning, before a party, when moving, or once a year for a thorough clean.": "Kevätsiivoukseen, ennen juhlia, muuton yhteydessä tai kerran vuodessa perusteelliseen puhdistukseen.", "What do I need to do before the cleaning?": "Mitä minun tulee tehdä ennen siivousta?", "Move items out of the way as much as possible. We handle everything else.": "Siirtää tavarat pois tieltä mahdollisuuksien mukaan. Me hoidamme kaiken muun.", "Can deep cleaning be combined with window cleaning?": "Voidaanko suursiivous yhdistää ikkunanpesuun?", "Yes, a popular combination. Tell us your needs and we will arrange the whole package at once.": "Kyllä — suosittu yhdistelmä. Kerro tarpeistasi niin sovitaan koko paketti kerralla.", "Specialist Cleaning · Helsinki & Espoo": "Erikoissiivous · Helsinki & Espoo", "Specialist areas with expertise": "Erikoiskohteet ammattitaidolla", "Specialist cleaning with expertise": "Erikoissiivous ammattitaidolla", "Sauna, balcony or other special area. We tailor the service to your needs.": "Sauna, parveke tai muu erikoiskohde. Räätälöimme palvelun tarpeen mukaan.", "Price agreed based on the area. Free assessment the same day.": "Hinta sovitaan kohteen mukaan. Maksuton arvio saman päivän aikana.", "Get in touch and we will agree on a solution that suits you.": "Ota yhteyttä — sovitaan juuri sinulle sopiva ratkaisu.", "Stairwell Cleaning · Helsinki & Espoo": "Porrassiivous · Helsinki & Espoo", "Stairwell cleaning, clean shared spaces": "Porrassiivous, puhtaat yhteiset tilat", "Clean stairs and shared spaces improve comfort and safety. We handle the cleaning regularly according to the agreed schedule.": "Siistiit portaat ja yhteiset tilat parantavat viihtyisyyttä ja turvallisuutta. Me hoidamme siivouksen säännöllisesti sovitun aikataulun mukaan.", "Regular and reliable": "Säännöllinen ja luotettava", "Cleaning takes place according to the agreed schedule. You can rely on the stairs always being clean.": "Siivous tapahtuu sovitun aikataulun mukaan. Voit luottaa siihen, että portaat ovat aina siistit.", "Flexible schedule": "Joustava aikataulu", "We agree on cleaning intervals to suit your needs: weekly, every two weeks or once a month.": "Sovitaan siivousväli tarpeidenne mukaan: viikoittain, joka toinen viikko tai kerran kuussa.", "Price agreed based on size and cleaning needs. Request a free quote.": "Hinta sovitaan kohteen koon ja siivoustarpeen mukaan. Pyydä maksuton tarjous.", "Free assessment · No commitment": "Maksuton arvio · Ei sitoumuksia", "Where does Cleava operate?": "Missä Cleava toimii?", "In the Helsinki metropolitan area: Helsinki, Espoo, Vantaa and Kauniainen.": "Pääkaupunkiseudulla: Helsinki, Espoo, Vantaa ja Kauniainen.", "Is Cleava insured?": "Onko Cleava vakuutettu?", "Yes. All our cleaning is insured. If something happens, we handle it.": "Kyllä. Kaikki siivoomme on vakuutettu. Jos jotain tapahtuu, me hoidamme sen.", "Does Cleava use eco-friendly cleaning products?": "Käyttääkö Cleava ekologisia puhdistusaineita?", "Yes. We use fragrance-free, eco-friendly products suitable for families with children and pets.": "Kyllä. Käytämme hajusteettomia, ympäristöystävällisiä aineita jotka sopivat myös lapsiperheille ja lemmikkikodeille.", "How can I book the service?": "Miten voin tilata palvelun?", "The easiest way is to fill in our quote form or call 045 187 8083. We respond the same day.": "Helpoin tapa on täyttää tarjouslomakkeemme tai soittaa 045 187 8083. Vastaamme saman päivän aikana.", "Commercial Cleaning · Helsinki, Espoo & Vantaa": "Yrityssiivous · Helsinki, Espoo & Vantaa", "Professional commercial cleaning, a reliable partner": "Ammattimainen yrityssiivous, luotettava kumppani", "Clean premises increase productivity and leave a good impression. Cleava handles your business cleaning reliably and with quality.": "Siistit toimitilat lisäävät tuottavuutta ja jättävät hyvän vaikutelman asiakkaisiin. Cleava hoitaa yrityksesi siivouksen — sovitusti, luotettavasti ja laadukkaasti.", "Offices and business premises": "Toimistot ja toimitilat", "Regular or one-time cleaning for offices of all sizes.": "Säännöllinen tai kertaluonteinen siivous kaikenkokoisiin toimistoihin.", "Shops and commercial spaces": "Myymälät ja liiketilat", "A clean and presentable space improves the customer experience.": "Siisti ja edustava liiketila parantaa asiakaskokemusta.", "Cleaning of the property shared spaces.": "Kiinteistön yhteisten tilojen siivous.", "Restaurants and large kitchens": "Ravintolat ja suurtaloudet", "Hygienic spaces according to food safety standards.": "Hygieeniset tilat elintarviketurvallisuusstandardien mukaan.", "Window cleaning, floor treatment and other specialist services.": "Ikkunanpesu, lattiakäsittely ja muut erikoispalvelut.", "Tailored contract": "Räätälöity sopimus", "We design the service to match your exact needs.": "Suunnittelemme palvelun juuri teidän tarpeidenne mukaan.", "How quickly can you start?": "Kuinka nopeasti voitte aloittaa?", "Usually within 1-3 working days of contact.": "Yleensä 1–3 arkipäivän sisällä yhteydenotosta.", "Can we agree on a regular contract?": "Voimmeko sopia säännöllisen sopimuksen?", "Yes, daily, weekly and monthly contracts available.": "Kyllä — päivittäisiä, viikoittaisia ja kuukausittaisia sopimuksia.", "Are supplies included?": "Onko välineet mukana?", "Yes, we bring our own equipment and eco-friendly products.": "Kyllä, tuomme omat välineet ja ekologiset pesuaineet.", "Retail Cleaning · Helsinki, Espoo & Vantaa": "Myymäläsiivous · Helsinki, Espoo & Vantaa", "Retail and commercial space cleaning, presentable every day": "Myymälä- ja liiketilasiivous, edustava joka päivä", "We keep your shop and commercial space clean and attractive, before opening, after closing or both.": "Pidämme myymäläsi ja liiketilasi siistinä ja houkuttelevana — ennen aukioloa, sen jälkeen tai molempina.", "Vacuuming, mopping and wiping surfaces daily or as agreed.": "Imurointi, moppaus ja pintojen pyyhintä päivittäin tai sovitusti.", "Clear display windows from inside, attracting customers in.": "Kirkkaat näyteikkunat sisältä — houkuttelevat asiakkaita sisään.", "Thorough cleaning and disinfection of toilet facilities.": "WC-tilojen perusteellinen puhdistus ja desinfiointi.", "Waste removal and recycling according to the agreed schedule.": "Roskien tyhjennys ja kierrätys sovitun aikataulun mukaan.", "Cleaning before opening, after closing or both.": "Siivous ennen aukioloa, sen jälkeen tai molempina.", "Cleaning of checkouts and shelf edges.": "Kassapisteiden ja hyllyjen reunojen puhdistus.", "Can you clean in a shopping centre?": "Voitteko siivota kauppakeskuksessa?", "Yes, we have experience with shopping centre commercial spaces.": "Kyllä, meillä on kokemusta kauppakeskusten liiketiloista.", "Can the schedule be changed?": "Saako aikataulun muuttaa?", "Yes, notify us at least 48 hours in advance.": "Kyllä, ilmoita muutoksesta vähintään 48 tuntia etukäteen.", "Do you use fragrance-free products?": "Käytättekö hajusteettomia tuotteita?", "We can use fragrance-free products on request.": "Voimme käyttää hajusteettomia tuotteita pyydettäessä.", "Restaurant Cleaning · Helsinki, Espoo & Vantaa": "Ravintolasiivous · Helsinki, Espoo & Vantaa", "Restaurant and commercial kitchen cleaning, hygiene first": "Ravintola- ja suurtaloussiivous, hygienia etusijalla", "Hygienic and clean spaces are the most important requirement for a restaurant. We professionally handle kitchens, dining rooms and back areas.": "Hygieeniset ja siistit tilat ovat ravintolan tärkein vaatimus. Huolehdimme keittiöistä, saleista ja tausta-alueista ammattimaisesti.", "Professional kitchens": "Ammattikeittiöt", "Cleaning greasy surfaces, stoves, ovens and extractor hoods.": "Rasvaisten pintojen, liesien, uunien ja huuvien puhdistus.", "Tables, chairs, floors clean every day.": "Pöydät, tuolit, lattiat puhtaana joka päivä.", "Disinfection": "Desinfiointi", "Disinfection of touch surfaces according to the self-monitoring plan.": "Omavalvontasuunnitelman mukainen desinfiointi kosketuspinnoille.", "Biowaste, recycling and waste removal as agreed.": "Biojätteet, kierrätys ja roskien tyhjennys sovitusti.", "Self-monitoring support": "Omavalvonta-tuki", "Cleaning log and documentation for self-monitoring.": "Siivouspäiväkirja ja dokumentointi omavalvontaa varten.", "Night cleaning": "Yösiivous", "Cleaning outside opening hours, morning or night.": "Siivous aukioloajan ulkopuolella — aamulla tai yöllä.", "Do you comply with food hygiene requirements?": "Noudatatteko elintarvikehygieniavaatimuksia?", "Yes, according to HACCP principles.": "Kyllä, HACCP-periaatteiden mukaisesti.", "Can you clean at night?": "Voitteko siivota yön aikana?", "Yes, we offer a night cleaning service.": "Kyllä, tarjoamme yösiivouspalvelua.", "How often is it needed?": "Kuinka usein tarvitaan?", "Most restaurants need daily service.": "Useimmat ravintolat tarvitsevat päivittäisen palvelun.", "Floor Maintenance · Helsinki, Espoo & Vantaa": "Lattiahoito · Helsinki, Espoo & Vantaa", "Floor maintenance, long-lasting results": "Lattioiden ylläpito, pitkäikäinen tulos", "Professional floor care extends service life and keeps spaces presentable, stone, tile, parquet, laminate and industrial floors.": "Ammattimainen lattioiden hoito pidentää käyttöikää ja pitää tilat edustavina — kivi, laatta, parketti, laminaatti ja teollisuuslattiat.", "Washing and polishing": "Pesu ja kiillotus", "Machine washing and polishing makes the floor look like new.": "Konepesulla ja kiillotuksella lattiasta tulee kuin uusi.", "Coating and waxing": "Pinnoitus ja vahan ajo", "Protective coating for high-traffic floors.": "Suojaava pinnoite kovaa kulutusta kestäville lattioille.", "Maintenance cleaning": "Ylläpitopuhdistus", "Daily or weekly maintenance as agreed.": "Päivittäinen tai viikoittainen ylläpito sovitusti.", "Industrial floors": "Teollisuuslattiat", "Epoxy floors, concrete and other specialist materials.": "Epoksilattiat, betoni ja muut erikoismateriaalit.", "Stone and tile surfaces": "Kivi- ja laattapinnat", "Granite, marble, ceramics, the right methods.": "Graniitti, marmori, keramiikka — oikeat menetelmät.", "Wood and laminate floors": "Puu- ja laminaattilattiat", "Safe cleaning and care for parquet surfaces.": "Turvallinen puhdistus ja hoito parketti-pinnoille.", "How often should they be treated?": "Kuinka usein tulisi käsitellä?", "Usually 1-4 times a year.": "Yleensä 1–4 kertaa vuodessa.", "Suitable for homes?": "Sopiiko koteihin?", "Yes, we also handle home parquet and stone floors.": "Kyllä, hoidamme myös kotien parketit ja kivilattiät.", "Do you remove scratches?": "Poistatteko naarmuja?", "We can reduce scratches with polishing.": "Voimme vähentää naarmuja kiillotuksella.", "Post-construction Cleaning · Helsinki, Espoo & Vantaa": "Rakennussiivous · Helsinki, Espoo & Vantaa", "Post-construction and final cleaning, ready to use": "Rakennus- ja loppusiivous, käyttövalmis tila", "Thorough cleaning after renovation or construction, dust, dirt and waste removed.": "Remontin tai rakentamisen jälkeinen perusteellinen siivous — poistetaan pöly, lika ja jätteet.", "Construction dust removal": "Rakennuspölyn poisto", "All surfaces and corners cleaned of construction dust.": "Kaikki pinnat ja nurkkat puhdistetaan rakennuspölystä.", "Windows and frames": "Ikkunat ja karmit", "Removing tape marks and paint splashes from windows.": "Teipinjälkien ja maaliläiskien poisto ikkunoista.", "Floors": "Lattiat", "Removing protective plastics and cleaning floors.": "Suojamuovien poisto ja lattioiden puhdistus.", "Bathroom and kitchen": "Kylpyhuone ja keittiö", "Thorough removal of lime deposits and construction dirt.": "Kalkkijälkien ja rakennuslian perusteellinen poisto.", "Final polish": "Loppusilaus", "Detailed inspection before handover.": "Yksityiskohtainen tarkistus ennen luovutusta.", "Waste removal": "Jätteiden poisto", "Small construction waste removed as agreed.": "Pienet rakennusjätteet poistetaan sovitusti.", "How long does final cleaning take?": "Kuinka kauan loppusiivous kestää?", "A standard apartment takes 3-6 hours.": "Tavallinen asunto vie 3–6 tuntia.", "What is needed before the team arrives?": "Mitä tarvitaan ennen tiimiä?", "Large construction waste must be removed.": "Suuret rakennusjätteet tulee olla viety pois.", "Do you handle renovation sites?": "Teettekö saneerauskohteet?", "Yes, including large renovation projects.": "Kyllä, myös laajat saneerauskohteet.", "Prices": "Hinnat", "Home Cleaning – Prices": "Kotisiivous – hinnat", "All prices include VAT. You can apply for the household tax deduction for home cleaning services.": "Kaikki hinnat sisältävät ALV:n. Kotisiivouspalveluista voit hakea kotitalousvähennystä.", "All prices incl. VAT. Household tax deduction possible for home cleaning services.": "Kaikki hinnat sis. ALV. Kotitalousvähennys mahdollinen kotisiivouspalveluille.", "VAT included.": "ALV sisältyy hintaan.", "Includes VAT. Household tax deduction possible.": "Sisältyy ALV. Kotitalousvähennys mahdollinen.", "Is VAT included in all prices?": "Sisältyykö ALV kaikkiin hintoihin?", "Yes. All Cleava prices include VAT. No hidden fees.": "Kyllä. Kaikki Cleavan hinnat sisältävät arvonlisäveron. Ei piilokululja.", "How does the household tax deduction work?": "Miten kotitalousvähennys toimii?", "The deduction is 40% of the labour cost, up to 2,100 euros per person per year. Applied for in the MyTax service.": "Vähennys on 40% työn osuudesta, enintään 2 100€ henkilöä kohden vuodessa. Haetaan verotuksessa OmaVero-palvelussa.", "Can I change or cancel the booking?": "Voinko muuttaa tai peruuttaa tilauksen?", "Yes. Cancellation is free if you notify us more than 48 hours in advance.": "Kyllä. Peruutus on maksuton kun ilmoitat yli 48 tuntia etukäteen. Katso tarkat peruutusehdot palveluehdoistamme.", "Is there a minimum charge?": "Onko minimiveloitusta?", "For home cleaning the minimum order is 2 hours. For other services it is agreed separately.": "Kotisiivouksessa minimitilaus on 2 tuntia. Muissa palveluissa sovitaan erikseen kohteen mukaan.", "Household tax deduction": "Kotitalousvähennys", "You can apply for the household tax deduction for home cleaning services.": "Kotisiivouspalveluista voit hakea kotitalousvähennystä.", "The deduction is 40% of the labour cost, up to 2,100 euros per person per year.": "Vähennys on 40% työn osuudesta, enintään 2 100€ henkilöä kohden vuodessa.", "The excess is 150 euros.": "Omavastuu on 150€.", "The deduction is applied for in the MyTax service.": "Vähennys haetaan OmaVero-palvelussa.", "Weekly": "Viikoittain", "Every two weeks": "Joka toinen viikko", "Once a month": "Kerran kuussa", "Price": "Hinta", "From": "Alkaen", "Package": "Paketti", "Basic cleaning": "Perussiivous", "Ongoing maintenance": "Jatkuva ylläpito", "Price agreed on a case-by-case basis.": "Hinta sovitaan tapauskohtaisesti.", "A rebellion against chaos": "Kapina kaaosta vastaan", "Welcome to Cleava, where cleanliness meets trust": "Tervetuloa Cleavaan – paikkaan, jossa puhtaus kohtaa luottamuksen", "Cleava was born from a genuine need. Here is the story of why and how.": "Cleava syntyi aidosta tarpeesta. Tässä on tarina siitä, miksi ja miten.", "Cleava in brief": "Cleava lyhyesti", "Satisfied customers": "Tyytyväistä asiakasta", "Helsinki Metro Area": "Pääkaupunkiseutu", "Company name": "Yrityksen nimi", "Business ID": "Y-tunnus", "Address": "Osoite", "Customer service": "Asiakaspalvelu", "Mon-Fri 8-18, Sat-Sun 12-16": "Ma–Pe 8–18, La–Su 12–16", "Mansio Group Oy (aputoiminimi Cleava Siivouspalvelut)": "Mansio Group Oy (aputoiminimi Cleava Siivouspalvelut)", "How it all began": "Miten kaikki alkoi", "What Cleava stands for": "Mitä Cleava edustaa", "People-centred work": "Ihmislähtöinen työ", "Happy employees create happy homes. We treat every team member with respect, offer fair pay and a safe working environment.": "Onnelliset työntekijät luovat onnellisia koteja. Kohtelemme jokaista tiimin jäsentä kunnioituksella, tarjoamme reilun palkan ja turvallisen työympäristön.", "Individual service": "Yksilöllinen palvelu", "We tailor the service to your lifestyle and schedule.": "Räätälöimme palvelun elämäntapasi ja aikataulusi mukaan.", "Nastia, founder of Cleava": "Nastia, Cleavan perustaja", "Cleava Gift Card, give a clean home as a gift": "Cleava Lahjakortti – anna puhdas koti lahjaksi", "The Cleava gift card is the perfect gift for a friend, family or yourself.": "Cleava-lahjakortti on täydellinen lahja ystävälle, perheelle tai itsellesi.", "Choose the right gift card for you": "Valitse sinulle sopiva lahjakortti", "Perfect for a one-time cleaning or a smaller home.": "Täydellinen kertaluonteiseen siivoukseen tai pienempään kotiin.", "Suitable for a larger apartment or more thorough cleaning.": "Sopii isommalle asunnolle tai perusteellisempaan siivoukseen.", "For larger homes or moving cleaning.": "Isoimmille kodeille tai muuttosiivoukseen.", "Choose or enter amount:": "Valitse tai kirjoita summa:", "Fill in your order details": "Täytä tilauksen tiedot", "Select a package above": "Valitse paketti yllä", "Email *": "Sähköposti *", "I accept the terms of service and gift card terms.": "Hyväksyn palveluehdot ja lahjakortin ehdot.", "The gift card is valid for 12 months from the date of purchase.": "Lahjakortti on voimassa 12 kuukautta ostopäivästä.", "Pay": "Maksa", "Proceeding to payment...": "Siirrytään maksuun...", "Important to know before purchasing": "Tärkeää tietää ennen ostamista", "Questions?": "Kysymyksiä?", "Book cleaning": "Tilaa siivous", "Fill in the booking form": "Täytä varauslomake", "We will contact you and confirm the time.": "Otamme yhteyttä ja vahvistamme ajankohdan.", "One-time cleaning": "Kertaluonteinen siivous", "Regular cleaning": "Säännöllinen siivous", "Additional services (optional)": "Lisäpalvelut (valinnainen)", "Oven cleaning": "Uunin puhdistus", "Fridge cleaning": "Jääkaapin puhdistus", "Balcony cleaning": "Parvekkeen siivous", "Inside cabinets": "Kaappien sisäpuolet", "Additional notes (optional)": "Lisätiedot (valinnainen)", "Send booking form": "Lähetä varauslomake", "Sending...": "Lähetetään...", "We confirm availability by text, WhatsApp or email.": "Vahvistamme saatavuuden tekstiviestillä, WhatsAppilla tai sähköpostilla.", "Book now": "Varaa nyt", "✓ Sent!": "✓ Lähetetty!", "Back to home": "Takaisin etusivulle", "Call us": "Soita meille", "Request a business quote": "Pyydä yritystarjous", "Request a callback": "Pyydä yhteydenottoa", "Before a party": "Ennen juhlia", "For selling or renting an apartment": "Asunnon myyntiä tai vuokrausta varten", "Every two weeks recommended": "Joka toinen viikko suosittelemin", "Retail Cleaning": "Myymälä- ja liiketilasiivous", "️ Restaurant Cleaning": "️ Ravintola- ja suurtaloussiivous", "✨ Floor Maintenance": "✨ Lattioiden ylläpito", "🎁 Gift Cards": "🎁 Lahjakortit", "3 days ago": "3 päivää sitten", "6 days ago": "6 päivää sitten", "1 week ago": "Viikko sitten", "2 weeks ago": "2 viikkoa sitten", "3 weeks ago": "3 viikkoa sitten", "1 month ago": "1 kuukausi sitten", "2 months ago": "2 kuukautta sitten", "3 months ago": "3 kuukautta sitten", "4 months ago": "4 kuukautta sitten", "5 months ago": "5 kuukautta sitten", "6 months ago": "6 kuukautta sitten", "7 months ago": "7 kuukautta sitten", "We serve in these areas": "Palvelemme näillä alueilla", "Discover our other services": "Tutustu muihin palveluihin", "Service tailored just for you": "Räätälöity palvelu juuri sinulle", "Reliability and flexibility": "Luotettavuus ja joustavuus", "Service type": "Palvelutyyppi", "Property details": "Kohteen tiedot", "Cleaning type": "Siivoustyyppi", "Contact details": "Yhteystiedot", "Preferred time": "Toivottu ajankohta", "Size m²": "Koko m²", "Time": "Kellonaika", "Street address": "Katuosoite", "City": "Kaupunki", "First name Last name": "Etunimi Sukunimi", "Balcony": "Parveke"}
var I18N_MAP = {"5": {"fi": "Etusivu", "en": "Home"}, "326": {"fi": "Ikkunanpesu", "en": "Window Cleaning"}, "322": {"fi": "Toimistosiivous", "en": "Office Cleaning"}, "323": {"fi": "Myymälä- ja liiketilasiivous", "en": "Retail Cleaning"}, "324": {"fi": "Porrassiivous", "en": "Stairwell Cleaning"}, "325": {"fi": "️ Ravintola- ja suurtaloussiivous", "en": "️ Restaurant Cleaning"}, "327": {"fi": "Lattioiden ylläpito", "en": "Floor Maintenance"}, "328": {"fi": "Suursiivous", "en": "Deep Cleaning"}, "14": {"fi": "Hinnasto", "en": "Pricing"}, "15": {"fi": "Tarinamme", "en": "Our Story"}, "16": {"fi": "Lahjakortit 🎁", "en": "Gift Cards 🎁"}, "18": {"fi": "Soita", "en": "Call"}, "19": {"fi": "tai", "en": "or"}, "17": {"fi": "Tilaa Siivous", "en": "Book Cleaning"}, "320": {"fi": "Etusivu", "en": "Home"}, "321": {"fi": "Yrityssiivous", "en": "Commercial Cleaning"}, "329": {"fi": "Hinnasto", "en": "Pricing"}, "330": {"fi": "Tarinamme", "en": "Our Story"}, "331": {"fi": "🎁 Lahjakortit", "en": "🎁 Gift Cards"}, "20": {"fi": "helpompi arki", "en": "easier everyday life"}, "21": {"fi": "Edullisia siivouspalveluja kotiin ja toimistoon Helsingissä, Espoossa ja Vantaalla. Ammattitaitoiset siivoojamme huolehtivat puhtaudesta. Sinä käytät ajan muuhun.", "en": "Professional cleaning services for homes and offices in Helsinki, Espoo and Vantaa. Our expert cleaners handle the cleaning. You spend the time on what matters."}, "22": {"fi": "Google-arviointi", "en": "Google rating"}, "23": {"fi": "Tyytyväisyystakuu", "en": "Satisfaction guarantee"}, "24": {"fi": "Vastaustakuu", "en": "Response guarantee"}, "25": {"fi": "Pyydä ilmainen tarjous", "en": "Request a free quote"}, "27": {"fi": "Vastaamme saman päivän aikana", "en": "We respond the same day"}, "28": {"fi": "Palvelu", "en": "Service"}, "29": {"fi": "Valitse palvelu", "en": "Select service"}, "6": {"fi": "Kotisiivous", "en": "Home Cleaning"}, "7": {"fi": "Muuttosiivous", "en": "Moving Cleaning"}, "11": {"fi": "Toimistosiivous", "en": "Office Cleaning"}, "8": {"fi": "Ikkunanpesu", "en": "Window Cleaning"}, "13": {"fi": "Suursiivous", "en": "Deep Cleaning"}, "9": {"fi": "Erikoissiivous", "en": "Specialist Cleaning"}, "12": {"fi": "Porrassiivous", "en": "Stairwell Cleaning"}, "30": {"fi": "Postinumero", "en": "Postal code"}, "31": {"fi": "Puhelin", "en": "Phone"}, "26": {"fi": "Pyydä tarjous nyt →", "en": "Request quote now →"}, "0": {"fi": "Täysin vakuutettu", "en": "Fully insured"}, "1": {"fi": "4.9/5 Google-arviot", "en": "4.9/5 Google reviews"}, "2": {"fi": "Vastaus 24h sisällä", "en": "Response within 24h"}, "3": {"fi": "Koulutetut ammattilaiset", "en": "Trained professionals"}, "4": {"fi": "Ei sitoutumista", "en": "No commitment"}, "67": {"fi": "Palvelut", "en": "Services"}, "41": {"fi": "Räätälöimme jokaisen siivouspalvelun tarpeidesi mukaan.", "en": "We tailor every cleaning service to your needs."}, "42": {"fi": "Säännöllinen tai kertasiivous. Sama tuttu siivooja joka kerta.", "en": "Regular or one-time cleaning. The same familiar cleaner every time."}, "43": {"fi": "Perusteellinen siivous muuton yhteydessä. Tyytyväisyystakuu.", "en": "Thorough cleaning when moving. Satisfaction guarantee."}, "44": {"fi": "Puhdas toimisto lisää viihtyvyyttä ja tuottavuutta.", "en": "A clean office increases comfort and productivity."}, "45": {"fi": "Kirkkaat ikkunat tuovat valoa ja iloa kotiin.", "en": "Clear windows bring light and joy to the home."}, "46": {"fi": "Perusteellinen suursiivous joka nurkkaan. Ihanteellinen kevätsiivoukseen.", "en": "Thorough deep cleaning in every corner. Ideal for spring cleaning."}, "47": {"fi": "Sauna, parveke tai erikoiskohteet. Räätälöity ratkaisu.", "en": "Sauna, balcony or special areas. Tailored solution."}, "32": {"fi": "Näin se toimii", "en": "How it works"}, "33": {"fi": "Olemme tehneet prosessista mahdollisimman sujuvan.", "en": "We have made the process as smooth as possible."}, "48": {"fi": "Pyydä tarjous", "en": "Request quote"}, "34": {"fi": "Jätä postinumero ja puhelinnumero. Teemme tarjouksen saman päivän aikana.", "en": "Leave your postal code and phone number. We will make a quote the same day."}, "35": {"fi": "Sovitaan ajankohta", "en": "We agree on a time"}, "36": {"fi": "Otamme yhteyttä ja sovitaan sinulle sopiva ajankohta.", "en": "We will contact you and agree on a suitable time."}, "37": {"fi": "Ammattilaiset hoitavat", "en": "Professionals handle it"}, "38": {"fi": "Siivoojat tulevat sovittuna aikana. Ei tarvitse olla paikalla.", "en": "Cleaners arrive at the agreed time. No need to be present."}, "39": {"fi": "Nauti puhtaasta kodista", "en": "Enjoy a clean home"}, "40": {"fi": "Jos olet pettynyt lopputulokseen, korjaamme sen veloituksetta.", "en": "If you are disappointed with the result, we will fix it free of charge."}, "49": {"fi": "Miksi Cleava?", "en": "Why Cleava?"}, "50": {"fi": "Täysin vakuutettu palvelu", "en": "Fully insured service"}, "51": {"fi": "Jokainen siivous on vakuutettu. Jos jotain tapahtuu, me hoidamme sen.", "en": "Every cleaning is insured. If something happens, we handle it."}, "52": {"fi": "Huolellisesti valitut ammattilaiset", "en": "Carefully selected professionals"}, "53": {"fi": "Kaikki siivoojamme ovat taustatarkistettuja. Tunnet olosi turvalliseksi kotona.", "en": "All our cleaners are background-checked. You feel safe at home."}, "54": {"fi": "100% tyytyväisyystakuu", "en": "100% satisfaction guarantee"}, "55": {"fi": "Jos et ole tyytyväinen, palaamme korjaamaan veloituksetta.", "en": "If you are not satisfied, we will return to fix it free of charge."}, "56": {"fi": "Selkeä hinnoittelu, ei yllätyksiä", "en": "Clear pricing, no surprises"}, "57": {"fi": "Tarjous aina etukäteen. Ei piilomaksuja.", "en": "Quote always in advance. No hidden fees."}, "58": {"fi": "Asiakaspalautteet", "en": "Customer reviews"}, "60": {"fi": "Palvelualueet", "en": "Service areas"}, "61": {"fi": "Palvelemme tällä hetkellä pääkaupunkiseudulla.", "en": "We currently serve the Helsinki metropolitan area."}, "74": {"fi": "Edullinen kotisiivous Helsingissä, Espoossa ja Vantaalla — alkaen 39 €/tunti. Kertaluonteinen tai säännöllinen. 100% tyytyväisyystakuu.", "en": "Affordable home cleaning in Helsinki, Espoo and Vantaa — from 39 €/tunti. One-time or regular. 100% satisfaction guarantee."}, "75": {"fi": "Jokaiseen siivoukseen sisältyy nämä lupaukset.", "en": "Every cleaning includes these promises."}, "76": {"fi": "Jos lopputulos ei miellytä, palaamme korjaamaan veloituksetta.", "en": "If the result is not satisfactory, we will return to fix it free of charge."}, "77": {"fi": "Kaikki siivoojamme on taustatarkistettu ja koulutettu.", "en": "All our cleaners are background-checked and trained."}, "78": {"fi": "Ekologiset puhdistusaineet", "en": "Eco-friendly cleaning products"}, "79": {"fi": "Hajusteettomia ja ympäristöystävällisiä. Turvallisia perheille ja lemmikkikodeille.", "en": "Fragrance-free and eco-friendly. Safe for families and pet homes."}, "80": {"fi": "Mitä sisältyy", "en": "What is included"}, "82": {"fi": "Imurointi ja lattioiden pesu kaikissa huoneissa", "en": "Vacuuming and floor washing in all rooms"}, "83": {"fi": "Pölyjen pyyhintä pinnoilta, hyllyiltä ja kalusteista", "en": "Dusting surfaces, shelves and furniture"}, "84": {"fi": "Kylpyhuoneen ja WC:n perusteellinen puhdistus", "en": "Thorough cleaning of bathroom and toilet"}, "85": {"fi": "Keittiön tasopintojen, lieden ja altaan siivous", "en": "Cleaning kitchen countertops, stove and sink"}, "86": {"fi": "Roskien tyhjennys ja pussien vaihto", "en": "Emptying bins and replacing bags"}, "87": {"fi": "Peilien ja lasipintojen puhdistus", "en": "Cleaning mirrors and glass surfaces"}, "88": {"fi": "Lisäpalveluna: uunin puhdistus, jääkaapin puhdistus, kaappien sisäpuolet", "en": "Optional extras: oven cleaning, fridge cleaning, inside cabinets"}, "89": {"fi": "Viikoittain 39 €/tunti · Joka toinen viikko 45 €/tunti · Kerran kuussa 49 €/tunti. ALV sisältyy hintaan.", "en": "Weekly 39 €/tunti · Every two weeks 45 €/tunti · Once a month 49 €/tunti. VAT included."}, "90": {"fi": "Kotitalousvähennys mahdollinen.", "en": "Household tax deduction possible."}, "91": {"fi": "FAQ", "en": "FAQ"}, "93": {"fi": "Kuinka usein kotisiivous kannattaa tilata?", "en": "How often should I book home cleaning?"}, "94": {"fi": "Se riippuu kodistasi ja elämäntilanteestasi. Yleisin valinta on joka toinen viikko. Perheille tai lemmikkikodeille viikoittainen siivous sopii hyvin.", "en": "It depends on your home and lifestyle. The most common choice is every two weeks. Weekly cleaning works well for families or pet homes."}, "95": {"fi": "Pitääkö minun olla kotona siivouksen aikana?", "en": "Do I need to be home during the cleaning?"}, "96": {"fi": "Ei tarvitse. Voit luovuttaa avaimen tai koodin siivoojalle. Siivoojamme ovat taustatarkistettuja ja vakuutettuja.", "en": "No need. You can leave a key or code for the cleaner. Our cleaners are background-checked and insured."}, "97": {"fi": "Mitä tarvikkeet siivooja tuo mukanaan?", "en": "What supplies does the cleaner bring?"}, "98": {"fi": "Siivoojat tuovat omat välineet ja puhdistusaineet. Jos sinulla on erityistoiveita aineista tai allergia, kerrothan siitä etukäteen.", "en": "Cleaners bring their own equipment and products. If you have specific preferences or allergies, please let us know in advance."}, "99": {"fi": "Voinko pyytää samaa siivoojaa joka kerta?", "en": "Can I request the same cleaner every time?"}, "100": {"fi": "Kyllä. Pyrimme lähettämään saman tutun siivooja joka kerralla, jos mahdollista.", "en": "Yes. We aim to send the same familiar cleaner every time, if possible."}, "101": {"fi": "Mitä jos lopputulos ei miellytä?", "en": "What if the result is not satisfactory?"}, "102": {"fi": "Ota yhteyttä 24 tunnin sisällä ja palaamme korjaamaan puutteet veloituksetta. Tyytyväisyystakuu on meille tärkeä.", "en": "Contact us within 24 hours and we will return to fix any issues free of charge. The satisfaction guarantee is important to us."}, "59": {"fi": "Mitä asiakkaamme sanovat", "en": "What our customers say"}, "103": {"fi": "Muuttosiivous tehtynä huolellisesti. Koti jätetään luovutuskuntoon.", "en": "Moving cleaning done thoroughly. The home is left in handover condition."}, "312": {"fi": "Kaappien sisäpuolet", "en": "Inside cabinets"}, "104": {"fi": "Kattava muuttosiivous alusta loppuun. ALV sisältyy hintaan.", "en": "Comprehensive moving cleaning from start to finish. VAT included."}, "105": {"fi": "Milloin muuttosiivous kannattaa tehdä?", "en": "When should moving cleaning be done?"}, "106": {"fi": "Useimmiten vanhan kodin luovutuspäivänä tai sitä edeltävänä päivänä. Sovitaan aikataulu muuttosi mukaan.", "en": "Usually on the handover day or the day before. We agree on a schedule to suit your move."}, "107": {"fi": "Mitä eroa on lähtö- ja tulosiivouksella?", "en": "What is the difference between move-out and move-in cleaning?"}, "108": {"fi": "Lähtösiivous tehdään kun muutat pois — koti jätetään luovutuskuntoon. Tulosiivous tehdään uuteen kotiin ennen muuttamista.", "en": "Move-out cleaning is done when you leave. Move-in cleaning is done in the new home before moving in."}, "109": {"fi": "Onko muuttosiivous erilainen kuin normaali kotisiivous?", "en": "Is moving cleaning different from regular home cleaning?"}, "110": {"fi": "Kyllä. Muuttosiivous on paljon perusteellisempi — kaapit, kodinkoneet, uunit ja kaikki pinnat käydään läpi huolellisesti.", "en": "Yes. Moving cleaning is much more thorough — cupboards, appliances, ovens and all surfaces are covered carefully."}, "111": {"fi": "Kattaako muuttosiivous tarkastuksen vaatimukset?", "en": "Does moving cleaning meet inspection requirements?"}, "112": {"fi": "Pyrimme aina täyttämään vuokranantajan tai kiinteistönvälittäjän vaatimukset. Jos tarkastuksessa ilmenee huomautuksia, palaamme korjaamaan veloituksetta.", "en": "We always aim to meet the landlord requirements. If any issues arise during inspection, we will return to fix them free of charge."}, "113": {"fi": "Tarvitseeko minun olla paikalla?", "en": "Do I need to be present?"}, "114": {"fi": "Ei tarvitse. Sovitaan ajankohta — muutat rauhassa ja me hoidamme siivouksen.", "en": "No need. We agree on a time and we handle the cleaning."}, "135": {"fi": "Puhdas toimisto lisää viihtyvyyttä ja tuottavuutta. Me hoidamme siivouksen, sinä keskityt työhön.", "en": "A clean office increases comfort and productivity. We handle the cleaning, you focus on work."}, "316": {"fi": "Pyydä yritystarjous", "en": "Request a business quote"}, "171": {"fi": "Joustava aikataulu", "en": "Flexible schedule"}, "136": {"fi": "Siivous aukioloaikojen ulkopuolella: aamuisin, iltaisin tai viikonloppuisin.", "en": "Cleaning outside opening hours: mornings, evenings or weekends."}, "137": {"fi": "Koulutettu henkilökunta", "en": "Trained staff"}, "138": {"fi": "Ammattitaitoisia, taustatarkistettuja ja vakuutettuja siivoojia.", "en": "Skilled, background-checked and insured cleaners."}, "139": {"fi": "Siivouslistat ja tarkastukset varmistavat johdonmukaisen lopputuloksen.", "en": "Cleaning checklists and inspections ensure consistent results."}, "140": {"fi": "Ekologiset aineet", "en": "Eco-friendly products"}, "141": {"fi": "Turvallisia henkilökunnalle ja asiakkaille.", "en": "Safe for staff and customers."}, "142": {"fi": "Hinta sovitaan tilojen koon ja siivoustarpeen mukaan. Otamme yhteyttä saman päivän aikana.", "en": "Price agreed based on premises size and cleaning needs. We contact you the same day."}, "143": {"fi": "Kuinka usein toimistosiivous kannattaa tehdä?", "en": "How often should office cleaning be done?"}, "144": {"fi": "Riippuu toimiston koosta ja käyttäjämäärästä. Tyypillisesti 2–5 kertaa viikossa. Pienemmille toimistoille kerran viikossa riittää.", "en": "Depends on office size and number of users. Typically 2-5 times a week. Once a week is enough for smaller offices."}, "145": {"fi": "Voiko siivous tapahtua aukioloaikojen ulkopuolella?", "en": "Can cleaning take place outside opening hours?"}, "146": {"fi": "Kyllä. Järjestämme siivouksen aamuisin, iltaisin tai viikonloppuisin niin, ettei se häiritse työskentelyä.", "en": "Yes. We arrange cleaning in the mornings, evenings or weekends so it does not disrupt work."}, "147": {"fi": "Miten hinta määräytyy toimistosiivouksessa?", "en": "How is the price determined for office cleaning?"}, "148": {"fi": "Hinta sovitaan tilojen koon, siivoustiheyden ja tarpeiden mukaan. Pyydä maksuton kartoitus niin annamme tarjouksen.", "en": "The price is agreed based on premises size, cleaning frequency and needs. Request a free assessment and we will give you a quote."}, "149": {"fi": "Onko sopimus pitkäaikainen?", "en": "Is the contract long-term?"}, "150": {"fi": "Ei ole pakko. Tarjoamme joustavia sopimuksia. Aloittaminen on helppoa ja lopettaminenkin joustavaa.", "en": "It does not have to be. We offer flexible contracts. Starting is easy and ending is flexible too."}, "151": {"fi": "Mitä ekologiset puhdistusaineet tarkoittavat käytännössä?", "en": "What do eco-friendly cleaning products mean in practice?"}, "152": {"fi": "Käytämme hajusteettomia, ympäristöystävällisiä aineita jotka ovat turvallisia sekä henkilökunnalle että asiakkaille.", "en": "We use fragrance-free, eco-friendly products that are safe for both staff and customers."}, "288": {"fi": "Cleava syntyi aidosta tarpeesta. Tässä on tarina siitä, miksi ja miten.", "en": "Cleava was born from a genuine need. Here is the story of why and how."}, "296": {"fi": "Miten kaikki alkoi", "en": "How it all began"}, "300": {"fi": "Nastia, Cleavan perustaja", "en": "Nastia, founder of Cleava"}, "297": {"fi": "Ihmislähtöinen työ", "en": "People-centred work"}, "298": {"fi": "Onnelliset työntekijät luovat onnellisia koteja. Kohtelemme jokaista tiimin jäsentä kunnioituksella, tarjoamme reilun palkan ja turvallisen työympäristön.", "en": "Happy employees create happy homes. We treat every team member with respect, offer fair pay and a safe working environment."}, "299": {"fi": "Yksilöllinen palvelu", "en": "Individual service"}, "68": {"fi": "Yritys", "en": "Company"}, "289": {"fi": "Tyytyväistä asiakasta", "en": "Satisfied customers"}, "290": {"fi": "Pääkaupunkiseutu", "en": "Helsinki Metro Area"}, "291": {"fi": "Yrityksen nimi", "en": "Company name"}, "295": {"fi": "Mansio Group Oy (aputoiminimi Cleava Siivouspalvelut)", "en": "Mansio Group Oy (aputoiminimi Cleava Siivouspalvelut)"}, "292": {"fi": "Y-tunnus", "en": "Business ID"}, "293": {"fi": "Osoite", "en": "Address"}, "294": {"fi": "Asiakaspalvelu", "en": "Customer service"}, "168": {"fi": "Siistiit portaat ja yhteiset tilat parantavat viihtyisyyttä ja turvallisuutta. Me hoidamme siivouksen säännöllisesti sovitun aikataulun mukaan.", "en": "Clean stairs and shared spaces improve comfort and safety. We handle the cleaning regularly according to the agreed schedule."}, "169": {"fi": "Säännöllinen ja luotettava", "en": "Regular and reliable"}, "170": {"fi": "Siivous tapahtuu sovitun aikataulun mukaan. Voit luottaa siihen, että portaat ovat aina siistit.", "en": "Cleaning takes place according to the agreed schedule. You can rely on the stairs always being clean."}, "172": {"fi": "Sovitaan siivousväli tarpeidenne mukaan: viikoittain, joka toinen viikko tai kerran kuussa.", "en": "We agree on cleaning intervals to suit your needs: weekly, every two weeks or once a month."}, "173": {"fi": "Hinta sovitaan kohteen koon ja siivoustarpeen mukaan. Pyydä maksuton tarjous.", "en": "Price agreed based on size and cleaning needs. Request a free quote."}, "174": {"fi": "Maksuton arvio · Ei sitoumuksia", "en": "Free assessment · No commitment"}, "175": {"fi": "Missä Cleava toimii?", "en": "Where does Cleava operate?"}, "176": {"fi": "Pääkaupunkiseudulla: Helsinki, Espoo, Vantaa ja Kauniainen.", "en": "In the Helsinki metropolitan area: Helsinki, Espoo, Vantaa and Kauniainen."}, "177": {"fi": "Onko Cleava vakuutettu?", "en": "Is Cleava insured?"}, "178": {"fi": "Kyllä. Kaikki siivoomme on vakuutettu. Jos jotain tapahtuu, me hoidamme sen.", "en": "Yes. All our cleaning is insured. If something happens, we handle it."}, "179": {"fi": "Käyttääkö Cleava ekologisia puhdistusaineita?", "en": "Does Cleava use eco-friendly cleaning products?"}, "180": {"fi": "Kyllä. Käytämme hajusteettomia, ympäristöystävällisiä aineita jotka sopivat myös lapsiperheille ja lemmikkikodeille.", "en": "Yes. We use fragrance-free, eco-friendly products suitable for families with children and pets."}, "181": {"fi": "Miten voin tilata palvelun?", "en": "How can I book the service?"}, "182": {"fi": "Helpoin tapa on täyttää tarjouslomakkeemme tai soittaa 045 187 8083. Vastaamme saman päivän aikana.", "en": "The easiest way is to fill in our quote form or call 045 187 8083. We respond the same day."}, "72": {"fi": "Lahjakortti", "en": "Gift Card"}, "301": {"fi": "Täydellinen kertaluonteiseen siivoukseen tai pienempään kotiin.", "en": "Perfect for a one-time cleaning or a smaller home."}, "302": {"fi": "Sopii isommalle asunnolle tai perusteellisempaan siivoukseen.", "en": "Suitable for a larger apartment or more thorough cleaning."}, "303": {"fi": "Valitse tai kirjoita summa:", "en": "Choose or enter amount:"}, "304": {"fi": "Valitse paketti yllä", "en": "Select a package above"}, "305": {"fi": "Sähköposti *", "en": "Email *"}, "306": {"fi": "Maksa", "en": "Pay"}, "307": {"fi": "Kysymyksiä?", "en": "Questions?"}, "115": {"fi": "Ammattimaisesti pestyt ikkunat tuovat valoa kotiin. Hoidamme sekä sisä- että ulkopuolen.", "en": "Professionally cleaned windows bring light to your home. We handle both inside and outside."}, "117": {"fi": "Ikkunan lasin pesu sisältä ja ulkoa", "en": "Washing window glass inside and outside"}, "118": {"fi": "Ikkunanpuitteiden ja listojen pyyhintä", "en": "Wiping window frames and trims"}, "119": {"fi": "Karmien ja helkojen puhdistus", "en": "Cleaning frames and handles"}, "120": {"fi": "Ikkunalaudat pyyhitään samalla", "en": "Window sills wiped at the same time"}, "121": {"fi": "Parvekkeen ovet ja lasirakenteet", "en": "Balcony doors and glass structures"}, "122": {"fi": "Terassi- ja parvekelasit sovitusti", "en": "Terrace and balcony glass by agreement"}, "123": {"fi": "Ei tarvitse olla kotona", "en": "No need to be home"}, "124": {"fi": "ALV sisältyy hintaan. Ikkunanpesun voi yhdistää kotisiivoukseen.", "en": "VAT included. Window cleaning can be combined with home cleaning."}, "125": {"fi": "Kuinka usein ikkunat kannattaa pestä?", "en": "How often should windows be cleaned?"}, "126": {"fi": "Suosittelemme 1–2 kertaa vuodessa. Vilkasliikenteisten teiden varrella tai rakennustyömaiden lähellä useammin.", "en": "We recommend 1-2 times a year. More often near busy roads or construction sites."}, "127": {"fi": "Pestäänkö ikkunat myös ulkopuolelta?", "en": "Are windows also cleaned on the outside?"}, "128": {"fi": "Kyllä, hoidamme sekä sisä- että ulkopuolen. Parvekkeen ovet ja terassilasit sisältyvät sovitusti.", "en": "Yes, we handle both inside and outside. Balcony doors and terrace glass included by agreement."}, "129": {"fi": "Milloin ikkunanpesu onnistuu parhaiten?", "en": "When is the best time for window cleaning?"}, "130": {"fi": "Parhaiten pilvisellä tai puolipilvisellä säällä. Suora aurinko voi jättää tahroja kuivuvaan lasiin.", "en": "Best on cloudy days. Direct sunlight can leave streaks on drying glass."}, "131": {"fi": "Voidaanko ikkunanpesu yhdistää kotisiivoukseen?", "en": "Can window cleaning be combined with home cleaning?"}, "132": {"fi": "Kyllä. Yhdistetty palvelu on kätevä ja usein edullisempi kuin erikseen tilattuna.", "en": "Yes. A combined service is convenient and often cheaper than ordering separately."}, "133": {"fi": "Ei tarvitse. Sovitaan sopiva ajankohta — löydät kirkkaat ikkunat kotiinpalatessasi.", "en": "No need. We agree on a time and you come home to sparkling windows."}, "153": {"fi": "Sopii kevätsiivoukseen, ennen juhlia tai kun koti kaipaa perusteellisen puhdistuksen.", "en": "Ideal for spring cleaning, before a party, or when your home needs a thorough clean."}, "155": {"fi": "Suursiivous / Tehopuhdistus", "en": "Deep Cleaning / Power Clean"}, "154": {"fi": "ALV sisältyy hintaan. Suursiivous voidaan yhdistää ikkunanpesuun.", "en": "VAT included. Deep cleaning can be combined with window cleaning."}, "156": {"fi": "Mitä eroa on suursiivousella ja tavallisella kotisiivouksella?", "en": "What is the difference between deep cleaning and regular home cleaning?"}, "157": {"fi": "Suursiivous on paljon perusteellisempi. Kaapit, kodinkoneet, seinät ja kaikki pinnat käydään läpi — ei vain ylläpito.", "en": "Deep cleaning is much more thorough. Cupboards, appliances, walls and all surfaces are covered, not just maintenance."}, "158": {"fi": "Kauanko suursiivous kestää?", "en": "How long does deep cleaning take?"}, "159": {"fi": "Riippuu asunnon koosta ja kunnosta. Tavallisesti 3–6 tuntia. Annamme arvion etukäteen.", "en": "Depends on the size and condition of the apartment. Usually 3-6 hours. We give an estimate in advance."}, "160": {"fi": "Milloin suursiivous kannattaa tehdä?", "en": "When should deep cleaning be done?"}, "161": {"fi": "Kevätsiivoukseen, ennen juhlia, muuton yhteydessä tai kerran vuodessa perusteelliseen puhdistukseen.", "en": "For spring cleaning, before a party, when moving, or once a year for a thorough clean."}, "162": {"fi": "Mitä minun tulee tehdä ennen siivousta?", "en": "What do I need to do before the cleaning?"}, "163": {"fi": "Siirtää tavarat pois tieltä mahdollisuuksien mukaan. Me hoidamme kaiken muun.", "en": "Move items out of the way as much as possible. We handle everything else."}, "164": {"fi": "Voidaanko suursiivous yhdistää ikkunanpesuun?", "en": "Can deep cleaning be combined with window cleaning?"}, "165": {"fi": "Kyllä — suosittu yhdistelmä. Kerro tarpeistasi niin sovitaan koko paketti kerralla.", "en": "Yes, a popular combination. Tell us your needs and we will arrange the whole package at once."}, "166": {"fi": "Sauna, parveke tai muu erikoiskohde. Räätälöimme palvelun tarpeen mukaan.", "en": "Sauna, balcony or other special area. We tailor the service to your needs."}, "319": {"fi": "Asunnon myyntiä tai vuokrausta varten", "en": "For selling or renting an apartment"}, "167": {"fi": "Hinta sovitaan kohteen mukaan. Maksuton arvio saman päivän aikana.", "en": "Price agreed based on the area. Free assessment the same day."}, "116": {"fi": "Ammattimaisesti pestyt ikkunat tuovat valoa ja tekevät asunnosta viihtyisämmän. Hoidamme sekä sisä- että ulkopuolen.", "en": "Professionally cleaned windows bring light and make your home more comfortable. We handle both inside and outside."}, "274": {"fi": "ALV sisältyy hintaan.", "en": "VAT included."}, "92": {"fi": "Usein kysytyt kysymykset", "en": "Frequently asked questions"}, "134": {"fi": "Ei. Sovitaan ajankohta ja siivoojamme hoitavat kaiken. Löydät kirkkaat ikkunat kotiinpalatessasi.", "en": "No. We agree on a time and our cleaners handle everything. You come home to sparkling windows."}, "318": {"fi": "Ennen juhlia", "en": "Before a party"}, "283": {"fi": "Kotitalousvähennys", "en": "Household tax deduction"}, "273": {"fi": "Kaikki hinnat sis. ALV. Kotitalousvähennys mahdollinen kotisiivouspalveluille.", "en": "All prices incl. VAT. Household tax deduction possible for home cleaning services."}, "285": {"fi": "Paketti", "en": "Package"}, "284": {"fi": "Hinta", "en": "Price"}, "286": {"fi": "Perussiivous", "en": "Basic cleaning"}, "287": {"fi": "Jatkuva ylläpito", "en": "Ongoing maintenance"}, "275": {"fi": "Sisältyykö ALV kaikkiin hintoihin?", "en": "Is VAT included in all prices?"}, "276": {"fi": "Kyllä. Kaikki Cleavan hinnat sisältävät arvonlisäveron. Ei piilokululja.", "en": "Yes. All Cleava prices include VAT. No hidden fees."}, "277": {"fi": "Miten kotitalousvähennys toimii?", "en": "How does the household tax deduction work?"}, "278": {"fi": "Vähennys on 40% työn osuudesta, enintään 2 100€ henkilöä kohden vuodessa. Haetaan verotuksessa OmaVero-palvelussa.", "en": "The deduction is 40% of the labour cost, up to 2,100 euros per person per year. Applied for in the MyTax service."}, "279": {"fi": "Voinko muuttaa tai peruuttaa tilauksen?", "en": "Can I change or cancel the booking?"}, "280": {"fi": "Kyllä. Peruutus on maksuton kun ilmoitat yli 48 tuntia etukäteen. Katso tarkat peruutusehdot palveluehdoistamme.", "en": "Yes. Cancellation is free if you notify us more than 48 hours in advance."}, "281": {"fi": "Onko minimiveloitusta?", "en": "Is there a minimum charge?"}, "282": {"fi": "Kotisiivouksessa minimitilaus on 2 tuntia. Muissa palveluissa sovitaan erikseen kohteen mukaan.", "en": "For home cleaning the minimum order is 2 hours. For other services it is agreed separately."}, "70": {"fi": "Evästeet", "en": "Cookies"}, "71": {"fi": "Evästekäytäntö", "en": "Cookie Policy"}, "62": {"fi": "Kysymyksiä tai ajatuksia?", "en": "Questions or thoughts?"}, "63": {"fi": "Soita tai jätä yhteystietosi.", "en": "Call or leave your contact details."}, "64": {"fi": "Haluatko siistin kodin tai toimiston?", "en": "Want a clean home or office?"}, "65": {"fi": "Otamme yhteyttä 24h sisällä.", "en": "We will contact you within 24 hours."}, "183": {"fi": "Yrityssiivous · Helsinki, Espoo & Vantaa", "en": "Commercial Cleaning · Helsinki, Espoo & Vantaa"}, "184": {"fi": "Siistit toimitilat lisäävät tuottavuutta ja jättävät hyvän vaikutelman asiakkaisiin. Cleava hoitaa yrityksesi siivouksen — sovitusti, luotettavasti ja laadukkaasti.", "en": "Clean premises increase productivity and leave a good impression. Cleava handles your business cleaning reliably and with quality."}, "81": {"fi": "Palvelun sisältö", "en": "Service contents"}, "185": {"fi": "Toimistot ja toimitilat", "en": "Offices and business premises"}, "186": {"fi": "Säännöllinen tai kertaluonteinen siivous kaikenkokoisiin toimistoihin.", "en": "Regular or one-time cleaning for offices of all sizes."}, "187": {"fi": "Myymälät ja liiketilat", "en": "Shops and commercial spaces"}, "188": {"fi": "Siisti ja edustava liiketila parantaa asiakaskokemusta.", "en": "A clean and presentable space improves the customer experience."}, "189": {"fi": "Kiinteistön yhteisten tilojen siivous.", "en": "Cleaning of the property shared spaces."}, "190": {"fi": "Ravintolat ja suurtaloudet", "en": "Restaurants and large kitchens"}, "191": {"fi": "Hygieeniset tilat elintarviketurvallisuusstandardien mukaan.", "en": "Hygienic spaces according to food safety standards."}, "192": {"fi": "Ikkunanpesu, lattiakäsittely ja muut erikoispalvelut.", "en": "Window cleaning, floor treatment and other specialist services."}, "193": {"fi": "Räätälöity sopimus", "en": "Tailored contract"}, "194": {"fi": "Suunnittelemme palvelun juuri teidän tarpeidenne mukaan.", "en": "We design the service to match your exact needs."}, "195": {"fi": "Kuinka nopeasti voitte aloittaa?", "en": "How quickly can you start?"}, "196": {"fi": "Yleensä 1–3 arkipäivän sisällä yhteydenotosta.", "en": "Usually within 1-3 working days of contact."}, "197": {"fi": "Voimmeko sopia säännöllisen sopimuksen?", "en": "Can we agree on a regular contract?"}, "198": {"fi": "Kyllä — päivittäisiä, viikoittaisia ja kuukausittaisia sopimuksia.", "en": "Yes, daily, weekly and monthly contracts available."}, "199": {"fi": "Onko välineet mukana?", "en": "Are supplies included?"}, "200": {"fi": "Kyllä, tuomme omat välineet ja ekologiset pesuaineet.", "en": "Yes, we bring our own equipment and eco-friendly products."}, "253": {"fi": "Rakennussiivous · Helsinki, Espoo & Vantaa", "en": "Post-construction Cleaning · Helsinki, Espoo & Vantaa"}, "254": {"fi": "Remontin tai rakentamisen jälkeinen perusteellinen siivous — poistetaan pöly, lika ja jätteet.", "en": "Thorough cleaning after renovation or construction, dust, dirt and waste removed."}, "255": {"fi": "Rakennuspölyn poisto", "en": "Construction dust removal"}, "256": {"fi": "Kaikki pinnat ja nurkkat puhdistetaan rakennuspölystä.", "en": "All surfaces and corners cleaned of construction dust."}, "257": {"fi": "Ikkunat ja karmit", "en": "Windows and frames"}, "258": {"fi": "Teipinjälkien ja maaliläiskien poisto ikkunoista.", "en": "Removing tape marks and paint splashes from windows."}, "259": {"fi": "Lattiat", "en": "Floors"}, "260": {"fi": "Suojamuovien poisto ja lattioiden puhdistus.", "en": "Removing protective plastics and cleaning floors."}, "261": {"fi": "Kylpyhuone ja keittiö", "en": "Bathroom and kitchen"}, "262": {"fi": "Kalkkijälkien ja rakennuslian perusteellinen poisto.", "en": "Thorough removal of lime deposits and construction dirt."}, "263": {"fi": "Loppusilaus", "en": "Final polish"}, "264": {"fi": "Yksityiskohtainen tarkistus ennen luovutusta.", "en": "Detailed inspection before handover."}, "265": {"fi": "Jätteiden poisto", "en": "Waste removal"}, "266": {"fi": "Pienet rakennusjätteet poistetaan sovitusti.", "en": "Small construction waste removed as agreed."}, "267": {"fi": "Kuinka kauan loppusiivous kestää?", "en": "How long does final cleaning take?"}, "268": {"fi": "Tavallinen asunto vie 3–6 tuntia.", "en": "A standard apartment takes 3-6 hours."}, "269": {"fi": "Mitä tarvitaan ennen tiimiä?", "en": "What is needed before the team arrives?"}, "270": {"fi": "Suuret rakennusjätteet tulee olla viety pois.", "en": "Large construction waste must be removed."}, "271": {"fi": "Teettekö saneerauskohteet?", "en": "Do you handle renovation sites?"}, "272": {"fi": "Kyllä, myös laajat saneerauskohteet.", "en": "Yes, including large renovation projects."}, "201": {"fi": "Myymäläsiivous · Helsinki, Espoo & Vantaa", "en": "Retail Cleaning · Helsinki, Espoo & Vantaa"}, "202": {"fi": "Pidämme myymäläsi ja liiketilasi siistinä ja houkuttelevana — ennen aukioloa, sen jälkeen tai molempina.", "en": "We keep your shop and commercial space clean and attractive, before opening, after closing or both."}, "203": {"fi": "Imurointi, moppaus ja pintojen pyyhintä päivittäin tai sovitusti.", "en": "Vacuuming, mopping and wiping surfaces daily or as agreed."}, "204": {"fi": "Kirkkaat näyteikkunat sisältä — houkuttelevat asiakkaita sisään.", "en": "Clear display windows from inside, attracting customers in."}, "205": {"fi": "WC-tilojen perusteellinen puhdistus ja desinfiointi.", "en": "Thorough cleaning and disinfection of toilet facilities."}, "206": {"fi": "Roskien tyhjennys ja kierrätys sovitun aikataulun mukaan.", "en": "Waste removal and recycling according to the agreed schedule."}, "207": {"fi": "Siivous ennen aukioloa, sen jälkeen tai molempina.", "en": "Cleaning before opening, after closing or both."}, "208": {"fi": "Kassapisteiden ja hyllyjen reunojen puhdistus.", "en": "Cleaning of checkouts and shelf edges."}, "209": {"fi": "Voitteko siivota kauppakeskuksessa?", "en": "Can you clean in a shopping centre?"}, "210": {"fi": "Kyllä, meillä on kokemusta kauppakeskusten liiketiloista.", "en": "Yes, we have experience with shopping centre commercial spaces."}, "211": {"fi": "Saako aikataulun muuttaa?", "en": "Can the schedule be changed?"}, "212": {"fi": "Kyllä, ilmoita muutoksesta vähintään 48 tuntia etukäteen.", "en": "Yes, notify us at least 48 hours in advance."}, "213": {"fi": "Käytättekö hajusteettomia tuotteita?", "en": "Do you use fragrance-free products?"}, "214": {"fi": "Voimme käyttää hajusteettomia tuotteita pyydettäessä.", "en": "We can use fragrance-free products on request."}, "215": {"fi": "Ravintolasiivous · Helsinki, Espoo & Vantaa", "en": "Restaurant Cleaning · Helsinki, Espoo & Vantaa"}, "216": {"fi": "Hygieeniset ja siistit tilat ovat ravintolan tärkein vaatimus. Huolehdimme keittiöistä, saleista ja tausta-alueista ammattimaisesti.", "en": "Hygienic and clean spaces are the most important requirement for a restaurant. We professionally handle kitchens, dining rooms and back areas."}, "217": {"fi": "Ammattikeittiöt", "en": "Professional kitchens"}, "218": {"fi": "Rasvaisten pintojen, liesien, uunien ja huuvien puhdistus.", "en": "Cleaning greasy surfaces, stoves, ovens and extractor hoods."}, "219": {"fi": "Pöydät, tuolit, lattiat puhtaana joka päivä.", "en": "Tables, chairs, floors clean every day."}, "220": {"fi": "Desinfiointi", "en": "Disinfection"}, "221": {"fi": "Omavalvontasuunnitelman mukainen desinfiointi kosketuspinnoille.", "en": "Disinfection of touch surfaces according to the self-monitoring plan."}, "222": {"fi": "Biojätteet, kierrätys ja roskien tyhjennys sovitusti.", "en": "Biowaste, recycling and waste removal as agreed."}, "223": {"fi": "Omavalvonta-tuki", "en": "Self-monitoring support"}, "224": {"fi": "Siivouspäiväkirja ja dokumentointi omavalvontaa varten.", "en": "Cleaning log and documentation for self-monitoring."}, "225": {"fi": "Yösiivous", "en": "Night cleaning"}, "226": {"fi": "Siivous aukioloajan ulkopuolella — aamulla tai yöllä.", "en": "Cleaning outside opening hours, morning or night."}, "227": {"fi": "Noudatatteko elintarvikehygieniavaatimuksia?", "en": "Do you comply with food hygiene requirements?"}, "228": {"fi": "Kyllä, HACCP-periaatteiden mukaisesti.", "en": "Yes, according to HACCP principles."}, "229": {"fi": "Voitteko siivota yön aikana?", "en": "Can you clean at night?"}, "230": {"fi": "Kyllä, tarjoamme yösiivouspalvelua.", "en": "Yes, we offer a night cleaning service."}, "231": {"fi": "Kuinka usein tarvitaan?", "en": "How often is it needed?"}, "232": {"fi": "Useimmat ravintolat tarvitsevat päivittäisen palvelun.", "en": "Most restaurants need daily service."}, "233": {"fi": "Lattiahoito · Helsinki, Espoo & Vantaa", "en": "Floor Maintenance · Helsinki, Espoo & Vantaa"}, "234": {"fi": "Ammattimainen lattioiden hoito pidentää käyttöikää ja pitää tilat edustavina — kivi, laatta, parketti, laminaatti ja teollisuuslattiat.", "en": "Professional floor care extends service life and keeps spaces presentable, stone, tile, parquet, laminate and industrial floors."}, "235": {"fi": "Pesu ja kiillotus", "en": "Washing and polishing"}, "236": {"fi": "Konepesulla ja kiillotuksella lattiasta tulee kuin uusi.", "en": "Machine washing and polishing makes the floor look like new."}, "237": {"fi": "Pinnoitus ja vahan ajo", "en": "Coating and waxing"}, "238": {"fi": "Suojaava pinnoite kovaa kulutusta kestäville lattioille.", "en": "Protective coating for high-traffic floors."}, "239": {"fi": "Ylläpitopuhdistus", "en": "Maintenance cleaning"}, "240": {"fi": "Päivittäinen tai viikoittainen ylläpito sovitusti.", "en": "Daily or weekly maintenance as agreed."}, "241": {"fi": "Teollisuuslattiat", "en": "Industrial floors"}, "242": {"fi": "Epoksilattiat, betoni ja muut erikoismateriaalit.", "en": "Epoxy floors, concrete and other specialist materials."}, "243": {"fi": "Kivi- ja laattapinnat", "en": "Stone and tile surfaces"}, "244": {"fi": "Graniitti, marmori, keramiikka — oikeat menetelmät.", "en": "Granite, marble, ceramics, the right methods."}, "245": {"fi": "Puu- ja laminaattilattiat", "en": "Wood and laminate floors"}, "246": {"fi": "Turvallinen puhdistus ja hoito parketti-pinnoille.", "en": "Safe cleaning and care for parquet surfaces."}, "247": {"fi": "Kuinka usein tulisi käsitellä?", "en": "How often should they be treated?"}, "248": {"fi": "Yleensä 1–4 kertaa vuodessa.", "en": "Usually 1-4 times a year."}, "249": {"fi": "Sopiiko koteihin?", "en": "Suitable for homes?"}, "250": {"fi": "Kyllä, hoidamme myös kotien parketit ja kivilattiät.", "en": "Yes, we also handle home parquet and stone floors."}, "251": {"fi": "Poistatteko naarmuja?", "en": "Do you remove scratches?"}, "252": {"fi": "Voimme vähentää naarmuja kiillotuksella.", "en": "We can reduce scratches with polishing."}, "66": {"fi": "Luotettavia siivouspalveluja pääkaupunkiseudulla. Kotisiivous, muuttosiivous, toimistosiivous ja ikkunanpesu ammattitaidolla.", "en": "Reliable cleaning services in the Helsinki metropolitan area. Home, moving, office cleaning and window cleaning with expertise."}, "69": {"fi": "Tietosuoja", "en": "Privacy Policy"}, "73": {"fi": "Tietoa", "en": "About"}, "308": {"fi": "Täytä varauslomake", "en": "Fill in the booking form"}, "309": {"fi": "Otamme yhteyttä ja vahvistamme ajankohdan.", "en": "We will contact you and confirm the time."}, "10": {"fi": "Yrityssiivous", "en": "Commercial Cleaning"}, "310": {"fi": "Kertaluonteinen siivous", "en": "One-time cleaning"}, "311": {"fi": "Lisäpalvelut (valinnainen)", "en": "Additional services (optional)"}, "313": {"fi": "Lisätiedot (valinnainen)", "en": "Additional notes (optional)"}, "315": {"fi": "Vahvistamme saatavuuden tekstiviestillä, WhatsAppilla tai sähköpostilla.", "en": "We confirm availability by text, WhatsApp or email."}, "314": {"fi": "Lähetä varauslomake", "en": "Send booking form"}, "317": {"fi": "Pyydä yhteydenottoa", "en": "Request a callback"}}
function setLang(l) {if(typeof _updatePopupLang==='function')_updatePopupLang(l);
if (l === LANG_CURRENT) return;
LANG_CURRENT = l;
var __FI_FLAG = '<svg class="flag-svg" viewBox="0 0 18 11" width="18" height="11" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0;"><rect width="18" height="11" fill="#ffffff"/><rect y="4" width="18" height="3" fill="#003580"/><rect x="5" width="3" height="11" fill="#003580"/></svg>';
var __US_FLAG = '<svg class="flag-svg" viewBox="0 0 19 10" width="19" height="10" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0;"><rect width="19" height="10" fill="#b22234"/><rect width="19" height="0.77" y="0.77" fill="#fff"/><rect width="19" height="0.77" y="2.31" fill="#fff"/><rect width="19" height="0.77" y="3.85" fill="#fff"/><rect width="19" height="0.77" y="5.38" fill="#fff"/><rect width="19" height="0.77" y="6.92" fill="#fff"/><rect width="19" height="0.77" y="8.46" fill="#fff"/><rect width="8" height="5.38" fill="#3c3b6e"/></svg>';
var __langLabel = document.querySelector('.nav-lang-label');
if (__langLabel) { __langLabel.innerHTML = (l === 'fi') ? (__FI_FLAG + ' Suomi') : (__US_FLAG + ' English'); }
document.querySelectorAll('.nav-lang-dd a[data-lang]').forEach(function(a){
a.classList.toggle('active', a.getAttribute('data-lang') === l);
});
document.querySelectorAll('.nav-lang button, #mobMenu button[id^="mobLang"]').forEach(function(b) {
b.classList.toggle('active', b.textContent.trim() === l.toUpperCase());
});
var __wrap = document.querySelector('.nav-lang.nav-dd-wrap');
if (__wrap) { __wrap.classList.add('closing'); setTimeout(function(){__wrap.classList.remove('closing');}, 400); }
var mobFi = document.getElementById('mobLangFi');
var mobEn = document.getElementById('mobLangEn');
if (mobFi && mobEn) {
if (l === 'fi') {
mobFi.style.background = 'rgba(255,255,255,.2)'; mobFi.style.color = '#fff'; mobFi.style.borderColor = 'rgba(255,255,255,.4)';
mobEn.style.background = 'transparent'; mobEn.style.color = 'rgba(255,255,255,.6)'; mobEn.style.borderColor = 'rgba(255,255,255,.2)';
} else {
mobEn.style.background = 'rgba(255,255,255,.2)'; mobEn.style.color = '#fff'; mobEn.style.borderColor = 'rgba(255,255,255,.4)';
mobFi.style.background = 'transparent'; mobFi.style.color = 'rgba(255,255,255,.6)'; mobFi.style.borderColor = 'rgba(255,255,255,.2)';
}
}
var dict = l === 'en' ? I18N_EN : I18N_FI;
document.querySelectorAll('[data-i18n-fi][data-i18n-en]').forEach(function(el) {
var newText = l === 'en' ? el.getAttribute('data-i18n-en') : el.getAttribute('data-i18n-fi');
if (!newText) return;
if (el.children.length === 0) {
el.textContent = newText;
} else {
el.textContent = newText;
}
});
document.querySelectorAll('[data-i18n]').forEach(function(el) {
var id = el.getAttribute('data-i18n');
var entry = I18N_MAP[id];
if (!entry) return;
var newText = l === 'en' ? entry.en : entry.fi;
if (newText) el.textContent = newText;
});
document.querySelectorAll('[data-placeholder-fi][data-placeholder-en]').forEach(function(el) {
el.placeholder = l === 'en' ? el.getAttribute('data-placeholder-en') : el.getAttribute('data-placeholder-fi');
});
function trySplitEm(el) {
if (el.hasAttribute('data-i18n') || el.hasAttribute('data-i18n-fi')) return false;
var children = el.children;
if (children.length !== 1) return false;
var em = children[0];
if (em.tagName !== 'EM' && em.tagName !== 'SPAN' && em.tagName !== 'STRONG' && em.tagName !== 'I' && em.tagName !== 'B') return false;
if (em.children.length !== 0) return false;
var fullText = el.textContent.replace(/\s+/g, ' ').trim();
if (!fullText || !dict[fullText]) return false;
var translated = dict[fullText];
var origEm = em.textContent.trim();
var emWords = origEm.split(/\s+/).filter(Boolean).length;
var transWords = translated.split(/\s+/).filter(Boolean);
if (transWords.length < emWords + 1) {
el.textContent = translated;
return true;
}
var emPart = transWords.slice(-emWords).join(' ');
var prePart = transWords.slice(0, transWords.length - emWords).join(' ');
while (el.firstChild) el.removeChild(el.firstChild);
if (prePart) el.appendChild(document.createTextNode(prePart + ' '));
var newEm = document.createElement(em.tagName.toLowerCase());
Array.from(em.attributes || []).forEach(function(a) { newEm.setAttribute(a.name, a.value); });
newEm.textContent = emPart;
el.appendChild(newEm);
return true;
}
function walkNode(node) {
if (node.nodeType === 3) {
var t = node.textContent.trim();
if (t && dict[t]) node.textContent = node.textContent.replace(t, dict[t]);
} else if (node.nodeType === 1) {
var tag = node.tagName;
if (tag === 'SCRIPT' || tag === 'STYLE') return;
if (node.placeholder && dict[node.placeholder]) node.placeholder = dict[node.placeholder];
if (!node.hasAttribute('data-i18n') && !node.hasAttribute('data-i18n-fi')) {
if (/^(H[1-6]|P|DIV|SPAN)$/.test(tag) && trySplitEm(node)) return;
Array.from(node.childNodes).forEach(walkNode);
}
}
}
walkNode(document.body);
if (typeof REVIEWS_DATA !== 'undefined' && typeof buildRevCard !== 'undefined') {
REVIEWS_DATA.forEach(function(r) {
if (l === 'en' && dict[r.date]) r._displayDate = dict[r.date];
else if (l === 'fi') r._displayDate = null;
});
var cards = REVIEWS_DATA.map(function(r) {
var rCopy = Object.assign({}, r);
if (r._displayDate) rCopy.date = r._displayDate;
return buildRevCard(rCopy);
}).join('');
document.querySelectorAll('.reviews-track').forEach(function(t) {
if (t.children.length > 0) t.innerHTML = cards;
});
}
if (typeof _currentPage !== 'undefined' && typeof updateFctaText === 'function') {
updateFctaText(_currentPage);
}
document.documentElement.lang = l;
}
document.addEventListener('DOMContentLoaded', function(){
var v = document.getElementById('heroVideo');
if(!v) return;
v.removeAttribute('poster');
v.setAttribute('loop','');
v.setAttribute('playsinline','');
v.setAttribute('muted','');
v.muted = true;
v.setAttribute('preload','auto');
function tryPlay(){
var p = v.play();
if(p !== undefined){ p.catch(function(){}); }
}
v.addEventListener('ended',function(){v.currentTime=0;tryPlay();});
v.addEventListener('suspend',function(){tryPlay();});
document.addEventListener('visibilitychange',function(){
if(!document.hidden && v.paused) tryPlay();
});
document.addEventListener('touchstart', function onTouch(){
if(v.paused) tryPlay();
document.removeEventListener('touchstart', onTouch);
}, {once:true, passive:true});
tryPlay();
});
var REVIEWS_DATA = [
{name:'Kirsi Molander',ini:'K',col:'#1d4ed8',stars:5,text:'Ikkunat tuli kiiltäviksi. Hyvää jälkeä! Ammattitaitoinen ja nopea palvelu.',date:'3 päivää sitten'},
{name:'Siru K',ini:'S',col:'#7c3aed',stars:5,text:'Olen todella tyytyväinen asunnon siivoukseen! Ystävällinen viestintä, täsmällinen toiminta ja lupaukset pitivät kuten sovittu.',date:'6 päivää sitten'},
{name:'Ritva Sinkkonen',ini:'R',col:'#0d9488',stars:5,text:'Ikkunat ovat kirkkaat, kevät saa tulla! Loistava palvelu — tuli nopeasti valmista laadukkaalla lopputuloksella.',date:'Viikko sitten'},
{name:'Minna Virtanen',ini:'M',col:'#059669',stars:5,text:'Laadukasta siivousta ja loistava lopputulos. Sama siivooja joka kerta — juuri niin kuin toivoin.',date:'Viikko sitten'},
{name:'Tero Leinonen',ini:'T',col:'#d97706',stars:5,text:'Muuttosiivous hoitui tosi hyvin ja asunto jäi oikeasti puhtaaksi. Suosittelen!',date:'2 viikkoa sitten'},
{name:'Aino Korhonen',ini:'A',col:'#be185d',stars:5,text:'Erittäin ammattitaitoinen palvelu! Koti oli täydellinen jälkeenpäin. Erittäin suositeltava.',date:'3 viikkoa sitten'},
{name:'Lauri Salo',ini:'L',col:'#1d4ed8',stars:5,text:'Cleava on paras valinta ikkunanpesuun! Nopea, täsmällinen ja siisti. Kirkkaat ikkunat takuulla.',date:'1 kuukausi sitten'},
{name:'Paula Heikkinen',ini:'P',col:'#7c3aed',stars:5,text:'Cleavan palvelu oli ensiluokkaista — siivooja oli täydellisen huolellinen ja ystävällinen.',date:'1 kuukausi sitten'},
{name:'Risto Nieminen',ini:'R',col:'#0891b2',stars:4,text:'Tilausprosessi oli helppo ja nopea. Tiimi teki upeaa työtä, pientä viivästystä aikataulussa.',date:'2 kuukautta sitten'},
{name:'Kaisa Järvinen',ini:'K',col:'#059669',stars:5,text:'Todella ammattimaista palvelua! Cleava piti lupauksensa ja hoiti kaiken sovitusti.',date:'2 kuukautta sitten'},
{name:'Mikko Ojala',ini:'M',col:'#d97706',stars:5,text:'Siivouksen laatu oli poikkeuksellista. Kommunikointi oli sujuvaa koko prosessin ajan.',date:'2 kuukautta sitten'},
{name:'Tiina Mattila',ini:'T',col:'#be185d',stars:5,text:'Toimistosiivous on ollut erinomaista. Aina luotettavasti ajallaan ja laadukkaasti tehty.',date:'3 kuukautta sitten'},
{name:'Eero Mäkinen',ini:'E',col:'#1d4ed8',stars:5,text:'Muuttosiivous ylitti odotukset! Asunto oli täydellisen siisti — vuokranantaja ihastunut.',date:'3 kuukautta sitten'},
{name:'Leena Turunen',ini:'L',col:'#7c3aed',stars:5,text:'Olen käyttänyt Cleavaa jo vuoden ja en voisi olla tyytyväisempi. Paras siivouspalvelu!',date:'4 kuukautta sitten'},
{name:'Seppo Virtanen',ini:'S',col:'#0891b2',stars:4,text:'Ikkunanpesu sujui erinomaisesti. Siivooja oli täsmällinen, joskin pieni alue jäi.',date:'4 kuukautta sitten'},
{name:'Hannele Laine',ini:'H',col:'#059669',stars:5,text:'Suursiivous ennen joulua oli huippuluokkaa. Kotiin oli ilo tulla takaisin!',date:'5 kuukautta sitten'},
{name:'Jyrki Korhonen',ini:'J',col:'#d97706',stars:5,text:'Olen kokeillut monia siivousfirmoja mutta Cleava on ehdottomasti paras. Ei vertailua.',date:'5 kuukautta sitten'},
{name:'Sirpa Hämäläinen',ini:'S',col:'#be185d',stars:5,text:'Hyvä palvelu! Siivooja oli ystävällinen ja teki tarkan työn. Tulos oli erinomainen.',date:'6 kuukautta sitten'},
{name:'Tapani Leinonen',ini:'T',col:'#1d4ed8',stars:5,text:'Suosittelen Cleavaa kaikille. Palvelu on ammattimaista, luotettavaa ja hintataso kohdillaan.',date:'6 kuukautta sitten'},
{name:'Maija Koivisto',ini:'M',col:'#7c3aed',stars:5,text:'Kolme kertaa tilannut ja joka kerta erinomainen lopputulos. Ei tarvita muita!',date:'7 kuukautta sitten'},
];
function starSVG(){return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>';}
function gSVG(){return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>';}
var _starsEl = document.querySelector('.stars'); if(_starsEl) _starsEl.innerHTML = starSVG().repeat(5);
var _gPillEl = document.querySelector('.g-pill'); if(_gPillEl) _gPillEl.innerHTML = gSVG() + ' Google';
function buildRevCard(r){
var stars = r.stars || 5;
var starHtml = starSVG().repeat(stars);
if(stars < 5) starHtml += '<span style="opacity:.25">'+starSVG().repeat(5-stars)+'</span>';
var dateHtml = r.date ? '<p class="review-card__date">'+r.date+'</p>' : '';
return '<div class="review-card"><div class="review-card__head"><div class="review-card__author"><div class="review-card__avatar" style="background:'+r.col+'">'+r.ini+'</div><div><p class="review-card__name">'+r.name+'</p><p class="review-card__via">'+gSVG()+' Google</p></div></div><div class="review-card__stars">'+starHtml+'</div></div><p class="review-card__text">'+r.text+'</p>'+dateHtml+'</div>';
}
function buildMiniRev(r){
return '<div class="sp-review-item"><div class="sp-review-avatar" style="background:'+r.col+'">'+r.ini+'</div><div><div class="sp-review-stars">'+starSVG().repeat(5)+'</div><p class="sp-review-name">'+r.name+'</p><p class="sp-review-text">'+r.text+'</p></div></div>';
}
var rIdx=0,rDrag=false,rSX=0;
function getPerView(){return window.innerWidth<640?1:window.innerWidth<1024?2:3;}
function getCardW(){var t=document.getElementById('homeReviewsTrack');var c=t&&t.querySelector('.review-card');return c?c.offsetWidth+18:338;}
function maxI(){return Math.max(0,REVIEWS_DATA.length-getPerView());}
function updateCarousel(noAnim){
var t=document.getElementById('homeReviewsTrack');if(!t)return;
t.style.transition=noAnim?'none':'transform .5s cubic-bezier(.23,1,.32,1)';
t.style.transform='translateX(-'+(rIdx*getCardW())+'px)';
document.querySelectorAll('.reviews-dot').forEach(function(d,i){d.classList.toggle('active',i===rIdx);});
var prev=document.getElementById('homeRevPrev'),next=document.getElementById('homeRevNext');
if(prev)prev.style.opacity=rIdx===0?'.4':'1';
if(next)next.style.opacity=rIdx>=maxI()?'.4':'1';
}
function buildDots(){
var d=document.getElementById('homeRevDots');if(!d)return;d.innerHTML='';
for(var i=0;i<=maxI();i++){(function(idx){var dot=document.createElement('button');dot.className='reviews-dot'+(idx===0?' active':'');dot.addEventListener('click',function(){rIdx=idx;updateCarousel();});d.appendChild(dot);})(i);}
}
function fetchLiveReviews() {
fetch('/.netlify/functions/get-reviews')
.then(function(r){ return r.json(); })
.then(function(data) {
if (!data.reviews || !data.reviews.length) return;
var colors = ['#1d4ed8','#7c3aed','#0891b2','#059669','#d97706','#be185d'];
var liveReviews = data.reviews.map(function(r, i) {
return {
name: r.name,
ini: r.name ? r.name.charAt(0).toUpperCase() : '?',
col: colors[i % colors.length],
text: r.text,
date: r.date,
stars: r.rating,
};
});
var liveNames = liveReviews.map(function(r){ return r.name.toLowerCase(); });
var dedupedHardcoded = REVIEWS_DATA.filter(function(r){
return liveNames.indexOf(r.name.toLowerCase()) === -1;
});
var merged = liveReviews.concat(dedupedHardcoded);
REVIEWS_DATA = merged;
var cards = REVIEWS_DATA.map(buildRevCard).join('');
var trackIds = [
'homeReviewsTrack',
'spRevTrack1','spRevTrack2','spRevTrack3','spRevTrack4','spRevTrack5',
'spRevTrack6','spRevTrack7','spRevTrack8','spRevTrack9',
'spRevTrack10','spRevTrack11','spRevTrack12','spRevTrack13','spRevTrack14'
];
trackIds.forEach(function(id) {
var track = document.getElementById(id);
if (track) track.innerHTML = cards;
});
if (typeof buildDots === 'function') buildDots();
var spPairs = [
['spRevTrack1','spRevDots1'],['spRevTrack2','spRevDots2'],['spRevTrack3','spRevDots3'],
['spRevTrack4','spRevDots4'],['spRevTrack5','spRevDots5'],['spRevTrack6','spRevDots6'],
['spRevTrack7','spRevDots7'],['spRevTrack8','spRevDots8'],['spRevTrack9','spRevDots9'],
['spRevTrack10','spRevDots10'],['spRevTrack11','spRevDots11'],['spRevTrack12','spRevDots12'],
['spRevTrack13','spRevDots13'],['spRevTrack14','spRevDots14']
];
if (typeof buildSpDots === 'function') {
spPairs.forEach(function(p){ buildSpDots(p[0], p[1]); });
}
})
.catch(function(e){ console.log('Reviews fetch failed, using cached data:', e); });
}
document.addEventListener('DOMContentLoaded', function() {
setTimeout(fetchLiveReviews, 1000);
});
function initCarousel(){
var t=document.getElementById('homeReviewsTrack');if(!t)return;
t.innerHTML=REVIEWS_DATA.map(buildRevCard).join('');
buildDots();
var prev=document.getElementById('homeRevPrev'),next=document.getElementById('homeRevNext');
if(prev)prev.addEventListener('click',function(){if(rIdx>0){rIdx--;updateCarousel();}});
if(next)next.addEventListener('click',function(){if(rIdx<maxI()){rIdx++;updateCarousel();}});
t.addEventListener('mousedown',function(e){rDrag=true;rSX=e.clientX;t.style.transition='none';});
document.addEventListener('mousemove',function(e){if(!rDrag)return;t.style.transform='translateX(-'+(rIdx*getCardW()+(rSX-e.clientX))+'px)';});
document.addEventListener('mouseup',function(e){if(!rDrag)return;rDrag=false;var dx=rSX-e.clientX;if(dx>60&&rIdx<maxI())rIdx++;else if(dx<-60&&rIdx>0)rIdx--;updateCarousel();});
t.addEventListener('touchstart',function(e){rSX=e.touches[0].clientX;},{passive:true});
t.addEventListener('touchend',function(e){var dx=rSX-e.changedTouches[0].clientX;if(dx>50&&rIdx<maxI())rIdx++;else if(dx<-50&&rIdx>0)rIdx--;updateCarousel();});
setInterval(function(){if(rDrag)return;rIdx=rIdx<maxI()?rIdx+1:0;updateCarousel();},6000);
window.addEventListener('resize',function(){buildDots();rIdx=Math.min(rIdx,maxI());updateCarousel(true);[['spRevTrack1','spRevDots1'],['spRevTrack2','spRevDots2'],['spRevTrack3','spRevDots3'],['spRevTrack4','spRevDots4'],['spRevTrack5','spRevDots5'],['spRevTrack6','spRevDots6'],['spRevTrack7','spRevDots7'],['spRevTrack8','spRevDots8'],['spRevTrack9','spRevDots9'],['spRevTrack10','spRevDots10'],['spRevTrack11','spRevDots11'],['spRevTrack12','spRevDots12'],['spRevTrack13','spRevDots13'],['spRevTrack14','spRevDots14']].forEach(function(p){if(carouselStates[p[0]]){carouselStates[p[0]].idx=Math.min(carouselStates[p[0]].idx,getSpMaxI(p[0]));updateSpCarousel(p[0],p[1],true);buildSpDots(p[0],p[1]);}});});
updateCarousel(true);
}
var FCTA_TEXTS = {
'home': {
left:'Kysymyksiä tai ajatuksia?', leftEn:'Questions or thoughts?',
leftDesc:'Soita tai jätä yhteystietosi.', leftDescEn:'Call or leave your contact details.',
right:'Haluatko siistin kodin tai toimiston?', rightEn:'Want a clean home or office?'
},
'home-cleaning': {
left:'Kiinnostiko kotisiivous?', leftEn:'Interested in home cleaning?',
leftDesc:'Soita tai jätä puhelinnumerosi.', leftDescEn:'Call or leave your phone number.',
right:'Pyydä kotisiivoustarjous', rightEn:'Request a home cleaning quote'
},
'moving-cleaning': {
left:'Muutto edessä?', leftEn:'Moving soon?',
leftDesc:'Ota yhteyttä niin sovitaan ajankohta.', leftDescEn:'Get in touch and we will agree on a time.',
right:'Pyydä muuttosiivouksen tarjous', rightEn:'Request a moving cleaning quote'
},
'office-cleaning': {
left:'Kiinnostiko toimistosiivous?', leftEn:'Interested in office cleaning?',
leftDesc:'Soita tai täytä lomake.', leftDescEn:'Call or fill in the form.',
right:'Pyydä yritystarjous', rightEn:'Request a business quote'
},
'ikkunanpesu': {
left:'Kiinnostiko ikkunanpesu?', leftEn:'Interested in window cleaning?',
leftDesc:'Soita tai jätä yhteystietosi.', leftDescEn:'Call or leave your contact details.',
right:'Pyydä ikkunanpesun tarjous', rightEn:'Request a window cleaning quote'
},
'suursiivous': {
left:'Kiinnostiko suursiivous?', leftEn:'Interested in deep cleaning?',
leftDesc:'Soita tai jätä yhteystietosi.', leftDescEn:'Call or leave your contact details.',
right:'Pyydä suursiivoustarjous', rightEn:'Request a deep cleaning quote'
},
'erikoissiivous': {
left:'Kiinnostiko erikoissiivous?', leftEn:'Interested in specialist cleaning?',
leftDesc:'Kerro tarpeesi, teemme tarjouksen.', leftDescEn:'Tell us your needs and we will make a quote.',
right:'Pyydä erikoissiivouksen tarjous', rightEn:'Request a specialist cleaning quote'
},
'porrassiivous': {
left:'Kiinnostiko porrassiivous?', leftEn:'Interested in stairwell cleaning?',
leftDesc:'Pyydä maksuton tarjous.', leftDescEn:'Request a free quote.',
right:'Pyydä porrassiivouksen tarjous', rightEn:'Request a stairwell cleaning quote'
},
'yrityssiivous': {
left:'Kiinnostiko yrityssiivous?', leftEn:'Interested in commercial cleaning?',
leftDesc:'Soita tai jätä yhteystietosi.', leftDescEn:'Call or leave your contact details.',
right:'Pyydä yritystarjous', rightEn:'Request a business quote'
},
'myymalasiivous': {
left:'Kiinnostiko myymäläsiivous?', leftEn:'Interested in retail cleaning?',
leftDesc:'Soita tai jätä yhteystietosi.', leftDescEn:'Call or leave your contact details.',
right:'Pyydä myymälasiivouksen tarjous', rightEn:'Request a retail cleaning quote'
},
'ravintolasiivous': {
left:'Kiinnostiko ravintolasiivous?', leftEn:'Interested in restaurant cleaning?',
leftDesc:'Soita tai jätä yhteystietosi.', leftDescEn:'Call or leave your contact details.',
right:'Pyydä ravintolosiivouksen tarjous', rightEn:'Request a restaurant cleaning quote'
},
'lattiahoito': {
left:'Kiinnostiko lattiahoito?', leftEn:'Interested in floor maintenance?',
leftDesc:'Soita tai jätä yhteystietosi.', leftDescEn:'Call or leave your contact details.',
right:'Pyydä lattiahoidon tarjous', rightEn:'Request a floor maintenance quote'
},
'rakennussiivous': {
left:'Kiinnostiko rakennussiivous?', leftEn:'Interested in post-construction cleaning?',
leftDesc:'Soita tai jätä yhteystietosi.', leftDescEn:'Call or leave your contact details.',
right:'Pyydä rakennussiivouksen tarjous', rightEn:'Request a post-construction cleaning quote'
},
'hinnasto': {
left:'Haluatko lisätietoja hinnoista?', leftEn:'Want more information about pricing?',
leftDesc:'Soita tai jätä yhteystietosi.', leftDescEn:'Call or leave your contact details.',
right:'Pyydä henkilökohtainen tarjous', rightEn:'Request a personalised quote'
},
'tarinamme': {
left:'Haluatko tietää lisää?', leftEn:'Want to know more?',
leftDesc:'Soita tai lähetä meille viesti.', leftDescEn:'Call or send us a message.',
right:'Ota yhteyttä', rightEn:'Get in touch'
},
'lahjakortti': {
left:'Kysymyksiä lahjakorteista?', leftEn:'Questions about gift cards?',
leftDesc:'Soita tai jätä yhteystietosi.', leftDescEn:'Call or leave your contact details.',
right:'Osta lahjakortti', rightEn:'Buy a gift card'
},
};
function updateFctaText(pageName) {
var t = FCTA_TEXTS[pageName] || FCTA_TEXTS['home'];
var isEn = (typeof LANG_CURRENT !== 'undefined' && LANG_CURRENT === 'en');
var leftText = isEn && t.leftEn ? t.leftEn : t.left;
var leftDescText = isEn && t.leftDescEn ? t.leftDescEn : t.leftDesc;
var rightText = isEn && t.rightEn ? t.rightEn : t.right;
document.querySelectorAll('#fctaLeftTitle').forEach(function(el){ el.textContent = leftText; });
document.querySelectorAll('#fctaLeftDesc').forEach(function(el){ el.textContent = leftDescText; });
document.querySelectorAll('#fctaRightTitle').forEach(function(el){ el.textContent = rightText; });
}
var carouselStates = {};
function initSpCarousel(trackId, dotsId) {
var state = {idx:0, drag:false, startX:0};
carouselStates[trackId] = state;
var t = document.getElementById(trackId);
if(!t) return;
t.innerHTML = REVIEWS_DATA.map(buildRevCard).join('');
buildSpDots(trackId, dotsId);
t.addEventListener('mousedown',function(e){state.drag=true;state.startX=e.clientX;t.style.transition='none';});
document.addEventListener('mousemove',function(e){if(!state.drag)return;var w=getSpCardW(trackId);t.style.transform='translateX(-'+(state.idx*w+(state.startX-e.clientX))+'px)';});
document.addEventListener('mouseup',function(e){if(!state.drag)return;state.drag=false;var dx=state.startX-e.clientX;var mi=getSpMaxI(trackId);if(dx>60&&state.idx<mi)state.idx++;else if(dx<-60&&state.idx>0)state.idx--;updateSpCarousel(trackId,dotsId,false);});
t.addEventListener('touchstart',function(e){state.startX=e.touches[0].clientX;},{passive:true});
t.addEventListener('touchend',function(e){var dx=state.startX-e.changedTouches[0].clientX;var mi=getSpMaxI(trackId);if(dx>50&&state.idx<mi)state.idx++;else if(dx<-50&&state.idx>0)state.idx--;updateSpCarousel(trackId,dotsId,false);});
var intervals = {spRevTrack1:6200, spRevTrack2:6600, spRevTrack3:7000, spRevTrack4:7400};
var interval = intervals[trackId] || 6000;
setInterval(function(){if(state.drag)return;var mi=getSpMaxI(trackId);state.idx=state.idx<mi?state.idx+1:0;updateSpCarousel(trackId,dotsId,false);}, interval);
updateSpCarousel(trackId, dotsId, true);
}
function getSpCardW(trackId) {
var t = document.getElementById(trackId);
var c = t && t.querySelector('.review-card');
return c ? c.offsetWidth + 18 : 338;
}
function getSpMaxI(trackId) {
return Math.max(0, REVIEWS_DATA.length - getPerView());
}
function updateSpCarousel(trackId, dotsId, noAnim) {
var state = carouselStates[trackId];
if(!state) return;
var t = document.getElementById(trackId);
if(!t) return;
t.style.transition = noAnim ? 'none' : 'transform .5s cubic-bezier(.23,1,.32,1)';
t.style.transform = 'translateX(-'+(state.idx*getSpCardW(trackId))+'px)';
var dots = document.getElementById(dotsId);
if(dots) dots.querySelectorAll('.reviews-dot').forEach(function(d,i){d.classList.toggle('active',i===state.idx);});
}
function buildSpDots(trackId, dotsId) {
var d = document.getElementById(dotsId);
if(!d) return;
d.innerHTML = '';
var mi = getSpMaxI(trackId);
for(var i=0;i<=mi;i++){(function(idx){var dot=document.createElement('button');dot.className='reviews-dot'+(idx===0?' active':'');dot.addEventListener('click',function(){carouselStates[trackId].idx=idx;updateSpCarousel(trackId,dotsId,false);});d.appendChild(dot);})(i);}
}
function moveCarousel(trackId, dotsId, dir) {
var state = carouselStates[trackId];
if(!state) return;
var mi = getSpMaxI(trackId);
state.idx = Math.max(0, Math.min(mi, state.idx + dir));
updateSpCarousel(trackId, dotsId, false);
}
function initAllCarousels() {
initCarousel();
[['spRevTrack1','spRevDots1'],['spRevTrack2','spRevDots2'],['spRevTrack3','spRevDots3'],['spRevTrack4','spRevDots4'],['spRevTrack5','spRevDots5'],['spRevTrack6','spRevDots6'],['spRevTrack7','spRevDots7'],['spRevTrack8','spRevDots8'],['spRevTrack9','spRevDots9'],['spRevTrack10','spRevDots10'],['spRevTrack11','spRevDots11'],['spRevTrack12','spRevDots12'],['spRevTrack13','spRevDots13'],['spRevTrack14','spRevDots14']].forEach(function(pair){
initSpCarousel(pair[0], pair[1]);
});
}
function populateServiceReviews() {
var grids = [
{id:'homeCleaningReviews', offset:0},
{id:'movingReviews', offset:4},
{id:'officeReviews', offset:8}
];
grids.forEach(function(g){
var el=document.getElementById(g.id);if(!el)return;
var reviews=[];
for(var i=0;i<4;i++) reviews.push(REVIEWS_DATA[(g.offset+i)%REVIEWS_DATA.length]);
el.innerHTML=reviews.map(buildMiniRev).join('');
});
}
(function(){
var PLACE_ID='ChIJLcVmPnUn608REYWvMWFlBiM';
var API_KEY='AIzaSyDOux0Db3-mg5lssh2KiNAVKOL4W_YiLFk';
function loadGoogleReviews(){
var script=document.createElement('script');
script.src='https://maps.googleapis.com/maps/api/js?key='+API_KEY+'&libraries=places&callback=onGoogleMapsLoaded';
script.async=true;script.defer=true;
document.head.appendChild(script);
}
window.onGoogleMapsLoaded=function(){
var svc=new google.maps.places.PlacesService(document.createElement('div'));
svc.getDetails({placeId:PLACE_ID,fields:['reviews','rating','user_ratings_total','name']},function(place,status){
if(status===google.maps.places.PlacesServiceStatus.OK&&place.reviews&&place.reviews.length){
var colors=['#1d4ed8','#7c3aed','#0d9488','#0891b2','#dc2626','#b45309','#059669'];
var googleRevs=place.reviews.slice(0,20).map(function(r,i){
return {name:r.author_name,ini:r.author_name?r.author_name[0].toUpperCase():'A',col:colors[i%colors.length],text:r.text,date:r.relative_time_description};
});
if(googleRevs.length>=4){
REVIEWS_DATA.splice(0,googleRevs.length);
Array.prototype.unshift.apply(REVIEWS_DATA,googleRevs);
}
rIdx=0;
initAllCarousels();
}
});
};
loadGoogleReviews();
})();
function initReveal(){
var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});},{threshold:0.08,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal:not(.visible)').forEach(function(el){obs.observe(el);});
}
document.addEventListener('DOMContentLoaded', function(){
initAllCarousels();
initReveal();
});
function openBookingModal() {
document.getElementById('bookingFormModal').classList.add('open');
document.body.style.overflow = 'hidden';
}
function closeBookingModal() {
document.getElementById('bookingFormModal').classList.remove('open');
document.body.style.overflow = '';
}
function handleBookingModalBg(e) {
if (e.target === document.getElementById('bookingFormModal')) closeBookingModal();
}
function setBfType(btn, type) {
document.querySelectorAll('.bf-toggle__btn').forEach(function(b) { b.classList.remove('active'); });
btn.classList.add('active');
document.getElementById('bf_service_type').value = type;
}
function submitBookingForm(e) {
e.preventDefault();
try {
var form = e.target;
var formData = new FormData(form);
var params = new URLSearchParams();
formData.forEach(function(v, k){ params.append(k, v); });
fetch('/', { method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body: params.toString() }).catch(function(){});
var btn = document.getElementById('booking-submit-btn');
if(btn){ btn.textContent = '✓ Lähetetty!'; btn.disabled = true; btn.style.background = '#22c55e'; }
closeBookingModal();
if(typeof showTyPopup==='function'){ showTyPopup(); }
} catch(err) {}
return false;
}
var STRIPE_PK = 'pk_live_51SxaFaRo1z1DVPwvigYKIVZis2fR5NOLbgUQpyVqJSAxz0YHOKypHyjSJKcusu5Eet752JQ8J6ZnitZuqFiIAD8N00BonRJ4Be';
function openMob() {
var menu = document.getElementById('mobMenu');
document.querySelectorAll('.mob-accordion').forEach(function(a) {
a.classList.remove('active');
});
document.querySelectorAll('.mob-accordion-btn').forEach(function(b) {
b.classList.remove('active');
});
menu.classList.add('open');
document.body.style.overflow = 'hidden';
}
function closeMob() {
document.getElementById('mobMenu').classList.remove('open');
document.body.style.overflow = '';
}
function toggleMob() {
var menu = document.getElementById('mobMenu');
if (menu.classList.contains('open')) { closeMob(); } else { openMob(); }
}
function toggleMobAcc(accId, btnId) {
var acc = document.getElementById(accId);
var btn = document.getElementById(btnId);
var isOpen = acc.classList.contains('active');
document.querySelectorAll('.mob-accordion').forEach(function(a) { a.classList.remove('active'); });
document.querySelectorAll('.mob-accordion-btn').forEach(function(b) { b.classList.remove('active'); });
if (!isOpen) {
acc.classList.add('active');
btn.classList.add('active');
}
}
window.addEventListener('popstate', function(e) {
if (e.state && e.state.page) { showPage(e.state.page, false); }
});
var _pageUrls = {
'home': '/',
'home-cleaning': '/kotisiivous',
'moving-cleaning': '/muuttosiivous',
'office-cleaning': '/toimistosiivous',
'ikkunanpesu': '/ikkunanpesu',
'suursiivous': '/suursiivous',
'erikoissiivous': '/erikoissiivous',
'porrassiivous': '/porrassiivous',
'hinnasto': '/hinnasto',
'tarinamme': '/tarinamme',
'lahjakortti': '/lahjakortti',
'privacy': '/palveluehdot',
'cookies': '/evasteet',
'kiitos': '/kiitos',
'yrityssiivous': '/yrityssiivous',
'myymalasiivous': '/myymalasiivous',
'rakennussiivous': '/rakennussiivous',
'ravintolasiivous': '/ravintolasiivous',
'lattiahoito': '/lattiahoito'
};
(function() {
var _urlPages = {};
Object.keys(_pageUrls).forEach(function(k){ _urlPages[_pageUrls[k]] = k; });
var path = window.location.pathname.replace(/\/$/, '') || '/';
var page = _urlPages[path] || 'home';
if (page !== 'home') { showPage(page, false); } document.body.setAttribute('data-page', page);
})();
window._lkValue = 0;
window._lkLabel = '';
document.addEventListener('DOMContentLoaded', function() {
var firstCard = document.querySelector('.lk-card.selected');
if (firstCard) {
_lkValue = parseInt(firstCard.getAttribute('data-value')) || 100;
_lkLabel = firstCard.getAttribute('data-label') || '3h siivous';
}
});
document.addEventListener('DOMContentLoaded', function() {
var defaultCard = document.querySelector('.lk-card.selected');
if (defaultCard) {
_lkValue = parseInt(defaultCard.getAttribute('data-value')) || 100;
_lkLabel = defaultCard.getAttribute('data-label') || '3h siivous';
var sp = document.getElementById('selectedPrice');
var sl = document.getElementById('selectedLabel');
if (sp) sp.textContent = _lkValue + '€';
if (sl) sl.textContent = _lkLabel;
}
});
function selectLahjakortti(card) {
document.querySelectorAll('.lk-card').forEach(function(c){ c.classList.remove('selected'); });
card.classList.add('selected');
var val = card.getAttribute('data-value');
var label = card.getAttribute('data-label');
window._lkLabel = label;
var custom = document.getElementById('customAmountSection');
if(val === 'custom') {
custom.style.display = 'block';
document.getElementById('selectedLabel').textContent = 'Oma summa';
document.getElementById('selectedPrice').textContent = '–';
window._lkValue = 0;
} else {
custom.style.display = 'none';
window._lkValue = parseInt(val);
document.getElementById('selectedLabel').textContent = label;
document.getElementById('selectedPrice').textContent = val + '€';
}
}
function setCustomAmount(val) {
document.querySelectorAll('.lk-amount-btn').forEach(function(b){ b.classList.remove('active'); });
event.target.classList.add('active');
document.getElementById('customAmountInput').value = val;
window._lkValue = val;
document.getElementById('selectedLabel').textContent = 'Oma summa – ' + val + '€';
document.getElementById('selectedPrice').textContent = val + '€';
}
function updateCustomAmount(val) {
if(val && parseInt(val) >= 1) {
window._lkValue = parseInt(val);
document.getElementById('selectedLabel').textContent = 'Oma summa – ' + val + '€';
document.getElementById('selectedPrice').textContent = val + '€';
}
}
function toggleDelivery() {
var val = document.querySelector('input[name="delivery"]:checked').value;
document.getElementById('recipientEmailField').style.display = val === 'recipient' ? 'block' : 'none';
}
function submitLahjakortti(e) {
e.preventDefault();
var errEl = document.getElementById('lkFormError');
errEl.style.display = 'none';
errEl.textContent = '';
if(!window._lkValue || window._lkValue < 1) {
errEl.textContent = 'Valitse ensin lahjakortin arvo yllä.';
errEl.style.display = 'block';
document.getElementById('lahjakorttiGrid').scrollIntoView({behavior:'smooth', block:'center'});
return;
}
var form = e.target;
if(!form.buyer_name.value.trim()) {
errEl.textContent = 'Täytä nimesi.';
errEl.style.display = 'block';
form.buyer_name.focus();
return;
}
if(!form.buyer_email.value.trim()) {
errEl.textContent = 'Täytä sähköpostiosoitteesi.';
errEl.style.display = 'block';
form.buyer_email.focus();
return;
}
if(!form.terms.checked) {
errEl.textContent = 'Hyväksy palveluehdot ennen tilauksen tekemistä.';
errEl.style.display = 'block';
return;
}
var btn = document.getElementById('lkSubmitBtn');
btn.textContent = 'Siirrytään maksuun...';
btn.disabled = true;
var code = 'CLV-' + Math.random().toString(36).substr(2,6).toUpperCase();
var expiry = new Date(); expiry.setFullYear(expiry.getFullYear()+1);
var expiryStr = expiry.toLocaleDateString('fi-FI');
var recipientEmail = (form.recipient_email && form.recipient_email.value) || '';
var deliveryVal = document.querySelector('input[name="delivery"]:checked') ? document.querySelector('input[name="delivery"]:checked').value : 'buyer';
var payload = {
package: window._lkLabel,
amount: window._lkValue,
buyer_name: form.buyer_name.value,
buyer_email: form.buyer_email.value,
buyer_phone: form.buyer_phone ? form.buyer_phone.value || '' : '',
recipient_name: form.recipient_name ? form.recipient_name.value || '' : '',
message: form.message ? form.message.value || '' : '',
delivery: deliveryVal,
recipient_email: recipientEmail,
send_to_email: (deliveryVal === 'recipient' && recipientEmail) ? recipientEmail : form.buyer_email.value,
voucher_code: code,
expiry: expiryStr
};
fetch('/.netlify/functions/create-checkout', {
method: 'POST',
headers: {'Content-Type':'application/json'},
body: JSON.stringify(payload)
})
.then(function(r){ return r.json(); })
.then(function(data){
if(data.url) {
window.location.href = data.url;
} else {
alert('Virhe: ' + (data.error || 'Yritä uudelleen'));
btn.textContent = 'Maksa';
btn.disabled = false;
}
})
.catch(function(err){
alert('Verkkovirhe. Yritä uudelleen.');
btn.textContent = 'Maksa';
btn.disabled = false;
});
}
function generateVoucherHTML(code, amount, pkg, expiry, recipientName, message) {
return '<!DOCTYPE html><html lang="fi"><head><meta charset="UTF-8">' +
'<title>Cleava Lahjakortti ' + code + '</title>' +
'<style>' +
'@import url(https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;1,400&family=Inter:wght@400;600;700;800&display=swap);' +
'*{margin:0;padding:0;box-sizing:border-box;}' +
'body{background:#f0f4f8;font-family:Inter,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:40px;}' +
'.voucher{background:#fff;border-radius:20px;overflow:hidden;max-width:600px;width:100%;box-shadow:0 8px 40px rgba(0,0,0,.15);}' +
'.v-header{background:#0a1628;padding:40px;text-align:center;}' +
'.v-logo{font-size:13px;font-weight:800;color:rgba(255,255,255,.6);letter-spacing:.18em;margin-bottom:24px;}' +
'.v-title{font-family:Fraunces,serif;font-size:14px;font-weight:400;color:rgba(255,255,255,.5);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;}' +
'.v-amount{font-size:72px;font-weight:800;color:#60a5fa;line-height:1;margin:8px 0;}' +
'.v-pkg{font-size:16px;color:rgba(255,255,255,.6);margin-bottom:24px;}' +
'.v-codebox{background:rgba(255,255,255,.08);border-radius:10px;padding:16px 24px;display:inline-block;}' +
'.v-codelabel{font-size:10px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px;}' +
'.v-code{font-size:28px;font-weight:800;color:#fff;font-family:monospace;letter-spacing:.14em;}' +
'.v-body{padding:36px 40px;}' +
'.v-recipient{font-size:18px;font-weight:700;color:#0a1628;margin-bottom:8px;}' +
'.v-message{font-style:italic;color:#64748b;font-size:15px;line-height:1.65;margin-bottom:24px;border-left:3px solid #1d4ed8;padding-left:14px;}' +
'.v-info{background:#f8fafc;border-radius:10px;padding:16px 20px;margin-bottom:24px;}' +
'.v-info p{font-size:13px;color:#475569;line-height:1.75;}' +
'.v-info strong{color:#0a1628;}' +
'.v-footer{border-top:1px solid #e2e8f0;padding:20px 40px;display:flex;justify-content:space-between;align-items:center;}' +
'.v-footer-text{font-size:12px;color:#94a3b8;}' +
'.v-expiry{font-size:12px;color:#dc2626;font-weight:600;}' +
'@media print{body{background:#fff;padding:0;}.voucher{box-shadow:none;border-radius:0;}}' +
'</style></head><body>' +
'<div class="voucher">' +
'<div class="v-header">' +
'<div class="v-logo">CLEAVA SIIVOUSPALVELUT</div>' +
'<div class="v-title">Lahjakortti</div>' +
'<div class="v-amount">' + amount + '€</div>' +
'<div class="v-pkg">' + pkg + '</div>' +
'<div class="v-codebox"><div class="v-codelabel">Voucher-koodi</div><div class="v-code">' + code + '</div></div>' +
'</div>' +
'<div class="v-body">' +
(recipientName ? '<div class="v-recipient">Hei ' + recipientName + '! 🎁</div>' : '') +
(message ? '<div class="v-message">"' + message + '"</div>' : '') +
'<div class="v-info"><p>Tämä lahjakortti käy kaikkiin Cleava-palveluihin:<br>' +
'<strong>Kotisiivous · Muuttosiivous · Ikkunanpesu · Suursiivous</strong></p><br>' +
'<p>Varaa siivous mainitsemalla koodisi <strong>' + code + '</strong>:<br>' +
'📞 <strong>045 187 8083</strong> &nbsp;·&nbsp; ✉️ <strong>info@cleava.fi</strong> &nbsp;·&nbsp; 🌐 <strong>cleava.fi</strong></p></div>' +
'</div>' +
'<div class="v-footer">' +
'<div class="v-footer-text">Mansio Group Oy · Y-tunnus 3631044-9 · cleava.fi</div>' +
'<div class="v-expiry">Voimassa: ' + expiry + '</div>' +
'</div></div>' +
'<div style="text-align:center;margin-top:20px;"><button onclick="window.print()" style="background:#0a1628;color:#fff;border:none;padding:12px 32px;border-radius:999px;font-size:14px;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;">🖨️ Tulosta / Tallenna PDF</button></div>' +
'</body></html>';
}
function openVoucher(code, amount, pkg, expiry, recipientName, message) {
var win = window.open('', '_blank');
win.document.write(generateVoucherHTML(code, amount, pkg, expiry, recipientName||'', message||''));
win.document.close();
}
