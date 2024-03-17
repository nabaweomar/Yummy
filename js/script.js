let rowData = document.getElementById('rowData');
let category = document.getElementById('category');
let area = document.getElementById('area');
let ingredients = document.getElementById('ingredients');
let searchBtn = document.getElementById('searchBtn');
let searchSection = document.getElementById('searchSection');
let searchByName = document.getElementById('searchByName');
let searchByFirstLetter = document.getElementById('searchByFirstLetter');
let contactBtn = document.getElementById('contactBtn');
let contact = document.getElementById('contact');
let submitBtn = document.querySelector('#contact button');
// =========> Loading <==========
$(document).ready(() => {
    showMeals('').then(() => {
        $('.loading').fadeOut(500);
        $('body').css('overflow', 'visible');
    })
})
// ===========> NavBar <=========
function openNavBar() {
    $('.side-nav-menu .open-close-icon').removeClass('fa-bars');
    $('.side-nav-menu .open-close-icon').addClass('fa-x');
    $('.side-nav-menu').animate({ left: 0 }, 500)
    for (let i = 0; i < 5; i++) {
        $('.nav-links li').eq(i).animate({ top: 0 }, (i + 8) * 100)
    }
}
function closeNavBar() {
    let navTabWidth = $('.side-nav-menu .nav-tab').outerWidth();
    $('.side-nav-menu').animate({ left: -navTabWidth }, 500);
    $('.side-nav-menu .open-close-icon').removeClass('fa-x');
    $('.side-nav-menu .open-close-icon').addClass('fa-bars');
    $('.nav-links li').animate({ top: 300 }, 500)
}
$('.side-nav-menu .open-close-icon').click(() => {
    let navTabWidth = $('.side-nav-menu .nav-tab').outerWidth();
    if ($('.side-nav-menu').css('left') == '0px') {
        closeNavBar();
    }
    else {
        openNavBar();
    }

})
closeNavBar();
// =========> Show meals <=====================
async function showMeals(word) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`);
    response = await response.json();
    response.meals == null ? displayMeals([]) : displayMeals(response.meals);
}
function displayMeals(arr) {
    let mealsList = ``;
    for (let i = 0; i < arr.length; i++) {
        mealsList += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal overflow-hidden rounded-2 cursor-pointer position-relative">
            <img class="w-100 rounded-2"
                src="${arr[i].strMealThumb == null ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFLovnIpBZR08pv98hP86raEdGB3thiFVPZR29_d2Qs2SAx_YZlBgekiQw_sdVC2pGUnE&usqp=CAU' : arr[i].strMealThumb}" alt="${arr[i].strMeal}">
            <div class="layer rounded-2">
                <p class="ps-2 text-black fs-3 fw-bold">${arr[i].strMeal}</p>
            </div>
        </div>
    </div>
        `
    }
    rowData.innerHTML = mealsList;
}
// ===============> Get Categories <=================
async function getCategory() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    response = await response.json();
    displayCategory(response.categories);
}
category.addEventListener('click', function () {
    getCategory();
    searchSection.classList.replace('d-flex', 'd-none');
    searchByFirstLetter.value = '';
    searchByName.value = '';
    contact.classList.replace('d-flex', 'd-none');
    closeNavBar()
})

function displayCategory(arr) {
    let categories = ``
    for (let i = 0; i < arr.length; i++) {
        categories += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal overflow-hidden rounded-2 cursor-pointer position-relative">
            <img class="w-100 rounded-2"
                src="${arr[i].strCategoryThumb}" alt='${arr[i].strCategory}'>
            <div class="layer d-flex flex-column rounded-2 text-center">
                <h6 class='text-black fw-bolder pt-2'>${arr[i].strCategory}</h6>
                <p class="text-black px-3">${arr[i].strCategoryDescription.split(" ").slice(0, 25).join(" ")}</p>
            </div>
        </div>
    </div>
        `
    }
    rowData.innerHTML = categories;
}
// ========> Area <=========
async function getArea() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    response = await response.json();
    displayArea(response.meals);
}

function displayArea(arr) {
    let area = ``
    for (let i = 0; i < arr.length; i++) {
        area += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div onclick="getAreaMeals('${arr[i].strArea}')" class="meal overflow-hidden rounded-2 cursor-pointer position-relative">
            <div class="text-center">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h4 class='text-white fw-bolder pt-2'>${arr[i].strArea}</h4>
            </div>
        </div>
    </div>

        `
    }
    rowData.innerHTML = area;
}

