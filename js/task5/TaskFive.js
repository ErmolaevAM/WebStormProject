String.prototype.contains = function (value) {
    return this.indexOf(value) != -1;
};

String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

Number.prototype.isNan = function () {
    return this !== this;
};

function count() {
    var mathInput = document.getElementById('math-input').value;
    var inputValues = getValuesFromInput(mathInput);
    var result = countLine(inputValues);

    if (mathInput.length != 0 && !result.isNan() && mathInput.contains("=")) {
        document.getElementById('math-input').value = result.toFixed(2); //toFixed - округление до сотых
    }

    function getValuesFromInput(input) {
        var numberPattern = /(\d+(\.\d+)?|\+|\-|\*|\/|=)/g; //регулярное выражение для поиска всех чисел и знаков +,-,*,/
        return input.match(numberPattern) || [];
    }

    function countLine(values) {
        var tmp = parseFloat(values[0]);
        for (var i = 1; i < values.indexOf('='); i += 2) {
            var char = values[i];
            var value = parseFloat(values[i + 1]);
            switch (char) {
                case '+':
                    tmp += value;
                    break;
                case '-':
                    tmp -= value;
                    break;
                case '*':
                    tmp *= value;
                    break;
                case '/':
                    tmp /= value;
                    break;
            }
        }

        return tmp;
    }

}

function deleteRepeatedChars() {
    var inputValues = document.getElementById('text-input-place').value;
    var words = inputValues.split(/[\s.?,:;!]/).filter(filterEmptyWord);

    if (words.length > 1) {
        var tmp = words[0];

        for (var i = 0; i < tmp.length; i++) {
            var letter = tmp[i];

            if (isContainsInAllWords(letter)) {
                inputValues = inputValues.replaceAll(letter, '');
            }
        }
    }

    if (inputValues.length != 0) {
        document.getElementById('text-input-place').value = inputValues;
    }

    function filterEmptyWord(value) {
        return value.length != 0;
    }

    function isContainsInAllWords(letter) {
        var flag = true;

        for (var i = 0; i < words.length; i++) {
            var object = words[i];

            for (var j = 0; j < object.length; j++) {
                flag = flag && object.contains(letter);
            }
        }
        return flag;
    }
}

function format() {
    var mask = document.getElementById('mask').value;

    var year = document.getElementById('year').value;
    var optionElement = document.getElementById('month');
    var month = optionElement.options[optionElement.selectedIndex].text;
    var monthNumber = optionElement.options[optionElement.selectedIndex].value;
    var day = document.getElementById('day').value;
    var hour = document.getElementById('hour').value;
    var minute = document.getElementById('minute').value;
    var second = document.getElementById('second').value;

    var date = {
        yyyy: parseInt(year),
        yy: pad(parseInt(year) % 100),

        MMMM: month,
        MMM: month.substring(0, 3),
        MM: pad(monthNumber),
        M: monthNumber,

        dd: pad(day),
        d: parseInt(day),

        HH: pad(hour),
        H: parseInt(hour),
        hh: pad(transformHour(hour)),
        h: transformHour(hour),

        mm: pad(minute),
        m: parseInt(minute),

        ss: pad(second),
        s: parseInt(second)
    };

    for (var field in date) {
        mask = mask.replaceAll(field, date[field]);
    }

    if (mask.length != 0 && isNumber(year) && isNumber(day) && isNumber(hour) && isNumber(minute) && isNumber(second)) {
        document.getElementById('mask').value = mask;
    }

    function parseInt(value) {
        return value - 0;
    }

    function transformHour(hour) {
        return parseInt(hour) % 12;
    }

    function pad(value) {
        value = parseInt(value);
        return (value < 10) ? ("0" + value) : value;
    }

    function isNumber(value) {
        return /^\d+$/g.test(value);
    }
}
