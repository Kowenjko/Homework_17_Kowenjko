
let $addUser = document.querySelector('.btn-add');
let $delUser = document.querySelector('.btn-del');
let $loadFoto = document.querySelector('.btn-load');
let $btnList = document.querySelector('.btn-list');
let $searchUser = document.querySelector('.search-user');
// -----------------------------------------------------
let $btnBlock = document.querySelector('.btnBlock');
let $btnBack = document.querySelector('.btn-back');
// -----------------------------------------------------
let $viewBlock = document.querySelector('.viewBlock');
let $registerBlock = document.querySelector('.registerBlock');
// -----------------------------------------------------
let $searchUserIn = document.querySelector('.search-userIn');
let $userIn = document.querySelector('#userIn');

let $allUserIn = document.querySelectorAll('.user-list li a');
let $allIconInput = document.querySelectorAll('.user-list span');
let $imgIn = document.querySelector('.img-preview');
// ------------------------------------------------------

let $imgUser = document.querySelector('.img-load');

let $user = document.querySelector('input[name="user"]');
let $telUser = document.querySelector('input[name="tel"]');
let $emailUser = document.querySelector('input[name="email"]');
let $locallUser = document.querySelector('input[name="local"]');
let $siteUser = document.querySelector('input[name="site"]');

// ------------------------------------------------------
$btnList.addEventListener('click', () => {
    window.location.href = 'listuser.html';
})
// ------------------------------------------------------
console.log($allUserIn)
let arrUser = [];
let src_item = false;
let default_foto = 'https://www.svgimages.com/svg-image/s5/man-passportsize-silhouette-icon-256x256.png';
$imgIn.src = default_foto;
$imgUser.src = default_foto;

// --перехід до блока добавлення в базу------------------
$btnBlock.addEventListener('click', () => {
    $viewBlock.classList.toggle('displayView');
    $registerBlock.classList.toggle('displayView');
})
// ---------Повернення назад-----------------
$btnBack.addEventListener('click', () => {
    let userlogo = JSON.parse(localStorage.getItem('logo_user'));
    if (userlogo) {
        $userIn.value = userlogo.userHeader;
        $allUserIn[0].textContent = userlogo.telHeader;
        $allUserIn[1].textContent = userlogo.emailHeader;
        $allUserIn[2].textContent = userlogo.locallHeader;
        $allUserIn[3].textContent = userlogo.siteHeader;
        $imgIn.src = userlogo.fotoHeader;
    }
    $viewBlock.classList.toggle('displayView');
    $registerBlock.classList.toggle('displayView');
})

//-------------------------Очищення---------------------
function clearDataRegistr() {
    $user.value = '';
    $telUser.value = '';
    $emailUser.value = '';
    $locallUser.value = '';
    $siteUser.value = '';
    $imgUser.src = default_foto;
}
//------------- Функція загрузки користувача ------------------
function loadUser(key) {
    let userInfo = JSON.parse(localStorage.getItem('USER_DATA'));
    console.log(userInfo)
    let userHeaderData = {
        userHeader: userInfo[key].userData,
        telHeader: userInfo[key].telData,
        emailHeader: userInfo[key].emailData,
        locallHeader: userInfo[key].locallData,
        siteHeader: userInfo[key].siteData,
        fotoHeader: userInfo[key].fotoData,
    }

    localStorage.setItem('logo_user', JSON.stringify(userHeaderData));
}
//-----------------Функція створення бази-----------------------
function loadUserBase() {
    let userLoadData = {
        userData: $user.value,
        telData: $telUser.value,
        emailData: $emailUser.value,
        locallData: $locallUser.value,
        siteData: $siteUser.value,
        fotoData: $imgUser.src,

    }
    let userInfo = JSON.parse(localStorage.getItem('USER_DATA'));
    if ($user.value && $telUser.value && $emailUser.value && $locallUser.value && $siteUser.value) {

        let emailStandart = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let telStandart = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

        let user_is = false;


        if (emailStandart.test($emailUser.value) && (telStandart.test($telUser.value))) {
            if (userInfo != null) {//перевіряє чи створена база
                for (let i = 0; i < userInfo.length; i++) {
                    if (userInfo[i].userData == $user.value) {
                        user_is = true;
                    }
                }
            }
            if (user_is) { alert(`Користувач ${$user.value} існує!!!!!`); }
            else {
                if (userInfo) {
                    arrUser = userInfo;
                }

                arrUser.push(userLoadData);
                console.log(arrUser.length - 1)

                localStorage.setItem('USER_DATA', JSON.stringify(arrUser));
                loadUser(arrUser.length - 1);
                alert(`Користувач ${$user.value} успішно добавлений!!!!`);
            }
        }
        else { alert('Email або телефон не відповідає стандарту!!!!!!!!!!!!!'); }
    }
    else { alert('Ви заповнили не всі поля!!!!!!!!!!!!!'); }
}

