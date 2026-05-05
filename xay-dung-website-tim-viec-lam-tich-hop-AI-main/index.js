document.addEventListener("DOMContentLoaded", () => {

  // ================== USER ==================
  const userBox = document.getElementById("userBox");
  const authButtons = document.getElementById("authButtons");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    authButtons.style.display = "none";

    userBox.innerHTML = `
      <div class="user-info">
        <i class="fa fa-user-circle avatar-icon"></i>
        <span class="username">${user.fullname || user.username}</span>
        <button id="logoutBtn">Đăng xuất</button>
      </div>
    `;

    document.getElementById("logoutBtn").onclick = () => {
      localStorage.removeItem("currentUser");
      location.reload();
    };

  } else {
    authButtons.style.display = "flex";
    userBox.innerHTML = "";
  }

  // ================== SEARCH ==================
  const searchBtn = document.querySelector(".search-btn");

  searchBtn.addEventListener("click", () => {
    const keyword = document.getElementById("skillInput").value.toLowerCase();
    const district = document.getElementById("districtSelect").value;

    const filtered = jobsData.filter(job => {
      const matchSkill =
        job.title.toLowerCase().includes(keyword) ||
        job.skills.some(skill => skill.includes(keyword));

      const matchDistrict = !district || job.district === district;

      return matchSkill && matchDistrict;
    });

    renderJobs(filtered, 1);

    setTimeout(() => {
      document.getElementById("jobList").scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  });

  document.getElementById("skillInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchBtn.click();
  });

  // ================== LOAD DEFAULT ==================
  const defaultDistrict = document.getElementById("districtSelect").value;
  const defaultJobs = jobsData.filter(job => job.district === defaultDistrict);
  renderJobs(defaultJobs, 1);

  document.getElementById("districtSelect").addEventListener("change", (e) => {
    const district = e.target.value;
    const filtered = jobsData.filter(job => job.district === district);
    renderJobs(filtered, 1);
  });

});


// ================== DATA ==================
const jobsData = [

  // ===== HẢI CHÂU =====
  { id: 0, title: "Frontend Developer", category: "Công nghệ thông tin", company: "FPT Software", district: "hai-chau", skills: ["ReactJS"], salary: "15-20M" },
  { id: 2, title: "Backend Developer", category: "Công nghệ thông tin", company: "Axon Active", district: "hai-chau", skills: ["NodeJS"], salary: "18-25M" },
  { id: 3, title: "Digital Marketer", category: "Marketing", company: "DN Agency", district: "hai-chau", skills: ["SEO"], salary: "12-18M" },
  { id: 4, title: "Sales", category: "Bán lẻ", company: "Viettel", district: "hai-chau", skills: ["Giao tiếp"], salary: "10-20M" },
  { id: 5, title: "Kế toán", category: "Kế toán - Kiểm toán", company: "ABC Corp", district: "hai-chau", skills: ["Excel"], salary: "10-15M" },
  { id: 6, title: "UI/UX Designer", category: "Công nghệ thông tin", company: "Design Hub", district: "hai-chau", skills: ["Figma"], salary: "12-18M" },
  { id: 7, title: "Nhân sự (HR)", category: "Tài chính - Ngân hàng", company: "HR Plus", district: "hai-chau", skills: ["Giao tiếp"], salary: "11-16M" },
  { id: 8, title: "Content Writer", category: "Truyền thông - Báo chí", company: "Media Co", district: "hai-chau", skills: ["Content Marketing"], salary: "9-14M" },

  // ===== LIÊN CHIỂU =====
  { id: 1, title: "Backend Developer", category: "Công nghệ thông tin", company: "TMA Solutions", district: "lien-chieu", skills: ["Java"], salary: "20-30M" },
  { id: 2, title: "Backend Developer", category: "Công nghệ thông tin", company: "TMA Solutions", district: "lien-chieu", skills: ["Java"], salary: "20-30M" },
  { id: 3, title: "Backend Developer", category: "Công nghệ thông tin", company: "TMA Solutions", district: "lien-chieu", skills: ["Java"], salary: "20-30M" },
  { id: 4, title: "Backend Developer", category: "Công nghệ thông tin", company: "TMA Solutions", district: "lien-chieu", skills: ["Java"], salary: "20-30M" },
  { id: 5, title: "Backend Developer", category: "Công nghệ thông tin", company: "TMA Solutions", district: "lien-chieu", skills: ["Java"], salary: "20-30M" },
 
  
  { id: 10, title: "Tester", category: "Công nghệ thông tin", company: "ABC", district: "lien-chieu", skills: ["SQL"], salary: "10-15M" },
  { id: 11, title: "DevOps", category: "Công nghệ thông tin", company: "XYZ", district: "lien-chieu", skills: ["DevOps"], salary: "25-30M" },
  { id: 12, title: "Data Analyst", category: "Công nghệ thông tin", company: "DN Corp", district: "lien-chieu", skills: ["SQL"], salary: "16-22M" },
  { id: 13, title: "Kỹ sư xây dựng", category: "Xây dựng", company: "Mechanical Co", district: "lien-chieu", skills: ["Excel"], salary: "12-18M" },
  { id: 14, title: "Nhân viên kho", category: "Logistics - Vận tải", company: "Factory DN", district: "lien-chieu", skills: ["Làm việc nhóm"], salary: "8-12M" },
  { id: 15, title: "Sales", category: "Bán lẻ", company: "Industrial Co", district: "lien-chieu", skills: ["Giao tiếp"], salary: "12-20M" },
  { id: 16, title: "Mobile Developer", category: "Công nghệ thông tin", company: "App Co", district: "lien-chieu", skills: ["Flutter"], salary: "14-20M" },

  // ===== NGŨ HÀNH SƠN =====
  { id: 17, title: "Lễ tân", category: "Du lịch - Khách sạn", company: "Resort 5*", district: "ngu-hanh-son", skills: ["Giao tiếp"], salary: "8-12M" },
  { id: 18, title: "Sales", category: "Du lịch - Khách sạn", company: "Travel Co", district: "ngu-hanh-son", skills: ["Giao tiếp"], salary: "10-18M" },
  { id: 19, title: "Chăm sóc khách hàng", category: "Du lịch - Khách sạn", company: "Beach Bar", district: "ngu-hanh-son", skills: ["Giao tiếp"], salary: "7-10M" },
  { id: 20, title: "Quản lý dự án", category: "Du lịch - Khách sạn", company: "Hotel DN", district: "ngu-hanh-son", skills: ["Làm việc nhóm"], salary: "20-30M" },
  { id: 21, title: "Content Writer", category: "Marketing", company: "Restaurant DN", district: "ngu-hanh-son", skills: ["Content Marketing"], salary: "12-20M" },
  { id: 22, title: "Nhân sự (HR)", category: "Tài chính - Ngân hàng", company: "Spa Resort", district: "ngu-hanh-son", skills: ["Giao tiếp"], salary: "10-15M" },
  { id: 23, title: "Sales", category: "Nhà hàng - Ẩm thực", company: "Luxury Bar", district: "ngu-hanh-son", skills: ["Giao tiếp"], salary: "9-14M" },
  { id: 24, title: "Digital Marketer", category: "Marketing", company: "Resort Media", district: "ngu-hanh-son", skills: ["SEO"], salary: "12-18M" },

  // ===== SƠN TRÀ =====
  { id: 25, title: "Graphic Designer", category: "Truyền thông - Báo chí", company: "Creative Co", district: "son-tra", skills: ["Photoshop"], salary: "12-18M" },
  { id: 26, title: "Content Writer", category: "Marketing", company: "Media House", district: "son-tra", skills: ["Content Marketing"], salary: "10-15M" },
  { id: 27, title: "Sales", category: "Bán lẻ", company: "Shop DN", district: "son-tra", skills: ["Giao tiếp"], salary: "8-12M" },
  { id: 28, title: "SEO Specialist", category: "Marketing", company: "SEO Agency", district: "son-tra", skills: ["SEO"], salary: "12-18M" },
  { id: 29, title: "Chăm sóc khách hàng", category: "Bán lẻ", company: "Call Center", district: "son-tra", skills: ["Giao tiếp"], salary: "9-13M" },
  { id: 30, title: "Sales", category: "Du lịch - Khách sạn", company: "Travel Co", district: "son-tra", skills: ["Giao tiếp"], salary: "10-20M" },
  { id: 31, title: "Content Writer", category: "Truyền thông - Báo chí", company: "Studio DN", district: "son-tra", skills: ["Content Marketing"], salary: "8-14M" },
  { id: 32, title: "Frontend Developer", category: "Công nghệ thông tin", company: "Web Agency", district: "son-tra", skills: ["ReactJS"], salary: "15-22M" }
];

