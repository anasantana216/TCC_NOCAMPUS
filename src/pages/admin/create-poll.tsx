import { useState } from 'react';
import type { NextPage } from 'next';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

interface PollOption {
  id: string;
  text: string;
}

const CreatePoll: NextPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [options, setOptions] = useState<PollOption[]>([
    { id: '1', text: '' },
    { id: '2', text: '' }
  ]);

  const handleAddOption = () => {
    setOptions([
      ...options,
      { id: String(options.length + 1), text: '' }
    ]);
  };

  const handleOptionChange = (id: string, value: string) => {
    setOptions(options.map(option =>
      option.id === id ? { ...option, text: value } : option
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de criação da enquete
    const pollData = {
      title,
      description,
      category,
      location,
      startDate,
      endDate,
      options: options.filter(opt => opt.text.trim() !== '')
    };
    console.log('Poll data:', pollData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-2xl font-bold mb-8">Criar Nova Enquete</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  
                  <Input
                    label="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                  
                  <Input
                    label="Categoria"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                  
                  <Input
                    label="Local"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="datetime-local"
                      label="Data de Início"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                    
                    <Input
                      type="datetime-local"
                      label="Data de Término"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Opções
                    </label>
                    {options.map((option) => (
                      <Input
                        key={option.id}
                        value={option.text}
                        onChange={(e) => handleOptionChange(option.id, e.target.value)}
                        placeholder={`Opção ${option.id}`}
                        required
                      />
                    ))}
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddOption}
                    >
                      Adicionar Opção
                    </Button>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit">
                      Criar Enquete
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
