//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var comments= []

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {if (resultObj.status=== "ok"){
        showproductsinfo(resultObj.data);
    }})    
});

function showproductsinfo(info){

    let htmlContentToAppend = "";

                htmlContentToAppend += `
                <div class="onix">
                    <h1 class="mb-2">`+ info.name +`</h1>
                </div>

                <div class="entire-content">
                 <div class="content-carrousel">
                    <figure class="shadow"><img src="` +  info.images[0] + `" alt=""></figure>
                    <figure class="shadow"><img src="` +  info.images[1] + `" alt=""></figure>
                    <figure class="shadow"><img src="` +  info.images[2] + `" alt=""></figure>
                    <figure class="shadow"><img src="` +  info.images[3] + `" alt=""></figure>
                    <figure class="shadow"><img src="` +  info.images[4] + `" alt=""></figure>
                  </div>
                 </div>

                    <div class="col">
                        <div class="costcu d-flex w-100 justify-content-between">
                        <h5 class="mb-1">`+" " +`</h5>
                        <h5 class="precio">`+ info.cost + info.currency +`</h5>
                        </div>
                        <p class="mb-1 text-success small text-right">` + info.soldCount + " unidades venidas" +`</p>
                        <br>
                    </div>
                </div>
                <div class="descripcion">
                        <p>` + info.description +`</p>
                        </div>
            
            `
        document.getElementById("productsinfo-container").innerHTML = htmlContentToAppend;
        
};




getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {if (resultObj.status=== "ok"){
    comentariosShow(resultObj.data);
}});

function comentariosShow (coments){
    let htmlContentToAppend = "";
    for (let i = coments.length - 1; i >= 0; i-- ){
        let coment = coments[i];
    htmlContentToAppend += `
        <div class="comentario">
        <p class="mb-2">`+"Usuario:" +" " + coment.user + "   " +  drawStars(coment.score) +`</p>
        <p class="descrip">`+ coment.description+`</p>
        <p>`+ coment.dateTime +`</p>
        <br>
        <hr>
        </div>
`
document.getElementById("comentarios").innerHTML = htmlContentToAppend;

};

};
function drawStars(stars){

    let number = parseInt(stars);
    let html ="";
    for(let i =1; i<= number; i++){
        html += `<span class="fa fa-star checked"></span>`
    }
    for(let j=number+1; j<=5; j++){
        html += `<span class="fa fa-star"></span>`
    }
    return html;
}


