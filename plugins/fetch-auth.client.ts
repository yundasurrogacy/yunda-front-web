// 全局 $fetch 错误处理，仅客户端生效
export default defineNuxtPlugin(() => {
  const simpleFetch = $fetch.create({
    onResponseError({ response }) {
      console.error(`[${response.status}] ${response.url}`)
      const errorData = response._data
      if (errorData) {
        const msg = typeof errorData === 'string'
          ? errorData
          : (errorData.message ?? errorData.error)
        if (msg)
          console.error('Request error:', msg)
      }
    },
  })
  globalThis.$fetch = simpleFetch
})
