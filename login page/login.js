const singup = document.querySelector('.singup');
const login = document.querySelector('.login');

// ! SING UP



const sucLogin = document.querySelector('.sucLogin');
async function createParseUser() {
    let user = new Parse.User();
    user.set("username", document.getElementById("username").value);
    user.set("email", document.getElementById("email").value);
    user.set("theEmail", document.getElementById("email").value);
    user.set("password", document.getElementById("password").value);
    try {
        user = await user.save();
        if (user !== null) {

            sucLogin.classList.add('success');
            setTimeout(() => {
                sucLogin.classList.remove('success');
            }, 3000);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

document.getElementById("singUp").addEventListener("click", async function (e) {
    e.preventDefault();
    createParseUser();
    document.getElementById("username").value = '';
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';
    setTimeout(() => {
        singup.classList.add('none');
        login.classList.remove("none");
    }, 1500);

});

const already = document.querySelector('#already');

already.addEventListener("click", (e) => {
    e.preventDefault();
    singup.classList.add('none');
    login.classList.remove("none");
});




// ! LOGIN

const doUserLogIn = async function () {
    const usernameValue = document.querySelector('#usernameIn').value;
    const passwordValue = document.querySelector('#passwordIn').value;
    try {
        const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
        const currentUser = await Parse.User.current();
        console.log(loggedInUser === currentUser);
        sucSingup.classList.add('success')
        setTimeout(() => {
            sucSingup.classList.remove('success');
        }, 3000);
        setUsername('');
        setPassword('');
        getCurrentUser();
        return true;
    } catch (error) {
        console.log(`Error! ${error.message}`);
        return false;
    }
};

document.getElementById("logIn").addEventListener("click", async function (e) {
    e.preventDefault();
    doUserLogIn();
    getCurrentUser();

    document.getElementById("usernameIn").value = '';
    document.getElementById("emailIn").value = '';
    document.getElementById("passwordIn").value = '';
});

// ! CurrentUser
const sucSingup = document.querySelector('.sucSingup');
const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    if (currentUser !== null) {
        console.log(currentUser !== null);
    }
    return currentUser;
};