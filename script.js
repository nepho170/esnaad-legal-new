// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY_HERE";
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID_HERE";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID_HERE";

document.addEventListener("DOMContentLoaded", function () {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);
    // --- Translations Setup ---
    const langToggleBtn = document.getElementById("lang-toggle");
    const htmlTag = document.documentElement;
    const rtlStylesheet = document.getElementById("rtl-stylesheet");

    // Default Language
    let currentLang = localStorage.getItem("esnaad_lang") || "ar";

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem("esnaad_lang", lang);

        // Update HTML attributes
        htmlTag.setAttribute("lang", lang);
        htmlTag.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

        // Update Bootstrap CSS
        if (lang === "ar") {
            rtlStylesheet.setAttribute(
                "href",
                "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css"
            );
        } else {
            rtlStylesheet.setAttribute(
                "href",
                "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            );
        }

        // Update Text Content
        const elements = document.querySelectorAll("[data-i18n]");
        elements.forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                // Handle placeholders for inputs
                if (
                    el.tagName === "INPUT" ||
                    el.tagName === "TEXTAREA"
                ) {
                    el.placeholder = translations[lang][key];
                } else {
                    // Handle innerHTML for text with line breaks <br>
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        // Update Button Text
        if (langToggleBtn) {
            langToggleBtn.textContent = translations[lang].lang_btn;
        }
    }

    // Event Listener for Toggle
    if (langToggleBtn) {
        langToggleBtn.addEventListener("click", () => {
            const newLang = currentLang === "ar" ? "en" : "ar";
            setLanguage(newLang);
        });
    }

    // Initialize Language
    setLanguage(currentLang);

    // --- Existing Logic Below (AOS, Navbar, etc.) ---

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });

    // Navbar scroll effect
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 100) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Collapsible list functionality
    const collapseItems = document.querySelectorAll(".collapse-list-item");
    collapseItems.forEach((item) => {
        const header = item.querySelector(".collapse-list-header");
        const content = item.querySelector(".collapse-list-content");

        header.addEventListener("click", function () {
            collapseItems.forEach((otherItem) => {
                if (otherItem !== item && otherItem.classList.contains("active")) {
                    otherItem.classList.remove("active");
                    otherItem.querySelector(".collapse-list-content").style.maxHeight = "0";
                }
            });

            const isActive = item.classList.contains("active");
            item.classList.toggle("active");

            if (!isActive) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });

    // Form Submission
    const consultationForm = document.getElementById("consultationForm");
    if (consultationForm) {
        consultationForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Show loading state
            const submitBtn = consultationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>' + (currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...');

            // Prepare form data
            const formData = new FormData(consultationForm);
            const templateParams = {
                from_name: formData.get('fullName'),
                from_email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('consultationType'),
                message: formData.get('details'),
                submission_date: new Date().toLocaleString(currentLang === 'ar' ? 'ar' : 'en-US'),
                to_email: "esnaaduae@gmail.com"
            };

            // Send email using EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    const successMsg = currentLang === 'ar'
                        ? "تم استلام طلبك بنجاح! سيتم التواصل معك لتحديد موعد الاستشارة."
                        : "Request received successfully! We will contact you to schedule an appointment.";
                    alert(successMsg);
                    consultationForm.reset();
                }, function (error) {
                    console.log('FAILED...', error);
                    const errorMsg = currentLang === 'ar'
                        ? "حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة."
                        : "Error sending request. Please try again or contact us directly.";
                    alert(errorMsg);
                })
                .finally(function () {
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                });
        });
    }

    // Hover dropdown for desktop
    if (window.innerWidth > 992) {
        const dropdowns = document.querySelectorAll(".dropdown");
        dropdowns.forEach((dropdown) => {
            dropdown.addEventListener("mouseenter", function () {
                const toggle = this.querySelector(".dropdown-toggle");
                if (toggle) toggle.click();
            });

            dropdown.addEventListener("mouseleave", function () {
                const toggle = this.querySelector(".dropdown-toggle");
                if (toggle && toggle.getAttribute("aria-expanded") === "true") {
                    toggle.click();
                }
            });
        });
    }
});