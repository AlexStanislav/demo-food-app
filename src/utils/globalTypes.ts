export interface FoodItems {
    menu_item_id: number
    menu_item_name: string
    description: string
    calories: number
    ingredient_1: string
    ingredient_2: string
    ingredient_3: string
    price: number
    menu_section: string
    spicy_level: string | null
    chef_special: boolean
    vegetarian: boolean
    food_image_url: string
    available_from: string
}