/**
 * Progress Tracking Service
 * 
 * This service provides functions for tracking user progress through
 * educational content, including concepts, tutorials, and learning paths.
 */
import prisma from '@/lib/prisma'

/**
 * Get a user's progress for a specific content item
 * @param userId User ID
 * @param contentType Content type ('concept' or 'tutorial')
 * @param contentId Content ID
 * @returns User progress or null if not found
 */
export async function getUserContentProgress(
  userId: number,
  contentType: 'concept' | 'tutorial',
  contentId: number
) {
  try {
    const progress = await prisma.userProgress.findUnique({
      where: {
        user_id_content_type_content_id: {
          user_id: userId,
          content_type: contentType,
          content_id: contentId
        }
      }
    })
    
    return progress
  } catch (error) {
    console.error(`Error getting user progress for ${contentType} ${contentId}:`, error)
    throw error
  }
}

/**
 * Update a user's progress for a specific content item
 * @param userId User ID
 * @param contentType Content type ('concept' or 'tutorial')
 * @param contentId Content ID
 * @param progressPercentage Progress percentage (0-100)
 * @param completed Whether the content is completed
 * @returns Updated user progress
 */
export async function updateUserContentProgress(
  userId: number,
  contentType: 'concept' | 'tutorial',
  contentId: number,
  progressPercentage: number,
  completed: boolean = false
) {
  try {
    // If progress percentage is 100, mark as completed
    if (progressPercentage >= 100) {
      completed = true
    }
    
    // Update or create progress record
    const progress = await prisma.userProgress.upsert({
      where: {
        user_id_content_type_content_id: {
          user_id: userId,
          content_type: contentType,
          content_id: contentId
        }
      },
      update: {
        progress_percentage: progressPercentage,
        completed,
        last_accessed: new Date()
      },
      create: {
        user_id: userId,
        content_type: contentType,
        content_id: contentId,
        progress_percentage: progressPercentage,
        completed,
        last_accessed: new Date(),
        // Set the appropriate relation field based on content type
        ...(contentType === 'concept' ? { concept_id: contentId } : {}),
        ...(contentType === 'tutorial' ? { tutorial_id: contentId } : {})
      }
    })
    
    return progress
  } catch (error) {
    console.error(`Error updating user progress for ${contentType} ${contentId}:`, error)
    throw error
  }
}

/**
 * Mark a tutorial step as completed
 * @param userId User ID
 * @param tutorialId Tutorial ID
 * @param stepId Step ID
 * @returns Updated user progress
 */
export async function markTutorialStepCompleted(
  userId: number,
  tutorialId: number,
  stepId: number
) {
  try {
    // Get the tutorial and its steps
    const tutorial = await prisma.tutorial.findUnique({
      where: { id: tutorialId },
      include: { steps: true }
    })
    
    if (!tutorial) {
      throw new Error(`Tutorial ${tutorialId} not found`)
    }
    
    // Get current user progress
    let progress = await getUserContentProgress(userId, 'tutorial', tutorialId)
    
    // Calculate new progress percentage
    const totalSteps = tutorial.steps.length
    const completedSteps = progress?.progress_percentage 
      ? Math.round((progress.progress_percentage / 100) * totalSteps) + 1 // Add the newly completed step
      : 1 // This is the first completed step
    
    const newProgressPercentage = Math.min(
      Math.round((completedSteps / totalSteps) * 100),
      100
    )
    
    // Update progress
    return updateUserContentProgress(
      userId,
      'tutorial',
      tutorialId,
      newProgressPercentage,
      newProgressPercentage === 100
    )
  } catch (error) {
    console.error(`Error marking tutorial step ${stepId} as completed:`, error)
    throw error
  }
}

/**
 * Record a user's exercise solution
 * @param userId User ID
 * @param exerciseId Exercise ID
 * @param code User's solution code
 * @param isCorrect Whether the solution is correct
 * @returns Created user solution
 */
