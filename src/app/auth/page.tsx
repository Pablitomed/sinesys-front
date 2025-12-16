'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { TrendingUp } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', name: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await api.login(form.email, form.password);
        toast.success('Login realizado com sucesso!');
      } else {
        await api.register(form.email, form.password, form.name);
        toast.success('Conta criada com sucesso!');
      }
      router.push('/dashboard');
    } catch (error: any) {
     // Linha 33 - ANTES:
router.push('/dashboard');

// Linha 33 - DEPOIS:
window.location.href = '/dashboard';
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <TrendingUp className="h-10 w-10" />
            <span className="text-3xl font-bold">Synesis</span>
          </div>
          <blockquote className="space-y-4">
            <p className="text-xl font-medium">
              "A Synesis transformou como tomamos decisões estratégicas. Em minutos, temos insights que levariam semanas para obter com consultorias tradicionais."
            </p>
            <footer className="text-sm text-blue-100">Carlos Silva, CEO de TechStart</footer>
          </blockquote>
        </div>
        <div className="space-y-2 text-sm text-blue-100">
          <p>✓ 8 especialistas de IA</p>
          <p>✓ Resultados em minutos</p>
          <p>✓ Relatórios detalhados</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{isLogin ? 'Entrar' : 'Criar Conta'}</CardTitle>
            <CardDescription>
              {isLogin ? 'Entre com suas credenciais' : 'Crie sua conta para começar'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-[#1e3a8a] hover:underline">
                {isLogin ? 'Não tem conta? Criar agora' : 'Já tem conta? Entrar'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
