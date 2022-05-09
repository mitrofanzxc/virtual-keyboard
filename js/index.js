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
  'Up',
  'Shift',
  'Ctrl',
  'Win',
  'Alt',
  'Space',
  'Alt',
  'Left',
  'Down',
  'Right',
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
  'Up',
  'Shift',
  'Ctrl',
  'Win',
  'Alt',
  'Space',
  'Alt',
  'Left',
  'Down',
  'Right',
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
  TEXTAREA.setAttribute('cols', '30');
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
};

createHtml();

const TEXTAREA = BODY.querySelector('textarea');
const BUTTONS = BODY.querySelectorAll('.button');
let handler = false;

const handleCapsLock = () => {
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
  const KEY = event.key;
  console.log('KEY ===', KEY);
  if (KEY === 'CapsLock') {
    handleCapsLock();
  } else {
    TEXTAREA.textContent += KEY;
  }
};

const listenMouseDown = (event) => {
  const TARGET = event.target;
  if (TARGET.textContent === 'CapsLock') {
    handleCapsLock();
  } else {
    TEXTAREA.textContent += TARGET.textContent;
  }
};

document.addEventListener('keydown', listenKeyDown);

BUTTONS.forEach((button) => {
  button.addEventListener('mousedown', listenMouseDown);
});
