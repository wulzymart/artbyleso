import type { Access } from 'payload'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
export const authenticated: Access = () => {
  return {
    _status: {
      equals: 'published',
    },
  }
}
