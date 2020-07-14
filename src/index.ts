import $ from 'jquery'

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
    setCurrentValues?(value: string): void
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
    $input?: JQuery
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
                $input: $()
            }, options)
            presenter = new Presenter($this, newOptions)
            return presenter.init()   
        },

        setCurrentValue: (value: number) =>  presenter.setCurrentValue!(value),

        setCurrentValues: (value: string) => presenter.setCurrentValues!(value)
    }

    $.fn.slider = function(key?: Ioptions | string, value?: any) {
        if(!key) {
            methods.init(this)
            return this
        } else if(typeof key === 'object') {
            methods.init(this, key)
            return this
        } else if(key === 'setCurrentValue' && value !== undefined) {
            methods.setCurrentValue(value)
            return this
        } else if(key === 'setCurrentValues' && value !== undefined) {
            methods.setCurrentValues(value)
            return this
        } else {
            return this
        }
    }
})($)