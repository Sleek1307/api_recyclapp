const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const returnChar = (typeChar) => {

  let char = '';

  switch (typeChar) {
    case 'M':
      char = String.fromCharCode(generateRandomNumber(65, 90))
      break;
    case 'm':
      char = String.fromCharCode(generateRandomNumber(97, 122))
      break;
    case 'n':
      char = String.fromCharCode(generateRandomNumber(48, 57))
      break;
    case 'e':
      char = String.fromCharCode(generateRandomNumber(33, 47))
      break;
    default:
      break;
  }
  return char;
}

module.exports = {
  generateRandomPassword: () => {

    let password = '';
    const characters = ['M', 'm', 'n', 'e']
    let generatedChar = [];

    for (let i = 1; i <= 12; i++) {

      if (password === '') {
        let typeChar = characters[generateRandomNumber(0, (characters.length))];
        generatedChar.push = typeChar;

        password += returnChar(typeChar);
      } else {

        if (i % 3 === 0) {
          let flag = false;
          let typeChar = '';
          let count = 0;

          while (!flag) {
            count++
            typeChar = characters[generateRandomNumber(0, (characters.length))];

            if (generatedChar.indexOf(typeChar) !== -1 || count >= 4) {
              flag = true
            }
          }

          generatedChar.push = typeChar;
          password += returnChar(typeChar)
        } else {
          let typeChar = characters[generateRandomNumber(0, (characters.length))];
          generatedChar.push = typeChar;

          password += returnChar(typeChar);
        }
      }
    }

    return password;
  },
}
