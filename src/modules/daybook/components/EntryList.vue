<template>
    <div class="entry-list-container">
        <div class="box-input px-2 pt-2 pb-2">
            <input class="form-control" type="text" placeholder="Buscar entradas">
        </div>
        <div class="entry-scrollarea">
            <Entry v-for="entry in 100" :key="entry" />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
        Entry: defineAsyncComponent(() => import('@/modules/daybook/components/Entry.vue')),
    }
}
</script>

<style lang="scss" scoped>
.entry-list-container {
    position: relative;
    border-right: 1px solid #62B8FC;
    height: calc(100vh - 217px);
}

.box-input{
    border-bottom: 1px solid #62B8FC;
}

.entry-scrollarea {
    height: calc(100vh - 271px);
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 8px;
        height: 17px;
        display: none;
    }

    &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:active {
        background-color: #999999;
    }

    &::-webkit-scrollbar-track {
        background: #e1e1e1;
        border-radius: 4px;
    }
}
</style>