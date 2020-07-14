import $ from 'jquery'

class ScaleValue {
    private position: string
    private $scale_value: JQuery

    public constructor(position: string) {
        this.position = position
        this.$scale_value = $('<div/>', {
            class: 'slider__scale-value',
            on: {
                click: (e: JQueryEventObject) => {
                    if(this.position === 'gorizontal') {
                        this.$scale_value.trigger('updataPositionRunner', {
                            position: e.pageX
                        })
                    } else if(this.position === 'vertical') {
                        this.$scale_value.trigger('updataPositionRunner', {
                            position: e.pageY
                        })
                    }
                }
            }
        })
    }

    public getScaleValue(): JQuery {
        return this.$scale_value
    }

    public updataRenderScaleValue(size: number, indent?: number): void {
        if(this.position === 'gorizontal') {
            this.$scale_value.css({ 'width': `${size}px`})

            if(typeof(indent) === 'number') {
                this.$scale_value.css({'transform': `translateX(${indent}px)`})                
            }
        } else if(this.position === 'vertical') {
            this.$scale_value.css({ 'height': `${size}px`})
            
            if(typeof(indent) === 'number') { 
                this.$scale_value.css({'transform': `translateY(${indent}px)`})   
            }
        }
    }
}

export {
    ScaleValue
}