/**
 * API Route for User Progress Tracking
 * 
 * This API provides endpoints for tracking user progress through
 * educational content, including concepts, tutorials, and learning paths.
 */
import { NextRequest, NextResponse } from 'next/server'
import { 
  getUserContentProgress,
  updateUserContentProgress,
  markTutorialStepCompleted,
  recordExerciseSolution,
  recordQuizAnswer,
  getUserProgressStats,
  getUserProgress
} from '@/lib/education/progress-service'

/**
 * GET /api/education/progress
 * Get a user's progress
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      )
    }
    
    // Get specific content progress if contentType and contentId are provided
    const contentType = searchParams.get('contentType')
    const contentId = searchParams.get('contentId')
    
    if (contentType && contentId) {
      if (contentType !== 'concept' && contentType !== 'tutorial') {
        return NextResponse.json(
          { error: 'Content type must be "concept" or "tutorial"' },
          { status: 400 }
        )
      }
      
      const progress = await getUserContentProgress(
        parseInt(userId),
        contentType as 'concept' | 'tutorial',
        parseInt(contentId)
      )
      
      return NextResponse.json({ progress })
    }
    
    // Get stats if stats=true
    const stats = searchParams.get('stats')
    
    if (stats === 'true') {
      const progressStats = await getUserProgressStats(parseInt(userId))
      return NextResponse.json({ stats: progressStats })
    }
    
    // Get all progress by default
    const progress = await getUserProgress(parseInt(userId))
    return NextResponse.json({ progress })
  } catch (error) {
    console.error('Error getting user progress:', error)
    return NextResponse.json(
      { error: 'Failed to get user progress' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/education/progress
 * Update a user's progress
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, contentType, contentId, progressPercentage, completed } = body
    
    // Validate required fields
    if (!userId || !contentType || !contentId || progressPercentage === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Validate content type
    if (contentType !== 'concept' && contentType !== 'tutorial') {
      return NextResponse.json(
        { error: 'Content type must be "concept" or "tutorial"' },
        { status: 400 }
      )
    }
    
    // Update progress
    const progress = await updateUserContentProgress(
      parseInt(userId),
      contentType as 'concept' | 'tutorial',
      parseInt(contentId),
      progressPercentage,
      completed
    )
    
    return NextResponse.json({ progress })
  } catch (error) {
    console.error('Error updating user progress:', error)
    return NextResponse.json(
      { error: 'Failed to update user progress' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/education/progress/step
 * Mark a tutorial step as completed
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  // Check if this is the step completion endpoint
  if (request.nextUrl.pathname !== '/api/education/progress/step') {
    return NextResponse.next()
  }
  
  try {
    const body = await request.json()
    const { userId, tutorialId, stepId } = body
    
    // Validate required fields
    if (!userId || !tutorialId || !stepId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Mark step as completed
    const progress = await markTutorialStepCompleted(
      parseInt(userId),
      parseInt(tutorialId),
      parseInt(stepId)
    )
    
    return NextResponse.json({ progress })
  } catch (error) {
    console.error('Error marking tutorial step as completed:', error)
    return NextResponse.json(
      { error: 'Failed to mark tutorial step as completed' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/education/progress/exercise
 * Record a user's exercise solution
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  // Check if this is the exercise solution endpoint
  if (request.nextUrl.pathname !== '/api/education/progress/exercise') {
    return NextResponse.next()
  }
  
  try {
    const body = await request.json()
    const { userId, exerciseId, code, isCorrect } = body
    
    // Validate required fields
    if (!userId || !exerciseId || !code || isCorrect === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Record exercise solution
    const solution = await recordExerciseSolution(
      parseInt(userId),
      parseInt(exerciseId),
      code,
      isCorrect
    )
    
    return NextResponse.json({ solution })
  } catch (error) {
    console.error('Error recording exercise solution:', error)
    return NextResponse.json(
      { error: 'Failed to record exercise solution' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/education/progress/quiz
 * Record a user's quiz answer
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  // Check if this is the quiz answer endpoint
  if (request.nextUrl.pathname !== '/api/education/progress/quiz') {
    return NextResponse.next()
  }
  
  try {
    const body = await request.json()
    const { userId, questionId, selectedOption } = body
    
    // Validate required fields
    if (!userId || !questionId || selectedOption === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Record quiz answer
    const answer = await recordQuizAnswer(
      parseInt(userId),
      parseInt(questionId),
      selectedOption
    )
    
    return NextResponse.json({ answer })
  } catch (error) {
    console.error('Error recording quiz answer:', error)
    return NextResponse.json(
      { error: 'Failed to record quiz answer' },
      { status: 500 }
    )
  }
}
