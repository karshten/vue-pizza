<template>
    <ul>
        <li
                @click="handleChangeType(i)"
                :class="{active: activeType === i, disabled: !availableTypes.includes(i)}"
                v-for="(item, i) in typeItems"
                :key="item"
        >
            {{item}}
        </li>
    </ul>
</template>

<script>
    import {ref} from 'vue'
    import {onMounted} from '@vue/runtime-core'

    export default {
        name: "Sort",
        props: ['availableTypes'],
        setup(props, context) {
            const typeItems = ['тонкое', 'традиционное']
            const activeType = ref(props.availableTypes[0])

            onMounted(() => {
                context.emit('activeType', typeItems[activeType.value])
            })

            const handleChangeType = (idx) => {
                activeType.value = idx
                context.emit('activeType', typeItems[activeType.value])
            }

            return {typeItems, activeType, handleChangeType}
        }
    }
</script>

<style scoped>
    li.disabled {
        opacity: 0.5;
        pointer-events: none;
    }
</style>