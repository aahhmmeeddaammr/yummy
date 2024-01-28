let data=new Array();
async function main(){
    data= await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    let result= await data.json();
    data=result.meals;
    display_content(result.meals)
}

function display_content(dat){
    let item=``
    for(let i=0;i<dat.length;i++){
         item+=`
         <div onclick="clicked(this)" class="col-md-3 rounded-3 " data-id=${dat[i].idMeal}>
              <div data-id=${dat[i].idMeal} class="base rounded-3 position-relative" id="y">
                   <img src=${dat[i].strMealThumb} data-id=${dat[i].idMeal} class="w-100" alt="">
                   <div class="name" data-id=${dat[i].idMeal} px-3">
                        <h1 data-id=${dat[i].idMeal}>${dat[i].strMeal}</h1>
                   </div>
              </div>
         </div>
       
    `
    }
    document.getElementById('demo').innerHTML=item;
}


$('.btn').on('click',function(){
    if($('.icon').hasClass('fa-align-justify')){
        $('.icon').removeClass('fa-align-justify').addClass('fa-xmark');
        
        $('#dd').animate({width:200},500)
        $('#dd').css({'display':'flex'})
        
    }else{
        $('.icon').removeClass('fa-xmark').addClass('fa-align-justify');
        $('#dd').animate({width:0},500,function(){
            $('#dd').css({'display':'none'})
            
        })
        
    }
})

$('#search').on('click',function(){
    let content=` 
    <div class=" container d-flex justify-content-around ">
    <div class="row">
    <div class="col-md-6">
    <input type="text" onkeyup="searchByname(this.value)" placeholder="Enter Name..." id="byname" class="form-control w-100">
    </div>
    <div class="col-md-6">
    <input type="text" onkeyup="searchByFristchat(this.value)" maxlength="1" id="byfchar" placeholder="Enter frist character.." class="form-control w-100">
    </div>
    </div>
    </div>
    `
    $('.serch').css('display','block').html(content);
    $('.categ').css('display','none');
    $('.meal').css('display','flex');
    $('.area').css('display','none');
    $('.ingrad').css('display','none');
    $('.ff').css('display','none');
    $('.meal').html('');
})

$(function(){
    $('#load').fadeOut(2000)
    $('body').css('overflow','auto')
})

function c(){
    $('#item').css('display','none');
    $('.meal').css('display','flex');
    $('body').css('overflow','auto');
}

async function searchByname(val){
    let filtred=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`);
    let result=await filtred.json();
    data=result.meals
    display_content(result.meals)
}

async function searchByFristchat(val){
    let filtred=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${val}`);
    let result=await filtred.json();
    data=result.meals
    display_content(result.meals)
}


$('#Categories').on('click',function(){
    $('#item').css('display','none');
    $('.categ').css('display','flex')
    $('.serch').css('display','none');
    $('.meal').css('display','none');
    $('.area').css('display','none');
    $('.ingrad').css('display','none');
    $('.ff').css('display','none')
    get_categores();
})

async function get_categores(){
    let catgs=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let result =await catgs.json();
    display_categores(result.categories);
}


function display_categores(dat){
    $('.meal').css('display','hidden');
    
    let item=``
    let desc=new String();
    for(let i=0;i<dat.length;i++){
        desc=dat[i].strCategoryDescription;
        if(desc.length>101){
            desc=desc.slice(0,101);
        }
        item+=`
        <div class="col-md-3" data-category="${dat[i].strCategory}">
        <div class="base position-relative " data-category="${dat[i].strCategory}">
        <img src=${dat[i].strCategoryThumb} data-category="${dat[i].strCategory}" class="w-100" alt="">
        <div class=" position-absolute name text-center">
        <h6 data-category="${dat[i].strCategory}">${dat[i].strCategory}</h6>
        <p style="font-size:12px;" data-category="${dat[i].strCategory}">${desc}</p>
        </div>
        </div>
        </div>
        `
    }
    document.getElementById('catg').innerHTML=item;
}

$('.categ').on('click',function(e){
    
    if(e.target.hasAttribute('data-category')){
        let target=e.target.getAttribute('data-category');
        get_meals_by_category(target)
    }
})

async function get_meals_by_category(cat){
    let meal=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    let result=await meal.json();
    // data=result.meals
    // $('.categ').css('display','none');
    display_meals_By_cat(result.meals);
}

