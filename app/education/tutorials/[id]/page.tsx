/**
 * Tutorial Detail Page
 * 
 * This page displays a single tutorial with steps, exercises, and quizzes.
 */
import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TutorialPlayer } from '@/components/education/TutorialPlayer'
import { AIAssistant } from '@/components/education/AIAssistant'
import { Button } from '@/components/ui/button'
import { ChevronLeft, FileText } from 'lucide-react'

// Mock data for tutorial (in a real app, this would come from the database)
const mockTutorials = [
  {
    id: "1",
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
    difficulty: "beginner" as const,
    category: "machine_learning",
    tags: ["scikit-learn", "classification", "python", "beginner", "model evaluation"],
    completion_certificate: true,
    steps: [
      {
        id: "1-1",
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
        id: "1-2",
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
        id: "1-3",
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
        id: "1-4",
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
        id: "1-5",
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
      }
    ],
    exercises: [
      {
        id: "1-ex-1",
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
        difficulty: "intermediate" as const
      }
    ],
    quiz_questions: [
      {
        id: "1-q-1",
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
        id: "1-q-2",
        question: "Why do we scale features before training many machine learning models?",
        options: [
          "To make the data look nicer in visualizations",
          "To reduce the amount of memory needed for training",
          "To ensure all features contribute equally to the model",
          "To convert categorical features to numerical ones"
        ],
        correct_answer: 2,
        explanation: "Feature scaling ensures that all features contribute equally to the model's learning process. Without scaling, features with larger magnitudes would dominate the learning process, potentially leading to suboptimal performance."
      }
    ]
  }
]

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In a real app, fetch the tutorial from the database
  const tutorial = mockTutorials.find(t => t.id === params.id)
  
  if (!tutorial) {
    return {
      title: 'Tutorial Not Found',
      description: 'The requested tutorial could not be found.'
    }
  }
  
  return {
    title: `${tutorial.title} | Data Science Learning Platform`,
    description: tutorial.description,
  }
}

export default function TutorialPage({ params }: { params: { id: string } }) {
  // In a real app, fetch the tutorial from the database
  const tutorial = mockTutorials.find(t => t.id === params.id)
  
  // If tutorial not found, show 404 page
  if (!tutorial) {
    notFound()
  }
  
  // Mock user progress
  const mockUserProgress = {
    completedSteps: ["1-1"],
    completedExercises: [],
    answeredQuestions: [],
    progress_percentage: 20
  }
  
  // Mock functions for progress tracking
  const handleStepComplete = (stepId: string | number) => {
    console.log(`Marking step ${stepId} as completed`)
    // In a real app, call the API to update user progress
  }
  
  const handleExerciseComplete = (exerciseId: string | number, isCorrect: boolean) => {
    console.log(`Exercise ${exerciseId} completed with result: ${isCorrect ? 'correct' : 'incorrect'}`)
    // In a real app, call the API to update user progress
  }
  
  const handleQuizComplete = (score: number, total: number) => {
    console.log(`Quiz completed with score: ${score}/${total}`)
    // In a real app, call the API to update user progress
  }
  
  const handleTutorialComplete = () => {
    console.log(`Tutorial ${tutorial.id} completed`)
    // In a real app, call the API to update user progress and generate certificate
  }
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/education/tutorials">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Tutorials
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        <h1 className="text-3xl font-bold">{tutorial.title}</h1>
      </div>
      
      <TutorialPlayer
        tutorial={tutorial}
        onStepComplete={handleStepComplete}
        onExerciseComplete={handleExerciseComplete}
        onQuizComplete={handleQuizComplete}
        onTutorialComplete={handleTutorialComplete}
        userProgress={mockUserProgress}
      />
      
      {/* AI Assistant */}
      <AIAssistant 
        currentContext={{
          type: 'tutorial',
          id: tutorial.id,
          title: tutorial.title
        }}
        onConceptSelect={(id) => console.log(`Selected concept from AI assistant: ${id}`)}
        onTutorialSelect={(id) => console.log(`Selected tutorial from AI assistant: ${id}`)}
      />
    </div>
  )
}
