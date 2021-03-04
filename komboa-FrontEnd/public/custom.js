console.log("loaded");

document.querySelector("#options").addEventListener("click", (e) => {
  e.target.classList.toggle("active");
  const hide = document.querySelectorAll(".option-hide");
  hide.forEach((node) => {
    if (node.style.display === "block") {
      node.style.display = "none";
    } else {
      node.style.display = "block";
    }
  });
});

const slider = document.querySelector("#range1");
const div = document.querySelector("#range");

slider.addEventListener("input", (e) => {
  div.style.width = e.target.value + "px";
});
