function Compare( {word, guess} ) {
  if (!word || !guess)
    return 0;

  const newWord = word.toUpperCase();
  const newGuess = guess.toUpperCase();

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

  const isMatch = newWord===newGuess;

  return {cnt, isMatch};
}

export default Compare;
