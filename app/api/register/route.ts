import { NextResponse } from 'next/server'
import { registerSchema } from '@/lib/schemas/register'
import { prisma } from '@/lib/db'
import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth/next'
import { getZodFieldErrors } from '@/lib/utils/getZodFieldErrors'

export async function POST(req: Request) {
  const body = await req.json()

  const schema = registerSchema.safeParse(body)

  if (!schema.success) {
    return NextResponse.json({ message: 'Kullanıcı kaydı oluşturulamadı.', errors: getZodFieldErrors(schema.error) })
  }

  const { firstName, lastName, email, phoneNumber, password } = schema.data

  //! BURADA RATELİMİT YAPMAK LAZIM DAHA SONRA
  //! OTURUM AÇIKSA HATA FALAN

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    },
  })

  if (!user) {
    return NextResponse.json({ message: 'Kullanıcı kaydı oluşturulamadı.' })
  }

  return NextResponse.json({ message: 'Kullanıcı kaydı oluşturuldu.' })
}