import $ from 'jquery'

import { ScaleValue } from '../../src/components/scale-value'

describe('Testing ScaleValue with position: "gorizontal" ', () => {
    const _ = new ScaleValue('gorizontal')

    test('Method getScaleValue must be defined and return component $scale_value', () => {
        expect(_.getScaleValue).toBeDefined()
        expect(_.getScaleValue()).toEqual($('<div />', { class: 'slider__scale-value' }))
    })

    test('Event updataPositionRunner should return position', () => {
        const $scale_value = _.getScaleValue()
        $scale_value.on('updataPositionRunner', (e, data) => expect(data).toHaveProperty('position'))
        $scale_value.click()
    })

    test('Method updataRenderScaleValue must be defined', () => {
        expect(_.updataRenderScaleValue).toBeDefined()
    })

    test('Method updataRenderScaleValue should updata width', () => {
        const $scale_value = _.getScaleValue()
        _.updataRenderScaleValue!(150)
        expect($scale_value.css('width')).toBe('150px')
    })

    test('Method updataRenderScaleValue should updata width and indent', () => {
        const $scale_value = _.getScaleValue()
        _.updataRenderScaleValue!(300, 400)
        expect($scale_value.css('width')).toBe('300px')
        expect($scale_value.css('transform')).toBe('translateX(400px)')
    })
})

describe('Testing ScaleValue with position: "vertical" ', () => {
    const _ = new ScaleValue('vertical')

    test('Method getScaleValue must be defined and return component $scale_value', () => {
        expect(_.getScaleValue).toBeDefined()
        expect(_.getScaleValue()).toEqual($('<div />', { class: 'slider__scale-value' }))
    })

    test('Event updataPositionRunner should return position', () => {
        const $scale_value = _.getScaleValue()
        $scale_value.on('updataPositionRunner', (e, data) => expect(data).toHaveProperty('position'))
        $scale_value.click()
    })

    test('Method updataRenderScaleValue must be defined', () => {
        expect(_.updataRenderScaleValue).toBeDefined()
    })

    test('Method updataRenderScaleValue should updata height', () => {
        const $scale_value = _.getScaleValue()
        _.updataRenderScaleValue!(180)
        expect($scale_value.css('height')).toBe('180px')
    })

    test('Method updataRenderScaleValue should updata height and indent', () => {
        const $scale_value = _.getScaleValue()
        _.updataRenderScaleValue!(200, 150)
        expect($scale_value.css('height')).toBe('200px')
        expect($scale_value.css('transform')).toBe('translateY(150px)')
    })
})