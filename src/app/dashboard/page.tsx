
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { CheckCircle, LogOut, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState('');

  useEffect(() => {
    if (!api.isAuthenticated()) {
      router.push('/auth');
      return;
    }
    setUser(api.getUser());
  }, [router]);

  const handleSelectPlan = async (tier: 'CONSULTANT' | 'PARTNER') => {
    setLoading(tier);
    // MODO TESTE: Vai direto para análise sem pagamento
    console.log('🧪 Modo teste ativado - indo direto para análise');
    router.push(`/analysis?tier=${tier}&test=true`);
  };

  const handleLogout = () => {
    api.logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-[#1e3a8a]" />
            <span className="text-2xl font-bold text-[#1e3a8a]">Synesis</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Olá, {user.name}</span>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo, {user.name}!</h1>
          <p className="text-gray-600">Escolha o pacote ideal para sua análise estratégica</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>CONSULTANT</CardTitle>
              <CardDescription>Análise direcionada e objetiva</CardDescription>
              <div className="text-3xl font-bold text-[#1e3a8a] mt-4">{formatCurrency(549)}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span>3 experts mais alinhados ao seu caso</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span>Resposta direta e objetiva</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span>Entrega em 3-5 minutos</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span>Relatório PDF completo</span></li>
              </ul>
              <Button onClick={() => handleSelectPlan('CONSULTANT')} className="w-full" disabled={!!loading}>
                {loading === 'CONSULTANT' ? 'Processando...' : 'Escolher Plano'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-[#f59e0b] border-2 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f59e0b] text-white px-4 py-1 rounded-full text-sm font-medium">RECOMENDADO</div>
            <CardHeader>
              <CardTitle>PARTNER</CardTitle>
              <CardDescription>Análise completa e aprofundada</CardDescription>
              <div className="text-3xl font-bold text-[#f59e0b] mt-4">{formatCurrency(1890)}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span>8 experts trabalhando simultaneamente</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span>Plano estratégico detalhado</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span>Roadmap de execução completo</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span>Entrega em 5-10 minutos</span></li>
                <li className="flex items-start gap-2"><CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" /><span>Relatório Premium PDF</span></li>
              </ul>
              <Button onClick={() => handleSelectPlan('PARTNER')} variant="secondary" className="w-full" disabled={!!loading}>
                {loading === 'PARTNER' ? 'Processando...' : 'Escolher Plano'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
