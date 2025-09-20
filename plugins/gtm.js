// plugins/gtm.js
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const noscript = document.createElement('noscript')
    noscript.innerHTML = `
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-W6MHCNTV"
        height="0" width="0"
        style="display:none;visibility:hidden"
      ></iframe>
    `
    document.body.appendChild(noscript)
  })
})