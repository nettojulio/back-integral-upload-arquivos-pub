const aws = require('aws-sdk');

const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');
const s3 = new aws.S3({
    endpoint: spacesEndpoint,
    accessKeyId: process.env.SPACES_KEY,
    secretAccessKey: process.env.SPACES_SECRET
});

async function sendFile(name, image) {
    return await s3.putObject({
        Bucket: process.env.SPACES_BUCKET,
        Key: name,
        Body: image,
        ACL: "public-read"
    }).promise();
}

async function deleteFile(name) {
    return await s3.deleteObject({
        Bucket: process.env.SPACES_BUCKET,
        Key: name
    }).promise();
}

function fullURL(nome) {
    return `https://${process.env.SPACES_BUCKET}.${spacesEndpoint.host}/${nome}`
}

module.exports = { sendFile, deleteFile, fullURL };
