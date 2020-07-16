import $ from 'jquery'

import { Slider } from '../components/slider'
import { Scale } from '../components/scale'
import { ScaleValue } from '../components/scale-value'
import { Runner } from '../components/runner'
import { WindowValue } from '../components/window-value'

interface Ioptions {
    $this: JQuery
    interval: boolean
    position: string, 
    min_value: number, 
    max_value: number, 
    current_value?: number,
    current_value_min?: number
    current_value_max?: number 
    step: number, 
    show_window_value: boolean, 
    $input: JQuery
}

interface Islider {
    getSlider(): JQuery
}

interface Iscale {
    getScale(): JQuery
}

interface Iscale_value {
    getScaleValue(): JQuery
    updataRenderScaleValue(size: number, indent?: number): void
}

interface Irunner {
    getRunner(): JQuery
    updataRenderRunner(position: number): void
}

interface Iwindow_value {
    getWindowValue(): JQuery
    updataRenderWindowValue(position: number, value: string): void
}

class View {
    private $this: JQuery
    private interval: boolean
    private position: string
    private min_value: number 
    private max_value: number 
    private current_value?: number
    private current_value_min?: number
    private current_value_max?: number 
    private step: number
    private show_window_value: boolean
    private $input?: JQuery

    private view_min_value: number 
    private view_max_value: number 
    private view_current_value?: number
    private view_current_value_min?: number
    private view_current_value_max?: number 

    private slider: Islider
    private scale: Iscale
    private scale_value: Iscale_value
    private runner?: Irunner
    private runner_min?: Irunner
    private runner_max?: Irunner
    private window_value?: Iwindow_value
    private window_value_min?: Iwindow_value
    private window_value_max?: Iwindow_value

    private $slider: JQuery
    private $scale: JQuery
    private $scale_value: JQuery
    private $runner?: JQuery
    private $runner_min?: JQuery
    private $runner_max?: JQuery
    private $window_value?: JQuery
    private $window_value_min?: JQuery
    private $window_value_max?: JQuery

    private position_$scale: number
    private unit_value: number 

    public updataCurrentValue?(value: number): void
    private updataRenderCurrentValue?(): void
    public updataCurrentValueMin?(value: number): void
    private updataRenderCurrentValueMin?(): void
    public updataCurrentValueMax?(value: number): void
    private updataRenderCurrentValueMax?(): void

    public constructor(options: Ioptions) {
        this.$this = options.$this
        this.interval = options.interval
        this.position = options.position
        this.min_value = options.min_value
        this.max_value = options.max_value
        this.step = options.step
        this.show_window_value = options.show_window_value
        this.$input = options.$input

        this.view_min_value = this.min_value - this.min_value
        this.view_max_value = this.max_value - this.min_value 

        if(!this.interval) {
            this.current_value = options.current_value
            this.view_current_value = this.current_value! - this.min_value
        } else if(this.interval) {
            this.current_value_min = options.current_value_min
            this.view_current_value_min = this.current_value_min! - this.min_value
            this.current_value_max = options.current_value_max
            this.view_current_value_max = this.current_value_max! - this.min_value
        }

        this.slider = new Slider(this.position)
        this.scale = new Scale(this.position)
        this.scale_value = new ScaleValue(this.position)

        if(!this.interval) {
            this.runner = new Runner(this.position, 'updataPositionRunner')
            this.window_value = new WindowValue(this.position)
        } else if(this.interval) {
            this.runner_min = new Runner(this.position, 'updataPositionRunnerMin')
            this.runner_max = new Runner(this.position, 'updataPositionRunnerMax')
            this.window_value_min = new WindowValue(this.position)
            this.window_value_max = new WindowValue(this.position)
        }

        this.$slider = this.slider.getSlider()
        this.$scale = this.scale.getScale()
        this.$scale_value = this.scale_value.getScaleValue()

        if(!this.interval) {
            this.$runner = this.runner!.getRunner()
            this.$window_value = this.window_value!.getWindowValue()
        } else if(this.interval) {
            this.$runner_min = this.runner_min!.getRunner()
            this.$runner_max = this.runner_max!.getRunner()
            this.$window_value_min = this.window_value_min!.getWindowValue()
            this.$window_value_max = this.window_value_max!.getWindowValue()
        }
       
        this.position_$scale = 0
        this.unit_value = 0

    }

