<template>
    <div class="container">
        <h2>Рейтинг и Категория</h2>
        <p>Определите настройки для пиццы</p>
        <div class="pizza">
            <h4>Превью</h4>
            <div class="pizza__block">
                <Item v-if="mounted" :pizza="pizza"/>
            </div>
        </div>
        <div class="bottom">
            <router-link class=bottom__continue to="/add-pizza">Создать</router-link>
        </div>
    </div>
</template>

<script>
    import Item from "../../components/Pizza/Item.vue";
    import {useStore} from 'vuex'
    import {ref, computed, onMounted} from 'vue'

    export default {
        name: "RatingCategory",
        components: {Item},
        setup() {
            const store = useStore()

            const pizza = computed(() => store.state.createdPreviewPizza)
            const mounted = ref(false)

            onMounted(() => {
                if (pizza.value) {
                    mounted.value = true
                } else return
            })

            return {pizza, mounted}
        }
    }
</script>

<style scoped lang="scss">
    .bottom {
        padding-bottom: 60px;
        margin-top: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__continue {
            background: #2C2C2C;
            border-radius: 30px;
            padding: 15px 65px;
            color: #fff;
        }
    }
</style>