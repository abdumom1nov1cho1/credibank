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


// todo ================================ CONTENT ================================
//? ====================== BENEFITS ======================== 

const benefits__content = document.querySelector('.benefits__content');

const card = [
    {
        cardId: "card1",
        imgLink: 'img/benefits1.png',
        cardName: 'Будьте в курсе',
        cardTxt: 'Постоянно обновляющаяся и свежая информация о финансовых услугах на рынке Узбекистана.'

    },
    {
        cardId: "card2",
        imgLink: 'img/benefits2.png',
        cardName: 'Лучшие предложения',
        cardTxt: 'Вклады, кредиты и банковские карты с самыми выгодными условиями.'

    },
    {
        cardId: "card3",
        imgLink: 'img/benefits3.png',
        cardName: 'Удобство',
        cardTxt: 'Все предложения по финансовым услугам собраны в одном месте в удобном для сравнения формате.'

    },
];

const newCards = card.map(({ cardId, imgLink, cardName, cardTxt }) => {
    return (`<div class="benefits__cards id="${cardId}">
     <div class="card__name">
       <img class="card__img" src="${imgLink}" alt="#" />
       <p class="card__txt">${cardName}</p>
    </div>
    <div class="benefits__txt">${cardTxt}</div>
    </div>`)
}).join('');

benefits__content.innerHTML = newCards;











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
            // alert('Success! No user is logged in anymore!');
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



