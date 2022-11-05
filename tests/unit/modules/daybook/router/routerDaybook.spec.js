import router from '@/modules/daybook/router/index'

describe('Pruebas en el router de daybook', () => {

    test('El router debe de tener está configuración', async () => {

        expect(router).toMatchObject({

            name: 'daybook',
            component: expect.any(Function),
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any(Function),
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any(Function),
                    props: expect.any(Function),
                },
            ]
        })

        const promiseRoutes = []

        router.children.forEach(child => promiseRoutes.push(child.component()))

        const route = (await Promise.all(promiseRoutes)).map(r => r.default.name)

        expect(route).toContain('EntryView')

        expect(route).toContain('NoEntrySelected')

    });

    test('Debe retornar el id de la ruta', () => {

        const route = {
            params: {
                id: 'ABC123'
            }
        }

        const entryRote = router.children.find(route => route.name === 'entry')

        expect(entryRote.props(route)).toEqual({ id: 'ABC123' })

    });

})