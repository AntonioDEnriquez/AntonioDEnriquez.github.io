

const heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: '',
    alt_img: '',

}

document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});


function iniciarApp() {
    superHeroe();
    alterEgo();
    Aparicion();
    Characters();
    Characters();
    Image();
}


function superHeroe() {
    const superheroe = document.querySelector('#superhero');
    superheroe.addEventListener('input', event => {
        const superheroetext = event.target.value.trim();
        // Validacion de que nombreTexto de tner algo
        if (superheroetext === '' || superheroetext.length < 3) {
            mostrarAlerta('Entrada no valida', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
            heroe.superhero = superheroetext;
        }
    })
}

function alterEgo() {
    const alterego = document.querySelector('#alterEgo');
    alterego.addEventListener('input', event => {
        const alteregotext = event.target.value.trim();

        if (alteregotext === '' || alteregotext.length < 3) {
            mostrarAlerta('Entrada no valida', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
            heroe.alter_ego = alteregotext;

        }
    })
}

function Aparicion() {
    const aparicion = document.querySelector('#primeraaparicion');
    aparicion.addEventListener('input', event => {
        const apariciontext = event.target.value.trim();

        if (apariciontext === '' || apariciontext.length < 3) {
            mostrarAlerta('Entrada no valida', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
            heroe.first_appearance = apariciontext;
        }
    })
}

function Characters() {
    const personajes = document.querySelector('#personajes');
    personajes.addEventListener('input', event => {
        const personajestext = event.target.value.trim();

        if (personajestext === '' || personajestext.length < 3) {
            mostrarAlerta('Entrada no valida', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
            heroe.characters = personajestext;
        }
    })
}

function Image() {
    const image = document.querySelector('#fotourl');
    image.addEventListener('input', event => {
        const imagetext = event.target.value.trim();

        if (imagetext === '' || imagetext.length < 3) {
            mostrarAlerta('Entrada no valida', 'error');
        } else {
            const alerta = document.querySelector('.alerta');
            if (alerta) {
                alerta.remove();
            }
            let imagen = '';
            imagen += `
            <img id="img" src="${imagetext}"></img>
            `
            img.innerHTML = imagen;
            heroe.alt_img = imagetext;
        }
    })
}

function Send() {

    const creador = document.querySelector('#creador');

    let creadortext = creador.value;

    if (creadortext === null) {
        mostrarAlerta('Entrada no valida', 'error');
    } else {
        const alerta = document.querySelector('.alerta');
        if (alerta) {
            alerta.remove();
        }
        heroe.publisher = creadortext;
    }

    const url = 'https://www.heroesappi.somee.com/api/heroes';

    if (heroe.superhero === '' || heroe.alt_img === '' || heroe.alter_ego === '' || heroe.characters === '' || heroe.publisher === ''
        || heroe.first_appearance === '') {
        mostrarAlerta('El formulario debe de estar completo', 'error')
    } else {
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(heroe), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                console.log('Success:', response);
                alert('Héroe Registrado!!')
            });
    }

}


function mostrarAlerta(mensaje, tipo) {

    // Si hay una alerta previa, entonces no crear otra
    const alertaPrevia = document.querySelector('.alerta');

    if (alertaPrevia) {
        // Dtecta una alerta previa, detecta el return y la funcion deja de ejecutarse
        return;
    }

    const alerta = document.createElement('DIV');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');

    if (tipo === 'error') {
        alerta.classList.add('error');
    }

    // Insertar en el HTML
    const formulario = document.querySelector('#fields');
    formulario.appendChild(alerta);

    // Eliminar la alerta despues de 3 segundo
    setTimeout(() => {
        alerta.remove();
    }, 3000);
}