area.addEventListener('click', function () {
    getArea();
    searchSection.classList.replace('d-flex', 'd-none');
    contact.classList.replace('d-flex', 'd-none');
    searchByFirstLetter.value = '';
    searchByName.value = '';
    closeNavBar();
})
// ==========> Ingredients <==========
async function getIngredients() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    response = await response.json();
    displayIngredients(response.meals.slice(0, 20));
}

function displayIngredients(arr) {
    let ingredient = ``
    for (let i = 0; i < arr.length; i++) {
        ingredient += `
        <div class="col-lg-3 col-md-4 col-sm-6">
        <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="meal overflow-hidden rounded-2 position-relative">
            <div class="text-center cursor-pointer">
                <i class="fa-solid fa-utensils fa-4x"></i>
                <h4 class='text-white fw-bolder pt-2'>${arr[i].strIngredient}</h4>
                <p>${arr[i].strDescription.split(" ").slice(0, 25).join(" ")}</p>
            </div>
        </div>
    </div>

        `
    }
    rowData.innerHTML = ingredient;
}

ingredients.addEventListener('click', function () {
    getIngredients();
    searchSection.classList.replace('d-flex', 'd-none');
    contact.classList.replace('d-flex', 'd-none');
    searchByFirstLetter.value = '';
    searchByName.value = '';
    closeNavBar();
})
// ==========> get category by meals <==========
async function getCategoryMeals(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    response = await response.json();
    displayMeals(response.meals)
}
// ==========> get category by area <==========
async function getAreaMeals(country) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
    response = await response.json();
    displayMeals(response.meals);
}
// ==========> get category by ingredients <==========
async function getIngredientsMeals(ingredient) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    response = await response.json();
    displayMeals(response.meals);
}
// ==========> get meal details <==========
async function getMealDetails(mealID) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    response = await response.json();
    displayMealDetails(response.meals);
    searchSection.classList.replace('d-flex', 'd-none');
    searchByFirstLetter.value = '';
    searchByName.value = '';
    closeNavBar();
}
function displayMealDetails(arr) {
    let mealDetails = ''
    for (i = 0; i < arr.length; i++) {
        mealDetails += `
        <div class="col-md-4">
        <div class="recipy-name">
            <img class="w-100 rounded-2"
                src="${arr[i].strMealThumb}" alt="">
            <h3 class="mt-2">${arr[i].strMeal}</h3>
        </div>
    </div>
    <div class="col-md-8">
        <div class="recipy-content">
            <h4>Instructions</h4>
            <p>${arr[i].strInstructions}</p>
            <h4>Area : <span>${arr[i].strArea}</span></h4>
            <h4>Category : <span>${arr[i].strCategory}</span></h4>
            <h4 class="recipes">Recipes :<br /> <span>${arr[i].strIngredient1}</span><span>${arr[i].strIngredient2}</span><span>${arr[i].strIngredient3}</span><span>${arr[i].strIngredient4}</span><span>${arr[i].strIngredient5}</span>
            <span>${arr[i].strIngredient6 == '' | null ? 'spinkling' : arr[i].strIngredient6}</span><span>${arr[i].strIngredient7 == '' | null ? 'garlic' : arr[i].strIngredient7}</span><span>${arr[i].strIngredient8 == '' | null ? '6 leaves' : arr[i].strIngredient8}</span>
            </h4>
            <h4>Tags:</h4>
            <div class="mt-4">
                <button class="btn1"><a target="_blank" href="${arr[i].strSource}">Source</a></button>
                <button class="btn2"><a target="_blank" href="${arr[i].strYoutube}">Youtube</a></button>
            </div>

        </div>
    </div>
        `
    }
    rowData.innerHTML = mealDetails;
}
// ============> Search Inputs <=========
// =====> Show SearchInputs <====
function showSearchInputs() {
    searchSection.classList.replace('d-none', 'd-flex');
}
searchBtn.addEventListener('click', function () {
    showSearchInputs();
    contact.classList.replace('d-flex', 'd-none');
    rowData.innerHTML = '';
    closeNavBar();
})
//  ====> Search Inputs work <====
searchByName.addEventListener('keyup', function () {
    showMeals(this.value);
})
searchByFirstLetter.addEventListener('keyup', function () {
    searchByFirstLetterResults(this.value);
})
async function searchByFirstLetterResults(letter) {
    letter == '' ? letter = 's' : '';
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    response = await response.json();
    response.meals == null ? displayMeals([]) : displayMeals(response.meals);
}
// =================> Contact us <================
contactBtn.addEventListener('click', function () {
    contact.classList.replace('d-none', 'd-flex');
    rowData.innerHTML = ''
    searchSection.classList.replace('d-flex', 'd-none');
    searchByFirstLetter.value = '';
    searchByName.value = '';
    closeNavBar();
})
let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let phoneInput = document.getElementById('phoneInput');
let ageInput = document.getElementById('ageInput');
let passwordInput = document.getElementById('passwordInput');
let rePasswordInput = document.getElementById('rePasswordInput');

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;
nameInput.addEventListener('focus', function () {
    nameInputTouched = true;
})
emailInput.addEventListener('focus', function () {
    emailInputTouched = true;
})
phoneInput.addEventListener('focus', function () {
    phoneInputTouched = true;
})
ageInput.addEventListener('focus', function () {
    ageInputTouched = true;
})
passwordInput.addEventListener('focus', function () {
    passwordInputTouched = true;
})
rePasswordInput.addEventListener('focus', function () {
    rePasswordInputTouched = true;
})
function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.querySelector('.nameAlert').classList.replace('d-block', 'd-none');
            nameInput.classList.add('is-valid');
            nameInput.classList.replace('is-invalid', 'is-valid');
        }
        else {
            document.querySelector('.nameAlert').classList.replace('d-none', 'd-block');
            nameInput.classList.add('is-invalid');
            nameInput.classList.replace('is-valid', 'is-invalid');
        }
    }
    if (emailInputTouched) {
        if (emailValidation()) {
            document.querySelector('.emailAlert').classList.replace('d-block', 'd-none');
            emailInput.classList.add('is-valid');
            emailInput.classList.replace('is-invalid', 'is-valid');
        }
        else {
            document.querySelector('.emailAlert').classList.replace('d-none', 'd-block');
            emailInput.classList.add('is-invalid');
            emailInput.classList.replace('is-valid', 'is-invalid');
        }
    }
    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.querySelector('.phoneAlert').classList.replace('d-block', 'd-none');
            phoneInput.classList.add('is-valid');
            phoneInput.classList.replace('is-invalid', 'is-valid');
        }
        else {
            document.querySelector('.phoneAlert').classList.replace('d-none', 'd-block');
            phoneInput.classList.add('is-invalid');
            phoneInput.classList.replace('is-valid', 'is-invalid');
        }
    }
    if (ageInputTouched) {
        if (ageValidation()) {
            document.querySelector('.ageAlert').classList.replace('d-block', 'd-none');
            ageInput.classList.add('is-valid');
            ageInput.classList.replace('is-invalid', 'is-valid');
        }
        else {
            document.querySelector('.ageAlert').classList.replace('d-none', 'd-block');
            ageInput.classList.add('is-invalid');
            ageInput.classList.replace('is-valid', 'is-invalid');
        }
    }
    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.querySelector('.passwordAlert').classList.replace('d-block', 'd-none');
            passwordInput.classList.add('is-valid');
            passwordInput.classList.replace('is-invalid', 'is-valid');
        }
        else {
            document.querySelector('.passwordAlert').classList.replace('d-none', 'd-block');
            passwordInput.classList.add('is-invalid');
            passwordInput.classList.replace('is-valid', 'is-invalid');
        }
    }
    if (rePasswordInputTouched) {
        if (rePasswordValidation()) {
            document.querySelector('.rePasswordAlert').classList.replace('d-block', 'd-none');
            rePasswordInput.classList.add('is-valid');
            rePasswordInput.classList.replace('is-invalid', 'is-valid');
        }
        else {
            document.querySelector('.rePasswordAlert').classList.replace('d-none', 'd-block');
            rePasswordInput.classList.add('is-invalid');
            rePasswordInput.classList.replace('is-valid', 'is-invalid');
        }
    }
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        rePasswordValidation()) {
        submitBtn.classList.replace('disabled', 'enabled');
    }
    else {
        submitBtn.classList.replace('enabled', 'disabled');
    }
}
function nameValidation() {
    return (/^[a-zA-Z]+$/.test(document.getElementById('nameInput').value));

}
function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById('emailInput').value))
}
function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById('phoneInput').value))
}
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById('ageInput').value))
}
function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById('passwordInput').value));
}
function rePasswordValidation() {
    return document.getElementById("rePasswordInput").value == document.getElementById("passwordInput").value;
}