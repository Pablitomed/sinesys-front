import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

export function getConfidenceColor(confidence: string): string {
  switch (confidence.toLowerCase()) {
    case 'alta': return 'text-green-600 bg-green-50';
    case 'média': case 'media': return 'text-yellow-600 bg-yellow-50';
    case 'baixa': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
}

export function getNexusScoreColor(score: number): string {
  if (score >= 70) return 'text-green-600';
  if (score >= 40) return 'text-yellow-600';
  return 'text-red-600';
}

export function getSectorIcon(sector: string): string {
  const icons: Record<string, string> = {
    tecnologia: '💻', saúde: '🏥', saude: '🏥', varejo: '🛍️',
    alimentos: '🍽️', serviços: '🔧', servicos: '🔧',
    educação: '📚', educacao: '📚'
  };
  return icons[sector.toLowerCase()] || '📊';
}
