
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const HelpDialog: React.FC<HelpDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>How Semantic Similarity Analysis Works</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What is Semantic Similarity?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Semantic similarity measures how closely related two pieces of text are in terms of 
                meaning, not just exact word matches. This approach can detect paraphrased content, 
                rephrased sentences, and conceptually similar ideas that traditional word-matching 
                methods might miss.
              </p>
            </CardContent>
          </Card>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="embedding-models">
              <AccordionTrigger>Embedding Models Explained</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">OpenAI Embeddings</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      High-quality embeddings from OpenAI's text-embedding models. Excellent for 
                      understanding context and nuanced meanings.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">Sentence-BERT</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Specialized for sentence-level similarity. Great for academic and formal text analysis.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">Universal Sentence Encoder</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Google's multilingual model, good for diverse content types and languages.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold">Google PaLM</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Advanced language model embeddings with strong reasoning capabilities.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="interpreting-results">
              <AccordionTrigger>Interpreting Similarity Scores</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="font-medium">80-100%: High Similarity</span>
                    <span className="text-sm text-gray-600">Likely plagiarism or very similar content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span className="font-medium">60-79%: Moderate Similarity</span>
                    <span className="text-sm text-gray-600">Requires review, possible paraphrasing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <span className="font-medium">40-59%: Low Similarity</span>
                    <span className="text-sm text-gray-600">Some common themes or topics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="font-medium">0-39%: Very Low Similarity</span>
                    <span className="text-sm text-gray-600">Likely original content</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="best-practices">
              <AccordionTrigger>Best Practices</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li>• Use at least 50-100 words per text for accurate analysis</li>
                  <li>• Adjust threshold based on your specific requirements</li>
                  <li>• Consider context - academic papers may naturally have higher similarity</li>
                  <li>• Use multiple embedding models for comprehensive analysis</li>
                  <li>• Review high-similarity pairs manually for final determination</li>
                  <li>• Remember that similarity doesn't always indicate plagiarism</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="limitations">
              <AccordionTrigger>Limitations & Considerations</AccordionTrigger>
              <AccordionContent className="space-y-3">
                <ul className="space-y-2 text-sm">
                  <li>• This is a demonstration tool - production use requires real embedding APIs</li>
                  <li>• Semantic similarity is one indicator, not definitive proof of plagiarism</li>
                  <li>• Common phrases and standard terminology may show high similarity</li>
                  <li>• Different embedding models may produce varying results</li>
                  <li>• Consider domain-specific context when interpreting results</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
