const $fragment = document.createDocumentFragment();
const $formPost = document.querySelector(".register-container__form");
const $formPut = document.querySelector(".modal-container__form");
const $formSubmitModal = document.querySelector(".modal-container__submit");
const $table = document.querySelector(".lawyers-container__table");
const $tbody = document.querySelector(".lawyers-container__tbody");
const $modal = document.querySelector(".modal");
let aux = 0;
let jsonArray = [];

const httpsRequest = async (e) => {
    if($table) {// Validación, si existe el elemento hace la petición GET.
        try{
            // HTTPS: GET
            /*Se hace la petición mediante el método global de Fetch y se bloquea el código con await hasta que retorne la petición,
            se hace la conversión de la petición a formato json y bloqueo el código con await hasta que termine de hacerlo.*/
            let request = await fetch("http://localhost:3000/abogados");
            let json = await request.json();
    
            /*Si la propiedad "ok" en la promesa asignada a la variable request es falsa, entonces, habrá una excepcion
            la cual va a retornar un objeto con los atributos status y request
            los cuales van a tener como valor el status de la petición y el texto que devuelva como mensaje,
            esto hace que se rompa el try y pase al catch.*/
            if(!request.ok) throw {status: request.status, statusText: request.statusText}; 
    
            /*Los datos convertidos a JSON vienen en una estructura de 
            arreglo de objetos, estos son convertidos a un arreglo de arreglos para su manejo en el DOM.
            Los objetos son convertidos en arreglos mediante el método "values" del constructor Object."*/
            for(let i = 0; i < json.length; i++) {//
                jsonArray[i] = Object.values(json[i]);
                
            }     
    
            for(let i = 0; i < jsonArray.length; i++) {
                const $tr = document.createElement("tr");//Se crea un elemento tr y se le da la clase correspondiente.
                $tr.setAttribute("class", "lawyers-container__tr");
    
                for(let j = 0; j < jsonArray[i].length + 1; j++) {
                    const $td = document.createElement("td");//Se crea un elemento td, se le asigna la clase correspondiente y se le inserta contenido.
                    $td.setAttribute("class", "lawyers-container__td");
                    $td.textContent = jsonArray[i][j];
                    if(aux === 0) {//Si aux es igual a 0 significa que se está insertando el ID.
                        $td.setAttribute("data-td", "Id: ");
                    }else if(aux === 1) {//Si aux es igual a 1 significa que se está insertando el Nombre.
                        $td.setAttribute("data-td", "Nombre: ");
                    }else if(aux === 2) {//Si aux es igual a 2 significa que se está insertando el Apellido paterno.
                        $td.setAttribute("data-td", "Apellido paterno: ");
                    }else if(aux === 3) {//Si aux es igual a 3 significa que se está insertando el Apellido materno.
                        $td.setAttribute("data-td", "Apellido materno: ");
                    }else if(aux === 4) {//Si aux es igual a 4 significa que se está insertando el Puesto.
                        $td.setAttribute("data-td", "Puesto: ");
                    }else if(aux === 5) {//Si aux es igual a 5 significa que se insertan 2 botones .
                        $td.classList.add("lawyers-container__td--grid");
    
                        const $btnM = document.createElement("button");
                        $btnM.setAttribute("class", "lawyers-container__btn");
                        $btnM.setAttribute("data-id", jsonArray[i][0]);
                        $btnM.textContent = "Modificar";
    
                        const $btnE = document.createElement("button");
                        $btnE.setAttribute("class", "lawyers-container__btn--delete");
                        $btnE.setAttribute("data-id", jsonArray[i][0]);
                        $btnE.textContent = "Eliminar";
    
                        $td.appendChild($btnM);
                        $td.appendChild($btnE);
                    }
    
                    aux++;//Itera uno más.
                    $tr.appendChild($td);//se le inserta al elemento tr los elementos td.
                }

                aux = 0;//Se recetea la variable auxiliar.
                $fragment.appendChild($tr);//Se insertan los tr al fragmento.
            }
            $tbody.appendChild($fragment);//Se inserta el fragmento al DOM.
            
        }catch(err) {//Manejo del error, catch recibe como parametro lo devuelto con la excepcion "throw".
            let message = err.statusText || `Ocurrió un error ${err.status}.`
            const $lp = document.createElement("p");
            $lp.setAttribute("class", "lawyers-container__p");
            $lp.textContent = message;
            $table.classList.add("none");
            $table.insertAdjacentElement("afterend", $lp);
            /*La variable message es igual a un operador corto circuito, si lo que hay en "err.statusText" está vacío
            entonces la variable es igual a la segunda opción.
            La tabla es escondida, se le inserta contenido al parrafo en el DOM y se le remueve la clase none.*/
        }
    }

    document.addEventListener("submit", async (e) => {
        //HTTPS: POST
        if(e.target === $formPost) {
            e.preventDefault();//Se remueve el evento por defecto "submit".
            try {
                /*Se crea el objeto el cual se va a pasar como parametro, dicho objeto tendrá los atributos 
                method, el cual describe el método por el cual se hará la peticón,
                headers, el cual es un objeto que tendrá como atributos meta datos los cuales decriben información de la petición,
                body, es donde colocamos información adicinal que vamos a envíar al servidor,o sea, los datos que vamos a mandar en la petición.*/
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        id: "",
                        nombre: e.target.nombre.value,
                        apellido_paterno: e.target.apellidoP.value,
                        apellido_materno: e.target.apellidoM.value,
                        puesto: e.target.puesto.value 
                    })
                }

                //Se hace la petición mediante el método global de Fetch y se bloquea el código con await hasta que retorne la petición.
                let request = await fetch("http://localhost:3000/abogados", options);

                /*Si la propiedad "ok" en la promesa asignada a la variable request es falsa, entonces, habrá una excepcion
                la cual va a retornar un objeto con los atributos status y request
                los cuales van a tener como valor el status de la petición y el texto que devuelva como mensaje,
                esto hace que se rompa el try y pase al catch.*/
                if(!request.ok) throw {status: request.status, statusText: request.statusText};
                location.reload();//Reiniciamos la página.

            }catch(err) {//Manejo del error, catch recibe como parametro lo devuelto con la excepcion "throw".
                let message = err.statusText || `Ocurrió un error ${err.status} :c`;//Se le asigna a la variable "message" un mensaje de error.
                const $rp = document.createElement("p");//Se crea un elemento p.
                $rp.setAttribute("class", "register-container__p");//Se le asgina una clase.
                $rp.textContent = message;//Se le inserta contenido al elemento.
                $formPost.insertAdjacentElement("afterend", $rp);//Se inserta el elemento al final del elemento ""rp".
            }
        } 

        if(e.target === $formPut) {
            //HTTPS: PUT
            e.preventDefault();//Se remueve el evento por defecto "submit".
            try{
                /*Se crea el objeto el cual se va a pasar como parametro, dicho objeto tendrá los atributos 
                method, el cual describe el método por el cual se hará la peticón,
                headers, el cual es un objeto que tendrá como atributos meta datos los cuales decriben información de la petición,
                body, es donde colocamos información adicinal que vamos a envíar al servidor,o sea, los datos que vamos a mandar en la petición.*/
                let options = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        id: "",
                        nombre: e.target.nombre.value,
                        apellido_paterno: e.target.apellidoP.value,
                        apellido_materno: e.target.apellidoM.value,
                        puesto: e.target.puesto.value
                    })
                }
                //Se hace la petición mediante el método global de Fetch y se bloquea el código con await hasta que retorne la petición.
                let request = await fetch(`http://localhost:3000/abogados/${e.target.submit.dataset.id}`, options);

                /*Si la propiedad "ok" en la promesa asignada a la variable request es falsa, entonces, habrá una excepcion
                la cual va a retornar un objeto con los atributos status y request
                los cuales van a tener como valor el status de la petición y el texto que devuelva como mensaje,
                esto hace que se rompa el try y pase al catch.*/
                if(!request.ok) throw {status: request.status, statusText: request.statusText};
                location.reload();//Reiniciamos la página.

            }catch(err) {//Manejo del error, catch recibe como parametro lo devuelto con la excepcion "throw".
                let message = err.statusText || `Ocurrió un error ${err.status}`;//Se le asigna a la variable "message" un mensaje de error.
                alert(message);//Se le pasa al método alert como parametro la variable message.
            }
        }
    });

    document.addEventListener("click", async e => {
        //HTTPS: DELETE
        if(e.target.matches(".lawyers-container__btn--delete")) {//Si el elemento que origina el evento es igual al selector CSS valida a true.
            //Se le asigna a la variable el método confirm el cual tendrá como valor true o false dependiendo la respuesta del usuario.
            let isDelete = confirm(`¿Estás seguro de que deseas eliminar el id ${e.target.dataset.id}?`);

            if(isDelete) {//Valida si la variable "isDelete" es igual a true.
                try {
                    /*Se crea el objeto el cual se va a pasar como parametro, dicho objeto tendrá los atributos 
                    method, el cual describe el método por el cual se hará la peticón,
                    headers, el cual es un objeto que tendrá como atributos meta datos los cuales decriben información de la petición.*/
                    let options = {
                        method: "DELETE",
                        headers: {
                            "Content-type": "application/json; charset=utf-8"
                        }
                    }
                    
                    //Se hace la petición mediante el método global de Fetch y se bloquea el código con await hasta que retorne la petición.
                    let request = await fetch(`http://localhost:3000/abogado/${e.target.dataset.id}`, options);
    
                    /*Si la propiedad "ok" en la promesa asignada a la variable request es falsa, entonces, habrá una excepcion
                    la cual va a retornar un objeto con los atributos status y request
                    los cuales van a tener como valor el status de la petición y el texto que devuelva como mensaje,
                    esto hace que se rompa el try y pase al catch.*/
                    if(!request.ok) throw {status: request.status, statusText: request.statusText};
                    location.reload();//Reiniciamos la página.
    
                }catch(err) {//Manejo del error, catch recibe como parametro lo devuelto con la excepcion "throw".
                    let message =`Ocurrió un error ${err.status}`;//Se le asigna a la variable "message" un mensaje de error.
                    alert(message);//Se le pasa al método alert como parametro la variable message.
                }
            }
        }

        if(e.target.matches(".lawyers-container__btn")) {
            //Mostrar modal.
            $modal.classList.add("show");
            $formSubmitModal.setAttribute("data-id", e.target.dataset.id);

        }

        if(e.target.matches(".modal-container__btn")) {
            //Ocultar modal.
            $modal.classList.remove("show");
            $formPut.reset();
        }

    });
    
}

export default httpsRequest;//Se exporta la función.