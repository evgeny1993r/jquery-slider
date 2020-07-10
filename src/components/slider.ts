import $ from 'jquery'

class Slider {
    private $slider: JQuery

    public constructor(position: string) {
        this.$slider = $('<div/>', {
            class: `slider slider_${position}`
        })
    }

    public getSlider(): JQuery {
        return this.$slider
    }
}

export {
    Slider
}