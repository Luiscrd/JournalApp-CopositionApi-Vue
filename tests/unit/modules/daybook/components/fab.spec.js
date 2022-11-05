import { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab.vue'

describe('Pruebas en el Fab component', () => {

  test('Debe renderizar el componente correctamente', () => {

      const wrapper = shallowMount(Fab)

      expect( wrapper.html() ).toMatchSnapshot()

  });

  test('Debe mostrar el icono por defecto', () => {

    const wrapper = shallowMount(Fab)

    const ico = wrapper.find('i')

    expect(ico.classes('fa-plus')).toBeTruthy()

});

test('Debe mostrar el icono por argumento: fa-circle', () => {

    const wrapper = shallowMount(Fab, {
        props: {
            icon: 'fa-circle'
        }
    })

    const ico = wrapper.find('i')

    expect(ico.classes('fa-circle')).toBeTruthy()

});

test('Debe emitir el evento on:click cuando se hace click', () => {

    const wrapper = shallowMount(Fab)

    wrapper.find('button').trigger('click')

    expect(wrapper.emitted('on:click')).toBeTruthy()

});

})