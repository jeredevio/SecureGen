const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passwordIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generator-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+[]{}|;:,.<>?`~",
};

const generatorPassword = () => {
  let staticPassword = "",
      randomPassword = "",
      excludeDuplicates = false,
      passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += ` ${characters[option.id]} `;
      } else {
        excludeDuplicates = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicates) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }

  passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
  passwordIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 18
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  updatePassIndicator();
};
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  copyIcon.style.color = "#1f4240";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#1f4240";
  }, 1500);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatorPassword);
