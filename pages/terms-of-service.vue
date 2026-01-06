<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'

const { locale } = useI18n()
const localePath = useLocalePath()

// 本地翻译内容
const translations = {
  zh: {
    meta: {
      title: '服务条款 - 孕达代孕',
      description: '阅读孕达代孕的服务条款和使用条件。',
    },
    title: '服务条款',
    effectiveDate: '生效日期',
    effectiveDateValue: '2026年1月1日',
    lastUpdated: '最后更新',
    lastUpdatedValue: '2026年1月1日',
    intro: '欢迎使用Yunda Surrogacy（"孕达"、"我们"或"我们的"）提供的网站和服务。通过访问或使用我们的网站和服务，您同意遵守并受这些服务条款（"条款"）的约束。如果您不同意这些条款，请不要使用我们的网站或服务。',
    section1: {
      title: '接受条款',
      content: '通过访问或使用Yunda Surrogacy网站（"网站"）或服务（"服务"），您承认您已阅读、理解并同意受这些服务条款的约束。如果您不同意这些条款，请不要使用网站或服务。',
    },
    section2: {
      title: '服务描述',
      content: 'Yunda Surrogacy是一家独立的代孕机构，提供代孕相关服务，包括但不限于代孕匹配、协调、咨询和支持服务。我们不是医疗提供者，不提供医疗建议。我们不是律师事务所，不提供法律建议。',
    },
    section3: {
      title: '资格',
      content: '使用我们的网站和服务，您声明并保证您至少年满18岁，并且有能力签订具有法律约束力的合同。',
    },
    section4: {
      title: '用户责任',
      content: '您有责任确保您提供给我们或通过网站提交的所有信息准确、完整和最新。您同意仅将网站和服务用于合法目的。',
    },
    section5: {
      title: '隐私和数据保护',
      content: '您的隐私对我们很重要。我们收集和使用个人信息的方式在我们的隐私政策中描述，该政策通过引用并入这些条款。请仔细阅读我们的隐私政策。',
    },
    section6: {
      title: '知识产权',
      content: '本网站上的所有内容，包括文本、图形、徽标、视频和设计元素，均由Yunda Surrogacy拥有或许可，并受适用的知识产权法律保护。未经事先书面许可，您不得复制、复制、分发或利用任何内容。',
    },
    section7: {
      title: '用户提交',
      content1: '如果您向Yunda Surrogacy提交内容、信息或材料，您授予我们非排他性、免版税的权利，以提供和改进我们服务的目的使用此类内容，但须遵守我们的隐私政策。',
      content2: '您同意仅将网站和服务用于合法、适当且符合这些服务条款和任何适用法律、规则或法规的目的。禁止使用网站、服务或用户贡献：',
      prohibited: '禁止使用',
      prohibitedItem1: '违反任何适用法律或法规',
      prohibitedItem2: '侵犯他人的知识产权或隐私权',
      prohibitedItem3: '提交虚假、欺骗性或误导性信息',
      prohibitedItem4: '冒充任何人或实体或歪曲您的隶属关系',
      prohibitedItem5: '对他人进行骚扰、虐待、歧视、仇恨言论或有害行为',
      prohibitedItem6: '上传或传输恶意代码、病毒或旨在破坏或损坏系统的内容',
      prohibitedItem7: '发布或分享淫秽、色情、威胁、诽谤或其他非法内容',
      prohibitedItem8: '未经授权收集或滥用他人的个人信息',
      prohibitedItem9: '发送未经请求或未经授权的广告、垃圾邮件或类似招揽',
      prohibitedItem10: '试图抓取、爬取、逆向工程或以其他方式干扰网站的安全性或功能',
      prohibitedItem11: '以这些条款未明确允许的任何方式使用网站或内容',
      termination: '我们保留因违反任何禁止使用而终止您使用网站和服务或任何相关网站的权利。',
    },
    section8: {
      title: '免责声明；责任限制',
      content1: '网站和服务按"现状"和"可用"基础提供。Yunda Surrogacy不对任何代孕或相关流程的结果、时间表、成本或成功率做出任何保证或保证。',
      content2: '在法律允许的最大范围内，Yunda Surrogacy不对因使用网站或服务而产生或相关的任何间接、偶然、后果性或特殊损害承担责任。',
    },
    section9: {
      title: '适用法律和争议解决',
      content: '这些条款应受Yunda Surrogacy法律顾问确定的适用法律管辖和解释。任何争议应通过适用司法管辖区确定的合法适当方式解决。',
    },
    section10: {
      title: '隐私政策',
      content: '您使用网站还受我们的隐私政策约束，该政策通过引用并入这些条款。请仔细阅读以了解我们如何收集、使用和保护',
      link: '您的信息（隐私政策）',
    },
    section11: {
      title: '联系我们',
      content: '如果您对这些条款或我们的服务有任何问题，请通过以下方式联系我们：',
      phone: '电话',
      email: '电子邮件',
    },
  },
  en: {
    meta: {
      title: 'Terms of Service - Yunda Surrogacy',
      description: 'Read Yunda Surrogacy\'s terms of service and conditions of use.',
    },
    title: 'Terms of Service',
    effectiveDate: 'Effective Date',
    effectiveDateValue: 'January 1, 2026',
    lastUpdated: 'Last Updated',
    lastUpdatedValue: 'January 1, 2026',
    intro: 'Welcome to the websites and services provided by Yunda Surrogacy ("Yunda," "we," or "our"). By accessing or using our websites and services, you agree to comply with and be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our websites or services.',
    section1: {
      title: 'Acceptance of Terms',
      content: 'By accessing or using the Yunda Surrogacy websites (the "Sites") or services (the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use the Sites or Services.',
    },
    section2: {
      title: 'Services Description',
      content: 'Yunda Surrogacy is an independent surrogacy agency that provides surrogacy-related services, including but not limited to surrogate matching, coordination, consultation, and support services. We are not a medical provider and do not provide medical advice. We are not a law firm and do not provide legal advice.',
    },
    section3: {
      title: 'Eligibility',
      content: 'By using our Sites and Services, you represent and warrant that you are at least 18 years of age and have the capacity to enter into a legally binding contract.',
    },
    section4: {
      title: 'User Responsibilities',
      content: 'You are responsible for ensuring that all information you provide to us or submit through the Sites is accurate, complete, and up-to-date. You agree to use the Sites and Services only for lawful purposes.',
    },
    section5: {
      title: 'Privacy and Data Protection',
      content: 'Your privacy is important to us. How we collect and use personal information is described in our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy carefully.',
    },
    section6: {
      title: 'Intellectual Property',
      content: 'All content on this Site, including text, graphics, logos, videos, and design elements, is owned by or licensed to Yunda Surrogacy and is protected by applicable intellectual property laws. You may not copy, reproduce, distribute, or exploit any content without prior written permission.',
    },
    section7: {
      title: 'User Submissions',
      content1: 'If you submit content, information, or materials to Yunda Surrogacy, you grant us a non-exclusive, royalty-free right to use such content for the purpose of providing and improving our Services, subject to our Privacy Policy.',
      content2: 'You agree to use the Sites and Services only for purposes that are legal, proper and in accordance with these Terms of Service and any applicable laws, rules or regulations. You are prohibited from using the Sites, Services, or User Contributions:',
      prohibited: 'Prohibited Uses',
      prohibitedItem1: 'violating any applicable laws or regulations',
      prohibitedItem2: 'infringing upon the intellectual property or privacy rights of others',
      prohibitedItem3: 'submitting false, deceptive, or misleading information',
      prohibitedItem4: 'impersonating any person or entity or misrepresenting your affiliation',
      prohibitedItem5: 'engaging in harassment, abuse, discrimination, hate speech, or harmful conduct toward others',
      prohibitedItem6: 'uploading or transmitting malicious code, viruses, or content intended to disrupt or damage systems',
      prohibitedItem7: 'posting or sharing obscene, pornographic, threatening, defamatory, or otherwise illegal content',
      prohibitedItem8: 'collecting or misusing personal information of others without authorization',
      prohibitedItem9: 'sending unsolicited or unauthorized advertising, spam, or similar solicitations',
      prohibitedItem10: 'attempting to scrape, crawl, reverse engineer, or otherwise interfere with the security or functionality of the Sites',
      prohibitedItem11: 'using the Sites or Content in any manner not expressly permitted under these Terms',
      termination: 'We reserve the right to terminate your use of the Sites and Services or any related website for violating any of the prohibited uses.',
    },
    section8: {
      title: 'Disclaimer of Warranties; Limitation of Liability',
      content1: 'The Site and Services are provided on an "AS IS" and "AS AVAILABLE" basis. Yunda Surrogacy makes no warranties or guarantees regarding outcomes, timelines, costs, or success rates of any surrogacy or related process.',
      content2: 'To the fullest extent permitted by law, Yunda Surrogacy shall not be liable for any indirect, incidental, consequential, or special damages arising out of or related to your use of the Site or Services.',
    },
    section9: {
      title: 'Governing Law and Dispute Resolution',
      content: 'These Terms shall be governed by and construed in accordance with applicable laws as determined by Yunda Surrogacy\'s legal counsel. Any disputes shall be resolved through legally appropriate means as determined under applicable jurisdiction.',
    },
    section10: {
      title: 'Privacy Policy',
      content: 'Your use of the Site is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review it carefully to understand how we collect, use, and protect',
      link: 'your information (Privacy Policy)',
    },
    section11: {
      title: 'Contact Us',
      content: 'If you have any questions regarding these Terms or our Services, please contact us at:',
      phone: 'Phone',
      email: 'Email',
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
              {{ t.intro }}
            </p>
          </div>

          <!-- Section 1: Acceptance of Terms -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              1. {{ t.section1.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.section1.content }}</p>
            </div>
          </section>

          <!-- Section 2: Services Description -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              2. {{ t.section2.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.section2.content }}</p>
            </div>
          </section>

          <!-- Section 3: Eligibility -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              3. {{ t.section3.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.section3.content }}</p>
            </div>
          </section>

          <!-- Section 4: User Responsibilities -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              4. {{ t.section4.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.section4.content }}</p>
            </div>
          </section>

          <!-- Section 5: Privacy and Data Protection -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              5. {{ t.section5.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.section5.content }}</p>
            </div>
          </section>

          <!-- Section 6: Intellectual Property -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              6. {{ t.section6.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.section6.content }}</p>
            </div>
          </section>

          <!-- Section 7: User Submissions -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              7. {{ t.section7.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.section7.content1 }}</p>
              <p>{{ t.section7.content2 }}</p>
              <p class="mt-4 font-semibold">{{ t.section7.prohibited }}</p>
              <ul class="ml-4 list-inside list-disc space-y-2">
                <li>{{ t.section7.prohibitedItem1 }}</li>
                <li>{{ t.section7.prohibitedItem2 }}</li>
                <li>{{ t.section7.prohibitedItem3 }}</li>
                <li>{{ t.section7.prohibitedItem4 }}</li>
                <li>{{ t.section7.prohibitedItem5 }}</li>
                <li>{{ t.section7.prohibitedItem6 }}</li>
                <li>{{ t.section7.prohibitedItem7 }}</li>
                <li>{{ t.section7.prohibitedItem8 }}</li>
                <li>{{ t.section7.prohibitedItem9 }}</li>
                <li>{{ t.section7.prohibitedItem10 }}</li>
                <li>{{ t.section7.prohibitedItem11 }}</li>
              </ul>
              <p class="mt-4">{{ t.section7.termination }}</p>
            </div>
          </section>

          <!-- Section 8: Disclaimer of Warranties -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              8. {{ t.section8.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.section8.content1 }}</p>
              <p>{{ t.section8.content2 }}</p>
            </div>
          </section>

          <!-- Section 9: Governing Law -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              9. {{ t.section9.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.section9.content }}</p>
            </div>
          </section>

          <!-- Section 10: Privacy Policy -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              10. {{ t.section10.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.section10.content }}</p>
              <p>
                <NuxtLink :to="localePath('/privacy-policy')" class="text-blue-600 hover:underline">
                  {{ t.section10.link }}
                </NuxtLink>
              </p>
            </div>
          </section>

          <!-- Section 11: Contact Us -->
          <section class="mb-8">
            <h2 class="mb-4 text-2xl font-semibold text-[var(--dark-brown)]">
              11. {{ t.section11.title }}
            </h2>
            <div class="space-y-3 leading-relaxed text-gray-700">
              <p>{{ t.section11.content }}</p>
              <div class="rounded bg-gray-50 p-4">
                <p>
                  <strong>{{ t.section11.phone }}:</strong>
                  <a href="tel:+16265638656" class="text-blue-600 hover:underline">+1 (626) 563-8656</a>
                </p>
                <p>
                  <strong>{{ t.section11.email }}:</strong>
                  <a href="mailto:kaylal@yundasurrogacy.com" class="text-blue-600 hover:underline">kaylal@yundasurrogacy.com</a>
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
