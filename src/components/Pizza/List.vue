<template>
    <h2 class="content__title">Все пиццы</h2>
    <div class="content__items">
        <Item v-for="pizza in pizzas" :key="pizza.id" :pizza="pizza"/>
    </div>
</template>

<script>
    import Item from "./Item.vue";
    import {onMounted, computed} from "@vue/runtime-core"
    import {useStore} from 'vuex'

    export default {
        components: {Item},
        props: ['pizzas'],
        setup() {
            const store = useStore()

            const pizzas = computed(() => store.state.pizzas)

            onMounted(() => {
                store.dispatch('getPizzaAction')
            })

            return {pizzas}
        }
    }
</script>

<style scoped>

</style>