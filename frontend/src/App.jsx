import { useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CalendarCheck,
  ChartLine,
  Check,
  ClipboardText,
  Clock,
  CreditCard,
  CurrencyDollar,
  EnvelopeSimple,
  Funnel,
  Gear,
  LockKey,
  NotePencil,
  Plus,
  Receipt,
  SignOut,
  SlidersHorizontal,
  SquaresFour,
  TrendUp,
  UserPlus,
  Users,
  Wallet,
  WarningCircle,
} from '@phosphor-icons/react'
import {
  AppShell,
  AuroraBackground,
  Avatar,
  Badge,
  BottomSheet,
  Button,
  Card,
  Chip,
  Divider,
  DropdownMenu,
  EmptyState,
  IconButton,
  Input,
  Modal,
  PageHeader,
  SearchInput,
  SectionHeader,
  Select,
  Skeleton,
  StatCard,
  Tabs,
  Textarea,
  Toast,
} from './components/ui'
import GlassPanel from './components/ui/GlassPanel'
import compasOperativoIcon from './assets/compas-operativo-icon.svg'
import { buildDemoData, industryOptions } from './data/mockData'

const moneyFormatter = new Intl.NumberFormat('es-GT', {
  currency: 'GTQ',
  maximumFractionDigits: 0,
  style: 'currency',
})

const navItems = [
  { key: 'dashboard', label: 'Dashboard', shortLabel: 'Inicio', icon: SquaresFour },
  { key: 'clients', label: 'Clientes', shortLabel: 'Clientes', icon: Users, aliases: ['clientDetail'] },
  { key: 'schedule', label: 'Agenda / Servicios', shortLabel: 'Agenda', icon: Calendar },
  { key: 'payments', label: 'Cobros', shortLabel: 'Cobros', icon: Wallet },
  { key: 'reports', label: 'Reportes', shortLabel: 'Reportes', icon: ChartLine },
  { key: 'settings', label: 'Configuración', shortLabel: 'Ajustes', icon: Gear },
]

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'Activo', label: 'Activos' },
  { value: 'Pendiente', label: 'Pendientes' },
  { value: 'Pausado', label: 'Pausados' },
]

const serviceStatusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'Confirmado', label: 'Confirmado' },
  { value: 'En espera', label: 'En espera' },
  { value: 'En curso', label: 'En curso' },
  { value: 'Completado', label: 'Completado' },
]

const paymentStatusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'Pendiente', label: 'Pendientes' },
  { value: 'Pagado', label: 'Registrados' },
]

