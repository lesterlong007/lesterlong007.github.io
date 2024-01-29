const charIcon = document.querySelector('.icon-rain');
charIcon.onclick = function () {
  console.log('icon clicked');
  window.location.assign('./code-rain/rain.html');
};

const menuList = document.querySelectorAll('.dock .dock-item');
const gapList = document.querySelectorAll('.dock .gap');

menuList.forEach(function (item) {
  item.style.setProperty('--ratio', 1);
});

const dock = document.querySelector('.dock');
const zoomCount = 4;
const maxScale = 2;
const step = 0.2;
const menuLength = menuList.length;
let curLabelEle = null;

function removeLabel() {
  if (curLabelEle) {
    const parent = curLabelEle.parentNode;
    if (parent) {
      parent.removeChild(curLabelEle);
    }
  }
}

function showMenuName(ele) {
  const menuName = ele.dataset.name;
  console.log(menuName);
  if (!menuName) {
    return removeLabel();
  };
  if (curLabelEle) {
    curLabelEle.textContent = menuName;
  } else {
    const label = document.createElement('span');
    label.textContent = menuName;
    label.style.fontSize = '16px';
    label.style.position = 'absolute';
    label.style.top = '-36px';
    label.style.left = '50%';
    label.style.whiteSpace = 'nowrap';
    label.style.transform = 'translateX(-50%)';
    curLabelEle = label;
  }
  if (!ele.contains(curLabelEle)) {
    removeLabel();
    ele.appendChild(curLabelEle);
  }
}

function setScale(index) {
  menuList.forEach(function (item, i) {
    const distance = Math.abs(index - i);
    if (distance === 0) {
      item.style.setProperty('--ratio', maxScale);
      showMenuName(item);
    } else if (distance === 1) {
      item.style.setProperty('--ratio', 1.8);
    } else if (distance === 2) {
      item.style.setProperty('--ratio', 1.5);
    } else if (distance === 3) {
      item.style.setProperty('--ratio', 1.1);
    } else {
      item.style.setProperty('--ratio', 1);
    }
  });
}

function resetScale() {
  menuList.forEach(function (item) {
    item.style.setProperty('--ratio', 1);
  });
}

dock.addEventListener('mouseover', function (e) {
  const isContainer = e.target.classList.contains('dock');
  const isGap = e.target.classList.contains('gap');
  if (isContainer) {
    resetScale();
  } else if (isGap) {
    const index = +e.target.dataset.index;
    const { width = 20, left } = e.target.getBoundingClientRect();
    if (e.clientX - left > width / 2) {
      setScale(index + 1);
    } else {
      setScale(index);
    }
  } else {
    if (Object.hasOwnProperty.call(e.target.dataset, 'index')) {
      const index = +e.target.dataset.index;
      setScale([index]);
    }
  }
});

dock.addEventListener('mouseleave', function () {
  resetScale();
  // removeLabel();
  // curLabelEle = null;
});
