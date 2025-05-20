/**
 * New Concept Page
 * 
 * This page provides a form for creating a new concept explanation.
 */
import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { ConceptEditor } from '@/components/admin/ConceptEditor'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'New Concept | Education Admin',
  description: 'Create a new concept explanation for the education platform.',
}

export default function NewConceptPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/education">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Education Admin
          </Link>
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold">Create New Concept</h1>
      
      <ConceptEditor
        onSave={(concept) => {
          console.log('Saving concept:', concept)
          // In a real app, call the API to save the concept
          // Then redirect to the concept page or back to the admin dashboard
        }}
        onPreview={() => {
          console.log('Preview concept')
          // In a real app, show a preview of the concept
        }}
      />
    </div>
  )
}
