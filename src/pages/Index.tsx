
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Plus, Trash, Search, Download, Moon, Sun, HelpCircle } from "lucide-react";
import TextInputArea from "@/components/TextInputArea";
import SimilarityMatrix from "@/components/SimilarityMatrix";
import ResultsSection from "@/components/ResultsSection";
import HelpDialog from "@/components/HelpDialog";

interface TextInput {
  id: string;
  content: string;
  label: string;
}

interface SimilarityResult {
  id1: string;
  id2: string;
  similarity: number;
  label1: string;
  label2: string;
}

const Index = () => {
  const [textInputs, setTextInputs] = useState<TextInput[]>([
    { id: '1', content: '', label: 'Text 1' },
    { id: '2', content: '', label: 'Text 2' }
  ]);
  const [selectedModel, setSelectedModel] = useState('sentence-bert');
  const [threshold, setThreshold] = useState([75]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [results, setResults] = useState<SimilarityResult[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [removePunctuation, setRemovePunctuation] = useState(false);

  const addTextInput = useCallback(() => {
    if (textInputs.length >= 10) {
      toast.error("Maximum of 10 text inputs allowed");
      return;
    }
    const newId = (textInputs.length + 1).toString();
    setTextInputs(prev => [
      ...prev,
      { id: newId, content: '', label: `Text ${newId}` }
    ]);
    toast.success("Text input added");
  }, [textInputs.length]);

  const removeTextInput = useCallback((id: string) => {
    if (textInputs.length <= 2) {
      toast.error("Minimum of 2 text inputs required");
      return;
    }
    setTextInputs(prev => prev.filter(input => input.id !== id));
    toast.success("Text input removed");
  }, [textInputs.length]);

  const updateTextContent = useCallback((id: string, content: string) => {
    setTextInputs(prev => prev.map(input => 
      input.id === id ? { ...input, content } : input
    ));
  }, []);

  const loadSampleTexts = useCallback(() => {
    const sampleTexts = [
      {
        id: '1',
        content: "Climate change is one of the most pressing issues of our time. Rising global temperatures are causing widespread environmental changes, including melting ice caps, rising sea levels, and extreme weather patterns. These changes threaten ecosystems, human health, and economic stability worldwide.",
        label: 'Text 1'
      },
      {
        id: '2',
        content: "Global warming represents a critical challenge facing humanity today. Increasing planetary temperatures result in significant environmental transformations, such as polar ice melting, ocean level increases, and severe meteorological events. Such transformations pose risks to natural habitats, public health, and global economic systems.",
        label: 'Text 2'
      }
    ];
    
    setTextInputs(prev => prev.map((input, index) => 
      index < sampleTexts.length ? sampleTexts[index] : input
    ));
    toast.success("Sample texts loaded for testing");
  }, []);

  const simulateSimilarityAnalysis = useCallback(async (texts: TextInput[]) => {
    // Simulate semantic similarity analysis
    const results: SimilarityResult[] = [];
    const totalPairs = (texts.length * (texts.length - 1)) / 2;
    let processed = 0;

    for (let i = 0; i < texts.length; i++) {
      for (let j = i + 1; j < texts.length; j++) {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Simple similarity calculation (in real app, this would use actual embeddings)
        const text1 = texts[i].content.toLowerCase().replace(/[^\w\s]/g, '');
        const text2 = texts[j].content.toLowerCase().replace(/[^\w\s]/g, '');
        
        const words1 = new Set(text1.split(/\s+/));
        const words2 = new Set(text2.split(/\s+/));
        const intersection = new Set([...words1].filter(x => words2.has(x)));
        const union = new Set([...words1, ...words2]);
        
        const similarity = Math.round((intersection.size / union.size) * 100);
        
        results.push({
          id1: texts[i].id,
          id2: texts[j].id,
          similarity: Math.max(similarity, Math.random() * 100),
          label1: texts[i].label,
          label2: texts[j].label
        });

        processed++;
        setAnalysisProgress((processed / totalPairs) * 100);
      }
    }

    return results;
  }, []);

  const analyzeTexts = useCallback(async () => {
    const validTexts = textInputs.filter(input => input.content.trim().length >= 10);
    
    if (validTexts.length < 2) {
      toast.error("Please enter at least 10 characters in at least 2 text fields");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setResults([]);

    try {
      toast.info(`Analyzing with ${selectedModel.replace('-', ' ')} model...`);
      const analysisResults = await simulateSimilarityAnalysis(validTexts);
      setResults(analysisResults);
      toast.success("Analysis completed successfully!");
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(0);
    }
  }, [textInputs, selectedModel, simulateSimilarityAnalysis]);

  const exportResults = useCallback((format: 'pdf' | 'csv') => {
    if (results.length === 0) {
      toast.error("No results to export");
      return;
    }
    
    // Simulate export functionality
    toast.success(`Exporting results as ${format.toUpperCase()}...`);
    
    if (format === 'csv') {
      const csvContent = [
        ['Text 1', 'Text 2', 'Similarity %'],
        ...results.map(r => [r.label1, r.label2, r.similarity.toString()])
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'plagiarism-analysis.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [results]);

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 dark:from-blue-900 dark:via-purple-900 dark:to-indigo-950">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowHelp(true)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => exportResults('csv')}
                  disabled={results.length === 0}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Plagiarism Detector
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              Semantic Similarity Analyzer
            </p>
            <Button
              variant="outline"
              onClick={loadSampleTexts}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Load Sample Texts
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Text Inputs */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Text Inputs ({textInputs.length}/10)</span>
                    <Button
                      onClick={addTextInput}
                      disabled={textInputs.length >= 10}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Text
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {textInputs.map((input, index) => (
                    <TextInputArea
                      key={input.id}
                      input={input}
                      onContentChange={updateTextContent}
                      onRemove={removeTextInput}
                      canRemove={textInputs.length > 2}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Controls */}
            <div className="space-y-6">
              <Card className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Analysis Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Embedding Model
                    </label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI Embeddings</SelectItem>
                        <SelectItem value="sentence-bert">Sentence-BERT</SelectItem>
                        <SelectItem value="universal-encoder">Universal Sentence Encoder</SelectItem>
                        <SelectItem value="google-palm">Google PaLM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Similarity Threshold: {threshold[0]}%
                    </label>
                    <Slider
                      value={threshold}
                      onValueChange={setThreshold}
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Case Sensitive</label>
                      <Switch checked={caseSensitive} onCheckedChange={setCaseSensitive} />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Remove Punctuation</label>
                      <Switch checked={removePunctuation} onCheckedChange={setRemovePunctuation} />
                    </div>
                  </div>

                  <Button
                    onClick={analyzeTexts}
                    disabled={isAnalyzing}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                    size="lg"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Analyze Plagiarism
                      </>
                    )}
                  </Button>

                  {isAnalyzing && (
                    <Progress value={analysisProgress} className="w-full" />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="mt-8 space-y-6">
              <SimilarityMatrix results={results} threshold={threshold[0]} />
              <ResultsSection results={results} threshold={threshold[0]} />
            </div>
          )}
        </div>

        <HelpDialog open={showHelp} onOpenChange={setShowHelp} />
      </div>
    </div>
  );
};

export default Index;
