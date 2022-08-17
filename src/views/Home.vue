<template>
    <div class="content">
        <div class="container">
            <div class="content__top" :class="{adminTopContainer: isAdmin}">
                <Categories/>
                <Sort />
            </div>
            <PizzaList/>
        </div>
    </div>
</template>

<script>
import PizzaList from "../components/Pizza/List.vue";
import Sort from "../components/Sort.vue";
import Categories from "../components/Categories/Categories.vue";
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
export default {
    components: { PizzaList, Sort, Categories },
    setup() {
        const store = useStore();
        const isAdmin = computed(() => store.state.isAdmin);
        return {isAdmin}
    },
};
</script>

<style scoped>
.adminTopContainer {
    position: relative;
}
</style>