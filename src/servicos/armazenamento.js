// const aws = require('aws-sdk');

// const endpoint = new aws.Endpoint(process.env.S3_ENDPOINT);

// const s3 = new aws.S3({
//     endpoint,
//     credentials: {
//         accessKeyId: process.env.KEY_ID,
//         secretAccessKey: process.env.KEY_APP
//     }
// });

// const armazenamento = {};

// armazenamento.uploadFile = async (path, buffer, mimetype) => {
//     try {
//         const imagem = await s3.upload({
//             Bucket: process.env.BACKBLAZE_BUCKET,
//             Key: path,
//             Body: buffer,
//             ContentType: mimetype
//         }).promise();

//         return {
//             path: imagem.Key,
//             url: `https://${process.env.BACKBLAZE_BUCKET}.${process.env.S3_ENDPOINT}/${imagem.Key}`
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// armazenamento.deleteFile = async (path) => {
//     try {
//         await s3.deleteObject({
//             Bucket: process.env.BACKBLAZE_BUCKET,
//             Key: path
//         }).promise();
//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports = armazenamento;