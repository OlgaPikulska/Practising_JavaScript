import _ from 'lodash';
const save = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Set state error: ", error.message);
    }
};
const load = key => {
    try {
        const serializedState = localStorage.getItem(key);
        return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
};
const remove = key => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Get state error: ", error.message);
    }
};
const form = document.querySelector(".feedback-form");
const LOCALSTORAGE_KEY = "feedback-form-state";


form.addEventListener("input", _.throttle(saveMessage,1000));

function saveMessage(evt) {
    evt.preventDefault();
    const feedback = {
    email: form.elements.email.value,
    message:form.elements.message.value,
    }
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(feedback));
  
    
    console.log(form.elements.email.value);
    console.log(form.elements.message.value);
  //form.reset();
}

window.addEventListener("load", checkStorage)

function checkStorage() {
    const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};
    load(LOCALSTORAGE_KEY)
    if (localStorage.getItem(LOCALSTORAGE_KEY) !== null) {
        form.elements.email.value = LOCALSTORAGE_KEY.email;
        form.elements.message.value = LOCALSTORAGE_KEY.message;
    } 
}

