'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, TrendingUp, Zap, Shield } from 'lucide-react';
import { api } from '@/lib/api';
import { useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (api.isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-[#1e3a8a]" />
            <span className="text-2xl font-bold text-[#1e3a8a]">Synesis</span>
          </div>
          <Button onClick={() => router.push('/auth')} variant="outline">Entrar</Button>
        </div>
      </header>

      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Consultoria Estratégica Potencializada por IA</h1>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            8 Especialistas de IA analisam seu negócio em minutos
          </p>
          <Button onClick={() => router.push('/auth')} size="lg" variant="secondary">
            Começar Análise Agora
          </Button>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Escolha seu Pacote</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>CONSULTANT</CardTitle>
                <CardDescription>Análise direcionada</CardDescription>
                <div className="text-3xl font-bold text-[#1e3a8a] mt-4">{formatCurrency(549)}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>3 experts mais alinhados</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>Resposta direta e objetiva</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>Entrega em 3-5 minutos</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>Relatório PDF</span></li>
                </ul>
                <Button onClick={() => router.push('/auth')} className="w-full mt-6">Escolher Plano</Button>
              </CardContent>
            </Card>

            <Card className="border-[#f59e0b] border-2 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f59e0b] text-white px-4 py-1 rounded-full text-sm font-medium">RECOMENDADO</div>
              <CardHeader>
                <CardTitle>PARTNER</CardTitle>
                <CardDescription>Análise completa</CardDescription>
                <div className="text-3xl font-bold text-[#f59e0b] mt-4">{formatCurrency(1890)}</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>8 experts completos</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>Plano estratégico detalhado</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>Roadmap de execução</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>Entrega em 5-10 minutos</span></li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5" /><span>Relatório Premium PDF</span></li>
                </ul>
                <Button onClick={() => router.push('/auth')} variant="secondary" className="w-full mt-6">Escolher Plano</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2025 Synesis. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
