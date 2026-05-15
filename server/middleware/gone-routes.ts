export default defineEventHandler((event) => {
  const path = event.path.split('?')[0]
  const decodedPath = decodeURI(path)

  if (path === '/about)' || path === '/about%EF%BC%89' || decodedPath === '/about）') {
    setResponseStatus(event, 410, 'Gone')
    setHeader(event, 'content-type', 'text/plain; charset=utf-8')
    return 'Gone'
  }
})