function display_meals_By_cat(dat){
    let item=``
    for(let i=0;i<dat.length;i++){
        item+=`
        <div onclick="clicked(this)" class="col-md-3   rounded-3" data-id=${dat[i].idMeal} id="categmeal">
        <div  data-id=${dat[i].idMeal} class="base categmeal rounded-3 position-relative" id="y">
        <img  src=${dat[i].strMealThumb} data-id=${dat[i].idMeal} class="w-100" alt="">
        <div  class="name categmeal" data-id=${dat[i].idMeal} px-3">
        <h1  data-id=${dat[i].idMeal}>${dat[i].strMeal}</h1>
        </div>
        </div>
        </div>
        
        `
    }
    document.getElementById('catg').innerHTML=item;
    $('.meal').css('display','none');
    
}

function clicked(element){
    $('.categ').css('display','none');
    $('.meal').css('display','none');
    $('.area').css('display','none');
    $('.ingrad').css('display','none');
    $('.ff').css('display','none')
    get_meal_By_id(element.getAttribute('data-id'))
}

async function get_meal_By_id(id){
    let meal=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let result=await meal.json();
    console.log(result.meals[0]);
    display_deteals(result.meals[0])
}

function display_deteals(arr){
    
    let item=``
    let tag;
    let ingrdns=new String();
    $('.serch').css('display','none');
    for(let j=1;j<=20;j++){
        let h=(`strMeasure${j}`);
        let x=(`strIngredient${j}`);
        console.log(arr[h]);
        if(arr[h] &&arr[x] && arr[x]!=' ' && arr[h]!=' '){
            ingrdns+=(`<span class="btn-danger m-1 text-decoration-none  p-2 rounded-2 text-decoration-none ">${arr[h]} ${arr[x]}</span>`)
        }
    }
    let tags=new String();
    if(arr.strTags){
        tag=arr.strTags.split(',');
        if(tag.length){
            for(let k=0;k<tag.length;k++){
                if(tag[k] &&tag[k]!='undefined' ){
                    tags+=`<span class="btn-danger m-1 text-decoration-none  p-2 rounded-2 text-decoration-none ">${tag[k]} </span>`
                }
            }
        }
    }
    item=`
    <div class="container position-relative">
    <div class="row">
    <div class="col-md-3">
    <img src=${arr.strMealThumb} class="w-100 layerimg" alt="">
    <h4 class="my-4">${arr.strMeal}</h4>
    </div>
    <div class="col-md-9">
    <h2>instraction</h2>
    
    <p>${arr.strInstructions}</p>
    <h3><span id="nada">Area:</span>${arr.strArea}</h3>
    <h3><span id="nada">category:</span>${arr.strCategory}</h3>
    <h4>Recipes :</h4>
    <div class="d-flex  flex-wrap" id="rps">
    ${ingrdns}
    </div>
    <h4>Tags :</h4>
    <div class="d-flex  flex-wrap mb-2">
    ${tags}
    </div>
    <a class=" btn  btn-danger" target="_blank" href="${arr.strYoutube}">Youtupe</a>
    <a class=" btn  btn-success" target="_blank" href="${arr.strSource}">Source</a>
    <a id="cbtn"  onclick="c()" class=" position-absolute top-0 end-0 m-auto"><i class="fa-solid  fa-2x fa-xmark text-danger "></i></a>
    </div>
    </div>
    </div>
    
    `
    document.documentElement.scrollTop=0;
    $('#item').html(item);
    $('#item').css('display','block');
}

$('#Area').on('click',function(){
    $('#item').css('display','none');
    $('.categ').css('display','none')
    $('.serch').css('display','none');
    $('.meal').css('display','none');
    $('.area').css('display','flex');
    $('.ff').css('display','none')
    get_area()
})

async function get_area(){
    let areas=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let result=await areas.json();
    console.log(result.meals);
    display_areas(result.meals)
}

function display_areas(areas){
    console.log(areas);
    let item=``;
    for(let i=0;i<areas.length;i++){
        item+=`
        <div onclick="clickarea(this)" data-area=${areas[i].strArea} class="col-md-3">
            <i class="fa-solid fa-2x fa-house-flag"></i>
            <h4>${areas[i].strArea}</h4>
        </div>
        `
    }
    $('.area').html(item).css('display','flex');
}


function clickarea(element){
    let area=element.getAttribute('data-area');
    get_meals_By_area(area);
}


async function get_meals_By_area(area){
    let meal=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    let result =await meal.json()
    display_meals_By_area(result.meals)
}

