<script>
	const div = document.querySelector(".pics");
const slider = document.querySelector(".slider-container");
const slide = document.querySelector(".slide-container");
const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");
const crossIcon = document.querySelector(".close-slider");
google.script.run.withSuccessHandler(getData).getScriptURLBack()

////////////////////////////////
//////// fetch datas //////////
///////////////////////////////

function getData(url) {
  fetch(url)
    .then((rep) => rep.json())
    .then((data) => {
      const picsArr = data.pictures;
      picsArr.forEach((pic) => {
        const divImg = document.createElement("div");
        const image = document.createElement("img");
        div.appendChild(divImg);
        divImg.appendChild(image);
        divImg.classList.add("container-pic");
        image.setAttribute("id", pic.id);
        image.setAttribute("src", pic.image_url);
        image.classList.add("image");
      });
      return data;
    })
    .then((data) => {
      slideShow(data);
    });
}

//////////////////////////////////////////////
/// slide management and animations //////////
//////////////////////////////////////////////

let slideIndex = 0;

function slideShow(data) {
  const images = document.querySelectorAll(".image");
  const allImages = data.pictures;
  for (let i = 0; i < allImages.length; i++) {
    let img = allImages[i];
    createImage(img);
  }
  images.forEach((pic) => {
    pic.addEventListener("click", (e) => {
      slideIndex = e.target.id;
      slider.style.display = "block";
      showSlides(slideIndex);
    });
  });
}

function createImage(img) {
  let imageUrl = img.image_url;
  let imageId = img.id;
  const addImage = document.createElement("img");
  addImage.setAttribute("src", imageUrl);
  addImage.setAttribute("id", imageId);
  addImage.setAttribute("class", "slide-image");
  slide.appendChild(addImage);
}

function showSlides(slideIndex) {
  let slides = document.querySelectorAll(".slide-image");
  const displayNone = () => {
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
  };
  arrowRight.addEventListener("click", () => {
    if (slideIndex < slides.length - 1) {
      displayNone();
      slideIndex++;
      slides[slideIndex].style.display = "block";
    } else if (slideIndex === slides.length - 1) {
      displayNone();
      slideIndex = 0;
      slides[slideIndex].style.display = "block";
    }
  });
  arrowLeft.addEventListener("click", () => {
    if (slideIndex > 0) {
      displayNone();
      slideIndex--;
      slides[slideIndex].style.display = "block";
    } else if (slideIndex === 0) {
      displayNone();
      slideIndex = slides.length - 1;
      slides[slideIndex].style.display = "block";
    }
  });
  crossIcon.addEventListener("click", () => {
    slider.style.display = "none";
    displayNone();
    slideIndex = 0;
  });
  slides[slideIndex].style.display = "block";
}

</script>
