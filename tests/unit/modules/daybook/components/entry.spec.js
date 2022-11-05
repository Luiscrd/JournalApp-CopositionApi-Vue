import { shallowMount } from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry.vue'

describe('Pruebas en el Fab component', () => {

    const mockRouter = { push: jest.fn() }

    const entry = {
        id: '-NG3eMdNEqhIeBgnDk10',
        date: 1667599260784,
        picture: 'https://res.cloudinary.com/dtkdrn7w2/image/upload/v1667599268/tqvw4gix5okwge6myknb.png',
        text: 'Hola mundo'
    }

    let wrapper

    beforeEach(() => {

        wrapper = shallowMount(Entry, { 
            props: { 
                entry 
            },
            global: {
                mocks: {
                    $router: mockRouter
                }
            }
        })

    })

    test('Debe renderizar el componente correctamente', () => {

        expect(wrapper.html()).toMatchSnapshot()

    });

    test('Debe redirecionar al hacer click en el container', () => {

        const divPrin = wrapper.find('.entry-container')

        expect(divPrin.exists()).toBeTruthy()

        divPrin.trigger('click')

        expect(mockRouter.push).toHaveBeenCalled()

    });

    test('Pruebas de las propiedades computadas', () => {

        expect(wrapper.vm.day).toBe(4)

        expect(wrapper.vm.moth).toBe('Noviembre')

        expect(wrapper.vm.yearDay).toBe('2022, Viernes')
       
    });

})