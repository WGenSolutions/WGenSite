import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, useReducedMotion } from 'framer-motion'
import Section from '../components/Section'

const schema = z.object({
  email: z
    .string()
    .email({ message: 'Please provide a valid email address.' })
    .max(160),
  company: z.string().max(120).optional(),
  idea: z
    .string()
    .min(12, { message: 'Tell us a bit more about your idea.' })
    .max(1200),
  consent: z.boolean().refine((value) => value === true, {
    message: 'consent',
  }),
})

type FormValues = z.infer<typeof schema>

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const submitIdea = async (values: FormValues) => {
  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID as string | undefined

  if (formspreeId) {
    const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      throw new Error('Form submission failed')
    }
    return response.json()
  }

  await new Promise((resolve) => setTimeout(resolve, 900))
  console.log('Propose app payload', values)
  return { ok: true }
}

export const ProposeForm = () => {
  const { t } = useTranslation(['home', 'common'])
  const [status, setStatus] = useState<FormStatus>('idle')
  const prefersReducedMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      company: '',
      idea: '',
      consent: false,
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setStatus('loading')
    try {
      const payload: FormValues = {
        ...values,
        company: values.company?.trim() ? values.company.trim() : undefined,
      }
      await submitIdea(payload)
      setStatus('success')
      reset({ email: '', company: '', idea: '', consent: false })
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  })

  useEffect(() => {
    const subscription = watch(() => {
      setStatus((current) => (current === 'success' || current === 'error' ? 'idle' : current))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  const consentErrorKey = errors.consent?.message === 'consent' ? 'common:form.consentError' : undefined

  return (
    <Section id="propose" title={t('form.title')} description={t('form.body')}>
      <motion.form
        onSubmit={onSubmit}
        className="grid gap-6 rounded-3xl border border-white/10 bg-card/80 p-8 shadow-glow"
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.24, 0.8, 0.25, 1] as const }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm text-muted">
            {t('common:form.email')}
            <input
              type="email"
              autoComplete="email"
              {...register('email')}
              className="rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-base text-foreground shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
              required
            />
            {errors.email ? (
              <span className="text-xs text-red-400">{errors.email.message}</span>
            ) : null}
          </label>
          <label className="flex flex-col gap-2 text-sm text-muted">
            {t('common:form.company')}
            <input
              type="text"
              autoComplete="organization"
              {...register('company')}
              className="rounded-xl border border-white/10 bg-background/70 px-4 py-3 text-base text-foreground shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            {errors.company ? (
              <span className="text-xs text-red-400">{errors.company.message}</span>
            ) : null}
          </label>
        </div>
        <label className="flex flex-col gap-2 text-sm text-muted">
          {t('common:form.idea')}
          <textarea
            rows={5}
            {...register('idea')}
            className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-base text-foreground shadow-inner transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
            required
          />
          {errors.idea ? (
            <span className="text-xs text-red-400">{errors.idea.message}</span>
          ) : null}
        </label>

        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            {...register('consent')}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-background/80 text-primary focus:ring-primary/60"
          />
          <span>{t('common:form.consent')}</span>
        </label>
        {consentErrorKey ? (
          <span className="text-xs text-red-400">{t(consentErrorKey)}</span>
        ) : null}

  <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting || status === 'loading' ? (
              <span className="flex items-center gap-2">
                <motion.span
                  className="inline-flex h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                  animate={prefersReducedMotion ? undefined : { rotate: 360 }}
                  transition={prefersReducedMotion ? undefined : { repeat: Infinity, duration: 1, ease: 'linear' }}
                  aria-hidden="true"
                />
                {t('common:form.send')}
              </span>
            ) : (
              t('common:form.send')
            )}
          </button>

          <div
            role="status"
            aria-live="polite"
            className={`text-sm font-medium ${
              status === 'success'
                ? 'text-emerald-400'
                : status === 'error'
                  ? 'text-red-400'
                  : 'text-muted'
            }`}
          >
            {status === 'success' ? t('common:form.success') : null}
            {status === 'error' ? t('common:form.error') : null}
          </div>
        </div>
      </motion.form>
    </Section>
  )
}

export default ProposeForm
