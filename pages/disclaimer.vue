<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'

const { locale } = useI18n()

// 本地翻译内容
const translations = {
  zh: {
    meta: {
      title: '免责声明 - 孕达代孕',
      description: '阅读孕达代孕的免责声明和使用条款。',
    },
    title: '免责声明',
    summary: 'Yunda Surrogacy不是医疗提供者，不提供医疗建议。Yunda不是律师事务所，不提供法律建议。所有医疗、法律和财务决定必须由有许可的专业人员做出。Yunda提供的信息仅供参考。个人结果可能有所不同，不保证。',
    section1: {
      title: '仅用于信息目的',
      content: 'Yunda网站、社交媒体渠道、电子邮件、咨询和其他通信上的所有内容仅用于一般信息目的。它不构成医疗、法律或财务建议，不应依赖于此。',
    },
    section2: {
      title: '无医疗建议',
      content: 'Yunda Surrogacy不是医疗机构，不提供医疗诊断、治疗或建议。所有医疗护理、生育治疗、IVF程序、妊娠管理和健康相关决定必须直接与有许可的医生、生育诊所和医疗保健提供者做出。',
    },
    section3: {
      title: '无法律建议',
      content: 'Yunda Surrogacy不是律师事务所，不提供法律建议。与代孕、亲子关系、合同、公民身份、移民和合规相关的法律事务必须由适当司法管辖区的合格、有许可的律师审查和处理。',
    },
    section4: {
      title: '不建立专业关系',
      content: '使用Yunda的网站、提交表格、与我们团队沟通或参与咨询不会建立医患关系、律师-客户关系或任何其他专业信托关系。',
    },
    section5: {
      title: '不保证结果',
      content: 'Yunda不保证与时间表、成本、补偿、匹配、妊娠成功、医疗结果或法律确定相关的特定结果。代孕结果取决于许多超出Yunda控制的变量，包括医疗、法律和个人因素。',
    },
    section6: {
      title: '第三方服务提供商',
      content: 'Yunda与独立的第三方提供商合作，包括生育诊所、律师、托管公司、保险提供商和其他专业合作伙伴。这些提供商独立运营，并对其自己的服务、建议、决定和合规负责。Yunda不控制或承担第三方专业人员的行为或建议的责任。',
    },
    section7: {
      title: '国际和跨境考虑',
      content: '对于国际客户，代孕法律、公民身份规则、移民要求和医疗保健法规因国家和司法管辖区而有很大差异。所有跨境法律解释、合同和官方确定必须由有许可的法律专业人员确认。除非法律顾问另有规定和确认，否则英语合同和适用法律条款控制。',
    },
    section8: {
      title: '用户责任',
      content: '您有责任在做出与代孕、捐卵、医疗、法律协议、财务规划或国际安排相关的决定之前寻求独立的专业建议。',
    },
    companyStatement: 'Yunda Surrogacy是一家独立的代孕机构，不从事医学或法律实践。我们通过促进联系和服务来支持客户，但所有医疗和法律决定仍由有许可的专业人员负责。',
  },
  en: {
    meta: {
      title: 'Disclaimer - Yunda Surrogacy',
      description: 'Read Yunda Surrogacy\'s disclaimer and terms of use.',
    },
    title: 'Disclaimer',
    summary: 'Yunda Surrogacy is not a medical provider and does not offer medical advice. Yunda is not a law firm and does not provide legal advice. All medical, legal, and financial decisions must be made by licensed professionals. Information provided by Yunda is for general guidance only. Individual outcomes may vary and are not guaranteed.',
    section1: {
      title: 'Informational Purposes Only',
      content: 'All content on the Yunda website, social media channels, emails, consultations, and other communications is provided for general informational purposes only. It does not constitute medical, legal, or financial advice and should not be relied upon as such.',
    },
    section2: {
      title: 'No Medical Advice',
      content: 'Yunda Surrogacy is not a medical institution and does not provide medical diagnosis, treatment, or advice. All medical care, fertility treatments, IVF procedures, pregnancy management, and health-related decisions must be made directly with licensed physicians, fertility clinics, and healthcare providers.',
    },
    section3: {
      title: 'No Legal Advice',
      content: 'Yunda Surrogacy is not a law firm and does not provide legal advice. Legal matters related to surrogacy, parentage, contracts, citizenship, immigration, and compliance must be reviewed and handled by qualified, licensed attorneys in the appropriate jurisdiction.',
    },
    section4: {
      title: 'No Professional Relationship Established',
      content: 'Use of Yunda\'s website, submission of forms, communication with our team, or participation in consultations does not create a doctor-patient relationship, attorney-client relationship, or any other professional fiduciary relationship.',
    },
    section5: {
      title: 'No Guarantee of Outcomes',
      content: 'Yunda does not guarantee specific outcomes related to timelines, costs, compensation, matching, pregnancy success, medical results, or legal determinations. Surrogacy outcomes depend on many variables beyond Yunda\'s control, including medical, legal, and personal factors.',
    },
    section6: {
      title: 'Third-Party Service Providers',
      content: 'Yunda works with independent third-party providers, including fertility clinics, attorneys, escrow companies, insurance providers, and other professional partners. These providers operate independently and are responsible for their own services, advice, decisions, and compliance. Yunda does not control or assume liability for the actions or advice of third-party professionals.',
    },
    section7: {
      title: 'International and Cross-Border Considerations',
      content: 'For international clients, surrogacy laws, citizenship rules, immigration requirements, and healthcare regulations vary significantly by country and jurisdiction. All cross-border legal interpretations, contracts, and official determinations must be confirmed by licensed legal professionals. English-language contracts and governing law provisions control unless otherwise specified and confirmed by legal counsel.',
    },
    section8: {
      title: 'User Responsibility',
      content: 'You are responsible for seeking independent professional advice before making decisions related to surrogacy, egg donation, medical treatment, legal agreements, financial planning, or international arrangements.',
    },
    companyStatement: 'Yunda Surrogacy is an independent surrogacy agency and does not practice medicine or law. We support clients by facilitating connections and services, but all medical and legal decisions remain the responsibility of licensed professionals.',
  },
}

