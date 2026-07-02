export const industryOptions = [
  { value: 'spa', label: 'Spa' },
  { value: 'psychology', label: 'Psicología' },
  { value: 'academy', label: 'Academia' },
  { value: 'maintenance', label: 'Mantenimiento' },
  { value: 'dojo', label: 'Gimnasio / Dojo' },
]

export const industryContexts = {
  spa: {
    label: 'Spa',
    businessName: 'Bruma Spa Studio',
    clientSingular: 'cliente',
    clientPlural: 'clientes',
    serviceSingular: 'tratamiento',
    servicePlural: 'tratamientos',
    appointmentLabel: 'cita',
    teamLabel: 'terapeuta',
    primaryAction: 'Agendar tratamiento',
    services: ['Facial hidratante', 'Masaje descontracturante', 'Drenaje linfático', 'Ritual relajante'],
    packages: ['Paquete Glow', 'Plan Recuperación', 'Membresía Serena'],
    tags: ['VIP', 'Piel sensible', 'Postparto', 'Mensual'],
    settingsServices: ['Facial express', 'Masaje 60 min', 'Masaje 90 min', 'Ritual pareja'],
    team: ['Ana Ruiz', 'Camila Mora', 'Sofía Reyes'],
  },
  psychology: {
    label: 'Psicología',
    businessName: 'Nodo Bienestar',
    clientSingular: 'paciente',
    clientPlural: 'pacientes',
    serviceSingular: 'sesión',
    servicePlural: 'sesiones',
    appointmentLabel: 'sesión',
    teamLabel: 'profesional',
    primaryAction: 'Agendar sesión',
    services: ['Terapia individual', 'Terapia de pareja', 'Seguimiento clínico', 'Evaluación inicial'],
    packages: ['Plan mensual', 'Seguimiento quincenal', 'Evaluación integral'],
    tags: ['Teleconsulta', 'Seguimiento', 'Prioritario', 'Referido'],
    settingsServices: ['Sesión individual', 'Sesión pareja', 'Primera consulta', 'Evaluación'],
    team: ['Dra. Laura Mena', 'Dr. Diego Solís', 'Lic. Paula Cifuentes'],
  },
  academy: {
    label: 'Academia',
    businessName: 'Aula Norte',
    clientSingular: 'estudiante',
    clientPlural: 'estudiantes',
    serviceSingular: 'clase',
    servicePlural: 'clases',
    appointmentLabel: 'clase',
    teamLabel: 'instructor',
    primaryAction: 'Programar clase',
    services: ['Nivelación matemática', 'Inglés conversacional', 'Tutoría de lectura', 'Preparación examen'],
    packages: ['Plan intensivo', 'Club sabatino', 'Mentoría mensual'],
    tags: ['Beca parcial', 'Nuevo ingreso', 'Padres activos', 'Examen próximo'],
    settingsServices: ['Clase individual', 'Clase grupal', 'Evaluación diagnóstica', 'Taller sábado'],
    team: ['Marco Soto', 'Elena García', 'Valeria Molina'],
  },
  maintenance: {
    label: 'Mantenimiento',
    businessName: 'Nexo Técnico',
    clientSingular: 'cliente',
    clientPlural: 'clientes',
    serviceSingular: 'servicio',
    servicePlural: 'servicios',
    appointmentLabel: 'visita',
    teamLabel: 'técnico',
    primaryAction: 'Programar visita',
    services: ['Revisión preventiva', 'Instalación eléctrica', 'Mantenimiento A/C', 'Diagnóstico urgente'],
    packages: ['Contrato mensual', 'Plan preventivo', 'Bolsa de horas'],
    tags: ['Contrato', 'Urgente', 'Residencial', 'Empresa'],
    settingsServices: ['Visita técnica', 'Diagnóstico', 'Mantenimiento A/C', 'Instalación'],
    team: ['Óscar Lima', 'René Pérez', 'Marta Aguilar'],
  },
  dojo: {
    label: 'Gimnasio / Dojo',
    businessName: 'Kiai Training Club',
    clientSingular: 'miembro',
    clientPlural: 'miembros',
    serviceSingular: 'clase',
    servicePlural: 'clases',
    appointmentLabel: 'clase',
    teamLabel: 'coach',
    primaryAction: 'Reservar clase',
    services: ['Clase técnica', 'Entrenamiento funcional', 'Evaluación física', 'Clase infantil'],
    packages: ['Membresía mensual', 'Plan atleta', 'Pase familiar'],
    tags: ['Cinta naranja', 'Competencia', 'Plan familiar', 'Nuevo ingreso'],
    settingsServices: ['Clase grupal', 'Personal training', 'Evaluación física', 'Clase infantil'],
    team: ['Sensei Robles', 'Andrea León', 'Carlos Mejía'],
  },
}

const baseClients = [
  { name: 'María Valdés', initials: 'MV', status: 'Activo', balance: 420, next: 'Hoy, 10:30', tone: 'orange' },
  { name: 'Javier Méndez', initials: 'JM', status: 'Pendiente', balance: 0, next: 'Hoy, 12:00', tone: 'blue' },
  { name: 'Daniela Soto', initials: 'DS', status: 'Activo', balance: 180, next: 'Mañana, 09:00', tone: 'green' },
  { name: 'Roberto Cano', initials: 'RC', status: 'Pausado', balance: 650, next: 'Vie, 15:30', tone: 'gray' },
  { name: 'Lucía Herrera', initials: 'LH', status: 'Activo', balance: 0, next: 'Sáb, 08:00', tone: 'rose' },
  { name: 'Andrés Molina', initials: 'AM', status: 'Activo', balance: 260, next: 'Lun, 11:00', tone: 'amber' },
]

