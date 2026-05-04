document.addEventListener("DOMContentLoaded", () => {
  const userBox = document.getElementById("userBox");
  const authButtons = document.getElementById("authButtons");

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user && user.username) {
    authButtons.style.display = "none";

   userBox.innerHTML = `
  <div class="user-info">
    <span class="user-name">👤 ${user.username}</span>
    <button class="logout-btn" onclick="logout()">Đăng xuất</button>
  </div>
`;
  } else {
    userBox.innerHTML = "";
    authButtons.style.display = "block";
  }
});

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}