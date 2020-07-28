import $ from 'jquery'

class Runner {
    private position: string
    private $runner: JQuery

    public constructor(position: string, event_name: string) {
        this.position = position
        this.$runner = $('<div/>', {
            class: 'slider__runner',
            on: {
                mousedown: () => {
                    this.$runner.on('mousemove', (e) => {
                        if(this.position === 'gorizontal') {
                            this.$runner.trigger(event_name, {
                                position: e.pageX
                            })    
                        }
                        if(this.position === 'vertical') {
                            this.$runner.trigger(event_name, {
                                position: e.pageY
                            }) 
                        }   
                    })
                    $(document).on('mouseup', () => {
                        this.$runner.off('mousemove')
                    })
                }
            }
        })
    }

    public getRunner(): JQuery {
        return this.$runner
    }

    public updataRenderRunner(position: number): void {
        if(this.position === 'gorizontal') {
            this.$runner.css({'transform': `translateX(${position}px)`})
        }
        if(this.position === 'vertical') {
            this.$runner.css({'transform': `translateY(${position}px)`})
        }
    }
}

export {
    Runner
}