// import claudinary from 'cloudinary'
// import uploadImage from '@/modules/daybook/helpers/uploadImage'
// import axios from 'axios'

// claudinary.config({
//     cloud_name: 'dtkdrn7w2',
//     api_key: '431785464946188',
//     api_secret: 'DyqwlW5T471PjL_nINvtSvBL72w'
// })

// describe('Pruebas en el uploadImage', () => {

//     test('Debe de cargar un archivo y retornar el url', async ( ) => {

//        const {data} = await axios.get('https://res.cloudinary.com/dtkdrn7w2/image/upload/v1667599220/j1xcozb14t57ij44kimh.jpg', {
//         responseType: 'arraybuffer'
//        })

//        const file = new File([data], 'foto.jpg')

//        const url = await uploadImage(file)

//        expect( typeof url ).toBe('string')

//        const segmens = url.split('/')

//        const imageId = segmens[ segmens.length - 1].replace('.jpg', '')

//        claudinary.v2.api.delete_resources( imageId, {}, () => { done() })
    
//     });


// })