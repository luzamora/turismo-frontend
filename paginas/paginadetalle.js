document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("backButton");

    backButton.addEventListener("click", () => {
        const params = new URLSearchParams(window.location.search);
        const zonaId = params.get("zonaId");
        const zonaName = params.get("zonaName");

        if (zonaId && zonaName) {
            window.location.href = `filtros.html?zonaId=${zonaId}&zonaName=${encodeURIComponent(zonaName)}`;
        } else {
            window.location.href = "filtros.html"; // Si falta info, ir a la vista general
        }
    });
});


document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el id del establecimiento desde la URL
    const params = new URLSearchParams(window.location.search);
    const establecimientoId = params.get('id');
    
    if (establecimientoId) {
        try {
            // Llamar a la API para obtener el establecimiento por su id
            const establecimiento = await getEstablecimientoById(establecimientoId);
            
            // Llamar a la función para renderizar los detalles
            printEstablecimiento(establecimiento);
        } catch (error) {
            console.error('Error al cargar el establecimiento:', error);
        }
    } else {
        console.error('No se encontró el id del establecimiento en la URL');
    }
});

// Llama al endpoint para obtener el establecimiento por su id
const getEstablecimientoById = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/establecimientos/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('No se encontró el establecimiento');
        }
    } catch (error) {
        console.error('Error al cargar los datos del establecimiento:', error);
        throw new Error('Error al cargar los datos del establecimiento');
    }
};

// Función para imprimir la información del establecimiento
const printEstablecimiento = (establecimiento) => {
    // Título del establecimiento
    const titulo = document.getElementById('establecimiento-title');
    titulo.textContent = establecimiento.name;

    // Información del establecimiento (en el bar)
    const infoBar = document.getElementById('establecimiento-info');
    infoBar.innerHTML = `
        <div>🌱 Dieta: ${establecimiento.dieta || 'Sin información de dieta'}</div>
        <div>💸 Precio: ${establecimiento.precio || 'Sin información de precio'}</div>
        <div>📍 Dirección: ${establecimiento.direccion || 'Dirección no disponible'}</div>
        <div>📞 Teléfono: ${establecimiento.telefono || 'Sin teléfono'}</div>
        <div>🌐 <a href="${establecimiento.paginaWeb || '#'}" style="color: #fef7e7;" target="_blank">${establecimiento.paginaWeb || 'Sin sitio web'}</a></div>
    `;

    // Descripción del establecimiento
    const descriptionColumn = document.getElementById('establecimiento-description');
    descriptionColumn.innerHTML = `
        <img src="${establecimiento.imagen}" alt="Imagen de ${establecimiento.name}" class="establecimiento-image">
        <div class="text-section">
            <p>${establecimiento.descripcion || 'Sin descripción'}</p>
        </div>
    `;

    // Imágenes adicionales del establecimiento
    const imagesColumn = document.getElementById('establecimiento-images');
    imagesColumn.innerHTML = ` <img src="${establecimiento.imagen1}" alt="Imagen de ${establecimiento.name}" class="establecimiento-image">
    <img src="${establecimiento.imagen2}" alt="Imagen de ${establecimiento.name}" class="establecimiento-image">
    <div class= "map-container"> <iframe 
                    src="${establecimiento.mapa}" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe></div>`
        
};


