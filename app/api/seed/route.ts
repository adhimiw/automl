import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import db from "@/lib/db/index"
import { createAuditLog } from "@/lib/db/audit-logs"
import { serverEnv } from "@/lib/env"

// Only allow seeding in development mode
export async function POST(request: Request) {
  try {
    if (serverEnv.app.nodeEnv === "production") {
      return NextResponse.json({ error: "Seeding is not allowed in production" }, { status: 403 })
    }

    // Create demo user
    const demoPasswordHash = await hash("password123", 10)
    const devPasswordHash = await hash("idlypoDa@12", 10)

    // Check if demo user already exists
    const existingDemoUserResult = await db.query("SELECT * FROM users WHERE email = $1", ["demo@example.com"])

    // Check if developer user already exists
    const existingDevUserResult = await db.query("SELECT * FROM users WHERE email = $1", ["adhithanraja6@gmail.com"])

    let userId: number

    if (existingDemoUserResult.rows.length === 0) {
      // Create demo user
      const demoUserResult = await db.query(
        "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
        ["Demo User", "demo@example.com", demoPasswordHash],
      )

      userId = demoUserResult.rows[0].id
    } else {
      userId = existingDemoUserResult.rows[0].id
    }

    // Create or update developer user
    if (existingDevUserResult.rows.length === 0) {
      // Create developer user
      await db.query(
        "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
        ["Developer", "adhithanraja6@gmail.com", devPasswordHash],
      )
    } else {
      // Update developer password
      await db.query(
        "UPDATE users SET password_hash = $1 WHERE email = $2",
        [devPasswordHash, "adhithanraja6@gmail.com"],
      )
    }

    // Create demo projects
    const projectNames = ["Customer Analysis", "Sales Forecasting", "Product Performance"]

    for (const name of projectNames) {
      // Check if project already exists
      const existingProjectResult = await db.query("SELECT * FROM projects WHERE name = $1 AND user_id = $2", [
        name,
        userId,
      ])

      if (existingProjectResult.rows.length === 0) {
        // Create project
        const projectResult = await db.query(
          "INSERT INTO projects (name, description, user_id) VALUES ($1, $2, $3) RETURNING id",
          [name, `Demo project for ${name.toLowerCase()}`, userId],
        )

        const projectId = projectResult.rows[0].id

        // Create demo datasets for each project
        const datasetResult = await db.query(
          "INSERT INTO datasets (name, description, project_id, row_count, column_count) VALUES ($1, $2, $3, $4, $5) RETURNING id",
          [`${name} Dataset`, `Sample dataset for ${name.toLowerCase()} analysis`, projectId, 1000, 10],
        )

        // Log seeding activity
        await createAuditLog({
          action: "seed_data",
          details: { project: name },
        })
      }
    }

    // Create feature flags
    const featureFlags = [
      { name: "ai_suggestions", description: "Enable AI-powered suggestions", enabled: true },
      { name: "advanced_visualizations", description: "Enable advanced data visualizations", enabled: true },
      { name: "beta_features", description: "Enable beta features", enabled: false },
    ]

    for (const flag of featureFlags) {
      // Check if flag already exists
      const existingFlagResult = await db.query("SELECT * FROM feature_flags WHERE name = $1", [flag.name])

      if (existingFlagResult.rows.length === 0) {
        // Create flag
        await db.query("INSERT INTO feature_flags (name, description, enabled) VALUES ($1, $2, $3)", [
          flag.name,
          flag.description,
          flag.enabled,
        ])
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
    })
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({
      error: "Failed to seed database",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