function display_meals_By_area(meals){
    let item=``;
    for(let i=0;i<meals.length;i++){
        item+=`
        <div onclick="clicked(this)" class="col-md-3   rounded-3" data-id=${meals[i].idMeal} >
        <div  data-id=${meals[i].idMeal} class="base  rounded-3 position-relative" id="y">
        <img  src=${meals[i].strMealThumb} data-id=${meals[i].idMeal} class="w-100" alt="">
        <div  class="name" data-id=${meals[i].idMeal} px-3">
        <h1  data-id=${meals[i].idMeal}>${meals[i].strMeal}</h1>
        </div>
        </div>
        </div>
        `
    }
    $('.area').html(item)
}

$('#Ingredients').on('click',function(){
    $('#item').css('display','none');
    $('.categ').css('display','none')
    $('.serch').css('display','none');
    $('.meal').css('display','none');
    $('.area').css('display','none');
    $('.ingrad').css('display','flex');
    $('.ff').css('display','none')
    get_ingredients()
})

async function get_ingredients(){
    let ingredients=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let result =await ingredients.json();
    display_ingredients(result.meals)
}

function display_ingredients(ingredients){
    console.log(ingredients);
    let item =``;
    let desc=new String();
    for(let i=0;i<24;i++){
        desc=ingredients[i].strDescription;
        if(desc && desc.length>100){
            desc=desc.slice(0,101);
        }
        item+=`
        <div data-ing=${ingredients[i].strIngredient} onclick="Ing(this)" class="col-md-3 text-center">
        <i class="fa-solid fa-2x fa-kitchen-set"></i>
        <h3>${ingredients[i].strIngredient}</h3>
        <p style="font-size:14px">${desc}</p>
   </div>
        `
    }
    $('.ingrad').html(item);
}


function Ing(element){
    let ing=element.getAttribute('data-ing');
    get_meals_by_ing(ing);
}

async function get_meals_by_ing(ing){
    let meal=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`)
    let result =await meal.json();
    display_meals_By_Ing(result.meals)
}

function display_meals_By_Ing(arr){

    let item=``;
    for(let i=0;i<arr.length;i++){
        item+=`
        <div onclick="clicked(this)" class="col-md-3   rounded-3" data-id=${arr[i].idMeal} >
        <div  data-id=${arr[i].idMeal} class="base  rounded-3 position-relative" id="y">
        <img  src=${arr[i].strMealThumb} data-id=${arr[i].idMeal} class="w-100" alt="">
        <div  class="name" data-id=${arr[i].idMeal} px-3">
        <h1  data-id=${arr[i].idMeal}>${arr[i].strMeal}</h1>
        </div>
        </div>
        </div>
        `
    }
    $('.ingrad').html(item)
}

$('#contact').on('click',function(){
    $('#item').css('display','none');
    $('.categ').css('display','none')
    $('.serch').css('display','none');
    $('.meal').css('display','none');
    $('.area').css('display','none');
    $('.ingrad').css('display','none')
    $('.ff').css('display','flex');
})

function checkname(val){
    let regx=/[A-Za-z][A-Za-z1-9!@#$%^&*()_+ ]{4,}/gm;
    if(regx.test(val)){
       $('#username').removeClass('is-invalid')
    }else{
        $('#username').addClass('is-invalid')
    }
}

function checkemail(val){
let regex=/[A-Za-z1234567890][A-Za-z1234567890!##@%#^$()*>]{3,}@[A-Za-z]{3,}.[A-za-z]{2,}/gm;
if(regex.test(val)){
    $('#useremail').removeClass('is-invalid')
}else{
    $('#useremail').addClass('is-invalid')
}
}
function checknumber(val){
    let regx=/0[0-9]{10}$/gm
    if(regx.test(val)){
    $('#userphone').removeClass('is-invalid')

    }else{
    $('#userphone').addClass('is-invalid')
    }
}

function checkage(val){
    let regex=/[1-9]{1,2}$/gm;
    if(regex.test(val)){
    $('#userage').removeClass('is-invalid')
        
    }else{
    $('#userage').addClass('is-invalid')
    }
}

function checkupper(str){
    for (var i=0; i<str.length; i++){
        if (str.charAt(i) == str.charAt(i).toUpperCase() && str.charAt(i).match(/[a-z]/i)){
          return true;
        }
      }
      return false;
}

function checkpass(val){
    let regex=/[A-Za-z0-9!@#$%^&*(*)_+]{8,}/gm;
    if(regex.test(val) && checkupper(val)){
        $('#userpass').removeClass('is-invalid')
    }else{
        $('#userpass').addClass('is-invalid')
    }
}

function checkrepass(val){
    let pass=$('#userpass').val();
    if(val==pass){
        $('#repass').removeClass('is-invalid')
    }else{
        $('#repass').addClass('is-invalid')
    }
}
main()