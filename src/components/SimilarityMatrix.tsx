
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SimilarityResult {
  id1: string;
  id2: string;
  similarity: number;
  label1: string;
  label2: string;
}

interface SimilarityMatrixProps {
  results: SimilarityResult[];
  threshold: number;
}

const SimilarityMatrix: React.FC<SimilarityMatrixProps> = ({ results, threshold }) => {
  // Create a map of all unique text labels
  const allLabels = Array.from(new Set([
    ...results.map(r => r.label1),
    ...results.map(r => r.label2)
  ])).sort((a, b) => {
    const numA = parseInt(a.replace('Text ', ''));
    const numB = parseInt(b.replace('Text ', ''));
    return numA - numB;
  });

  // Create similarity lookup
  const similarityLookup = new Map<string, number>();
  results.forEach(result => {
    const key1 = `${result.label1}-${result.label2}`;
    const key2 = `${result.label2}-${result.label1}`;
    similarityLookup.set(key1, result.similarity);
    similarityLookup.set(key2, result.similarity);
  });

  const getSimilarity = (label1: string, label2: string): number => {
    if (label1 === label2) return 100;
    return similarityLookup.get(`${label1}-${label2}`) || 0;
  };

  const getColorClass = (similarity: number): string => {
    if (similarity >= 100) return 'bg-gray-200 text-gray-600';
    if (similarity >= 80) return 'bg-red-500 text-white';
    if (similarity >= 60) return 'bg-orange-500 text-white';
    if (similarity >= 40) return 'bg-yellow-500 text-gray-900';
    return 'bg-green-500 text-white';
  };

  return (
    <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Similarity Matrix</CardTitle>
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>High (80-100%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Moderate (60-79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Low (40-59%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Very Low (0-39%)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                  
                </th>
                {allLabels.map(label => (
                  <th key={label} className="p-2 text-center border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 min-w-[80px]">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allLabels.map(rowLabel => (
                <tr key={rowLabel}>
                  <td className="p-2 font-medium border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                    {rowLabel}
                  </td>
                  {allLabels.map(colLabel => {
                    const similarity = getSimilarity(rowLabel, colLabel);
                    return (
                      <td 
                        key={colLabel}
                        className={`p-2 text-center border border-gray-300 dark:border-gray-600 font-medium ${getColorClass(similarity)}`}
                      >
                        {similarity === 100 ? '-' : `${Math.round(similarity)}%`}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimilarityMatrix;
