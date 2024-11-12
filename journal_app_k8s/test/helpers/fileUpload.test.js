import { fetch } from "whatwg-fetch";
import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: 'dqslkmm64',
    api_key: '893676196431954',
    api_secret: 'MEmXWr5dIO5SOoMotVeTf-ATkyU',
    secure: true
});

describe('Pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a Cloudinary', async () => {

        const imgUrl = 'https://reactjs.org/logo-og.png';
        const resp = await fetch(imgUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        //Eliminacion de la imagen de Cloudinary
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.png', '');

        await cloudinary.api.delete_resources(['journal/' + imageId]);
    });

    test('debe retornar null', async () => {

        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);

    });

})