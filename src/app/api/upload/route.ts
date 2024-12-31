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
            region: process.env.AWS_REGION,
        });

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `${Date.now()}-${file.name}`;

        // Upload the file
        const uploadCommand = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
        });

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