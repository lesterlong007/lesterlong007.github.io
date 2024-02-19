window.onload = function () {
  const cube = document.querySelector(".cube");
  let isMouseDown = false;
  let startX,
    startY,
    startRotateX = 0,
    startRotateY = 0;

  cube.addEventListener("mousedown", function (event) {
    isMouseDown = true;
    startX = event.clientX;
    startY = event.clientY;
    const rotateXRes = cube.style.transform.match(/rotateX\((-?\d+)deg\)/);
    startRotateX = rotateXRes ? parseInt(rotateXRes[1]) : 0;
    const rotateYRes = cube.style.transform.match(/rotateY\((-?\d+)deg\)/);
    startRotateY = rotateYRes ? parseInt(rotateYRes[1]) : 0;
  });

  cube.addEventListener("mousemove", function (event) {
    if (!isMouseDown) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    cube.style.transform = "rotateX(" + (startRotateX - deltaY) + "deg) rotateY(" + (startRotateY + deltaX) + "deg)";
  });

  cube.addEventListener("mouseup", function () {
    isMouseDown = false;
  });

  cube.addEventListener("mouseout", function () {
    isMouseDown = false;
  });
};
