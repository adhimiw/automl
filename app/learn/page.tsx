import { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideBookOpen, LucideGraduationCap, LucideCode, LucideBarChart } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Learning Center",
  description: "Learn data science concepts with interactive tutorials",
}

export default function LearnPage() {
  return (
    <div className="container mx-auto py-6">
      <PageHeader
        heading="Learning Center"
        subheading="Learn data science concepts with interactive tutorials"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideBookOpen className="h-5 w-5" />
              Data Science Fundamentals
            </CardTitle>
            <CardDescription>
              Learn the basics of data science
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Introduction to data science concepts, statistics, and data analysis
            </p>
            <Button asChild>
              <Link href="/learn/fundamentals">Start Learning</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideBarChart className="h-5 w-5" />
              Data Visualization
            </CardTitle>
            <CardDescription>
              Learn how to create effective visualizations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Principles of data visualization and how to create impactful charts
            </p>
            <Button asChild>
              <Link href="/learn/visualization">Explore Visualizations</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideGraduationCap className="h-5 w-5" />
              Machine Learning
            </CardTitle>
            <CardDescription>
              Introduction to machine learning concepts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Learn about different ML algorithms and when to use them
            </p>
            <Button asChild>
              <Link href="/learn/machine-learning">Discover ML</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LucideCode className="h-5 w-5" />
              Tutorials
            </CardTitle>
            <CardDescription>
              Step-by-step tutorials for common data tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Practical tutorials for data cleaning, analysis, and visualization
            </p>
            <Button asChild>
              <Link href="/learn/tutorials">View Tutorials</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Featured Tutorial</h2>
        <Card>
          <CardHeader>
            <CardTitle>Introduction to Exploratory Data Analysis</CardTitle>
            <CardDescription>
              Learn how to perform EDA on any dataset
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Exploratory Data Analysis (EDA) is an approach to analyzing datasets to summarize their main characteristics, often using visual methods. This tutorial will guide you through the process of performing EDA on your datasets.
            </p>
            <Button asChild>
              <Link href="/learn/tutorials/exploratory-data-analysis">Start Tutorial</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
