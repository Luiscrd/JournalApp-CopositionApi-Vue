<template>
    <span class="login100-form-title p-b-41">Registrate</span>
    <form @submit.prevent="onSubmit" class="login100-form validate-form p-b-33 p-t-5">

        <div class="wrap-input100 validate-input" data-validate="Enter name">
            <input v-model="urerForm.name" class="input100" type="text" placeholder="Nombre" required>
            <span class="focus-input100" data-placeholder="&#xe82a;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter username">
            <input v-model="urerForm.email" class="input100" type="email" placeholder="Correo" required>
            <span class="focus-input100" data-placeholder="&#xe818;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter password">
            <input v-model="urerForm.password" class="input100" type="password" placeholder="Contraseña" required>
            <span class="focus-input100" data-placeholder="&#xe80f;"></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button class="login100-form-btn" type="submit">Crear cuenta</button>

        </div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{ name: 'login' }">¿Ya tienes cuenta?</router-link>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'
import useAuth from '@/modules/auth/composables/useAuth'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const { createUser } = useAuth()
        const urerForm = ref({
            name: 'Luis Carballo',
            email: 'luiscrua@gmail.com',
            password: '123456'

        })

        return {
            urerForm,
            onSubmit: async () => {
                const { ok, msg } = await createUser(urerForm.value)
                if (!ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: msg,
                    })
                } else {
                    router.push({ name: 'no-entry'})
                }
            }
        }
    }

}
</script>

<style lang="scss" scoped>
@import '@sweetalert2/theme-bootstrap-4/bootstrap-4.scss';
.swal2-styled.swal2-confirm {
    border: 0;
    border-radius: 0.25em;
    background: initial;
    background-color: #0476D0 !important;
    color: #fff;
    font-size: 1em;
}
.swal2-styled.swal2-confirm:focus {
    box-shadow: 0 0 0 3px rgb(104 153 227 / 50%) !important;
}
</style>