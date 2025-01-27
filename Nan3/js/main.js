document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById('navbar');
    const footer = document.getElementById('footer');

    // Fetch and inject the navbar and footer components
    if (navbar) {
        fetch('components/navbar.html')
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load navbar: ${response.status}`);
                return response.text();
            })
            .then(data => {
                navbar.innerHTML = data;

                // Add responsive behavior to the navbar
                const menuList = document.querySelector('.menu-list');
                const menuIcon = document.querySelector('.bx-menu');

                if (menuList && menuIcon) {
                    // Function to toggle menu based on screen size
                    const toggleMenu = () => {
                        if (window.innerWidth <= 768) {
                            menuList.style.display = 'none'; // Hide menu items
                            menuIcon.style.display = 'block'; // Show menu icon
                        } else {
                            menuList.style.display = 'flex'; // Show menu items
                            menuIcon.style.display = 'none'; // Hide menu icon
                        }
                    };

                    // Add resize event listener and initialize
                    window.addEventListener('resize', toggleMenu);
                    toggleMenu(); // Run on page load

                    // Add click event to toggle dropdown menu
                    menuIcon.addEventListener('click', () => {
                        menuList.style.display = menuList.style.display === 'none' ? 'flex' : 'none';
                    });
                }
            })
            .catch(err => console.error(err));
    }

    if (footer) {
        fetch('components/footer.html')
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load footer: ${response.status}`);
                return response.text();
            })
            .then(data => {
                footer.innerHTML = data;
            })
            .catch(err => console.error(err));
    }
});
