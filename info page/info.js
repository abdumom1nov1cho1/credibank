//! ====================== PRELOADER ============================ 
const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => {
    preloader.style = 'display: none;';
});

//? ====================== SEARCH BAR ============================ 
const searchIcon = document.querySelector('#searchIcon');
const searchXmark = document.querySelector('#searchXmark');
const searchBar = document.querySelector('.searchbar');

searchIcon.addEventListener('click', () => {
    searchBar.style = ' transform: translateY(0);'
});
searchXmark.addEventListener('click', () => {
    searchBar.style = ' transform: translateY(-100%);'
});


//? ====================== BURGER ======================== 
const burger = document.querySelector('.burger');
const info = document.querySelector('.info');


burger.addEventListener('click', () => {
    info.classList.toggle('show');
    if (info.className.includes('show')) burger.innerHTML = '<i class="fa-solid fa-xmark">';
    else burger.innerHTML = '<i class="fa-solid fa-bars">';
});


//! login & logout  =====LOGIC=====
const login = document.querySelector('#Login');
const logout = document.querySelector('#Logout');
const userIn = document.querySelector('.login');
const userOut = document.querySelectorAll('.logout');

const userNow = document.querySelector('.userNow');
// ! CurrentUser
const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    if (currentUser !== null) {
        console.log(currentUser !== null, currentUser.get('username'));
        userNow.innerText = currentUser.get('username');
        userOut.forEach(el => {
            el.classList.add('login')
        })
        login.style = 'display: none;'
    }
    return currentUser;
};
getCurrentUser();


//! LOGOUT

const sucExit = document.querySelector('.sucExit')

const doUserLogOut = async function () {
    try {
        await Parse.User.logOut();
        const currentUser = await Parse.User.current();
        if (currentUser === null) {
            userOut.forEach(el => {
                el.classList.remove('login')
            })
            login.style = 'display: block;'
            userNow.innerText = '';

            sucExit.classList.add('success');
            setTimeout(() => {
                sucExit.classList.remove('success');
            }, 3000);
        }
        getCurrentUser();
        return true;
    } catch (error) {
        console.log(`Error! ${error.message}`);
        return false;
    }
};

const Logout = document.querySelector('#Logout');
Logout.addEventListener('click', () => {
    doUserLogOut();
});




//!
let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}




//! CIRCLE
const circle = document.querySelector('.circle');

window.addEventListener('scroll', (e) => {
    if (window.scrollY <= 300) {
        circle.style = 'pointer-events: none; opacity: 0;'
    }
    if (window.scrollY >= 300) {
        circle.style = 'pointer-events: all; opacity: 1;'
    }
});