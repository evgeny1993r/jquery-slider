import $ from 'jquery'

class Slider {
    private $slider: JQuery

    public constructor() {
        this.$slider = $('<div/>', {
            class: 'slider'
        })
    }

    public getSlider(): JQuery {
        return this.$slider
    }
}

export {
    Slider
}