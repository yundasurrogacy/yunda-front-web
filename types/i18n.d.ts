import '@nuxtjs/i18n'

declare module '@nuxtjs/i18n' {
  interface MessagesSchema {
    common: {
      home: string
      email: string
      tasks: string
      settings: string
      login: string
      register: string
      logout: string
      search: string
      save: string
      cancel: string
      delete: string
      edit: string
      loading: string
      noResults: string
    }
    auth: {
      login: string
      register: string
      forgotPassword: string
      email: string
      password: string
      confirmPassword: string
      rememberMe: string
      dontHaveAccount: string
      alreadyHaveAccount: string
    }
    settings: {
      profile: string
      account: string
      appearance: string
      notifications: string
      language: string
      theme: string
      dark: string
      light: string
      system: string
    }
    tasks: {
      pageDescription: string
      status: string
      title: string
      priority: string
      dueDate: string
      actions: string
      complete: string
      inProgress: string
      todo: string
      high: string
      medium: string
      low: string
    }
  }
}
