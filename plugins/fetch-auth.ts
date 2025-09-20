export default defineNuxtPlugin(() => {
  // 创建简单的fetch实例，仅用于处理错误
  if (import.meta.client) {
    const simpleFetch = $fetch.create({
      onResponseError({ response }) {
        console.error(`[${response.status}] ${response.url}`)
        
        // 简单的错误处理
        const errorData = response._data
        if (errorData) {
          let errorMessage = ''
          
          if (typeof errorData === 'string') {
            errorMessage = errorData
          } else if (errorData.message) {
            errorMessage = errorData.message
          } else if (errorData.error) {
            errorMessage = errorData.error
          }
          
          if (errorMessage) {
            console.error('Request error:', errorMessage)
          }
        }
      }
    })

    // 重写全局的 $fetch
    globalThis.$fetch = simpleFetch
  }
})
