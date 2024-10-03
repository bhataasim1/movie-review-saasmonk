import prisma from '@/prisma/pisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const movies = await prisma.movie.findMany({
    include: {
      reviews: {
        select: {
          rating: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const moviesWithAvgRating = movies.map((movie) => {
    const totalRating = movie.reviews.reduce((acc, review) => acc + Number(review.rating), 0);
    const averageRating = movie.reviews.length > 0 
      ? totalRating / movie.reviews.length 
      : null;

    return {
      ...movie,
      averageRating: averageRating !== null ? Number(averageRating).toFixed(2) : null,
      reviews: undefined,
    };
  });

  return NextResponse.json(moviesWithAvgRating);
}

export async function POST(request: Request) {
  const body = await request.json()
  const movie = await prisma.movie.create({
    data: {
      name: body.name,
      releaseDate: body.releaseDate,
    },
  })
  return NextResponse.json(movie)
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") as string;
  const body = await request.json()
  const movie = await prisma.movie.update({
    where: { id },
    data: {
      name: body.name,
      releaseDate: body.releaseDate,
    },
  })
  return NextResponse.json(movie)
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") as string;
  const movie = await prisma.movie.delete({
    where: { 
      id: id as string
     },
    include: {
      reviews: true,
    },
  })
  return NextResponse.json(movie)
}