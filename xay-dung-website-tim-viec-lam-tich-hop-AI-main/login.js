document.addEventListener("DOMContentLoaded", () => {

  // ===== CAPTCHA =====
  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let captcha = "";

    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById("captchaText").innerText = captcha;
  }

  generateCaptcha();

  document.getElementById("reloadCaptcha").onclick = generateCaptcha;


  // ===== ROLE SWITCH =====
  const buttons = document.querySelectorAll(".switch button");
  let selectedRole = "candidate";

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      selectedRole = btn.getAttribute("data-role");
      console.log("Role:", selectedRole);
    });
  });


  // ===== LOGIN =====
  document.querySelector(".btn-login").addEventListener("click", () => {

    const input = document.getElementById("captchaInput").value.trim();
    const real = document.getElementById("captchaText").innerText;

    if (!input) {
      alert("Vui lòng nhập captcha!");
      return;
    }

    if (input.toUpperCase() !== real) {
      alert("Sai captcha!");
      generateCaptcha();
      document.getElementById("captchaInput").value = "";
      return;
    }

    alert(
      "Đăng nhập thành công!\nVai trò: " +
      (selectedRole === "candidate" ? "Ứng viên" : "Nhà tuyển dụng")
    );

  });

});