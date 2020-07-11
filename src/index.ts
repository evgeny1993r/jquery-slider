import jQuery from 'jquery'

import { Presenter } from './mvp/presenter'

import './index.scss'

declare global {
    interface JQuery {
        slider(options?: Ioptions): JQuery
    }
}

interface Ipresenter {
    init(): JQuery
    setCurrentValue(value: number): void
}

interface Ioptions {
    position?: string
    min_value?: number
    max_value?: number
    current_value?: number
    step?: number
    show_window_value?: boolean
    $input?: JQuery | null
}

(function($) {

    let presenter: Ipresenter

    const methods = {
        init: ($this: JQuery, options?: Ioptions) => { 
            const newOptions = $.extend({
                position: 'gorizontal',
                min_value: 0,
                max_value: 100,
                current_value: 0,
                step: 1,
                show_window_value: false,
                $input: null
            }, options)

            presenter = new Presenter($this, newOptions)
            return presenter.init()
        },

        setCurrentValue: (value: number) => presenter.setCurrentValue(value)
    }

    $.fn.slider = function(key?: Ioptions | string | undefined, value?: number | undefined) {
        if(!key) {
            methods.init(this)
            return this
        } else if(typeof key === 'object') {
            methods.init(this, key)
            return this
        } else if(key === 'setCurrentValue' && value !== undefined) {
            methods.setCurrentValue(value)
            return this
        } else {
            return this
        }
    }

    const test = $('#test').slider({
        min_value: -100,
        $input: $('#input-test')
    })

    
})(jQuery)