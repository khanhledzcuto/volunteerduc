// Mobile Menu Toggle
document.getElementById('menuToggle').addEventListener('click', function () {
    document.getElementById('mainMenu').classList.toggle('active');
});

// Projects Data
const projectsData = [
    {
        id:1,
        title: "Trồng cây xanh tại công viên Gia Định",
        category: "Môi trường",
        location: "TP.HCM",
        date: "30/04/2025",
        description: "Tham gia trồng và chăm sóc 500 cây xanh mới tại công viên Gia Định nhằm tạo không gian xanh cho cộng đồng.",
        image: "/api/placeholder/400/200",
        lat: 10.8031, // Thêm toạ độ
        lng: 106.6666
    },
    {
        id:2,
        title: "Dạy học cho trẻ em vùng cao",
        category: "Giáo dục",
        location: "Lào Cai",
        date: "15/05/2025",
        description: "Tham gia giảng dạy và tổ chức hoạt động ngoại khóa cho học sinh tiểu học tại các vùng cao của tỉnh Lào Cai.",
        image: "/api/placeholder/400/200",
        lat: 10.8031, // Thêm toạ độ
        lng: 106.6666
    },
    {
        id:3,
        title: "Vệ sinh bãi biển Vũng Tàu",
        category: "Môi trường",
        location: "Vũng Tàu",
        date: "01/05/2025",
        description: "Cùng nhau dọn dẹp rác thải nhựa và làm sạch bãi biển để bảo vệ hệ sinh thái biển và môi trường sống.",
        image: "/api/placeholder/400/200",
        lat: 10.8031, // Thêm toạ độ
        lng: 106.6666
    }
];

// Load Projects
function loadProjects(filteredData = null) {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = ''; // Xoá nội dung cũ

    const data = filteredData || projectsData;

    data.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        const imageUrl = `project-${index + 1}.jpg`;

        projectCard.innerHTML = `
            <div class="project-image" style="background-image: url('${imageUrl}')"></div>
            <div class="org-image-wrapper">
    <img src="tochuc-${project.id}.png" alt="Ảnh tổ chức" style="width: 20%; border-radius: 10px; margin: 10px 0;">
  </div>
            <div class="project-content">
                <span class="project-category">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <div class="project-info">
                    <span>${project.location}</span>
                    <span>${project.date}</span>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-actions">
                 <a href="project.html?id=${project.id}" class="btn btn-primary">Tham gia ngay</a>
                <button class="favorite-btn" data-id="${project.id}">
                 ❤️
                 </button>
                 </div>
            </div>
        `;

        projectsGrid.appendChild(projectCard);
        const favorites = getFavorites();
        const favBtn = projectCard.querySelector('.favorite-btn');
        console.log("Favorite list:", favorites, "Current ID:", project.id);
        if (favorites.includes(project.id)) {
            favBtn.classList.add('liked');
        }

        favBtn.addEventListener('click', () => {
            toggleFavorite(project.id, favBtn);
        });

    });
}
function applyFilters() {
    const category = document.getElementById('filterCategory').value;
    const location = document.getElementById('filterLocation').value;
    const date = document.getElementById('filterDate').value;

    const filtered = projectsData.filter(project => {
        const matchCategory = !category || project.category === category;
        const matchLocation = !location || project.location === location;
        const matchDate = !date || project.date === formatDate(date);
        return matchCategory && matchLocation && matchDate;
    });

    loadProjects(filtered);
}

// Chuyển yyyy-mm-dd thành dd/mm/yyyy
function formatDate(dateStr) {
    const [yyyy, mm, dd] = dateStr.split("-");
    return `${dd}/${mm}/${yyyy}`;
}


// Animate Stats Counting
function animateStats() {
    const stats = [
        { id: 'volunteers-count', target: 5000 },
        { id: 'projects-count', target: 350 },
        { id: 'organizations-count', target: 120 },
        { id: 'hours-count', target: 25000 }
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        const target = stat.target;
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 seconds
        const interval = duration / 100;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            element.innerText = Math.floor(current).toLocaleString();
        }, interval);
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const controls = document.querySelectorAll('.slider-control');
    const testimonials = document.querySelectorAll('.testimonial-item');

    controls.forEach(control => {
        control.addEventListener('click', function () {
            const index = this.getAttribute('data-index');

            // Hide all testimonials
            testimonials.forEach(item => {
                item.classList.remove('active');
            });

            // Deactivate all controls
            controls.forEach(ctrl => {
                ctrl.classList.remove('active');
            });

            // Activate selected testimonial and control
            testimonials[index].classList.add('active');
            this.classList.add('active');
        });
    });

    // Auto slide
    let currentSlide = 0;
    const totalSlides = testimonials.length;

    setInterval(() => {
        testimonials[currentSlide].classList.remove('active');
        controls[currentSlide].classList.remove('active');

        currentSlide = (currentSlide + 1) % totalSlides;

        testimonials[currentSlide].classList.add('active');
        controls[currentSlide].classList.add('active');
    }, 5000);
}

