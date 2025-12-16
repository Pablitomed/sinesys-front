 'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { CheckCircle, Clock, Loader2 } from 'lucide-react';

const EXPERTS = ['IAR', 'EED', 'NEXUS', 'CFO', 'MKTG', 'TENDÊNCIAS', 'COO-CORE', 'MONITOR-LITE'];

function AnalysisContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<any>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      const isTestMode = searchParams.get('test') === 'true';
      const tier = searchParams.get('tier') as 'CONSULTANT' | 'PARTNER' | null;
      
      if (isTestMode && tier) {
        console.log('🧪 Modo teste ativado');
        try {
          const analysisData = await api.createAnalysis(tier);
          if (!mounted) return;
          setAnalysisId(analysisData.id);
          
          await api.pollAnalysis(analysisData.id, (statusUpdate) => {
            if (mounted) setStatus(statusUpdate);
          });
          
          if (mounted) router.push(`/results?id=${analysisData.id}`);
        } catch (error: any) {
          if (mounted) {
            toast.error(error.message || 'Erro ao criar análise');
            router.push('/dashboard');
          }
        }
        return;
      }

      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        toast.error('Sessão não encontrada');
        router.push('/dashboard');
        return;
      }

      try {
        const id = await api.findAnalysisIdFromSession(sessionId);
        if (!id) {
          toast.error('Análise não encontrada');
          router.push('/dashboard');
          return;
        }
        
        if (!mounted) return;
        setAnalysisId(id);
        
        await api.pollAnalysis(id, (statusUpdate) => {
          if (mounted) setStatus(statusUpdate);
        });
        
        if (mounted) router.push(`/results?id=${id}`);
      } catch (error: any) {
        if (mounted) {
          toast.error(error.message || 'Erro ao buscar análise');
          router.push('/dashboard');
        }
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, [searchParams, router]);

  if (!status) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1e3a8a]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl">Análise em Progresso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-[#1e3a8a]/10 relative">
                <div className="text-4xl font-bold text-[#1e3a8a]">{status.progress || 0}%</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle cx="64" cy="64" r="60" stroke="#1e3a8a" strokeWidth="8" fill="none" strokeDasharray={`${2 * Math.PI * 60}`} strokeDashoffset={`${2 * Math.PI * 60 * (1 - (status.progress || 0) / 100)}`} strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="text-gray-600">
                <p className="text-lg font-medium">{status.status === 'processing' ? 'Processando...' : 'Aguardando...'}</p>
                <p className="text-sm">Tempo estimado: {status.estimatedCompletion || '5-10 minutos'}</p>
              </div>
            </div>

            <Progress value={status.progress || 0} className="h-2" />

            <div>
              <h3 className="font-semibold mb-4 text-center">Status dos Experts</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {EXPERTS.map((expert) => {
                  const isComplete = status.expertsCompleted?.includes(expert);
                  const isProcessing = !isComplete && status.progress > 0;
                  return (
                    <div key={expert} className={`p-3 rounded-lg border ${isComplete ? 'bg-green-50 border-green-200' : isProcessing ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center gap-2">
                        {isComplete ? (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        ) : isProcessing ? (
                          <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-400" />
                        )}
                        <span className="text-sm font-medium">{expert}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AnalysisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#1e3a8a]" /></div>}>
      <AnalysisContent />
    </Suspense>
  );
}
