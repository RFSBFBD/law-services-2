const CONTACT_INFO = {
    whatsapp_primary: "+447839199992",
    whatsapp_secondary: "+971544428286",
    email: "Daniel@lawservice.ae",
    address: "Office 1105, Iris Bay Tower, Business Bay, Dubai, UAE"
};

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------
    // 1. Mobile Menu Toggle & Dropdowns
    // ------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Handle dropdown clicks on mobile devices
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const parentLi = toggle.parentElement;
                parentLi.classList.toggle('active');
            }
        });
    });

    // ------------------------------------
    // 2. Scroll Effect on Header
    // ------------------------------------
    const header = document.querySelector('.main-header') || document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ------------------------------------
    // 3. Global Language Switcher & Translator Logic
    // ------------------------------------
    const translationDict = {
        // Navigation & Global UI
        "الصفحة الرئيسية": "Home",
        "من نحن": "About Us",
        "فريق المحامين": "Lawyers Team",
        "الخدمات": "Services",
        "المقالات القانونية": "Legal Articles",
        "كاتب العدل": "Notary",
        "العلامات التجارية": "Trademarks",
        "المركز الإعلامي": "Media Center",
        "الشروط والأحكام": "Terms and Conditions",
        "تواصل معنا": "Contact Us",
        
        // Headings & CTA
        "تعرف على فريقنا المحترف": "Meet Our Professional Team",
        "نخبة من المحامين والمستشارين القانونيين أصحاب الخبرات الواسعة محلياً ودولياً.": "A group of elite lawyers and legal advisors with extensive local and international experience.",
        "خدماتنا القانونية": "Our Legal Services",
        "شريكك الموثوق في عالم الحقوق": "Your Trusted Partner in Law",
        "هل تحتاج إلى استشارة قانونية؟": "Need a Legal Consultation?",
        "معلومات التواصل": "Contact Information",
        "أرسل رسالتك": "Send Your Message",
        "خبرة قانونية متخصصة لخدمة عملائنا": "Specialized Legal Expertise for Our Clients",

        // Buttons
        "المزيد": "Read More",
        "تواصل معنا الآن": "Contact Us Now",
        "طلب استشارة": "Request Consultation",
        "تعرف علينا أكثر": "Learn More About Us",
        "عرض جميع مجالات خدماتنا": "View All Our Services",

        // Form inputs and Labels
        "الاسم الكامل": "Full Name",
        "رقم الهاتف": "Phone Number",
        "البريد الإلكتروني": "Email Address",
        "رسالتك أو استفسارك القانوني...": "Your message or legal inquiry...",
        "إرسال الرسالة": "Submit Message",

        // Footer
        "خدمات مختارة": "Featured Services",
        "روابط هامة": "Important Links",
        "التواصل": "Contact",
        "دبي، الإمارات العربية المتحدة": "Dubai, United Arab Emirates",
        "نحن في جاسم الحمادي نفخر بثقة عملائنا، ونلتزم بتقديم الدعم القانوني اللازم لهم مهما كانت طبيعة أو تعقيد القضية. اعلم لكي تسلم… لأن في القانون حياة.": "At Jassim Al Hammadi, we pride ourselves on our clients' trust, committing to necessary legal support regardless of case complexity.",
        "جميع الحقوق محفوظة - مكتب جاسم الحمادي للمحاماة والاستشارات القانونية.": "All Rights Reserved - Jassim Al Hammadi Advocates & Legal Consultants.",
        "نحن في جاسم الحمادي نفخر بثقة عملائنا، ونلتزم بتقديم الدعم القانوني اللازم لهم.": "At Jassim Al Hammadi, we pride ourselves on our clients' trust, committing to necessary legal support for them.",

        // Team names & Roles
        "دانيال السعدنى": "Daniel Elsadany",
        "شريك استراتيجي في المملكة المتحدة": "UK Strategic Partner",
        "دوروثي السعدني": "Dorothy Elsadany",
        "مدير مكتب المملكة المتحدة": "UK Office Manager",
        "جاسم محمد الحمادى": "Jassim Mohammed Al Hammadi",
        "محامى": "Lawyer",
        "محمود مبروك": "Mahmoud Mabrouk",
        "مستشار قانوني": "Legal Advisor",
        "مستشار قانونى": "Legal Advisor",
        "سمهر مصطفى": "Samhar Mustafa",
        "مسؤول ادارة القضايا": "Case Management Officer",
        "طه الزهرانى": "Taha Al Zahrani",
        "اميرة الشريف": "Amira Al Sharif",
        "باحث قانونى": "Legal Researcher",
        "للاين": "LALAINE",
        "LALAINE": "LALAINE",
        "فريق المبيعات": "Sales Team",
        "محمد نصر": "Mohamed Nasr",
        "لا تتردد في الاتصال بنا للحصول على الدعم القانوني الفوري.": "Do not hesitate to contact us to get immediate legal support.",
        "متواجدون على مدار الساعة للرد على مكالماتكم وتقديم أفضل الحلول القانونية التي تلبي احتياجاتكم.": "We are available 24/7 to answer your calls and provide the best legal solutions to meet your needs."
    };

    class SiteTranslator {
        constructor(dictionary) {
            this.dict = dictionary;
            this.revDict = {};
            for(let key in dictionary) {
                this.revDict[dictionary[key]] = key;
            }
            this.textNodes = [];
            this.inputs = [];
        }

        init() {
            // Find all text elements.
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            let node;
            while(node = walker.nextNode()) {
                let text = node.nodeValue.trim();
                let arText = this.dict[text] ? text : (this.revDict[text] ? this.revDict[text] : null);
                if(arText) {
                    this.textNodes.push({ node: node, ar: arText, en: this.dict[arText] });
                }
            }

            // Find form inputs and buttons.
            document.querySelectorAll('input[placeholder], textarea[placeholder], button').forEach(el => {
                if(el.placeholder) {
                    let text = el.placeholder.trim();
                    let arText = this.dict[text] ? text : (this.revDict[text] || null);
                    if(arText) this.inputs.push({ el: el, type: 'placeholder', ar: arText, en: this.dict[arText] });
                }
                if(el.tagName === 'BUTTON' && el.textContent) {
                     if (el.value) {
                         let text = el.value.trim();
                         let arText = this.dict[text] ? text : (this.revDict[text] || null);
                         if(arText) this.inputs.push({ el: el, type: 'value', ar: arText, en: this.dict[arText] });
                     }
                }
            });
        }

        applyLanguage(lang) {
            this.textNodes.forEach(item => {
                // Replacing trimmed match while maintaining any padding/spaces
                let original = item.node.nodeValue;
                let target = lang === 'en' ? item.en : item.ar;
                // Basic string replacement on the node.
                item.node.nodeValue = original.replace(lang === 'en' ? item.ar : item.en, target); 
            });
            
            this.inputs.forEach(item => {
                if(item.type === 'placeholder') item.el.placeholder = lang === 'en' ? item.en : item.ar;
                if(item.type === 'value') item.el.value = lang === 'en' ? item.en : item.ar;
            });

            document.documentElement.setAttribute('lang', lang);
            document.documentElement.setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
        }
    }

    const htmlLang = document.documentElement;
    const allNavItems = document.querySelectorAll('[data-en][data-ar]');
    
    // Ensure translation engine runs.
    const translator = new SiteTranslator(translationDict);
    translator.init();

    const langToggleBtn = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('siteLang') || 'ar';
    
    // Apply immediately to prevent flickering of default layout
    updateLanguage(currentLang);

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            localStorage.setItem('siteLang', currentLang);
            updateLanguage(currentLang);
        });
    }

    function updateLanguage(lang) {
        // Translation Dictionary DOM Sweep
        translator.applyLanguage(lang);
        
        // Ensure language Toggle text updates
        const langTextSpan = langToggleBtn ? langToggleBtn.querySelector('.lang-text') : null;
        if (langTextSpan) {
            langTextSpan.textContent = lang === 'en' ? 'العربية' : 'English';
        }

        // Deep-replace exact data-attributes across headers/static labels
        allNavItems.forEach(item => {
            const newText = item.getAttribute(`data-${lang}`);
            if (item.tagName.toLowerCase() === 'span' || !item.querySelector('span')) {
                const icon = item.querySelector('i');
                item.textContent = newText;
                if (icon) {
                    item.appendChild(document.createTextNode(' '));
                    item.appendChild(icon);
                }
            } else {
                 const icon = item.querySelector('i');
                 item.textContent = newText;
                 if (icon) {
                     item.appendChild(document.createTextNode(' '));
                     item.appendChild(icon);
                 }
            }
        });
    }

    // ------------------------------------
    // 4. Set Dynamic Year in Footer
    // ------------------------------------
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ------------------------------------
    // 5. Global Contact Data Integration
    // ------------------------------------
    function applyGlobalContactData() {
        // Find and replace text instances
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while(node = walker.nextNode()) {
            let text = node.nodeValue;
            if(text.includes('info@alhammadi-law.com')) {
                node.nodeValue = text.replace('info@alhammadi-law.com', CONTACT_INFO.email);
            }
            if(text.includes('+971 000 0000 00')) {
                node.nodeValue = text.replace('+971 000 0000 00', CONTACT_INFO.whatsapp_secondary);
            }
            if(text.includes('دبي، الإمارات العربية المتحدة') || text.includes('Dubai, United Arab Emirates')) {
                node.nodeValue = text.replace('دبي، الإمارات العربية المتحدة', CONTACT_INFO.address).replace('Dubai, United Arab Emirates', CONTACT_INFO.address);
            }
        }

        // Redirect all WhatsApp Links to Primary WhatsApp Number
        const cleanWaNumber = CONTACT_INFO.whatsapp_primary.replace('+', '');
        document.querySelectorAll('a[href]').forEach(link => {
            if(link.href.includes('wa.me') && !link.hasAttribute('data-contact-handled')) {
                // If it explicitly has a text search param, keep it, otherwise generic message
                const urlObj = new URL(link.href);
                let textParam = urlObj.searchParams.get('text');
                link.href = `https://wa.me/${cleanWaNumber}` + (textParam ? `?text=${encodeURIComponent(textParam)}` : '');
                link.setAttribute('data-contact-handled', 'true');
            }
        });

        // Intercept all Form Submissions and convert them to WhatsApp Messages
        document.querySelectorAll('form').forEach(form => {
            if (form.hasAttribute('data-contact-handled')) return;
            
            form.addEventListener('submit', (e) => {
                e.preventDefault(); // Stop normal submission (no emails)
                
                const formData = new FormData(form);
                const name = formData.get('name') || '';
                const phone = formData.get('phone') || '';
                const email = formData.get('email') || '';
                const message = formData.get('message') || '';

                let waText = `طلب استشارة جديدة\n\n`;
                if(name) waText += `الاسم: ${name}\n`;
                if(phone) waText += `رقم الهاتف: ${phone}\n`;
                if(email) waText += `البريد الإلكتروني: ${email}\n`;
                if(message) waText += `الرسالة/الاستفسار: ${message}\n`;

                const waUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waText)}`;
                window.open(waUrl, '_blank');
            });
            form.setAttribute('data-contact-handled', 'true');
        });
    }

    applyGlobalContactData();
    
    // Optional: Re-apply if translator modifies DOM
    const originalUpdateLang = updateLanguage;
    updateLanguage = function(lang) {
        originalUpdateLang(lang);
        applyGlobalContactData();
    };
});
