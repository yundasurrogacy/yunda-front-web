export default defineEventHandler((event) => {
  const path = event.path.split('?')[0]
  const decodedPath = decodeURI(path)

  const gonePaths = new Set([
    '/about)',
    '/about%EF%BC%89',
    '/about）',
    '/be-surrogate/success',
    '/zh/be-surrogate/success',
  ])

  if (gonePaths.has(path) || gonePaths.has(decodedPath)) {
    setResponseStatus(event, 410, 'Gone')
    setHeader(event, 'content-type', 'text/plain; charset=utf-8')
    return 'Gone'
  }
})
