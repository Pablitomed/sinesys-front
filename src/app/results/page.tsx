'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Download, Home, Loader2 } from 'lucide-react';
import { getConfidenceColor, getNexusScoreColor, getSectorIcon } from '@/lib/utils';

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const id = searchParams.get('id');
    if (!id) {
      router.push('/dashboard');
      return;
    }

    loadResult(id);
  }, [searchParams, router]);

  const loadResult = async (id: string) => {
    try {
      const data = await api.getAnalysisResult(id);
      setResult(data);
    } catch (error: any) {
      toast.error(error.message || 'Erro ao carregar resultados');
      router.push('/dashboard');
    }
  };

  const handleDownloadPDF = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      const { pdfBase64 } = await api.generateReport(result.id);
      api.downloadPDF(pdfBase64, `synesis-${result.id}.pdf`);
      toast.success('PDF baixado com sucesso!');
    } catch (error: any) {
      toast.error(error.message || 'Erro ao baixar PDF');
    } finally {
      setDownloading(false);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#1e3a8a]" />
      </div>
    );
  }

  const output = result.output || {};
  const nexusScore = output.nexusScore || 0;
  const confidence = output.confidenceLevel || 'Média';
  const sector = output.sector || {};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <Button onClick={() => router.push('/dashboard')} variant="ghost" className="mb-4">
            <Home className="h-4 w-4 mr-2" />
            Voltar ao Dashboard
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">Análise Concluída</CardTitle>
                  <CardDescription>ID: {result.id}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleDownloadPDF} disabled={downloading} variant="secondary">
                    <Download className="h-4 w-4 mr-2" />
                    {downloading ? 'Baixando...' : 'Baixar PDF'}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className={`text-5xl font-bold ${getNexusScoreColor(nexusScore)}`}>{nexusScore}</div>
                  <div className="text-sm text-gray-600 mt-1">NEXUS Score</div>
                </div>
                <div className="text-center">
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getConfidenceColor(confidence)}`}>
                    {confidence}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Nível de Confiança</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl">{getSectorIcon(sector.name || '')}</div>
                  <div className="text-sm font-medium mt-1">{sector.name || 'N/A'}</div>
                </div>
              </div>
              {output.snippet && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700 italic">&quot;{output.snippet}&quot;</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="opportunities">Oportunidades</TabsTrigger>
              <TabsTrigger value="challenges">Desafios</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
              <TabsTrigger value="experts">Experts</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo Executivo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {output.summaryExecutive || 'Resumo não disponível'}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="opportunities" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Oportunidades Identificadas</CardTitle>
                </CardHeader>
                <CardContent>
                  {output.opportunities?.length > 0 ? (
                    <ul className="space-y-3">
                      {output.opportunities.map((opp: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Nenhuma oportunidade identificada</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="challenges" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Desafios e Riscos</CardTitle>
                </CardHeader>
                <CardContent>
                  {output.challenges?.length > 0 ? (
                    <ul className="space-y-3">
                      {output.challenges.map((challenge: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                          <span className="text-yellow-600 font-bold">⚠</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">Nenhum desafio identificado</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roadmap" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Roadmap Estratégico</CardTitle>
                </CardHeader>
                <CardContent>
                  {output.pathways?.length > 0 ? (
                    <div className="space-y-4">
                      {output.pathways.map((pathway: any, i: number) => (
                        <div key={i} className="border-l-4 border-[#1e3a8a] pl-4">
                          <h4 className="font-semibold text-lg">{pathway.title}</h4>
                          <p className="text-gray-600 mt-1">{pathway.description}</p>
                          <p className="text-sm text-gray-500 mt-2">Timeline: {pathway.timeline}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Roadmap não disponível</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experts" className="mt-6">
              <div className="space-y-4">
                {output.experts?.map((expert: any, i: number) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>{expert.name}</CardTitle>
                        <span className={`px-3 py-1 rounded-full text-sm ${getConfidenceColor(expert.confidence)}`}>
                          {expert.confidence}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose max-w-none">
                        {expert.response || 'Resposta não disponível'}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#1e3a8a]" /></div>}><ResultsContent /></Suspense>;
}