export async function recordExerciseSolution(
  userId: number,
  exerciseId: number,
  code: string,
  isCorrect: boolean
) {
  try {
    // Get the exercise to find its tutorial
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId }
    })
    
    if (!exercise) {
      throw new Error(`Exercise ${exerciseId} not found`)
    }
    
    // Record the solution
    const solution = await prisma.userSolution.create({
      data: {
        user_id: userId,
        exercise_id: exerciseId,
        code,
        is_correct: isCorrect
      }
    })
    
    // If the solution is correct, update tutorial progress
    if (isCorrect) {
      // Get the tutorial and all its exercises
      const tutorial = await prisma.tutorial.findUnique({
        where: { id: exercise.tutorial_id },
        include: { 
          steps: true,
          exercises: true,
          quiz_questions: true
        }
      })
      
      if (!tutorial) {
        throw new Error(`Tutorial ${exercise.tutorial_id} not found`)
      }
      
      // Get current user progress
      let progress = await getUserContentProgress(userId, 'tutorial', exercise.tutorial_id)
      
      // Get completed exercises
      const completedExercises = await prisma.userSolution.count({
        where: {
          user_id: userId,
          exercise_id: { in: tutorial.exercises.map(e => e.id) },
          is_correct: true
        }
      })
      
      // Calculate new progress percentage
      const totalItems = tutorial.steps.length + tutorial.exercises.length + tutorial.quiz_questions.length
      const completedSteps = progress?.progress_percentage 
        ? Math.round((progress.progress_percentage / 100) * totalItems)
        : 0
      
      // Add 1 for the newly completed exercise if it wasn't already counted
      const newCompletedItems = completedSteps + 1
      
      const newProgressPercentage = Math.min(
        Math.round((newCompletedItems / totalItems) * 100),
        100
      )
      
      // Update progress
      await updateUserContentProgress(
        userId,
        'tutorial',
        exercise.tutorial_id,
        newProgressPercentage,
        newProgressPercentage === 100
      )
    }
    
    return solution
  } catch (error) {
    console.error(`Error recording exercise solution for exercise ${exerciseId}:`, error)
    throw error
  }
}

/**
 * Record a user's quiz answer
 * @param userId User ID
 * @param questionId Question ID
 * @param selectedOption Selected option index
 * @returns Created user answer
 */
export async function recordQuizAnswer(
  userId: number,
  questionId: number,
  selectedOption: number
) {
  try {
    // Get the question to check if the answer is correct
    const question = await prisma.quizQuestion.findUnique({
      where: { id: questionId }
    })
    
    if (!question) {
      throw new Error(`Question ${questionId} not found`)
    }
    
    const isCorrect = selectedOption === question.correct_answer
    
    // Record the answer
    const answer = await prisma.userQuizAnswer.create({
      data: {
        user_id: userId,
        quiz_question_id: questionId,
        selected_option: selectedOption,
        is_correct: isCorrect
      }
    })
    
    // Update tutorial progress
    const tutorial = await prisma.tutorial.findUnique({
      where: { id: question.tutorial_id },
      include: { 
        steps: true,
        exercises: true,
        quiz_questions: true
      }
    })
    
    if (!tutorial) {
      throw new Error(`Tutorial ${question.tutorial_id} not found`)
    }
    
    // Get current user progress
    let progress = await getUserContentProgress(userId, 'tutorial', question.tutorial_id)
    
    // Get answered questions
    const answeredQuestions = await prisma.userQuizAnswer.count({
      where: {
        user_id: userId,
        quiz_question_id: { in: tutorial.quiz_questions.map(q => q.id) }
      }
    })
    
    // Calculate new progress percentage
    const totalItems = tutorial.steps.length + tutorial.exercises.length + tutorial.quiz_questions.length
    const completedSteps = progress?.progress_percentage 
      ? Math.round((progress.progress_percentage / 100) * totalItems)
      : 0
    
    // Add 1 for the newly answered question if it wasn't already counted
    const newCompletedItems = completedSteps + 1
    
    const newProgressPercentage = Math.min(
      Math.round((newCompletedItems / totalItems) * 100),
      100
    )
    
    // Update progress
    await updateUserContentProgress(
      userId,
      'tutorial',
      question.tutorial_id,
      newProgressPercentage,
      newProgressPercentage === 100
    )
    
    return answer
  } catch (error) {
    console.error(`Error recording quiz answer for question ${questionId}:`, error)
    throw error
  }
}

/**
 * Get a user's learning progress statistics
 * @param userId User ID
 * @returns User progress statistics
 */
