/* ============================================================================
 * cleava navbar.js — single source of truth for navbar + mobile menu
 * ============================================================================
 * Each page contains placeholders:
 *   <nav id="cleava-nav"></nav>
 *   <div id="cleava-mobmenu"></div>
 * This script replaces them with the real navbar/mobile menu HTML.
 * It also injects shared CSS once.
 * 
 * To change the navbar across the entire site: edit this file.
 * No other files need to be touched.
 * ============================================================================ */

(function() {
  'use strict';

  // ─── Language URL mapping (FI ↔ EN service trees) ────────────────────────
  var FI_TO_EN_SERVICE = {
    'kotisiivous': 'home-cleaning',
    'muuttosiivous': 'moving-cleaning',
    'ikkunanpesu': 'window-cleaning',
    'suursiivous': 'deep-cleaning',
    'erikoissiivous': 'specialist-cleaning',
    'toimistosiivous': 'office-cleaning'
  };
  var EN_TO_FI_SERVICE = {};
  for (var __k in FI_TO_EN_SERVICE) { EN_TO_FI_SERVICE[FI_TO_EN_SERVICE[__k]] = __k; }
  
  function getAlternateLangUrl(currentPath, targetLang) {
    currentPath = currentPath || '/';
    if (targetLang === 'en') {
      // FI URL → EN URL
      if (currentPath === '/' || currentPath === '/index.html') return '/en/';
      var m = currentPath.match(/^\/([^/]+)(\/.*)?$/);
      if (m) {
        var service = m[1];
        var rest = m[2] || '';
        if (FI_TO_EN_SERVICE[service]) return '/en/' + FI_TO_EN_SERVICE[service] + rest;
      }
      return '/en/'; // fallback
    } else {
      // EN URL → FI URL
      if (currentPath === '/en/' || currentPath === '/en' || currentPath === '/en/index.html') return '/';
      var m = currentPath.match(/^\/en\/([^/]+)(\/.*)?$/);
      if (m) {
        var service = m[1];
        var rest = m[2] || '';
        if (EN_TO_FI_SERVICE[service]) return '/' + EN_TO_FI_SERVICE[service] + rest;
      }
      return '/'; // fallback
    }
  }


  // ─── Detect language from URL ─────────────────────────────────────────────
  var path = window.location.pathname;
  var isEn = (path.indexOf('/en/') === 0) || (path === '/en') || /^\/blog(\/|$)/.test(path);

  // ─── Navbar HTML templates ────────────────────────────────────────────────
  var FI_NAV = `<nav>
 <div class="nav-inner">
 <a class="nav-logo" href="https://cleava.fi">
 <img src="/assets/extracted/cleava-logo.png" alt="Cleava" id="navLogo" loading="eager" fetchpriority="high" decoding="async">
 </a>
 <ul class="nav-center">
 <li class="nav-dd-wrap">
 <a href="https://cleava.fi/kotisiivous/" data-i18n-fi="Kotisiivous" data-i18n-en="Home Cleaning">Kotisiivous <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg></a>
 <div class="nav-dd">
 <a href="https://cleava.fi/kotisiivous/" data-i18n-fi="Kotisiivous" data-i18n-en="Home Cleaning">Kotisiivous</a>
 <a href="https://cleava.fi/muuttosiivous/" data-i18n-fi="Muuttosiivous" data-i18n-en="Moving Cleaning">Muuttosiivous</a>
 <a href="https://cleava.fi/ikkunanpesu/" data-i18n-fi="Ikkunanpesu" data-i18n-en="Window Cleaning">Ikkunanpesu</a>
 <a href="https://cleava.fi/erikoissiivous/" data-i18n-fi="Erikoissiivous" data-i18n-en="Specialist Cleaning">Erikoissiivous</a>
 </div>
 </li>
 <li class="nav-dd-wrap">
 <a href="https://cleava.fi/yrityssiivous">Yrityssiivous <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg></a>
 <div class="nav-dd" style="min-width:270px;">
<a href="https://cleava.fi/toimistosiivous/" data-i18n="322">Toimistosiivous</a>
 <a href="https://cleava.fi/myymalasiivous" data-i18n="323">Myymälä- ja liiketilasiivous</a>
 <a href="https://cleava.fi/porrassiivous" data-i18n="324">Porrassiivous</a>
 <a href="https://cleava.fi/ravintolasiivous" data-i18n="325">️ Ravintola- ja suurtaloussiivous</a>
 <div style="height:1px;background:var(--c-border);margin:4px 0;"></div>
 <a href="https://cleava.fi/ikkunanpesu/">Ikkunanpesu</a>
 <a href="https://cleava.fi/lattiahoito" data-i18n="327">Lattioiden ylläpito</a>
 <a href="https://cleava.fi/suursiivous/" data-i18n="328">Suursiivous</a>
 </div>
 </li>
 <li><a href="https://cleava.fi/hinnasto" data-i18n="14">Hinnasto</a></li>
 <li class="nav-dd-wrap">
 <a href="https://cleava.fi/tarinamme" data-i18n="15">Tarinamme <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg></a>
 <div class="nav-dd">
 <a href="/blogi">Blogi</a>
 <a href="https://cleava.fi/lahjakortti" data-i18n="16">Lahjakortit 🎁</a>
 </div>
 </li>
 </ul>
 <div class="nav-right">
 <div class="nav-lang nav-dd-wrap">
 <button class="nav-lang-trigger" type="button" aria-haspopup="true" aria-expanded="false">
 <span class="nav-lang-label"><svg class="flag-svg" viewBox="0 0 18 11" width="18" height="11" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0;"><rect width="18" height="11" fill="#ffffff"/><rect y="4" width="18" height="3" fill="#003580"/><rect x="5" width="3" height="11" fill="#003580"/></svg> Suomi</span>
 <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
 </button>
 <div class="nav-dd nav-lang-dd">
 <a href="#" onclick="setLang('fi');return false;" data-lang="fi"><svg class="flag-svg" viewBox="0 0 18 11" width="18" height="11" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0;"><rect width="18" height="11" fill="#ffffff"/><rect y="4" width="18" height="3" fill="#003580"/><rect x="5" width="3" height="11" fill="#003580"/></svg> Suomi</a>
 <a href="#" onclick="setLang('en');return false;" data-lang="en"><svg class="flag-svg" viewBox="0 0 19 10" width="19" height="10" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0;"><rect width="19" height="10" fill="#b22234"/><rect width="19" height="0.77" y="0.77" fill="#fff"/><rect width="19" height="0.77" y="2.31" fill="#fff"/><rect width="19" height="0.77" y="3.85" fill="#fff"/><rect width="19" height="0.77" y="5.38" fill="#fff"/><rect width="19" height="0.77" y="6.92" fill="#fff"/><rect width="19" height="0.77" y="8.46" fill="#fff"/><rect width="8" height="5.38" fill="#3c3b6e"/></svg> English</a>
 </div>
 </div>
 <a href="tel:+358451878083" class="nav-soita-btn" data-i18n="18">Soita</a>
 <span class="nav-tai" data-i18n="19">tai</span>
 <div class="btn-book-wrap"><button class="btn-book" onclick="openBookingModal()" data-i18n="17">Tilaa Siivous</button></div>
 <button class="nav-hamburger" onclick="toggleMob()" aria-label="Valikko">
 <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
 </button>
 </div>
</nav>`;

  var EN_NAV = `<nav>
 <div class="nav-inner">
 <a class="nav-logo" href="https://cleava.fi">
 <img src="/assets/extracted/cleava-logo.png" alt="Cleava" id="navLogo" loading="eager" fetchpriority="high" decoding="async">
 </a>
 <ul class="nav-center">
 <li class="nav-dd-wrap">
 <a href="https://cleava.fi/en/home-cleaning/" data-i18n-fi="Kotisiivous" data-i18n-en="Home Cleaning">Home Cleaning <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg></a>
 <div class="nav-dd">
 <a href="https://cleava.fi/en/home-cleaning/" data-i18n-fi="Kotisiivous" data-i18n-en="Home Cleaning">Home Cleaning</a>
 <a href="https://cleava.fi/en/moving-cleaning/" data-i18n-fi="Muuttosiivous" data-i18n-en="Moving Cleaning">Moving Cleaning</a>
 <a href="https://cleava.fi/en/window-cleaning/" data-i18n-fi="Ikkunanpesu" data-i18n-en="Window Cleaning">Window Cleaning</a>
 <a href="https://cleava.fi/en/specialist-cleaning/" data-i18n-fi="Erikoissiivous" data-i18n-en="Specialist Cleaning">Specialist Cleaning</a>
 </div>
 </li>
 <li class="nav-dd-wrap">
 <a href="#" onclick="return cleavaNavTo('yrityssiivous')">Commercial Cleaning <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg></a>
 <div class="nav-dd" style="min-width:270px;">
<a href="https://cleava.fi/en/office-cleaning/" data-i18n="322">Office Cleaning</a>
 <a href="#" onclick="return cleavaNavTo('myymalasiivous')" data-i18n="323">Retail and Commercial Cleaning</a>
 <a href="#" onclick="return cleavaNavTo('porrassiivous')" data-i18n="324">Stairwell Cleaning</a>
 <a href="#" onclick="return cleavaNavTo('ravintolasiivous')" data-i18n="325">Restaurant Cleaning</a>
 <div style="height:1px;background:var(--c-border);margin:4px 0;"></div>
 <a href="https://cleava.fi/en/window-cleaning/">Window Cleaning</a>
 <a href="#" onclick="return cleavaNavTo('lattiahoito')" data-i18n="327">Floor Maintenance</a>
 <a href="https://cleava.fi/en/deep-cleaning/" data-i18n="328">Deep Cleaning</a>
 </div>
 </li>
 <li><a href="#" onclick="return cleavaNavTo('hinnasto')" data-i18n="14">Pricing</a></li>
 <li class="nav-dd-wrap">
 <a href="#" onclick="return cleavaNavTo('tarinamme')" data-i18n="15">Our Story <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg></a>
 <div class="nav-dd">
 <a href="/blog/">Blog</a>
 <a href="#" onclick="return cleavaNavTo('lahjakortti')" data-i18n="16">Gift Cards 🎁</a>
 </div>
 </li>
 </ul>
 <div class="nav-right">
 <div class="nav-lang nav-dd-wrap">
 <button class="nav-lang-trigger" type="button" aria-haspopup="true" aria-expanded="false">
 <span class="nav-lang-label"><svg class="flag-svg" viewBox="0 0 19 10" width="19" height="10" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0;"><rect width="19" height="10" fill="#b22234"/><rect width="19" height="0.77" y="0.77" fill="#fff"/><rect width="19" height="0.77" y="2.31" fill="#fff"/><rect width="19" height="0.77" y="3.85" fill="#fff"/><rect width="19" height="0.77" y="5.38" fill="#fff"/><rect width="19" height="0.77" y="6.92" fill="#fff"/><rect width="19" height="0.77" y="8.46" fill="#fff"/><rect width="8" height="5.38" fill="#3c3b6e"/></svg> English</span>
 <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
 </button>
 <div class="nav-dd nav-lang-dd">
 <a href="#" onclick="setLang('fi');return false;" data-lang="fi"><svg class="flag-svg" viewBox="0 0 18 11" width="18" height="11" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0;"><rect width="18" height="11" fill="#ffffff"/><rect y="4" width="18" height="3" fill="#003580"/><rect x="5" width="3" height="11" fill="#003580"/></svg> Suomi</a>
 <a href="#" onclick="setLang('en');return false;" data-lang="en"><svg class="flag-svg" viewBox="0 0 19 10" width="19" height="10" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0;"><rect width="19" height="10" fill="#b22234"/><rect width="19" height="0.77" y="0.77" fill="#fff"/><rect width="19" height="0.77" y="2.31" fill="#fff"/><rect width="19" height="0.77" y="3.85" fill="#fff"/><rect width="19" height="0.77" y="5.38" fill="#fff"/><rect width="19" height="0.77" y="6.92" fill="#fff"/><rect width="19" height="0.77" y="8.46" fill="#fff"/><rect width="8" height="5.38" fill="#3c3b6e"/></svg> English</a>
 </div>
 </div>
 <a href="tel:+358451878083" class="nav-soita-btn" data-i18n="18">Call</a>
 <span class="nav-tai" data-i18n="19">or</span>
 <div class="btn-book-wrap"><button class="btn-book" onclick="openBookingModal()" data-i18n="17">Book Cleaning</button></div>
 <button class="nav-hamburger" onclick="toggleMob()" aria-label="Menu">
 <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
 </button>
 </div>
</nav>`;

  var FI_MOB = `<div class="mob-menu" id="mobMenu">
 <div class="mob-menu__header">
   <a href="https://cleava.fi/" class="mob-menu__logo"><img src="/assets/extracted/cleava-logo.png" alt="Cleava" /></a>
   <button class="mob-menu__close" onclick="closeMob()" aria-label="Sulje">&#x2715;</button>
 </div>

 <div class="mob-menu__body">
   <button class="mob-accordion-btn" id="mobBtnKoti" onclick="toggleMobAcc('mobAccKoti','mobBtnKoti')">
     Kotisiivous
     <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
   </button>
   <div class="mob-accordion" id="mobAccKoti">
     <a href="https://cleava.fi/kotisiivous/">Kotisiivous</a>
     <a href="https://cleava.fi/muuttosiivous/">Muuttosiivous</a>
     <a href="https://cleava.fi/ikkunanpesu/">Ikkunanpesu</a>
     <a href="https://cleava.fi/erikoissiivous/">Erikoissiivous</a>
   </div>

   <button class="mob-accordion-btn" id="mobBtnYritys" onclick="toggleMobAcc('mobAccYritys','mobBtnYritys')">
     Yrityssiivous
     <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
   </button>
   <div class="mob-accordion" id="mobAccYritys">
     <a href="https://cleava.fi/toimistosiivous/">Toimistosiivous</a>
     <a href="https://cleava.fi/myymalasiivous">Myymälä- ja liiketilasiivous</a>
     <a href="https://cleava.fi/porrassiivous">Porrassiivous</a>
     <a href="https://cleava.fi/ravintolasiivous">Ravintola- ja suurtaloussiivous</a>
     <div class="mob-accordion-divider"></div>
     <a href="https://cleava.fi/ikkunanpesu/">Ikkunanpesu</a>
     <a href="https://cleava.fi/lattiahoito">Lattioiden ylläpito</a>
     <a href="https://cleava.fi/suursiivous/">Suursiivous</a>
   </div>

   <a class="mob-nav-link" href="https://cleava.fi/hinnasto">Hinnasto</a>

   <button class="mob-accordion-btn" id="mobBtnTarina" onclick="toggleMobAcc('mobAccTarina','mobBtnTarina')">
     Tarinamme
     <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
   </button>
   <div class="mob-accordion" id="mobAccTarina">
     <a href="https://cleava.fi/tarinamme">Tarinamme</a>
     <a href="/blogi/">Blogi</a>
     <a href="https://cleava.fi/lahjakortti">🎁 Lahjakortit</a>
   </div>

   <div class="mob-lang-row">
     <button onclick="cleavaLang('fi')" id="mobLangFi" class="mob-lang-btn active">FI</button>
     <button onclick="cleavaLang('en')" id="mobLangEn" class="mob-lang-btn">EN</button>
   </div>
 </div>

 <div class="mob-menu__footer">
   <a href="tel:+358451878083" class="mob-phone">045 187 8083</a>
   <div class="mob-cta-wrap">
   <a class="mob-cta" href="#" onclick="openBookingModal();closeMob();return false;">Tilaa Siivous</a>
   </div>
 </div>
</div>`;

  var EN_MOB = `<div class="mob-menu" id="mobMenu">
 <div class="mob-menu__header">
   <a href="https://cleava.fi/en/" class="mob-menu__logo"><img src="/assets/extracted/cleava-logo.png" alt="Cleava" /></a>
   <button class="mob-menu__close" onclick="closeMob()" aria-label="Close">&#x2715;</button>
 </div>

 <div class="mob-menu__body">
   <button class="mob-accordion-btn" id="mobBtnKoti" onclick="toggleMobAcc('mobAccKoti','mobBtnKoti')">
     Home Cleaning
     <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
   </button>
   <div class="mob-accordion" id="mobAccKoti">
     <a href="https://cleava.fi/en/home-cleaning/">Home Cleaning</a>
     <a href="https://cleava.fi/en/moving-cleaning/">Moving Cleaning</a>
     <a href="https://cleava.fi/en/window-cleaning/">Window Cleaning</a>
     <a href="https://cleava.fi/en/specialist-cleaning/">Specialist Cleaning</a>
   </div>

   <button class="mob-accordion-btn" id="mobBtnYritys" onclick="toggleMobAcc('mobAccYritys','mobBtnYritys')">
     Commercial Cleaning
     <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
   </button>
   <div class="mob-accordion" id="mobAccYritys">
     <a href="https://cleava.fi/en/office-cleaning/">Office Cleaning</a>
     <a href="#" onclick="return cleavaNavTo('myymalasiivous')">Retail and Commercial Cleaning</a>
     <a href="#" onclick="return cleavaNavTo('porrassiivous')">Stairwell Cleaning</a>
     <a href="#" onclick="return cleavaNavTo('ravintolasiivous')">Restaurant Cleaning</a>
     <div class="mob-accordion-divider"></div>
     <a href="https://cleava.fi/en/window-cleaning/">Window Cleaning</a>
     <a href="#" onclick="return cleavaNavTo('lattiahoito')">Floor Maintenance</a>
     <a href="https://cleava.fi/en/deep-cleaning/">Deep Cleaning</a>
   </div>

   <a class="mob-nav-link" href="#" onclick="return cleavaNavTo('hinnasto')">Pricing</a>

   <button class="mob-accordion-btn" id="mobBtnTarina" onclick="toggleMobAcc('mobAccTarina','mobBtnTarina')">
     Our Story
     <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2.5" stroke-linecap="round" d="M19 9l-7 7-7-7"/></svg>
   </button>
   <div class="mob-accordion" id="mobAccTarina">
     <a href="#" onclick="return cleavaNavTo('tarinamme')">Our Story</a>
     <a href="/blog/">Blog</a>
     <a href="#" onclick="return cleavaNavTo('lahjakortti')">🎁 Gift Cards</a>
   </div>

   <div class="mob-lang-row">
     <button onclick="cleavaLang('fi')" id="mobLangFi" class="mob-lang-btn">FI</button>
     <button onclick="cleavaLang('en')" id="mobLangEn" class="mob-lang-btn active">EN</button>
   </div>
 </div>

 <div class="mob-menu__footer">
   <a href="tel:+358451878083" class="mob-phone">045 187 8083</a>
   <div class="mob-cta-wrap">
   <a class="mob-cta" href="#" onclick="openBookingModal();closeMob();return false;">Book Cleaning</a>
   </div>
 </div>
</div>`;

  // ─── CSS: COMPLETE navbar + mobile menu (v99 single source of truth) ──────
  // Every navbar/mobile-menu rule lives HERE now. Inline CSS on pages has the
  // duplicate selectors stripped, so this is the only definition.
  var NAV_CSS = `
/* === DESKTOP NAVBAR === */
nav{background:rgba(255,255,255,.97);backdrop-filter:blur(16px);border-bottom:1px solid var(--c-border);position:fixed;top:0;left:0;right:0;z-index:1001;overflow:visible}
.nav-inner{max-width:var(--max,1200px);margin:0 auto;padding:0 24px;height:68px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.nav-logo{display:flex;align-items:center;margin:0;padding:0;line-height:0}
.nav-logo img{display:block;height:36px;width:auto;object-fit:contain;max-width:180px;margin-top:12.5px}
.nav-center{display:flex;align-items:center;gap:2px;list-style:none;margin:0;padding:0}
.nav-center>li{position:relative}
.nav-center>li>a{display:flex;align-items:center;gap:4px;padding:10px 16px;border-radius:8px;font-size:12.5px;font-weight:600;color:var(--c-navy);text-decoration:none;transition:color .15s,background .15s;white-space:nowrap}
.nav-center>li>a:hover,.nav-center>li>a.active{color:var(--c-blue);background:var(--c-off)}
.nav-center>li>a svg{transition:transform .2s;flex-shrink:0}
.nav-center>li:hover>a svg{transform:rotate(180deg)}

/* Dropdowns */
.nav-dd-wrap{position:relative}
.nav-dd{position:absolute;top:calc(100% + 8px);left:50%;transform:translateX(-50%);background:#fff;border:1px solid var(--c-border);border-radius:var(--r-lg,20px);box-shadow:0 8px 40px rgba(0,0,0,.14);padding:8px;min-width:220px;z-index:99999;opacity:0;pointer-events:none;transition:opacity .15s ease}
.nav-dd::before{content:'';position:absolute;top:-12px;left:0;right:0;height:12px}
.nav-dd-wrap:hover .nav-dd,.nav-dd-wrap:focus-within .nav-dd{opacity:1;pointer-events:auto}
.nav-dd a{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;font-size:14.5px;font-weight:500;color:var(--c-navy);text-decoration:none;transition:background .15s,color .15s}
.nav-dd a:hover{background:var(--c-off);color:var(--c-blue)}
.nav-dd a svg{color:var(--c-blue);flex-shrink:0}

/* Right side */
.nav-right{display:flex;align-items:center;gap:10px}
/* Soita and "tai" hidden everywhere — only Tilaa Siivous remains */
.nav-soita-btn,.nav-tai{display:none!important}
/* @property registers --rim-angle as an animatable angle for the conic-gradient */
@property --rim-angle{syntax:'<angle>';initial-value:0deg;inherits:false}
@keyframes rimSpin{to{--rim-angle:360deg}}

/* Tilaa Siivous — navy button with a moving spark traveling along the rim */
.btn-book-wrap{position:relative;padding:2.5px;border-radius:999px;background:var(--c-navy,#0a1628);display:inline-flex;isolation:isolate;overflow:hidden;line-height:0}
.btn-book-wrap::before{content:'';position:absolute;inset:0;border-radius:999px;background:conic-gradient(from var(--rim-angle),transparent 0% 76%,#3b82f6 82%,#93c5fd 88%,#dbeafe 91%,#93c5fd 94%,#3b82f6 98%,transparent 100%);animation:rimSpin 3s linear infinite;z-index:-1}
.btn-book{background:var(--c-navy,#0a1628);color:#fff!important;border:none;padding:11px 22px;border-radius:999px;font-size:14px;font-weight:700;cursor:pointer;font-family:var(--ff-body);transition:background .18s;white-space:nowrap;position:relative;z-index:1;line-height:1.2;margin:0}
.btn-book:hover{background:#1e3a5f;color:#fff!important}
@media(prefers-reduced-motion:reduce){.btn-book-wrap::before{animation:none}}

/* Language dropdown */
.nav-lang{display:flex;align-items:center}
.nav-lang-trigger{display:inline-flex;align-items:center;gap:7px;border:1.5px solid var(--c-border);background:transparent;padding:6px 14px;border-radius:999px;font-size:13px;font-weight:600;color:var(--c-navy);cursor:pointer;font-family:var(--ff-body);transition:all .15s;line-height:1}
.nav-lang-trigger:hover,.nav-lang-trigger:focus{border-color:var(--c-blue);color:var(--c-blue);background:#eff6ff;outline:none}
.nav-lang-trigger svg{transition:transform .2s}
.nav-lang.nav-dd-wrap:hover .nav-lang-trigger svg{transform:rotate(180deg)}
.nav-lang-dd{min-width:170px}
.nav-lang-dd a{font-size:14px;cursor:pointer}
.nav-lang-label{display:inline-flex;align-items:center;gap:4px}
.flag-svg{display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0}

.nav-hamburger{display:none;border:none;background:none;padding:10px;color:var(--c-navy);cursor:pointer}

/* === MOBILE/TABLET: navbar header (logo + Tilaa Siivous + hamburger) === */
@media(max-width:1024px){
  nav .nav-center,
  nav .nav-lang,
  nav .nav-lang.nav-dd-wrap,
  nav .nav-soita-btn,
  nav .nav-tai,
  nav .nav-form-link,
  nav .nav-form-separator{display:none!important;visibility:hidden!important}
  nav .nav-right{gap:10px!important;display:flex!important;align-items:center!important}
  nav .nav-inner{padding:0 20px!important;gap:12px!important;height:88px!important;display:flex!important;align-items:center!important;justify-content:space-between!important}
  nav .nav-logo img{height:52px!important;max-width:200px!important;margin-top:12.5px!important}
  nav .nav-right .btn-book-wrap{display:inline-flex!important;padding:2.5px!important;border-radius:999px!important;visibility:visible!important;line-height:0}
  nav .nav-right .btn-book{display:inline-flex!important;align-items:center;justify-content:center;padding:13px 22px!important;font-size:14.5px!important;border-radius:999px;background:var(--c-navy,#0a1628)!important;color:#fff!important;font-weight:700;white-space:nowrap;border:none;cursor:pointer;font-family:var(--ff-body,'Inter',sans-serif);box-shadow:0 2px 8px rgba(10,22,40,.25);visibility:visible!important;position:relative;z-index:1}
  nav .nav-hamburger{display:flex!important;visibility:visible!important;align-items:center;justify-content:center;padding:0!important;width:52px!important;height:52px!important;border-radius:14px!important;background:var(--c-off,#f8fafc)!important;border:1.5px solid var(--c-border,#e2e8f0)!important;color:var(--c-navy,#0a1628)!important;flex-shrink:0;cursor:pointer}
  nav .nav-hamburger svg{width:26px!important;height:26px!important;display:block!important}
  nav .nav-hamburger:active{background:var(--c-grey,#e2e8f0)!important;transform:scale(.96)}
  body{padding-top:88px!important}
}
@media(max-width:480px){
  nav .nav-inner{padding:0 14px!important;gap:8px!important;height:80px!important}
  nav .nav-logo img{height:44px!important;max-width:150px!important}
  nav .nav-right .btn-book{padding:11px 16px!important;font-size:13px!important}
  nav .nav-hamburger{width:48px!important;height:48px!important;border-radius:12px!important}
  nav .nav-hamburger svg{width:24px!important;height:24px!important}
  body{padding-top:80px!important}
}
@media(max-width:380px){
  nav .nav-right .btn-book{padding:10px 12px!important;font-size:12px!important}
  nav .nav-logo img{height:40px!important;max-width:120px!important}
}

/* === MOBILE MENU (overlay panel) === */
.mob-menu{display:none;position:fixed!important;inset:0!important;z-index:9998!important;background:linear-gradient(160deg,#0f2444 0%,#0a1628 100%)!important;flex-direction:column!important;padding:0!important;overflow:hidden!important}
.mob-menu.open{display:flex!important}

.mob-menu__header{display:grid;grid-template-columns:44px 1fr 44px;align-items:center;padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0;gap:12px}
.mob-menu__logo{display:flex;align-items:center;justify-content:center;text-decoration:none;grid-column:2}
.mob-menu__logo img{height:36px;width:auto;object-fit:contain;max-width:160px;display:block;filter:brightness(0) invert(1);margin-top:12.5px}
.mob-menu__close{grid-column:3;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.18);color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;padding:0;font-family:var(--ff-body)}
.mob-menu__close:hover{background:rgba(255,255,255,.18)}

.mob-menu__body{flex:1;overflow-y:auto;padding:24px 22px 18px}

.mob-menu__body .mob-accordion-btn,
.mob-menu__body > .mob-nav-link{display:flex!important;align-items:center;justify-content:space-between;width:100%;background:none!important;border:none!important;border-bottom:1px solid rgba(255,255,255,.12)!important;color:#fff!important;font-size:22px!important;font-weight:600!important;font-family:var(--ff-body)!important;padding:22px 0!important;cursor:pointer;text-align:left;letter-spacing:-.015em;text-decoration:none;margin:0!important;line-height:1.2}
.mob-menu__body .mob-accordion-btn svg{transition:transform .25s ease;flex-shrink:0;opacity:.6;width:22px;height:22px}
.mob-menu__body .mob-accordion-btn.active svg,
.mob-menu__body .mob-accordion-btn.open svg{transform:rotate(180deg);opacity:1;color:var(--c-accent)}
.mob-menu__body .mob-accordion-btn.active,
.mob-menu__body .mob-accordion-btn.open{color:var(--c-accent)!important;border-bottom-color:transparent!important}

.mob-menu__body .mob-accordion{max-height:0;overflow:hidden;transition:max-height .35s ease;margin:0;background:rgba(255,255,255,.03);border-radius:0 0 10px 10px;border-left:none}
.mob-menu__body .mob-accordion.active,
.mob-menu__body .mob-accordion.open{max-height:700px;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:0}
.mob-menu__body .mob-accordion a{display:flex;align-items:center;font-size:17px!important;color:rgba(255,255,255,.88)!important;padding:15px 0 15px 22px!important;border-bottom:1px solid rgba(255,255,255,.06)!important;text-decoration:none;font-weight:400!important;gap:0;line-height:1.3}
.mob-menu__body .mob-accordion a:last-child{border-bottom:none!important}
.mob-menu__body .mob-accordion a:hover{color:#fff!important;background:rgba(255,255,255,.04)}
.mob-menu__body .mob-accordion-divider{height:1px;background:rgba(255,255,255,.12);margin:6px 22px}

.mob-lang-row{display:flex;gap:10px;margin:28px 0 0;padding-top:22px;border-top:1px solid rgba(255,255,255,.1)}
.mob-lang-btn{flex:1;padding:13px;background:transparent;border:1.5px solid rgba(255,255,255,.22);border-radius:12px;color:rgba(255,255,255,.7);font-size:14px;font-weight:700;cursor:pointer;font-family:var(--ff-body);letter-spacing:.06em;transition:all .15s}
.mob-lang-btn.active{background:rgba(255,255,255,.15);border-color:rgba(255,255,255,.4);color:#fff}
.mob-lang-btn:hover{color:#fff;border-color:rgba(255,255,255,.35)}

.mob-menu__footer{padding:20px 22px 26px;border-top:1px solid rgba(255,255,255,.08);flex-shrink:0;background:rgba(0,0,0,.18)}
.mob-phone{display:block;text-align:center;color:#fff;font-size:17px;font-weight:600;text-decoration:none;padding:12px 0;margin-bottom:12px;letter-spacing:.02em;opacity:.92}
.mob-phone:hover{opacity:1;color:var(--c-accent)}

/* === Mobile CTA: moving spark travels along the rim === */
.mob-cta-wrap{position:relative;padding:3px;border-radius:17px;background:linear-gradient(160deg,#0f2444 0%,#0a1628 100%);isolation:isolate;overflow:hidden}
.mob-cta-wrap::before{content:'';position:absolute;inset:0;border-radius:17px;background:conic-gradient(from var(--rim-angle),transparent 0% 74%,#3b82f6 80%,#93c5fd 87%,#dbeafe 91%,#93c5fd 94%,#3b82f6 98%,transparent 100%);animation:rimSpin 3s linear infinite;z-index:-1}
.mob-menu__footer .mob-cta{display:block;background:var(--c-blue);color:#fff!important;text-align:center;padding:20px 24px;border-radius:15px;font-weight:800;font-size:19px;text-decoration:none;margin:0;letter-spacing:-.01em;box-shadow:0 4px 24px rgba(59,130,246,.4);font-family:var(--ff-body);position:relative;z-index:1}
.mob-menu__footer .mob-cta:hover{background:#1e40af}
/* Respect reduced motion preferences */
@media(prefers-reduced-motion:reduce){.mob-cta-wrap::before{animation:none}}

/* === BODY padding so content doesn't hide under fixed navbar === */
body{padding-top:68px}
@media(max-width:1024px){.nav-inner{height:88px}}
`;

  // ─── Inject CSS once ──────────────────────────────────────────────────────
  if (NAV_CSS && !document.getElementById('cleava-nav-css')) {
    var style = document.createElement('style');
    style.id = 'cleava-nav-css';
    style.textContent = NAV_CSS;
    document.head.appendChild(style);
  }

  // ─── Inject navbar ────────────────────────────────────────────────────────
  var navMount = document.getElementById('cleava-nav');
  if (navMount) {
    navMount.outerHTML = isEn ? EN_NAV : FI_NAV;
  }

  // ─── Inject mobile menu ───────────────────────────────────────────────────
  function injectMobileMenu() {
    var mobMount = document.getElementById('cleava-mobmenu');
    if (!mobMount) return false;
    mobMount.outerHTML = isEn ? EN_MOB : FI_MOB;
    return true;
  }
  if (!injectMobileMenu() && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectMobileMenu, { once: true });
  }

  // ─── Mark active page in nav (highlight current section) ─────────────────
  // Match by URL path
  try {
    var allNavLinks = document.querySelectorAll('.nav-center a[href], .mob-nav-link[href]');
    var here = window.location.pathname.replace(/\/$/, '') || '/';
    allNavLinks.forEach(function(a) {
      var href = a.getAttribute('href') || '';
      // Normalize to a path
      var linkPath = href.replace(/^https?:\/\/[^/]+/, '').replace(/\/$/, '') || '/';
      if (linkPath === here && href !== '#' && href !== '') {
        a.classList.add('nav-active');
      }
    });
  } catch(e) {}

  // ─── Sync language label with URL (URL is the source of truth) ─────────
  // Also rewrite the dropdown item hrefs so clicking navigates to the other URL tree.
  try {
    var lang = isEn ? 'en' : 'fi';
    
    var FI_FLAG_SVG = '<svg class="flag-svg" viewBox="0 0 18 11" width="18" height="11" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0;"><rect width="18" height="11" fill="#ffffff"/><rect y="4" width="18" height="3" fill="#003580"/><rect x="5" width="3" height="11" fill="#003580"/></svg>';
    var US_FLAG_SVG = '<svg class="flag-svg" viewBox="0 0 19 10" width="19" height="10" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:-3px;border-radius:2px;flex-shrink:0;"><rect width="19" height="10" fill="#b22234"/><rect width="19" height="0.77" y="0.77" fill="#fff"/><rect width="19" height="0.77" y="2.31" fill="#fff"/><rect width="19" height="0.77" y="3.85" fill="#fff"/><rect width="19" height="0.77" y="5.38" fill="#fff"/><rect width="19" height="0.77" y="6.92" fill="#fff"/><rect width="19" height="0.77" y="8.46" fill="#fff"/><rect width="8" height="5.38" fill="#3c3b6e"/></svg>';
    
    var label = document.querySelector('.nav-lang-label');
    if (label) {
      label.innerHTML = (lang === 'fi') ? (FI_FLAG_SVG + ' Suomi') : (US_FLAG_SVG + ' English');
    }
    
    document.querySelectorAll('.nav-lang-dd a[data-lang]').forEach(function(a) {
      var itemLang = a.getAttribute('data-lang');
      a.classList.toggle('active', itemLang === lang);
      // Rewrite href to point to the equivalent URL on the other language tree.
      // If user is already on this lang's URL, link stays on current page (no-op nav).
      if (itemLang === lang) {
        a.setAttribute('href', path);
      } else {
        a.setAttribute('href', getAlternateLangUrl(path, itemLang));
      }
      // Remove the old onclick (we use real navigation now)
      a.removeAttribute('onclick');
    });
  } catch(e) {}


  // Clean up stale localStorage from old localStorage-based language system.
  // URL is now the source of truth.
  try { localStorage.removeItem('cleava_lang'); } catch(e) {}

  // ─── Unified mobile menu functions (v96 — single source of truth) ─────────
  // These override any per-page definitions. Use class 'active' (matches CSS).
  window.openMob = function() {
    var m = document.getElementById('mobMenu');
    if (!m) return false;
    document.querySelectorAll('.mob-menu .mob-accordion').forEach(function(a) {
      a.classList.remove('active');
      a.classList.remove('open');
    });
    document.querySelectorAll('.mob-menu .mob-accordion-btn').forEach(function(b) {
      b.classList.remove('active');
      b.classList.remove('open');
    });
    m.classList.add('open');
    document.body.style.overflow = 'hidden';
    return false;
  };
  window.toggleMob = function() {
    var m = document.getElementById('mobMenu');
    if (!m) return false;
    if (m.classList.contains('open')) {
      window.closeMob();
    } else {
      window.openMob();
    }
    return false;
  };
  window.closeMob = function() {
    var m = document.getElementById('mobMenu');
    if (m) m.classList.remove('open');
    document.body.style.overflow = '';
    return false;
  };
  window.toggleMobAcc = function(accId, btnId) {
    var acc = document.getElementById(accId);
    var btn = document.getElementById(btnId);
    if (!acc) return false;
    var isOpen = acc.classList.contains('active') || acc.classList.contains('open');
    // Close all accordions in the mobile menu
    document.querySelectorAll('.mob-menu .mob-accordion').forEach(function(a) {
      a.classList.remove('active');
      a.classList.remove('open');
    });
    document.querySelectorAll('.mob-menu .mob-accordion-btn').forEach(function(b) {
      b.classList.remove('active');
      b.classList.remove('open');
    });
    // Open this one if it was closed
    if (!isOpen) {
      acc.classList.add('active');
      acc.classList.add('open');
      if (btn) btn.classList.add('active');
      if (btn) btn.classList.add('open');
      setTimeout(function() {
        var body = document.querySelector('.mob-menu__body');
        if (!btn || !body) return;
        var bodyRect = body.getBoundingClientRect();
        var btnRect = btn.getBoundingClientRect();
        var target = body.scrollTop + btnRect.top - bodyRect.top - 10;
        body.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
      }, 40);
    }
    return false;
  };
  // Language switching via URL navigation (v101+).
  // Works on every page — no i18n.js dependency.
  window.cleavaLang = function(targetLang) {
    // Prefer the page's own <link rel="alternate" hreflang="..."> when present.
    // Every page (homepage, services, cities, blog posts, legal, etc.) carries hreflang tags
    // pointing at its true counterpart in the other language. Use those as the source of truth.
    try {
      var sel = 'link[rel="alternate"][hreflang="' + targetLang + '"]';
      var link = document.querySelector(sel);
      if (link && link.href) {
        var hrefPath = link.href.replace(/^https?:\/\/[^/]+/, '');
        var current = window.location.pathname + window.location.search;
        if (hrefPath && hrefPath !== current) {
          window.location.href = link.href;
          return;
        }
      }
    } catch (e) {}
    // Fallback: service-slug map (legacy path for any page missing hreflang tags)
    var current = window.location.pathname || '/';
    var target = getAlternateLangUrl(current, targetLang);
    if (target && target !== current) {
      window.location.href = target;
    }
  };
  window.cleavaNavTo = function(page) {
    var fallback = {
      yrityssiivous: '/yrityssiivous',
      myymalasiivous: '/myymalasiivous',
      porrassiivous: '/porrassiivous',
      ravintolasiivous: '/ravintolasiivous',
      lattiahoito: '/lattiahoito',
      hinnasto: '/hinnasto',
      tarinamme: '/tarinamme',
      lahjakortti: '/lahjakortti'
    };
    if (typeof window.showPage === 'function') {
      window.showPage(page, false);
      try {
        var nextUrl = isEn
          ? (page === 'home' ? '/en/' : '/en/#' + page)
          : (fallback[page] || '/');
        window.history.pushState({ page: page }, '', nextUrl);
      } catch (e) {}
      window.closeMob();
      return false;
    }
    window.location.href = isEn ? '/en/' : (fallback[page] || '/');
    return false;
  };
  // Alias used by desktop flag dropdown HTML (onclick="setLang('en')")
  window.setLang = window.cleavaLang;

  // Some static pages still carry older inline mobile handlers after navbar.js.
  // Reinstall this shared version after parsing so all pages use the same class names.
  var sharedOpenMob = window.openMob;
  var sharedCloseMob = window.closeMob;
  var sharedToggleMob = window.toggleMob;
  var sharedToggleMobAcc = window.toggleMobAcc;
  var sharedCleavaNavTo = window.cleavaNavTo;
  var sharedCleavaLang = window.cleavaLang;
  function reinstallSharedMobileHandlers() {
    window.openMob = sharedOpenMob;
    window.closeMob = sharedCloseMob;
    window.toggleMob = sharedToggleMob;
    window.toggleMobAcc = sharedToggleMobAcc;
    window.cleavaNavTo = sharedCleavaNavTo;
    window.cleavaLang = sharedCleavaLang;
    window.setLang = sharedCleavaLang;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reinstallSharedMobileHandlers, { once: true });
  } else {
    reinstallSharedMobileHandlers();
  }
  window.addEventListener('load', reinstallSharedMobileHandlers, { once: true });

})();
