document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");

  // SHOW PASSWORD
  document.querySelector(".toggle-pass").onclick = function () {
    const input = document.getElementById("loginPassword");
    input.type = input.type === "password" ? "text" : "password";
    this.classList.toggle("fa-eye-slash");
  };

  // AUTO FILL nếu đã ghi nhớ
  const savedUser = JSON.parse(localStorage.getItem("rememberUser"));
  if (savedUser) {
    document.getElementById("loginEmail").value = savedUser.email;
    document.getElementById("loginPassword").value = savedUser.password;
    document.getElementById("rememberMe").checked = true;
  }

  // LOGIN
  loginBtn.onclick = () => {
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value.trim();
    const remember = document.getElementById("rememberMe").checked;

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert("Sai email hoặc mật khẩu!");
      return;
    }
const loginUser = {
  name: user.fullname || user.username || user.email.split("@")[0],
  email: user.email
};

localStorage.setItem("currentUser", JSON.stringify(loginUser));

    // GHI NHỚ
    if (remember) {
      localStorage.setItem("rememberUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("rememberUser");
    }

    alert("Đăng nhập thành công!");

    window.location.href = "index.html";
  };
});