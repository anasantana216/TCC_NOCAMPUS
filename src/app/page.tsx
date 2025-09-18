'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (!isAuthenticated) {
      // Se não estiver autenticado, redirecionar para login
      router.push('/login');
    } else {
      // Se estiver autenticado, redirecionar para dashboard
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando...</p>
      </div>
    </div>
  );
}