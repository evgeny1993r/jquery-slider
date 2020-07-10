import $ from 'jquery'

class Runner {
    private $runner: JQuery

    public constructor() {
        this.$runner = $('<div/>', {
            class: 'slider__runner',
            on: {
                mousedown: () => {
                    this.$runner.on('mousemove', (e) => {
                        this.$runner.trigger('updataPosition', {
                            position_X: e.pageX
                        })
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

    public updataRenderRunner(position_X: number): void {
        this.$runner.css({'transform': `translateX(${position_X}px)`})
    }
}

export {
    Runner
}