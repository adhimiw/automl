/**
 * Educational Content Seeding Script
 * 
 * This script populates the database with initial educational content
 * including concept explanations and tutorials.
 */
import { PrismaClient } from '@prisma/client'
import { DifficultyLevel, VisualAid } from '../lib/education/content-generator'

const prisma = new PrismaClient()

// Types for database models
interface ConceptExplanationCreate {
  title: string
  content: string
  summary: string
  related_concepts: string[]
  prerequisites: string[]
  difficulty: DifficultyLevel
  visual_aids: VisualAid[]
  category: string
  tags: string[]
}

interface TutorialStepCreate {
  title: string
  content: string
  code?: string
  visual_aids?: VisualAid[]
  estimated_time?: number
  checkpoint?: boolean
  order: number
}

interface ExerciseCreate {
  title: string
  description: string
  instructions: string
  starter_code?: string
  solution_code: string
  validation_tests: string
  hints: string[]
  difficulty: DifficultyLevel
}

interface QuizQuestionCreate {
  question: string
  options: string[]
  correct_answer: number
  explanation: string
}

interface TutorialCreate {
  title: string
  description: string
  summary: string
  learning_objectives: string[]
  prerequisites: string[]
  estimated_time: number
  difficulty: DifficultyLevel
  category: string
  tags: string[]
  completion_certificate: boolean
  steps: TutorialStepCreate[]
  exercises: ExerciseCreate[]
  quiz_questions: QuizQuestionCreate[]
}

