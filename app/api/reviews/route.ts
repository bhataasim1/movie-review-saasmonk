import prisma from '@/prisma/pisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") as string;
  try {
    const reviews = await prisma.review.findMany({
      where: {
        movieId: id,
      },
      include: {
        movie: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const review = await prisma.review.create({
      data: {
        movieId: body.movieId,
        reviewerName: body.reviewerName || null,
        rating: body.rating,
        comments: body.comments,
      },
      include: {
        movie: true,
      },
    })
    return NextResponse.json(review)
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// delete review
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") as string;
  try {
    await prisma.review.delete({
      where: {
        id,
      },
    })
    return NextResponse.json({ id })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// update review
export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") as string;
  try {
    const body = await request.json()
    const updatedReview = await prisma.review.update({
      where: {
        id,
      },
      data: {
        rating: (body.rating).toString(),
        comments: body.comments,
      },
      include: {
        movie: true,
      },
    })
    return NextResponse.json(updatedReview)
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}