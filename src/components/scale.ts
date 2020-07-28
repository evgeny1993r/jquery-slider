import $ from 'jquery'

class Scale {
    private position: string
    private $scale: JQuery

    public constructor(position: string) {
        this.position = position
        this.$scale = $('<div/>', {
            class: 'slider__scale',
            on: {
                click: (e: JQueryEventObject) => {
                    if(this.position === 'gorizontal') {
                        this.$scale.trigger('updataPositionRunner', {
                            position: e.pageX
                        }) 
                    }
                    if(this.position === 'vertical') {
                        this.$scale.trigger('updataPositionRunner', {
                            position: e.pageY
                        })
                    }
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