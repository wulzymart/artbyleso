import type { SelectFieldServerComponent } from 'payload'
import type React from 'react'

import { SelectField } from '@payloadcms/ui'

export const CustomSelectFieldServer: SelectFieldServerComponent = ({
  clientField,
  path,
  schemaPath,
  permissions,
  user,
}) => {
  if (user.role !== 'super-admin') {
    console.log('called')

    clientField.options = clientField.options.filter((option) => {
      console.log('filtered')

      return (option as any).value !== 'super-admin'
    })
  }
  return (
    <SelectField
      field={clientField}
      path={path}
      schemaPath={schemaPath}
      permissions={permissions}
    />
  )
}
