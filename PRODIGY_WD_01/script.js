// script.js

window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navbarLinks = document.querySelectorAll(".nav-links li a");

    let currentSectionId = '';

    sections.forEach(function (section) {
        const rect = section.getBoundingClientRect();

        // Check if section is in the viewport
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentSectionId = section.id;
        }
    });

    navbarLinks.forEach(link => {
        if (link.getAttribute("href") === `#${currentSectionId}`) {
            // Change navbar link color based on the active section
            link.classList.add('active');
            link.style.color = "#FFD700"; // Set active link color
            document.querySelector(`#${currentSectionId}`).classList.add('active'); // Add active class to section
        } else {
            link.classList.remove('active');
            link.style.color = "white"; // Reset color for non-active links
            // Remove active class from other sections
            document.querySelector(`#${currentSectionId}`).classList.remove('active');
        }
    });
});
