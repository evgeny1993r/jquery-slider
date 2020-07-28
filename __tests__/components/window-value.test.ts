import $ from 'jquery'

import { WindowValue } from '../../src/components/window-value'

describe('Testing WindowValue with position: "gorizontal" ', () => {
    const _ = new WindowValue('gorizontal')

    test('Method getWindowValue must be defined and return component $window_value', () => {
        expect(_.getWindowValue).toBeDefined()
        expect(_.getWindowValue()).toEqual($('<div />', { class: 'slider__window-value' }))
    })

    test('Method updataRenderWindowValue must be defined and updata value, and move $window_value', () => {
        expect(_.updataRenderWindowValue).toBeDefined()
        const $window_value = _.getWindowValue()
        _.updataRenderWindowValue(100, '250')
        expect($($window_value).css('transform')).toBe('translateX(100px)')
        expect($($window_value).text()).toBe('250')
    })
})

describe('Testing WindowValue with position: "vertical" ', () => {
    const _ = new WindowValue('vertical')

    test('Method getWindowValue must be defined and return component $window_value', () => {
        expect(_.getWindowValue).toBeDefined()
        expect(_.getWindowValue()).toEqual($('<div />', { class: 'slider__window-value' }))
    })

    test('Method updataRenderWindowValue must be defined and updata value, and move $window_value', () => {
        expect(_.updataRenderWindowValue).toBeDefined()
        const $window_value = _.getWindowValue()
        _.updataRenderWindowValue(150, '300')
        expect($($window_value).css('transform')).toBe('translateY(150px)')
        expect($($window_value).text()).toBe('300')
    })
})
