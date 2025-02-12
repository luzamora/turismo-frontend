// Carga los productos automáticamente al cargar la página


document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const zonaId = params.get('zonaId');
  const zonaName = params.get('zonaName'); // Nombre de la zona desde el parámetro de URL

  if (zonaId) {
    try {
      // Actualiza el título del h1 dinámicamente
      const zonaTitle = document.getElementById("zona-title");
      if (zonaName && zonaTitle) {
        zonaTitle.textContent = zonaName.toUpperCase();
      }

      // Obtiene los establecimientos para la zona seleccionada
      const establecimientos = await getEstablecimientos(zonaId);
      printEstablecimientos(establecimientos);
    } catch (error) {
      console.error("Error al cargar los establecimientos:", error);
    }
  } else {
    console.error("No se recibió zonaId en la URL");
  }
});

// Llama al endpoint para obtener los establecimientos por zona
const getEstablecimientos = async (zonaId) => {
  try {
    const response = await fetch(`http://localhost:3000/zonas/${zonaId}/establecimientos`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Ocurrió un error: ', error.message);
    throw new Error('Error al cargar los establecimientos');
  }
  throw new Error('Error en la solicitud');
};

const printEstablecimientos = (establecimientos) => {
  const container = document.querySelector(".columna-izquierda");
  container.innerHTML = ""; // Limpiamos antes de agregar nuevos

  const params = new URLSearchParams(window.location.search); // Capturar zonaId y zonaName
  const zonaId = params.get("zonaId");
  const zonaName = params.get("zonaName");

  establecimientos.forEach((establecimiento) => {
    const card = document.createElement("div");
    card.classList.add("elementos-targeta1");

    card.innerHTML = `
      <img src="${establecimiento.imagen}" alt="Imagen de ${establecimiento.name}" class="imagen-target" /> 
      <div class="contenedor-cajitas">
        <div>
          <a href="paginadetalle.html?id=${establecimiento._id}&zonaId=${zonaId}&zonaName=${encodeURIComponent(zonaName)}" style="color: #FEF7E7">
            <h3>${establecimiento.name}</h3>
          </a>
        </div>
        <div class="cajita">${establecimiento.direccion || 'Sin descripción'}</div>
        <div class="cajita">Precio: ${establecimiento.precio || 'N/A'}</div>
        <div class="cajita">Tipo: ${establecimiento.dieta || 'N/A'}</div>
      </div>
    `;
    container.appendChild(card);
  });
};


document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Llamar al endpoint de filtros para obtener los valores únicos
    const response = await fetch('http://localhost:3000/filtros');
    if (response.ok) {
      const filtros = await response.json();
      cargarFiltros(filtros);  // Función para cargar los valores en los select
    } else {
      console.error('Error al obtener los filtros');
    }

    // Aquí seguiría la lógica para cargar los establecimientos
    const params = new URLSearchParams(window.location.search);
    const zonaId = params.get('zonaId');
    const zonaName = params.get('zonaName'); // Nombre de la zona desde el parámetro de URL

    if (zonaId) {
      const zonaTitle = document.getElementById("zona-title");
      if (zonaName && zonaTitle) {
        zonaTitle.textContent = zonaName.toUpperCase();
      }

      // Obtiene los establecimientos para la zona seleccionada
      const establecimientos = await getEstablecimientos(zonaId);
      printEstablecimientos(establecimientos);
    } else {
      console.error("No se recibió zonaId en la URL");
    }
  } catch (error) {
    console.error("Error al cargar los filtros:", error);
  }
});

// Función para cargar los filtros en los select
const cargarFiltros = (filtros) => {
  const precioSelect = document.getElementById('precioSelect');
  const dietaSelect = document.getElementById('dietaSelect');
  const alergenoSelect = document.getElementById('alergenoSelect');

  // Cargar precios
  filtros.precios.forEach(precio => {
    const option = document.createElement('option');
    option.value = precio;
    option.textContent = precio;
    precioSelect.appendChild(option);
  });

  // Cargar dietas
  filtros.dietas.forEach(dieta => {
    const option = document.createElement('option');
    option.value = dieta;
    option.textContent = dieta;
    dietaSelect.appendChild(option);
  });

  // Cargar alergenos
  filtros.alergenos.forEach(alergeno => {
    const option = document.createElement('option');
    option.value = alergeno;
    option.textContent = alergeno;
    alergenoSelect.appendChild(option);
  });
};

// Añade el evento al botón de filtrar
// Evento para el botón Filtrar
document.getElementById("filterButton").addEventListener("click", async (event) => {
  event.preventDefault();  // Evitar que se recargue la página

  // Obtener los valores seleccionados en los filtros
  const precio = document.getElementById("precioSelect").value;
  const alergeno = document.getElementById("alergenoSelect").value;
  const dieta = document.getElementById("dietaSelect").value;

  // Obtener zonaId desde la URL
  const params = new URLSearchParams(window.location.search);
  const zonaId = params.get("zonaId");

  if (!zonaId) {
    console.error("❌ No se encontró zonaId en la URL");
    return;
  }

  // Construir los parámetros de consulta
  const queryParams = new URLSearchParams();
  if (precio) queryParams.append("precioId", precio);
  if (dieta) queryParams.append("dietaId", dieta);
  if (alergeno) queryParams.append("alergenosId", alergeno);

  console.log("📡 Enviando solicitud con filtros:", queryParams.toString());

  try {
    // Realizar la solicitud al servidor con los filtros
    const response = await fetch(`http://localhost:3000/zonas/${zonaId}/establecimientos?${queryParams.toString()}`);

    if (response.ok) {
      const filteredEstablecimientos = await response.json();
      console.log("✅ Establecimientos filtrados recibidos:", filteredEstablecimientos);

      // ACTUALIZA LA INTERFAZ
      printEstablecimientos(filteredEstablecimientos);

    } else {
      console.error("❌ Error al filtrar los establecimientos:", response.statusText);
    }
  } catch (error) {
    console.error("❌ Error al realizar la solicitud de filtrado:", error);
  }
});
// Función para renderizar los establecimientos

    
    // Añadir la tarjeta al contenedor









