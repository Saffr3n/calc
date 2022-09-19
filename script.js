const buttons = document.querySelectorAll('button');
const display = document.querySelector('#disp');

let input = ['0'];

buttons.forEach(btn =>{ // TODO: 1. handle Infinity result; 2. memory button behaviour
    btn.addEventListener('click', e => {
        if (e.target.value === 'C')
            input = ['0'];

        if (e.target.value === 'B') {
            input.pop();
            if (input.length === 0) input = ['0'];
        }

        if (e.target.className.includes('num') || e.target.className.includes('op')) {
            if (e.target.className.includes('num') && input.length === 1 && input[0].includes('0'))
                input[0] = input[0].replace('0', e.target.value);
            else if (e.target.className.includes('op') && /[\+\-\*\/]$/.test(input[input.length - 1])) {
                input.pop();
                input.push(e.target.value);
            }
            else input.push(e.target.value);
        }

        let operatorIndex = input.findIndex(char => /[\+\-\*\/]$/.test(char));
        let operatorsAmount = input.reduce((n, char) => {
            if (/[\+\-\*\/]$/.test(char)) n++;
            return n;
        }, 0);

        if (e.target.value === 'S' && input[operatorIndex + 1]) {
            if (input[operatorIndex + 1].length === 1)
                input[operatorIndex + 1] = '-' + input[operatorIndex + 1];
            else input[operatorIndex + 1] = input[operatorIndex + 1].replace('-', '');
        }

        if (e.target.value === '.' && !input.slice(operatorIndex + 1).includes('.')) {
            if (operatorIndex === input.length - 1) input.push('0');
            input.push(e.target.value);
        }

        if (e.target.value === '=') { // TODO: make behaviour for when = pressed without second operand
            input = [...operate(operatorIndex)];
            operatorIndex = -1;
            operatorsAmount = 0;
        }

        if (operatorsAmount > 1) {
            const operator = input[input.length - 1];
            input.pop();
            input = [...operate(operatorIndex), operator];
            operatorIndex = input.findIndex(char => /[\+\-\*\/]$/.test(char));
            operatorsAmount = 1;
        }

        if (operatorIndex !== input.length - 1)
            display.textContent = input.slice(operatorIndex + 1).join('');
        else display.textContent = input.join('');
    });
});

function operate (operatorIndex) {
    const x = parseFloat(input.slice(0, operatorIndex).join(''));
    const y = parseFloat(input.slice(operatorIndex + 1).join(''));
    let result;

    switch (input[operatorIndex]) {
        case '+':
            result = `${x + y}`.split('');
            break;
        case '-':
            result = `${x - y}`.split('');
            break
        case '*':
            result = `${x * y}`.split('');
            break
        case '/':
            result = `${x / y}`.split('');
    }

    if (result[0] === '-') {
        result[1] = '-' + result[1];
        result.shift();
    }

    return result;
}