function formatMoney(value) {
  return moneyFormatter.format(value)
}

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [industry, setIndustry] = useState('spa')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [modal, setModal] = useState(null)
  const [selectedClientId, setSelectedClientId] = useState('client-1')
  const [toast, setToast] = useState(null)

  const data = useMemo(() => buildDemoData(industry), [industry])
  const selectedClient =
    data.clients.find((client) => client.id === selectedClientId) ?? data.clients[0]

  const industrySelector = (
    <Select
      aria-label="Industria"
      className="min-h-10"
      onChange={(event) => setIndustry(event.target.value)}
      options={industryOptions}
      value={industry}
    />
  )

  const userMenu = (
    <DropdownMenu
      items={[
        { label: 'Dashboard', icon: SquaresFour, onClick: () => setActivePage('dashboard') },
        { label: 'Configuración', icon: Gear, onClick: () => setActivePage('settings') },
        { label: 'Salir del demo', icon: SignOut, onClick: () => setIsLoggedIn(false) },
      ]}
    />
  )

  function notify(title, message) {
    setToast({ title, message })
  }

  function goToClient(clientId) {
    setSelectedClientId(clientId)
    setActivePage('clientDetail')
  }

  function closeModalWithToast(title, message) {
    setModal(null)
    notify(title, message)
  }

  const pageProps = {
    data,
    onClientSelect: goToClient,
    onOpenModal: setModal,
    onToast: notify,
    selectedClient,
    setActivePage,
  }

  if (!isLoggedIn) {
    return (
      <LoginPage
        onLogin={() => {
          setIsLoggedIn(true)
          notify('Sesión demo iniciada', `${data.context.businessName} está listo.`)
        }}
      />
    )
  }

  return (
    <>
      <AppShell
        activePage={activePage}
        industrySelector={industrySelector}
        navItems={navItems}
        onNavigate={setActivePage}
        userMenu={userMenu}
      >
        {activePage === 'dashboard' && <DashboardPage {...pageProps} />}
        {activePage === 'clients' && <ClientsPage {...pageProps} />}
        {activePage === 'clientDetail' && <ClientDetailPage {...pageProps} />}
        {activePage === 'schedule' && <SchedulePage {...pageProps} />}
        {activePage === 'payments' && <PaymentsPage {...pageProps} />}
        {activePage === 'reports' && <ReportsPage {...pageProps} />}
        {activePage === 'settings' && <SettingsPage {...pageProps} />}
      </AppShell>

      <QuickModal
        data={data}
        modal={modal}
        onClose={() => setModal(null)}
        onDone={closeModalWithToast}
      />

      <Toast
        message={toast?.message}
        onClose={() => setToast(null)}
        open={Boolean(toast)}
        title={toast?.title}
      />
    </>
  )
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const prefersReducedMotion = useReducedMotion()

  return (
    <AuroraBackground className="items-center justify-center">
      <section className="relative mx-auto flex min-h-svh w-full items-center justify-center px-5 py-8 sm:px-8">
        <motion.div
          animate={{ y: 0 }}
          className="relative w-full max-w-[520px]"
          initial={prefersReducedMotion ? false : { y: 16 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
        >
          <div className="pointer-events-none absolute -right-16 -top-6 h-[440px] w-[440px] rounded-full bg-[#06185A]/35 blur-[160px]" />
          <div className="pointer-events-none absolute -bottom-18 -left-20 h-[430px] w-[430px] rounded-full bg-[#F6A11A]/35 blur-[160px]" />
          <div className="pointer-events-none absolute -left-16 top-[18%] h-[460px] w-[380px] rounded-full bg-[#0B2B6F]/25 blur-[180px]" />
          <div className="pointer-events-none absolute left-1/2 top-[40%] h-[340px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFF7ED]/45 blur-[140px]" />
          <GlassPanel className="p-8 sm:p-12">
            <form
              className="relative z-10 space-y-8"
              onSubmit={(event) => {
                event.preventDefault()
                onLogin()
              }}
            >
              <div className="flex justify-center pb-3 pt-2">
                <motion.img
                  animate={{ opacity: 1, y: 0 }}
                  alt="Compás Operativo"
                  className="h-14 w-auto max-w-[156px] drop-shadow-[0_16px_28px_rgb(6_22_74/0.13)] sm:h-16 sm:max-w-[176px]"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  src={compasOperativoIcon}
                  transition={{ delay: 0.06, duration: 0.36, ease: 'easeOut' }}
                />
              </div>

              <div className="space-y-6">
                <LoginField
                  autoComplete="username"
                  icon={EnvelopeSimple}
                  label="Usuario o correo"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="correo@empresa.com"
                  type="text"
                  value={email}
                />
                <LoginField
                  autoComplete="current-password"
                  icon={LockKey}
                  label="Contraseña"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Contraseña"
                  type="password"
                  value={password}
                />
              </div>

              <NoiseCta type="submit">
                Entrar
              </NoiseCta>
            </form>
          </GlassPanel>
        </motion.div>
      </section>
    </AuroraBackground>
  )
}

function LoginField({ icon: Icon, label, ...props }) {
  return (
    <label className="block">
      <span className="mb-3 block text-sm font-semibold text-ink sm:text-base">{label}</span>
      <span className="relative flex min-h-14 items-center rounded-[22px] border border-white/75 bg-white/[0.34] px-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_12px_34px_rgba(15,23,42,0.08)] ring-1 ring-white/20 backdrop-blur-[30px] transition-[border-color,box-shadow,background-color] focus-within:border-white/95 focus-within:bg-white/[0.36] focus-within:shadow-[inset_0_1px_0_rgba(255,255,255,0.78),0_0_0_4px_rgba(255,255,255,0.22),0_18px_44px_rgba(15,23,42,0.10)] sm:min-h-16 sm:rounded-[24px] sm:px-6">
        <Icon className="mr-4 size-5 shrink-0 text-muted sm:mr-5 sm:size-6" weight="regular" />
        <input
          className="h-14 min-w-0 flex-1 bg-transparent text-lg font-medium text-ink caret-orange-500 outline-none selection:bg-orange-200/40 placeholder:text-neutral-400 focus:bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 sm:h-16 sm:text-2xl"
          {...props}
        />
      </span>
    </label>
  )
}

function NoiseCta({ children, ...props }) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.button
      className="group relative flex min-h-14 w-full items-center justify-center overflow-hidden rounded-[22px] px-8 text-xl font-semibold text-white shadow-[0_22px_52px_rgba(249,115,22,0.34),0_8px_24px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.42)] outline-none transition-[box-shadow] focus-visible:ring-4 focus-visible:ring-primary-500/20 sm:min-h-16 sm:rounded-[24px] sm:text-3xl"
      transition={{ duration: 0.18, ease: 'easeOut' }}
      whileHover={prefersReducedMotion ? undefined : { y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      <motion.span
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }
        }
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgb(255_230_190/0.64),transparent_34%),linear-gradient(135deg,#fb923c_0%,#ff7a1a_44%,#f97316_100%)] bg-[length:160%_160%]"
        transition={{ duration: 8, ease: 'linear', repeat: Infinity }}
      />
      <span aria-hidden="true" className="noise-texture absolute inset-0 opacity-[0.10] mix-blend-overlay" />
      <span className="absolute inset-x-5 top-0 h-px bg-white/55" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="size-7 transition-transform group-hover:translate-x-1 sm:size-10" weight="regular" />
      </span>
    </motion.button>
  )
}

