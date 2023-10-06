const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const session = await prisma.session.create({
    data: {
      expirationDate: new Date(),
      user: {
        create: {
          username: "john",
          name: "John Doe",
          email: "john@example.com"
        },
      },
    },
    select: {
      id: true,
      userId: true,
    },
  })
  console.log({ session })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })