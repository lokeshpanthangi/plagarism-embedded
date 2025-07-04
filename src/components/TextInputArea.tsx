
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";

interface TextInput {
  id: string;
  content: string;
  label: string;
}

interface TextInputAreaProps {
  input: TextInput;
  onContentChange: (id: string, content: string) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}

const TextInputArea: React.FC<TextInputAreaProps> = ({
  input,
  onContentChange,
  onRemove,
  canRemove
}) => {
  const characterCount = input.content.length;
  const maxLength = 10000;

  return (
    <Card className="relative">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {input.label}
          </label>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${
              characterCount < 10 ? 'text-red-500' : 
              characterCount > maxLength * 0.9 ? 'text-orange-500' : 
              'text-gray-500'
            }`}>
              {characterCount}/{maxLength}
            </span>
            {canRemove && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => onRemove(input.id)}
                className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
        <Textarea
          value={input.content}
          onChange={(e) => onContentChange(input.id, e.target.value)}
          placeholder="Enter your text here for plagiarism analysis..."
          className="min-h-[120px] resize-none"
          maxLength={maxLength}
        />
        {characterCount < 10 && (
          <p className="text-xs text-red-500 mt-1">
            Minimum 10 characters required for analysis
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default TextInputArea;
