import type { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import Avatar from '@/components/Avatar';

const Profile: NextPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Ana Julia',
    email: 'ana.julia@eaportal.unasp.br',
    course: 'Sistemas de Informação',
    semester: '6º Semestre',
    phone: '(15) 99999-9999',
    birth: '1999-05-15',
    bio: 'Estudante de Sistemas de Informação apaixonada por tecnologia e inovação.',
    profileImage: '/default-avatar.png'
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
    // Aqui seria feita a chamada à API para salvar os dados
    alert('Perfil atualizado com sucesso!');
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setTempData(prev => ({
            ...prev,
            profileImage: e.target?.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-primary hover:text-primary-dark mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold">
                <span className="text-primary">No</span><span className="text-yellow-500">Campus</span>
                <span className="text-sm text-gray-600 ml-2">UNASP</span>
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">
                Dashboard
              </Link>
              <Link href="/events" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">
                Eventos
              </Link>
              <Link href="/polls" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md transition-colors">
                Enquetes
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h2>
          <p className="text-gray-600">Gerencie suas informações pessoais e preferências da UNASP.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cover/Header Section */}
          <div className="bg-gradient-to-r from-primary to-secondary h-32 relative">
            <div className="absolute bottom-0 left-0 right-0 px-6 pb-4">
              <div className="flex items-end space-x-4">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-white overflow-hidden">
                    <Avatar 
                      src={tempData.profileImage !== '/default-avatar.png' ? tempData.profileImage : undefined}
                      name={tempData.name}
                      size="xl"
                      className="border-0"
                    />
                  </div>
                  
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-secondary text-white rounded-full p-1 cursor-pointer hover:bg-secondary-dark transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                
                {/* Basic Info */}
                <div className="text-white pb-2">
                  <h3 className="text-xl font-semibold">{profileData.name}</h3>
                  <p className="text-blue-100">{profileData.course}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-6">
            {/* Action Buttons */}
            <div className="flex justify-end mb-6">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Editar Perfil
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors"
                  >
                    Salvar
                  </button>
                </div>
              )}
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Informações Pessoais
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={tempData.birth}
                      onChange={(e) => handleInputChange('birth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                    />
                  ) : (
                    <p className="text-gray-900">{new Date(profileData.birth).toLocaleDateString('pt-BR')}</p>
                  )}
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                  Informações Acadêmicas
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
                  {isEditing ? (
                    <select
                      value={tempData.course}
                      onChange={(e) => handleInputChange('course', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                    >
                      <option value="Sistemas de Informação">Sistemas de Informação</option>
                      <option value="Engenharia de Computação">Engenharia de Computação</option>
                      <option value="Ciência da Computação">Ciência da Computação</option>
                      <option value="Design Gráfico">Design Gráfico</option>
                      <option value="Administração">Administração</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{profileData.course}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semestre</label>
                  {isEditing ? (
                    <select
                      value={tempData.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                    >
                      <option value="1º Semestre">1º Semestre</option>
                      <option value="2º Semestre">2º Semestre</option>
                      <option value="3º Semestre">3º Semestre</option>
                      <option value="4º Semestre">4º Semestre</option>
                      <option value="5º Semestre">5º Semestre</option>
                      <option value="6º Semestre">6º Semestre</option>
                      <option value="7º Semestre">7º Semestre</option>
                      <option value="8º Semestre">8º Semestre</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{profileData.semester}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
                  {isEditing ? (
                    <textarea
                      value={tempData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-secondary focus:border-secondary"
                      placeholder="Conte um pouco sobre você..."
                    />
                  ) : (
                    <p className="text-gray-900">{profileData.bio}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Statistics Section */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary-light bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-gray-600">Eventos Participados</div>
                </div>
                <div className="bg-secondary-light bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">8</div>
                  <div className="text-sm text-gray-600">Enquetes Votadas</div>
                </div>
                <div className="bg-accent-light bg-opacity-20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-accent">5</div>
                  <div className="text-sm text-gray-600">Mês Atual</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;