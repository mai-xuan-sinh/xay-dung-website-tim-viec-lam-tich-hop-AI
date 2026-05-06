// TYPE SWITCH
const typeCards = document.querySelectorAll('.type-card');
const employerFields = document.getElementById('employerFields');

typeCards.forEach(card => {
  card.onclick = () => {
    typeCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    if (card.dataset.value === "employer") {
      employerFields.style.display = "block";
    } else {
      employerFields.style.display = "none";
    }
  };
});

// SHOW PASSWORD
document.querySelectorAll('.toggle-pass').forEach(icon => {
  icon.onclick = () => {
    const input = icon.previousElementSibling;
    input.type = input.type === "password" ? "text" : "password";
    icon.classList.toggle("fa-eye-slash");
  };
});




const modal = document.getElementById("policyModal");
const openBtn = document.getElementById("openPolicy");
const closeBtn = document.querySelector(".close");

// mở
openBtn.onclick = (e) => {
  e.preventDefault();
  modal.classList.add("show");
};

// đóng bằng X
closeBtn.onclick = () => {
  modal.classList.remove("show");
};

// click ra ngoài thì đóng
window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
};










const registerBtn = document.getElementById("registerBtn");

registerBtn.onclick = () => {
  const userType = document.querySelector(".type-card.active").dataset.value;

  const fullname = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  const agree = document.getElementById("agree").checked;

  const companyName = document.getElementById("companyName")?.value.trim();
  const companyAddress = document.getElementById("companyAddress")?.value.trim();
  const companyType = document.getElementById("companyType")?.value;

  // VALIDATE
  if (!fullname || !phone || !email || !password || !confirmPassword) {
    alert("Vui lòng nhập đầy đủ thông tin!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp!");
    return;
  }

  if (!agree) {
    alert("Bạn phải đồng ý điều khoản!");
    return;
  }

  if (userType === "employer") {
    if (!companyName || !companyAddress || companyType === "-- Loại công ty --") {
      alert("Vui lòng nhập đầy đủ thông tin công ty!");
      return;
    }
  }

  // TẠO USER OBJECT
  const user = {
    username: fullname,
    phone,
    email,
    password,
    role: userType,
    company: userType === "employer" ? {
      name: companyName,
      address: companyAddress,
      type: companyType
    } : null
  };

  // LẤY DANH SÁCH USER
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // CHECK EMAIL TRÙNG
  const exist = users.find(u => u.email === email);
  if (exist) {
    alert("Email đã tồn tại!");
    return;
  }

  // LƯU
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công!");

  // RESET FORM
  window.location.href = "login.html";
};