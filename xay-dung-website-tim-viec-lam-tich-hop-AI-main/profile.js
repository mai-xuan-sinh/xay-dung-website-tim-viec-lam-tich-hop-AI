document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // ❌ Nếu chưa đăng nhập
  if (!user) {
    alert("Bạn chưa đăng nhập!");
    window.location.href = "login.html";
    return;
  }

  // ✅ Lấy tên an toàn
  const fullName = user.name || "Người dùng";

  // 👉 Hiển thị tên
  document.getElementById("username").innerText = fullName;
  document.getElementById("name").innerText = fullName;

  // 👉 Tách họ tên (chuẩn hơn)
  const parts = fullName.trim().split(" ");
  const firstName = parts.pop();       // tên
  const lastName = parts.join(" ");    // họ + đệm

  document.getElementById("firstName").innerText = firstName || "---";
  document.getElementById("lastName").innerText = lastName || "---";

  // 👉 Email
  document.getElementById("email").innerText = user.email || "---";

  // 👉 About
  document.getElementById("aboutText").innerText =
    `Xin chào ${fullName}, đây là trang hồ sơ cá nhân của bạn trên hệ thống Danang Work.`;

  // ✅ LOGOUT
  document.getElementById("logoutBtn").addEventListener("click", () => {
    const confirmLogout = confirm("Bạn có chắc muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    }
  });
});