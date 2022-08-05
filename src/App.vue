<template>
    <div class="wrapper">
        <Header/>
        <router-view/>
    </div>
</template>

<script>
    import Header from "./components/Header.vue"
    import {onMounted, computed, watch, watchEffect, ref} from 'vue'
    import {useStore} from 'vuex'


    export default {
        components: {Header},
        setup() {
            const store = useStore()

            const cartItems = computed(() => store.state.cartItems)
            const pizzas = computed(() => JSON.stringify(Object.fromEntries(cartItems.value)))

            watch(pizzas,() => {
                localStorage.setItem(
                    'cartItems',
                    JSON.stringify(Object.fromEntries(cartItems.value))
                )
            })

            onMounted(() => {
                const isExists = localStorage.getItem('cartItems')

                if (isExists) {
                    const savedPizzas = new Map(Object.entries(JSON.parse(isExists)))

                    if (savedPizzas) {
                        store.commit('SET_SAVED_PIZZAS', savedPizzas)
                    }
                }
            })
        }
    }
</script>

<style scoped>

</style>
