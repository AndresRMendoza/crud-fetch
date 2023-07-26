const $inputs = document.querySelectorAll(".register-container__input[required]");//Lista de elementos que tengan la clase y que tengan el atributo "required".



const validations = () => {
    if($inputs) {//Validación, si existe el elemento.
        $inputs.forEach(element => {//por cada elemento de la lista de elementos crea un span con sus atributos y el texto que va a contener.
            const $span = document.createElement("span");
            $span.classList.add("register-container__span", "none");
            $span.setAttribute("id", element.getAttribute("name"));
            $span.textContent = element.getAttribute("title");
            element.insertAdjacentElement("afterend", $span);//Se inserta como elemento hermano el span por cada elemento de la lista de elementos.
        });
    
        document.addEventListener("keyup", (e) => {//"keyup" evento cada que deje de presionar una tecla.
            if(e.target.matches(".register-container__input[required]")) {//Si el elemento que origina el evento es igual a.
                const exreg = new RegExp(e.target.getAttribute("pattern"));//Expresion regular del elemento que origina el evento
                if(exreg.exec(e.target.value) === null && e.target.value !== "") {//El método "exec" valida si la expresion regular se cumple, si no se cumple retorna un null.
                    document.getElementById(e.target.getAttribute("name")).classList.add("is-active");//Se le asigna al span la clase "is-active".
                }else {
                    document.getElementById(e.target.getAttribute("name")).classList.remove("is-active");//Si la expresion regular se cumple remueve la clase "is-active".
                }
            }
    
    
    
        });
    }
}

export default validations;//Se exporta la función.