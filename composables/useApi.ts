import type { IntendedParentApplicationData, SurrogateMotherApplicationData } from '~/types/api'

// 响应类型定义
export interface ApiSuccessResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface ApiErrorResponse {
  code: number
  message: string
  errors?: Array<{
    field: string
    message: string
  }>
}

// API 基础配置：优先使用 runtimeConfig.public.apiBase（本地调试留空走相对路径 /api，由 vite 代理到后台）
function getApiBase(): string {
  try {
    const config = useRuntimeConfig()
    const base = (config.public?.apiBase as string) || ''
    if (base) {
      return base.replace(/\/$/, '')
    }
  }
  catch {
    // 非 Nuxt 上下文 fallback
  }
  return ''
}

function getEndpoints() {
  const base = getApiBase()
  // base 为空时用相对路径 /api（走 vite 代理到后台）；有 base 时为完整 origin + /api
  const prefix = base ? `${base}/api` : '/api'
  return {
    SURROGATE: `${prefix}/applications`,
    PARENT: `${prefix}/applications`,
  } as const
}
// 通用的 API 错误处理
function handleApiError(error: any): never {
  console.error('API Error:', error)

  // 构造错误对象以保持与 axios 类似的响应结构
  const apiError: any = new Error('API request failed')

  // 如果是 FetchError 类型（Nuxt $fetch 的错误格式）
  if (error.data) {
    const errorData = error.data as ApiErrorResponse
    const errorMessage = errorData.errors?.map(e => e.message).join(', ') || errorData.message || '请求失败'
    apiError.message = errorMessage
    apiError.response = {
      status: error.statusCode ?? error.status,
      data: errorData,
    }
  }
  // 如果是 Response 类型（fetch API 的响应）
  else if (error.response) {
    apiError.response = error.response
    apiError.message = error.message || '网络请求失败，请稍后重试'
  }
  // 其他类型的错误
  else {
    apiError.message = error.message || '网络请求失败，请稍后重试'
  }

  throw apiError
}

// 提交代孕母申请
export async function submitSurrogateApplication(data: { application_type: string, application_data: SurrogateMotherApplicationData, status?: 'draft' | 'pending' }): Promise<ApiSuccessResponse> {
  try {
    const endpoints = getEndpoints()
    const response = await $fetch<ApiSuccessResponse>(endpoints.SURROGATE, {
      method: 'POST',
      body: {
        application_type: data.application_type,
        application_data: data.application_data,
        ...(data.status && { status: data.status }),
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response
  }
  catch (error) {
    return handleApiError(error)
  }
}

// 获取单条申请（草稿恢复）
export async function getApplicationById(id: number): Promise<ApiSuccessResponse<{ id: number, application_type: string, status: string, application_data: SurrogateMotherApplicationData, created_at: string, updated_at: string }>> {
  try {
    const endpoints = getEndpoints()
    const base = endpoints.SURROGATE.replace(/\/applications$/, '')
    const response = await $fetch<ApiSuccessResponse<{ id: number, application_type: string, status: string, application_data: SurrogateMotherApplicationData, created_at: string, updated_at: string }>>(`${base}/applications/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      /** 避免后台不可达时页面长时间卡在「恢复草稿」请求上 */
      timeout: 12_000,
    })
    return response
  }
  catch (error) {
    return handleApiError(error)
  }
}

// 更新申请（分步保存草稿）
export async function updateApplicationById(
  id: number,
  payload: { application_data?: SurrogateMotherApplicationData, status?: string },
): Promise<ApiSuccessResponse<{ id: number, status: string, application_data: unknown, updated_at: string }>> {
  try {
    const endpoints = getEndpoints()
    const base = endpoints.SURROGATE.replace(/\/applications$/, '')
    const response = await $fetch<ApiSuccessResponse<{ id: number, status: string, application_data: unknown, updated_at: string }>>(`${base}/applications/${id}`, {
      method: 'PATCH',
      body: payload,
      headers: { 'Content-Type': 'application/json' },
    })
    return response
  }
  catch (error) {
    return handleApiError(error)
  }
}

// 提交准父母申请
export async function submitParentApplication(data: { application_type: string, application_data: IntendedParentApplicationData }): Promise<ApiSuccessResponse> {
  try {
    const endpoints = getEndpoints()
    const response = await $fetch<ApiSuccessResponse>(endpoints.PARENT, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response
  }
  catch (error) {
    return handleApiError(error)
  }
}

// 导出 composable
export function useApi() {
  return {
    submitSurrogateApplication,
    submitParentApplication,
    getApplicationById,
    updateApplicationById,
  }
}
