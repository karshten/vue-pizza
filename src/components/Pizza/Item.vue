<template>
    <div class="pizza-block">
        <img
                class="pizza-block__image"
                :src="pizza.imageUrl"
                alt="Pizza"
        />
        <h4 class="pizza-block__title">{{pizza.name}}</h4>
        <div class="pizza-block__selector">
            <Types @activeType="handleType" :availableTypes="pizza.types"/>
            <Sizes @activeSize="handleSize" :availableSizes="pizza.sizes"/>
        </div>
        <div class="pizza-block__bottom">
            <div class="pizza-block__price">от {{pizza.price[activeSizeIdx]}} ₽</div>
            <div v-if="!isCreating" class="button button--outline button--add" @click="handleAddPizza(pizza)">
                <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                    />
                </svg>
                <span>Добавить</span>
                <i v-if="pizzaCount">{{pizzaCount}}</i>
            </div>
            <div v-else class="button button--outline button--add">
                <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                    />
                </svg>
                <span>Добавить</span>
                <i v-if="pizzaCount">{{pizzaCount}}</i>
            </div>
        </div>
    </div>
</template>

<script>
    import Types from "./Types.vue";
    import Sizes from "./Sizes.vue";
    import {useStore} from 'vuex'
    import {computed, ref, onMounted} from '@vue/runtime-core'

    export default {
        props: ['pizza','isCreating'],
        components: {Types, Sizes},
        setup(props) {
            const store = useStore()
            const {pizza} = props;
            const types = ['тонкое', 'традиционное']
            const activeType = ref(null)
            const activeSize = ref(null)
            const activeSizeIdx = ref(0)

            const id = ref(`${pizza.name}${types[pizza.types[0]]}${pizza.sizes[0]}`)

            const handleType = (type) => {
                activeType.value = type
                id.value = `${pizza.name}${type}${pizza.size || activeSize.value}`
            }
            const handleSize = (size, sizeIdx) => {
                activeSize.value = size
                activeSizeIdx.value = sizeIdx
                id.value = `${pizza.name}${pizza.type || activeType.value}${size}`
            }

            const pizzaCount = computed(() => store.state.cartItems.get(id.value)?.count)

            const handleAddPizza = (pizza) => {
                pizza.type = activeType.value
                pizza.size = activeSize.value
                pizza.activePrice = pizza.price[activeSizeIdx.value]
                id.value = `${pizza.name}${pizza.type}${pizza.size}`
                store.commit('ADD_PIZZA_TO_CART', pizza)
            }

            return {handleAddPizza, pizzaCount, handleType, handleSize, id, activeSizeIdx}
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/app.scss";

    .pizza-block {
        width: 280px;
        text-align: center;
        margin-bottom: 65px;

        &:not(:nth-of-type(4n)) {
            margin-right: 35px;
        }

        &__image {
            width: 260px;
        }

        &__title {
            font-size: 20px;
            font-weight: 900;
            margin-bottom: 20px;
        }

        &__selector {
            display: flex;
            background-color: #f3f3f3;
            border-radius: 10px;
            flex-direction: column;
            padding: 6px;

            ul {
                display: flex;
                flex: 1;

                &:first-of-type {
                    margin-bottom: 6px;
                }

                li {
                    padding: 8px;
                    flex: 1;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 14px;
                    @include noselect();

                    &.active {
                        background: #d2d2d2;
                        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
                        border-radius: 5px;
                        cursor: auto;
                    }
                }
            }
        }

        &__bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
        }

        &__price {
            font-weight: bold;
            font-size: 22px;
            line-height: 27px;
            letter-spacing: 0.015em;
        }
    }
</style>
