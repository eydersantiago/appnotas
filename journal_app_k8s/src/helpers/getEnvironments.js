export const getEnvironments = () => {

    //Cargamos las variables de entorno
    import.meta.env

    //Desestructuramos del objeto las propiedades y las mandamos en un nuevo objecto
    return {
        ...import.meta.env
    }

};

