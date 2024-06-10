
import { NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer"

type ResponseData = {
 url: string,
}

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  },
  region: process.env.AWS_REGION,
});

export async function GET(): Promise<any> {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: 'videos/IMG_4947.MOV',
    });
    const key = 'video';
    const url = `https://d2takpj11obvfi.cloudfront.net/videos/${key}`;
    const signedUrl = getSignedUrl({
      keyPairId: process.env!.CLOUDFRONT_KEYPAIR_ID ?? '',
      privateKey: process.env!.CLOUDFRONT_PRIVATE_KEY ?? '',
      url,
      dateLessThan: new Date( Date.now() + (1000 /*sec*/ * 60)).toISOString()
    })
    

    return new NextResponse(signedUrl)
  } catch (error) {
    console.error('Error fetching image from S3:', error);
    return new NextResponse('Error fetching image from S3');
  }
}