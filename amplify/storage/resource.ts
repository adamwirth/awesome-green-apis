import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'theBucket',
  isDefault: true
});
