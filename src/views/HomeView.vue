<template>
  <section class="daily-special">
    <h2>Daily Specials</h2>
    <Carousel :value="dailyItems" :numVisible="1" :numScroll="1" :circular="true" :showNavigators="false">
      <template #item="slotProps">
        <div class="daily-special-item">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            :alt="slotProps.data.menu_item_name" />
          <div class="daily-special-item-info">
            <h3>
              {{ slotProps.data.menu_item_name.split('')[0].toUpperCase() + slotProps.data.menu_item_name.slice(1) }}
            </h3>
            <p>{{ slotProps.data.description.substring(0, 250) }}...</p>
          </div>
        </div>
      </template>
    </Carousel>
  </section>
  <section class="recommended-items">
    <h2>Recommended</h2>
    <p>
      <span>
        <FontAwesomeIcon icon="fa-solid fa-leaf" color="var(--p-green-500)" /> &nbsp;Vegetarian
      </span>
      <span>
        <FontAwesomeIcon icon="fa-solid fa-pepper-hot" color="var(--p-amber-700)" /> &nbsp;Spicy
      </span>
    </p>
    <div class="recommended-items-wrapper">
      <MenuItem v-for="item in recommendedItems" :key="item.menu_item_id" :item="item" />
    </div>
  </section>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useAppStore } from '@/stores/app';
import type { FoodItems } from '@/utils/globalTypes';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Carousel from 'primevue/carousel';
import MenuItem from '@/components/MenuItem.vue';

onMounted(async () => {
  dailyItems.value = getDailySpecial(appStore.items)
  recommendedItems.value = getRecommendedItems(appStore.items)
})

const appStore = useAppStore();
const dailyItems = ref<FoodItems[]>([])
const recommendedItems = ref<FoodItems[]>([])

function getDailySpecial(items: FoodItems[]): FoodItems[] {
  const today = new Date();
  const dailyItems = items.filter((item) => {
    const itemDate = new Date(item.available_from);
    return (itemDate.getDate() >= today.getDate() && item.chef_special);
  }).slice(0, 3)

  dailyItems.sort((a, b) => {
    const aDate = new Date(a.available_from);
    const bDate = new Date(b.available_from);
    return aDate.getTime() - bDate.getTime();
  })

  return dailyItems
}

function getRecommendedItems(items: FoodItems[]): FoodItems[] {
  const recommendedItems = items.filter((item) => {
    return item.chef_special
  })
  return recommendedItems.slice(0, 7)
}

watch(appStore, () => {
  dailyItems.value = getDailySpecial(appStore.items)
  recommendedItems.value = getRecommendedItems(appStore.items)
})

</script>
<style scoped>
h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  color: var(--p-amber-700);
}

.daily-special-item {
  position: relative;
}

.daily-special-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
}

.daily-special-item-info {
  padding: 3rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--p-amber-100);
  background-color: rgba(0, 0, 0, 0.25);
}

.daily-special-item-info h3 {
  font-size: 1.5rem;
  font-weight: 900;
  margin: 0.5rem 0;
}

.recommended-items {
  margin: 0 2rem;
}

.recommended-items p {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.8rem;
  margin-bottom: 2em;
}

.recommended-items-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

@media screen and (min-width: 1024px) {

  .daily-special {
    width: 90%;
    margin: 2em auto;
  }

  .daily-special h2 {
    display: none;
  }

  .daily-special-item,
  .daily-special-item-info {
    height: 50vh;
  }

  .daily-special-item-info {
    padding: 2rem;
    align-items: center;
    justify-content: center;
  }

  .daily-special-item-info h3 {
    font-size: 2rem;
  }

  .daily-special-item-info p {
    width: 50%;
    font-size: 1.2rem;
  }
}
</style>