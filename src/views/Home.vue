<template>
    <div class="content">
        <div class="container">
            <div class="content__top">
                <Categories/>
                <Sort/>
            </div>
            <PizzaList/>
        </div>
    </div>
</template>

<script>
    import PizzaList from "../components/Pizza/List.vue"
    import Sort from "../components/Sort.vue"
    import Categories from "../components/Categories.vue"
    export default {
        components: {PizzaList, Sort, Categories}
    }
</script>

<style scoped>

</style>