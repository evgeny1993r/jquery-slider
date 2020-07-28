import $ from 'jquery'

class WindowValue {
    private position: string
    private $window_value: JQuery 

    public constructor(position: string) {
        this.position = position
        this.$window_value = $('<div/>', {
            class: 'slider__window-value'
        })
    }

    public getWindowValue(): JQuery {
        return this.$window_value
    }

    public updataRenderWindowValue(position: number, value: string): void {
        if(this.position === 'gorizontal') {
            this.$window_value.css({'transform': `translateX(${position}px)`})
        }
        if(this.position === 'vertical') {
            this.$window_value.css({'transform': `translateY(${position}px)`})
        }
        this.$window_value.text(value)
    }
}

export {
    WindowValue
}