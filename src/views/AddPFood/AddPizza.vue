<template>
    <div class="container">
        <h2>Добавление новой пиццы</h2>
        <p>Выберите параметры продукта</p>
        <div class="create-pizza">
            <div class="create-pizza__view">
                <div>
                    <label for="">Название</label>
                    <input v-model="tmpPizza.name" type="text" />
                </div>
                <div>
                    <label for="">Картинка</label>
                    <input v-model="tmpPizza.imageUrl" type="text" />
                </div>
            </div>
            <div class="create-pizza__sizes-types">
                <div class="create-pizza__sizes">
                    <h4>Размеры</h4>
                    <div>
                        <input v-model="tmpPizza.sizes[0]" type="checkbox" />26
                        см
                    </div>
                    <div>
                        <input v-model="tmpPizza.sizes[1]" type="checkbox" />30
                        см
                    </div>
                    <div>
                        <input v-model="tmpPizza.sizes[2]" type="checkbox" />40
                        см
                    </div>
                </div>
                <div class="create-pizza__types">
                    <h4>Типы</h4>
                    <div>
                        <input
                            v-model="tmpPizza.types[0]"
                            type="checkbox"
                        /><label for="">Тонкое</label>
                    </div>
                    <div>
                        <input
                            v-model="tmpPizza.types[1]"
                            type="checkbox"
                        /><label for="">Традиционное</label>
                    </div>
                </div>
            </div>
            <div class="create-pizza__price">
                <label>26</label
                ><input v-model="tmpPizza.price[0]" type="number" />
                <label>30</label
                ><input v-model="tmpPizza.price[1]" type="number" />
                <label>40</label
                ><input v-model="tmpPizza.price[2]" type="number" />
            </div>
        </div>

        <div class="bottom">
            <p>
                В данном блоке вы определяете тип добавляемого продукта, в
                следующем блоке вы будете выбирать его параметры*
            </p>
            <button @click="handleContinue" class="bottom__continue">
                Далее
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

export default {
    name: "AddPizza",
    setup() {
        const store = useStore();
        const router = useRouter();

        const tmpPizza = ref({
            imageUrl: "",
            name: "",
            price: [],
            sizes: [false, false, false],
            types: [false, false],
        });
        const staticSizes = [26, 30, 40];
        const isValidValues = ref(false);
        watch(tmpPizza.value, () => {
            isValidValues.value = 
            Object.values(tmpPizza.value).every((item) => {
                if (Array.isArray(item)) {
                    return item.filter(item => item).every(item => item) && !!item.length;
                } else return item;
            }) && !!tmpPizza.value.types.length
        })

        const handleContinue = () => {
            tmpPizza.value.sizes = tmpPizza.value.sizes
                .map((item, idx) => {
                    if (item) {
                        return staticSizes[idx];
                    } else return item;
                })
                .filter((item) => item);

            tmpPizza.value.types = tmpPizza.value.types
                .map((item, idx) => {
                    if (item) {
                        return idx;
                    } else return item;
                })
                .filter((item) => item === 0 || item);

            tmpPizza.value.price = tmpPizza.value.price.filter((item) => item);

            if (isValidValues.value) {
                store.commit("CREATE_PIZZA", tmpPizza.value);
                router.push("/create-pizza");
            } else alert("fill all inputs");
        };

        return { tmpPizza, handleContinue, isValidValues };
    },
};
</script>

<style scoped lang="scss">
.create-pizza {
    margin: 40px 0;
    width: 710px;

    &__view {
        display: flex;
        max-width: 100%;
        justify-content: space-between;
        margin-bottom: 30px;

        & label {
            display: block;
            font-weight: 500;
            font-size: 18px;
            line-height: 21px;
            letter-spacing: 0.01em;
            color: rgba(44, 44, 44, 0.5);
        }

        & input {
            width: 325px;
            padding: 15px 66px 15px 22px;
            border-radius: 30px;
            font-size: 16px;
            line-height: 19px;
            /* identical to box height */
            letter-spacing: 0.01em;
            color: rgba(44, 44, 44, 0.5);
        }
    }

    &__sizes-types {
        display: flex;
        max-width: 100%;
        justify-content: space-between;
    }

    &__sizes {
        & div input {
            background: #ffffff;
            border: 1px solid #fe5f1e;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
            border-radius: 100px;
        }
    }

    &__price {
        margin-top: 30px;
        max-width: 30%;
        justify-content: space-between;
        flex-wrap: wrap;

        & input {
            max-width: 120px;
            border-radius: 50px;
            padding: 15px 25px 15px 26px;
            font-size: 18px;
            line-height: 21px;
            letter-spacing: 0.01em;
            color: rgba(44, 44, 44, 0.6);
        }

        & label {
            margin: 0 11px 0 20px;
        }
    }
}

.bottom {
    padding-bottom: 60px;
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__continue {
        cursor: pointer;
        background: #2c2c2c;
        border-radius: 30px;
        padding: 15px 65px;
        color: #fff;
    }
}
</style>