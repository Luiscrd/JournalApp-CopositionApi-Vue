import { shallowMount } from '@vue/test-utils'
import EntryView from '@/modules/daybook/views/EntryView.vue'
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

        wrapper = shallowMount(EntryView, {
            global: {
                mocks: {
                   $router: mockRouter
                },
                plugins: [store]
            }, 
            props: {
                id: journalState.entries[0].id
            },
            data() {
                return {
                    entry: journalState.entries[0]
                }
            }
        })

    })

    test('Debe renderizar el componente correctamente', () => {

        expect(wrapper.html()).toMatchSnapshot()

    });

    test('Debe de sacar al usuarioporqué el id no existe', () => {
        
        wrapper = shallowMount(EntryView, {
            global: {
                mocks: {
                   $router: mockRouter
                },
                plugins: [store]
            }, 
            props: {
                id: 'Este id no existe'
            },
            data() {
                return {
                    entry: null
                }
            }
        })

        expect(mockRouter.push).toBeCalled()
       
    });


})