// ================== PAGINATION ==================
let currentPage = 1;
const jobsPerPage = 8;
let currentList = [];

function renderJobs(list, page = 1) {
  const jobList = document.getElementById("jobList");

  currentList = list;
  currentPage = page;

  jobList.style.display = "block";

  if (list.length === 0) {
    jobList.innerHTML = "<p>Không tìm thấy công việc phù hợp</p>";
    document.getElementById("pagination").innerHTML = "";
    return;
  }

  const start = (page - 1) * jobsPerPage;
  const end = start + jobsPerPage;
  const paginatedJobs = list.slice(start, end);

  jobList.innerHTML = paginatedJobs.map(job => `
    <div class="job-card">
      <div class="job-title">${job.title}</div>
      <div class="company">${job.company}</div>
      <div>📍 ${job.district}</div>
      <div>💰 ${job.salary}</div>
      <button onclick="viewDetail(${job.id})">Xem chi tiết</button>
    </div>
  `).join("");

  renderPagination(list.length);
}

function renderPagination(total) {
  const pageCount = Math.ceil(total / jobsPerPage);
  const pagination = document.getElementById("pagination");

  if (!pagination) return;

  pagination.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    pagination.innerHTML += `
      <button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
        ${i}
      </button>
    `;
  }
}

function changePage(page) {
  renderJobs(currentList, page);

  document.getElementById("jobList").scrollIntoView({
    behavior: "smooth"
  });
}


// ================== MODAL ==================
function viewDetail(id) {
  const job = jobsData.find(j => j.id === id);

  const detail = document.getElementById("jobDetail");
  detail.innerHTML = `
    <h2>${job.title}</h2>
    <p><b>Công ty:</b> ${job.company}</p>
    <p><b>Khu vực:</b> ${job.district}</p>
    <p><b>Lương:</b> ${job.salary}</p>
    <p>${job.desc}</p>
    <button class="apply-btn" onclick="applyJob(${job.id})">Ứng tuyển</button>
  `;

  document.getElementById("jobModal").style.display = "block";
}


// ================== CLOSE MODAL ==================
const closeBtn = document.getElementById("closeModal");
if (closeBtn) {
  closeBtn.onclick = () => {
    document.getElementById("jobModal").style.display = "none";
  };
}


// ================== APPLY ==================
function applyJob(id) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Bạn cần đăng nhập!");
    return;
  }

  let applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];

  applied.push({ user: user.email, jobId: id });

  localStorage.setItem("appliedJobs", JSON.stringify(applied));

  alert("Ứng tuyển thành công!");
}