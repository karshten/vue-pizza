<template>
    <header class="header">
        <HeaderBar v-if="isAdmin"/>
        <div class="container" >
           <HeaderLogo v-if="!isAdmin"/>
           <HeaderSearch/>
           <HeaderCart
                :totalPrice="totalPrice"
                :totalCount="totalCount"
           />
        </div>
    </header>
</template>

<script>
    import {useStore} from 'vuex'
    import {computed} from '@vue/runtime-core'
    import HeaderLogo from './HeaderLogo.vue'
    import HeaderCart from './HeaderCart.vue'
    import HeaderSearch from './HeaderSearch.vue'
    import HeaderBar from './HeaderBar.vue'

    export default {
        components: {HeaderLogo, HeaderCart, HeaderSearch, HeaderBar},
        props:['isAdmin'],
        setup() {
            const store = useStore()

            const totalCount = computed(() => store.getters.getTotalCount)
            const totalPrice = computed(() => store.getters.getTotalPrice)

            return {totalCount, totalPrice}
        }
    }
</script>

<style lang="scss">
    @import '../../assets/scss/app.scss';

    .header {
        position: relative;
        border-bottom: 1px solid $gray-line;
        padding: 40px 0;

        .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__logo {
            display: flex;

            img {
                margin-right: 15px;
            }

            h1 {
                color: #181818;
                font-size: 24px;
                text-transform: uppercase;
                font-weight: 800;
            }

            p {
                color: #7b7b7b;
            }

        }
    }
    .adminApp {

        & .header {
            padding: 40px;
        }
    }

</style>