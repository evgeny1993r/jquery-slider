import $, { isArray } from 'jquery'

import { Presenter } from './mvp/presenter'

import './index.scss'

declare global {
    interface JQuery {
        slider(options?: Ioptions): JQuery
    }
}

interface Ipresenter {
    init(): JQuery
    setCurrentValue?(value: number): void
    setCurrentValues?(value: number[]): void
}

interface Ioptions {
    position?: string
    interval?: boolean
    min_value?: number
    max_value?: number
    current_value?: number 
    current_value_min?: number
    current_value_max?: number 
    step?: number
    show_window_value?: boolean
    $input?: JQuery,
    symbol?: string
}

(function($) {
    let presenter: Ipresenter

    const methods = {
        init: ($this: JQuery, options?: Ioptions) => {
            const newOptions = $.extend({
                position: 'gorizontal',
                interval: false,
                min_value: 0,
                max_value: 100,
                current_value: !options || options && !options.interval ? 0 : undefined,
                current_value_min: options && options.interval ? 0 : undefined,
                current_value_max: options && options.interval ? 100 : undefined,
                step: 1,
                show_window_value: false,
                $input: $(),
                symbol: ''
            }, options)
            presenter = new Presenter($this, newOptions)
            return presenter.init()   
        },

        setCurrentValue: (value: number) =>  presenter.setCurrentValue!(value),
        setCurrentValues: (value: number[]) => presenter.setCurrentValues!(value)
    }

    $.fn.slider = function(key?: Ioptions | string, value?: number | number[]) {
        if(!key) {
            methods.init(this)
            return this
        } else if(typeof key === 'object') {
            methods.init(this, key)
            return this
        } else if(key === 'setCurrentValue' && typeof(value) === 'number') {
            methods.setCurrentValue(value)
            return this
        } else if(key === 'setCurrentValues' && isArray(value)) {
            methods.setCurrentValues(value)
            return this
        } else {
            throw Error(`${key} no such method`)
        }
    }
})($)