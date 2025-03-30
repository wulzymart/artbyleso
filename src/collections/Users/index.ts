import { CollectionConfig } from 'payload'
import {
  isAdminOrSuperAdmin,
  isSuperAdmin,
  canCreateAdmin,
  canManageAllUsers,
  isSuperAdminField,
} from '@/access/roleBasedAccess'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['email', 'name', 'role'],
  },
  defaultPopulate: {
    name: true,
    email: true,
    role: true,
  },
  access: {
    // Only admins can read the users collection
    read: isAdminOrSuperAdmin,
    // Super admins can update any user
    update: canManageAllUsers,
    // Only admins can create other admin users (handled in hooks)
    create: canCreateAdmin,
    // Only super admins can delete users
    delete: isSuperAdmin,
  },
  endpoints: [
    // Custom endpoint to get available roles based on current user
    {
      path: '/roles',
      method: 'get',
      handler: async (req) => {
        // Default role options (for admin users)
        const roles = [{ label: 'Admin', value: 'admin' }]

        // If user is super-admin, add the super-admin option
        if (req.user?.role === 'super-admin') {
          roles.unshift({ label: 'Super Admin', value: 'super-admin' })
        }
        return Response.json(roles)
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        // Ensure that only super admins can create super-admin users
        if (data.role === 'super-admin' && req.user?.role !== 'super-admin') {
          data.role = 'admin' // Downgrade to admin if not a super admin
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        { label: 'Admin', value: 'admin' },
      ],
      admin: {
        components: {
          Field: {
            path: 'src/collections/Users/client-custom-fields#CustomSelectFieldClient',
            clientProps: {
              options: [
                {
                  label: 'Super Admin',
                  value: 'super-admin',
                },
                { label: 'Admin', value: 'admin' },
              ],
            },
          },
        },
      },
      defaultValue: 'admin',
      access: {
        // Only super admins can change the role
        update: isSuperAdminField,
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    // Add any other fields specific to admin users
  ],
}

export default Users
