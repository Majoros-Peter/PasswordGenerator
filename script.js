let generatePassword = () => {
    const length = document.querySelector('#length').value;
    const includeUppercase = document.querySelector('#uppercase').checked;
    const includeLowercase = document.querySelector('#lowercase').checked;
    const includeNumbers = document.querySelector('#numbers').checked;
    const includeSymbols = document.querySelector('#symbols').checked;

    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = uppercaseLetters.toLowerCase();
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=\\';

    let charSet = '';
    if (includeUppercase) charSet += uppercaseLetters;
    if (includeLowercase) charSet += lowercaseLetters;
    if (includeNumbers) charSet += numbers;
    if (includeSymbols) charSet += symbols;

    if (charSet === '') {
        alert('Please select at least one character type.');
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }

    document.querySelector('#password').value = password;
    evaluateStrength(password);
}

let copyPassword = () => {
    const password = document.querySelector('#password').value;
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

let updateLengthDisplay = () => {
    const length = document.querySelector('#length').value;
    document.querySelector('#length-display').textContent = length;
}

let evaluateStrength = password => {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    if (password.length >= 13) strength++;

    const strengthDisplay = document.querySelector('#strength-display');
    switch (strength) {
        case 0:
        case 1:
            strengthDisplay.textContent = 'WEAK';
            strengthDisplay.style.color = 'red';
            break;
        case 2:
            strengthDisplay.textContent = 'MEDIUM';
            strengthDisplay.style.color = 'orange';
            break;
        case 3:
            strengthDisplay.textContent = 'STRONG';
            strengthDisplay.style.color = 'yellow';
            break;
        case 4:
        case 5:
            strengthDisplay.textContent = 'VERY STRONG';
            strengthDisplay.style.color = 'lime';
            break;
        default:
            alert('How did you get here?');
    }
}
