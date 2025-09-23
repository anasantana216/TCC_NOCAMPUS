import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';

const Events: NextPage = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50'>
      <header className='bg-white shadow-sm border-b border-blue-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <Link href='/dashboard' className='text-blue-600 hover:text-blue-800 mr-4'>
                ← Voltar ao Dashboard
              </Link>
              <h1 className='text-2xl font-bold text-gray-900'>Eventos UNASP</h1>
            </div>
          </div>
        </div>
      </header>
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='bg-white rounded-lg shadow-sm border border-blue-100 p-6'>
          <h2 className='text-lg font-semibold text-gray-900 mb-4'>Eventos do Campus</h2>
          <div className='text-center py-12'>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>Página de Eventos</h3>
            <p className='text-gray-500'>Eventos da UNASP serão listados aqui em breve.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;
