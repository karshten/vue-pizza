<template>
    <li @click="handleAll" :class="{ active: selectedCategory === null }">
        Все
    </li>
    <li
        :class="{ active: i === selectedCategory }"
        v-for="(item, i) in categoriesItems"
        :key="item"
        @click="handleActiveItem(i)"
    >
        {{ item }}
    </li>
</template>

<script>
export default {
    props: ['categoriesItems', 'selectedCategory'],
    setup(props, context){
        const handleActiveItem = (idx) => {
            context.emit('onActive', idx)
        }
        const handleAll = () => {
            context.emit('onAll', null)
        }
        return {handleActiveItem, handleAll}
    }
};
</script>

<style scoped lang='scss'>
@import "../../assets/scss/app.scss";
@import "../../assets/scss/components/_button.scss";
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
</style>