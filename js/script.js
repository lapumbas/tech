let miniMap = document.querySelector(".contacts img");
let modalMap = document.querySelector('.modal_map');
let overlay = document.querySelector('.modal_overlay');
let closeModalMap = modalMap.querySelector('.close_modal');

let feedback = document.querySelector('.feedback a');
let writeUs = document.querySelector('.contacts_button');
let modalWriteUs = document.querySelector('.modal_write_us');
let closeWriteUs = modalWriteUs.querySelector('.close_modal');

let letterName = modalWriteUs.querySelector('[name=name]');
let letterEmail = modalWriteUs.querySelector('[name=email]');
let letterText = modalWriteUs.querySelector('[name=letter-text]');
let letterForm = modalWriteUs.querySelector('form');

let srvButtons = {
  srvDelivery: {},
  srvGuarantee: {},
  srvCredit: {}
};

srvButtons.srvDelivery.btn = document.querySelector('.services_menu li:nth-child(1)>button');
srvButtons.srvGuarantee.btn = document.querySelector('.services_menu li:nth-child(2)>button');
srvButtons.srvCredit.btn = document.querySelector('.services_menu li:nth-child(3)>button');
srvButtons.srvDelivery.slide = document.querySelector('.services_slide_1');
srvButtons.srvGuarantee.slide = document.querySelector('.services_slide_2');
srvButtons.srvCredit.slide = document.querySelector('.services_slide_3');




for (const key in srvButtons) {
  srvButtons[key].btn.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (!srvButtons[key].btn.classList.contains('active')) {
      for (const i in srvButtons) {
        srvButtons[i].btn.classList.remove('active');
        srvButtons[i].slide.classList.remove('slide_show');
      };
      srvButtons[key].btn.classList.add('active');
      srvButtons[key].slide.classList.add('slide_show');
    }
  })
}

let slider = document.querySelector('.slider');
let sliderObject = {
  arrows: {},
  slides: []
}

sliderObject.arrows.prev_arrow = slider.querySelector('.prev_arrow');
sliderObject.arrows.next_arrow = slider.querySelector('.next_arrow');
sliderObject.slides[0] = slider.querySelector('.slide_1');
sliderObject.slides[1] = slider.querySelector('.slide_2');

sliderObject.arrows.prev_arrow.addEventListener('click', (evt) => {
      evt.preventDefault();
      for (let i = sliderObject.slides.length-1; i >= 0 ; i--) {
        if (i != 0 && !sliderObject.slides[i - 1].classList.contains('main_slide_show'))  {
              for (let k = 0; k < sliderObject.slides.length; k++) {
                sliderObject.slides[k].classList.remove('main_slide_show');
                sliderObject.arrows.next_arrow.classList.remove('arrow_disabled');
                sliderObject.arrows.prev_arrow.classList.remove('arrow_disabled');
              }
              sliderObject.slides[i - 1].classList.add('main_slide_show');
            } else if (i == 0) {
              sliderObject.arrows.prev_arrow.classList.add('arrow_disabled');
            }
          }
        })

      sliderObject.arrows.next_arrow.addEventListener('click', (evt) => {
        evt.preventDefault();
        for (let i = 0; i < sliderObject.slides.length; i++) {
          if (i != sliderObject.slides.length - 1 && !sliderObject.slides[i + 1].classList.contains('main_slide_show')) {
            for (let k = 0; k < sliderObject.slides.length; k++) {
              sliderObject.slides[k].classList.remove('main_slide_show');
              sliderObject.arrows.next_arrow.classList.remove('arrow_disabled');
              sliderObject.arrows.prev_arrow.classList.remove('arrow_disabled');
            }
            sliderObject.slides[i + 1].classList.add('main_slide_show');
          } else if (i == sliderObject.slides.length - 1) {
            sliderObject.arrows.next_arrow.classList.add('arrow_disabled');
          }
        }
      })


      let storage = '';
      let isLocalStorageSupport = true;

      try {
        storage = localStorage.getItem('letterName')
      } catch (error) {
        isLocalStorageSupport = false;
        console.log('isLocalStorageSupport = false')
      }

      letterForm.addEventListener('submit', (evt) => {
        if (!letterName.value || !letterEmail.value || !letterText.value) {
          evt.preventDefault();
          modalWriteUs.classList.add('modal_error');

          console.log('Напишите что-нибудь');
        } else {
          if (isLocalStorageSupport) {
            localStorage.setItem('letterName', letterName.value);
            localStorage.setItem('letterEmail', letterEmail.value);
          }
        }
      });

      writeUsOnClick = (evt) => {
        evt.preventDefault();
        modalWriteUs.classList.remove('visually-hidden');
        overlay.classList.remove('visually-hidden');

        if (isLocalStorageSupport) {

          if (localStorage.getItem('letterName')) {
            letterName.value = localStorage.getItem('letterName');
          }

          if (localStorage.getItem('letterEmail')) {
            letterEmail.value = localStorage.getItem('letterEmail');
          }

          if (!localStorage.getItem('letterName')) {
            letterName.focus();
          } else if (!localStorage.getItem('letterEmail')) {
            letterEmail.focus();
          } else {
            letterText.focus();
          }
        }
      }

      feedback.addEventListener('click', writeUsOnClick);
      writeUs.addEventListener('click', writeUsOnClick);


      closeWriteUs.addEventListener('click', (evt) => {
        evt.preventDefault();
        modalWriteUs.classList.add('visually-hidden');
        modalWriteUs.classList.remove('modal_error');
        overlay.classList.add('visually-hidden');

      });

      window.addEventListener('keydown', (evt) => {
        if (evt.keyCode === 27) {
          evt.preventDefault();
          if (!modalWriteUs.classList.contains('visually-hidden')) {
            modalWriteUs.classList.add('visually-hidden');
            overlay.classList.add('visually-hidden');
          };
          if (!modalMap.classList.contains('visually-hidden')) {
            modalMap.classList.add('visually-hidden');
            overlay.classList.add('visually-hidden');
          };

        }
      });



      miniMap.addEventListener('click', function (evt) {
        evt.preventDefault();
        modalMap.classList.remove('visually-hidden');
        overlay.classList.remove('visually-hidden');
      });

      closeModalMap.addEventListener('click', (evt) => {
        evt.preventDefault();
        modalMap.classList.add('visually-hidden');
        overlay.classList.add('visually-hidden');
      });

      overlay.addEventListener('click', (event) => {
        event.preventDefault();
        modalMap.classList.add('visually-hidden');
        modalWriteUs.classList.add('visually-hidden');
        overlay.classList.add('visually-hidden');
      });