// app/api/markers/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'default-password'

export async function GET() {
  try {
    const markers = await prisma.marker.findMany()
    return NextResponse.json(markers)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch markers' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { lat, lng, password } = await request.json()

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const marker = await prisma.marker.create({
      data: { lat, lng }
    })

    return NextResponse.json(marker)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create marker' }, { status: 500 })
  }
}