console.log("Portfolio loaded!");

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll animation + dark mode + form handling
window.addEventListener("DOMContentLoaded", function () {
  // Scroll reveal
  const sections = document.querySelectorAll("section");

  function revealOnScroll() {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight - 100) {
        section.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // ✅ Dark mode toggle
  const toggle = document.getElementById("darkToggle");
  if (toggle) {
    // Load theme preference
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      toggle.checked = true;
    }

    toggle.addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
    });
  }

  // ✅ Form handler
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          status.textContent = "Message sent successfully! ✅";
          form.reset();
        } else {
          const resData = await response.json();
          status.textContent = resData?.error || "Oops! Something went wrong.";
        }
      } catch (err) {
        status.textContent = "Network error. Please try again.";
        console.error(err);
      }
    });
	
  }
    // Scroll to top button logic
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});
