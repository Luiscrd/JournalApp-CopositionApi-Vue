<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-5 fw-bold">{{ day }}</span>
                <span class="mx-1 fs-5">{{ month }}</span>
                <span class="mx-2 fw-light">{{ yearDay }}</span>
            </div>
            <div>
                <button type="button" class="btn btn-danger mx-2">Borrar<i class="fa fa-trash-alt ms-3"></i></button>
                <button type="button" class="btn btn-primary">Subir Foto<i class="fa fa-upload ms-3"></i></button>
            </div>
        </div>
        <div class="d-flex flex-column px-3">
            <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
        </div>
        <Fab icon="fa-save" />
        <img class="img-thumbnail"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette3.wikia.nocookie.net%2Foutcast%2Fimages%2Ff%2Ff8%2FImagen-no-disponible.png%2Frevision%2Flatest%3Fcb%3D20160322191504%26path-prefix%3Des&f=1&nofb=1&ipt=07d3a24e446ce95d2172afa30aa5fb906a96c0022b8083ec3502dcd4fe92dc57&ipo=images"
            alt="Entry Picture">
    </template>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'
import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear'

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    data() {
        return {
            entry: null
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        day() {
            const { day } = getDayMonthYear(this.entry.date)
            return day
        },
        month() {
            const { month } = getDayMonthYear(this.entry.date)
            return month
        },
        yearDay() {
            const { yearDay } = getDayMonthYear(this.entry.date)
            return yearDay
        }
    },
    methods: {
        loadEntry() {
            const entry = this.getEntryById(this.id)
            if (!entry) return this.$router.push({ name: 'no-entry' })
            this.entry = entry
        }
    },

    created() {
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }
}
</script>

<style lang="scss" scoped>
.entry-title {
    border-bottom: solid 1px #62B8FC;
}

textarea {
    font-size: 20px;
    border: none;
    margin-top: 10px;
    height: calc(100vh - 282px);

    &:focus {
        outline: none;
    }
}

img {
    width: 170px;
    position: fixed;
    bottom: 200px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>