// Scroll Animation
function initScrollAnimation() {
    const elements = document.querySelectorAll('.step, .project-card, .stat-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Initialize Map (Placeholder for actual map implementation)
function initMap() {
    const map = L.map('map').setView([16.0471, 108.2062], 6);

    // Load bản đồ từ OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    // Thêm các điểm từ danh sách dự án
    projectsData.forEach(project => {
        if (project.lat && project.lng) {
            L.marker([project.lat, project.lng])
                .addTo(map)
                .bindPopup(`<strong>${project.title}</strong><br>${project.location}<br>${project.date}`);
        }
    });
}
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]').map(id => Number(id));
}


function toggleFavorite(projectId, favBtnElement) {
    let favorites = getFavorites();
    const isLiked = favorites.includes(projectId);

    if (isLiked) {
        favorites = favorites.filter(id => id !== projectId);
        favBtnElement.classList.remove('liked');
    } else {
        favorites.push(projectId);
        favBtnElement.classList.add('liked');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}
function renderUserStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const displayName = localStorage.getItem('displayName_' + currentUser) || currentUser;
    const mainMenu = document.getElementById('mainMenu');
    const registerNowBtn = document.getElementById('registerNowBtn');

    if (currentUser) {
        if (registerNowBtn) {
            registerNowBtn.style.display = 'none';
        }

        mainMenu.innerHTML = `
  <li><a href="#home">Trang chủ</a></li>
  <li><a href="#projects">Dự án</a></li>
  <li><a href="profile.html">Hồ Sơ</a></li> <!-- 👈 chuyển sang profile -->
  <li><a href="#testimonials">Cộng đồng</a></li>
  <li><a href="#cta">Về chúng tôi</a></li>
  <li><span class="btn btn-outline" style="pointer-events: none;">Xin chào, ${displayName}</span></li>
  <li><a href="#" class="btn btn-primary" id="logoutBtn">Đăng xuất</a></li>
`;

      
        attachLogoutEvent(); // ✅ Gắn sự kiện Đăng xuất SAU khi gán menu
        enableSmoothScrollForAnchors();
    } else {
        if (registerNowBtn) {
            registerNowBtn.style.display = 'inline-block';
        }
    }
}






// Document Ready Function
document.addEventListener('DOMContentLoaded', function () {
    loadProjects();
    animateStats();
    initTestimonialSlider();
    initScrollAnimation();
    initMap();
    // Bộ lọc
    document.getElementById('filterCategory').addEventListener('change', applyFilters);
    document.getElementById('filterLocation').addEventListener('change', applyFilters);
    document.getElementById('filterDate').addEventListener('change', applyFilters);
    document.getElementById('clearFilters').addEventListener('click', () => {
        document.getElementById('filterCategory').value = '';
        document.getElementById('filterLocation').value = '';
        document.getElementById('filterDate').value = '';
        loadProjects(); // Reset bộ lọc
    });

    renderUserStatus();

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const offsetTop = targetElement.offsetTop - 60; // trừ header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Đóng menu khi ở chế độ mobile
                    document.getElementById('mainMenu').classList.remove('active');
                }
            }
        });
    });


    // Form validation for contact and registration forms
    // Form validation cho các form khác (không phải authForm)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (form.id !== 'authForm') {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                alert('Chức năng này sẽ được hoàn thiện trong phiên bản tiếp theo!');
            });
        }
    });


    // Toggle active class for filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Responsive handling
window.addEventListener('resize', function () {
    if (window.innerWidth > 992) {
        document.getElementById('mainMenu').classList.remove('active');
    }
});
// Auth Modal Logic
const authModal = document.getElementById('authModal');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSubmit = document.getElementById('authSubmit');
const toggleAuth = document.getElementById('toggleAuth');
const closeModal = document.getElementById('closeModal');

let isLogin = true;

