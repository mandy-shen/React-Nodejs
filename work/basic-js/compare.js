"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY
  if (!word || !guess)
    return 0;

  const newWord = word.toLowerCase();
  const newGuess = guess.toLowerCase();

  const arr = new Array(256);
  arr.fill(0);

  for (const i in newWord) {
    const code = newWord.charCodeAt(i);
    arr[code]++;
  }

  let cnt = 0;
  for (const i in newGuess) {
    const code = newGuess.charCodeAt(i);
    if (arr[code] > 0) {
      cnt++;
      arr[code]--;
    }
  }

  return cnt; // this line is wrong
}
