<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'

const { locale } = useI18n()
const route = useRoute()

// 用于强制重新渲染 Calendly widget
const calendlyKey = ref(0)

// 从 URL 参数获取用户信息（用于预填预约表单）
const name = computed(() => route.query.name as string || '')
const email = computed(() => route.query.email as string || '')

// 本地翻译内容
const translations = {
  zh: {
    meta: {
      title: '感谢提交 - 孕达代孕',
      description: '感谢您提交申请，请选择一个方便的时间进行咨询。',
    },
    title: '感谢您的提交！',
    message: '已收到您的信息！为了更快给您定制方案，请选择一个方便的时间（Step 2）',
    bookingTitle: '选择咨询时间',
    bookingDescription: '请选择一个方便的时间，我们的团队将为您提供专业的咨询服务。',
    note: '预约规则：最少提前 24 小时预约，每个预约前后预留 10-15 分钟缓冲时间。',
  },
  en: {
    meta: {
      title: 'Thank You - Yunda Surrogacy',
      description: 'Thank you for your submission. Please select a convenient time for consultation.',
    },
    title: 'Thank You for Your Submission!',
    message: 'We have received your information! To provide you with a customized plan faster, please select a convenient time (Step 2)',
    bookingTitle: 'Select Consultation Time',
    bookingDescription: 'Please select a convenient time, and our team will provide you with professional consultation services.',
    note: 'Booking rules: Minimum 24 hours advance booking required, 10-15 minutes buffer time before and after each appointment.',
  },
}

// 根据当前语言获取翻译
const content = computed(() => {
  const lang = locale.value === 'zh' ? 'zh' : 'en'
  return translations[lang]
})

useHead({
  title: content.value.meta.title,
  meta: [
    {
      name: 'description',
      content: content.value.meta.description,
    },
    {
      name: 'robots',
      content: 'noindex,follow',
    },
  ],
  script: [
    {
      src: 'https://assets.calendly.com/assets/external/widget.js',
      async: true,
    },
  ],
})

// Calendly 配置
// 如何获取实际的 Calendly 链接：
// 1. 登录 Calendly (https://calendly.com)
// 2. 创建活动类型（Event Type），例如 "Consultation"
// 3. 在活动设置中找到分享链接，格式通常为：https://calendly.com/你的用户名/活动名称
// 4. 将下面的 baseUrl 替换为您的实际链接
// 5. 确保在 Calendly 活动设置中启用了 "Pre-fill invitee information" 以支持预填功能
const calendlyUrl = computed(() => {
  // 构建 Calendly URL，预填姓名和邮箱
  // 注意：Calendly 不支持通过 URL 参数动态设置语言
  // 解决方案：在 Calendly 后台为中文和英文分别创建不同的事件类型
  // 然后根据当前语言使用不同的链接
  // 例如：
  // - 中文：https://calendly.com/kaylal-yundasurrogacy/30min-zh
  // - 英文：https://calendly.com/kaylal-yundasurrogacy/30min
  const baseUrl = locale.value === 'zh'
    ? 'https://calendly.com/kaylal-yundasurrogacy/30min'
    : 'https://calendly.com/kaylal-yundasurrogacy/30min'
  const params = new URLSearchParams()

  // 预填用户信息
  if (name.value) {
    params.append('name', name.value)
  }
  if (email.value) {
    params.append('email', email.value)
  }

  const queryString = params.toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
})

// 初始化 Calendly widget
function initCalendly() {
  // 确保 Calendly 脚本已加载
  if (typeof window !== 'undefined' && (window as any).Calendly) {
    const widget = document.querySelector('.calendly-inline-widget')
    if (widget && !widget.querySelector('iframe')) {
      // 如果 widget 存在但没有 iframe，重新初始化
      const config: any = {
        url: calendlyUrl.value,
        parentElement: widget,
      }

      if ((window as any).Calendly.initInlineWidget) {
        try {
          ;(window as any).Calendly.initInlineWidget(config)
        }
        catch (error) {
          console.warn('Calendly initialization error:', error)
        }
      }
    }
  }
}

// 调整 Calendly 高度
function adjustCalendlyHeight() {
  const widget = document.querySelector('.calendly-inline-widget')
  if (widget) {
    const iframe = widget.querySelector('iframe') as HTMLIFrameElement
    if (iframe) {
      // 根据屏幕尺寸设置高度
      const isMobile = window.innerWidth < 768
      const isDesktop = window.innerWidth >= 1024
      if (isMobile) {
        iframe.style.height = '850px'
      }
      else if (isDesktop) {
        iframe.style.height = '950px'
      }
      else {
        iframe.style.height = '900px'
      }
    }
  }
}

