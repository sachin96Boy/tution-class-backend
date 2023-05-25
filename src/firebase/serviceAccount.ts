import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';

dotenv.config();

const blobServiceClient = BlobServiceClient.fromConnectionString(`${process.env.AZURE_STORAGE_CONNECTION_STRING}`);
const containerClient = blobServiceClient.getContainerClient(`${process.env.AZURE_STORAGE_CONTAINER}`);
const blobClient = containerClient.getBlobClient(`${process.env.AZURE_STORAGE_BLOB}`);

const file:any = async () => {
    await blobClient.download().then((blobresponse) => {
        if (blobresponse._response.status == 200) {

            return blobresponse.blobBody;
        }
        return null
    });
}

export default file;

