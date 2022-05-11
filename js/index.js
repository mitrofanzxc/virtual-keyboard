const KEY_CODES_EN = [
  '`',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'Backspace',
  'Tab',
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  '[',
  ']',
  '\\',
  'Del',
  'CapsLock',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  ';',
  "'",
  'Enter',
  'Shift',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
  ',',
  '.',
  '/',
  '',
  'Shift',
  'Ctrl',
  'Win',
  'Alt',
  'Space',
  'Alt',
  '',
  '',
  '',
  'Ctrl',
];

const KEY_CODES_RU = [
  'ё',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0',
  '-',
  '=',
  'Backspace',
  'Tab',
  'й',
  'ц',
  'у',
  'к',
  'е',
  'н',
  'г',
  'ш',
  'щ',
  'з',
  'х',
  'ъ',
  '\\',
  'Del',
  'CapsLock',
  'ф',
  'ы',
  'в',
  'а',
  'п',
  'р',
  'о',
  'л',
  'д',
  'ж',
  'э',
  'Enter',
  'Shift',
  'я',
  'ч',
  'с',
  'м',
  'и',
  'т',
  'ь',
  'б',
  'ю',
  '.',
  '',
  'Shift',
  'Ctrl',
  'Win',
  'Alt',
  'Space',
  'Alt',
  '',
  '',
  '',
  'Ctrl',
];

const BODY = document.querySelector('body');

const createHtml = () => {
  // H1
  const H1 = document.createElement('h1');
  H1.classList.add('h1');
  H1.innerText = 'Virtual Keyboard';

  // TEXTAREA
  const TEXTAREA = document.createElement('textarea');
  TEXTAREA.classList.add('textarea');
  TEXTAREA.setAttribute('name', 'textarea');
  TEXTAREA.setAttribute('id', 'textarea');
  TEXTAREA.setAttribute('cols', '36');
  TEXTAREA.setAttribute('rows', '5');

  // KEYBOARD
  const KEYBOARD = document.createElement('div');
  KEYBOARD.classList.add('keyboard');
  for (let i = 0; i < KEY_CODES_EN.length; i++) {
    const BUTTON = document.createElement('div');
    BUTTON.classList.add('button');
    BUTTON.innerText = KEY_CODES_EN[i];
    KEYBOARD.appendChild(BUTTON);
  }

  const ELEMENTS = [H1, TEXTAREA, KEYBOARD];
  for (let i = 0; i < ELEMENTS.length; i++) {
    BODY.append(ELEMENTS[i]);
  }

  const ARROW_UP = document.querySelectorAll('.button')[53];
  ARROW_UP.classList.add('arrow__up');

  const ARROW_RIGHT = document.querySelectorAll('.button')[62];
  ARROW_RIGHT.classList.add('arrow__right');

  const ARROW_DOWN = document.querySelectorAll('.button')[61];
  ARROW_DOWN.classList.add('arrow__down');

  const ARROW_LEFT = document.querySelectorAll('.button')[60];
  ARROW_LEFT.classList.add('arrow__left');

  const SHIFT_RIGHT = document.querySelectorAll('.button')[54];
  SHIFT_RIGHT.classList.add('shift__right');

  const SPACE = document.querySelectorAll('.button')[58];
  SPACE.innerText = '';
  SPACE.classList.add('space');

  const CAPS_LOCK = document.querySelectorAll('.button')[29];
  CAPS_LOCK.classList.add('capslock');
};

createHtml();

const TEXTAREA = BODY.querySelector('textarea');
const BUTTONS = BODY.querySelectorAll('.button');
const CAPS_LOCK = BODY.querySelector('.capslock');
const SHIFT_RIGHT = BODY.querySelector('.shift__right');

let handlerCapsLock = false;
let handlerKeyboardLayoutEng = true;
let handlerKeyboardLowercase = true;

const toLowerCase = () => {
  BUTTONS.forEach((button) => {
    if (
      (button.textContent.length === 1 &&
        button.textContent.match(/[a-z]/gi)) ||
      button.textContent.match(/[а-яё]/gi)
    ) {
      button.innerText = button.innerText.toLowerCase();
    }
  });
};

const toUpperCase = () => {
  BUTTONS.forEach((button) => {
    if (
      (button.textContent.length === 1 &&
        button.textContent.match(/[a-z]/gi)) ||
      button.textContent.match(/[а-яё]/gi)
    ) {
      button.innerText = button.innerText.toUpperCase();
    }
  });
};

const handleKeyDown = (event) => {
  const KEY = event.key;
  const KEY_PRESS = KEY_CODES_EN.indexOf(KEY);
  console.log('KEY_PRESS ===', KEY_PRESS);

  if (KEY_PRESS !== 29) {
    BUTTONS[KEY_PRESS].classList.add('active');
  }

  if (
    KEY_PRESS !== 13 &&
    KEY_PRESS !== 14 &&
    KEY_PRESS !== 29 &&
    KEY_PRESS !== 41 &&
    KEY_PRESS !== 42 &&
    KEY_PRESS !== 57
  ) {
    TEXTAREA.value += KEY;
  }

  if (event.key === 'CapsLock' || event.target.textContent === 'CapsLock') {
    if (!handlerCapsLock) {
      handlerCapsLock = true;
      toUpperCase();
      CAPS_LOCK.classList.add('active');
    } else {
      handlerCapsLock = false;
      toLowerCase();
      CAPS_LOCK.classList.remove('active');
    }
  } else if (event.shiftKey) {
    toUpperCase();
  }
};

const handleKeyUp = (event) => {
  const KEY = event.key;
  const KEY_PRESS = KEY_CODES_EN.indexOf(KEY);

  if (KEY_PRESS !== 29) {
    BUTTONS[KEY_PRESS].classList.remove('active');
  }

  if (
    !event.shiftKey &&
    event.key !== 'CapsLock' &&
    event.target.textContent !== 'CapsLock'
  ) {
    toLowerCase();
    SHIFT_RIGHT.classList.remove('active');
  }
};

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
