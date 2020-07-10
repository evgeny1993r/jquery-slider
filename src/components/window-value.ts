import $ from 'jquery'

class WindowValue {
    private $window_value: JQuery 

    public constructor() {
        this.$window_value = $('<div/>', {
            class: 'slider__window-value'
        })
    }

    public getWindowValue(): JQuery {
        return this.$window_value
    }

    public updataRenderWindowValue(position_X: number, value: number): void {
        this.$window_value.css({'transform': `translateX(${position_X}px)`})
        this.$window_value.text(value)
    }
}

export {
    WindowValue
}