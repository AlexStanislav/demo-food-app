<template>
    <section class="menu">
        <nav class="menu__nav">
            <h2 class="nav__title">Filters</h2>
            <section class="menu__search">
                <InputGroup>
                    <InputGroupAddon>
                        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                    </InputGroupAddon>
                    <AutoComplete v-model="filters.searchTerm" :suggestions="suggestions" @complete="completeMethod"
                        option-label="menu_item_name" placeholder="Search by name" @option-select="selectItem" />
                </InputGroup>
                <label class="vegetarian-check" for="vegetarian">
                    <Checkbox id="vegetarian" v-model="filters.showVegetarian" binary />
                    Show only vegetarian items
                </label>

            </section>

            <section class="filters__wrapper">

                <section class="spiciness">
                    <h3 class="filters__title">Spiciness</h3>
                    <ul class="spiciness__list">
                        <li class="spiciness__item" v-for="spiciness in 3" :key="spiciness">
                            <RadioButton v-model="filters.spiciness" :value="spiciness" />
                            <i class="pepper" v-for="index in spiciness" :key="index"></i>
                        </li>
                        <i v-if="filters.spiciness > 0" @click="resetFilter()" title="Reset filter"
                            class="reset-filter pi pi-filter-slash"></i>
                    </ul>
                </section>

                <section class="ingredients">
                    <h3 class="filters__title">Ingredients</h3>
                    <InputGroup>
                        <InputGroupAddon>
                            <font-awesome-icon icon="fa-solid fa-utensils" />
                        </InputGroupAddon>
                        <MultiSelect display="chip" v-model="filters.ingredients" :options="ingredients"
                            placeholder="Filter by ingredients" />
                    </InputGroup>
                </section>

                <section class="calories">
                    <h3 class="filters__title">Calories</h3>
                    <div class="range-inputs">
                        <InputNumber v-model="filters.calories[0]" placeholder="Min" />
                        <InputNumber v-model="filters.calories[1]" placeholder="Max" />
                    </div>
                    <Slider v-model="filters.calories" :min="0" :max="2000" :step="50" range />
                </section>

                <section class="price">
                    <h3 class="filters__title">Price</h3>
                    <div class="range-inputs">
                        <InputGroup>
                            <InputNumber v-model="filters.price[0]" placeholder="Min" />
                            <InputGroupAddon addon="price">$</InputGroupAddon>
                            <InputNumber v-model="filters.price[1]" placeholder="Max" />
                        </InputGroup>
                    </div>
                    <Slider v-model="filters.price" :min="0" :max="100" :step="10" range />
                </section>
            </section>
        </nav>
        <section class="menu__items">
            <h3 class="no-results" v-if="menuItems.length === 0">No items found</h3>
            <MenuItem v-for="item in menuItems" :key="item.menu_item_id" :item="item" />
        </section>
    </section>
    <Paginator :rows="rows" :totalRecords="totalRecords" @page="handlePageChange" />
