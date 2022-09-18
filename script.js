const buttons = document.querySelectorAll('button');
const display = document.querySelector('#disp');

let input = ['0'];

buttons.forEach(btn =>{
    btn.addEventListener('click', e => {
        switch (e.target.value) {
            case 'C':
                input = ['0'];
                break;
            case 'M':
                break;
            case 'B':
                input.pop();
                if (input.length === 0) input = ['0'];
                break;
            case 'S':
                break;
            case '=':
                break;
            case '.':
                break;
            default:
                if ((e.target.className.includes('num') && input.length === 1 && input[0] === '0') ||
                    (e.target.className.includes('op') && /[\+\-\*\/]/.test(input[input.length - 1])))
                    input.pop();
                input.push(e.target.value);
        }

        let operatorsAmount = input.reduce((n, char) => {
            if (/[\+\-\*\/]/.test(char)) n++;
            return n;
        }, 0);

        if (operatorsAmount > 1) {
            // TODO: Calculate expression; input = [result, last_used_operator]
            input = ['0']; // reset for now
        }

        let operatorIndex = input.findIndex(char => /[\+\-\*\/]/.test(char));
        if (operatorIndex !== -1 && operatorIndex !== input.length - 1)
            display.textContent = input.slice(operatorIndex + 1).join('');
        else display.textContent = input.join('');
    });
});
