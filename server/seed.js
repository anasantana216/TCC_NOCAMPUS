const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedData() {
  try {
    console.log('🌱 Seeding database...');

    // Criar eventos de exemplo
    await prisma.event.createMany({
      data: [
        {
          title: 'Palestra sobre Tecnologia',
          description: 'Uma palestra inspiradora sobre as últimas tendências em tecnologia e como elas impactam nossa sociedade.',
          date: '2025-10-15',
          location: 'Auditório Principal',
          category: 'Tecnologia'
        },
        {
          title: 'Workshop de Design',
          description: 'Aprenda técnicas modernas de design digital e UX/UI para criar experiências incríveis.',
          date: '2025-10-20',
          location: 'Lab de Design',
          category: 'Design'
        },
        {
          title: 'Feira de Profissões',
          description: 'Conheça diversas oportunidades de carreira e network com profissionais da área.',
          date: '2025-10-25',
          location: 'Pátio Central',
          category: 'Carreira'
        }
      ]
    });

    // Criar enquete de exemplo
    const poll = await prisma.poll.create({
      data: {
        title: 'Qual seu evento favorito no campus?',
        description: 'Queremos sua opinião sobre os tipos de eventos do UNASP EC',
        isActive: true,
        options: {
          create: [
            { text: 'Palestras', votes: 45 },
            { text: 'Workshops', votes: 32 },
            { text: 'Eventos Culturais', votes: 28 },
            { text: 'Feiras de Profissões', votes: 15 }
          ]
        }
      }
    });

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created poll: ${poll.title}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();