const statusCycle = ['Confirmado', 'En espera', 'En curso', 'Completado', 'Reagendar']
const paymentMethods = ['Transferencia', 'Tarjeta', 'Efectivo', 'Link de pago']

export function buildDemoData(industryKey) {
  const context = industryContexts[industryKey] ?? industryContexts.spa

  const clients = baseClients.map((client, index) => ({
    ...client,
    id: `client-${index + 1}`,
    lastService: context.services[index % context.services.length],
    package: context.packages[index % context.packages.length],
    tags: [
      context.tags[index % context.tags.length],
      context.tags[(index + 2) % context.tags.length],
    ],
    since: ['Ene 2026', 'Mar 2026', 'Nov 2025', 'Feb 2026', 'May 2026', 'Dic 2025'][index],
    notes: [
      `Prefiere recordatorio por WhatsApp antes de cada ${context.appointmentLabel}.`,
      `Tiene seguimiento activo del ${context.serviceSingular} anterior.`,
      `Solicita horarios de baja afluencia cuando es posible.`,
    ],
  }))

  const appointments = [
    { time: '08:30', duration: '45 min', clientId: clients[2].id, room: 'Sala 1' },
    { time: '10:30', duration: '60 min', clientId: clients[0].id, room: 'Sala 2' },
    { time: '12:00', duration: '50 min', clientId: clients[1].id, room: 'Sala 1' },
    { time: '15:30', duration: '75 min', clientId: clients[3].id, room: 'Sala 3' },
    { time: '17:00', duration: '45 min', clientId: clients[5].id, room: 'Sala 2' },
  ].map((appointment, index) => {
    const client = clients.find((item) => item.id === appointment.clientId)

    return {
      ...appointment,
      id: `appointment-${index + 1}`,
      clientName: client.name,
      service: context.services[index % context.services.length],
      status: statusCycle[index % statusCycle.length],
      owner: context.team[index % context.team.length],
      price: [360, 480, 320, 520, 280][index],
    }
  })

  const payments = [
    { clientId: clients[0].id, amount: 420, status: 'Pendiente', due: 'Vence hoy' },
    { clientId: clients[3].id, amount: 650, status: 'Pendiente', due: '2 días vencido' },
    { clientId: clients[5].id, amount: 260, status: 'Pendiente', due: 'Vence mañana' },
    { clientId: clients[1].id, amount: 480, status: 'Pagado', due: 'Registrado hoy' },
    { clientId: clients[4].id, amount: 320, status: 'Pagado', due: 'Ayer' },
  ].map((payment, index) => {
    const client = clients.find((item) => item.id === payment.clientId)

    return {
      ...payment,
      id: `payment-${index + 1}`,
      clientName: client.name,
      concept: `${context.serviceSingular} - ${context.services[index % context.services.length]}`,
      method: paymentMethods[index % paymentMethods.length],
    }
  })

  const tasks = [
    `Confirmar ${context.appointmentLabel} de ${clients[1].name}`,
    `Enviar recibo pendiente a ${clients[3].name}`,
    `Revisar cupos para ${context.packages[0]}`,
    `Actualizar precio de ${context.settingsServices[1]}`,
  ].map((title, index) => ({
    id: `task-${index + 1}`,
    title,
    priority: ['Alta', 'Media', 'Media', 'Baja'][index],
    done: index === 2,
  }))

  const history = clients.slice(0, 4).map((client, index) => ({
    id: `history-${index + 1}`,
    date: ['28 Jun', '26 Jun', '23 Jun', '19 Jun'][index],
    title: context.services[(index + 1) % context.services.length],
    detail: `${context.team[index % context.team.length]} registró avance y próxima recomendación.`,
    amount: [320, 480, 360, 520][index],
  }))

  return {
    context,
    clients,
    appointments,
    payments,
    tasks,
    history,
    report: {
      revenue: 8640,
      servicesCompleted: 38,
      activeClients: clients.filter((client) => client.status === 'Activo').length,
      pendingBalance: payments
        .filter((payment) => payment.status === 'Pendiente')
        .reduce((sum, payment) => sum + payment.amount, 0),
      weeklyRevenue: [620, 980, 760, 1240, 1460, 1180, 1640],
      serviceMix: context.services.map((service, index) => ({
        service,
        value: [34, 27, 22, 17][index],
      })),
    },
    settings: {
      prices: context.settingsServices.map((service, index) => ({
        id: `price-${index + 1}`,
        service,
        duration: ['45 min', '60 min', '75 min', '90 min'][index],
        price: [280, 360, 480, 620][index],
      })),
      team: context.team.map((name, index) => ({
        id: `team-${index + 1}`,
        name,
        role: `${context.teamLabel} ${index + 1}`,
        schedule: ['Lun a Vie', 'Mar a Sáb', 'Fines de semana'][index],
      })),
      tags: context.tags,
    },
  }
}
