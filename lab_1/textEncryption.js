var fs = require('fs');
let ec = require('../index')

let fileContent = fs.readFileSync("file.txt", "utf8");

fs.writeFileSync("report.txt", "Исходный текст\n\n" + fileContent + "\n\n");

let formattingText = ec.formatText(fileContent);

fs.appendFileSync("report.txt", "Форматированный текст\n\n" + formattingText + "\n\n");
fs.appendFileSync("report.txt", "Статистика для форматированного текста\n\n")
ec.statistics(formattingText, "report.txt");

let encryptionText = ec.encryption(formattingText);

fs.appendFileSync("report.txt", "\nЗашифрованный текст\n\n" + encryptionText + "\n\n");
fs.appendFileSync("report.txt", "Статистика для зашифрованного текста\n\n")
ec.statistics(encryptionText, "report.txt");

fs.appendFileSync("report.txt", "\n\nВывод:  успешно проведена программная реализация шифрования методом простой перестановки.")





