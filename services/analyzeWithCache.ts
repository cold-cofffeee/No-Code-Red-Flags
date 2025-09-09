import { getCachedResponse, saveResponseToCache } from './cacheService';
import { AnalysisResult } from '../types';

export const analyzeStartupIdeaWithCache = async (idea: string): Promise<AnalysisResult> => {
  const cached = await getCachedResponse(idea);
  if (cached) {
    return cached;
  }
  const { analyzeStartupIdea } = await import('./geminiService');
  const result = await analyzeStartupIdea(idea);
  await saveResponseToCache(idea, result);
  return result;
};