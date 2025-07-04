
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SimilarityResult {
  id1: string;
  id2: string;
  similarity: number;
  label1: string;
  label2: string;
}

interface ResultsSectionProps {
  results: SimilarityResult[];
  threshold: number;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, threshold }) => {
  const potentialClones = results.filter(result => result.similarity >= threshold);
  const averageSimilarity = results.reduce((sum, result) => sum + result.similarity, 0) / results.length;
  const highestMatch = results.reduce((max, result) => result.similarity > max.similarity ? result : max, results[0]);

  const getSeverityBadge = (similarity: number) => {
    if (similarity >= 80) return <Badge variant="destructive">High Risk</Badge>;
    if (similarity >= 60) return <Badge className="bg-orange-500">Moderate Risk</Badge>;
    if (similarity >= 40) return <Badge className="bg-yellow-500 text-gray-900">Low Risk</Badge>;
    return <Badge variant="secondary">Very Low Risk</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Analysis Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(averageSimilarity)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Average Similarity
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(highestMatch?.similarity || 0)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Highest Match
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {potentialClones.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Above Threshold
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Potential Clones */}
      <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Potential Plagiarism Detection</CardTitle>
        </CardHeader>
        <CardContent>
          {potentialClones.length === 0 ? (
            <Alert>
              <AlertDescription>
                No text pairs exceed the similarity threshold of {threshold}%. 
                This suggests low likelihood of plagiarism among the analyzed texts.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
                <AlertDescription>
                  Found {potentialClones.length} text pair(s) with similarity above {threshold}% threshold.
                  Review these pairs carefully for potential plagiarism.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                {potentialClones
                  .sort((a, b) => b.similarity - a.similarity)
                  .map((result, index) => (
                    <div 
                      key={`${result.id1}-${result.id2}`}
                      className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex-1">
                        <div className="font-medium">
                          {result.label1} ↔ {result.label2}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Similarity Score: {Math.round(result.similarity)}%
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-xl font-bold">
                          {Math.round(result.similarity)}%
                        </div>
                        {getSeverityBadge(result.similarity)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Comparisons */}
      <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>All Text Comparisons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {results
              .sort((a, b) => b.similarity - a.similarity)
              .map((result, index) => (
                <div 
                  key={`${result.id1}-${result.id2}`}
                  className="flex items-center justify-between p-3 border rounded bg-white dark:bg-gray-700"
                >
                  <div className="font-medium">
                    {result.label1} ↔ {result.label2}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-semibold">
                      {Math.round(result.similarity)}%
                    </div>
                    {getSeverityBadge(result.similarity)}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsSection;
