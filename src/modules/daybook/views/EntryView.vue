<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-5 fw-bold">{{ day }}</span>
                <span class="mx-1 fs-5">{{ month }}</span>
                <span class="mx-2 fw-light">{{ yearDay }}</span>
            </div>
            <div>
                <input v-show="false" type="file" @change="onSelectedImage" ref="imageSelector" accept="image/png, image/jpeg">
                <button v-if="entry.id" type="button" class="btn btn-danger mx-2" @click="onDeleteEntry">Borrar<i
                        class="fa fa-trash-alt ms-3"></i></button>
                <button @click="onSelectImage" type="button" class="btn btn-primary">Subir Foto<i class="fa fa-upload ms-3"></i></button>
            </div>
        </div>
        <div class="d-flex flex-column px-3">
            <textarea placeholder="¿Qué sucedió hoy?" v-model="entry.text"></textarea>
        </div>
        <Fab icon="fa-save" @on:click="saveEntry" />
        <img v-if="entry.picture" class="img-thumbnail"
            :src="entry.picture"
            alt="Entry Picture">
        <img v-if="localImage" class="img-thumbnail"
            :src="localImage"
            alt="Entry Picture">
    </template>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear'
import Swal from 'sweetalert2'
import uploadImage from '@/modules/daybook/helpers/uploadImage'

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
            entry: null,
            localImage: null,
            file: null
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
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry() {
            let entry
            if (this.id === 'new') {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            } else {
                entry = this.getEntryById(this.id)
                if (!entry) return this.$router.push({ name: 'no-entry' })
            }
            this.entry = entry
        },
        async saveEntry() {
            Swal.fire({
                icon: 'success',
                title: 'Tu entrada se ha salvado correctamente',
                showConfirmButton: false,
                timer: 1500
            })

            const picture = await uploadImage(this.file)
            this.entry.picture = picture

            if (this.entry.id) {
                await this.updateEntry(this.entry)
            } else {
                const id = await this.createEntry(this.entry)
                this.$router.push({ name: 'entry', params: { id } })
            }
        },
        async onDeleteEntry() {
            Swal.fire({
                title: '¿Estas seguro?',
                text: "Una vez borraqdo no se puede revertir",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si!, quiero borrar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.deleteEntry(this.entry.id)
                    Swal.fire(
                        'Borrado!',
                        'Tu entrada ha sido eliminada.',
                        'success'
                    )
                    this.$router.push({ name: 'no-entry' })
                }
            })
        },
        onSelectedImage(event) {
            const file = event.target.files[0]
            if (!file) {
                this.file = null
                this.localImage = null
                return
            }
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL(file)
            this.file = file
        },
        onSelectImage() {
            this.$refs.imageSelector.click()
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