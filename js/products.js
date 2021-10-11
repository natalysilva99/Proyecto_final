const ORDER_ASC_BY_PRECIO = "Menor Precio";//cambie el nombre de la variable y del string
const ORDER_DESC_BY_PRECIO = "Mayor Precio";//cambie el nombre de la variable y del string
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductosArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProductos(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRECIO)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }//cambie name por cost
            if ( a.cost > b.cost ){ return 1; }//cambie name por cost
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRECIO){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }//cambie name por cost
            if ( a.cost < b.cost ){ return 1; }//cambie name por cost
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductosList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductosArray.length; i++){
        let products = currentProductosArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.soldCount) >= minCount)) &&//cambie productCount por soldCount
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.soldCount) <= maxCount))){//cambie productCount por soldCount
                
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img id="imagen-auto" src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name +`</h4>
                            <h5 class="mb-1">`+ products.cost + products.currency +`</h5>
                        </div>
                        <p class="mb-1">` + products.description + `</p>
                        <p class="mb-1 text-success small text-right">` + products.soldCount + " productos venidos" +`</p>
                        
                    </div>
                </div>
            </a>
            `
        }
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProductos(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductosArray = productsArray;
    }

    currentProductosArray = sortProductos(currentSortCriteria, currentProductosArray);

    //Muestro las categorías ordenadas
    showProductosList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProductos(ORDER_ASC_BY_PRECIO, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProductos(ORDER_ASC_BY_PRECIO);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProductos(ORDER_DESC_BY_PRECIO);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProductos(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductosList();
    });

});

//De aca en adelante es el filtro de precio por minimo y maximo. 
//duplique las primeras dos funciones originales 
//cambie el nombre de las funciones 
//cambiando soldCount por cost para que el filtro sea por precio y no por relevancia

function showProductosList2(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductosArray.length; i++){
        let products = currentProductosArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&//cambie productCount por cost
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){//cambie productCount por cost
                
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img id="imagen-auto" src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1  text-dark" >`+ products.name +`</h4>
                            <h5 class="mb-1">`+ products.cost + products.currency +`</h5>
                        </div>
                        <p class="mb-1">` + products.description + `</p>
                        <p class="mb-1 text-success small text-right">` + products.soldCount + " productos venidos" +`</p>

                        
                    </div>
                </div>
            </a>
            `
        }
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;}}

        function sortAndShowProductos(sortCriteria, productsArray){
            currentSortCriteria = sortCriteria;
        
            if(productsArray != undefined){
                currentProductosArray = productsArray;
            }
        
            currentProductosArray = sortProductos(currentSortCriteria, currentProductosArray);
        
            //Muestro las categorías ordenadas
            showProductosList2();}

            document.getElementById("rangeFilterCount").addEventListener("click", function(){
                //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
                //de productos por categoría.
                minCount = document.getElementById("rangeFilterCountMin").value;
                maxCount = document.getElementById("rangeFilterCountMax").value;
        
                if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                    minCount = parseInt(minCount);
                }
                else{
                    minCount = undefined;
                }
        
                if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                    maxCount = parseInt(maxCount);
                }
                else{
                    maxCount = undefined;
                }
        
                showProductosList2();
            });

