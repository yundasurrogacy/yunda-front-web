/**
 * be-surrogate-v2 表单 localStorage 持久化
 * 刷新页面后恢复：表单数据、草稿 id、当前步骤
 */
const STORAGE_KEY = 'be-surrogate-v2-draft'

export interface BeSurrogateV2Draft {
  form: Record<string, unknown>
  applicationId: number | null
  currentStep: number
  updatedAt: string
}

export function useBeSurrogateV2Storage() {
  function save(form: Record<string, unknown>, applicationId: number | null, currentStep: number) {
    if (typeof window === 'undefined')
      return
    try {
      const data: BeSurrogateV2Draft = {
        form: JSON.parse(JSON.stringify(form)),
        applicationId,
        currentStep,
        updatedAt: new Date().toISOString(),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
    catch (e) {
      console.warn('[be-surrogate-v2] localStorage save failed:', e)
    }
  }

  function load(): BeSurrogateV2Draft | null {
    if (typeof window === 'undefined')
      return null
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw)
        return null
      return JSON.parse(raw) as BeSurrogateV2Draft
    }
    catch {
      return null
    }
  }

  function clear() {
    if (typeof window === 'undefined')
      return
    try {
      localStorage.removeItem(STORAGE_KEY)
    }
    catch {
      // ignore
    }
  }

  return { save, load, clear }
}
