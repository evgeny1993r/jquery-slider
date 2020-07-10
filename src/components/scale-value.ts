import $ from 'jquery'

class ScaleValue {
    private $scale_value: JQuery

    public constructor() {
        this.$scale_value = $('<div/>', {
            class: 'slider__scale-value',
            on: {
                click: (e: JQueryEventObject) => {
                    this.$scale_value.trigger('updataPosition', {
                        position_X: e.pageX
                    })
                }
            }
        })
    }

    public getScaleValue(): JQuery {
        return this.$scale_value
    }

    public updataRenderScaleValue(width: number): void {
        this.$scale_value.css({ 'width': `${width}px`})
    }
}

export {
    ScaleValue
}