function DashboardPage({ data, onClientSelect, onOpenModal }) {
  const { context } = data

  return (
    <>
      <PageHeader
        actions={
          <>
            <Button icon={UserPlus} onClick={() => onOpenModal('client')} variant="secondary">
              Nuevo {context.clientSingular}
            </Button>
            <Button icon={Plus} onClick={() => onOpenModal('service')}>
              {context.primaryAction}
            </Button>
          </>
        }
        description={`${data.appointments.length} ${context.servicePlural} programados, ${data.payments.filter((payment) => payment.status === 'Pendiente').length} cobros pendientes y ${data.tasks.filter((task) => !task.done).length} tareas abiertas.`}
        eyebrow={context.businessName}
        title="Dashboard"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard accent="primary" icon={CurrencyDollar} label="Ingresos de hoy" trend="+12%" value={formatMoney(2480)} />
        <StatCard accent="blue" icon={CalendarCheck} label={`${context.servicePlural} de hoy`} trend="+3" value={data.appointments.length} />
        <StatCard accent="amber" icon={Receipt} label="Cobros pendientes" value={formatMoney(data.report.pendingBalance)} />
        <StatCard accent="green" icon={Users} label={`${context.clientPlural} activos`} trend="+8%" value={data.report.activeClients} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.45fr_0.9fr]">
        <section className="min-w-0 space-y-4">
          <Card>
            <SectionHeader
              action={<Chip active>{context.label}</Chip>}
              eyebrow="Hoy"
              title="Resumen operativo"
            />
            <div className="grid gap-3 sm:grid-cols-3">
              <MiniKpi label="Primera cita" value={data.appointments[0].time} />
              <MiniKpi label="Ocupación" value="78%" />
              <MiniKpi label="Cobrado" value={formatMoney(2160)} />
            </div>
            <Divider className="my-4" />
            <div className="space-y-3">
              {data.appointments.slice(0, 4).map((appointment) => (
                <TimelineRow
                  key={appointment.id}
                  appointment={appointment}
                  onClientSelect={onClientSelect}
                />
              ))}
            </div>
          </Card>

          <Card>
            <SectionHeader
              action={<Button icon={Calendar} onClick={() => onOpenModal('service')} size="sm" variant="secondary">Agendar</Button>}
              title={`Próximos ${context.servicePlural}`}
            />
            <div className="grid gap-3 lg:grid-cols-2">
              {data.appointments.slice(1).map((appointment) => (
                <ServiceCard
                  appointment={appointment}
                  key={appointment.id}
                  onClientSelect={onClientSelect}
                />
              ))}
            </div>
          </Card>
        </section>

        <aside className="min-w-0 space-y-4">
          <Card>
            <SectionHeader title="Cobros pendientes" />
            <div className="space-y-3">
              {data.payments
                .filter((payment) => payment.status === 'Pendiente')
                .map((payment) => (
                  <PaymentRow key={payment.id} payment={payment} />
                ))}
            </div>
          </Card>

          <Card>
            <SectionHeader title="Tareas" />
            <div className="space-y-2">
              {data.tasks.map((task) => (
                <TaskRow key={task.id} task={task} />
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </>
  )
}

function ClientsPage({ data, onClientSelect, onOpenModal }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const { context } = data

  const filteredClients = data.clients.filter((client) => {
    const matchesQuery = `${client.name} ${client.lastService} ${client.tags.join(' ')}`
      .toLowerCase()
      .includes(query.toLowerCase())
    const matchesStatus = status === 'all' || client.status === status

    return matchesQuery && matchesStatus
  })

  return (
    <>
      <PageHeader
        actions={
          <Button icon={UserPlus} onClick={() => onOpenModal('client')}>
            Nuevo {context.clientSingular}
          </Button>
        }
        description={`Vista rápida de ${context.clientPlural}, saldo, último ${context.serviceSingular} y próxima ${context.appointmentLabel}.`}
        eyebrow={context.label}
        title="Clientes"
      />

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SearchInput
          className="w-full md:w-auto"
          onChange={setQuery}
          placeholder={`Buscar ${context.clientPlural}`}
          value={query}
        />
        <Select
          aria-label="Estado"
          className="md:w-44"
          onChange={(event) => setStatus(event.target.value)}
          options={statusOptions}
          value={status}
        />
      </div>

      <div className="grid gap-3">
        {filteredClients.map((client) => (
          <ClientListItem
            client={client}
            context={context}
            key={client.id}
            onClick={() => onClientSelect(client.id)}
          />
        ))}
      </div>
    </>
  )
}

function ClientDetailPage({ data, selectedClient, setActivePage }) {
  const [tab, setTab] = useState('history')
  const { context } = data
  const clientPayments = data.payments.filter((payment) => payment.clientName === selectedClient.name)
  const upcoming = data.appointments.find((appointment) => appointment.clientName === selectedClient.name)

  return (
    <>
      <PageHeader
        actions={
          <>
            <Button icon={Calendar} variant="secondary">{context.primaryAction}</Button>
            <Button icon={Receipt}>Registrar pago</Button>
          </>
        }
        description={`${selectedClient.package} · desde ${selectedClient.since}`}
        leading={
          <IconButton
            aria-label="Volver a clientes"
            icon={ArrowLeft}
            onClick={() => setActivePage('clients')}
            tooltip="Volver"
          />
        }
        title={selectedClient.name}
      />

      <div className="grid gap-4 xl:grid-cols-[0.85fr_1.25fr]">
        <section className="min-w-0 space-y-4">
          <Card>
            <div className="flex items-start gap-4">
              <Avatar className="size-14 text-base" initials={selectedClient.initials} tone={selectedClient.tone} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-xl font-semibold text-ink">{selectedClient.name}</h2>
                  <Badge>{selectedClient.status}</Badge>
                </div>
                <p className="mt-1 text-sm text-muted">{selectedClient.lastService}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedClient.tags.map((tag) => (
                    <Chip key={tag}>{tag}</Chip>
                  ))}
                </div>
              </div>
            </div>
            <Divider className="my-4" />
            <div className="grid grid-cols-3 gap-3">
              <MiniKpi label="Saldo" value={formatMoney(selectedClient.balance)} />
              <MiniKpi label="Próxima" value={upcoming?.time ?? selectedClient.next} />
              <MiniKpi label="Estado" value={selectedClient.status} />
            </div>
          </Card>

          <Card>
            <SectionHeader title="Próxima cita" />
            {upcoming ? (
              <TimelineRow appointment={upcoming} />
            ) : (
              <EmptyState
                description="No hay citas próximas registradas para este perfil."
                title="Agenda libre"
              />
            )}
          </Card>
        </section>

        <Card>
          <Tabs
            onChange={setTab}
            tabs={[
              { value: 'history', label: 'Historial' },
              { value: 'services', label: context.servicePlural },
              { value: 'payments', label: 'Pagos' },
              { value: 'notes', label: 'Notas' },
            ]}
            value={tab}
          />
          <Divider className="my-4" />

          {tab === 'history' && (
            <div className="space-y-3">
              {data.history.map((item) => (
                <HistoryRow item={item} key={item.id} />
              ))}
            </div>
          )}

          {tab === 'services' && (
            <div className="grid gap-3 md:grid-cols-2">
              {data.appointments.slice(0, 4).map((appointment) => (
                <ServiceCard appointment={appointment} key={appointment.id} />
              ))}
            </div>
          )}

          {tab === 'payments' && (
            <div className="space-y-3">
              {clientPayments.length > 0 ? (
                clientPayments.map((payment) => <PaymentRow key={payment.id} payment={payment} />)
              ) : (
                <EmptyState description="Este perfil no tiene pagos abiertos." title="Pagos al día" />
              )}
            </div>
          )}

          {tab === 'notes' && (
            <div className="space-y-4">
              <div className="space-y-2">
                {selectedClient.notes.map((note) => (
                  <div className="rounded-lg bg-soft px-3 py-2 text-sm text-muted" key={note}>
                    {note}
                  </div>
                ))}
              </div>
              <Textarea
                label="Nueva nota"
                placeholder={`Agregar nota sobre este ${context.clientSingular}`}
              />
              <Button icon={NotePencil}>Guardar nota</Button>
            </div>
          )}
        </Card>
      </div>
    </>
  )
}

function SchedulePage({ data, onClientSelect, onOpenModal }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [sheetOpen, setSheetOpen] = useState(false)
  const { context } = data

  const filteredAppointments = data.appointments.filter((appointment) => {
    const matchesQuery = `${appointment.clientName} ${appointment.service} ${appointment.owner}`
      .toLowerCase()
      .includes(query.toLowerCase())
    const matchesStatus = status === 'all' || appointment.status === status

    return matchesQuery && matchesStatus
  })

  return (
    <>
      <PageHeader
        actions={
          <>
            <Button icon={Funnel} onClick={() => setSheetOpen(true)} variant="secondary">
              Filtros
            </Button>
            <Button icon={Plus} onClick={() => onOpenModal('service')}>
              {context.primaryAction}
            </Button>
          </>
        }
        description={`Programación, estados y responsables para los ${context.servicePlural} del día.`}
        eyebrow={context.label}
        title="Agenda / Servicios"
      />

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SearchInput
          className="w-full md:w-auto"
          onChange={setQuery}
          placeholder={`Buscar ${context.servicePlural}`}
          value={query}
        />
        <Select
          aria-label="Estado de servicio"
          className="md:w-48"
          onChange={(event) => setStatus(event.target.value)}
          options={serviceStatusOptions}
          value={status}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <Card>
          <SectionHeader title={`Servicios programados`} />
          <div className="space-y-3">
            {filteredAppointments.map((appointment) => (
              <TimelineRow
                appointment={appointment}
                key={appointment.id}
                onClientSelect={onClientSelect}
              />
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Capacidad de hoy" />
          <div className="space-y-4">
            {data.context.team.map((member, index) => (
              <CapacityRow key={member} label={member} value={[82, 64, 48][index]} />
            ))}
          </div>
          <Divider className="my-4" />
          <div className="flex items-center gap-3 rounded-lg bg-primary-50 px-3 py-3 text-primary-800">
            <Clock className="size-5 shrink-0" />
            <p className="text-sm">Ventana libre: 13:00 a 14:30</p>
          </div>
        </Card>
      </div>

      <BottomSheet onClose={() => setSheetOpen(false)} open={sheetOpen} title="Filtros rápidos">
        <div className="space-y-4">
          <div>
            <SectionHeader title="Estado" />
            <div className="flex flex-wrap gap-2">
              {serviceStatusOptions.map((option) => (
                <Chip
                  active={status === option.value}
                  key={option.value}
                  onClick={() => setStatus(option.value)}
                >
                  {option.label}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title={context.teamLabel} />
            <div className="flex flex-wrap gap-2">
              {context.team.map((member) => (
                <Chip key={member}>{member}</Chip>
              ))}
            </div>
          </div>
        </div>
      </BottomSheet>
    </>
  )
}

function PaymentsPage({ data, onOpenModal }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')

  const filteredPayments = data.payments.filter((payment) => {
    const matchesQuery = `${payment.clientName} ${payment.concept} ${payment.method}`
      .toLowerCase()
      .includes(query.toLowerCase())
    const matchesStatus = status === 'all' || payment.status === status

    return matchesQuery && matchesStatus
  })

  return (
    <>
      <PageHeader
        actions={<Button icon={Receipt} onClick={() => onOpenModal('payment')}>Registrar pago</Button>}
        description="Pendientes, pagos registrados y saldos por cliente."
        eyebrow={data.context.label}
        title="Cobros"
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard icon={Wallet} label="Saldo pendiente" value={formatMoney(data.report.pendingBalance)} />
        <StatCard accent="green" icon={CreditCard} label="Pagos registrados" value={formatMoney(800)} />
        <StatCard accent="blue" icon={Receipt} label="Ticket promedio" value={formatMoney(386)} />
      </div>

      <div className="my-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SearchInput
          className="w-full md:w-auto"
          onChange={setQuery}
          placeholder="Buscar cobros"
          value={query}
        />
        <Select
          aria-label="Estado de cobro"
          className="md:w-48"
          onChange={(event) => setStatus(event.target.value)}
          options={paymentStatusOptions}
          value={status}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <Card>
          <SectionHeader title="Movimientos" />
          <div className="space-y-3">
            {filteredPayments.map((payment) => (
              <PaymentRow key={payment.id} payment={payment} />
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title="Conciliación" />
          <div className="space-y-3">
            <MiniKpi label="Transferencias" value={formatMoney(420)} />
            <MiniKpi label="Tarjeta" value={formatMoney(480)} />
            <MiniKpi label="Efectivo" value={formatMoney(320)} />
          </div>
          <Divider className="my-4" />
          <EmptyState
            description="No hay pagos en disputa dentro de los datos demo."
            icon={Check}
            title="Todo conciliado"
          />
        </Card>
      </div>
    </>
  )
}

function ReportsPage({ data }) {
  const { context, report } = data
  const maxRevenue = Math.max(...report.weeklyRevenue)

  return (
    <>
      <PageHeader
        description={`Métricas simples de ingresos, ${context.servicePlural}, ${context.clientPlural} activos y pendientes.`}
        eyebrow={context.businessName}
        title="Reportes"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={TrendUp} label="Ingresos del periodo" trend="+18%" value={formatMoney(report.revenue)} />
        <StatCard accent="blue" icon={CalendarCheck} label={`${context.servicePlural} realizados`} value={report.servicesCompleted} />
        <StatCard accent="green" icon={Users} label={`${context.clientPlural} activos`} value={report.activeClients} />
        <StatCard accent="amber" icon={WarningCircle} label="Saldo pendiente" value={formatMoney(report.pendingBalance)} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <SectionHeader title="Ingresos de la semana" />
          <div className="flex h-64 items-end gap-2 pt-4">
            {report.weeklyRevenue.map((value, index) => (
              <div className="flex flex-1 flex-col items-center gap-2" key={value}>
                <div className="flex h-48 w-full items-end rounded-lg bg-soft p-1">
                  <div
                    className="w-full rounded-md bg-primary-500"
                    style={{ height: `${Math.max(18, (value / maxRevenue) * 100)}%` }}
                  />
                </div>
                <span className="text-xs text-muted">{['L', 'M', 'M', 'J', 'V', 'S', 'D'][index]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeader title={`Mix de ${context.servicePlural}`} />
          <div className="space-y-4">
            {report.serviceMix.map((item) => (
              <ProgressRow key={item.service} label={item.service} value={item.value} />
            ))}
          </div>
        </Card>

        <Card className="xl:col-span-2">
          <SectionHeader
            action={<Badge variant="info">Beta visual</Badge>}
            title="Pendientes operativos"
          />
          <div className="grid gap-3 md:grid-cols-3">
            <ReportInsight icon={ClipboardText} label="Tareas abiertas" value={data.tasks.filter((task) => !task.done).length} />
            <ReportInsight icon={Receipt} label="Cobros por revisar" value={data.payments.filter((payment) => payment.status === 'Pendiente').length} />
            <div className="rounded-lg bg-soft p-3">
              <p className="text-sm font-medium text-ink">Comparativo semanal</p>
              <div className="mt-3 space-y-2">
                <Skeleton className="h-3 w-11/12" />
                <Skeleton className="h-3 w-8/12" />
                <Skeleton className="h-3 w-10/12" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

function SettingsPage({ data }) {
  const [tab, setTab] = useState('services')
  const { context, settings } = data

  return (
    <>
      <PageHeader
        description={`Tipos de ${context.serviceSingular}, equipo, precios y etiquetas para ${context.label.toLowerCase()}.`}
        eyebrow={context.businessName}
        title="Configuración"
      />

      <Card>
        <Tabs
          onChange={setTab}
          tabs={[
            { value: 'services', label: `Tipos de ${context.serviceSingular}` },
            { value: 'team', label: 'Equipo' },
            { value: 'prices', label: 'Precios' },
            { value: 'tags', label: 'Etiquetas' },
          ]}
          value={tab}
        />
        <Divider className="my-4" />

        {tab === 'services' && (
          <div className="grid gap-3 md:grid-cols-2">
            {settings.prices.map((item) => (
              <ConfigRow
                description={`${item.duration} · ${formatMoney(item.price)}`}
                key={item.id}
                title={item.service}
              />
            ))}
          </div>
        )}

        {tab === 'team' && (
          <div className="grid gap-3 md:grid-cols-3">
            {settings.team.map((member) => (
              <div className="rounded-lg border border-line bg-white/72 p-3" key={member.id}>
                <Avatar initials={member.name.split(' ').map((part) => part[0]).join('').slice(0, 2)} />
                <p className="mt-3 text-sm font-semibold text-ink">{member.name}</p>
                <p className="mt-1 text-sm text-muted">{member.role}</p>
                <Badge className="mt-3" variant="neutral">{member.schedule}</Badge>
              </div>
            ))}
          </div>
        )}

        {tab === 'prices' && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input label={`Nombre del ${context.serviceSingular}`} value={settings.prices[0].service} readOnly />
            <Input label="Duración" value={settings.prices[0].duration} readOnly />
            <Input label="Precio base" value={formatMoney(settings.prices[0].price)} readOnly />
            <Select
              label="Estado"
              options={[
                { value: 'active', label: 'Activo' },
                { value: 'paused', label: 'Pausado' },
              ]}
              value="active"
              readOnly
            />
          </div>
        )}

        {tab === 'tags' && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {settings.tags.map((tag, index) => (
                <Chip active={index === 0} key={tag}>{tag}</Chip>
              ))}
            </div>
            <Input label="Nueva etiqueta" placeholder="Ej. Seguimiento mensual" />
            <Button icon={Plus}>Agregar etiqueta</Button>
          </div>
        )}
      </Card>
    </>
  )
}

function QuickModal({ data, modal, onClose, onDone }) {
  const { context } = data

  const copy = {
    client: {
      title: `Nuevo ${context.clientSingular}`,
      description: `Alta rápida para ${context.label.toLowerCase()}.`,
      doneTitle: 'Cliente preparado',
      doneMessage: 'La acción quedó simulada en esta demo visual.',
    },
    service: {
      title: context.primaryAction,
      description: `Programa una ${context.appointmentLabel} con datos ficticios.`,
      doneTitle: 'Agenda actualizada',
      doneMessage: `${context.primaryAction} quedó simulado.`,
    },
    payment: {
      title: 'Registrar pago',
      description: 'Captura de pago visual para la demo.',
      doneTitle: 'Pago registrado',
      doneMessage: 'El registro visual quedó listo.',
    },
  }[modal]

  return (
    <Modal
      description={copy?.description}
      onClose={onClose}
      open={Boolean(modal)}
      title={copy?.title}
    >
      <div className="space-y-4">
        <Input label="Nombre" placeholder={data.clients[0].name} />
        {modal === 'payment' ? (
          <Input label="Monto" placeholder={formatMoney(data.payments[0].amount)} />
        ) : (
          <Select
            label={context.serviceSingular}
            options={context.services.map((service) => ({ value: service, label: service }))}
          />
        )}
        <Textarea label="Nota" placeholder={`Detalle breve para este ${modal === 'payment' ? 'cobro' : context.serviceSingular}.`} />
        <div className="flex justify-end gap-2">
          <Button onClick={onClose} type="button" variant="secondary">Cancelar</Button>
          <Button
            onClick={() => onDone(copy.doneTitle, copy.doneMessage)}
            type="button"
          >
            Guardar
          </Button>
        </div>
      </div>
    </Modal>
  )
}

function MiniKpi({ label, value }) {
  return (
    <div className="rounded-lg bg-soft px-3 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 truncate text-sm font-semibold text-ink">{value}</p>
    </div>
  )
}

function TimelineRow({ appointment, onClientSelect }) {
  return (
    <div className="flex gap-3 rounded-lg border border-line bg-white/66 p-3">
      <div className="flex w-14 shrink-0 flex-col items-center rounded-lg bg-soft px-2 py-2">
        <Clock className="size-4 text-primary-600" />
        <span className="mt-1 text-sm font-semibold text-ink">{appointment.time}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{appointment.service}</p>
            <button
              className="mt-0.5 truncate text-sm text-muted hover:text-primary-700"
              onClick={() => onClientSelect?.(appointment.clientId)}
              type="button"
            >
              {appointment.clientName}
            </button>
          </div>
          <Badge>{appointment.status}</Badge>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span>{appointment.owner}</span>
          <span>·</span>
          <span>{appointment.duration}</span>
          <span>·</span>
          <span>{appointment.room}</span>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({ appointment, onClientSelect }) {
  return (
    <div className="rounded-lg border border-line bg-white/66 p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{appointment.service}</p>
          <button
            className="mt-1 truncate text-sm text-muted hover:text-primary-700"
            onClick={() => onClientSelect?.(appointment.clientId)}
            type="button"
          >
            {appointment.clientName}
          </button>
        </div>
        <Badge>{appointment.status}</Badge>
      </div>
      <Divider className="my-3" />
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-muted">{appointment.time} · {appointment.duration}</span>
        <span className="font-semibold text-ink">{formatMoney(appointment.price)}</span>
      </div>
    </div>
  )
}

function PaymentRow({ payment }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-white/66 p-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-700">
        <Receipt className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{payment.clientName}</p>
        <p className="truncate text-xs text-muted">{payment.concept}</p>
        <p className="mt-1 text-xs text-muted">{payment.method} · {payment.due}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-ink">{formatMoney(payment.amount)}</p>
        <Badge className="mt-1">{payment.status}</Badge>
      </div>
    </div>
  )
}

function TaskRow({ task }) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-white/62 px-3 py-2">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-line bg-white text-primary-600">
        {task.done && <Check className="size-3.5" weight="bold" />}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">{task.title}</p>
        <p className="mt-0.5 text-xs text-muted">Prioridad {task.priority}</p>
      </div>
    </div>
  )
}

function ClientListItem({ client, context, onClick }) {
  return (
    <Card interactive onClick={onClick}>
      <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr_0.75fr_0.35fr] lg:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar initials={client.initials} tone={client.tone} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-sm font-semibold text-ink">{client.name}</p>
              <Badge>{client.status}</Badge>
            </div>
            <p className="mt-1 truncate text-sm text-muted">{client.package}</p>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted">Último {context.serviceSingular}</p>
          <p className="truncate text-sm font-medium text-ink">{client.lastService}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:block">
          <div>
            <p className="text-xs text-muted">Saldo</p>
            <p className="text-sm font-semibold text-ink">{formatMoney(client.balance)}</p>
          </div>
          <div className="lg:mt-2">
            <p className="text-xs text-muted">Próxima</p>
            <p className="text-sm font-medium text-ink">{client.next}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 lg:justify-end">
          <div className="flex flex-wrap gap-2 lg:hidden">
            {client.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
          <ArrowRight className="size-5 shrink-0 text-muted" />
        </div>
      </div>
    </Card>
  )
}

function HistoryRow({ item }) {
  return (
    <div className="flex gap-3 rounded-lg bg-white/62 p-3">
      <div className="w-14 shrink-0 text-sm font-semibold text-primary-700">{item.date}</div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-ink">{item.title}</p>
        <p className="mt-1 text-sm text-muted">{item.detail}</p>
      </div>
      <p className="text-sm font-semibold text-ink">{formatMoney(item.amount)}</p>
    </div>
  )
}

function CapacityRow({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-muted">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-soft">
        <div className="h-full rounded-full bg-primary-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function ProgressRow({ label, value }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-muted">{value}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-soft">
        <div className="h-full rounded-full bg-ink" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function ReportInsight({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg bg-soft p-3">
      <Icon className="size-5 text-primary-600" />
      <p className="mt-3 text-2xl font-semibold text-ink">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  )
}

function ConfigRow({ description, title }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white/72 p-3">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink">{title}</p>
        <p className="truncate text-sm text-muted">{description}</p>
      </div>
      <IconButton aria-label={`Editar ${title}`} icon={SlidersHorizontal} tooltip="Editar" />
    </div>
  )
}

export default App