document.querySelectorAll('a.btn.btn-outline, a.btn.btn-primary').forEach(btn => {
    btn.addEventListener('click', function (e) {
        if (this.textContent.includes('Đăng nhập')) {
            isLogin = true;
        } else if (this.textContent.includes('Đăng ký')) {
            isLogin = false;
        } else {
            return;
        }
        e.preventDefault();
        authTitle.innerText = isLogin ? 'Đăng nhập' : 'Đăng ký';
        authSubmit.innerText = isLogin ? 'Đăng nhập' : 'Đăng ký';
        toggleAuth.innerText = isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập';
        authModal.classList.remove('hidden');
    });
});

closeModal.addEventListener('click', () => {
    authModal.classList.add('hidden');
});

toggleAuth.addEventListener('click', () => {
    isLogin = !isLogin;
    authTitle.innerText = isLogin ? 'Đăng nhập' : 'Đăng ký';
    authSubmit.innerText = isLogin ? 'Đăng nhập' : 'Đăng ký';
    toggleAuth.innerText = isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập';
});

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('authUsername').value;
    const password = document.getElementById('authPassword').value;

    if (isLogin) {
        const storedPassword = localStorage.getItem(`user_${username}`);
        if (storedPassword && storedPassword === password) {
            localStorage.setItem('currentUser', username);
            showToast('Đăng nhập thành công!');
            authModal.classList.add('hidden');
            renderUserStatus();
            enableSmoothScrollForAnchors(); 
        } else {
            showToast('Sai tên đăng nhập hoặc mật khẩu!', true);
        }
    } else {
        if (localStorage.getItem(`user_${username}`)) {
            showToast('Tên đăng nhập đã tồn tại!', true);
        } else {
            localStorage.setItem(`user_${username}`, password);
            showToast('Đăng ký thành công!');
            authModal.classList.add('hidden');
        }
    }

    function renderUserStatus() {
        const currentUser = localStorage.getItem('currentUser');
        const displayName = localStorage.getItem('displayName_' + currentUser) || currentUser;
      
        const mainMenu = document.getElementById("mainMenu");
        const registerNowBtn = document.getElementById("registerNowBtn");
      
        if (currentUser) {
          if (registerNowBtn) registerNowBtn.style.display = "none";
      
          mainMenu.innerHTML = `
            <li><a href="#home">Trang chủ</a></li>
            <li><a href="#projects">Dự án</a></li>
            <li><a href="profile.html">Hồ sơ</a></li>
            <li><a href="#community">Cộng đồng</a></li>
            <li><a href="#about">Về chúng tôi</a></li>
            <li><span class="btn btn-outline" style="pointer-events: none;">Xin chào, ${displayName}</span></li>
            <li><a href="#" class="btn btn-primary" id="logoutBtn">Đăng xuất</a></li>
          `;
      
          attachLogoutEvent();
          enableSmoothScrollForAnchors();
        }
      }
      
    function showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        toast.innerText = message;
        toast.className = `toast show ${isError ? 'error' : ''}`;

        setTimeout(() => {
            toast.className = 'toast hidden';
        }, 3000);
    }


    authForm.reset();
});

// Back to top button functionality
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    font-size: 20px;
    z-index: 999;
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

backToTopButton.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
function attachLogoutEvent() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('currentUser'); // Xoá tài khoản đang đăng nhập
            location.reload(); // Tải lại trang để quay về trạng thái chưa đăng nhập
        });
    }
}
function enableSmoothScrollForAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const targetId = anchor.getAttribute('href');
        if (targetId.length <= 1) return; // ⛔ bỏ qua href="#" hoặc href=""

        anchor.removeEventListener('_scrollHandler', anchor._scrollHandler);

        anchor._scrollHandler = function (e) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 60;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        };

        anchor.addEventListener('click', anchor._scrollHandler);
    });
}
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
}

function toggleFavorite(projectId) {
    let favorites = getFavorites();
    if (favorites.includes(projectId)) {
        favorites = favorites.filter(id => id !== projectId);
    } else {
        favorites.push(projectId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadProjects(); 
}
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        const keyword = this.value.toLowerCase();
        const allProjects = JSON.parse(localStorage.getItem('customProjects') || '[]');
        const filtered = allProjects.filter(p =>
          p.title.toLowerCase().includes(keyword) ||
          p.description.toLowerCase().includes(keyword)
        );
        loadProjects(filtered);

      });
    }
  });
  
