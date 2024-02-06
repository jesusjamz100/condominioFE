
const formatearFecha = fecha => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat('es-VE', {dateStyle: 'long'}).format(nuevaFecha);
};

export default formatearFecha;