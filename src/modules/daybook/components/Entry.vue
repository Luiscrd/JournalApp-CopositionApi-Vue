<template>
    <div class="entry-container pb-3 p-2 pointer" @click="$router.push({ name: 'entry', params: { id: entry.id } })">
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">{{ day }}</span>
            <span class="mx-1 fs-5">{{ moth }}</span>
            <span class="mx-2 fw-light">{{ yearDay }}</span>
        </div>
        <div class="entry-description">{{ shortText }}</div>
    </div>
</template>

<script>
import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear'

export default {
    props: {
        entry: {
            type: Object,
            required: true
        }
    },
    computed: {
        shortText() {
            return (this.entry.text.length > 130) ? this.entry.text.substring(0, 130) + '...' : this.entry.text
        },
        day() {
            const date = getDayMonthYear(this.entry.date)
            return date.day
        },
        moth() {
            const date = getDayMonthYear(this.entry.date)
            return date.month
        },
        yearDay() {
            const date = getDayMonthYear(this.entry.date)
            return date.yearDay
        }
    }
}
</script>

<style lang="scss" scoped>
.entry-container {
    border-bottom: 1px solid #62B8FC;
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: grey, $amount: 45);
    }
}

.entry-description {
    font-size: 12px;
}
</style>