import $ from 'jquery'

import { Presenter } from '../../src/mvp/presenter'

describe('Testing Presenter with interval: false', () => {
    $('body').append('<div id="slider-one"></div>')

    const _ = new Presenter($('#slider-one'), { position: 'gorizontal', interval: false, min_value: 0, max_value: 100, current_value: 0, step: 1, show_window_value: false, $input: $(), symbol: '' })

    test('Method init must be defined', () => {
        expect(_.init).toBeDefined()
    })

    beforeAll(() => {
        _.init()
    })

    test('Method init shoul create setCurrentValue. Method setCurrentValues must be defined', () => {
        expect(_.setCurrentValue).toBeDefined()
        expect(_.setCurrentValues).toBeUndefined()
    })

    test('Method setCurrentValue should updata model.current_value, view.current_value, view.view_current_value', () => {
        _.setCurrentValue!(100)
        expect(_).toHaveProperty('model.current_value', 100)
        expect(_).toHaveProperty('view.current_value', 100)
        expect(_).toHaveProperty('view.view_current_value', 100)
    })

    test('Event updataCurrentValue should updata model.current_value, view.current_value, view.view_current_value', () => {
        $('#slider-one').trigger('updataCurrentValue', { current_value: 70 })
        expect(_).toHaveProperty('model.current_value', 70)
        expect(_).toHaveProperty('view.current_value', 70)
        expect(_).toHaveProperty('view.view_current_value', 70)
    })
})

describe('Testing Presenter with interval: true', () => {
    $('body').append('<div id="slider-two"></div>')

    const _ = new Presenter($('#slider-two'), { position: 'gorizontal', interval: true, min_value: 0, max_value: 100, current_value_min: 25, current_value_max: 75, step: 1, show_window_value: false, $input: $(), symbol: '' })

    test('Method init must be defined', () => {
        expect(_.init).toBeDefined()
    })

    beforeAll(() => {
        _.init()
    })

    test('Method init shoul create setCurrentValues. Method setCurrentValue must be defined', () => {
        expect(_.setCurrentValues).toBeDefined()
        expect(_.setCurrentValue).toBeUndefined()
    })

    test(`Method setCurrentValues should updata model.current_value_min, view.current_value_min, view.view_current_value_min, 
        model.current_value_max, view.current_value_max, view.view_current_value_max`, () => {
        _.setCurrentValues!([40, 60])
        expect(_).toHaveProperty('model.current_value_min', 40)
        expect(_).toHaveProperty('view.current_value_min', 40)
        expect(_).toHaveProperty('view.view_current_value_min', 40)
        expect(_).toHaveProperty('model.current_value_max', 60)
        expect(_).toHaveProperty('view.current_value_max', 60)
        expect(_).toHaveProperty('view.view_current_value_max', 60)
    })
})