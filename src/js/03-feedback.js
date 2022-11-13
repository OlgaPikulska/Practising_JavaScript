import _ from 'lodash';
import * as storage from './storage';
const mail = document.querySelector("input")
const message = document.querySelector("textarea")
const form = document.querySelector(".feedback-form");
const LOCALSTORAGE_KEY = "feedback-form-state";


form.addEventListener("input", _.throttle(saveMessage,500));

function saveMessage() {
    const feedback = {
        email: mail.value,
        message: message.value,
    }
    storage.default.save(LOCALSTORAGE_KEY, feedback);
}
const parsedInput = storage.default.load(LOCALSTORAGE_KEY);

window.addEventListener("load", checkStorage)

function checkStorage() {
    if (parsedInput) {
        mail.value = parsedInput.email;
        message.value = parsedInput.message;  
    } else {
        mail.value = " ";
        message.value = " ";
    }
}

form.addEventListener("submit", afterSubmit)

function afterSubmit(event) {
    event.preventDefault();
    console.log(parsedInput)
    form.reset();
    storage.default.remove(LOCALSTORAGE_KEY);
}