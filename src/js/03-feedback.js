import _throttle from 'lodash.throttle';
import * as storage from './storage';
const form = document.querySelector(".feedback-form");
const LOCALSTORAGE_KEY = "feedback-form-state";

form.addEventListener("input", _throttle(saveMessage,500));
function saveMessage() {
  const {
    elements: { email, message }
  } = form;
    const feedback = {
        email: email.value,
        message: message.value,
    }
  console.log(feedback)
  storage.default.save(LOCALSTORAGE_KEY, feedback);
}

const parsedInput = storage.default.load(LOCALSTORAGE_KEY);

window.addEventListener("load", checkStorage)
function checkStorage() {
  const {
    elements: { email, message }
  } = form;
  if (parsedInput) {
        email.value = parsedInput.email;
        message.value = parsedInput.message;  
    } else {
        email.value = " ";
        message.value = " ";
    }
 }

form.addEventListener("submit", afterSubmit)
function afterSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message }
  } = event.currentTarget;
  if (email.value === "" || message.value === "") {
    return alert("Please fill in all the fields!");
  }
  console.log(`Email: ${email.value}, Message: ${message.value}`);
  form.reset();
  storage.default.remove(LOCALSTORAGE_KEY);
 }