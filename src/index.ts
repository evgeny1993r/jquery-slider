import $ from 'jquery'

import { Presenter } from './mvp/presenter'

import './index.scss'

declare global {
    interface JQuery {
        slider(options?: Ioptions): JQuery
    }
}

interface Ioptions {
    min_value?: number
    max_value?: number
    current_value?: number
    step?: number
    show_window_value?: boolean
}

(function($) {
    $.fn.slider = function(options) {
        const newOptions = $.extend({
            min_value: 0,
            max_value: 100,
            current_value: 0,
            step: 1,
            show_window_value: false
        }, options)
        return this.add(new Presenter(this, newOptions).init())
    }
})($)

$(document).ready(() => {
    $('#test').slider({
        min_value: - 1000,
        max_value: 1000,
        current_value: 0,
        step: 5,
        show_window_value: true
    })
})