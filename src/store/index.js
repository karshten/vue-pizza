import {createStore} from 'vuex'
import {getCollection} from "../composables/getCollection";

export default createStore({ //store
    state: {
        pizzas: [],
        category: null,
        sortByActive: {
            name: 'популярности',
            id: 0,
            sortBy: 'rating'
        },
        cartItems: new Map([]), // something like {},
        createdPreviewPizza: null
    },
    getters: { // something like computed
        getTotalCount(state) {
            let totalCount = 0
            state.cartItems.forEach((pizza) => totalCount += pizza.count)
            return totalCount
        },
        getTotalPrice(state) {
            let totalPrice = 0
            state.cartItems.forEach((pizza) => {
                const pizzaPrice = pizza.price * pizza.count
                totalPrice += pizzaPrice
            })
            return totalPrice
        }
    },
    mutations: { // mutations for sync code. mutate/change state only in mutations
        GET_PIZZAS(state, actionPizza) {
            state.pizzas = actionPizza.value
        },
        GET_PIZZAS_CART(state, actionPizza) {
            actionPizza.value.forEach(cart => state.cartItems.set(cart.id, {...cart}))
        },
        SET_CATEGORY(state, categoryIndex) {
            state.category = categoryIndex
        },
        SET_SORT(state, sortItem) {
            // const sortBy = sortItem.sortBy
            // if (typeof state.pizzas[0][sortBy] === 'string') {
            //     state.pizzas.sort((a, b) => {
            //         return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
            //     })
            // } else state.pizzas.sort((a, b) => b[sortBy] - a[sortBy])
            // state.sortByActive = {name: sortItem.name, id: sortItem.id, sortBy: sortBy}
        },
        ADD_PIZZA_TO_CART(state, pizza) {
            const id = `${pizza.name}${pizza.type}${pizza.size}`
            const isAlreadyExists = state.cartItems.get(id)

            if (isAlreadyExists) {
                state.cartItems.set(id, {...pizza, count: isAlreadyExists.count + 1})
            } else {
                state.cartItems.set(id, {...pizza, count: 1})
            }
        },
        REMOVE_PIZZA_FROM_CART(state, pizza) {
            const id = `${pizza.name}${pizza.type}${pizza.size}`
            if (pizza.count < 1) {
                state.cartItems.delete(id)
            } else state.cartItems.set(id, {...pizza, count: pizza.count - 1})
        },
        INCREMENT_PIZZA_COUNT(state, pizza) {
            const id = `${pizza.name}${pizza.type}${pizza.size}`
            const count = pizza.count

            delete pizza.count

            state.cartItems.set(id, {...pizza, count: count + 1})
        },
        DECREMENT_PIZZA_COUNT(state, pizza) {
            const id = `${pizza.name}${pizza.type}${pizza.size}`
            const count = pizza.count

            if (pizza.count === 1) {
                state.cartItems.delete(id)
            }

            delete pizza.count

            state.cartItems.set(id, {...pizza, count: count - 1})
        },
        CLEAR_CART_ITEMS(state) {
            state.cartItems.clear()
        },
        DELETE_PIZZA_FROM_CART(state, pizza) {
            const id = `${pizza.name}${pizza.type}${pizza.size}`
            delete pizza.count
            state.cartItems.delete(id)
        },
        CREATE_PIZZA(state, pizza) {
            state.createdPreviewPizza = pizza
        },
        SET_SAVED_PIZZAS(state, savedPizzas){
            state.cartItems = savedPizzas
        }
    },
    actions: {
        //actions for async code like requests. you CAN NOT change/mutate state in actions
        // first action argument always takes the context
        //context is this file
        async getPizzaAction({commit, state}) {
            const {documents} = await getCollection('pizzas')
            commit('GET_PIZZAS', documents)
        },
        async getFilteredPizzasAction(context, category) {
            // const response = await fetch(`http://localhost:3000/pizzas?category=${category}`)
            // const pizzasData = await response.json()
            // context.commit('SET_CATEGORY', category)
            // context.commit('GET_PIZZAS', pizzasData)
            // context.commit('SET_SORT', context.state.sortByActive)
        },
    },
    modules: {}
})