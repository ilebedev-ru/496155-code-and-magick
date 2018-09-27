'use strict';

var setup = document.querySelector('.setup');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = setup.querySelector('.setup-close');
var setupSimilar = document.querySelector('.setup-similar');
var setupUserName = document.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var wizards = [WIZARD_NAMES, WIZARD_SURNAMES, coatColor, eyesColor];

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarListElement = document.querySelector('.setup-similar-list');

// функция для поиска случайного значения
function getRandom(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return rand;
}

// функция закрытия окна
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', closePopupEsc);
};

// проверяем наличие фокуса у поля имени
var onFocus = false;
setupUserName.addEventListener('focus', function () {
  onFocus = true;
});
setupUserName.addEventListener('blur', function () {
  onFocus = false;
});

// функция закрытия окна по ESC, не работает, если поле имени имеет фокус
var closePopupEsc = function () {
  if (event.keyCode === ESC_KEYCODE && !onFocus) {
    closePopup();
  }
};

// функция для открытия окна
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', closePopupEsc);
};

// открытие по ENTER
var openPopupEnter = function () {
  if (event.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
};

// закрытие по Enter
var closePopupEnter = function () {
  if (event.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

// навешиваем обработчики
setupOpenButton.addEventListener('click', openPopup);
setupOpenButton.addEventListener('keydown', openPopupEnter);
setupCloseButton.addEventListener('click', closePopup);
setupCloseButton.addEventListener('keydown', closePopupEnter);

// функция смены цвета мантии на случайный
var changeCoatColor = function () {
  wizardCoat.style.fill = coatColor[getRandom(coatColor)];
};
// функция смены цвета глаз на случайный
var changeEyesColor = function () {
  wizardEyes.style.fill = eyesColor[getRandom(eyesColor)];
};
// функция смены цвета фаербола на случайный
var changeFireballColor = function () {
  fireball.style.background = fireballColors[getRandom(fireballColors)];
};

// обработчики для смены цветов
wizardCoat.addEventListener('click', changeCoatColor);
wizardEyes.addEventListener('click', changeEyesColor);
fireball.addEventListener('click', changeFireballColor);


// функция генерации нового волшебника
var renderWizards = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard[0][getRandom(wizard[0])] + ' ' + wizard[1][getRandom(wizard[1])];
  wizardElement.querySelector('.wizard-coat').style.fill = wizard[2][getRandom(wizard[2])];
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard[3][getRandom(wizard[3])];

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < 4; i++) {
  fragment.appendChild(renderWizards(wizards));
}

similarListElement.appendChild(fragment);

setupSimilar.classList.remove('hidden');

