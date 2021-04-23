<script>
	const link = document.querySelector(".contact");
const form = document.querySelector(".contact-form");
const inputs = document.querySelectorAll("input");
const textarea = document.querySelector("textarea");
const closeForm = document.querySelector(".close-form");
const send = document.querySelector(".submit button");
const formMsg = document.querySelector(".close-msg");

///////////////////////////////////////////////
//Activities and management of the contact form
///////////////////////////////////////////////

link.addEventListener("click", () => {
  form.style.display = "block";
});

closeForm.addEventListener("click", () => {
  form.style.display = "none";
  inputs.forEach((input) => {
    input.value = "";
    textarea.value = "";
  });
});

inputs.forEach((input) => {
  input.addEventListener("keyup", (event) => {
    console.log(event.target.value);
    console.log(input.value);
    input.value = event.target.value;
    if (
      inputs[0].value !== "" &&
      inputs[1].value !== "" &&
      inputs[2].value !== "" &&
      textarea.value !== ""
    ) {
      send.style.opacity = "1";
    } else {
      send.style.opacity = "0";
    }
  });
});

textarea.addEventListener("keyup", (event) => {
  console.log(event.target.value);
  console.log(textarea.value);
  textarea.value = event.target.value;
  if (
    inputs[0].value !== "" &&
    inputs[1].value !== "" &&
    inputs[2].value !== "" &&
    textarea.value !== ""
  ) {
    send.style.opacity = "1";
  } else {
    send.style.opacity = "0";
  }
});

send.addEventListener("click", () => {
  send.style.opacity = "0";
  formMsg.style.display = "block";
  setTimeout(function () {
    form.style.display = "none";
    textarea.value = "";
    formMsg.style.display = "none";
    inputs.forEach((input) => {
      input.value = "";
    });
  }, 2000);
});


</script>
