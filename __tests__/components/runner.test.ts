import $ from 'jquery'

import { Runner } from '../../src/components/runner'

declare global {
    interface JQueryStatic {
        _data(opt1: HTMLElement, opt2: string): JQuery
    }
}

describe('Testing Runner with position: "gorizontal" ', () => {
    const _ = new Runner('gorizontal', 'updataPositiobRunner')

    test('Method getRunner must be defined and return component $runner', () => {
        expect(_.getRunner).toBeDefined()
        expect(_.getRunner()).toEqual($('<div />',{ class: 'slider__runner'}))
    })

    test('Event updataPositionRunner should return position', () => {
        const $runner = _.getRunner()
        $runner.on('updataRunnerPosition', (e, data) => expect(data).toHaveProperty('position'))
        $runner.mousedown().mousemove()
        $(document).mouseup()
        expect($._data($runner[0], 'events').mousemove).toBeUndefined()
    })

    test('Method updataRenderRunner must be defined and move $runner', () => {
        const $runner = _.getRunner()
        expect(_.updataRenderRunner).toBeDefined()
        _.updataRenderRunner(50)
        expect($runner.css('transform')).toBe('translateX(50px)')
    })
})

describe('Testing Runner with position: "vertical" ', () => {
    const _ = new Runner('vertical', 'updataPositiobRunner')

    test('Method getRunner must be defined and return component $runner', () => {
        expect(_.getRunner).toBeDefined()
        expect(_.getRunner()).toEqual($('<div />',{ class: 'slider__runner'}))
    })

    test('Event updataPositionRunner should return position', () => {
        const $runner = _.getRunner()
        $runner.on('updataRunnerPosition', (e, data) => expect(data).toHaveProperty('position'))
        $runner.mousedown().mousemove()
        $(document).mouseup()
        expect($._data($runner[0], 'events').mousemove).toBeUndefined()
    })

    test('Method updataRenderRunner must be defined and move $runner', () => {
        const $runner = _.getRunner()
        expect(_.updataRenderRunner).toBeDefined()
        _.updataRenderRunner(70)
        expect($runner.css('transform')).toBe('translateY(70px)')
    })
})