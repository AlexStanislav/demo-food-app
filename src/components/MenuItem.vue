<template>
    <section class="item">
        <div class="item__img-wrapper">
            <img class="item__img" :src="`https://picsum.photos/600/600/?random=${item.menu_item_id}`"
                :alt="item.menu_item_name" />
        </div>
        <div class="item__img-loader">
            <ProgressSpinner stroke-width="4" />
        </div>
        <div class="item__info">
            <h3 class="item__name">
                {{ item.menu_item_name.split('')[0].toUpperCase() + item.menu_item_name.slice(1) }}
                <font-awesome-icon v-if="item.vegetarian" icon="fa-solid fa-leaf" color="var(--p-green-500)" size="lg"
                    style="margin-top: 0.25rem;" />
            </h3>
            <div class="item__spice-rating">
                <font-awesome-icon v-for="i in 3" :key="i" icon="fa-solid fa-pepper-hot"
                    :color="i <= getSpiceRating(item) ? 'var(--p-amber-700)' : 'var(--p-amber-400)'"
                    style="font-size: 0.8rem;" />
            </div>
            <div class="item__ingredients">
                <h4 class="item__ingredients-title">Ingredients</h4>
                <ul class="item__ingredients-list">
                    <li v-for="(ingredient, index) in getIngredients(item)" :key="index">
                        {{
                            ingredient.split('')[0].toUpperCase() + ingredient.slice(1) }}{{ index <
                            getIngredients(item).length - 1 ? ',&nbsp;' : '' }}</li>
                </ul>
            </div>
            <p class="item__calories">{{ item.calories }} kcal</p>
            <InputGroup>
                <InputGroupAddon addon="price">$</InputGroupAddon>
                <InputText :value="item.price" readonly />
            </InputGroup>
            <p class="item__section">{{ item.menu_section }}</p>
        </div>
    </section>
</template>
<script setup lang="ts">
import type { FoodItems } from '@/utils/globalTypes'
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';

defineProps({
    item: {
        type: Object as () => FoodItems,
        required: true
    },
})

function getSpiceRating(item: FoodItems): number {
    const spiceRating = item.spicy_level
    if (spiceRating === 'mild') {
        return 1
    }
    if (spiceRating === 'medium') {
        return 2
    }
    if (spiceRating === 'hot') {
        return 3
    }

    return 0
}

function getIngredients(item: FoodItems): string[] {
    const ingredients = [item.ingredient_1, item.ingredient_2, item.ingredient_3].filter(Boolean)
    return ingredients
}

</script>
<style scoped>
.item {
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 0.5rem;
    position: relative;
}

.item__img-wrapper {
    width: 350px;
    height: 350px;
    position: relative;
}

.item__img {
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
}

.item__img-loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
}



.item__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
}

.item__name {
    margin: 0.5rem 0 0 0;
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--p-amber-700);
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.fa-leaf {
    font-size: 0.9rem;
}

.item__spice-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.item__ingredients {
    margin-top: 0.75rem;
}

.item__ingredients-title {
    margin: 0.5rem 0 0 0;
    font-size: 1.1rem;
    color: var(--p-amber-700);
}

.item__ingredients-list {
    margin: 0.5rem 0 0 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    font-size: 0.8em;
    color: var(--p-gray-600);
    font-style: italic;
}

.item__calories {
    margin: 0.5rem 0 0 0;
    color: var(--p-amber-600);
    font-style: italic;
    font-weight: bold;
    position: absolute;
    right: 1rem;
    top: 0.5rem;
}

.item__section {
    margin: 0.5rem 0 0 0;
    color: var(--p-amber-600);
    font-weight: bold;
    font-size: 1.5em;
    font-style: italic;
    position: absolute;
    right: 1rem;
    bottom: 0.5rem;
    font-family: 'Dancing Script', cursive;
    text-transform: capitalize;
}

.p-inputgroup {
    width: 40%;
}

.p-inputgroupaddon {
    background: var(--p-amber-500);
    color: #fff;
}
</style>