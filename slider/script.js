const { Swiper, Navigation } = require("swiper");

window.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper('.swiper', {
    modules: [Navigation],
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })
})