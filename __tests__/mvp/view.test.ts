import $, { data } from 'jquery'

import { View } from '../../src/mvp/view'

describe('Testing View with: interval: false', () => {
    $('body').append('<div id="slider-one"></div> <input type="text" id="input-slider-one" />')

    const _ = new View({
        $this: $('#slider-one'),
        interval: false,
        position: 'gorizontal',
        min_value: -100,
        max_value: 100,
        current_value: 0,
        step: 10,
        show_window_value: true,
        $input: $('#input-slider-one'),
        symbol: '$'
    })

    test('Method init must be defined', () => {
        expect(_.init).toBeDefined()
    })

    beforeEach(() => {
        _.init()
    })

    test('Method init should create method updataCurrentValue. Methods updataCurrentValueMin, updataCurrentValueMax must be undefined', () => {
        expect(_.updataCurrentValue).toBeDefined()
        expect(_.updataCurrentValueMin).toBeUndefined()
        expect(_.updataCurrentValueMax).toBeUndefined()
    })

    test('Method updataCurrentValue should updata current_value, view_current_value. Should updata value in $window_value and $input', () => {
        _.updataCurrentValue!(-50)
        expect(_).toHaveProperty('current_value', -50)
        expect(_).toHaveProperty('view_current_value', 50)
        expect($('#slider-one').find('.slider__window-value').text()).toBe('-50')
        expect($('#input-slider-one').val()).toBe('-50$')
    })

    test('Testing event updataCurrentValue, updataPositionRunner on $runner, $scale, $scale_value', () => {
        $('#slider-one').on('updataCurrentValue', (e, data) => expect(data).toHaveProperty('current_value'))
        $('#slider-one').find('.slider__runner').trigger('updataPositionRunner', { position: 100 })
        $('#slider-one').find('.slider__scale').trigger('updataPositionRunner', { position: 90 })
        $('#slider-one').find('.slider__scale-value').trigger('updataPositionRunner', { position: 80 })
        $('#input-slider-one').trigger('change', { current_value: 30})
    })
})

describe('Testing View with: interval: true', () => {
    $('body').append('<div id="slider-two" style="width: 100px; height: 20px;"></div> <input type="text" id="input-slider-two" />')

    const _ = new View({
        $this: $('#slider-two'),
        interval: true,
        position: 'vertical',
        min_value: -200,
        max_value: 200,
        current_value_min: -150,
        current_value_max: -100,
        step: 5,
        show_window_value: true,
        $input: $('#input-slider-two'),
        symbol: '$'
    })

    test('Method init must be defined', () => {
        expect(_.init).toBeDefined()
    })

    beforeEach(() => {
        _.init()
    })

    test('Method init should create methods updataCurrentValueMin, updataCurrentValueMax. Method updataCurrentValue must be undefined', () => {
        expect(_.updataCurrentValueMin).toBeDefined()
        expect(_.updataCurrentValueMax).toBeDefined()
        expect(_.updataCurrentValue).toBeUndefined()
    })

    test('Method updataCurrentValueMin should updata current_value_min, view_current_value_min. Should updata value in $window_value and $input', () => {
        _.updataCurrentValueMin!(-180)
        expect(_).toHaveProperty('current_value_min', -180)
        expect(_).toHaveProperty('view_current_value_min', 20)
        expect($($('#slider-two').find('.slider__window-value')[0]).text()).toBe('-180')
        expect($('#input-slider-two').val()).toBe('(-180$) - (-100$)')
    })

    test('Method updataCurrentValueMax should updata current_value_max, view_current_value_max. Should updata value in $window_value and $input', () => {
        _.updataCurrentValueMax!(-50)
        expect(_).toHaveProperty('current_value_max', -50)
        expect(_).toHaveProperty('view_current_value_max', 150)
        expect($($('#slider-two').find('.slider__window-value')[1]).text()).toBe('-50')
        expect($('#input-slider-two').val()).toBe('(-180$) - (-50$)')
    })

    test('Testing metod updataCurrentValueMin, updataPositionRunnerMin on $runner_min', () => {
        $('#slider-two').on('updataCurrentValueMin', (e, data) => expect(data).toHaveProperty('current_value_min'))
        $($('#slider-two').find('.slider__runner')[0]).trigger('updataPositionRunnerMin', { position: 0 })
    })

    test('Testing event updataCurrentValueMax, updataPositionRunnerMin on $runner_max', () => {
        $('#slider-two').on('updataCurrentValueMax', (e, data) => expect(data).toHaveProperty('current_value_max'))
        $($('#slider-two').find('.slider__runner')[1]).trigger('updataPositionRunnerMax', { position: 50 })
    })

    test('Testng updataCurrentValueMin, updataPositionRunner on $scale', () => {
        $('#slider-two').on('updataCurrentValueMin', (e, data) => expect(data).toHaveProperty('current_value_min'))
        $('#slider-two').find('.slider__scale').trigger('updataPositionRunner', { position: 1 })
    })
    
    test('Testng updataCurrentValueMax, updataPositionRunner on $scale', () => {
        $('#slider-two').on('updataCurrentValueMax', (e, data) => expect(data).toHaveProperty('current_value_max'))
        $('#slider-two').find('.slider__scale').trigger('updataPositionRunner', { position: 60 })
    })

    test('Testng updataCurrentValueMin, updataPositionRunner on $scale_value', () => {
        $('#slider-two').on('updataCurrentValueMin', (e, data) => expect(data).toHaveProperty('current_value_min'))
        $('#slider-two').find('.slider__scale-value').trigger('updataPositionRunner', { position: 10 })
    })
    
    test('Testng updataCurrentValueMax, updataPositionRunner on $scale_value', () => {
        $('#slider-two').on('updataCurrentValueMax', (e, data) => expect(data).toHaveProperty('current_value_max'))
        $('#slider-two').find('.slider__scale-value').trigger('updataPositionRunner', { position: 90 })
    })

    test('Testing updataCurrentValueMin, change on $input', () => {
        $('#input-slider-two').val('40 - 60')
        $('#slider-two').on('updataCurrentValueMin', (e, data) => expect(data).toHaveProperty('current_value_min'))
        $('#slider-two').on('updataCurrentValueMax', (e, data) => expect(data).toHaveProperty('current_value_max'))
        $('#input-slider-two').trigger('change')
    })
})