
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
const body = document.querySelector("body");

let articulosCarrito = [];

cargarListeners();
function cargarListeners(){
    // when you add a course press it "add car"
    listaCursos.addEventListener("click", agregarCurso);

    //remove courses from car
    carrito.addEventListener("click", eliminarCurso);

    vaciarCarritoBtn.addEventListener("click", () => {
        console.log("empty car");
        articulosCarrito = [];
        carritoHTML()
    })
}

function agregarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")){
        console.log("press on add courses");
        curso = e.target.parentElement.parentElement;
        leeDatosCurso(curso)
    }
}

function leeDatosCurso(curso){
    console.log(curso);
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("div").children[0].textContent,
        profesor: curso.querySelector("div").children[1].textContent,
        precio: curso.querySelector("div").children[3].children[0].textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad:1
    }
    //review if a element exist
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if (existe){
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
            articulosCarrito = [...cursos]
        })
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]
    }

    console.log(articulosCarrito);
    carritoHTML();
}

function carritoHTML(){
    //clean HTML
    limpiaHTML();
    //pass for car y generate HTML
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                 <a href=""#" class= "borrar-curso" data-id="${id}"> X </a>
            </td>
        `
        contenedorCarrito.appendChild(row);
    })
}

function limpiaHTML(){
    console.log(contenedorCarrito.children.length);
    // contenedorCarrito.innerHTML = "";
    // while(contenedorCarrito.children.length !== 0){
    //     contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    // }
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

function eliminarCurso(e){
    e.preventDefault();
    console.log(e.target);

    const cursoId = e.target.getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
    // console.log(articulosCarrito);
    carritoHTML()
    //console.log("from eliminarCurso");
}