// Sample concept explanations
const conceptExplanations: ConceptExplanationCreate[] = [
  {
    title: "Linear Regression",
    summary: "A fundamental statistical method for modeling relationships between variables",
    content: `
      <h2>Linear Regression</h2>
      <p>Linear regression is a linear approach to modeling the relationship between a dependent variable and one or more independent variables. It's one of the most widely used statistical techniques in data science.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Simple Linear Regression:</strong> Uses one independent variable to predict a dependent variable</li>
        <li><strong>Multiple Linear Regression:</strong> Uses multiple independent variables to predict a dependent variable</li>
        <li><strong>Least Squares Method:</strong> The most common approach to fitting a regression line</li>
        <li><strong>Coefficients:</strong> Values that indicate the relationship between each independent variable and the dependent variable</li>
      </ul>
      
      <h3>Mathematical Representation</h3>
      <p>Simple linear regression can be represented as:</p>
      <pre>y = β₀ + β₁x + ε</pre>
      <p>Where:</p>
      <ul>
        <li>y is the dependent variable</li>
        <li>x is the independent variable</li>
        <li>β₀ is the y-intercept</li>
        <li>β₁ is the slope</li>
        <li>ε is the error term</li>
      </ul>
      
      <h3>Assumptions</h3>
      <p>Linear regression makes several key assumptions:</p>
      <ul>
        <li>Linearity: The relationship between variables is linear</li>
        <li>Independence: Observations are independent of each other</li>
        <li>Homoscedasticity: Constant variance in errors</li>
        <li>Normality: Errors are normally distributed</li>
      </ul>
      
      <h3>Evaluation Metrics</h3>
      <p>Common metrics to evaluate linear regression models include:</p>
      <ul>
        <li>R-squared: Proportion of variance explained by the model</li>
        <li>Adjusted R-squared: R-squared adjusted for the number of predictors</li>
        <li>Mean Squared Error (MSE): Average squared difference between predicted and actual values</li>
        <li>Root Mean Squared Error (RMSE): Square root of MSE</li>
      </ul>
    `,
    related_concepts: ["Multiple Regression", "Polynomial Regression", "R-squared", "Residuals"],
    prerequisites: ["Descriptive Statistics", "Correlation"],
    difficulty: "beginner",
    visual_aids: [
      {
        type: "chart",
        url: "/assets/images/education/linear-regression-line.png",
        alt_text: "Linear regression line fitting data points",
        caption: "A linear regression line showing the best fit through data points"
      },
      {
        type: "diagram",
        url: "/assets/images/education/residuals-visualization.png",
        alt_text: "Visualization of residuals",
        caption: "Visualization of residuals (differences between observed and predicted values)"
      }
    ],
    category: "machine_learning",
    tags: ["regression", "statistics", "predictive modeling", "supervised learning"]
  },
  {
    title: "Decision Trees",
    summary: "Tree-based models that make decisions by splitting data based on feature values",
    content: `
      <h2>Decision Trees</h2>
      <p>Decision trees are non-parametric supervised learning models used for classification and regression tasks. They work by creating a model that predicts the value of a target variable by learning simple decision rules inferred from the data features.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Nodes:</strong> Points where the tree splits based on a feature</li>
        <li><strong>Branches:</strong> Outcomes of a split leading to the next node</li>
        <li><strong>Leaves:</strong> Terminal nodes that provide the final prediction</li>
        <li><strong>Splitting Criteria:</strong> Metrics like Gini impurity or information gain that determine the best splits</li>
      </ul>
      
      <h3>How Decision Trees Work</h3>
      <p>Decision trees work by recursively splitting the data based on feature values:</p>
      <ol>
        <li>Start with all data at the root node</li>
        <li>Find the feature and threshold that best splits the data</li>
        <li>Create child nodes based on the split</li>
        <li>Recursively repeat the process for each child node</li>
        <li>Stop when a stopping criterion is met (e.g., maximum depth, minimum samples)</li>
      </ol>
      
      <h3>Advantages</h3>
      <ul>
        <li>Easy to understand and interpret</li>
        <li>Requires little data preprocessing</li>
        <li>Can handle both numerical and categorical data</li>
        <li>Automatically handles feature interactions</li>
      </ul>
      
      <h3>Limitations</h3>
      <ul>
        <li>Prone to overfitting, especially with deep trees</li>
        <li>Can be unstable (small changes in data can result in very different trees)</li>
        <li>Biased toward features with more levels</li>
        <li>May not capture complex relationships without deep trees</li>
      </ul>
      
      <h3>Preventing Overfitting</h3>
      <p>Common techniques to prevent overfitting in decision trees:</p>
      <ul>
        <li>Setting a maximum depth</li>
        <li>Requiring a minimum number of samples per leaf</li>
        <li>Pruning the tree after training</li>
        <li>Using ensemble methods like Random Forests</li>
      </ul>
    `,
    related_concepts: ["Random Forests", "Ensemble Methods", "Classification", "Feature Importance"],
    prerequisites: ["Supervised Learning", "Classification Basics"],
    difficulty: "intermediate",
    visual_aids: [
      {
        type: "diagram",
        url: "/assets/images/education/decision-tree-structure.png",
        alt_text: "Decision tree structure",
        caption: "Structure of a decision tree showing nodes, branches, and leaves"
      },
      {
        type: "chart",
        url: "/assets/images/education/decision-boundary.png",
        alt_text: "Decision boundaries created by a decision tree",
        caption: "Decision boundaries created by a decision tree classifier"
      }
    ],
    category: "machine_learning",
    tags: ["classification", "regression", "supervised learning", "tree-based models"]
  }
];

