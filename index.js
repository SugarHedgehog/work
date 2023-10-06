var fs = require('fs');
var rl = require('readline-sync');

let letterRU = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Э", "Ю", "Я"];
let letterRUShuffle = shuffle(letterRU.slice());

function randomKeY() {
    console.log("Ключ:")
    for (let i = 0; i < 4; i++) {
        console.log([letterRU.slice().slice(7 * i, 7 * (i + 1)).join(' '), letterRUShuffle.slice().slice(7 * i, 7 * (i + 1)).join(' ')].join('   '));
    }
}

function formatText(text) {
    text = text.toUpperCase();
    text = text.replaceAll(' ', '').replaceAll('Ё', 'Е').replaceAll('Й', 'И').replaceAll('Ь', '').replaceAll('Ъ', '').replaceAll('Ы', 'И').replaceAll('-', '').replaceAll('—', '').replaceAll('.', '').replaceAll(',', '').replaceAll(')', '').replaceAll('(', '').replaceAll('\n', '').replaceAll(';', '');
    return text;
}

function statistics(text, filename) {
    fs.appendFileSync(filename, "Всего символов: " + text.length + "\n");
    let letters = [];
    letterRU.forEach((elem) => {
        var count = text.split(elem).length - 1;
        elem = elem + " = " + count;
        letters.push(count);
        fs.appendFileSync(filename, elem + '\n');
    })
    fs.appendFileSync("report.txt", "\nИндекс совпадений: " + indexOfMatches(letters, text.length) + "\n");

}

function encryption(text) {
    let encryption = '';

    for (let i = 0; i < text.length; i++) {
        if (letterRUShuffle[letterRU.indexOf(text[i])] != undefined)
            encryption += letterRUShuffle[letterRU.indexOf(text[i])]
    }
    return encryption;
}

function indexOfMatches(letters, numberOfCharacters) {
    let index = 0;
    letters.forEach((elem) => {
        index += Math.pow(elem / numberOfCharacters, 2);
    });
    return index;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function keForVigenereCipher() {
    let key = rl.question('Введите ключ: ')
    key = removeDuplicate(key);
    console.log("Ключ: " + key)
    return key;
}

function removeDuplicate(string) {
    return formatText(string.split('').filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        }
        ).join(''));
}

function VigenereCipher(text, key) {
    let encryption = '';
    let count = 0;

    for (let i = 0; i < text.length; i++) {
        if (letterRU.includes(text[i])) {
            //console.log([text[i], letterRU.indexOf(text[i]), key[count],letterRU.indexOf(key[count])])
            encryption += letterRU[(letterRU.indexOf(text[i]) + letterRU.indexOf(key[count])) % letterRU.length];
            count++;
            if (key.length == count) {
                count = 0;
            }
        }
    }
    return encryption
}

module.exports = { shuffle, encryption, statistics, formatText, randomKeY, keForVigenereCipher, VigenereCipher };