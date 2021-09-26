"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY
  if (!word || !guess)
    return 0;

  let newWord = word.toLowerCase();
  let newGuess = guess.toLowerCase();

  let arr = new Array(256);
  arr.fill(0);

  for (let i in newWord) {
    let code = newWord.charCodeAt(i);
    arr[code]++;
  }

  let cnt = 0;
  for (let i in newGuess) {
    let code = newGuess.charCodeAt(i);
    if (arr[code] > 0) {
      cnt++;
      arr[code]--;
    }
  }

  return cnt; // this line is wrong
}
