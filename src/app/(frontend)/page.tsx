import Image from 'next/image'

import { FaqList } from '@/components/FaqList'
import { Icon } from '@/components/Icon'
import { LeadForm } from '@/components/LeadForm'
import { Navbar } from '@/components/Navbar'
import { SiteFooter, WhatsAppFloat } from '@/components/SiteChrome'
import { ToolCard } from '@/components/ToolCard'
import {
  btnAccent,
  btnGhost,
  btnPrimary,
  card,
  cardHover,
  container,
  eyebrow,
  section,
  sectionTitle,
  waLink,
} from '@/components/ui'
import { getHomeData } from '@/lib/payload'
import type { Media } from '@/payload-types'

// Konten selalu diambil terbaru dari CMS.
export const dynamic = 'force-dynamic'

const PORTFOLIO_BG = [
  'bg-gradient-to-br from-brand-500 to-brand-800',
  'bg-gradient-to-br from-accent-400 to-accent-600',
  'bg-gradient-to-br from-ink to-brand-900',
]
const PORTFOLIO_ICON = ['code', 'file', 'cloud']

const isMedia = (m: unknown): m is Media => typeof m === 'object' && m !== null && 'url' in m

/** Payload mengembalikan URL absolut (berisi NEXT_PUBLIC_SERVER_URL); next/image cukup diberi path-nya. */
const mediaSrc = (url: string) => (/^https?:\/\//.test(url) ? new URL(url).pathname : url)

export default async function HomePage() {
  const { settings: s, services, portfolio, programs, tools, testimonials, faqs } = await getHomeData()

  const wa = (text?: string) => waLink(s.whatsapp, text)
  const stats = s.stats ?? []
  const values = s.values ?? []
  const steps = s.steps ?? []
  const heroPoints = s.heroPoints ?? []

  return (
    <>
      <Navbar />

      <main>
        {/* ============ HERO ============ */}
        <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white pb-20 pt-32 lg:pb-28 lg:pt-40">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-accent-400/20 blur-3xl" />

          <div className={`${container} relative grid items-center gap-14 lg:grid-cols-2`}>
            <div>
              {s.heroBadge && (
                <span className={eyebrow}>
                  <Icon name="sparkle" className="h-4 w-4" /> {s.heroBadge}
                </span>
              )}
              <h1 className="mt-6 text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-[3.4rem]">
                {s.heroTitle}{' '}
                {s.heroHighlight && (
                  <span className="whitespace-nowrap text-brand-600 underline decoration-accent-500 decoration-[5px] underline-offset-[10px]">
                    {s.heroHighlight}
                  </span>
                )}{' '}
                {s.heroTitleAfter}
              </h1>
              {s.heroSubtitle && <p className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg">{s.heroSubtitle}</p>}

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#kontak" className={`${btnPrimary} px-8 py-4`}>
                  Mulai Konsultasi Gratis <Icon name="arrow" className="h-4 w-4" />
                </a>
                <a href="#layanan" className={`${btnGhost} px-8 py-4`}>
                  Lihat Layanan
                </a>
              </div>

              {heroPoints.length > 0 && (
                <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                  {heroPoints.map((p) => (
                    <li key={p.id ?? p.label} className="flex items-center gap-2 text-sm font-medium text-ink">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                        <Icon name="check" className="h-3.5 w-3.5" />
                      </span>
                      {p.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <HeroIllustration />
          </div>

          {stats.length > 0 && (
            <div className={`${container} relative mt-20`}>
              <dl className="grid grid-cols-2 gap-4 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-slate-100 sm:grid-cols-4 sm:p-8">
                {stats.map((st) => (
                  <div key={st.id ?? st.label} className="flex flex-col-reverse text-center">
                    <dt className="mt-1 text-sm">{st.label}</dt>
                    <dd className="text-3xl font-bold text-brand-600">{st.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </section>

        {/* ============ KENAPA KAMI ============ */}
        {values.length > 0 && (
          <section className={`${section} pt-8 lg:pt-12`}>
            <div className={container}>
              <div className="mx-auto max-w-2xl text-center">
                <span className={eyebrow}>Kenapa {s.siteName}</span>
                <h2 className={sectionTitle}>Teknologi yang membantu bisnis, bukan menambah beban.</h2>
              </div>
              <div className="mt-14 grid gap-6 md:grid-cols-3">
                {values.map((val) => (
                  <div key={val.id ?? val.title} className={`${card} ${cardHover}`}>
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                      <Icon name={val.icon} className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 text-lg">{val.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed">{val.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ LAYANAN ============ */}
        {services.length > 0 && (
          <section id="layanan" className={`${section} bg-slate-50`}>
            <div className={container}>
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                <div className="max-w-2xl">
                  <span className={eyebrow}>Layanan Kami</span>
                  <h2 className={sectionTitle}>Satu tempat untuk semua kebutuhan digital bisnis Anda.</h2>
                </div>
                <a href="#kontak" className={`${btnGhost} self-start lg:self-auto`}>
                  Diskusikan kebutuhan Anda <Icon name="arrow" className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-14 grid gap-6 md:grid-cols-2">
                {services.map((svc, i) => (
                  <article key={svc.id} className={`${card} ${cardHover} flex flex-col gap-6 sm:flex-row`}>
                    <span
                      className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl ${i % 2 ? 'bg-amber-50 text-accent-600' : 'bg-brand-50 text-brand-600'}`}
                    >
                      <Icon name={svc.icon} className="h-8 w-8" />
                    </span>
                    <div>
                      <h3 className="text-xl">{svc.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed">{svc.text}</p>
                      {svc.tags && svc.tags.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {svc.tags.map((t) => (
                            <li key={t.id ?? t.label} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                              {t.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ CARA KERJA ============ */}
        {steps.length > 0 && (
          <section id="cara-kerja" className={section}>
            <div className={container}>
              <div className="mx-auto max-w-2xl text-center">
                <span className={eyebrow}>Cara Kerja</span>
                <h2 className={sectionTitle}>Proses yang jelas dari awal sampai online.</h2>
              </div>
              <ol className="mt-14 grid gap-6 pt-3 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, i) => (
                  <li
                    key={step.id ?? step.title}
                    className="rounded-3xl bg-brand-50/60 p-7 shadow-card motion-safe:animate-float-card"
                    // Jeda berbeda per kartu agar bergerak bergantian seperti gelombang.
                    style={{ animationDelay: `${-i * 1.5}s` }}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-lg font-bold text-white shadow-lg shadow-brand-600/30">
                      {i + 1}
                    </span>
                    <h3 className="mt-6 text-lg">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ============ PORTOFOLIO ============ */}
        {portfolio.length > 0 && (
          <section id="portofolio" className={`${section} bg-slate-50`}>
            <div className={container}>
              <div className="mx-auto max-w-2xl text-center">
                <span className={eyebrow}>Portofolio</span>
                <h2 className={sectionTitle}>Beberapa solusi yang sudah kami bangun.</h2>
              </div>
              <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {portfolio.map((p, i) => (
                  <article key={p.id} className={`${card} ${cardHover} flex flex-col overflow-hidden p-0`}>
                    {isMedia(p.image) && p.image.url ? (
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={mediaSrc(p.image.url)}
                          alt={p.image.alt || p.title}
                          fill
                          sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`relative grid aspect-[16/10] place-items-center overflow-hidden ${PORTFOLIO_BG[i % 3]}`}>
                        <span className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
                        <span className="absolute -bottom-10 -left-6 h-40 w-40 rounded-full bg-white/10" />
                        <Icon name={PORTFOLIO_ICON[i % 3]} className="relative h-14 w-14 text-white/90" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-7">
                      <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">{p.category}</span>
                      <h3 className="mt-2 text-lg">{p.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed">{p.text}</p>
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener"
                          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800"
                        >
                          Lihat proyek <Icon name="external" className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ ACADEMY & MENTORING ============ */}
        {programs.length > 0 && (
          <section id="academy" className={section}>
            <div className={container}>
              <div className="mx-auto max-w-2xl text-center">
                <span className={eyebrow}>Academy & Mentoring</span>
                <h2 className={sectionTitle}>Belajar langsung dari praktisi, sesuai kebutuhan Anda.</h2>
              </div>
              <div className="mt-14 grid gap-6 lg:grid-cols-2">
                {programs.map((prog, i) => (
                  <article
                    key={prog.id}
                    className={`relative overflow-hidden rounded-[2rem] p-8 sm:p-10 ${i % 2 === 0 ? 'bg-brand-600 text-brand-100' : 'bg-ink text-slate-300'}`}
                  >
                    <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/5" />
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-white">
                          <Icon name={prog.icon} className="h-7 w-7" />
                        </span>
                        {prog.badge && (
                          <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-ink">{prog.badge}</span>
                        )}
                      </div>
                      <h3 className="mt-7 text-2xl text-white">{prog.title}</h3>
                      <p className="mt-3 leading-relaxed">{prog.text}</p>
                      {prog.points && prog.points.length > 0 && (
                        <ul className="mt-6 space-y-3">
                          {prog.points.map((pt) => (
                            <li key={pt.id ?? pt.label} className="flex items-center gap-3 text-sm text-white">
                              <span className="grid h-5 w-5 place-items-center rounded-full bg-white/15">
                                <Icon name="check" className="h-3.5 w-3.5" />
                              </span>
                              {pt.label}
                            </li>
                          ))}
                        </ul>
                      )}
                      <a href={wa(prog.waText)} target="_blank" rel="noopener" className={`${btnAccent} mt-8`}>
                        {prog.cta} <Icon name="arrow" className="h-4 w-4" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ TOOLS ============ */}
        {tools.length > 0 && (
          <section className="pb-20 lg:pb-28">
            <div className={container}>
              <div className="rounded-[2rem] border border-dashed border-brand-200 bg-brand-50/50 p-8 sm:p-10">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <span className={`${eyebrow} bg-white`}>Gratis</span>
                    <h2 className="mt-4 text-2xl">Tools gratis untuk kerja harian</h2>
                  </div>
                  <a href="/tools" className={`${btnGhost} self-start sm:self-auto`}>
                    Lihat semua tools <Icon name="arrow" className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-3 max-w-xl text-sm">Alat sederhana yang bisa langsung dipakai dari browser, tanpa instal aplikasi dan tanpa daftar.</p>
                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {tools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============ TESTIMONI ============ */}
        {testimonials.length > 0 && (
          <section className={`${section} bg-slate-50`}>
            <div className={container}>
              <div className="mx-auto max-w-2xl text-center">
                <span className={eyebrow}>Testimoni</span>
                <h2 className={sectionTitle}>Apa kata klien kami.</h2>
              </div>
              <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((t) => (
                  <figure key={t.id} className={card}>
                    <blockquote className="leading-relaxed text-ink">“{t.quote}”</blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      {isMedia(t.photo) && t.photo.url ? (
                        <Image src={mediaSrc(t.photo.url)} alt={t.name} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                      ) : (
                        <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-100 font-semibold text-brand-700">
                          {t.name.slice(0, 1)}
                        </span>
                      )}
                      <span>
                        <span className="block text-sm font-semibold text-ink">{t.name}</span>
                        {t.role && <span className="block text-xs">{t.role}</span>}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ FAQ ============ */}
        {faqs.length > 0 && (
          <section id="faq" className={`${section} ${testimonials.length ? '' : 'bg-slate-50'}`}>
            <div className={`${container} grid gap-12 lg:grid-cols-[1fr_1.4fr]`}>
              <div>
                <span className={eyebrow}>FAQ</span>
                <h2 className={sectionTitle}>Pertanyaan yang sering ditanyakan.</h2>
                <p className="mt-4">Tidak menemukan jawabannya? Tanyakan langsung ke tim kami.</p>
                <a href={wa()} target="_blank" rel="noopener" className={`${btnGhost} mt-6`}>
                  <Icon name="chat" className="h-4 w-4" /> Chat WhatsApp
                </a>
              </div>
              <FaqList items={faqs} />
            </div>
          </section>
        )}

        {/* ============ KONTAK ============ */}
        <section id="kontak" className={section}>
          <div className={container}>
            <div className="grid overflow-hidden rounded-[2rem] bg-brand-600 shadow-soft lg:grid-cols-[1fr_1.25fr]">
              <div className="relative p-8 text-brand-100 sm:p-12">
                <span className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10" />
                <div className="relative">
                  <span className={`${eyebrow} bg-white/15 text-white`}>Konsultasi Gratis</span>
                  <h2 className="mt-5 text-3xl leading-tight text-white sm:text-4xl">Punya rencana digital? Ceritakan ke kami.</h2>
                  <p className="mt-4 leading-relaxed">
                    Isi form, dan tim kami akan menghubungi Anda lewat WhatsApp untuk menjadwalkan konsultasi.
                  </p>

                  <ul className="mt-10 space-y-5">
                    <li className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 text-white">
                        <Icon name="phone" className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-wider">WhatsApp</span>
                        <a href={wa()} target="_blank" rel="noopener" className="font-semibold text-white hover:underline">
                          {s.whatsappDisplay || s.whatsapp}
                        </a>
                      </span>
                    </li>
                    {s.address && (
                      <li className="flex items-start gap-4">
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 text-white">
                          <Icon name="pin" className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block text-xs uppercase tracking-wider">Alamat</span>
                          <span className="font-semibold text-white">{s.address}</span>
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-white p-8 sm:p-12">
                <LeadForm
                  needs={(s.leadNeeds ?? []).map((n) => n.label)}
                  budgets={(s.leadBudgets ?? []).map((b) => b.label)}
                  waUrl={wa('Halo Signal Digital, saya baru saja mengisi form konsultasi di website.')}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter s={s} />
      <WhatsAppFloat number={s.whatsapp} />
    </>
  )
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-lg" aria-hidden="true">
      <div className="rounded-[2rem] bg-white p-4 shadow-soft ring-1 ring-slate-100 motion-safe:animate-float-slow">
        <div className="flex items-center gap-1.5 px-2 pb-3">
          <span className="h-3 w-3 rounded-full bg-rose-300" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-300" />
          <span className="ml-3 h-6 flex-1 rounded-full bg-slate-100 px-3 text-[11px] leading-6 text-slate-400">bisnisanda.com</span>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white">
          <p className="text-xs font-medium text-brand-100">Ringkasan bulan ini</p>
          <p className="mt-1 text-2xl font-semibold">Pesanan online naik</p>
          <div className="mt-6 flex h-28 items-end gap-2.5">
            {[35, 50, 42, 64, 58, 78, 92].map((h, i, arr) => (
              <span
                key={i}
                className={`flex-1 rounded-t-lg ${i === arr.length - 1 ? 'bg-accent-400' : 'bg-white/25'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-brand-50 p-4">
            <Icon name="code" className="h-6 w-6 text-brand-600" />
            <p className="mt-3 text-sm font-semibold text-ink">Website & Aplikasi</p>
            <span className="mt-2 block h-1.5 w-3/4 rounded-full bg-brand-200" />
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <Icon name="cloud" className="h-6 w-6 text-accent-600" />
            <p className="mt-3 text-sm font-semibold text-ink">Cloud Hosting</p>
            <span className="mt-2 block h-1.5 w-2/3 rounded-full bg-amber-200" />
          </div>
        </div>
      </div>

      <div className="absolute -left-4 top-1/3 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft sm:flex lg:-left-10 motion-safe:animate-float">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
          <Icon name="check" className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Website online</p>
          <p className="text-xs text-slate-500">Siap menerima pelanggan</p>
        </div>
      </div>
      <div className="absolute -bottom-6 -right-2 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft sm:flex lg:-right-8 motion-safe:animate-float-alt">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-100 text-brand-600">
          <Icon name="chat" className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-ink">Konsultasi gratis</p>
          <p className="text-xs text-slate-500">Respon di jam kerja</p>
        </div>
      </div>
    </div>
  )
}
