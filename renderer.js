// interactions with web contents
const {  ipcRenderer } = require('electron');

const submitFormButton = document.querySelector("#login-form");
const getEmail = document.querySelector('#email');
const getPassword = document.querySelector('#password');

const handleData = ()=>{
    const email = getEmail.value;
    const password = getPassword.value;
    // logic check form
    if (email == "" || password == "") {
        alert(`${email=="" ? "Email" :"Password"} wajib  di isi `) 
        return
    }
    ipcRenderer.send('loginData', {email,password});
}
ipcRenderer.on("success",(even,agr)=>{
    alert(agr)
})

submitFormButton.addEventListener('submit', handleData);
