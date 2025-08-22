// 表单验证规则
export const useFormValidation = () => {
  // 邮箱验证
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // 日期验证 - 不能是未来日期
  const validateBirthDate = (date: string): boolean => {
    if (!date) return false
    const birthDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return birthDate <= today
  }

  // 电话号码验证 - 必须包含国家代码
  const validatePhoneWithCountryCode = (phone: string): boolean => {
    // 检查是否以+开头，后面跟数字
    return /^\+\d{7,15}$/.test(phone)
  }

  // 邮编验证 - 美国邮编格式
  const validateZipCode = (zipCode: string): boolean => {
    // 支持 5 位数或 5+4 格式
    return /^\d{5}(-\d{4})?$/.test(zipCode)
  }

  // 验证准父母申请
  const validateParentForm = (form: any): string[] => {
    const errors: string[] = []

    // 必填字段验证
    if (!form.firstName?.trim()) errors.push('First name is required')
    if (!form.lastName?.trim()) errors.push('Last name is required')
    if (!form.email) errors.push('Email is required')
    else if (!validateEmail(form.email)) errors.push('Please enter a valid email address')
    
    if (!form.dateOfBirth) errors.push('Date of birth is required')
    else if (!validateBirthDate(form.dateOfBirth)) errors.push('Date of birth cannot be in the future')
    
    if (!form.phoneNumber?.trim()) errors.push('Phone number is required')
    if (!form.city?.trim()) errors.push('City is required')
    if (!form.country) errors.push('Country is required')
    if (!form.stateProvince) errors.push('State/Province is required')
    
    // 身份信息验证
    if (!form.genderIdentity) errors.push('Gender identity is required')
    if (!form.sexualOrientation) errors.push('Sexual orientation is required')
    
    // 语言验证 - 至少选择一种
    const hasLanguage = Object.entries(form.languages || {}).some(([key, value]) => value && key !== 'otherText')
    if (!hasLanguage) errors.push('Please select at least one primary language')
    
    // 项目意向验证
    if (!form.programInterests) errors.push('Please select which services you need')
    if (!form.journeyStartTiming) errors.push('Please select when you hope to begin')
    if (!form.desiredChildrenCount) errors.push('Please select how many children you hope to have')
    
    // 同意条款验证
    if (!form.consentAgreement) errors.push('You must agree to the terms to submit')

    // fullLegalName 长度验证
    const fullName = `${form.firstName} ${form.lastName}`.trim()
    if (fullName.length > 100) errors.push('Full name cannot exceed 100 characters')

    return errors
  }

  // 验证代孕母申请
  const validateSurrogateForm = (form: any): string[] => {
    const errors: string[] = []

    // 基本信息验证
    if (!form.firstName?.trim()) errors.push('First name is required')
    if (!form.lastName?.trim()) errors.push('Last name is required')
    if (!form.email) errors.push('Email is required')
    else if (!validateEmail(form.email)) errors.push('Please enter a valid email address')
    
    if (!form.birthDate) errors.push('Date of birth is required')
    else if (!validateBirthDate(form.birthDate)) errors.push('Date of birth cannot be in the future')
    
    if (!form.mobilePhone?.trim()) errors.push('Mobile phone is required')
    if (!form.citizenshipStatus) errors.push('Citizenship status is required')
    if (!form.city?.trim()) errors.push('City is required')
    if (!form.state) errors.push('State is required')
    if (!form.zipCode) errors.push('Zip code is required')
    else if (!validateZipCode(form.zipCode)) errors.push('Please enter a valid zip code')
    
    if (!form.occupation?.trim()) errors.push('Occupation is required')
    
    // 联系来源验证
    if (!form.contactSource) errors.push('Please select how you heard about us')
    
    // 代孕经验验证
    if (!form.isFormerSurrogate) errors.push('Please indicate if you have been a surrogate before')
    
    // 婚姻状况验证
    if (!form.maritalStatus) errors.push('Marital status is required')
    
    // 教育背景验证
    if (!form.hasHighSchoolDiploma) errors.push('Please indicate if you have a high school diploma')
    
    // 收入验证
    if (!form.householdIncome) errors.push('Household income is required')
    
    // 怀孕历史验证
    if (!form.pregnancyHistory.hasGivenBirth) errors.push('Please indicate if you have given birth before')
    if (!form.pregnancyHistory.isPregnant) errors.push('Please indicate if you are currently pregnant')
    if (!form.pregnancyHistory.isBreastfeeding) errors.push('Please indicate if you are currently breastfeeding')
    if (!form.pregnancyHistory.hasStillbirth) errors.push('Please indicate stillbirth history')
    if (!form.pregnancyHistory.height) errors.push('Height is required')
    if (!form.pregnancyHistory.weightPounds) errors.push('Weight is required')
    
    // 健康历史验证
    if (!form.healthHistory.isTakingMeds) errors.push('Please indicate if you are taking medications')
    
    // 财务法律验证
    if (!form.financialLegal.hasCriminalRecord) errors.push('Please indicate criminal record status')
    if (!form.financialLegal.hasLegalProceedings) errors.push('Please indicate legal proceedings status')
    if (!form.financialLegal.hasCPSHistory) errors.push('Please indicate CPS history')
    
    // 同意条款验证
    if (!form.finalConsent) errors.push('You must agree to the terms to submit')

    // 电话号码格式验证
    const fullPhone = form.countryCode + form.mobilePhone
    if (form.mobilePhone && !validatePhoneWithCountryCode(fullPhone)) {
      errors.push('Phone number must include country code (e.g., +1234567890)')
    }

    return errors
  }

  return {
    validateEmail,
    validateBirthDate,
    validatePhoneWithCountryCode,
    validateZipCode,
    validateParentForm,
    validateSurrogateForm
  }
}