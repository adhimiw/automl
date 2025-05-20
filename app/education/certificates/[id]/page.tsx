/**
 * Certificate Page
 * 
 * This page displays a certificate for a completed tutorial or learning path.
 */
import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChevronLeft, Award, Download, Share2 } from 'lucide-react'

// Mock data for certificates (in a real app, this would come from the database)
const mockCertificates = [
  {
    id: "1",
    title: "Python for Data Science",
    type: "tutorial" as const,
    recipient_name: "John Doe",
    issued_date: "2023-05-10T09:00:00Z",
    issuer: "Data Science Learning Platform",
    description: "Successfully completed the Python for Data Science tutorial, demonstrating proficiency in Python programming for data analysis and visualization.",
    image_url: "/assets/images/certificates/python-data-science.png"
  },
  {
    id: "2",
    title: "Data Science Fundamentals",
    type: "learning_path" as const,
    recipient_name: "John Doe",
    issued_date: "2023-06-15T14:30:00Z",
    issuer: "Data Science Learning Platform",
    description: "Successfully completed the Data Science Fundamentals learning path, demonstrating proficiency in data cleaning, exploratory data analysis, and basic machine learning concepts.",
    image_url: "/assets/images/certificates/data-science-fundamentals.png"
  }
]

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // In a real app, fetch the certificate from the database
  const certificate = mockCertificates.find(c => c.id === params.id)
  
  if (!certificate) {
    return {
      title: 'Certificate Not Found',
      description: 'The requested certificate could not be found.'
    }
  }
  
  return {
    title: `${certificate.title} Certificate | Data Science Learning Platform`,
    description: `Certificate of completion for ${certificate.title}`,
  }
}

export default function CertificatePage({ params }: { params: { id: string } }) {
  // In a real app, fetch the certificate from the database
  const certificate = mockCertificates.find(c => c.id === params.id)
  
  // If certificate not found, show 404 page
  if (!certificate) {
    notFound()
  }
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }
  
  // Handle certificate download
  const handleDownload = () => {
    console.log(`Downloading certificate ${certificate.id}`)
    // In a real app, generate a PDF and trigger download
  }
  
  // Handle certificate sharing
  const handleShare = () => {
    console.log(`Sharing certificate ${certificate.id}`)
    // In a real app, show sharing options or copy link
  }
  
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/education/certificates">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Certificates
          </Link>
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" />
        <h1 className="text-3xl font-bold">{certificate.title} Certificate</h1>
      </div>
      
      {/* Certificate Card */}
      <Card className="p-8 max-w-3xl mx-auto bg-white dark:bg-slate-900 border-2 border-primary/20">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Award className="h-16 w-16 text-primary" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-center">Certificate of Completion</h2>
            <p className="text-muted-foreground">This certifies that</p>
          </div>
          
          <div>
            <h3 className="text-3xl font-serif italic">{certificate.recipient_name}</h3>
          </div>
          
          <div>
            <p className="text-muted-foreground">has successfully completed</p>
            <h4 className="text-xl font-bold mt-1">{certificate.title}</h4>
            <Badge className="mt-2">
              {certificate.type === 'tutorial' ? 'Tutorial' : 'Learning Path'}
            </Badge>
          </div>
          
          <div className="max-w-md mx-auto">
            <p className="text-sm">{certificate.description}</p>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Issued on</p>
              <p className="font-medium">{formatDate(certificate.issued_date)}</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Issued by</p>
              <p className="font-medium">{certificate.issuer}</p>
            </div>
          </div>
          
          <div className="pt-4">
            <p className="text-xs text-muted-foreground">Certificate ID: {certificate.id}</p>
          </div>
        </div>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share Certificate
        </Button>
      </div>
      
      {/* Related Content */}
      <div className="space-y-4 mt-8">
        <h2 className="text-xl font-semibold">Continue Your Learning Journey</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificate.type === 'tutorial' ? (
            <>
              <Card className="p-4 hover:bg-muted/50 transition-colors">
                <Link href="/education/learning-paths" className="flex flex-col h-full">
                  <h3 className="font-medium mb-2">Explore Learning Paths</h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    Take your skills to the next level with our comprehensive learning paths.
                  </p>
                  <div className="flex items-center text-primary mt-2">
                    <span className="text-sm">Browse paths</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              </Card>
              
              <Card className="p-4 hover:bg-muted/50 transition-colors">
                <Link href="/education/tutorials" className="flex flex-col h-full">
                  <h3 className="font-medium mb-2">More Tutorials</h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    Discover more hands-on tutorials to enhance your data science skills.
                  </p>
                  <div className="flex items-center text-primary mt-2">
                    <span className="text-sm">Browse tutorials</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              </Card>
            </>
          ) : (
            <>
              <Card className="p-4 hover:bg-muted/50 transition-colors">
                <Link href="/education/learning-paths" className="flex flex-col h-full">
                  <h3 className="font-medium mb-2">Advanced Learning Paths</h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    Ready for more? Check out our advanced learning paths to deepen your expertise.
                  </p>
                  <div className="flex items-center text-primary mt-2">
                    <span className="text-sm">Browse advanced paths</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              </Card>
              
              <Card className="p-4 hover:bg-muted/50 transition-colors">
                <Link href="/projects/new" className="flex flex-col h-full">
                  <h3 className="font-medium mb-2">Apply Your Knowledge</h3>
                  <p className="text-sm text-muted-foreground flex-1">
                    Start a new project to apply what you've learned in a real-world context.
                  </p>
                  <div className="flex items-center text-primary mt-2">
                    <span className="text-sm">Create a project</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </Link>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