// --------------------загружаємо фото--------
$loadFoto.addEventListener('change', function (event) {

    let fotoUser = $loadFoto.files[0];
    if (fotoUser) {
        $imgUser.src = URL.createObjectURL(fotoUser);
        // srcUser = $imgUser.src;
        console.log($imgUser.src)
        src_item = true;
    }

})
// -----------------Добавляємо в базу-----------
$addUser.addEventListener('click', () => {
    if (!src_item) { //Перевіряємо чи добавлена фотографія
        $imgUser.src = default_foto;
    }
    src_item = false;
    loadUserBase();
    console.log($imgUser.src)
    clearDataRegistr();
})

// ------------------- Удаляэмо з бази-----------
$delUser.addEventListener('click', () => {
    let userInfo = JSON.parse(localStorage.getItem('USER_DATA'));
    console.log(userInfo)
    if ($user.value) {
        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].userData == $user.value) {
                userInfo.splice(i, 1);
            }
        }
        alert(`Користувач ${$user.value} успішно удалений!!!!!!!!!!!!!!!`);
        localStorage.setItem('USER_DATA', JSON.stringify(userInfo));
        clearDataRegistr();
    }
    else {
        alert('Ви не ввели імя користувача!!!!!!!!!!!!!!!!!')
    }
})
// ----------Кнопки для tel і email-------------------------
$allIconInput[0].addEventListener('click', function () {

    window.location.href = `tel:${$allUserIn[0].text}`;
})

$allIconInput[1].addEventListener('click', function () {

    window.location.href = `mailto:${$allUserIn[1].text}`;
})

// --------------Пошук по входу------------------------
$searchUserIn.addEventListener('click', function () {
    let user_item = false;
    let item;
    let userInfo = JSON.parse(localStorage.getItem('USER_DATA'));
    console.log($userIn.value)
    if (userInfo) {
        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].userData == $userIn.value) {
                user_item = true;
                item = i;
            }
        }

        console.log(item)
        console.log(user_item)

        if (user_item) {

            $allUserIn[0].textContent = userInfo[item].telData;
            $allUserIn[1].textContent = userInfo[item].emailData;
            $allUserIn[2].textContent = userInfo[item].locallData;
            $allUserIn[3].textContent = userInfo[item].siteData;
            if (userInfo[item].fotoData) { $imgIn.src = userInfo[item].fotoData; }
            else {
                $imgIn.src = default_foto;
            }
            loadUser(item)
        }

        else {
            alert(`Користувача ${$userIn.value} не існує в БД!!!!!!!!!!!!!!`)
        }
    }
    else {
        alert('База даних ще не створена!!!!!!!!!!!!!');
    }
})
// -----------------------------Пошук по юзеру-----------
$searchUser.addEventListener('click', function () {
    let user_item = false;
    let item;
    let userInfo = JSON.parse(localStorage.getItem('USER_DATA'));
    for (let i = 0; i < userInfo.length; i++) {
        if (userInfo[i].userData == $user.value) {
            user_item = true;
            item = i;
        }
    }
    console.log(item)
    console.log(user_item)

    if (user_item) {

        $telUser.value = userInfo[item].telData;
        $emailUser.value = userInfo[item].emailData;
        $locallUser.value = userInfo[item].locallData;
        $siteUser.value = userInfo[item].siteData;
        if (userInfo[item].fotoData) { $imgUser.src = userInfo[item].fotoData; }
        else {
            $imgUser.src = default_foto;
        }

        loadUser(item)
    }

    else {
        alert(`Користувача ${$userIn.value} не існує в БД!!!!!!!!!!!!!!`)
    }
})


