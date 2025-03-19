'use client'
import type { SelectFieldClientComponent } from 'payload'

import { SelectField, useAuth } from '@payloadcms/ui'
import React from 'react'

export const CustomSelectFieldClient: SelectFieldClientComponent = (props) => {
  const { user } = useAuth()
  const { field, ...rest } = props
  if (user?.role !== 'super-admin') {
    field.options = field.options.filter((option) => (option as any).value !== 'super-admin')
  }
  // Return the Select field with filtered options
  return <SelectField field={field} {...rest} />
}
