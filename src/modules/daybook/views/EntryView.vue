<template>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fw-light">2021, Jueves</span>
        </div>
        <div>
            <button type="button" class="btn btn-danger mx-2">Borrar<i class="fa fa-trash-alt ms-3"></i></button>
            <button type="button" class="btn btn-primary">Subir Foto<i class="fa fa-upload ms-3"></i></button>
        </div>
    </div>
    <div class="d-flex flex-column px-3">
        <textarea placeholder="¿Qué sucedió hoy?"></textarea>
    </div>
    <Fab icon="fa-save"/>
    <img class="img-thumbnail" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimage.slidesharecdn.com%2Fdavidlicenvuejs-slides-170526074856%2F95%2Fvuejs-introduction-1-638.jpg%3Fcb%3D1495785021&f=1&nofb=1&ipt=930d250bd6ac7fb4d004b876c490f9141ea7383f3f13e8af63188fedd0018a04&ipo=images" alt="Entry Picture">
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
        Fab: defineAsyncComponent(() => import('@/modules/daybook/components/Fab.vue')),
    }
}
</script>

<style lang="scss" scoped>
.entry-title{
    border-bottom: solid 1px #62B8FC;
}

textarea{
    font-size: 20px;
    border: none;
    margin-top: 10px;
    height: calc(100vh - 282px);
    &:focus {
        outline: none;
    }
}

img{
    width: 170px;
    position: fixed;
    bottom: 200px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>