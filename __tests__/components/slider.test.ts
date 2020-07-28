import $ from 'jquery'

import { Slider } from '../../src/components/slider'

describe('Testing Slider with position: "gorizontal" ', () => {
    const _ = new Slider('gorizontal')

    test('Method getSlider must be defined and return component $slider', () => {
        expect(_.getSlider).toBeDefined()
        expect(_.getSlider()).toEqual($('<div />', { class: 'slider slider_gorizontal' }))
    })
})

describe('Testing Slider with position: "vertical" ', () => {
    const _ = new Slider('vertical')

    test('Method getSlider must be defined and return component $slider', () => {
        expect(_.getSlider).toBeDefined()
        expect(_.getSlider()).toEqual($('<div />', { class: 'slider slider_vertical' }))
    })
})