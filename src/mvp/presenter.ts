import { Model } from './model'
import { View } from './view'

interface Ioptions {
    position: string
    interval: boolean
    min_value: number
    max_value: number 
    current_value?: number
    current_value_min?: number
    current_value_max?: number
    step: number
    show_window_value: boolean
    $input: JQuery,
    symbol: string
}

interface Imodel {
    init(): void
    getCurrentValue?(): number
    setCurrentValue?(value: number): void
    getCurrentValueMin?(): number
    setCurrentValueMin?(value: number): void
    getCurrentValueMax?(): number
    setCurrentValueMax?(value: number): void
}

interface Iview {
    init(): void
    updataCurrentValue?(value: number): void
    updataCurrentValueMin?(value: number): void
    updataCurrentValueMax?(value: number): void
}

class Presenter {
    private $this: JQuery

    private interval: boolean

    private model!: Imodel
    private view!: Iview

    public setCurrentValue?(value: number): void
    public setCurrentValues?(values: number[]): void

    public constructor($this: JQuery, { position, interval, min_value, max_value, current_value, current_value_min, current_value_max, step, show_window_value, $input, symbol }: Ioptions) {
        this.$this = $this

        this.interval = interval

        if(!this.interval) {
            this.model = new Model({ interval, min_value,  max_value, current_value })
            this.view = new View({ $this, position, interval, min_value, max_value, current_value, step, show_window_value, $input, symbol })
        }
        if(this.interval) {
            this.model = new Model({ interval, min_value, max_value, current_value_min, current_value_max })
            this.view = new View({ $this, position, interval, min_value, max_value, current_value_min, current_value_max, step, show_window_value, $input, symbol })
        }
    }

    public init(): JQuery {
        this.model.init()
        this.view.init()

        if(!this.interval) {
            this.$this.on('updataCurrentValue', (e, data) => {
                this.model.setCurrentValue!(data.current_value)
                this.view.updataCurrentValue!(this.model.getCurrentValue!())
            })

            this.setCurrentValue = function(value) {
                this.model.setCurrentValue!(value)
                this.view.updataCurrentValue!(this.model.getCurrentValue!())
            }
        }
        if(this.interval) {
            this.$this.on('updataCurrentValueMin', (e, data) => {
                this.model.setCurrentValueMin!(data.current_value_min)
                this.view.updataCurrentValueMin!(this.model.getCurrentValueMin!())
            })

            this.$this.on('updataCurrentValueMax', (e, data) => {
                this.model.setCurrentValueMax!(data.current_value_max)
                this.view.updataCurrentValueMax!(this.model.getCurrentValueMax!())
            })

            this.setCurrentValues = function(values) {
                this.$this.trigger('updataCurrentValueMin', {
                    current_value_min: values[0]
                })
                
                this.$this.trigger('updataCurrentValueMax', {
                    current_value_max: values[1]
                })
            }
        }
        
        return this.$this
    }
}

export {
    Presenter
}