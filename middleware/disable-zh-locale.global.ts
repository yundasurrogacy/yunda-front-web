export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig()
  if (!config.public.hideLanguageSwitcher)
    return

  const { path, query, hash } = to
  if (path !== '/zh' && !path.startsWith('/zh/'))
    return

  const enPath = path === '/zh' ? '/' : path.slice(3) || '/'

  return navigateTo({ path: enPath, query, hash }, { redirectCode: 302 })
})
