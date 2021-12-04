
document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});


function iniciarApp() {
    mostrarHeroes();
}

async function mostrarHeroes() {

    fetch("http://www.heroesappi.somee.com/api/heroes")
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(heroe => {
                html += `<div id="card">
                        
                        <div class="title">
                        <h2>${heroe.superhero}</h2>
                        <h3>${heroe.alter_ego}</h3>
                        </div>
                        <img id="img" src="${heroe.alt_img}"></img>
                        <div id="text">
                        <p>${heroe.publisher}</p>
                        <p>Primera aparición: ${heroe.first_appearance}</p>

                        
                        <p>Personajes: ${heroe.characters}</p>

                        </div>
                        
                    </div>
                    `
            });

            heroes.innerHTML = html;
        });
}


window.addEventListener('load', () => {
    registrarSW();
});

async function registrarSW() {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('./sw.js');
        } catch (error) {

        }
    }
}




