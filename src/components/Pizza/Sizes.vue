<template>
    <ul>
        <li
                @click="handleChangeSize(i)"
                :class="{active: availableSizes[i] === activeSize,
                disabled: !availableSizes.includes(sizeItems[i])}"
                v-for="(item, i) in sizeItems"
                :key="item"
        >
            {{item}} см.
        </li>
    </ul>
</template>

<script>
    import {ref, onMounted} from 'vue'

    export default {
        name: "Sort",
        props: ['availableSizes'],
        setup(props, context) {
            const sizeItems = [26, 30, 40]
            const activeSize = ref(props.availableSizes[0])

            onMounted(() => {
                context.emit('activeSize', activeSize.value, sizeItems.indexOf(activeSize.value))
            })

            const handleChangeSize = (idx) => {
                activeSize.value = props.availableSizes[idx]
                context.emit('activeSize', activeSize.value, idx)
            }

            return {sizeItems, activeSize, handleChangeSize}
        }
    }
</script>

<style scoped>
    li.disabled {
        opacity: 0.5;
        pointer-events: none;
    }
</style>