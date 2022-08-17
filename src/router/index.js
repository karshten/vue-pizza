import { createRouter, createWebHistory } from 'vue-router'
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import FoodTypes from "../views/AddPFood/FoodTypes.vue";
import AddPizza from "../views/AddPFood/AddPizza.vue";
import RatingCategory from "../views/AddPFood/RatingCategory.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart
    },
    {
      path: "/choose-food-type",
      name: "FoodTypes",
      component: FoodTypes
    },
    {
      path: "/add-pizza",
      name: "AddPizza",
      component: AddPizza
    },
    {
      path: "/create-pizza",
      name: "CreatePizza",
      component: RatingCategory
    },
  ]
})

export default router
