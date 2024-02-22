import {initializeApp} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
import {getAuth, onAuthStateChanged, sendPasswordResetEmail, updatePassword, deleteUser, updateEmail, reauthenticateWithCredential} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBe7d9bllq8RnmI6xxEBk3oub3qogPT2aM",
    authDomain: "thinkwise-c7673.firebaseapp.com",
    databaseURL: "https://thinkwise-c7673-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "thinkwise-c7673",
    storageBucket: "thinkwise-c7673.appspot.com",
    messagingSenderId: "37732571551",
    appId: "1:37732571551:web:9b90a849ac5454f33a85aa",
    measurementId: "G-8957WM4SB7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


onAuthStateChanged(auth, (user) => {
    if (user) {
        loadUserData();
    } else {
        console.log("No user is signed in.");
    }
});

function loadUserData() {
    const user = auth.currentUser;

    document.querySelector('.user-email').innerHTML = user.email;

}

document.querySelector('.delete-account').addEventListener('click', () => {
    if (confirm('Are you sure you want to delete your account?')) {
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            window.location.href = "https://thinkwisenotes.webflow.io/"
        }).catch((error) => {
            const credential = promptForCredentials();
            reauthenticateWithCredential(user, credential).then(() => {
                deleteUser(user)
            });
        })
    }
});

document.querySelector('.save-password').addEventListener('click', () => {

    const user = auth.currentUser;
    updatePassword(user, document.querySelector('#new-password').value).then(() => {
        console.log("Password change successful")
    }).catch((error) => {
        // An error ocurred
        // ...
    });

});

document.querySelector('.reset-password').addEventListener('click', () => {
    const user = auth.currentUser;

    sendPasswordResetEmail(auth, user.email)
        .then(() => {
            console.log("Email sent to: ", user.email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

});



//Navbar

const body = document.querySelector('body'),
    sidebar = body.querySelector('nav'),
    toggle = body.querySelector(".toggle"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");

    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";

    }
})