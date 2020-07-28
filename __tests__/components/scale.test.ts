import $ from 'jquery'

import { Scale } from '../../src/components/scale'

describe('Testing Scale with position: "gorizontal" ', () => {
    const _ = new Scale('gorizontal')

    test('Method getScale must be defined and return component $scale', () => {
        expect(_.getScale).toBeDefined()
        expect(_.getScale()).toEqual($('<div />', { class: 'slider__scale' }))
    })

    test('Event updataPositionRunner should return position', () => {
        const $scale = _.getScale()
        $scale.on('updataPositionRunner', (e, data) => expect(data).toHaveProperty('position'))
        $scale.click()
    })
})

describe('Testing Scale with position: "vertical" ', () => {
    const _ = new Scale('vertical')

    test('Method getScale must be defined and return component $scale', () => {
        expect(_.getScale).toBeDefined()
        expect(_.getScale()).toEqual($('<div />', { class: 'slider__scale' }))
    })

    test('Event updataPositionRunner should return position', () => {
        const $scale = _.getScale()
        $scale.on('updataPositionRunner', (e, data) => expect(data).toHaveProperty('position'))
        $scale.click()
    })
})