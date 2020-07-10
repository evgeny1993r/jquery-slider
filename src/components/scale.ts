import $ from 'jquery'

class Scale {
    private $scale: JQuery

    public constructor() {
        this.$scale = $('<div/>', {
            class: 'slider__scale',
            on: {
                click: (e: JQueryEventObject) => {
                    this.$scale.trigger('updataPosition', {
                        position_X: e.pageX
                    })
                }
            }
        })
    }

    public getScale(): JQuery {
        return this.$scale
    }
}

export {
    Scale
}