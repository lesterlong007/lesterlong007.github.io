const menuList = [
  {
    id: 'rain',
    name: '代码雨',
    link: './code-rain/rain.html'
  },
  {
    id: 'sun',
    name: '太阳系',
    link: './sun/sun.html'
  },
  {
    id: 'cube',
    name: '魔方',
    link: './cube/cube.html'
  },
  {
    id: 'note',
    name: '笔记本'
  },
  {
    id: 'membership',
    name: '会员'
  },
  {
    id: 'education',
    name: '教育'
  },
  {
    id: 'meeting',
    name: '会议'
  },
  {
    id: 'achievement',
    name: '成就'
  },
  {
    id: 'identity',
    name: '身份'
  },
  {
    id: 'question',
    name: '疑问'
  },
  {
    id: 'delicacy',
    name: '美食'
  },
  {
    id: 'coupon',
    name: '优惠券'
  },
  {
    id: 'more',
    name: '更多'
  }
];

const Toast = {
  info(text, duration = 2, parentElement) {
    const target = parentElement || document.body;
    const toast = document.createElement('div');
    toast.innerText = text;
    toast.style.position = parentElement ? 'absolute' : 'fixed';
    toast.style.left = '50%';
    toast.style.top = '50%';
    toast.style.maxWidth = '150px';
    toast.style.lineHeight = '20px';
    toast.style.transform = 'translate(-50%, -50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    toast.style.padding = '8px 15px';
    toast.style.borderRadius = '5px';
    toast.style.fontSize = '16px';
    toast.style.color = '#ffffff';
    toast.style.zIndex = '99999';
    target.appendChild(toast);
    setTimeout(() => {
      target.removeChild(toast);
    }, duration * 1000);
  },
  success(text, duration = 2) {
    this.info(text, duration);
  },
  fail(text, duration = 2) {
    this.info(text, duration);
  }
};

window.onload = function () {
  function renderMenuList() {
    let htmlStr = '';
    menuList.forEach(function (item, index) {
      const { name = '', id } = item;
      const curStr = `<div class="dock-item" data-name="${name}">\n<svg class="icon icon-${id}" aria-hidden="true">\n<use xlink:href="#icon-${id}" data-index="${index}" />\n</svg>\n</div>`;
      htmlStr += curStr;
      if (index < menuList.length - 1) {
        htmlStr += `<span class="gap" data-index="${index}"></span>`;
      }
    });
    document.querySelector('.dock').innerHTML = htmlStr;
  }

  renderMenuList();

  const menuEleList = document.querySelectorAll('.dock .dock-item');
  const gapList = document.querySelectorAll('.dock .gap');

  menuEleList.forEach(function (item) {
    item.style.setProperty('--ratio', 1);
  });

  const dock = document.querySelector('.dock');
  const zoomCount = 4;
  const maxScale = 2;
  const step = 0.2;
  const menuLength = menuEleList.length;
  let curLabelEle = null;

  function removeLabel() {
    if (curLabelEle) {
      const parent = curLabelEle.parentNode;
      if (parent) {
        parent.removeChild(curLabelEle);
      }
    }
  }

  function showMenuName(ele, index) {
    const menuName = menuList[index].name;
    if (!menuName) {
      return removeLabel();
    }
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
    menuEleList.forEach(function (item, i) {
      const distance = Math.abs(index - i);
      if (distance === 0) {
        item.style.setProperty('--ratio', maxScale);
        showMenuName(item, i);
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
    menuEleList.forEach(function (item) {
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
    removeLabel();
    curLabelEle = null;
  });

  dock.addEventListener('click', function (e) {
    if (Object.hasOwnProperty.call(e.target.dataset, 'index')) {
      const index = +e.target.dataset.index;
      const link = menuList[index].link;
      if (link) {
        window.location.assign(link);
      } else {
        Toast.info('暂未开发！');
      }
    }
  });
};
