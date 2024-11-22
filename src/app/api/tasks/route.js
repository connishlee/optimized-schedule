import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { userId } = auth();
  
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Here you would typically save to your database
    // For now, we'll just return the created task
    return NextResponse.json({ 
      ...body,
      userId,
      created: new Date().toISOString()
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}