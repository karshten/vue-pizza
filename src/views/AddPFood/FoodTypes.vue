<template>
    <div class="container">
        <h2>Добавить новый продукт</h2>
        <p>Выберите тип продукта</p>
        <div class="food-types">
            <FoodType
                    @click="handleChangeActiveType(item.type)"
                    v-for="item in types" :img="item.img"
                    :class="{active: activeType === item.type}"
            />
        </div>
        <div class="bottom">
            <p>В данном блоке вы определяете тип добавляемого продукта, в следующем блоке вы будете выбирать его
                параметры*</p>
            <router-link class=bottom__continue to="/add-pizza">Далее</router-link>
        </div>
    </div>
</template>

<script>
    import {ref} from 'vue'
    import FoodType from "../../components/AddFood/FoodType.vue";

    export default {
        name: "FoodTypes",
        components: {FoodType},
        setup() {
            const activeType = ref(null)
            const types = [
                {
                    img: 'src/assets/img/emojione-monotone_pizza.svg',
                    type: 'pizza'
                },
                {
                    img: 'src/assets/img/emojione-monotone_chocolate-bar.svg',
                    type: 'chocolate'
                },
                {
                    img: 'src/assets/img/emojione-monotone_tropical-drink.svg',
                    type: 'drink'
                },
                {
                    img: 'src/assets/img/Combo.svg',
                    type: 'combo'
                },

            ]

            const handleChangeActiveType = (type) => {
                activeType.value = type
            }
            return {types, activeType, handleChangeActiveType}
        }
    }
</script>

<style scoped lang="scss">
    .food-types {
        margin: 65px 0;
        max-width: 950px;
        display: flex;
        justify-content: space-between;

        &__item {
            padding: 50px;
            background: #fff;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
            border-radius: 15px;
            cursor: pointer;
            transition: .4s ease-in-out;

            &:hover, &:hover svg path {
                background: #FE5F1E;
                fill: #fff;
            }
        }

        & .active {
            background: #FE5F1E;
        }
    }

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