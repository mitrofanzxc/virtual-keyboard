const KEY_CODES_LOWERCASE = [
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

const KEY_CODES_UPPERCASE = [
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
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
  '[',
  ']',
  '\\',
  'Del',
  'CapsLock',
  'A',
  'S',
  'D',
  'F',
  'G',
  'H',
  'J',
  'K',
  'L',
  ';',
  "'",
  'Enter',
  'Shift',
  'Z',
  'X',
  'C',
  'V',
  'B',
  'N',
  'M',
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
  for (let i = 0; i < KEY_CODES_LOWERCASE.length; i++) {
    const BUTTON = document.createElement('div');
    BUTTON.classList.add('button');
    BUTTON.innerText = KEY_CODES_LOWERCASE[i];
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
  SHIFT_RIGHT.classList.add('button__shift__right');

  const SPACE = document.querySelectorAll('.button')[58];
  SPACE.classList.add('button__space');

  KEYBOARD.focus();
};

createHtml();

const TEXTAREA = BODY.querySelector('textarea');
const BUTTONS = BODY.querySelectorAll('.button');
let handler = false;

const handleCapsLock = (KEY) => {
  const KEY_PRESS = KEY_CODES_LOWERCASE.indexOf(KEY);
  BUTTONS[KEY_PRESS].classList.toggle('button__active');
  if (handler === false) {
    handler = true;
    BUTTONS.forEach(
      (button, index) => (button.innerText = KEY_CODES_UPPERCASE[index])
    );
  } else {
    handler = false;
    BUTTONS.forEach(
      (button, index) => (button.innerText = KEY_CODES_LOWERCASE[index])
    );
  }
};

const listenKeyDown = (event) => {
  if (event.key) {
    const KEY = event.key;
    if (KEY === 'CapsLock') {
      handleCapsLock(KEY);
    } else {
      TEXTAREA.textContent += KEY;
    }
  } else {
    const TARGET = event.target;
    if (TARGET.textContent === 'CapsLock') {
      handleCapsLock(TARGET.textContent);
    } else {
      TEXTAREA.textContent += TARGET.textContent;
    }
  }
};

document.addEventListener('keydown', listenKeyDown);

BUTTONS.forEach((button) => {
  button.addEventListener('mousedown', listenKeyDown);
});
