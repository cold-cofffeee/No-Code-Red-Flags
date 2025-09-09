export type Severity = "High" | "Medium" | "Low";
export type RiskCategory = "Market" | "Financial" | "Technical" | "Execution";

export interface RedFlag {
  title: string;
  description: string;
  severity: Severity;
  category: RiskCategory;
  suggestion: string;
}

export interface AnalysisResult {
  validationScore: number;
  scoreRationale: string;
  redFlags: RedFlag[];
  summary: string;
}

export interface HistoryItem {
  id: string;
  idea: string;
  result: AnalysisResult;
  timestamp: number;
  isSaved: boolean;
}
