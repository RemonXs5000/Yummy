// Global Variables
const searchDiv = document.querySelector("#Search");
const rowData = document.getElementById("row-data")


// EventListeners
$(".menuIcon").on("click",function(){
    OpenSideBar();
})

$(".closeIcon").on("click",function(){
    CloseSideBar();
})


$(document).ready(function(){
    $(".loading-screen").fadeIn(500)
    searchByName("")
    $(".loading-screen").hide()
})





















// Functions that Toggles the SideBar 
function OpenSideBar(){
    $(".closeIcon").removeClass("visually-hidden")
    $(".menuIcon").addClass("d-none")
    $('.sidebar').animate(
        {left:"0px"},500,function(){
            $(".menu").animate
    })
}

function CloseSideBar(){
    $(".closeIcon").addClass("visually-hidden")
    $(".menuIcon").removeClass("d-none")
    $('.sidebar').animate(
        {left:"-255px"},500,function(){
            $(".menu").animate
    })
}


function ShowSearchInput(){
    CloseSideBar();
    searchDiv.innerHTML =`
            <input onkeydown="searchByName(this.value)" class="form-control " type="text" placeholder="Search by Name">
            <input onkeydown="searchByLetter(this.value)"  class="form-control" type="text" maxlength="1" placeholder="Search by 1st letter">`;
    rowData.innerHTML="";        
}


async function searchByName(term){
    rowData.innerHTML = "" ;
    $(".loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let data = await response.json();
    $(".loading-screen").hide()
    let mealsArray = data.meals
    DisplayMeals(mealsArray);
}


async function searchByLetter(term){
  
    rowData.innerHTML = "" ;
    if(term ==""){
        term ="a"
    }
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let data = await response.json();
    let mealsArray = data.meals
    DisplayMeals(mealsArray);
}

async function GetCategories() {
    CloseSideBar();
    rowData.innerHTML = "";
    searchDiv.innerHTML="";
    $(".loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await response.json();
    $(".loading-screen").hide()
    let categories = data.categories;
    DisplayCategories(categories)
}


async function GetAreas() {
    CloseSideBar();
    rowData.innerHTML = "";
    searchDiv.innerHTML="";
    $(".loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let data = await response.json();
    $(".loading-screen").hide()
    let Areas = data.meals;
    DisplayArea(Areas)
}

async function GetIngredients() {
    CloseSideBar();
    rowData.innerHTML = "";
    searchDiv.innerHTML="";
    $(".loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await response.json();
    $(".loading-screen").hide()
    let Ingredients = data.meals;
    DisplayIngredients(Ingredients)
}

async function GetRecipe(mealID){
    rowData.innerHTML=''
    searchDiv.innerHTML=''
    $(".loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    $(".loading-screen").hide()
    let data = await response.json();
    DisplayRecipeDetails(data.meals[0])
}

async function FilterbyCategory(categoryName) {
    rowData.innerHTML=''
    searchDiv.innerHTML=''
    $(".loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    let data = await response.json();
    $(".loading-screen").hide()
    let mealsArray = data.meals
    DisplayMeals(mealsArray);
}


async function FilterbyArea(Areaname) {
    rowData.innerHTML=''
    searchDiv.innerHTML=''
    $(".loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Areaname}`)
    let data = await response.json();
    $(".loading-screen").hide(500)
    let mealsArray = data.meals
    DisplayMeals(mealsArray);
}

async function FilterbyIngredient(ingredientname){
    rowData.innerHTML=''
    searchDiv.innerHTML=''
    $(".loading-screen").fadeIn(500)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientname}`)
    let data = await response.json();
    $(".loading-screen").hide(500)
    let mealsArray = data.meals
    DisplayMeals(mealsArray);
}


function DisplayMeals(arr){
    let cartoona = ``; 
    
    if(arr.length == 0) {
        console.log('no meals')
    }else{
        for (let i = 0; i < arr.length; i++) {
            cartoona +=`
            <div onclick="GetRecipe('${arr[i].idMeal}')" class="item meal-card col-md-4 ">
                <img class="meal-pic w-100 rounded-3" src="${arr[i].strMealThumb}" alt="">
                <h4 class="meal-name">${arr[i].strMeal}</h4>
            </div>`;           
        }
        rowData.innerHTML = cartoona;
    }
}



function DisplayCategories(arr){
    let cartoona = ``;

        for (let i = 0; i < arr.length; i++) {
            cartoona +=`
            <div onclick="FilterbyCategory('${arr[i].strCategory}')" class="item category-card col-md-3 ">
                <img class="meal-pic w-100 rounded-3" src="${arr[i].strCategoryThumb}" alt="">
            </div>`;           
        }
        rowData.innerHTML =cartoona;

}




function DisplayArea(arr){
    let cartoona = ``;

        for (let i = 0; i < arr.length; i++) {
            cartoona +=`
            <div onclick="FilterbyArea('${arr[i].strArea}')" class="item area-card col-md-3 text-center">
              <i class="fa-solid fa-flag"></i>
              <h2 class="area-name">${arr[i].strArea}</h2>
            </div>`;           
        }
        rowData.innerHTML =cartoona;

}

function DisplayIngredients(arr){
    let cartoona = ``;

    for (let i = 0; i < 20; i++) {
        cartoona +=`
        <div onclick="FilterbyIngredient('${arr[i].strIngredient}')" class="item ingredient-card col-md-3 text-center">
        <i class="fa-solid fa-utensils"></i>
          <h2 class="ingredient-name">${arr[i].strIngredient}</h2>
          <p  class="ingredient-disc">${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
        </div>`;           
    }
    rowData.innerHTML =cartoona;

}




function DisplayRecipeDetails(meal){
    let ingredients=``;
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strIngredient${i}`]}</li>`
        }
    }
    let cartoona =
    `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 my-4">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
    `
    rowData.innerHTML= cartoona;


}