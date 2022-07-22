<template>
    <div class="categories">
        <ul>
            <li @click="handleSetNull" :class="{active: selectedCategory === null}">Все</li>
            <li
                    :class="{active: i === selectedCategory}"
                    v-for="(item, i) in categoriesItems"
                    :key="item"
                    @click="handleActiveItem(i)"
            >
                {{item}}
            </li>
        </ul>
    </div>
</template>

<script>
    import {computed, ref} from "@vue/reactivity";
    import {useStore} from "vuex";

    export default {
        setup() {
            const store = useStore()
            const categoriesItems = ref([
                "Мясные",
                "Вегетарианская",
                "Гриль",
                "Острые",
                "Закрытые",
            ])

            const selectedCategory = computed(() => store.state.category)

            const handleActiveItem = (idx) => {
                store.dispatch('getFilteredPizzasAction', idx)
            }

            const handleSetNull = () => {
                store.commit('SET_CATEGORY', null)
                store.dispatch('getPizzaAction')
            }

            return {categoriesItems, selectedCategory, handleActiveItem, handleSetNull}
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/scss/app.scss";

    .categories {
        ul {
            display: flex;

            li {
                background-color: #f9f9f9;
                padding: 13px 30px;
                border-radius: 30px;
                margin-right: 10px;
                font-weight: bold;
                cursor: pointer;
                transition: background-color 0.1s ease-in-out;
                @include noselect();

                &:hover {
                    background-color: darken(#f9f9f9, 2%);
                }

                &:active {
                    background-color: darken(#f9f9f9, 5%);
                }

                &.active {
                    background-color: #282828;
                    color: #fff;
                }
            }
        }
    }

</style>