
let $tableHeader = document.querySelectorAll('#baselist th');
let $tableBody = document.querySelector('#baselist tbody');

let $tableTrUser = document.querySelectorAll('#baselist tbody tr');

let $btnBack = document.querySelector('.btn-back');
let userInfo = JSON.parse(localStorage.getItem('USER_DATA'));

let $delUser = document.querySelectorAll('#baselist .del-user')
// delUserBase($delUser, $tableTrUser, userInfo);

// // -------------Удаляємо з таблиці-----------------------------
// function delUserBase(obj, obj_2, obj_3) {
//     console.log(obj)
//     console.log(obj_2)
//     console.log(obj_3)
//     for (let i = 0; i < obj.length; i++) {
//         obj[i].addEventListener('click', () => {
//             let del = confirm('Ви точно хочите удалити користувача!!!!')
//             if (del) {
//                 obj_2[i].remove();
//                 obj_3.splice(i, 1);
//                 localStorage.setItem('USER_DATA', JSON.stringify(obj_3));
//             }
//             // alert(`Користувач ${userInfo[i].userData} успішно удалений!!!!!!!!!!!!!!!`);

//         })
//     }

// }
// ------------------------------------------
$btnBack.addEventListener('click', () => {
    window.location.href = 'index.html';
})
// ------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    let userInfo = JSON.parse(localStorage.getItem('USER_DATA'));

    // for (let i = 0; i < userInfo.length; i++) {
    //     addlistBase(userInfo[i]);
    // }
    // let $delUser = document.querySelectorAll('#baselist .del-user');
    // let $tableTrUser = document.querySelectorAll('#baselist tbody tr');

    // delUserBase($delUser, $tableTrUser, userInfo);

})


// ----------------вивід диних в таблицю-------------------------
function addlistBase(obj) {

    let tr = document.createElement('TR');
    for (let item of $tableHeader) {
        let td = document.createElement('TD');

        if (item.innerText.toLowerCase() == 'fotodata') {
            let img = document.createElement('IMG');
            img.src = obj[item.innerText];
            td.append(img);
        }
        else {
            td.textContent = obj[item.innerText]
        }
        if (item.innerText.toLowerCase() == 'action') {
            let icon = document.createElement('I');
            icon.classList.add('fas', 'fa-trash-alt', 'del-user')

            td.append(icon);
        }
        tr.append(td)
    }
    $tableBody.append(tr);
}
// ------------------------------------------

userInfo = JSON.parse(localStorage.getItem('USER_DATA'));
for (let i = 0; i < userInfo.length; i++) {
    addlistBase(userInfo[i]);
}
userInfo = JSON.parse(localStorage.getItem('USER_DATA'));
$delUser = document.querySelectorAll('#baselist .del-user')
$tableTrUser = document.querySelectorAll('#baselist tbody tr');

for (let i = 0; i < $delUser.length; i++) {
    $delUser[i].addEventListener('click', () => {
        let del = confirm('Ви точно хочите удалити користувача!!!!')
        if (del) {
            $tableTrUser[i].remove();
            userInfo.splice(i, 1);

            localStorage.setItem('USER_DATA', JSON.stringify(userInfo));
        }
        alert(`Користувач ${userInfo[i].userData} успішно удалений!!!!!!!!!!!!!!!`);

    })
}


// delUserBase($delUser, $tableTrUser, userInfo);
