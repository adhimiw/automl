// Import PrismaClient
const { PrismaClient } = require('@prisma/client');

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

async function main() {
  try {
    // Create a sample concept
    const concept = await prisma.conceptExplanation.create({
      data: {
        title: "Linear Regression",
        content: "<h2>Linear Regression</h2><p>A statistical method for modeling relationships between variables.</p>",
        summary: "A fundamental statistical method for modeling relationships between variables",
        related_concepts: ["Multiple Regression", "Polynomial Regression"],
        prerequisites: ["Descriptive Statistics", "Correlation"],
        difficulty: "beginner",
        visual_aids: [
          {
            type: "chart",
            url: "/assets/images/education/linear-regression-line.png",
            alt_text: "Linear regression line",
            caption: "A linear regression line"
          }
        ],
        category: "machine_learning",
        tags: ["regression", "statistics", "predictive modeling"]
      }
    });

    console.log('Created concept:', concept);
  } catch (error) {
    console.error('Error creating concept:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
