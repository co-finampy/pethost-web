import { api } from "./api-client";


type UploadRespose = void;
export async function uploadImageS3Client(file: File, token: string): Promise<UploadRespose> {
    console.log('file', file)
   await api.post(`v1/s3/upload/${process.env.BUCKET_NAME}`, {
    json: {
      file
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}