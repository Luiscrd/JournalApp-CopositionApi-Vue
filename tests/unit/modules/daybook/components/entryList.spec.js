import { shallowMount } from '@vue/test-utils'
import EntryList from '@/modules/daybook/components/EntryList.vue'
import { createStore } from 'vuex'
import { journalState } from '../../../mook-data/test-journal-state'
import journal from '@/modules/daybook/store/journal/index'


describe('Pruebas en el Fab component', () => {

    const createVuexStore = (initialState) => createStore({
        modules: {
            journal: {
                ...journal,
                state: { ...initialState }
            }
        }
    })

    const store = createVuexStore(journalState)

    const mockRouter = {
        push: jest.fn(),
    }

    let wrapper

    beforeEach(() => {

        jest.clearAllMocks()

        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                   $router: mockRouter
                },
                plugins: [store]
            }
        })

    })

    test('Debe renderizar el componente correctamente', () => {

        expect(wrapper.html()).toMatchSnapshot()

    });

    test('Debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => {

       expect(wrapper.findAll('entry-stub').length).toBe(2)

    });

    test('Debe de llamar el getEntriesByTerm y filtrtar las entradas', async () => {

        const input = wrapper.find('input')

        await input.setValue('abcdef')

        expect(wrapper.findAll('entry-stub').length).toBe(1)
 
     });

     test('El botón nuevo debe redireccionar a /new', () => {

        wrapper.find('button').trigger('click')

        expect(mockRouter.push).toHaveBeenCalled()
 
     });


})