    public init(): void {
        if(!this.interval) {
            this.updataCurrentValue = function(value) {
                this.current_value = value
                this.view_current_value = value - this.min_value
                this.updataRenderCurrentValue!()
            }

            this.updataRenderCurrentValue = function() {
                this.runner!.updataRenderRunner(this.view_current_value! * this.unit_value)
                this.scale_value.updataRenderScaleValue(this.view_current_value! * this.unit_value)

                if(this.show_window_value) {
                    this.window_value!.updataRenderWindowValue(this.view_current_value! * this.unit_value, `${this.current_value!}`)
                }

                if(this.$input) {
                    this.$input.val(this.current_value!)
                }
            }
        } else if(this.interval) {
            this.updataCurrentValueMin = function(value) {
                this.current_value_min = value
                this.view_current_value_min = value - this.min_value
                this.updataRenderCurrentValueMin!()
            }

            this.updataRenderCurrentValueMin = function() {
                this.runner_min!.updataRenderRunner(this.view_current_value_min! * this.unit_value)
                this.scale_value.updataRenderScaleValue((this.view_current_value_max! - this.view_current_value_min!) * this.unit_value, this.view_current_value_min! * this.unit_value)

                if(this.show_window_value) {
                    this.window_value_min!.updataRenderWindowValue(this.view_current_value_min! * this.unit_value, `${this.current_value_min!}`)
                }

                if(this.$input!.length) {
                    const current_value_min = Math.sign(this.current_value_min!) === -1 ? `(${this.current_value_min})` : this.current_value_min
                    const current_value_max = Math.sign(this.current_value_max!) === -1 ? `(${this.current_value_max})` : this.current_value_max
                    this.$input!.val(`${current_value_min} - ${current_value_max}`)
                }
            }

            this.updataCurrentValueMax = function(value) {
                this.current_value_max = value
                this.view_current_value_max = value - this.min_value
                this.updataRenderCurrentValueMax!()
            }

            this.updataRenderCurrentValueMax = function() {
                this.runner_max!.updataRenderRunner(this.view_current_value_max! * this.unit_value)
                this.scale_value.updataRenderScaleValue((this.view_current_value_max! - this.view_current_value_min!) * this.unit_value)

                if(this.show_window_value) {
                    this.window_value_max!.updataRenderWindowValue(this.view_current_value_max! * this.unit_value, `${this.current_value_max!}`)
                }

                if(this.$input!.length) {
                    const current_value_min = Math.sign(this.current_value_min!) === -1 ? `(${this.current_value_min})` : this.current_value_min
                    const current_value_max = Math.sign(this.current_value_max!) === -1 ? `(${this.current_value_max})` : this.current_value_max
                    this.$input!.val(`${current_value_min} - ${current_value_max}`)
                }
            }
        }

        $(this.$this)
            .append(this.$slider
                .append(this.$scale)
                .append(this.$scale_value))
                if(!this.interval) {
                    this.$slider
                        .append(this.$runner!)
                        if(this.show_window_value) {
                            this.$slider.append(this.$window_value!)
                        }   
                } else if(this.interval) {
                    this.$slider
                        .append(this.$runner_min!)
                        .append(this.$runner_max!)
                        if(this.show_window_value) {
                            this.$slider.append(this.$window_value_min!)
                            this.$slider.append(this.$window_value_max!)
                        }
                }
        
        this.position_$scale = this.position === 'gorizontal' ? this.$scale.position().left : this.$scale.position().top
        this.unit_value = this.position === 'gorizontal' ? this.$scale.outerWidth()! / this.view_max_value : this.$scale.outerHeight()! / this.view_max_value

        if(!this.interval) {
            this.updataRenderCurrentValue!()
        } else if(this.interval) {
            this.updataRenderCurrentValueMin!()
            this.updataRenderCurrentValueMax!()
        }

        if(!this.interval) {
            const elements: JQuery[] =  [this.$runner!, this.$scale, this.$scale_value]
            elements.forEach((el) => {
                el.on('updataPositionRunner', (e, data) => {
                    this.$this.trigger('updataCurrentValue', {
                        current_value: (Math.round((((data.position - this.position_$scale) / this.unit_value) + this.min_value) / this.step)) * this.step
                    })
                })
            })        
            
            if(this.$input!.length) {
                this.$input!.on('change', () => {
                    const value = Number(this.$input!.val())
                    this.$this.trigger('updataCurrentValue', {
                        current_value: value
                    })
                })
            }
        } else if(this.interval) {
            this.$runner_min!.on('updataPositionRunnerMin', (e, data) => {
                this.$this.trigger('updataCurrentValueMin', {
                    current_value_min: (Math.round((((data.position - this.position_$scale) / this.unit_value) + this.min_value) / this.step)) * this.step
                })
            })

            this.$runner_max!.on('updataPositionRunnerMax', (e, data) => {
                this.$this.trigger('updataCurrentValueMax', {
                    current_value_max: (Math.round((((data.position - this.position_$scale) / this.unit_value) + this.min_value) / this.step)) * this.step
                })
            })

            this.$scale.on('updataPositionRunner', (e, data) => {
                const value = (Math.round((((data.position - this.position_$scale) / this.unit_value) + this.view_min_value) / this.step)) * this.step
                if(value > this.view_current_value_max!) {
                    this.$this.trigger('updataCurrentValueMax', {
                        current_value_max: (Math.round((((data.position - this.position_$scale) / this.unit_value) + this.min_value) / this.step)) * this.step
                    })
                } else if(value < this.view_current_value_min!) {
                    this.$this.trigger('updataCurrentValueMin', {
                        current_value_min: (Math.round((((data.position - this.position_$scale) / this.unit_value) + this.min_value) / this.step)) * this.step
                    })
                }
            })

            this.$scale_value.on('updataPositionRunner', (e, data) => {
                const value = (Math.round((((data.position - this.position_$scale) / this.unit_value) + this.view_min_value) / this.step)) * this.step
                const test_value = (this.view_current_value_min! + this.view_current_value_max!) / 2

                if(value > test_value) {
                    this.$this.trigger('updataCurrentValueMax', {
                        current_value_max: (Math.round((((data.position - this.position_$scale) / this.unit_value) + this.min_value) / this.step)) * this.step
                    })
                } else if(value < test_value) {
                    this.$this.trigger('updataCurrentValueMin', {
                        current_value_min: (Math.round((((data.position - this.position_$scale) / this.unit_value) + this.min_value) / this.step)) * this.step
                    })  
                }
            })

            if(this.$input!.length) {
                this.$input!.on('change', () => {
                    if(this.$input!.val()) {
                        const val = String(this.$input!.val())
                        
                        this.$this.trigger('updataCurrentValueMin', {
                            current_value_min: Number(val.match(/\-?\d+/g)![0])
                        })

                        this.$this.trigger('updataCurrentValueMax', {
                            current_value_max: Number(val.match(/\-?\d+/g)![1])
                        })
                    }
                })
            }
        }
    }
}

export {
    View
}