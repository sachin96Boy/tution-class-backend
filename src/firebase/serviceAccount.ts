import { BlobServiceClient } from '@azure/storage-blob';

import dotenv from 'dotenv';

dotenv.config();

async function fetchServiceAccount() {
    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(`${process.env.AZURE_STORAGE_CONNECTION_STRING}`);
        const containerClient = blobServiceClient.getContainerClient(`${process.env.AZURE_STORAGE_CONTAINER}`);
        const blobClient = containerClient.getBlockBlobClient(`${process.env.AZURE_STORAGE_BLOB}`);

        const downloadResponse = await blobClient.download();
        const blobContents = await streamToBuffer(downloadResponse.readableStreamBody as NodeJS.ReadableStream);
        
        const serviceAccount : object = JSON.parse(blobContents.toString());
        console.log(serviceAccount);

        return serviceAccount;
    } catch (err) {
        console.log('error on fetchserviceaccount: ', err);
    }


}

async function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {

    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        stream.on('data', (chunk: any) => chunks.push(chunk));
        stream.on('error', (error: Error) => reject(error));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

export default fetchServiceAccount;



