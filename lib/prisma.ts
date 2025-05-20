/**
 * Prisma Client
 * 
 * This file exports a singleton instance of the Prisma client
 * to be used throughout the application.
 */
import { PrismaClient } from '@prisma/client'

// Add prisma to the global type
declare global {
  var prisma: PrismaClient | undefined
}

// Create a singleton instance of the Prisma client
const prisma = global.prisma || new PrismaClient()

// In development, attach the client to the global object to prevent
// multiple instances during hot reloading
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma
