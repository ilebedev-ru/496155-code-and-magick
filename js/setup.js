'use strict';

var setup = document.querySelector('.setup');
var setupOpenButton = document.querySelector('.setup-open');
var setupCloseButton = setup.querySelector('.setup-close');
var setupSimilar = document.querySelector('.setup-similar');
var setupUserName = document.querySelector('.setup-user-name');

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

var wizards = [WIZARD_NAMES, WIZARD_SURNAMES, coatColor, eyesColor];

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarListElement = document.querySelector('.setup-similar-list');


//функция закрытия окна
var closePopup = function() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', closePopupEsc);
}

//проверяем наличие фокуса у поля имени
var onFocus = false;
setupUserName.addEventListener('focus', function() {
  onFocus = true;
});
setupUserName.addEventListener('blur', function() {
  onFocus = false;
});

//функция закрытия окна по ESC, не работает, если поле имени имеет фокус
var closePopupEsc = function () {
  if (event.keyCode === ESC_KEYCODE && !onFocus) {
      closePopup();
    }
}

//функция для открытия окна
var openPopup = function() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', closePopupEsc);
}

//открытие по ENTER
var openPopupEnter = function() {
  if (event.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
}

//закрытие по Enter
var closePopupEnter = function() {
  if (event.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
}

//навешиваем обработчики
setupOpenButton.addEventListener('click', openPopup);
setupOpenButton.addEventListener('keydown', openPopupEnter);
setupCloseButton.addEventListener('click', closePopup);
setupCloseButton.addEventListener('keydown', closePopupEnter);

// функция для поиска случайного значения
function getRandom(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return rand;
}

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


// Добавить обработчики для альтернативного ввода с клавиатуры keydown для кнопок
// открытия/закрытия диалога настройки персонажа:
// 3. Когда иконка пользователя в фокусе .setup-open-icon, то окно настройки персонажа должно
// открываться по нажатию кнопки ENTER
// Не забудьте добавить tabindex="0" для иконки пользователя, чтобы она фокусировалась
// 4. Когда окно настройки персонажа открыто, нажатие на клавишу ESC должно закрывать диалог
// Если фокус находится на форме ввода имени, то окно закрываться не должно
// 5. Если окно открыто и фокус находится на кнопке закрытия окна, то нажатие клавиши ENTER должно
// приводить к закрытию диалога 6. Если диалог открыт, нажатие на кнопку «Сохранить» приводит
// к отправке формы 7. Если диалог открыт и фокус находится на кнопке «Сохранить», нажатие на ENTER
// приводит к отправке формы
