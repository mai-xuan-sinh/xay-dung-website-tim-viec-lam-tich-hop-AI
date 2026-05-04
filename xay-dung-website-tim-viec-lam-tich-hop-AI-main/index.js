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
        <span class="username">${user.fullname}</span>
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

    renderJobs(filtered);

    // ⭐ scroll xuống danh sách
    setTimeout(() => {
      document.getElementById("jobList").scrollIntoView({
        behavior: "smooth"
      });
    }, 100);
  });

  // BONUS: enter để search
  document.getElementById("skillInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchBtn.click();
    }
  });

});


// ================== DATA ==================
const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "FPT Software",
    district: "hai-chau",
    skills: ["react", "javascript"],
    salary: "15-20M",
    desc: "Làm UI, sử dụng React, teamwork Agile."
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Axon Active",
    district: "ngu-hanh-son",
    skills: ["node.js", "express"],
    salary: "18-25M",
    desc: "Xây dựng API, làm việc với MongoDB."
  },
  {
    id: 3,
    title: "Java Developer",
    company: "TMA Solutions",
    district: "lien-chieu",
    skills: ["java", "spring"],
    salary: "20-30M",
    desc: "Phát triển hệ thống enterprise."
  },
  {
    id: 4,
    title: "UI/UX Designer",
    company: "Design Studio",
    district: "hai-chau",
    skills: ["figma", "uiux"],
    salary: "12-18M",
    desc: "Thiết kế giao diện app/web."
  }
];


// ================== RENDER ==================
function renderJobs(list) {
  const jobList = document.getElementById("jobList");

  // đảm bảo hiện ra
  jobList.style.display = "block";

  if (list.length === 0) {
    jobList.innerHTML = "<p>Không tìm thấy công việc phù hợp</p>";
    return;
  }

  jobList.innerHTML = list.map(job => `
    <div class="job-card">
      <div class="job-title">${job.title}</div>
      <div class="company">${job.company}</div>
      <div>📍 ${job.district}</div>
      <div>💰 ${job.salary}</div>
      <button onclick="viewDetail(${job.id})">Xem chi tiết</button>
    </div>
  `).join("");
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


// đóng modal (check null tránh lỗi)
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