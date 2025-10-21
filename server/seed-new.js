const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedData() {
  try {
    console.log('🌱 Seeding database...');

    // Limpar dados existentes (cuidado em produção!)
    try {
      await prisma.pollOption.deleteMany();
      await prisma.poll.deleteMany();
      await prisma.event.deleteMany();
      await prisma.notice.deleteMany();
      await prisma.user.deleteMany();
    } catch (error) {
      console.log('⚠️ Some tables might not exist yet, continuing...');
    }

    // Criar usuários
    await prisma.user.createMany({
      data: [
        {
          email: 'admin@unasp.edu.br',
          name: 'Administrador do Sistema',
          role: 'admin',
        },
        {
          email: 'ana.silva@unasp.edu.br',
          name: 'Ana Beatriz Silva',
          role: 'student',
          studentId: '2021001',
          course: 'Engenharia da Computação',
          semester: '6º',
        },
        {
          email: 'joao.santos@unasp.edu.br',
          name: 'João Santos',
          role: 'student',
          studentId: '2021002',
          course: 'Administração',
          semester: '4º',
        },
        {
          email: 'maria.oliveira@email.com',
          name: 'Maria Oliveira',
          role: 'guardian',
        }
      ]
    });

    // Criar avisos/notícias
    await prisma.notice.createMany({
      data: [
        {
          title: 'Início do período de matrículas 2025',
          content: 'As matrículas para o primeiro semestre de 2025 estarão abertas de 15 a 30 de dezembro. Não esqueça de renovar sua matrícula!',
          type: 'academic',
          priority: 'high',
          targetAudience: 'all',
        },
        {
          title: 'Manutenção programada do sistema',
          content: 'O sistema estará em manutenção no domingo das 2h às 6h. Durante este período, alguns serviços podem ficar indisponíveis.',
          type: 'general',
          priority: 'normal',
          targetAudience: 'all',
        },
        {
          title: 'Reunião de pais e responsáveis',
          content: 'Convidamos todos os pais e responsáveis para a reunião que acontecerá no próximo sábado às 9h no auditório principal.',
          type: 'general',
          priority: 'normal',
          targetAudience: 'guardians',
        }
      ]
    });

    // Criar eventos de exemplo
    await prisma.event.createMany({
      data: [
        {
          title: 'Palestra: Inteligência Artificial no Futuro',
          description: 'Uma palestra inspiradora sobre as últimas tendências em IA e como elas impactam nossa sociedade e mercado de trabalho.',
          date: '2025-11-15',
          time: '19:00',
          location: 'Auditório Principal',
          category: 'Palestra',
          capacity: 200,
          organizer: 'Coordenação de Engenharia da Computação',
        },
        {
          title: 'Workshop: Design Thinking na Prática',
          description: 'Aprenda técnicas modernas de design thinking e UX/UI para criar experiências incríveis e resolver problemas complexos.',
          date: '2025-11-20',
          time: '14:00',
          location: 'Lab de Design',
          category: 'Workshop',
          capacity: 50,
          organizer: 'Centro de Inovação',
        },
        {
          title: 'Feira de Profissões e Networking',
          description: 'Conheça diversas oportunidades de carreira, empresas parceiras e faça networking com profissionais da área.',
          date: '2025-11-25',
          time: '08:00',
          location: 'Pátio Central',
          category: 'Evento Social',
          capacity: 500,
          organizer: 'Coordenação Geral',
        },
        {
          title: 'Seminário de Sustentabilidade',
          description: 'Discussões sobre práticas sustentáveis no campus e como cada um pode contribuir para um futuro mais verde.',
          date: '2025-12-01',
          time: '16:00',
          location: 'Sala de Conferências',
          category: 'Seminário',
          capacity: 80,
          organizer: 'Departamento de Meio Ambiente',
        }
      ]
    });

    // Criar enquete de exemplo
    const poll1 = await prisma.poll.create({
      data: {
        title: 'Qual horário você prefere para eventos acadêmicos?',
        description: 'Queremos sua opinião para planejar melhor os próximos eventos',
        isActive: true,
        allowMultiple: false,
        endDate: '2025-12-31',
        options: {
          create: [
            { text: 'Manhã (8h às 12h)', votes: 25 },
            { text: 'Tarde (14h às 18h)', votes: 45 },
            { text: 'Noite (19h às 22h)', votes: 60 },
            { text: 'Fins de semana', votes: 20 }
          ]
        }
      }
    });

    const poll2 = await prisma.poll.create({
      data: {
        title: 'Quais temas você gostaria de ver em futuras palestras?',
        description: 'Sua opinião é importante para definirmos os próximos eventos',
        isActive: true,
        allowMultiple: true,
        endDate: '2025-12-31',
        options: {
          create: [
            { text: 'Tecnologia e Inovação', votes: 80 },
            { text: 'Empreendedorismo', votes: 65 },
            { text: 'Sustentabilidade', votes: 40 },
            { text: 'Saúde Mental', votes: 75 },
            { text: 'Carreira e Mercado de Trabalho', votes: 90 }
          ]
        }
      }
    });

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created:`);
    console.log(`   - 4 users`);
    console.log(`   - 3 notices`);
    console.log(`   - 4 events`);
    console.log(`   - 2 polls with options`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();