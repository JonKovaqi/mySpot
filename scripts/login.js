const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const togglePassword = document.getElementById('togglePassword');

const passwordMinLength = 8;
// perdorimi i svgs per ikona me qualitet
togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    
    
    const svg = togglePassword.querySelector('svg');
    if (type === 'text') {
        svg.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
    } else {
        svg.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;
    }
});

// validim per email
function validateEmail(email) {
    if (!email.trim()) {
        return 'Email is required';
    }
    
    if (!email.includes('@')) {
        return 'Email must contain @';
    }
    
    const atIndex = email.indexOf('@');
    if (atIndex === 0) {
        return 'Email must have text before @';
    }
    
    const afterAt = email.substring(atIndex + 1);
    if (afterAt.length === 0) {
        return 'Email must have text after @';
    }
    
    if (!afterAt.includes('.')) {
        return 'Email must contain a domain (e.g., .com)';
    }
    
    const lastDotIndex = afterAt.lastIndexOf('.');
    if (lastDotIndex === afterAt.length - 1) {
        return 'Email must have text after the dot';
    }
    
    return '';
}

// validim per password , duhet me pas vetem numra dhe gjatesi
function validatePassword(password) {
    if (!password) {
        return 'Password is required';
    }
    
    if (password.length < passwordMinLength) {
        return `Password must be at least ${passwordMinLength} characters`;
    }
    
    let hasNumber = false;
    for (let i = 0; i < password.length; i++) {
        if (password[i] >= '0' && password[i] <= '9') {
            hasNumber = true;
            break;
        }
    }
    if (!hasNumber) {
        return 'Password must contain at least one number';
    }
    
    let hasLetter = false;
    for (let i = 0; i < password.length; i++) {
        const char = password[i].toLowerCase();
        if (char >= 'a' && char <= 'z') {
            hasLetter = true;
            break;
        }
    }
    if (!hasLetter) {
        return 'Password must contain at least one letter';
    }
    
    return '';
}

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add('error');
    input.classList.remove('success');
}

function showSuccess(input, errorElement) {
    errorElement.textContent = '';
    input.classList.remove('error');
    input.classList.add('success');
}

function clearValidation(input, errorElement) {
    errorElement.textContent = '';
    input.classList.remove('error', 'success');
}

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    if (error) {
        showError(emailInput, emailError, error);
    } else if (emailInput.value.trim()) {
        showSuccess(emailInput, emailError);
    }
});

passwordInput.addEventListener('blur', () => {
    const error = validatePassword(passwordInput.value);
    if (error) {
        showError(passwordInput, passwordError, error);
    } else if (passwordInput.value) {
        showSuccess(passwordInput, passwordError);
    }
});


emailInput.addEventListener('input', () => {
    if (emailError.textContent) {
        clearValidation(emailInput, emailError);
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordError.textContent) {
        clearValidation(passwordInput, passwordError);
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailErrorMsg = validateEmail(emailInput.value);
    const passwordErrorMsg = validatePassword(passwordInput.value);
    
    let isValid = true;
    
    if (emailErrorMsg) {
        showError(emailInput, emailError, emailErrorMsg);
        isValid = false;
    } else {
        showSuccess(emailInput, emailError);
    }
    
    if (passwordErrorMsg) {
        showError(passwordInput, passwordError, passwordErrorMsg);
        isValid = false;
    } else {
        showSuccess(passwordInput, passwordError);
    }
    
    // nese eshte valid ateher krijo formData
    if (isValid) {
        const formData = {
            email: emailInput.value,
            password: passwordInput.value,
            remember: document.getElementById('remember').checked
        };
        
        console.log('Login attempted');
        
        window.location.href = 'Places.html';
        
    }
});
