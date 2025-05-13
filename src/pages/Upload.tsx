
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Upload, X } from "lucide-react";

const UploadPage = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<null | { disease: string; probability: number }[]>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Check if file is an image
    if (!selectedFile.type.includes("image")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);

    // Reset results when a new file is uploaded
    setResults(null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    setResults(null);
  };

  const handleAnalyzeXRay = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload an X-ray image to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock results - in a real app this would come from your ML model
      const mockResults = [
        { disease: "Pneumonia", probability: 0.82 },
        { disease: "COVID-19", probability: 0.12 },
        { disease: "Tuberculosis", probability: 0.05 },
        { disease: "Normal", probability: 0.01 }
      ];
      
      setResults(mockResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: "X-ray has been successfully analyzed.",
      });
    }, 2000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">X-Ray Analysis</h1>
          <p className="text-gray-500">
            Upload an X-ray image and our AI will analyze it to detect potential diseases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Upload X-Ray Image</h2>
              <p className="text-sm text-gray-500">
                Upload a chest X-ray image in JPG, PNG or DICOM format.
              </p>
            </div>

            {!file ? (
              <div className="border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center h-64 p-4">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-4">Drag and drop your X-ray image or click to browse</p>
                <label htmlFor="file-upload">
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <Button type="button" variant="outline">
                    Select File
                  </Button>
                </label>
              </div>
            ) : (
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                  <img
                    src={preview || ""}
                    alt="X-ray preview"
                    className="h-full w-full object-contain"
                  />
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="absolute top-2 right-2 h-8 w-8 p-0"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            )}

            <div className="mt-4">
              <Button 
                onClick={handleAnalyzeXRay} 
                disabled={!file || isAnalyzing} 
                className="w-full"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze X-Ray"}
              </Button>
            </div>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
              
              {!results && !isAnalyzing && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="text-gray-400 mb-2">No results yet</div>
                  <p className="text-sm text-gray-500">
                    Upload and analyze an X-ray to see results here
                  </p>
                </div>
              )}

              {isAnalyzing && (
                <div className="flex flex-col items-center justify-center h-64">
                  <div className="animate-pulse-slow h-16 w-16 rounded-full bg-blue-200 mb-4"></div>
                  <p className="text-primary font-medium">Analyzing X-ray...</p>
                  <p className="text-sm text-gray-500 mt-2">
                    This may take a few moments
                  </p>
                </div>
              )}

              {results && !isAnalyzing && (
                <div>
                  <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg">
                    <p className="text-sm font-medium text-green-800">
                      Analysis completed successfully
                    </p>
                  </div>
                  
                  <h3 className="text-md font-medium mb-3">Disease Probability</h3>
                  <div className="space-y-3">
                    {results.map((result) => (
                      <div key={result.disease} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{result.disease}</span>
                          <span className="text-sm font-bold">
                            {Math.round(result.probability * 100)}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div
                            className={`h-2 rounded-full ${
                              result.probability > 0.5 ? "bg-red-500" : "bg-primary"
                            }`}
                            style={{ width: `${result.probability * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <h3 className="text-md font-medium mb-3">Observations</h3>
                    <p className="text-sm text-gray-600">
                      {results[0].probability > 0.5 
                        ? `High probability of ${results[0].disease} detected. Further clinical correlation is advised.`
                        : "No significant abnormalities detected. Please correlate clinically."}
                    </p>
                  </div>

                  <div className="mt-6">
                    <Button variant="outline" className="w-full">
                      Download Full Report
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
