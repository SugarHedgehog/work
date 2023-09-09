var fs = require('fs');

let letterRU = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ы", "Э", "Ю", "Я"];
let letterRUReverse = letterRU.slice().reverse();

let fileContent = fs.readFileSync("file.txt", "utf8");

fs.writeFileSync("report.txt", "Исходный текст\n\n" + fileContent + "\n\n");

let formattingText = formatText(fileContent);
fs.appendFileSync("report.txt", "Форматированный текст\n\n" + formattingText + "\n\n");
fs.appendFileSync("report.txt", "Статистика для форматированного текста\n\n")
statistics(formattingText, "report.txt");

let encryptionText = encryption(formattingText);
fs.appendFileSync("report.txt", "\nЗашифрованный текст\n\n" + encryptionText + "\n\n");
fs.appendFileSync("report.txt", "Статистика для зашифрованного текста\n\n")
statistics(encryptionText, "report.txt");

fs.appendFileSync("report.txt", "\n\nВывод: эта лабораторная работа ничему меня не научила, я не узнала ничего нового и не овладела никакими новыми навыками.")


function formatText(text) {
    text = text.toUpperCase();
    text = text.replaceAll(' ', '').replaceAll('Ё', '').replaceAll('Ё', '').replaceAll('Ь', '').replaceAll('Ъ', '').replaceAll('-', '').replaceAll('—', '').replaceAll('.', '').replaceAll(',', '').replaceAll(')', '').replaceAll('(', '').replaceAll('\n', '').replaceAll(';', '');
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
        if (letterRUReverse[letterRU.indexOf(text[i])] != undefined)
            encryption += letterRUReverse[letterRU.indexOf(text[i])]
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





