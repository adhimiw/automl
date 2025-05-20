import { createClient } from "redis"
import { serverEnv } from "./env"

// Create Redis client using environment variables
const client = createClient({
  url: serverEnv.redis.url,
})

client.on("error", (err) => {
  console.error("Redis client error", err)
})

// Connect to Redis
async function connect() {
  if (!client.isOpen) {
    await client.connect()
    console.log("Connected to Redis")
  }
  return client
}

// Get a value from Redis
async function get(key: string) {
  const redis = await connect()
  return redis.get(key)
}

// Set a value in Redis with optional expiration
async function set(key: string, value: string, expireSeconds: number | null = null) {
  const redis = await connect()
  if (expireSeconds) {
    return redis.set(key, value, { EX: expireSeconds })
  }
  return redis.set(key, value)
}

// Delete a key from Redis
async function del(key: string) {
  const redis = await connect()
  return redis.del(key)
}

// Store a job in Redis
async function storeJob(jobId: string, jobData: any, expireSeconds = 3600) {
  const redis = await connect()
  return redis.set(`job:${jobId}`, JSON.stringify(jobData), { EX: expireSeconds })
}

// Get a job from Redis
async function getJob(jobId: string) {
  const redis = await connect()
  const jobData = await redis.get(`job:${jobId}`)
  return jobData ? JSON.parse(jobData) : null
}

// Update job status
async function updateJobStatus(jobId: string, status: string, result: any = null) {
  const redis = await connect()
  const jobData = await getJob(jobId)

  if (!jobData) {
    return false
  }

  jobData.status = status
  if (result) {
    jobData.result = result
  }

  return redis.set(`job:${jobId}`, JSON.stringify(jobData), { EX: 3600 })
}

export default {
  connect,
  get,
  set,
  del,
  storeJob,
  getJob,
  updateJobStatus,
}
