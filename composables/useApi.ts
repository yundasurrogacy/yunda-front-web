import type { SurrogateRequest, ParentRequest, ApiSuccessResponse, ApiErrorResponse } from '~/types/api'

// API 基础配置
const API_BASE_URL = 'http://yundasurrogacy.com/x-project/api'

// API 端点
const API_ENDPOINTS = {
  SURROGATE: `${API_BASE_URL}/surrogates`,
  PARENT: `${API_BASE_URL}/parents`
} as const

// 通用的 API 错误处理
const handleApiError = (error: any): never => {
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
export const submitSurrogateApplication = async (data: SurrogateRequest): Promise<ApiSuccessResponse> => {
  try {
    const response = await $fetch<ApiSuccessResponse>(API_ENDPOINTS.SURROGATE, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    return response
  } catch (error) {
    return handleApiError(error)
  }
}

// 提交准父母申请
export const submitParentApplication = async (data: ParentRequest): Promise<ApiSuccessResponse> => {
  try {
    const response = await $fetch<ApiSuccessResponse>(API_ENDPOINTS.PARENT, {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    return response
  } catch (error) {
    return handleApiError(error)
  }
}

// 导出 composable
export const useApi = () => {
  return {
    submitSurrogateApplication,
    submitParentApplication
  }
}