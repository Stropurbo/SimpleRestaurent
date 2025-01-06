let allsearchProduct = [];

const allProducts = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .then(res => res.json())
        .then( data => {
            allsearchProduct = data.drinks
            displayProduct(allsearchProduct);
        })
        .catch( (error) => {
            console.log(error);
        } )
        
}

const displayProduct = (products) => {
    let productContainer = document.getElementById("productContainer");
    let noResult = document.getElementById("noResult");
    productContainer.innerHTML = ' ';

    if(products.length == false){
        noResult.style.display = 'flex';
    }else{
        noResult.style.display = 'none';

        products.forEach(productData => {
            const div = document.createElement('div');
            div.classList.add('ProductItemCard')
    
            const fullStars = Math.floor(productData.rating); 
            const emptyStars = 5 - fullStars; 
            const stars = '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
            // <div class="rating" style="color: black; font-size: 1.2em;">${stars}  ${productData.rating}</div>

            // <p class="card-text itemPrice">$${productData.price}</p>

            div.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${productData.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${productData.strGlass}</h5>
                      
                <p >Category: ${productData.strCategory}</p>
                <p >${productData.strInstructions.slice(0,50)}</p>                
             
                <div class = "cartAndDetails">
                
                <a onclick= "addtocart(' ${productData.strGlass}', '${productData.strDrinkThumb}' )" class="btn btn-primary">Add to Cart</a>
                <a id= "detailPopupModal" onclick = "productDetails(${productData.idDrink})" class="btn btn-secondary" > Details</a>
                </div>
    
            </div>
            </div>  
            `
            productContainer.appendChild(div)    
        });
    }   
};


document.getElementById("searchButton").addEventListener('click', (event) => {
    event.preventDefault();
    
    let query = document.getElementById("searchInput").value.toLowerCase();
    let filterProduct = allsearchProduct.filter((product) => {
        return product.strGlass.toLowerCase().includes(query);
    });
    
    displayProduct(filterProduct)
});


let serial = 1;
let total = 0
const maxadd = 6;

const addtocart = (title, images) => {

    
    const cartCount = document.getElementById("cartCount").innerText;
    let cartNum = parseInt(cartCount);
    if(cartNum > maxadd){
        alert("You can't add ")
        return;
    }
    cartNum ++;    
    document.getElementById("cartCount").innerText = cartNum

    let container = document.getElementById("cartTvContainer");

    let div = document.createElement('div');
    div.innerHTML = `
    <div class = "serial">
    <p> <span id="sl">${serial}</span></P>
    <img class = "cartImage" src="${images}" class="card-img-top" alt="...">
    <p> ${title.slice(0,10)}</p>
    </div>   
   
    `
    container.appendChild(div);
    serial ++;
    // total += price;
    // totalPrice();
}

const detailPopupModal = (product) => {
    let modal = document.querySelector(".modal");
    let modalTitle = document.querySelector('.modal-title');
    let modalDes = document.querySelector('.modal-body')

    modalTitle.innerText = product.strGlass;
    modalDes.innerHTML = `
    <div class = "mainDiv"> 
    <div> 
     <img src="${product.strDrinkThumb}" class="cardImages" alt="Drinks Images">
    </div>

        <h5 class = "details"> Details </h5>
        <div class="card-body">
        <p>Category: <span  class="alco">${product.strCategory}</span> </p>           
             <p>Alcoholic: <span class="alco">${product.strAlcoholic}</span> </p>
            <hr>
            <p >${product.strInstructions}</p>      
        </div> 
    </div>
              
    `
    modal.style.display = 'block';
}
const productDetails = (id) => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {        
        detailPopupModal(data.drinks[0]);
    })
}

document.querySelector('.btn-close').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

document.querySelector('.btn-secondary').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});



// const totalPrice = () => {
//      let allprice = document.getElementsByClassName("prices");
//      let count = 0;
    
//      for(let elemet of allprice){
//          count = count + parseFloat(elemet.innerText);
//      }
//     document.getElementById("totalSpan").innerText = total.toFixed(2)
// }






allProducts()