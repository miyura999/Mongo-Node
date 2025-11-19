// Esperar a que TODO esté cargado (incluyendo Bootstrap desde CDN)
window.addEventListener('load', function() {
    console.log('✅ Página cargada completamente');
    
    // Verificar que Bootstrap esté disponible
    if (typeof bootstrap === 'undefined') {
        console.error('❌ Bootstrap no está cargado desde el CDN');
        alert('Error: Bootstrap no se cargó correctamente. Verifica tu conexión a internet.');
        return;
    }
    
    console.log('✅ Bootstrap cargado correctamente');
    
    // Verificar que el modal existe
    const modalElement = document.getElementById('modalAlumno');
    if (!modalElement) {
        console.error('❌ No se encontró el modal con id "modalAlumno"');
        return;
    }
    
    // Inicializar el modal de Bootstrap
    const modalAlumno = new bootstrap.Modal(modalElement);
    console.log('✅ Modal inicializado');
    
    // Obtener todos los botones editar
    const botonesEditar = document.querySelectorAll('.btnEditar');
    console.log('📌 Botones editar encontrados:', botonesEditar.length);
    
    if (botonesEditar.length === 0) {
        console.warn('⚠️ No se encontraron botones con la clase "btnEditar"');
    }
    
    // Agregar evento click a cada botón editar
botonesEditar.forEach(function(boton, index) {
    boton.addEventListener('click', function(e) {
        e.preventDefault();

        const id = this.dataset.id;
        const nombre = this.dataset.nombre;
        const edad = this.dataset.edad;

        document.getElementById('id_editar').value = id;
        document.getElementById('nombre_editar').value = nombre;
        document.getElementById('edad_editar').value = edad;

        modalAlumno.show();
    });
});

    // Animación de las filas al cargar
    const rows = document.querySelectorAll('.alumno-row');
    rows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.5s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Validación de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const nombreInput = this.querySelector('input[name="nombre"], input[name="nombre_editar"]');
            const edadInput = this.querySelector('input[name="edad"], input[name="edad_editar"]');
            
            if (nombreInput && nombreInput.value.trim().length < 3) {
                e.preventDefault();
                alert('⚠️ El nombre debe tener al menos 3 caracteres');
                nombreInput.focus();
                return false;
            }
            
            if (edadInput) {
                const edad = parseInt(edadInput.value);
                if (isNaN(edad) || edad < 1 || edad > 150) {
                    e.preventDefault();
                    alert('⚠️ La edad debe estar entre 1 y 150 años');
                    edadInput.focus();
                    return false;
                }
            }
        });
    });
    
    console.log('✅ Todos los eventos configurados correctamente');
});