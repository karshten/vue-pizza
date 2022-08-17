<template>
    <div class="container">
        <h2>Рейтинг и Категория</h2>
        <p>Определите настройки для пиццы</p>
        <div class="create">
            <div class="pizza">
                <h4>Превью</h4>
                <div class="pizza__block">
                    <Item v-if="mounted" :pizza="pizza" :is-creating="true" />
                </div>
            </div>
            <div class="create__rate-category">
                <select v-model="category" class="create__select">
                    <option value="0">Масная</option>
                    <option value="1">Вегетарианская</option>
                    <option value="2">Гриль</option>
                    <option value="3">Острые</option>
                    <option value="4">Закрытые</option>
                </select>
                <div>
                    <h3>Определите рейтинг пиццы</h3>
                    <div class="create__rating">
                        <button
                            @click="rating = rating - 1"
                            v-for="i in rating"
                            :key="i"
                        >
                            <svg
                                width="30"
                                height="30"
                                viewBox="0 0 30 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15 0L18.3677 10.3647H29.2658L20.4491 16.7705L23.8168 27.1353L15 20.7295L6.18322 27.1353L9.55093 16.7705L0.734152 10.3647H11.6323L15 0Z"
                                    fill="#FE5F1E"
                                />
                            </svg>
                        </button>
                        <button
                            @click="rating = rating + 1"
                            v-for="idx in 5 - rating"
                            :key="idx"
                        >
                            <svg
                                width="30"
                                height="28"
                                viewBox="0 0 30 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15 1.61804L17.8922 10.5193L18.0044 10.8647H18.3677H27.727L20.1552 16.366L19.8613 16.5795L19.9735 16.925L22.8657 25.8262L15.2939 20.325L15 20.1115L14.7061 20.325L7.13428 25.8262L10.0265 16.925L10.1387 16.5795L9.84482 16.366L2.27299 10.8647H11.6323H11.9956L12.1078 10.5193L15 1.61804Z"
                                    fill="white"
                                    stroke="#FE5F1E"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="create__info">
                <p>
                    Тут вы определяете категорию вашей пиццы к которой он
                    относится, пример; Пепперони =>
                    <span>Мясная</span> Овощная => <span>Вегетерианская</span>
                </p>
                <p>
                    Данное поле будет влиять где появится пицца которую мы здесь
                    добавляем.
                </p>
                <p>
                    Данное поле будет влиять на сортировку. Пиццы с высоким
                    рейтингом отображаются в начале списка при выборе сортировки
                    <span>по Популярности</span>
                </p>
            </div>
        </div>
        <div class="bottom">
            <button class="bottom__continue" @click="handleCreatePizza">
                Создать
            </button>
        </div>
    </div>
</template>

<script>
import Item from "../../components/Pizza/Item.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';

export default {
    name: "RatingCategory",
    components: { Item },
    setup() {
        const store = useStore();
        const router = useRouter()

        const pizza = computed(() => store.state.createdPreviewPizza);
        const mounted = ref(false);
        const category = ref(4);
        const rating = ref(4);

        onMounted(() => {
            if (pizza.value) {
                mounted.value = true;
            } else router.push('/add-pizza');
        });

        const handleCreatePizza = () => {
            store.commit("SET_VALUE_TO_CRETING_PIZZA", [
                "category",
                +category.value,
            ]);
            store.commit("SET_VALUE_TO_CRETING_PIZZA", [
                "rating",
                rating.value,
            ]);
            
            store.dispatch('addPizzaByAdmin', pizza.value)
            router.push('/')
        };

        return { pizza, mounted, category, handleCreatePizza, rating };
    },
};
</script>

<style scoped lang="scss">
.create {
    display: flex;
    justify-content: space-between;

    &__rate-category {
        margin-left: 100px;
    }
    & button {
        cursor: pointer;
        clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
        );
    }
    &__info {
        max-width: 224px;
        & p {
            padding: 1px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            border-radius: 30px 30px 30px 0px;
            color: rgba(44, 44, 44, 0.6);
            margin-bottom: 80px;

            & span {
                color: #fe5f1e;
            }
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