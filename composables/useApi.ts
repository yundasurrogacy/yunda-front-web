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

// API 基础配置
// const API_BASE_URL = 'https://admin.yundasurrogacy.com/x-project/api'
// const API_BASE_URL = 'https://hasura-yundasurrogacy-1.weweknow.com/v1/graphql'
const API_BASE_URL = 'https://yunda-admin-system.yundasurrogacy.com/api'
// API 端点
// const API_ENDPOINTS = {
//   SURROGATE: `${API_BASE_URL}/surrogates`,
//   PARENT: `${API_BASE_URL}/parents`
// } as const
const API_ENDPOINTS = {
  SURROGATE: `${API_BASE_URL}/applications`,
  PARENT: `${API_BASE_URL}/applications`,
} as const
// 通用的 API 错误处理
function handleApiError(error: any): never {
  console.error('API Error:', error)

  // 如果是 FetchError 类型
  if (error.data) {
    const errorData = error.data as ApiErrorResponse
    const errorMessage = errorData.errors?.map(e => e.message).join(', ') || errorData.message || '请求失败'
    throw new Error(errorMessage)
  }

  // 其他类型的错误
  throw new Error(error.message || '网络请求失败，请稍后重试')
}

// 提交代孕母申请
export async function submitSurrogateApplication(data: { application_type: string, application_data: SurrogateMotherApplicationData }): Promise<ApiSuccessResponse> {
  try {
    const response = await $fetch<ApiSuccessResponse>(API_ENDPOINTS.SURROGATE, {
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

// 提交准父母申请
export async function submitParentApplication(data: { application_type: string, application_data: IntendedParentApplicationData }): Promise<ApiSuccessResponse> {
  try {
    const response = await $fetch<ApiSuccessResponse>(API_ENDPOINTS.PARENT, {
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
  }
}
