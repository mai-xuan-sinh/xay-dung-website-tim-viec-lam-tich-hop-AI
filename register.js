const typeCards = document.querySelectorAll('.type-card');
const userTypeInput = document.getElementById('userType');
const employerFields = document.getElementById('employerFields');

typeCards.forEach(card => {
  card.addEventListener('click', () => {

    // đổi active
    typeCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    const value = card.getAttribute('data-value');
    userTypeInput.value = value;

    // 👉 SHOW / HIDE field công ty
    if (value === "employer") {
      employerFields.style.display = "block";
    } else {
      employerFields.style.display = "none";
    }
  });
});


const modal = document.getElementById("policyModal");
const openBtn = document.getElementById("openPolicy");
const closeBtn = document.querySelector(".close");

openBtn.onclick = (e) => {
  e.preventDefault();
  modal.classList.add("show");
};

closeBtn.onclick = () => {
  modal.classList.remove("show");
};

window.onclick = (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
};