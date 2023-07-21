var varable =0

const contenedorPro = document.getElementById('products')
const skuIndi = document.querySelector("#id-cat")
const Contenedorindividual = document.querySelector(".contenedor-indi");
const textoProductos = document.querySelector(".productos-new")

stock.forEach((producto)=>{
    const div = document.createElement('div')
    div.classList.add('cuadrado')
    div.innerHTML = `
    <div class="imagen">
                    <img src="${producto.img}" alt="">
                </div>
                <div class="info-produc">
                    <div class="texto-producto">
                        <p class="nombre-producto">${producto.nombre}</p>
                        <p class="precio"><span>$</span>${producto.precio}</p>
                        </div>
                    <button id="info${producto.id}">Más información</button>
                </div>
    `
    contenedorPro.appendChild(div)

    const boton = document.getElementById(`info${producto.id}`)
    const bb = document.querySelector('.contenedor-indi')

    boton.addEventListener('click',()=>{
        pagina2(producto.id)
        bb.style.display="flex"
        contenedorPro.style.display="none"
        textoProductos.style.display="none"
        varable=2
    })
  
})

const pagina2=(producid)=>{
    const item = stock.find((prod)=> prod.id === producid)

    const infos = document.querySelector(".info-indi")
        infos.innerHTML = `
        <div class="contenedor-texto">
                <p class="id-cat">SKU:${item.id}</p>
                <p id="nombre-info">${item.nombre}</p>
            <p id="precio-info"><span>$</span>${item.precio}</p>
            <div class="caracteristicas">
                <p>Características:</p>
                <table>
                    <tbody>
                        <tr>
                            <td id="marca">Marca:</td>
                            <td><b>Vorago</b></td>
                        </tr>
                        <tr>
                            <td id="serie">Serie:</td>
                            <td><b>Slim bay</b></td>
                        </tr>
                        <tr>
                            <td id="modelo">Modelo:</td>
                            <td><b>4</b></td>
                        </tr>
                        <tr>
                            <td id="precesador">Procesador:</td>
                            <td><b>Intel Core i5 10400</b></td>
                        </tr>
                        <tr>
                            <td id="discoduro">Disco duro :</td>
                            <td><b>120 GB SSD</b></td>
                        </tr>
                        <tr>
                            <td id="memoriaram">Memoria Ram :</td>
                            <td><b>4 GB</b></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
        `

        const sliderIndi = document.querySelector(".count-uni")
        sliderIndi.innerHTML =`
        <div class="slider-btn-iz" id="btn-iz">&#60</div>
            <div class="container-slider">
                <div class="slider" id="slider">
                    <div class="slider-section">
                        <img src="${item.img}" alt="" class="slider-img">
                    </div>
                    <div class="slider-section">
                        <img src="${item.img2}" alt="" class="slider-img">
                    </div>
                    <div class="slider-section">
                        <img src="${item.img3}" alt="" class="slider-img">
                    </div>
                </div>
            </div>
            <div class="slider-btn-dere" id="btn-dere">&#62</div>
        `

         //    slider

         const slider = document.querySelector("#slider");
         let sliderSection = document.querySelectorAll(".slider-section");
         let sliderSectionLast = sliderSection[sliderSection.length -1];
         
         const btnLeft = document.querySelector("#btn-iz")
         const btnRight = document.querySelector("#btn-dere")
         
         slider.insertAdjacentElement("afterbegin", sliderSectionLast);
         slider.style.marginLeft="-100%";
         
         function next() {
             let sliderSectionFirst = document.querySelectorAll(".slider-section")[0];
             slider.style.marginLeft="-200%";
             slider.style.transition="all 0.5s";
             setTimeout(function(){
                 slider.style.transition="none";
                 slider.insertAdjacentElement("beforeend", sliderSectionFirst);
                 slider.style.marginLeft="-100%";
             }, 500)
         }
         
         function Prev() {
             let sliderSection = document.querySelectorAll(".slider-section");
             let sliderSectionLast = sliderSection[sliderSection.length -1];
             slider.style.marginLeft="0%";
             slider.style.transition="all 0.5s";
             setTimeout(function(){
                 slider.style.transition="none"
                 slider.insertAdjacentElement("afterbegin", sliderSectionLast);
                 slider.style.marginLeft="-100%"
             }, 500)
         }
         
         btnRight.addEventListener("click", function(){
             next()
         })
         
         btnLeft.addEventListener("click", function(){
             Prev()
         })
         
}
    