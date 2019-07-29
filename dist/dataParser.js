const fs = require("fs");

let str = "let data = [";

// асинхронное чтение
fs.readFile("dist/data.txt", "utf8",
    function (error, data) {
        if (error) throw error; // если возникла ошибка
        let arr = data.split("\r\n");
        for (let i = 0; i < arr.length; i++) {
            let a = i % 3;
            switch (a) {
                case 0:
                    str += "{";
                    str += "en:"
                    str += `"${arr[i]}"`;
                    str += ",";
                    break;
                case 1:
                    str += "tr:";
                    str += `"${arr[i]}"`;
                    str += ",";
                    break;
                case 2:
                    str += "ru:"
                    str += `"${arr[i]}"`;
                    str += "}";
                    str += ",";
            }
        }
        str += "];"
        fs.writeFileSync("hello.txt", str);
    });

