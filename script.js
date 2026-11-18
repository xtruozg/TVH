(() => {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  /* Header nền đen khi cuộn */
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menu mobile */
  const toggleMenu = (open) => {
    burger.classList.toggle('is-open', open);
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggleMenu(!nav.classList.contains('is-open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => toggleMenu(false)));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && toggleMenu(false));

  /* Hiệu ứng xuất hiện khi cuộn */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const siblings = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
        el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 90}ms`;
        el.classList.add('is-visible');
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* Đếm số liệu */
  const counters = document.querySelectorAll('[data-count]');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.dataset.count;
      const start = performance.now();
      const dur = 1600;
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString('vi-VN') + (p === 1 ? (el.dataset.suffix || '') : '');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => countIO.observe(el));

  /* So sánh Clay model / Final render */
  const compare = document.getElementById('compare');
  if (compare) {
    const range = compare.querySelector('.compare__range');
    const update = () => compare.style.setProperty('--pos', `${range.value}%`);
    range.addEventListener('input', update);
    update();
  }

  /* Active link theo section */
  const links = [...nav.querySelectorAll('a[href^="#"]:not(.btn)')];
  const sections = links.map((l) => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const navIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => navIO.observe(s));

  /* Đa ngôn ngữ Việt / Anh
     Tiếng Việt lấy trực tiếp từ HTML, chỉ cần khai báo bản tiếng Anh ở đây. */
  const EN = {
    'meta.title': 'Trần Văn Hưng — 3D Interior Design',
    'meta.desc': 'Portfolio of Trần Văn Hưng — interior architect & 3D visualization specialist.',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.process': 'Process',
    'nav.contact': 'Contact',
    'nav.menu': 'Open menu',
    'hero.lead': 'Interior architect and 3D visualization specialist. I turn ideas into refined living spaces — modeled, lit and finished true to every material before the first brick is laid.',
    'hero.cta1': 'View projects',
    'hero.cta2': 'Book a consultation',
    'hero.note': 'Space making &amp; aesthetic direction — Portfolio 2025',
    'hero.badge': 'years of experience<br />in design &amp; visualization',
    'stats.projects': 'Completed projects',
    'stats.renders': 'Rendered images',
    'stats.clients': 'Returning clients',
    'stats.awards': 'Awards &amp; nominations',
    'about.eyebrow': '01 — About me',
    'about.title': 'Designed with emotion, finished with technique',
    'about.p1': 'I have more than 10 years of experience designing homes, luxury apartments and commercial spaces. Every project starts by listening to how the owners live, then comes to life through 3D models, physically based lighting and accurate materials.',
    'about.p2': 'Past work includes design and visualization for developers, showrooms and architecture studios.',
    'about.co1': 'Interior design studio',
    'about.co3': 'Interior manufacturing company',
    'about.job1': 'Lead interior designer &amp; 3D visualizer',
    'about.job2': 'Interior architect, luxury apartments',
    'about.job3': '3D draftsman — modeling &amp; interior take-offs',
    'mission.eyebrow': 'Mission',
    'mission.quote': '“Connecting your <em>ideas</em> with real <em>living spaces</em>.”',
    'mission.sub': 'See your home — true to every ray of sunlight — before construction begins.',
    'services.eyebrow': '02 — Work',
    'services.title': 'Services I offer',
    'services.s1.title': 'Residential interior design',
    'services.s1.text': 'Apartments, townhouses, villas — from concept and space planning to construction documents.',
    'services.s2.title': '3D visualization',
    'services.s2.text': 'Photorealistic interior and exterior renders, day/night lighting, walkthrough videos &amp; 360° images.',
    'services.s3.title': 'Commercial interiors',
    'services.s3.text': 'Showrooms, cafés, offices, hotels — spaces with a strong brand identity.',
    'projects.eyebrow': 'Featured projects',
    'projects.p1.text': 'A 280 m² penthouse in Modern Luxury style. Its palette of marble, walnut and brushed bronze was rendered true to life so the owner could approve it before construction.',
    'projects.p1.place': 'District 2, HCMC',
    'projects.p2.title': '<span>02.</span> Wabi Sabi<br />Villa',
    'projects.p2.text': 'A rustic, tranquil space with earthy tones, raw plaster and natural light. The package includes 24 render angles and a 90-second walkthrough video.',
    'projects.p2.place': 'Da Lat',
    'projects.p3.text': 'A collection of concept options for apartments, cafés and showrooms — from material moodboards to finished perspectives.',
    'process.eyebrow': '03 — Process',
    'process.title': 'From idea to space',
    'process.s1.title': 'Survey &amp; consultation',
    'process.s1.text': 'Listening to your needs, measuring the site and agreeing on a budget.',
    'process.s2.title': 'Concept &amp; layout',
    'process.s2.text': 'Style moodboard, space planning and material board.',
    'process.s3.title': '3D visualization',
    'process.s3.text': 'Modeling, lighting and realistic rendering — revised until you are happy.',
    'process.s4.title': 'Documents &amp; supervision',
    'process.s4.text': 'Detailed technical drawings and close work with the construction team.',
    'contact.eyebrow': '04 — Contact',
    'contact.title': 'Get in<br />touch',
    'contact.lead': 'Have a space waiting to be awakened? Call or email me — I will reply within 24 hours.',
    'contact.address': 'Address',
    'contact.addressValue': 'Hanoi, Vietnam',
    'contact.phone': 'Phone',
    'footer.top': 'Back to top ↑',
    'footer.top.aria': 'Back to top',
    'tools.aria': 'Software I use',
    'alt.hero': '3D rendering of a modern living room',
    'alt.about1': 'Minimalist living room',
    'alt.about2': 'Bedroom interior detail',
    'alt.final': 'Final render',
    'alt.clay': 'Clay model render',
    'alt.compare': 'Drag to compare the model with the final render',
    'alt.wabi1': 'Wabi Sabi bedroom',
    'alt.wabi2': 'Kitchen and dining room',
    'alt.g1': 'Japandi living room',
    'alt.g2': 'Scandinavian apartment',
    'alt.g3': 'Indochine bedroom',
    'alt.g4': 'Modern Luxury space',
  };

  /* Ghi nhớ nội dung tiếng Việt gốc */
  const textEls = [...document.querySelectorAll('[data-i18n]')];
  textEls.forEach((el) => { el._vi = el.innerHTML; });
  const attrEls = [...document.querySelectorAll('[data-i18n-attr]')].map((el) => {
    const pairs = el.dataset.i18nAttr.split(';').map((p) => {
      const [attr, key] = p.split(':');
      return { attr, key, vi: el.getAttribute(attr) };
    });
    return { el, pairs };
  });
  const langBtns = document.querySelectorAll('.lang__btn');

  const setLang = (lang) => {
    const en = lang === 'en';
    textEls.forEach((el) => {
      const val = en ? EN[el.dataset.i18n] : el._vi;
      if (val != null) el.innerHTML = val;
    });
    attrEls.forEach(({ el, pairs }) => pairs.forEach(({ attr, key, vi }) => {
      const val = en ? EN[key] : vi;
      if (val != null) el.setAttribute(attr, val);
    }));
    document.documentElement.lang = en ? 'en' : 'vi';
    langBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    try { localStorage.setItem('lang', lang); } catch (e) { /* bỏ qua */ }
  };

  langBtns.forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* bỏ qua */ }
  if (saved === 'en') setLang('en');

  document.getElementById('year').textContent = new Date().getFullYear();
})();
