//! ========================= LOGIN ======================== 
const loginLayer = document.querySelector('.login__layer');
const loginUsername = document.querySelector('#username');
const loginPassword = document.querySelector('#password');
const loginSubmit = document.querySelector('#submit');
const loginGoback = document.querySelector('#goback');


loginLayer.style = 'display: none;'

const admin = {
    user: 'admin',
    pass: 'admin',
};



loginSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if (loginUsername.value == admin.user && loginPassword.value == admin.pass) {
        loginUsername.value = '';
        loginPassword.value = '';
        loginLayer.style = 'display: none;';
    }
    else {
        loginUsername.value = '';
        loginPassword.value = '';
        alert('Доступ запрещен!')
    }
});


const arr = [];

// ! READDDDDDDDDDDD
const tbody = document.querySelector('#tbody');



function read() {
    query = new Parse.Query("User");
    query.exists("type");
    query.find().then(function (user) {
        user.forEach(user => {
            arr.push(
                {
                    "id": user.id,
                    "username": user.get('username'),
                    "date": user.get('createdAt'),
                    "email": user.get('theEmail'),
                    "type": user.get('type'),
                    "percent": user.get('yearPercent'),
                    "sum": user.get('sum'),
                    "month": user.get('month'),
                }
            )
        });


        const newArr = arr.map(({ id, username, date, email, type, percent, sum, month }) => {
            return (` 
            <tr class="tr">
            <td>${id}</td>
            <td>${username}</td>
            <td>${String(date).slice(0, 24)}</td>
            <td>${email}</td>
            <td>${type}</td>
            <td>${percent}%</td>
            <td>${sum} UZS</td>
            <td>${month} месяцев</td>
            <td>
            <button class="nice"><i class="fa-solid fa-check"></i></button>
            <button class="bad"><i class="fa-solid fa-xmark"></i></button>
            </td>
            </tr>
          `)
        }).join('');
        tbody.innerHTML = newArr;
console.log(newArr);
        const tr = document.querySelectorAll('.tr');
        tr.forEach((el, index) => {
            if (index % 2 == 1) {
                el.style.background = '#f5f5f5'
            }
        });



        const nice = document.querySelectorAll('.nice');
        const bad = document.querySelectorAll('.bad');

        nice.forEach((el) => {

            el.addEventListener('click', () => {
                console.log(el.parentElement.lastElementChild.classList.add('dead'));
                popUpShit('Заявка одобрена', '#30a930');

            });

        });
        bad.forEach((el) => {

            el.addEventListener('click', () => {
                console.log(el.parentElement.firstElementChild.classList.add('dead'));
                popUpShit('Заявка отклонена', '#ff0000');

            });

        });


    }).catch(function (error) {
        console.log("Error: " + error.code + " " + error.message);
    });
}

read();

const popUp = document.querySelector('.popUp')

function popUpShit(text, bgcolor) {
    popUp.innerHTML = `<span>${text}</span>`;
    popUp.style.backgroundColor = bgcolor;
    popUp.classList.add('popUpNone');
    setTimeout(() => {
        popUp.classList.remove('popUpNone');
    }, 3000);
}




