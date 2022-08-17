<template>
    <div class="categories">
        <button class="button" @click="isCategoryOpen = !isCategoryOpen">
            choose category
        </button>
        <template v-if="isCategoryOpen">
            <div class="backDrop" @click.self="isCategoryOpen = false">
                <ul>
                    <CategoryItem
                        :categoriesItems="categoriesItems"
                        :selectedCategory="selectedCategory"
                        @onActive="handleActiveItem"
                        @onAll="handleSetNull"
                    />
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import CategoryItem from './CategoryItem.vue'

export default {
    components:{CategoryItem},
    setup() {
        const store = useStore();
        const isCategoryOpen = ref(false);
        const categoriesItems = ref([
            "Мясные",
            "Вегетарианская",
            "Гриль",
            "Острые",
            "Закрытые",
        ]);

        const selectedCategory = computed(() => store.state.category);

        const handleActiveItem = (idx) => {
            store.dispatch("getFilteredPizzasAction", idx);
        };

        const handleSetNull = () => {
            store.commit("SET_CATEGORY", null);
            store.dispatch("getPizzaAction");
        };

        return {
            categoriesItems,
            selectedCategory,
            handleActiveItem,
            handleSetNull,
            isCategoryOpen,
        };
    },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/app.scss";
@import "../../assets/scss/components/_button.scss";
.backDrop {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
}
.categories {
    ul {
        padding: 20px 40px;
        position: absolute;
        background: rgb(221, 221, 221);
        display: flex;
        flex-direction: column;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
}
</style>