// 根据当前语言获取翻译
const t = computed(() => {
  const lang = locale.value === 'zh' ? 'zh' : 'en'
  return translations[lang]
})

useHead({
  title: t.value.meta.title,
  meta: [
    {
      name: 'description',
      content: t.value.meta.description,
    },
  ],
})
</script>

<template>
  <div>
    <AppHeader />
    <main class="min-h-screen bg-white">
      <div class="mx-auto max-w-4xl px-4 py-12 md:px-8 md:py-16">
        <article class="prose-lg max-w-none prose">
          <h1 class="mb-4 text-4xl text-[var(--dark-brown)] font-bold">
            {{ t.title }}
          </h1>

          <!-- Short Summary -->
          <div class="mb-8 border-l-4 border-yellow-400 bg-yellow-50 p-6">
            <p class="text-gray-800 font-medium leading-relaxed">
              {{ t.summary }}
            </p>
          </div>

          <!-- Section 1: Informational Purposes Only -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold">
              1. {{ t.section1.title }}
            </h2>
            <div class="text-gray-700 leading-relaxed space-y-3">
              <p>{{ t.section1.content }}</p>
            </div>
          </section>

          <!-- Section 2: No Medical Advice -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold">
              2. {{ t.section2.title }}
            </h2>
            <div class="text-gray-700 leading-relaxed space-y-3">
              <p>{{ t.section2.content }}</p>
            </div>
          </section>

          <!-- Section 3: No Legal Advice -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold">
              3. {{ t.section3.title }}
            </h2>
            <div class="text-gray-700 leading-relaxed space-y-3">
              <p>{{ t.section3.content }}</p>
            </div>
          </section>

          <!-- Section 4: No Professional Relationship -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold">
              4. {{ t.section4.title }}
            </h2>
            <div class="text-gray-700 leading-relaxed space-y-3">
              <p>{{ t.section4.content }}</p>
            </div>
          </section>

          <!-- Section 5: No Guarantee of Outcomes -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold">
              5. {{ t.section5.title }}
            </h2>
            <div class="text-gray-700 leading-relaxed space-y-3">
              <p>{{ t.section5.content }}</p>
            </div>
          </section>

          <!-- Section 6: Third-Party Service Providers -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold">
              6. {{ t.section6.title }}
            </h2>
            <div class="text-gray-700 leading-relaxed space-y-3">
              <p>{{ t.section6.content }}</p>
            </div>
          </section>

          <!-- Section 7: International Considerations -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold">
              7. {{ t.section7.title }}
            </h2>
            <div class="text-gray-700 leading-relaxed space-y-3">
              <p>{{ t.section7.content }}</p>
            </div>
          </section>

          <!-- Section 8: User Responsibility -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold">
              8. {{ t.section8.title }}
            </h2>
            <div class="text-gray-700 leading-relaxed space-y-3">
              <p>{{ t.section8.content }}</p>
            </div>
          </section>
        </article>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.prose a {
  color: #2563eb;
  text-decoration: underline;
}

.prose a:hover {
  color: #1d4ed8;
}
</style>
