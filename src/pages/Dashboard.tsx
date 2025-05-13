
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Search } from "lucide-react";

const Dashboard = () => {
  // Mock data for past analyses
  const [analyses] = useState([
    {
      id: "1",
      patientId: "P12345",
      date: "2025-05-10",
      imageUrl: "https://via.placeholder.com/100x100.png?text=X-Ray",
      primaryDiagnosis: "Pneumonia",
      probability: 0.82,
    },
    {
      id: "2",
      patientId: "P12346",
      date: "2025-05-09",
      imageUrl: "https://via.placeholder.com/100x100.png?text=X-Ray",
      primaryDiagnosis: "Normal",
      probability: 0.95,
    },
    {
      id: "3",
      patientId: "P12347",
      date: "2025-05-07",
      imageUrl: "https://via.placeholder.com/100x100.png?text=X-Ray",
      primaryDiagnosis: "COVID-19",
      probability: 0.78,
    },
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 container py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-gray-500">
              View and manage your X-ray analyses
            </p>
          </div>
          <Button asChild>
            <a href="/upload">New Analysis</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyses.length}</div>
              <p className="text-xs text-gray-500">+2 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Abnormal Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-gray-500">67% of total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Normal Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-gray-500">33% of total</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search analyses..."
                  className="pl-8 w-full rounded-md border border-input bg-background py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Image
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Patient ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Primary Finding
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Probability
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyses.map((analysis) => (
                      <tr key={analysis.id} className="border-b">
                        <td className="p-4 align-middle">
                          <div className="h-10 w-10 overflow-hidden rounded bg-gray-100">
                            <img
                              src={analysis.imageUrl}
                              alt="X-ray thumbnail"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="p-4 align-middle font-medium">
                          {analysis.patientId}
                        </td>
                        <td className="p-4 align-middle text-muted-foreground">
                          {analysis.date}
                        </td>
                        <td className="p-4 align-middle">
                          <div className={`font-medium ${analysis.primaryDiagnosis === "Normal" ? "text-green-600" : "text-red-600"}`}>
                            {analysis.primaryDiagnosis}
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          {Math.round(analysis.probability * 100)}%
                        </td>
                        <td className="p-4 align-middle">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