// Sample tutorials
const tutorials: TutorialCreate[] = [
  {
    title: "Building Your First Machine Learning Model",
    description: "Learn how to build, train, and evaluate a simple machine learning model using scikit-learn",
    summary: "A step-by-step guide to creating your first predictive model with Python and scikit-learn",
    learning_objectives: [
      "Understand the basic machine learning workflow",
      "Learn how to prepare data for modeling",
      "Build and train a simple classification model",
      "Evaluate model performance using appropriate metrics",
      "Make predictions with your trained model"
    ],
    prerequisites: ["Basic Python", "NumPy Fundamentals", "Pandas Basics"],
    estimated_time: 60, // 60 minutes
    difficulty: "beginner",
    category: "machine_learning",
    tags: ["scikit-learn", "classification", "python", "beginner", "model evaluation"],
    completion_certificate: true,
    steps: [
      {
        title: "Setting Up Your Environment",
        content: "Before we start building our model, we need to set up our Python environment with the necessary libraries.",
        code: `
# Install required packages
pip install numpy pandas scikit-learn matplotlib

# Import libraries
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
        `,
        estimated_time: 5,
        checkpoint: true,
        order: 1
      },
      {
        title: "Loading and Exploring the Dataset",
        content: "We'll use the famous Iris dataset, which is included in scikit-learn. This dataset contains measurements of iris flowers and the task is to classify them into three species.",
        code: `
# Load the Iris dataset
from sklearn.datasets import load_iris
iris = load_iris()
X = iris.data
y = iris.target

# Create a DataFrame for easier exploration
df = pd.DataFrame(X, columns=iris.feature_names)
df['species'] = pd.Categorical.from_codes(y, iris.target_names)

# Explore the dataset
print(df.head())
print("\\nDataset shape:", df.shape)
print("\\nBasic statistics:")
print(df.describe())

# Check for missing values
print("\\nMissing values:")
print(df.isnull().sum())

# Visualize the data
plt.figure(figsize=(12, 6))
sns.pairplot(df, hue='species')
plt.suptitle('Pairwise relationships in the Iris dataset', y=1.02)
plt.show()
        `,
        estimated_time: 10,
        visual_aids: [
          {
            type: "chart",
            url: "/assets/images/education/iris-pairplot.png",
            alt_text: "Pairplot of Iris dataset",
            caption: "Pairwise relationships between features in the Iris dataset, colored by species"
          }
        ],
        order: 2
      },
      {
        title: "Preparing the Data",
        content: "Now we'll split our data into training and testing sets, and scale the features to have zero mean and unit variance.",
        code: `
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

print(f"Training set shape: {X_train.shape}")
print(f"Testing set shape: {X_test.shape}")

# Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("\\nFirst few scaled training samples:")
print(X_train_scaled[:5])
        `,
        estimated_time: 8,
        order: 3
      },
      {
        title: "Building and Training the Model",
        content: "Now we'll create a Random Forest classifier and train it on our training data.",
        code: `
# Create a Random Forest classifier
model = RandomForestClassifier(n_estimators=100, random_state=42)

# Train the model
model.fit(X_train_scaled, y_train)

print("Model training complete!")
        `,
        estimated_time: 7,
        checkpoint: true,
        order: 4
      },
      {
        title: "Evaluating the Model",
        content: "Let's evaluate our model's performance on the test data using various metrics.",
        code: `
# Make predictions on the test set
y_pred = model.predict(X_test_scaled)

# Calculate accuracy
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.4f}")

# Generate a classification report
print("\\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=iris.target_names))

# Create a confusion matrix
plt.figure(figsize=(8, 6))
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
            xticklabels=iris.target_names, 
            yticklabels=iris.target_names)
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()

# Feature importance
plt.figure(figsize=(10, 6))
importances = model.feature_importances_
indices = np.argsort(importances)[::-1]
plt.bar(range(X.shape[1]), importances[indices])
plt.xticks(range(X.shape[1]), [iris.feature_names[i] for i in indices], rotation=90)
plt.xlabel('Features')
plt.ylabel('Importance')
plt.title('Feature Importance')
plt.tight_layout()
plt.show()
        `,
        estimated_time: 10,
        visual_aids: [
          {
            type: "chart",
            url: "/assets/images/education/confusion-matrix.png",
            alt_text: "Confusion matrix",
            caption: "Confusion matrix showing the model's predictions versus actual values"
          },
          {
            type: "chart",
            url: "/assets/images/education/feature-importance.png",
            alt_text: "Feature importance",
            caption: "Bar chart showing the importance of each feature in the Random Forest model"
          }
        ],
        order: 5
      },
      {
        title: "Making Predictions with the Model",
        content: "Finally, let's use our trained model to make predictions on new data.",
        code: `
# Create some new samples
new_samples = np.array([
    [5.1, 3.5, 1.4, 0.2],  # Likely Iris-setosa
    [6.7, 3.1, 4.7, 1.5],  # Likely Iris-versicolor
    [6.3, 3.3, 6.0, 2.5],  # Likely Iris-virginica
])

# Scale the new samples
new_samples_scaled = scaler.transform(new_samples)

# Make predictions
predictions = model.predict(new_samples_scaled)
probabilities = model.predict_proba(new_samples_scaled)

# Display results
for i, pred in enumerate(predictions):
    print(f"Sample {i+1}: {new_samples[i]}")
    print(f"Predicted species: {iris.target_names[pred]}")
    print(f"Probabilities: {probabilities[i]}")
    print()
        `,
        estimated_time: 5,
        order: 6
      }
    ],
    exercises: [
      {
        title: "Model Improvement Challenge",
        description: "Try to improve the performance of the Random Forest classifier by tuning its hyperparameters.",
        instructions: "Modify the code below to create a better Random Forest model by adjusting hyperparameters like n_estimators, max_depth, and min_samples_split. Compare the performance of your improved model with the original one.",
        starter_code: `
# Original model for comparison
original_model = RandomForestClassifier(n_estimators=100, random_state=42)
original_model.fit(X_train_scaled, y_train)
original_accuracy = accuracy_score(y_test, original_model.predict(X_test_scaled))

# Your improved model
improved_model = RandomForestClassifier(
    # TODO: Modify these hyperparameters to improve performance
    n_estimators=100,
    max_depth=None,
    min_samples_split=2,
    min_samples_leaf=1,
    random_state=42
)

# Train and evaluate your model
improved_model.fit(X_train_scaled, y_train)
improved_accuracy = accuracy_score(y_test, improved_model.predict(X_test_scaled))

# Compare results
print(f"Original model accuracy: {original_accuracy:.4f}")
print(f"Improved model accuracy: {improved_accuracy:.4f}")
print(f"Improvement: {(improved_accuracy - original_accuracy) * 100:.2f}%")
        `,
        solution_code: `
# Original model for comparison
original_model = RandomForestClassifier(n_estimators=100, random_state=42)
original_model.fit(X_train_scaled, y_train)
original_accuracy = accuracy_score(y_test, original_model.predict(X_test_scaled))

# Improved model with tuned hyperparameters
improved_model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    min_samples_split=5,
    min_samples_leaf=2,
    max_features='sqrt',
    bootstrap=True,
    random_state=42
)

# Train and evaluate your model
improved_model.fit(X_train_scaled, y_train)
improved_accuracy = accuracy_score(y_test, improved_model.predict(X_test_scaled))

# Compare results
print(f"Original model accuracy: {original_accuracy:.4f}")
print(f"Improved model accuracy: {improved_accuracy:.4f}")
print(f"Improvement: {(improved_accuracy - original_accuracy) * 100:.2f}%")

# Generate classification report for the improved model
print("\\nClassification Report for Improved Model:")
improved_predictions = improved_model.predict(X_test_scaled)
print(classification_report(y_test, improved_predictions, target_names=iris.target_names))
        `,
        validation_tests: `
# Check if improved model was created
assert 'improved_model' in locals(), "You need to create an improved_model"

# Check if the model was trained
assert hasattr(improved_model, 'classes_'), "You need to train the improved_model"

# Check if accuracy was calculated
assert 'improved_accuracy' in locals(), "You need to calculate the accuracy of your improved model"

# Check if the improved model is actually better
assert improved_accuracy >= original_accuracy, "Your improved model should have better accuracy than the original"
        `,
        hints: [
          "Try increasing the number of trees (n_estimators) to reduce variance",
          "Setting a maximum depth can help prevent overfitting",
          "Adjusting min_samples_split and min_samples_leaf can help create more robust trees",
          "Consider using max_features='sqrt' to introduce more randomness"
        ],
        difficulty: "intermediate"
      }
    ],
    quiz_questions: [
      {
        question: "What is the purpose of splitting data into training and testing sets?",
        options: [
          "To make the model run faster",
          "To evaluate the model's performance on unseen data",
          "To reduce the amount of data needed for training",
          "To simplify the model's architecture"
        ],
        correct_answer: 1,
        explanation: "We split data into training and testing sets to evaluate how well our model generalizes to new, unseen data. The training set is used to train the model, while the testing set is used to assess its performance on data it hasn't seen before."
      },
      {
        question: "Why do we scale features before training many machine learning models?",
        options: [
          "To make the data look nicer in visualizations",
          "To reduce the amount of memory needed for training",
          "To ensure all features contribute equally to the model",
          "To convert categorical features to numerical ones"
        ],
        correct_answer: 2,
        explanation: "Feature scaling ensures that all features contribute equally to the model's learning process. Without scaling, features with larger magnitudes would dominate the learning process, potentially leading to suboptimal performance."
      },
      {
        question: "What does the Random Forest algorithm do to improve upon a single decision tree?",
        options: [
          "It uses a different splitting criterion",
          "It builds multiple trees and averages their predictions",
          "It only uses the most important features",
          "It creates deeper trees with more nodes"
        ],
        correct_answer: 1,
        explanation: "Random Forest is an ensemble method that builds multiple decision trees (each trained on a random subset of data and features) and combines their predictions through voting (for classification) or averaging (for regression). This approach reduces overfitting and improves generalization compared to a single decision tree."
      }
    ]
  }
];

