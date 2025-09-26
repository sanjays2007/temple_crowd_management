
"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { temples } from "@/lib/temple-data";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { diagnoseCrowd, DiagnoseCrowdOutput } from "@/ai/flows/diagnose-crowd-flow";

type CrowdLevel = "Low" | "Moderate" | "High" | "Critical";

const crowdLevelColors: Record<CrowdLevel, string> = {
  Low: "bg-green-500",
  Moderate: "bg-yellow-500",
  High: "bg-orange-500",
  Critical: "bg-red-500",
};

export default function StatusPage() {
  const [analysisResult, setAnalysisResult] = useState<DiagnoseCrowdOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();
    
    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [toast]);

  const handleScanCrowd = async () => {
    if (!videoRef.current) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const photoDataUri = canvas.toDataURL('image/jpeg');

    try {
      const result = await diagnoseCrowd({ photoDataUri });
      setAnalysisResult(result);
       toast({
        title: "Analysis Complete",
        description: `Found ${result.peopleCount} people. Crowd is ${result.crowdLevel}.`
      });
    } catch (error) {
      console.error("AI analysis error:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze the image. Please try again."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const progress = analysisResult ? (analysisResult.estimatedWaitTime / 120) * 100 : 0;
  const templeForDemo = temples[0]; // Using Somnath for this demo

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          AI-Powered Crowd Detection
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Use your camera to get a real-time crowd analysis and estimated wait time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Video /> Live Camera Feed</CardTitle>
                <CardDescription>Point your camera towards the crowd and click "Scan Crowd".</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="relative w-full aspect-video rounded-md bg-secondary border overflow-hidden">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                </div>
                {hasCameraPermission === false && (
                    <Alert variant="destructive">
                      <AlertTitle>Camera Access Required</AlertTitle>
                      <AlertDescription>
                        Please allow camera access in your browser settings to use this feature.
                      </AlertDescription>
                    </Alert>
                )}
                <Button onClick={handleScanCrowd} disabled={isAnalyzing || !hasCameraPermission} className="w-full">
                    {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Camera className="mr-2 h-4 w-4" />}
                    {isAnalyzing ? 'Analyzing...' : 'Scan Crowd'}
                </Button>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{templeForDemo.name}</CardTitle>
                <CardDescription>{templeForDemo.location}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {isAnalyzing && (
                    <div className="flex flex-col items-center justify-center h-48">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="mt-4 text-muted-foreground">AI is analyzing the crowd...</p>
                    </div>
                )}
                {!isAnalyzing && !analysisResult && (
                     <div className="flex flex-col items-center justify-center h-48">
                        <p className="text-muted-foreground">Scan the crowd to see live status</p>
                    </div>
                )}
                {analysisResult && (
                    <>
                        <div className="flex justify-between items-center">
                            <span className="font-medium">Crowd Level</span>
                            <Badge 
                            className={cn(
                                "text-white",
                                crowdLevelColors[analysisResult.crowdLevel || "Low"]
                            )}
                            >
                            {analysisResult.crowdLevel}
                            </Badge>
                        </div>
                        <div>
                            <div className="flex justify-between items-baseline mb-2">
                                <span className="font-medium">Approx. Wait Time</span>
                                <span className="text-2xl font-bold text-primary">{analysisResult.estimatedWaitTime} mins</span>
                            </div>
                            <Progress value={progress} />
                        </div>
                        <p className="text-sm text-center">
                           Based on an AI analysis of <span className="font-bold">{analysisResult.peopleCount}</span> people.
                        </p>
                    </>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
