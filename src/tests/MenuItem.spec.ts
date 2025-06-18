import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'

import MenuItem from '../components/MenuItem.vue'

test('component mounts', () => {
  expect(MenuItem).toBeTruthy()

  const wrapper = mount(MenuItem, {
    props: {
      item: {
        menu_item_id: 1,
        menu_item_name: 'test',
        description: 'test',
        calories: 100,
        ingredient_1: 'test',
        ingredient_2: 'test',
        ingredient_3: 'test',
        price: 10,
        menu_section: 'appetizers',
        spicy_level: 'mild',
        chef_special: true,
        vegetarian: true,
        food_image_url: 'https://picsum.photos/500/500/?random=',
        available_from: '01/01/2025',
      },
    },
  })

  expect(wrapper.text()).toContain('Test Item')
})
