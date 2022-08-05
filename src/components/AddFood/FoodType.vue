<template>
    <div class="food-types__item">
        <img :src="img" alt="type-image">
    </div>
</template>

<script>
    export default {
        name: "FoodType",
        props: ['img']
    }
</script>

<style scoped>

</style>