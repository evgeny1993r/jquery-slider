import $ from 'jquery'

class Scale {
    $scale: JQuery

    public constructor() {
        this.$scale = $('<div/>', {
            class: 'slider__scale'
        })
    }

    public getScale(): JQuery {
        return this.$scale
    }
}

export {
    Scale
}