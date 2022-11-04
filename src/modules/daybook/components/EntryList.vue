<template>
    <div class="entry-list-container">
        <div class="box-input px-2 pt-2 pb-2">
            <input class="form-control" type="text" placeholder="Buscar entradas" v-model="term">
        </div>
        <div class="box-button d-flex flex-column p-2">
            <button type="button" class="btn btn-primary" @click="$router.push({ name: 'entry', params: { id: 'new' } })">Nueva Entrada<i class="fa fa-plus-circle ms-3"></i></button>
        </div>
        <div class="entry-scrollarea">
            <Entry v-for="entry in entriesByTerm" :key="entry.id" :entry="entry" />
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
    components: {
        Entry: defineAsyncComponent(() => import('@/modules/daybook/components/Entry.vue')),
    },
    computed: {
        ...mapGetters('journal', ['getEntriesByTerm']),
        entriesByTerm() {
            return this.getEntriesByTerm(this.term)
        }
    },
    data() {
        return {
            term: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.entry-list-container {
    position: relative;
    border-right: 1px solid #62B8FC;
    height: calc(100vh - 217px);
}

.box-input, .box-button {
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