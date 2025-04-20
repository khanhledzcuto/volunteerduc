const projectsData = [
    {
        id: 1,
        title: "Trồng cây xanh tại công viên Gia Định",
        category: "Môi trường",
        location: "TP.HCM",
        date: "30/04/2025",
        description: "Tham gia trồng và chăm sóc 500 cây xanh mới tại công viên Gia Định nhằm tạo không gian xanh cho cộng đồng.",
        image: "project-1.jpg",
        lat: 10.8031,
        lng: 106.6666
    },
    {
        id: 2,
        title: "Dạy học cho trẻ em vùng cao",
        category: "Giáo dục",
        location: "Lào Cai",
        date: "15/05/2025",
        description: "Tham gia giảng dạy và tổ chức hoạt động ngoại khóa cho học sinh tiểu học tại các vùng cao của tỉnh Lào Cai.",
        image: "project-2.jpg",
        lat: 22.4800,
        lng: 103.9784
    },
    {
        id: 3,
        title: "Vệ sinh bãi biển Vũng Tàu",
        category: "Môi trường",
        location: "Vũng Tàu",
        date: "01/05/2025",
        description: "Cùng nhau dọn dẹp rác thải nhựa và làm sạch bãi biển để bảo vệ hệ sinh thái biển và môi trường sống.",
        image: "project-3.jpg", 
        lat: 10.3459,
        lng: 107.0843
    }
];

// Lấy ID từ URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));
const project = projectsData.find(p => p.id === id);

if (project) {
    document.getElementById('projectHero').style.backgroundImage = `url('${project.image}')`;
    document.getElementById('projectDetail').innerHTML = `
        <h1>${project.title}</h1>
        <p><strong>Thể loại:</strong> ${project.category}</p>
        <p><strong>Địa điểm:</strong> ${project.location}</p>
        <p><strong>Ngày:</strong> ${project.date}</p>
        <p>${project.description}</p>
    `;
    const participationKey = `joined_project_${project.id}`;
    const joined = localStorage.getItem(participationKey) === 'true';

    const actionsDiv = document.getElementById('projectActions');
    actionsDiv.innerHTML = joined
        ? `<button class="btn btn-outline" disabled>✅ Bạn đã tham gia</button>`
        : `<button id="joinProjectBtn" class="btn btn-primary">Tham gia dự án</button>`;

    if (!joined) {
        document.getElementById('joinProjectBtn').addEventListener('click', () => {
            localStorage.setItem(participationKey, 'true');
            actionsDiv.innerHTML = `<button class="btn btn-outline" disabled>✅ Bạn đã tham gia</button>`;
            alert("Cảm ơn bạn đã tham gia! Thông tin của bạn đã được ghi nhận.");
        });
    }


    const map = L.map('map').setView([project.lat, project.lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker([project.lat, project.lng]).addTo(map).bindPopup(project.title);
}

// ======= Bình luận ======= //
const commentInput = document.getElementById('commentInput');
const commentsList = document.getElementById('commentsList');
const commentKey = `comments_project_${id}`;

function loadComments() {
    const comments = JSON.parse(localStorage.getItem(commentKey) || '[]');
    commentsList.innerHTML = comments.map(c => `<p>${c}</p>`).join('');
}

document.getElementById('submitComment').addEventListener('click', () => {
    const value = commentInput.value.trim();
    if (value) {
        const comments = JSON.parse(localStorage.getItem(commentKey) || '[]');
        comments.push(value);
        localStorage.setItem(commentKey, JSON.stringify(comments));
        commentInput.value = '';
        loadComments();
    }
});

loadComments();
