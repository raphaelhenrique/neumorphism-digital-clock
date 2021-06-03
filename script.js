const numbers = {
  0: [1, 1, 1, 1, 1, 1, 0],
  1: [0, 1, 1, 0, 0, 0, 0],
  2: [1, 1, 0, 1, 1, 0, 1],
  3: [1, 1, 1, 1, 0, 0, 1],
  4: [0, 1, 1, 0, 0, 1, 1],
  5: [1, 0, 1, 1, 0, 1, 1],
  6: [1, 0, 1, 1, 1, 1, 1],
  7: [1, 1, 1, 0, 0, 0, 0],
  8: [1, 1, 1, 1, 1, 1, 1],
  9: [1, 1, 1, 1, 0, 1, 1],
};

document.addEventListener('DOMContentLoaded', function() {

  const clockNumbersDivs = document.querySelectorAll('div.number-container');
  let clockDigits = getClockDigits();
  processDigits(clockNumbersDivs, clockDigits);

  setInterval(() => {
    const clockDigitsTmp = getClockDigits();
    if (clockDigits.join() !== clockDigitsTmp.join()) {
      clearShining();
      clockDigits = clockDigitsTmp;
      processDigits(clockNumbersDivs, clockDigitsTmp);
    }
  }, 1000)
});

function processDigits (digitsDivs, clockDigits) {
  digitsDivs.forEach((numberDiv, index) => {
    const numberBars = numberDiv.querySelectorAll('div');

    for (let i = 0; i < numberBars.length; ++i) {
      const currentDigit = +clockDigits[index];
      const showBar = numbers[currentDigit][i];
      showBar && numberBars[i].classList.add('shine');
      // numberBars[i].style.display = showBar && 'block';
    }
  })
}

function clearShining () {
  const shining = document.querySelectorAll('.shine');
  for (let i = 0; i < shining.length; ++i) {
    if (shining[i].parentNode.classList.contains('pointers')) {
      continue;
    }
    shining[i].classList.remove('shine');
  }
}

function getClockDigits () {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, '0');
  const minutes = now.getUTCMinutes().toString().padStart(2, '0');
  // const seconds = now.getUTCSeconds().toString().padStart(2, '0');

  return [
    ...hour,
    ...minutes,
    // ...seconds
  ];
}