// 监听语言变化，重新初始化 Calendly
watch(locale, () => {
  // 先清除现有的 widget
  const widget = document.querySelector('.calendly-inline-widget')
  if (widget) {
    widget.innerHTML = ''
  }

  // 增加 key 值以强制重新渲染
  calendlyKey.value++

  // 等待 DOM 更新后重新初始化
  nextTick(() => {
    // 等待 Calendly 脚本加载完成
    const checkAndInit = () => {
      if (typeof window !== 'undefined' && (window as any).Calendly) {
        const newWidget = document.querySelector('.calendly-inline-widget')
        if (newWidget) {
          const config: any = {
            url: calendlyUrl.value,
            parentElement: newWidget,
          }
          // 尝试通过配置设置语言（如果 API 支持）
          try {
            ;(window as any).Calendly.initInlineWidget(config)
          }
          catch (error) {
            console.warn('Calendly initialization error:', error)
          }
          setTimeout(adjustCalendlyHeight, 500)
        }
      }
      else {
        setTimeout(checkAndInit, 100)
      }
    }
    checkAndInit()
  })
})

// 动态调整 Calendly 高度以避免滚动条
onMounted(() => {
  // 初始化 Calendly
  initCalendly()

  // 多次尝试调整高度，确保 Calendly 已加载
  setTimeout(adjustCalendlyHeight, 500)
  setTimeout(adjustCalendlyHeight, 1500)
  setTimeout(adjustCalendlyHeight, 3000)
})
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)]">
    <AppHeader />

    <!-- Header -->
    <div class="relative h-30 w-full flex items-center justify-center bg-[var(--yunda-bark)] lg:h-80">
      <h1 class="text-center font-display text-[32px] text-[var(--yunda-petal)] font-semibold italic leading-[1.1] lg:text-[50px]">
        {{ content.title }}
      </h1>
    </div>

    <!-- Main Content -->
    <div class="relative mx-auto mt-6 max-w-1200px px-4 pb-12 lg:mt-8 lg:px-6">
      <!-- Thank You Message -->
      <div class="mb-8 text-center lg:mb-10">
        <div class="mx-auto max-w-966px">
          <p class="mb-4 font-sans text-base text-[var(--yunda-bark)] font-bold leading-[1.75] lg:text-xl" style="font-family: var(--font-text)">
            {{ content.message }}
          </p>
        </div>
      </div>

      <!-- Booking Section -->
      <div class="mx-auto max-w-966px">
        <div class="mb-8 rounded-5 from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b p-6 shadow-black/20 shadow-xl lg:p-8">
          <h2 class="mb-3 font-sans text-[20px] text-[var(--yunda-bark)] font-bold lg:mb-4 lg:text-[24px]" style="font-family: var(--font-text)">
            {{ content.bookingTitle }}
          </h2>
          <p class="mb-4 font-sans text-base text-[var(--yunda-bark)] leading-[1.75] lg:mb-5 lg:text-[17px]" style="font-family: var(--font-text)">
            {{ content.bookingDescription }}
          </p>
          <p class="mb-6 text-sm text-[var(--yunda-bark)]/80 italic" style="font-family: var(--font-text)">
            {{ content.note }}
          </p>

          <!-- Calendly Inline Widget -->
          <div
            :key="calendlyKey"
            class="calendly-inline-widget"
            :data-url="calendlyUrl"
          />
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<style scoped>
/* Calendly 样式 - 增加高度以避免内部滚动条 */
.calendly-inline-widget {
  width: 100%;
  min-width: 320px;
  height: 900px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .calendly-inline-widget {
    height: 850px;
  }
}

@media (min-width: 1024px) {
  .calendly-inline-widget {
    height: 950px;
  }
}

/* 确保 Calendly iframe 填满容器 */
.calendly-inline-widget iframe {
  width: 100% !important;
  height: 100% !important;
  border: none !important;
  display: block !important;
}

/* 尝试隐藏 iframe 内部的滚动条 */
.calendly-inline-widget :deep(iframe) {
  overflow: hidden !important;
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}

/* 隐藏滚动条（Webkit 浏览器） */
.calendly-inline-widget :deep(iframe::-webkit-scrollbar) {
  display: none !important;
}
</style>
