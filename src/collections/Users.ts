// src/collections/Users.js
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Enables built-in auth
  admin: {
    useAsTitle: 'username',
  },
  fields: [
    {
      name: 'username',
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media', // Media collection for image uploads
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
      ],
      defaultValue: 'user',
      required: true,
    },
    {
      name: 'notifications',
      type: 'array',
      fields: [
        {
          name: 'content',
          type: 'text',
          required: true,
        },
        {
          name: 'read',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
  ],
};

export default Users;
