import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuizScoreProps {
  correctAnswers: number
  totalQuestions: number
}

export default function QuizScore({ correctAnswers, totalQuestions }: QuizScoreProps) {
  const score = (correctAnswers / totalQuestions) * 100
  const roundedScore = Math.round(score)

  const getMessage = () => {
    if (score === 100) return "Excellent! S+"
    if (score >= 70) return "Great job!, practice makes perfect"
    if (score >= 50) return "Good effort! patience creates room for improvements"
    if (score >= 30) return "Not bad, but there's room for improvement."
    return "Keep practicing, you'll get better!"
  }

  return (
    <Card className="w-full">
      <CardContent className="space-y-4 p-8">
        <div className="text-center">
          <p className="text-4xl font-bold">{roundedScore}%</p>
          <p className="text-sm text-muted-foreground">
            {correctAnswers} out of {totalQuestions} correct
          </p>
        </div>
        <p className="text-center font-medium">{getMessage()}</p>
      </CardContent>
    </Card>
  )
}
