document.addEventListener("DOMContentLoaded", () => {
  // Typing Effect
  (() => {
    const words = [
      "Simplified.",
      "Synchronized.",
      "Optimized.",
      "Automated.",
      "Streamlined.",
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    const typingElement = document.querySelector(".typing-text");
    const cursorElement = document.querySelector(".cursor");

    const type = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      const textWidth = typingElement.offsetWidth;
      cursorElement.style.left = `${textWidth}px`;

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    };

    type();
  })();

  // Mobile Menu Toggle
  (() => {
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");

    hamburger.addEventListener("click", () => {
      nav.classList.toggle("show");
      hamburger.classList.toggle("active");
    });
  })();

  // Smooth Scroll
  (() => {
    const nav = document.querySelector("nav");
    const hamburger = document.querySelector(".hamburger");
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
          nav.classList.remove("show");
          hamburger.classList.remove("active");
        }
      });
    });
  })();

  // Form Handler
  (() => {
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        if (validateForm()) {
          const formData = new FormData(contactForm);
          console.log("Form submitted with the following data:");
          for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
          }
          contactForm.reset();
          showNotification(
            "Thank you for your message. We will get back to you soon!",
            "success"
          );
        }
      });
    }

    const validateForm = () => {
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      let isValid = true;

      isValid = validateField(name, "Name is required") && isValid;
      isValid = validateField(email, "Email is required") && isValid;
      if (email.value && !isValidEmail(email.value)) {
        showError(email, "Please enter a valid email address");
        isValid = false;
      }
      isValid = validateField(message, "Message is required") && isValid;

      return isValid;
    };

    const validateField = (input, errorMessage) => {
      if (input.value.trim() === "") {
        showError(input, errorMessage);
        return false;
      } else {
        removeError(input);
        return true;
      }
    };

    const showError = (input, message) => {
      const formControl = input.parentElement;
      let errorElement = formControl.querySelector(".error-message");
      if (!errorElement) {
        errorElement = document.createElement("div");
        errorElement.className = "error-message";
        formControl.appendChild(errorElement);
      }
      errorElement.textContent = message;
      input.classList.add("error");
    };

    const removeError = (input) => {
      const formControl = input.parentElement;
      const errorElement = formControl.querySelector(".error-message");
      if (errorElement) {
        formControl.removeChild(errorElement);
      }
      input.classList.remove("error");
    };

    const isValidEmail = (email) => {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    const showNotification = (message, type) => {
      const notification = document.createElement("div");
      notification.textContent = message;
      notification.className = `notification ${type}`;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 3000);
    };
  })();

  // Scroll to Top
  (() => {
    const scrollToTopBtn = document.getElementById("scroll-to-top");

    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        scrollToTopBtn.style.display = "block";
      } else {
        scrollToTopBtn.style.display = "none";
      }
    });

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  })();

  // Header Scroll
  (() => {
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  })();

  // Team Member Interaction
  (() => {
    const teamMembers = document.querySelectorAll(".team-member");
    
    teamMembers.forEach((member) => {
      member.addEventListener("mouseenter", () => {
        teamMembers.forEach((m) => m.classList.remove("active"));
        member.classList.add("active");
      });
  
      member.addEventListener("mouseleave", () => {
        member.classList.remove("active");
      });
    });
  })();
});

// Add this at the end of the file
document.addEventListener("DOMContentLoaded", () => {
  // Prevent Three.js canvas from capturing scroll events
  document.querySelector("canvas").style.pointerEvents = "none";
});
