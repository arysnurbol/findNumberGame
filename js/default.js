const newBtn = document.getElementById('new');
const boxes = document.getElementById('boxes');
const toaster = document.querySelector('.toaster');
const toasterMessage = document.getElementById('message');
let computerNum = 0; // Computer number
let allBoxes = null;

function main() {

    computerNum = Math.floor(Math.random() * 15 + 1); 
    let set = new Set();
    while(set.size < 15) {
        let random = Math.floor(Math.random() * 15 + 1);
        set.add(random);
    }
    let arr = [...set];
    arr = arr.sort((a, b) => a - b);
    for (let i = 0; i < arr.length; i++) {
        const b = document.createElement('input');
        b.setAttribute('class', 'box');
        b.setAttribute('id', 'box');
        b.setAttribute('value', arr[i]);
        b.setAttribute('type', 'button');
        boxes.appendChild(b);
    }

    allBoxes = document.querySelectorAll('.box');
    eventsEachBox(allBoxes);
}

main();

function eventsEachBox(elements) {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', () => {
            const currentVal = +elements[i].value;
            if (computerNum === currentVal) {
                showToasterMessage(true, 'Your win!');
                elements[i].classList.add('success');
            } else if (computerNum > currentVal) {
                showToasterMessage(false, 'Your number small!');
                setDisabled(currentVal, elements, true);
            } else {
                showToasterMessage(false, 'Your number great!');
                setDisabled(currentVal, elements, false);
            }
        });
    }
}

function setDisabled(currVal, items, isSmall) {
    if (isSmall) {
        for (let i = 0; i < currVal; i++) {
            items[i].classList.add('danger');
            items[i].disabled = true;
        }
    } else {
        for (let i = currVal - 1; i < items.length; i++) {
            items[i].classList.add('danger');
            items[i].disabled = true;
        }
    }
}

function showToasterMessage(isWin, text) {
    toaster.style.display = 'flex';
    if (isWin) {
        if (toaster.classList.contains('toaster-danger')) {
            toaster.classList.remove('toaster-danger');
        }
        toaster.classList.add('toaster-win');
        toasterMessage.textContent = text;
    } else {
        if (toaster.classList.contains('toaster-win')) {
            toaster.classList.remove('toaster-win');
        }
        toaster.classList.add('toaster-danger');
        toasterMessage.textContent = text;
        setTimeout(() => {
            toaster.style.display = 'none';
        }, 700);
    }
}

newBtn.addEventListener('click', (e) => {
    boxes.innerHTML = '';
    toaster.style.display = 'none';
    if (toaster.classList.contains('toaster-win') || toaster.classList.contains('toaster-danger')) {
        toaster.classList.remove('toaster-win');
        toaster.classList.remove('toaster-danger');
    }
    main();
});