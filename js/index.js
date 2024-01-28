const charIcon = document.querySelector(".icon-rain");
charIcon.onclick = function () {
  console.log("icon clicked");
  window.location.assign("./code-rain/rain.html");
};

const menuList = document.querySelectorAll(".dock .dock-item");
const gapList = document.querySelectorAll(".dock .gap");

menuList.forEach(function (item) {
  item.style.setProperty("--ratio", 1);
});

const dock = document.querySelector(".dock");
const zoomCount = 4;
const maxScale = 1.8;
const step = (maxScale - 1) / zoomCount;
const menuLength = menuList.length;

function setScale(indexes) {
  if (indexes.length > 1) {
    //
  } else {
    const index = indexes[0];
    let scale = maxScale;
    for (let i = 0; i <= 3; i++) {
      const tIndex = index + i;
      if (tIndex < menuLength) {
        menuList[tIndex] = scale;
        scale -= step;
      } else {
        break;
      }
    }
    scale = maxScale;
    for (let i = 0; i <= 3; i++) {
      const tIndex = index - i;
      menuList[index + i] = scale;
      if (tIndex >= 0) {
        menuList[tIndex].style.setProperty("--ratio", scale);
        scale -= step;
      } else {
        break;
      }
    }
    menuList.forEach(function (item, i) {
      const distance = Math.abs(index - i);
      if (distance === 0) {
        item.style.setProperty("--ratio", maxScale);
      } else if (distance === 1) {
        item.style.setProperty("--ratio", maxScale - step);
      } else if (distance === 2) {
        item.style.setProperty("--ratio", maxScale - 2 * step);
      } else if (distance === 3) {
        item.style.setProperty("--ratio", maxScale - 3 * step);
      } else {
        item.style.setProperty("--ratio", 1);
      }
    });
  }
}

dock.addEventListener("mouseover", function (e) {
  console.log(e.target);
  // console.log(e.target.classList.contains('gap'));
  // console.log(e.target.dataset, Object.hasOwnProperty.call(e.target.dataset, 'index'));
  const isContainer = e.target.classList.contains("dock");
  const isGap = e.target.classList.contains("gap");
  if (isContainer) {
    //
  } else if (isGap) {
    //
    const index = +e.target.dataset.index;
    setScale([index, index + 1]);
  } else {
    if (Object.hasOwnProperty.call(e.target.dataset, "index")) {
      const index = +e.target.dataset.index;
      setScale([index]);
    }
  }
});

dock.addEventListener("mouseleave", function () {
  console.log("mouseleave");
  // reset
});
