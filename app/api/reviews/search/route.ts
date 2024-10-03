// /pages/api/reviews.ts
import prisma from '@/prisma/pisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const movieName = request.nextUrl.searchParams.get("movieName") as string;
  if (!movieName) {
    return NextResponse.json({ error: 'Movie name is required' }, { status: 400 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: {
        movie: {
          name: {
            contains: movieName,
            mode: 'insensitive',
          },
        },
      },
      include: {
        movie: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
