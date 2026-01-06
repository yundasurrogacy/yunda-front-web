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
      title: '隐私政策 - 孕达代孕',
      description: '了解孕达代孕如何收集、使用和保护您的个人信息。',
    },
    title: '隐私政策',
    effectiveDate: '生效日期',
    effectiveDateValue: '2026年1月1日',
    lastUpdated: '最后更新',
    lastUpdatedValue: '2026年1月1日',
    intro1: 'Yunda Surrogacy（"孕达"、"我们"或"我们的"）致力于保护您的隐私，并以谨慎、透明和尊重的方式处理您的个人信息。本隐私政策说明了当您与我们互动时，我们如何收集、使用、存储、共享和保护您的信息。',
    intro2: '作为数据控制者，我们直接从您那里接收个人信息，并在我们的合同关系、业务运营以及与您的互动中接收信息。本数据隐私通知涵盖我们从您那里收集的或关于您的个人信息，包括当您访问和与我们链接到此数据隐私通知的任何网站（"网站"）互动时；从我们购买服务，以及以其他方式向我们提供个人信息，无论是在线还是离线，在您与我们关系的背景下。',
    toc: {
      title: '点击以下链接跳转到特定部分：',
      scope: '本隐私政策的范围',
      information: '我们收集的信息',
      use: '我们如何使用您的信息',
      sharing: '信息的共享和披露',
      retention: '数据保留',
      security: '数据安全措施',
      rights: '您的隐私权',
      contact: '联系我们',
    },
    scope: {
      title: '本隐私政策的范围',
      content1: '本隐私政策适用于孕达代孕通过以下方式收集的个人信息：',
      item1: '我们的网站和落地页',
      item2: '在线申请表和咨询表',
      item3: '社交媒体平台（包括直接消息和评论）',
      item4: '电子邮件、电话、短信和消息应用',
      item5: '虚拟或面对面的咨询和活动',
      content2: '无论信息是在线还是离线收集的，本政策均适用。',
    },
    information: {
      title: '我们收集的信息',
      intro: '根据您与孕达的互动，我们可能收集以下类别的个人信息：',
      personalIdentifiers: {
        title: '个人标识符',
        content: '包括您的姓名、电子邮件地址、电话号码、邮寄地址、国籍、居住国家和首选语言。',
      },
      application: {
        title: '申请和关系信息',
        content: '包括您的角色（代孕母、准父母、捐卵者）、家庭状况、生育目标、背景信息以及在其他表格中提供的其他详细信息。',
      },
      sensitive: {
        title: '敏感个人信息',
        content1: '在法律允许且您自愿提供的情况下，这可能包括：',
        item1: '健康相关信息',
        item2: '生殖历史',
        item3: '性别认同或性取向',
        item4: '保险相关信息',
        content2: '我们仅出于合法的代孕相关目的并根据适用法律收集和使用敏感信息。',
      },
      communication: {
        title: '通信数据',
        content: '包括电子邮件、消息、通话记录和咨询笔记。',
      },
      technical: {
        title: '技术和使用信息',
        content: '包括IP地址、设备类型、浏览器类型、访问的页面以及用于改进我们网站和服务的cookie或类似技术。',
      },
      note: '您可以选择不提供某些信息；但是，这样做可能会限制我们提供服务的能力。',
    },
    use: {
      title: '我们如何使用个人信息',
      intro: '我们将个人信息用于包括但不限于以下目的：',
      item1: '回复咨询和提供咨询',
      item2: '评估资格并促进匹配流程',
      item3: '与诊所、法律顾问、托管提供商和保险合作伙伴协调服务',
      item4: '管理合规、风险和运营流程',
      item5: '传达更新、教育内容和服务相关通知',
      item6: '改进我们的网站、服务和用户体验',
      item7: '遵守法律、监管和合同义务',
      consent: '在法律要求的情况下，我们依赖您的同意。您可以随时通过联系我们撤回同意。',
    },
    sharing: {
      title: '我们如何共享和披露信息',
      noSell: '我们不出售您的个人信息。',
      intro: '我们仅在必要时与以下各方共享您的信息：',
      item1: '生育诊所和医疗专业人员',
      item2: '律师和法律服务提供商',
      item3: '托管、保险和金融服务提供商',
      item4: 'IT、CRM、托管、分析和通信供应商',
      item5: '法律要求时的监管机构或执法部门',
      item6: '严格用于代孕相关服务的业务合作伙伴，并承担保密义务',
      thirdParty: '所有第三方都必须仅将您的信息用于授权目的，并维护适当的安全措施。',
    },
    retention: {
      title: '数据保留',
      content: '我们仅在实现本隐私政策中描述的目的、维持与您的持续关系以及满足我们的法律、监管和合同义务所需的时间内保留个人信息。一旦信息不再需要用于这些定义的目的，我们将安全地删除或匿名化它。',
    },
    security: {
      title: '数据安全',
      content1: '我们维护合理的管理、技术和物理保障措施，旨在保护个人信息免受未经授权的访问、丢失、滥用或披露。',
      content2: '虽然我们认真对待数据保护，但没有任何系统可以保证100%安全。',
    },
    rights: {
      title: '您的隐私权',
      california: {
        title: '加利福尼亚州居民',
        content1: '加利福尼亚州居民有权要求了解我们收集的关于他们的个人数据信息。这包括收集的个人信息类别、获取信息的来源、收集、使用、出售或共享此类信息的商业或商业目的、我们向其披露个人信息的第三方类别，以及我们持有的具体个人信息。加利福尼亚州居民还有权要求更正我们维护的不准确的个人信息。',
        content2: '您还可以要求删除您的个人信息。请注意，在法律允许的情况下，我们可能会拒绝删除请求，例如当信息需要遵守法律义务或完成您请求的交易或服务时。如果我们拒绝删除请求，我们将告知您原因。此外，您有权选择退出您的个人信息的出售或共享，包括选择退出性能和定向广告cookie。在适用的情况下，您还可能有权限制敏感个人信息的使用或披露。',
        content3: '我们不会因您行使任何隐私权而歧视您。但是，行使某些权利可能会限制您访问我们网站或服务的特定功能的能力。加利福尼亚州居民可以按照标题为"提交隐私权请求"的部分中描述的方式提交隐私权请求。根据加利福尼亚州的"照亮光明"法律（加利福尼亚州民法典第1798.83节），加利福尼亚州居民可以每年一次要求了解为直接营销目的向第三方披露其个人信息的信息。可以通过联系kaylal@yundasurrogacy.com提交请求。',
        content4: '',
      },
      eu: {
        title: '欧盟/英国居民',
        content1: '如果您居住在欧盟或英国，您可能拥有GDPR下的权利，包括：',
        item1: '访问和获取您的个人数据副本的权利',
        item2: '更正或删除的权利',
        item3: '限制或反对处理的权利',
        item4: '数据可移植性的权利',
        item5: '撤回同意的权利',
        item6: '向监管机构提出投诉的权利',
        content2: '当个人数据在国际间传输时，我们使用适当的保障措施，如标准合同条款。',
      },
    },
    contact: {
      title: '联系我们',
      content: '如果您对本隐私政策或您的个人信息有任何问题、疑虑或请求，请通过以下方式联系我们：',
      email: '电子邮件',
      phone: '电话',
    },
  },
  en: {
    meta: {
      title: 'Privacy Policy - Yunda Surrogacy',
      description: 'Learn how Yunda Surrogacy collects, uses, and protects your personal information.',
    },
    title: 'Privacy Policy',
    effectiveDate: 'Effective Date',
    effectiveDateValue: 'January 1, 2026',
    lastUpdated: 'Last Updated',
    lastUpdatedValue: 'January 1, 2026',
    intro1: 'Yunda Surrogacy ("Yunda," "we," "us," or "our") is committed to protecting your privacy and handling your personal information with care, transparency, and respect. This Privacy Policy explains how we collect, use, store, share, and protect your information when you interact with us.',
    intro2: 'As data controller, we receive personal information directly from you and in our contractual relationship, our business operations and interactions with you. This Data Privacy Notice covers the personal information we collect from you, or about you, including when you visit and interact with any of our websites that link to this Data Privacy Notice (the "Websites"); purchase services from, and otherwise provide personal information to us, whether offline or online in the context of your relationship with us.',
    toc: {
      title: 'Click on one of the links below to jump to a specific section:',
      scope: 'Scope of This Privacy Policy',
      information: 'Information We Collect',
      use: 'How We Use Your Information',
      sharing: 'Sharing and Disclosure of Information',
      retention: 'Data Retention',
      security: 'Data Security Measures',
      rights: 'Your Privacy Rights',
      contact: 'Contact Us',
    },
    scope: {
      title: 'Scope of This Privacy Policy',
      content1: 'This Privacy Policy applies to personal information collected by Yunda Surrogacy through:',
      item1: 'Our websites and landing pages',
      item2: 'Online application forms and inquiry forms',
      item3: 'Social media platforms (including direct messages and comments)',
      item4: 'Email, phone, SMS, and messaging apps',
      item5: 'Virtual or in-person consultations and events',
      content2: 'This policy applies whether information is collected online or offline.',
    },
    information: {
      title: 'Information We Collect',
      intro: 'Depending on your interaction with Yunda, we may collect the following categories of personal information:',
      personalIdentifiers: {
        title: 'Personal Identifiers',
        content: 'Including your name, email address, phone number, mailing address, nationality, country of residence, and preferred language.',
      },
      application: {
        title: 'Application & Relationship Information',
        content: 'Including your role (surrogate, intended parent, egg donor), family status, fertility goals, background information, and other details provided in intake forms.',
      },
      sensitive: {
        title: 'Sensitive Personal Information',
        content1: 'Where permitted by law and voluntarily provided by you, this may include:',
        item1: 'Health-related information',
        item2: 'Reproductive history',
        item3: 'Gender identity or sexual orientation',
        item4: 'Insurance-related information',
        content2: 'We only collect and use sensitive information for legitimate surrogacy-related purposes and in accordance with applicable laws.',
      },
      communication: {
        title: 'Communication Data',
        content: 'Including emails, messages, call records, and consultation notes.',
      },
      technical: {
        title: 'Technical & Usage Information',
        content: 'Including IP address, device type, browser type, pages visited, and cookies or similar technologies used to improve our website and services.',
      },
      note: 'You may choose not to provide certain information; however, doing so may limit our ability to provide services.',
    },
    use: {
      title: 'How We Use Personal Information',
      intro: 'We use personal information for purposes including but not limited to:',
      item1: 'Responding to inquiries and providing consultations',
      item2: 'Assessing eligibility and facilitating matching processes',
      item3: 'Coordinating services with clinics, legal counsel, escrow providers, and insurance partners',
      item4: 'Managing compliance, risk, and operational processes',
      item5: 'Communicating updates, educational content, and service-related notices',
      item6: 'Improving our website, services, and user experience',
      item7: 'Complying with legal, regulatory, and contractual obligations',
      consent: 'Where required by law, we rely on your consent. You may withdraw consent at any time by contacting us.',
    },
    sharing: {
      title: 'How We Share and Disclose Information',
      noSell: 'We do not sell your personal information.',
      intro: 'We may share your information only as necessary with:',
      item1: 'Fertility clinics and medical professionals',
      item2: 'Attorneys and legal service providers',
      item3: 'Escrow, insurance, and financial service providers',
      item4: 'IT, CRM, hosting, analytics, and communication vendors',
      item5: 'Regulatory authorities or law enforcement when required by law',
      item6: 'Business partners strictly for surrogacy-related services, with confidentiality obligations',
      thirdParty: 'All third parties are required to use your information only for authorized purposes and to maintain appropriate security measures.',
    },
    retention: {
      title: 'Data Retention',
      content: 'We retain personal information only for as long as necessary to fulfill the purposes described in this Privacy Policy, maintain our ongoing relationships with you, and meet our legal, regulatory, and contractual obligations. Once the information is no longer required for these defined purposes, we will securely delete or anonymize it.',
    },
    security: {
      title: 'Data Security',
      content1: 'We maintain reasonable administrative, technical, and physical safeguards designed to protect personal information from unauthorized access, loss, misuse, or disclosure.',
      content2: 'While we take data protection seriously, no system can be guaranteed 100% secure.',
    },
    rights: {
      title: 'Your Privacy Rights',
      california: {
        title: 'California Residents',
        content1: 'California residents have the right to request information about the personal data we collect about them. This includes the categories of personal information collected, the sources from which the information is obtained, the business or commercial purposes for collecting, using, selling, or sharing such information, the categories of third parties with whom we disclose personal information, and the specific pieces of personal information we hold. California residents also have the right to request the correction of inaccurate personal information maintained by us.',
        content2: 'You may also request the deletion of your personal information. Please note that we may deny a deletion request when permitted by law, such as when the information is required to comply with legal obligations or to complete a transaction or service you requested. If we deny a deletion request, we will inform you of the reason. In addition, you have the right to opt out of the sale or sharing of your personal information, including opting out of performance and targeted advertising cookies. Where applicable, you may also have the right to limit the use or disclosure of sensitive personal information.',
        content3: 'We will not discriminate against you for exercising any of your privacy rights. However, exercising certain rights may limit your ability to access specific features of our website or services. California residents may submit privacy rights requests as described in the section titled "Submitting a Privacy Rights Request." Under California\'s "Shine the Light" law (California Civil Code Section 1798.83), California residents may request, once per calendar year, information regarding the disclosure of their personal information to third parties for direct marketing purposes. Requests may be submitted by contacting us at kaylal@yundasurrogacy.com.',
        content4: '',
      },
      eu: {
        title: 'EU / UK Residents',
        content1: 'If you reside in the European Union or United Kingdom, you may have rights under GDPR, including:',
        item1: 'Right to access and obtain a copy of your personal data',
        item2: 'Right to rectification or deletion',
        item3: 'Right to restrict or object to processing',
        item4: 'Right to data portability',
        item5: 'Right to withdraw consent',
        item6: 'Right to lodge a complaint with a supervisory authority',
        content2: 'Where personal data is transferred internationally, we use appropriate safeguards such as standard contractual clauses.',
      },
    },
    contact: {
      title: 'Contact Us',
      content: 'If you have any questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at:',
      email: 'Email',
      phone: 'Phone',
    },
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
        <article class="prose prose-lg max-w-none">
          <h1 class="mb-4 text-4xl font-bold text-[var(--dark-brown)]">
            {{ t.title }}
          </h1>

          <div class="mb-8 text-sm text-gray-600">
            <p><strong>{{ t.effectiveDate }}:</strong> {{ t.effectiveDateValue }}</p>
            <p><strong>{{ t.lastUpdated }}:</strong> {{ t.lastUpdatedValue }}</p>
          </div>

          <div class="mb-8 leading-relaxed text-gray-700">
            <p class="mb-4">
              {{ t.intro1 }}
            </p>
            <p class="mb-4">
              {{ t.intro2 }}
            </p>
          </div>

          <!-- Table of Contents -->
          <div class="mb-8 rounded-lg bg-gray-50 p-6">
            <h2 class="mb-4 text-xl font-semibold">
              {{ t.toc.title }}
            </h2>
            <ol class="list-decimal list-inside space-y-2">
              <li><a href="#scope" class="text-blue-600 hover:underline">{{ t.toc.scope }}</a></li>
              <li><a href="#information" class="text-blue-600 hover:underline">{{ t.toc.information }}</a></li>
              <li><a href="#use" class="text-blue-600 hover:underline">{{ t.toc.use }}</a></li>
              <li><a href="#sharing" class="text-blue-600 hover:underline">{{ t.toc.sharing }}</a></li>
              <li><a href="#retention" class="text-blue-600 hover:underline">{{ t.toc.retention }}</a></li>
              <li><a href="#security" class="text-blue-600 hover:underline">{{ t.toc.security }}</a></li>
              <li><a href="#rights" class="text-blue-600 hover:underline">{{ t.toc.rights }}</a></li>
              <li><a href="#contact" class="text-blue-600 hover:underline">{{ t.toc.contact }}</a></li>
            </ol>
          </div>

          <!-- Section 1: Scope -->
          <section id="scope" class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              1. {{ t.scope.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.scope.content1 }}</p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>{{ t.scope.item1 }}</li>
                <li>{{ t.scope.item2 }}</li>
                <li>{{ t.scope.item3 }}</li>
                <li>{{ t.scope.item4 }}</li>
                <li>{{ t.scope.item5 }}</li>
              </ul>
              <p>{{ t.scope.content2 }}</p>
            </div>
          </section>

          <!-- Section 2: Information We Collect -->
          <section id="information" class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              2. {{ t.information.title }}
            </h2>
            <div class="space-y-4 leading-relaxed text-gray-700">
              <p>{{ t.information.intro }}</p>

              <div>
                <h3 class="mb-2 text-xl font-semibold">
                  {{ t.information.personalIdentifiers.title }}
                </h3>
                <p>{{ t.information.personalIdentifiers.content }}</p>
              </div>

              <div>
                <h3 class="mb-2 text-xl font-semibold">
                  {{ t.information.application.title }}
                </h3>
                <p>{{ t.information.application.content }}</p>
              </div>

              <div>
                <h3 class="mb-2 text-xl font-semibold">
                  {{ t.information.sensitive.title }}
                </h3>
                <p>{{ t.information.sensitive.content1 }}</p>
                <ul class="ml-4 mt-2 list-inside list-disc space-y-2">
                  <li>{{ t.information.sensitive.item1 }}</li>
                  <li>{{ t.information.sensitive.item2 }}</li>
                  <li>{{ t.information.sensitive.item3 }}</li>
                  <li>{{ t.information.sensitive.item4 }}</li>
                </ul>
                <p class="mt-2">{{ t.information.sensitive.content2 }}</p>
              </div>

              <div>
                <h3 class="mb-2 text-xl font-semibold">
                  {{ t.information.communication.title }}
                </h3>
                <p>{{ t.information.communication.content }}</p>
              </div>

              <div>
                <h3 class="mb-2 text-xl font-semibold">
                  {{ t.information.technical.title }}
                </h3>
                <p>{{ t.information.technical.content }}</p>
              </div>

              <p class="italic">{{ t.information.note }}</p>
            </div>
          </section>

          <!-- Section 3: How We Use Information -->
          <section id="use" class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              3. {{ t.use.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.use.intro }}</p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>{{ t.use.item1 }}</li>
                <li>{{ t.use.item2 }}</li>
                <li>{{ t.use.item3 }}</li>
                <li>{{ t.use.item4 }}</li>
                <li>{{ t.use.item5 }}</li>
                <li>{{ t.use.item6 }}</li>
                <li>{{ t.use.item7 }}</li>
              </ul>
              <p>{{ t.use.consent }}</p>
            </div>
          </section>

          <!-- Section 4: Sharing and Disclosure -->
          <section id="sharing" class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              4. {{ t.sharing.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p class="font-semibold">
                {{ t.sharing.noSell }}
              </p>
              <p>{{ t.sharing.intro }}</p>
              <ul class="list-disc list-inside space-y-2 ml-4">
                <li>{{ t.sharing.item1 }}</li>
                <li>{{ t.sharing.item2 }}</li>
                <li>{{ t.sharing.item3 }}</li>
                <li>{{ t.sharing.item4 }}</li>
                <li>{{ t.sharing.item5 }}</li>
                <li>{{ t.sharing.item6 }}</li>
              </ul>
              <p>{{ t.sharing.thirdParty }}</p>
            </div>
          </section>

          <!-- Section 5: Data Retention -->
          <section id="retention" class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              5. {{ t.retention.title }}
            </h2>
            <div class="leading-relaxed text-gray-700">
              <p>{{ t.retention.content }}</p>
            </div>
          </section>

          <!-- Section 6: Data Security -->
          <section id="security" class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              6. {{ t.security.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.security.content1 }}</p>
              <p>{{ t.security.content2 }}</p>
            </div>
          </section>

          <!-- Section 7: Your Privacy Rights -->
          <section id="rights" class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              7. {{ t.rights.title }}
            </h2>

            <!-- 7.1 California Residents -->
            <div class="mb-6">
              <h3 class="mb-3 text-xl font-semibold">
                7.1 {{ t.rights.california.title }}
              </h3>
              <div class="space-y-3 leading-relaxed text-gray-700">
                <p>{{ t.rights.california.content1 }}</p>
                <p>{{ t.rights.california.content2 }}</p>
                <p>{{ t.rights.california.content3 }}</p>
                <p v-if="t.rights.california.content4">{{ t.rights.california.content4 }}</p>
              </div>
            </div>

            <!-- 7.2 EU / UK Residents -->
            <div class="mb-6">
              <h3 class="mb-3 text-xl font-semibold">
                7.2 {{ t.rights.eu.title }}
              </h3>
              <div class="space-y-3 leading-relaxed text-gray-700">
                <p>{{ t.rights.eu.content1 }}</p>
                <ul class="list-disc list-inside space-y-2 ml-4">
                  <li>{{ t.rights.eu.item1 }}</li>
                  <li>{{ t.rights.eu.item2 }}</li>
                  <li>{{ t.rights.eu.item3 }}</li>
                  <li>{{ t.rights.eu.item4 }}</li>
                  <li>{{ t.rights.eu.item5 }}</li>
                  <li>{{ t.rights.eu.item6 }}</li>
                </ul>
                <p>{{ t.rights.eu.content2 }}</p>
              </div>
            </div>
          </section>

          <!-- Section 8: Contact Us -->
          <section id="contact" class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              8. {{ t.contact.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.contact.content }}</p>
              <div class="rounded bg-gray-50 p-4">
                <p>
                  <strong>{{ t.contact.email }}:</strong>
                  <a href="mailto:kaylal@yundasurrogacy.com" class="text-blue-600 hover:underline">kaylal@yundasurrogacy.com</a>
                </p>
                <p>
                  <strong>{{ t.contact.phone }}:</strong>
                  <a href="tel:+16265638656" class="text-blue-600 hover:underline">+1 (626) 563-8656</a>
                </p>
              </div>
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
