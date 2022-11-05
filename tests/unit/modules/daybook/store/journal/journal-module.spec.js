import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal/index'
import { journalState } from '../../../../mook-data/test-journal-state'

const createVuexStore = (initialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: { ...initialState }
        }
    }
})

describe('Vuex - Pruebas en el Journal Module', () => {

    test('Debe de tener esté estet', () => {

        const store = createVuexStore(journalState)

        const { isLoading, entries } = store.state.journal

        expect(isLoading).toBeFalsy()

        expect(entries.length).toBe(2)

    });

    test('Mutation. Setentrie', () => {

        const store = createVuexStore({ isLoading: true, entries: [] })

        expect(store.state.journal.entries.length).toBe(0)

        expect(store.state.journal.isLoading).toBeTruthy()

        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(2)

        expect(store.state.journal.isLoading).toBeFalsy()

    });

    test('Mutation. UpdateEntry', () => {

        const store = createVuexStore(journalState)

        const updateEntry = {
            id: '-NG3eMdNEqhIeBgnDkp8',
            date: 1667599260798,
            picture: 'https://res.cloudinary.com/dtkdrn7w2/image/upload/v1667599268/tqvw4gix5okwge6myknb.png',
            text: 'Hola mundo'
        }

        store.commit('journal/updateEntry', updateEntry)

        expect(store.state.journal.entries.length).toBe(2)

        expect(store.state.journal.entries[0].text).toBe('Hola mundo')

    });

    test('Mutation: AddEntry & DeleteEntry', () => {

        const store = createVuexStore(journalState)

        const addEntry = {
            id: '-NG3eMdNEqhIeBgnDk10',
            date: 1667599260784,
            picture: 'https://res.cloudinary.com/dtkdrn7w2/image/upload/v1667599268/tqvw4gix5okwge6myknb.png',
            text: 'Hola mundo'
        }

        expect(store.state.journal.entries.length).toBe(2)

        store.commit('journal/addEntry', addEntry)

        expect(store.state.journal.entries.length).toBe(3)

        let newEntry = store.state.journal.entries.find(e => e.id === addEntry.id)

        expect(newEntry).toBeTruthy()

        store.commit('journal/deleteEntry', addEntry.id)

        expect(store.state.journal.entries.length).toBe(2)

        newEntry = store.state.journal.entries.find(e => e.id === addEntry.id)

        expect(newEntry).toBeFalsy()

    });

    test('Mutation: AddEntry & DeleteEntry', () => {

        const store = createVuexStore(journalState)

        const addEntry = {
            id: '-NG3eMdNEqhIeBgnDk10',
            date: 1667599260784,
            picture: 'https://res.cloudinary.com/dtkdrn7w2/image/upload/v1667599268/tqvw4gix5okwge6myknb.png',
            text: 'Hola mundo'
        }

        expect(store.state.journal.entries.length).toBe(2)

        store.commit('journal/addEntry', addEntry)

        expect(store.state.journal.entries.length).toBe(3)

        let newEntry = store.state.journal.entries.find(e => e.id === addEntry.id)

        expect(newEntry).toBeTruthy()

        store.commit('journal/deleteEntry', addEntry.id)

        expect(store.state.journal.entries.length).toBe(2)

        newEntry = store.state.journal.entries.find(e => e.id === addEntry.id)

        expect(newEntry).toBeFalsy()

    });


    test('Getters: getEntriesByTerm & getEntryById', () => {

        const store = createVuexStore(journalState)

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)

        expect(store.getters['journal/getEntriesByTerm']('abcdefg').length).toBe(1)

        expect(store.getters['journal/getEntryById']('-NG3eMdNEqhIeBgnDkp7')).toBeTruthy()

    });



})