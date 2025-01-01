import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        const s3Client = new S3Client({
            region: process.env.REGION,
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID!,
                secretAccessKey: process.env.SECRET_ACCESS_KEY!,
            },
        });

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;

        console.log("THE BUCKET NAME IS ==>", process.env.BUCKET_NAME);
        console.log("the credentials are ==> ",s3Client);

        // Upload the file
        const uploadCommand = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
        });
        console.log("Uploading file:", uploadCommand);

        await s3Client.send(uploadCommand);

        return NextResponse.json(
            { message: "File uploaded successfully", key: fileName },
            { status: 200 }
        );

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: "Error uploading file" },
            { status: 500 }
        );
    }
}