// import axios from 'axios';

// export const fileUpload = async (file) => {
//   if (!file) return null;

//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     // Configura la URL del API para la carga del archivo
//     const JOURNAL_API_URL = "http://localhost:4002/journal";
//     const cloudUrl = `${JOURNAL_API_URL}/uploadFile`;

//     // Realiza la solicitud POST utilizando axios
//     const resp = await axios.post(cloudUrl, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data', // Encabezado necesario para archivos
//       },
//     });

//     // Revisa si la respuesta es correcta y devuelve la URL segura
//     if (resp.status === 200 && resp.data && resp.data.secure_url) {
//       console.log("🚀 ~ fileUpload ~ resp:", resp);
//       return resp.data.secure_url;  // Retorna la URL segura del archivo
//     } else {
//       throw new Error('No se pudo obtener la URL de la imagen');
//     }
//   } catch (error) {
//     console.error("Error en la carga del archivo:", error);
//     return null;
//   }
// };



export const fileUpload = async (file) => {

    if (!file) return null;

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dqslkmm64/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    const fetchOptions = {
        method: 'POST',
        body: formData
    }

    try {

        const resp = await fetch(cloudUrl, fetchOptions);

        if (!resp.ok) throw new Error('No se pudo subir la imagen');

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error) {
        /*  console.log(error);
         throw new Error(error.message); */
        return null;
    }
}
