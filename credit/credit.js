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


//? ====================== SEARCH BAR ============================ 
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

const loan = document.querySelector('.loan');
// ! CurrentUser
const getCurrentUser = async function () {
  const currentUser = await Parse.User.current();
  if (currentUser !== null) {
    console.log(currentUser !== null, currentUser.get('username'));
    userNow.innerText = currentUser.get('username');
    userOut.forEach(el => {
      el.classList.add('login')
    })
    login.style = 'display: none;';
    loan.style = 'display: flex;';
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
      login.style = 'display: block;';
      userNow.innerText = '';
      loan.style = 'display: none;';

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

//? ====================== Credit ============================ 
const input = document.getElementById("sum");
const rangeinput = document.getElementById("range__sum");
const loantype = document.getElementById("credit");
const loandate = document.getElementById("month");
const loanyear = document.getElementById("year");
const form = document.getElementById("loan__inner");
const btn = document.getElementById("send");

input.addEventListener("input", () => {
  rangeinput.value = input.value;
});
rangeinput.addEventListener("input", () => {
  input.value = rangeinput.value;
});
loantype.addEventListener("change", () => {
  if (loantype.value == "Оведрафт") {
    loandate.value = "12";
    loanyear.value = "17.4";
  }
  console.log(loanyear.value);
  if (loantype.value == "Автокредит") {
    loandate.value = "24";
    loanyear.value = "24.8";
  }
  if (loantype.value == "Ипотека") {
    loandate.value = "36";
    loanyear.value = "17.4";
  }
  if (loantype.value == "Микрозайм") {
    loandate.value = "24";
    loanyear.value = "37.7";
  }
  if (loantype.value == "Образовательный") {
    loandate.value = "36";
    loanyear.value = "17.4";
  }
});

const monthsum = document.querySelector(".month");
const yearsum = document.querySelector(".year");
const totalsum = document.querySelector(".total");

const countbtn = document.getElementById("count");

countbtn.addEventListener("click", (e) => {
  e.preventDefault();

  let totalShit = (loandate.value / 12) * ((input.value / 100) * loanyear.value) +
    +input.value;

  totalsum.value = `${totalShit.toLocaleString('en')} UZS`;
  yearsum.value = `${(Math.floor(parseInt(totalShit) / (loandate.value / 12))).toLocaleString('en')} UZS`;
  monthsum.value = `${(Math.floor(parseInt(totalShit) / loandate.value)).toLocaleString('en')} UZS`;
});

















const user = document.querySelector('#user');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

//! UPDATE PET

btn.addEventListener("click", async function (e) {
  e.preventDefault();
  readThenUpdate();
});


function readThenUpdate() {
  query = new Parse.Query("User");
  query.equalTo("theEmail", document.getElementById("email").value);
  query.first().then(function (user) {
    if (user) {
      console.log('user found with name: ' + user.get("username") + ' and email: ' + user.get("theEmail"));
      update(user);
    } else {
      console.log("Nothing found, please try again");
      update(user);
    }
  }).catch(function (error) {
    console.log("Error: " + error.code + " " + error.message);
  });
}

function update(founduser) {
  founduser.set('theEmail', document.getElementById("email").value);
  founduser.set('yearPercent', document.getElementById("year").value);
  founduser.set('type', document.getElementById("credit").value);
  founduser.set('sum', document.getElementById("sum").value);
  founduser.set('month', document.getElementById("month").value);

  popUpShit('Заявка успешно отправлена', '#30a930');

  founduser.save().then(function (user) {
    console.log('user updated! Name: ' + user.get("username") + ' and new email: ' + user.get("theEmail") + ' and new main: ' + pet.get("main"));
  }).catch(function (error) {
    console.log('Error: ' + error.message);
  });
}


const popUp = document.querySelector('.popUp')

function popUpShit(text, bgcolor) {
  popUp.innerHTML = `<span>${text}</span > `;
  popUp.style.backgroundColor = bgcolor;
  popUp.classList.add('popUpNone');
  setTimeout(() => {
    popUp.classList.remove('popUpNone');
  }, 3000);
}


const rangeInputs = document.querySelectorAll('input[type="range"]')


function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  }
  const min = target.min
  const max = target.max
  const val = target.value

  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

