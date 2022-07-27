import {createStore} from 'vuex'

export default createStore({ //store
    state: {
        pizzas: [],
        cartPizzas: [],
        category: null,
        sortByActive: {
            name: 'популярности',
            id: 0,
            sortBy: 'rating'
        },
        cartItems: new Map([]) // something like {}

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
            state.pizzas = actionPizza
        },
        GET_PIZZAS_CART(state, actionPizza) {
            state.cartPizzas = actionPizza
            actionPizza.forEach(cart => state.cartItems.set(cart.id, {...cart}))
        },
        SET_CATEGORY(state, categoryIndex) {
            state.category = categoryIndex
        },
        SET_SORT(state, sortItem) {
            const sortBy = sortItem.sortBy
            if (typeof state.pizzas[0][sortBy] === 'string') {
                state.pizzas.sort((a, b) => {
                    return a[sortBy].toLowerCase().localeCompare(b[sortBy].toLowerCase())
                })
            } else state.pizzas.sort((a, b) => b[sortBy] - a[sortBy])
            state.sortByActive = {name: sortItem.name, id: sortItem.id, sortBy: sortBy}
        },
        ADD_PIZZA_TO_CART(state, pizza) {
            const isAlreadyExists = state.cartItems.get(pizza.id)

            if (isAlreadyExists) {
                state.cartItems.set(pizza.id, {...pizza, count: isAlreadyExists.count + 1})
            } else {
                state.cartItems.set(pizza.id, {...pizza, count: 1})
            }
        },
        REMOVE_PIZZA_FROM_CART(state, pizza) {
            if (pizza.count < 1) {
                state.cartItems.delete(pizza.id)
            } else state.cartItems.forEach((value, key, map) => {
                value.count = value.count - 1
            })
        },
        CLEAR_CART_ITEMS(state, pizzaId) {
            state.cartItems.delete(pizzaId)
            state.cartPizzas = state.cartPizzas.filter(pizza => pizza.id !== pizzaId)
        }
    },
    actions: {
        //actions for async code like requests. you CAN NOT change/mutate state in actions
        // first action argument always takes the context
        async getPizzaAction({commit, state}) { //context is this file
            const response = await fetch('http://localhost:3000/pizzas')
            const pizzasData = await response.json()
            commit('GET_PIZZAS', pizzasData)
            commit('SET_SORT', state.sortByActive)
        },
        async getFilteredPizzasAction(context, category) {
            const response = await fetch(`http://localhost:3000/pizzas?category=${category}`)
            const pizzasData = await response.json()
            context.commit('SET_CATEGORY', category)
            context.commit('GET_PIZZAS', pizzasData)
            context.commit('SET_SORT', context.state.sortByActive)
        },
        async getCartAction({commit}) {
            const response = await fetch('http://localhost:3000/cart')
            const pizzasData = await response.json()
            commit('GET_PIZZAS_CART', pizzasData)
        }
        ,
        async setCartItemAction(context, pizzaId) {
            await fetch('http://localhost:3000/cart', {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(context.state.cartItems.get(pizzaId))
            })
        },
        async setCountCartItemAction(context, pizzaId) {
            await fetch(`http://localhost:3000/cart/${pizzaId}`, {
                method: 'PATCH',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    count: context.state.cartItems.get(pizzaId)?.count
                })
            })
        },
        async deletePizzaFromCartItemsAction(context, pizzaId) {
            await fetch(`http://localhost:3000/cart/${pizzaId}`, {
                method: 'DELETE'
            })
        }
    },
    modules: {}
})