/**
 * Seed the database with educational content
 */
async function seedEducationalContent() {
  console.log("Starting to seed educational content...")
  
  // Seed concept explanations
  console.log(`Seeding ${conceptExplanations.length} concept explanations...`)
  for (const concept of conceptExplanations) {
    await prisma.conceptExplanation.create({
      data: {
        title: concept.title,
        content: concept.content,
        summary: concept.summary,
        related_concepts: concept.related_concepts,
        prerequisites: concept.prerequisites,
        difficulty: concept.difficulty,
        visual_aids: concept.visual_aids,
        category: concept.category,
        tags: concept.tags,
      }
    })
  }
  
  // Seed tutorials
  console.log(`Seeding ${tutorials.length} tutorials...`)
  for (const tutorial of tutorials) {
    await prisma.tutorial.create({
      data: {
        title: tutorial.title,
        description: tutorial.description,
        summary: tutorial.summary,
        learning_objectives: tutorial.learning_objectives,
        prerequisites: tutorial.prerequisites,
        estimated_time: tutorial.estimated_time,
        difficulty: tutorial.difficulty,
        category: tutorial.category,
        tags: tutorial.tags,
        completion_certificate: tutorial.completion_certificate,
        steps: {
          create: tutorial.steps.map(step => ({
            title: step.title,
            content: step.content,
            code: step.code,
            visual_aids: step.visual_aids,
            estimated_time: step.estimated_time,
            checkpoint: step.checkpoint,
            order: step.order
          }))
        },
        exercises: {
          create: tutorial.exercises.map(exercise => ({
            title: exercise.title,
            description: exercise.description,
            instructions: exercise.instructions,
            starter_code: exercise.starter_code,
            solution_code: exercise.solution_code,
            validation_tests: exercise.validation_tests,
            hints: exercise.hints,
            difficulty: exercise.difficulty
          }))
        },
        quiz_questions: {
          create: tutorial.quiz_questions.map(question => ({
            question: question.question,
            options: question.options,
            correct_answer: question.correct_answer,
            explanation: question.explanation
          }))
        }
      }
    })
  }
  
  console.log("Educational content seeding completed successfully!")
}

// Run the seeding function
seedEducationalContent()
  .catch(e => {
    console.error("Error seeding educational content:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
