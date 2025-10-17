import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, BookOpen, Calendar, Clock, Search, Upload, Download, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentAssignments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - will be replaced with real data later
  const availableAssignments = [
    {
      id: 1,
      title: "React Fundamentals Project",
      course: "Web Development",
      dueDate: "2025-10-25",
      points: 100,
      difficulty: "Medium",
      description: "Build a complete React application with state management"
    },
    {
      id: 2,
      title: "Database Design Assignment",
      course: "Database Systems",
      dueDate: "2025-10-28",
      points: 80,
      difficulty: "Hard",
      description: "Design and normalize a database schema for an e-commerce system"
    },
    {
      id: 3,
      title: "Algorithm Analysis",
      course: "Data Structures",
      dueDate: "2025-10-30",
      points: 90,
      difficulty: "Easy",
      description: "Analyze time complexity of various sorting algorithms"
    }
  ];

  const enrolledAssignments = [
    {
      id: 4,
      title: "UI/UX Design Portfolio",
      course: "Design Principles",
      dueDate: "2025-10-22",
      points: 100,
      difficulty: "Medium",
      status: "In Progress",
      submitted: false
    },
    {
      id: 5,
      title: "Machine Learning Model",
      course: "AI Fundamentals",
      dueDate: "2025-10-24",
      points: 120,
      difficulty: "Hard",
      status: "Not Started",
      submitted: false
    }
  ];

  const submittedAssignments = [
    {
      id: 6,
      title: "JavaScript ES6 Features",
      course: "Web Development",
      submittedDate: "2025-10-15",
      points: 85,
      maxPoints: 100,
      grade: "B+",
      feedback: "Good work! Consider edge cases."
    }
  ];

  const handleEnroll = (assignmentId: number, title: string) => {
    toast({
      title: "Enrolled Successfully!",
      description: `You've enrolled in: ${title}`,
    });
  };

  const handleSubmit = (assignmentId: number, title: string) => {
    toast({
      title: "Assignment Submitted!",
      description: `${title} has been submitted for grading.`,
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/20 text-success";
      case "Medium": return "bg-warning/20 text-warning";
      case "Hard": return "bg-destructive/20 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredAvailable = availableAssignments.filter(a =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/student/dashboard")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Assignments
              </h1>
              <p className="text-muted-foreground mt-1">
                Browse, enroll, and submit your assignments
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assignments by title or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">
              Available ({filteredAvailable.length})
            </TabsTrigger>
            <TabsTrigger value="enrolled">
              My Assignments ({enrolledAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="submitted">
              Submitted ({submittedAssignments.length})
            </TabsTrigger>
          </TabsList>

          {/* Available Assignments */}
          <TabsContent value="available" className="space-y-4">
            {filteredAvailable.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        {assignment.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {assignment.course}
                      </CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(assignment.difficulty)}>
                      {assignment.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {assignment.description}
                  </p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {assignment.points} points
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => handleEnroll(assignment.id, assignment.title)}
                    className="w-full"
                  >
                    Enroll in Assignment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* Enrolled Assignments */}
          <TabsContent value="enrolled" className="space-y-4">
            {enrolledAssignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        {assignment.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {assignment.course}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getDifficultyColor(assignment.difficulty)}>
                        {assignment.difficulty}
                      </Badge>
                      <Badge variant={assignment.status === "In Progress" ? "default" : "secondary"}>
                        {assignment.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {assignment.points} points
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Resources
                  </Button>
                  <Button
                    onClick={() => handleSubmit(assignment.id, assignment.title)}
                    className="flex-1"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Assignment
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          {/* Submitted Assignments */}
          <TabsContent value="submitted" className="space-y-4">
            {submittedAssignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        {assignment.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {assignment.course}
                      </CardDescription>
                    </div>
                    <Badge className="bg-success/20 text-success">
                      Grade: {assignment.grade}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Submitted: {new Date(assignment.submittedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        {assignment.points}/{assignment.maxPoints} points
                      </div>
                    </div>
                    {assignment.feedback && (
                      <div className="p-3 bg-muted/50 rounded-md">
                        <p className="text-sm font-medium mb-1">Teacher Feedback:</p>
                        <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Submission
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentAssignments;
