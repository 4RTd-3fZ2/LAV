export function getRandomNumber(min, max) {
    let num = validateRange(min, max, window.nums_random);
    window.nums_random.push(num);
    return num;
}

function validateRange(min, max, exclusions) {
    let availableNumbers = [];

    for (let i = min; i <= max; i++) {
        if (!exclusions.includes(i)) {
          availableNumbers.push(i);
        }
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
}

export function getOrdenNumber() {
    if(window.nums_random) {
        window.nums_random[0] = window.nums_random[0] + 1;
        return window.nums_random[0]
    }
}