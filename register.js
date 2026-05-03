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