const textWrapper = document.querySelector('.firsText-js');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.firstText .letter',
    // translateX: [40,0],
    translateZ: 0,
    opacity: [0.2,1],
    easing: "easeOutExpo",
    duration: 2500,
    delay: (el, i) => 500 + 30 * i
  })