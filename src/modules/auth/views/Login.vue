<template>
    <span class="login100-form-title p-b-41">
        Ingresar
    </span>
    <form @submit.prevent="onSubmit" class="login100-form validate-form p-b-33 p-t-5">

        <div class="wrap-input100 validate-input" data-validate="Enter username">
            <input v-model="urerForm.email" class="input100" type="email" placeholder="Correo" required>
            <span class="focus-input100" data-placeholder="&#xe818;"></span>
        </div>

        <div class="wrap-input100 validate-input" data-validate="Enter password">
            <input v-model="urerForm.password" class="input100" type="password" placeholder="Contraseña" required>
            <span class="focus-input100" data-placeholder="&#xe80f;"></span>
        </div>

        <div class="container-login100-form-btn m-t-32">
            <button class="login100-form-btn" type="submit">Login</button>

        </div>

        <div class="container-login100-form-btn m-t-32">
            <router-link :to="{name: 'registro'}">¿No tienes cuenta?</router-link>
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
        const { logineUser } = useAuth()
        const urerForm = ref({
            email: 'luiscrua@gmail.com',
            password: '123456'

        })

        return {
            urerForm,
            onSubmit: async () => {
                const { ok, msg } = await logineUser(urerForm.value)
                if (!ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Usuario o contraseña invalidos',
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

</style>