export async function getUserProgressStats(userId: number) {
  try {
    // Get counts of total content
    const totalConcepts = await prisma.conceptExplanation.count()
    const totalTutorials = await prisma.tutorial.count()
    const totalLearningPaths = await prisma.learningPath.count()
    
    // Get counts of completed content
    const completedConcepts = await prisma.userProgress.count({
      where: {
        user_id: userId,
        content_type: 'concept',
        completed: true
      }
    })
    
    const completedTutorials = await prisma.userProgress.count({
      where: {
        user_id: userId,
        content_type: 'tutorial',
        completed: true
      }
    })
    
    const completedLearningPaths = await prisma.learningPathProgress.count({
      where: {
        user_id: userId,
        completed: true
      }
    })
    
    // Get counts of exercises and quizzes
    const totalExercises = await prisma.exercise.count()
    const completedExercises = await prisma.userSolution.count({
      where: {
        user_id: userId,
        is_correct: true
      }
    })
    
    const totalQuizzes = await prisma.quizQuestion.count()
    const completedQuizzes = await prisma.userQuizAnswer.count({
      where: {
        user_id: userId
      }
    })
    
    return {
      total_concepts: totalConcepts,
      completed_concepts: completedConcepts,
      total_tutorials: totalTutorials,
      completed_tutorials: completedTutorials,
      total_learning_paths: totalLearningPaths,
      completed_learning_paths: completedLearningPaths,
      total_exercises: totalExercises,
      completed_exercises: completedExercises,
      total_quizzes: totalQuizzes,
      completed_quizzes: completedQuizzes
    }
  } catch (error) {
    console.error(`Error getting user progress stats for user ${userId}:`, error)
    throw error
  }
}

/**
 * Get a user's learning progress
 * @param userId User ID
 * @returns User progress data
 */
export async function getUserProgress(userId: number) {
  try {
    // Get concept progress
    const conceptProgress = await prisma.userProgress.findMany({
      where: {
        user_id: userId,
        content_type: 'concept'
      },
      include: {
        concept: {
          select: {
            title: true,
            difficulty: true,
            category: true
          }
        }
      },
      orderBy: {
        last_accessed: 'desc'
      }
    })
    
    // Get tutorial progress
    const tutorialProgress = await prisma.userProgress.findMany({
      where: {
        user_id: userId,
        content_type: 'tutorial'
      },
      include: {
        tutorial: {
          select: {
            title: true,
            difficulty: true,
            category: true,
            estimated_time: true
          }
        }
      },
      orderBy: {
        last_accessed: 'desc'
      }
    })
    
    // Get learning path progress
    const learningPathProgress = await prisma.learningPathProgress.findMany({
      where: {
        user_id: userId
      },
      include: {
        learning_path: {
          select: {
            title: true,
            difficulty: true,
            estimated_time: true
          }
        }
      },
      orderBy: {
        last_accessed: 'desc'
      }
    })
    
    // Format the data
    return {
      concepts: conceptProgress.map(progress => ({
        id: progress.content_id,
        title: progress.concept?.title || 'Unknown Concept',
        difficulty: progress.concept?.difficulty as 'beginner' | 'intermediate' | 'advanced',
        category: progress.concept?.category || 'unknown',
        progress_percentage: progress.progress_percentage,
        completed: progress.completed,
        last_accessed: progress.last_accessed.toISOString()
      })),
      tutorials: tutorialProgress.map(progress => ({
        id: progress.content_id,
        title: progress.tutorial?.title || 'Unknown Tutorial',
        difficulty: progress.tutorial?.difficulty as 'beginner' | 'intermediate' | 'advanced',
        category: progress.tutorial?.category || 'unknown',
        estimated_time: progress.tutorial?.estimated_time || 0,
        progress_percentage: progress.progress_percentage,
        completed: progress.completed,
        last_accessed: progress.last_accessed.toISOString()
      })),
      learning_paths: learningPathProgress.map(progress => ({
        id: progress.learning_path_id,
        title: progress.learning_path?.title || 'Unknown Learning Path',
        difficulty: progress.learning_path?.difficulty as 'beginner' | 'intermediate' | 'advanced',
        estimated_time: progress.learning_path?.estimated_time || 0,
        progress_percentage: progress.progress_percentage,
        completed: progress.completed,
        last_accessed: progress.last_accessed.toISOString()
      }))
    }
  } catch (error) {
    console.error(`Error getting user progress for user ${userId}:`, error)
    throw error
  }
}
