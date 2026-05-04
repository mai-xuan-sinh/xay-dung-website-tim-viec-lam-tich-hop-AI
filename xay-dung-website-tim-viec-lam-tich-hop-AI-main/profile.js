document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    alert("Bạn chưa đăng nhập!");
    window.location.href = "login.html";
    return;
  }

  // Hiển thị dữ liệu
  document.getElementById("username").innerText = user.name;
  document.getElementById("name").innerText = user.name;

  const nameParts = user.name.split(" ");
  document.getElementById("firstName").innerText = nameParts[0] || "";
  document.getElementById("lastName").innerText = nameParts.slice(1).join(" ");

  document.getElementById("email").innerText = user.email || "";

  // Logout
  document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  };
});