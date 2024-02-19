window.onload = function () {
  const cube = document.querySelector('.cube');
  const container = document.querySelector('.cube-container');
  let isMouseDown = false;
  let startX,
    startY,
    startRotateX = 0,
    startRotateY = 0;

  container.addEventListener('mousedown', function (event) {
    isMouseDown = true;
    startX = event.clientX;
    startY = event.clientY;
    const rotateXRes = cube.style.transform.match(/rotateX\((-?\d+)deg\)/);
    startRotateX = rotateXRes ? parseInt(rotateXRes[1]) : 0;
    const rotateYRes = cube.style.transform.match(/rotateY\((-?\d+)deg\)/);
    startRotateY = rotateYRes ? parseInt(rotateYRes[1]) : 0;
  });

  container.addEventListener('mousemove', function (event) {
    if (!isMouseDown) return;
    const deltaX = event.clientX - startX ;
    const deltaY = event.clientY - startY;
    cube.style.transform = 'rotateX(' + (startRotateX - deltaY) + 'deg) rotateY(' + (startRotateY + deltaX) + 'deg)';
  });

  container.addEventListener('mouseup', function () {
    isMouseDown = false;
  });

  container.addEventListener('mouseout', function () {
    isMouseDown = false;
  });

  const openBtn = document.querySelector('.footer .btn.open');
  const rotateBtn = document.querySelector('.footer .btn.rotate');

  let isOpen = false;
  let originalTransformMap = new Map();
  openBtn.addEventListener('click', function() {
    const frontFace = document.querySelector('.cube .face.front');
    const backFace = document.querySelector('.cube .face.back');
    const leftFace = document.querySelector('.cube .face.left');
    const rightFace = document.querySelector('.cube .face.right');
    const topFace = document.querySelector('.cube .face.top');
    if (isOpen) {
      frontFace.style.transform = originalTransformMap.get('front');
      backFace.style.transform = originalTransformMap.get('back');
      leftFace.style.transform = originalTransformMap.get('left');
      rightFace.style.transform = originalTransformMap.get('right');
      topFace.style.transform = originalTransformMap.get('top');
      openBtn.textContent = '打开外盒';
    } else  {
      if (originalTransformMap.size === 0) {
        originalTransformMap.set('front', frontFace.style.transform);
        originalTransformMap.set('back', backFace.style.transform);
        originalTransformMap.set('left', leftFace.style.transform);
        originalTransformMap.set('right', rightFace.style.transform);
        originalTransformMap.set('top', topFace.style.transform); 
      }

      frontFace.style.transform = 'rotateX(-90deg) rotateY(0deg) translateZ(150px) translateY(-290px)';
      backFace.style.transform = 'rotateX(90deg) rotateY(180deg) translateZ(150px) translateY(-290px)';
      leftFace.style.transform = 'rotateX(-90deg) rotateY(0deg) translateZ(150px) translateX(-290px)';
      rightFace.style.transform = 'rotateZ(90deg) rotateY(90deg) translateZ(150px) translateY(-290px)';
      topFace.style.transform = 'rotateX(90deg) translateZ(250px)';
      openBtn.textContent = '关闭外盒';
    }
    
    isOpen = !isOpen;
  });

  let isRotated = false;
  rotateBtn.addEventListener('click', function () {
    if (isRotated) {
      cube.classList.remove('animation');
      rotateBtn.textContent = '自动旋转';
    } else {
      cube.classList.add('animation');
      rotateBtn.textContent = '停止旋转';
    }

    isRotated = !isRotated;
  });
};
