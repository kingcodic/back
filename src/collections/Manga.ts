// src/collections/Manga.js
import type { CollectionConfig } from 'payload'

export const Manga: CollectionConfig = {
  slug: 'manga',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'genres',
      type: 'array',
      fields: [
        {
          name: 'genre',
          type: 'text',
        },
      ],
    },
    {
      name: 'chapters',
      type: 'array',
      fields: [
        {
          name: 'chapterNumber',
          type: 'number',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
        },
      ],
    },
    {
      name: 'reactions',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Like', value: 'like' },
            { label: 'Comment', value: 'comment' },
          ],
        },
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'users',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      defaultValue: 'draft',
    },
  ],
};

export default Manga;
