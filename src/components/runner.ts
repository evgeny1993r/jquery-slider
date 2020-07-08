import $ from 'jquery'

class Runner {
    $runner: JQuery

    public constructor() {
        this.$runner = $('<div/>', {
            class: 'slider__runner',
            on: {
                mousedown: () => {
                    this.$runner.on('mousemove', (e) => {
                        this.$runner.trigger('updataPositionRunner', {
                            position_runner_X: e.pageX
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

    public updataPositionRunner(value: number): void {
        this.$runner.css({'transform': `translateX(${value}px)`})
    }
}

export {
    Runner
}