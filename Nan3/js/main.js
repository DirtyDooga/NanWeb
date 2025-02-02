document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById('navbar');
    const footer = document.getElementById('footer');

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
                const sidebar = document.querySelector('.sidebar');

                if (menuList && menuIcon && sidebar) {
                    // Function to toggle menu visibility based on screen size
                    const toggleMenu = () => {
                        if (window.innerWidth <= 768) {
                            menuList.style.display = 'none'; // Hide menu items by default
                            menuIcon.style.display = 'block'; // Show menu icon
                        } else {
                            menuList.style.display = 'flex'; // Show menu items
                            menuIcon.style.display = 'none'; // Hide menu icon
                            sidebar.style.display = 'none'; // Ensure sidebar is hidden on larger screens
                        }
                    };

                    // Add resize event listener and initialize
                    window.addEventListener('resize', toggleMenu);
                    toggleMenu(); // Run on page load

                    // Add click event to toggle dropdown menu
                    menuIcon.addEventListener('click', () => {
                        if (menuList.style.display === 'none' || menuList.style.display === '') {
                            menuList.style.display = 'flex'; // Show menu items in dropdown
                            menuList.style.flexDirection = 'column'; // Ensure vertical layout
                        } else {
                            menuList.style.display = 'none'; // Hide menu items
                        }
                    });

                    // Sidebar toggle functionality
                    const toggleSidebar = () => {
                        sidebar.style.display =
                            sidebar.style.display === 'flex' ? 'none' : 'flex';
                        sidebar.style.flexDirection = 'column'; // Ensure vertical layout
                    };

                    // Sidebar hide functionality
                    const hideSidebar = () => {
                        sidebar.style.display = 'none'; // Ensure the sidebar is hidden
                    };

                    // Add click event to sidebar toggle button
                    const sidebarToggle = document.querySelector('.navbar-item[onclick="showSidebar()"]');
                    if (sidebarToggle) {
                        sidebarToggle.addEventListener('click', (event) => {
                            event.preventDefault(); // Prevent default link behavior
                            toggleSidebar();
                        });
                    }

                    // Add click event to hide the sidebar
                    const sidebarToggleHide = document.querySelector('.navbar-item[onclick="hideSidebar()"]');
                    if (sidebarToggleHide) {
                        sidebarToggleHide.addEventListener('click', (event) => {
                            event.preventDefault(); // Prevent default link behavior
                            hideSidebar();
                        });
                    }
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
