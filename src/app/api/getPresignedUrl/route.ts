
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    
    if (req.method === 'POST') {
        try {
            const { key } = await req.json();
            const response = await fetch('https://hzfxwwycqa.execute-api.us-east-2.amazonaws.com/dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ key })
            });


            const data = await response.json();
            const responseBody = JSON.parse(data.body)
            if (response.ok) {
                return NextResponse.json({ presignedUrl: responseBody.presignedUrl }, { status: 200 });
            } else {
                console.error('Error:', responseBody.error);
                return NextResponse.json({ error: responseBody.error }, { status: 500 });
            }
        } catch (error: unknown) {
            if(error instanceof Error){
                console.error('Error:', error);
                return NextResponse.json({ error: error.message }, { status: 500 });
            } else {
                console.error("Something went wrong");
            }
        }
    } else {
        return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
    }
}