</template>
<script setup lang="ts">
import { onMounted, watch, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/app';
import type { FoodItems } from '@/utils/globalTypes';
import Paginator from 'primevue/paginator';
import MenuItem from '@/components/MenuItem.vue';
import Checkbox from 'primevue/checkbox';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import AutoComplete from 'primevue/autocomplete';
import MultiSelect from 'primevue/multiselect';
import RadioButton from 'primevue/radiobutton';
import Slider from 'primevue/slider';
import InputNumber from 'primevue/inputnumber';


const route = useRoute();
const appStore = useAppStore();
const menuItems = ref<FoodItems[]>([])
const startIndex = ref(0)
const rows = ref(8)
const totalRecords = ref(0)

const filters = ref({
    showVegetarian: false,
    searchTerm: '',
    spiciness: 0,
    ingredients: [],
    calories: [0, 2000],
    price: [0, 100]
})

const spiceDict: { [key: number]: string } = {
    1: 'mild',
    2: 'medium',
    3: 'hot'
}

const ingredients = computed(() => {
    const items = getMenuItemsByCategory()
    const ingredients: string[] = []
    items.forEach((item) => {
        ingredients.push(item.ingredient_1)
        ingredients.push(item.ingredient_2)
        ingredients.push(item.ingredient_3)
    })
    return [...new Set(ingredients)]
})
const suggestions = ref<FoodItems[]>([])

function resetFilter() {
    filters.value.showVegetarian = false
    filters.value.searchTerm = ''
    filters.value.spiciness = 0
    filters.value.ingredients = []
    filters.value.calories = [0, 2000]

    filterItems()
}

function completeMethod(event: { query: string }) {
    suggestions.value = getMenuItemsByCategory().filter((item) => {
        return item.menu_item_name.toLowerCase().includes(event.query.toLowerCase())
    })
}

function selectItem(item: { value: FoodItems }) {
    filters.value.searchTerm = item.value.menu_item_name
}

onMounted(async () => {
    filterItems()
})

function getMenuItemsByCategory(): FoodItems[] {
    const items = appStore.items
    return items.filter((item) => {
        return item.menu_section.replace(" ", "") === route.params.category
    })
}

function filterItems(): void {
    const filteredItems = getMenuItemsByCategory().filter((item) => {
        console.log(item)
        const vegetarianMatch = filters.value.showVegetarian ? item.vegetarian : true
        const searchTermMatch = item.menu_item_name.toLowerCase().includes(filters.value.searchTerm.toLowerCase())
        const spicinessMatch = filters.value.spiciness === 0 ? true : item.spicy_level === spiceDict[filters.value.spiciness]
        const ingredientsMatch = filters.value.ingredients.every((ingredient) => {
            return [item.ingredient_1, item.ingredient_2, item.ingredient_3].includes(ingredient)
        })
        const caloriesMatch = item.calories >= filters.value.calories[0] && item.calories <= filters.value.calories[1]
        const priceMatch = item.price >= filters.value.price[0] && item.price <= filters.value.price[1]

        return vegetarianMatch && searchTermMatch && spicinessMatch && ingredientsMatch && caloriesMatch && priceMatch

    })
    totalRecords.value = filteredItems.length
    menuItems.value = filteredItems.slice(startIndex.value, startIndex.value + rows.value)
}

function handlePageChange(event: { page: number }): void {
    startIndex.value = event.page * rows.value
    filterItems()
}

watch(() => route.params.category, () => {
    filterItems()
})

watch(filters, () => {
    filterItems()
}, { deep: true })

</script>
<style scoped>
@import "../assets/icons.css";

.menu {
    display: flex;
    padding-left: 3em;
}

.menu .p-inputgroupaddon {
    background-color: var(--p-amber-500);
    color: #fff;
    border: var(--p-amber-500);
}

.filters__wrapper {
    width: 350px;
    height: 100%;
    margin-right: 2em;
    display: flex;
    flex-direction: column;
    position: relative;
    gap: 2em;
}

.menu__nav {
    margin: 4em 0;
}

.nav__title {
    color: var(--p-amber-600);
    font-size: 2em;
    text-align: center;
    margin: 0 0 1em 0;
}

.filters__title {
    color: var(--p-amber-600);
    margin: 0;
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 1em;
}

.menu__search {
    width: 350px;
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-bottom: 1em;
}

.vegetarian-check {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
    font-family: 'Dancing Script', cursive;
    font-size: 1.2em;
    font-weight: bold;
    color: var(--p-amber-700);
}

.reset-filter {
    position: absolute;
    right: 1em;
    color: var(--p-amber-600);
    cursor: pointer;
}


.spiciness__list {
    display: flex;
    flex-direction: column;
    gap: 1em;
    list-style: none;
    padding: 0;
    margin: 0;
}

.spiciness__list .spiciness__item {
    display: flex;
    align-items: center;
    gap: 0.5em;
}

.range-inputs {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    margin-bottom: 1em;
}


.menu__items {
    width: 100%;
    margin: 4em 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
}

.no-results {
    width: 100%;
    text-align: center;
    color: var(--p-amber-600);
}

@media screen and (max-width: 414px),
(max-width: 815px) and (orientation: landscape) {
    .menu {
        flex-direction: column;
        padding: 0;
        align-items: center;
    }

    .filters__wrapper {
        width: 90%;
    }

    .menu__items {
        justify-content: center;
    }
}
</style>