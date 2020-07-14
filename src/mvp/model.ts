interface Ioptions {
    interval: boolean
    min_value: number
    max_value: number
    current_value?: number
    current_value_min?: number
    current_value_max?: number
}

class Model {
    private interval: boolean
    private min_value: number
    private max_value: number 
    private current_value?: number
    private current_value_min?: number
    private current_value_max?: number

    public getCurrentValue?(): number
    public setCurrentValue?(value: number): void
    public getCurrentValueMin?(): number
    public setCurrentValueMin?(value: number): void
    public getCurrentValueMax?(): number
    public setCurrentValueMax?(value: number): void

    public constructor(options: Ioptions) {
        this.interval = options.interval
        this.min_value = options.min_value
        this.max_value = options.max_value
        if(this.interval) {
            this.current_value_min = options.current_value_min
            this.current_value_max = options.current_value_max
        } else if(!this.interval) {
            this.current_value = options.current_value
        }
    }

    public init(): void {
        if(!this.interval) {
            this.getCurrentValue = function() {
                return this.current_value!
            }
            this.setCurrentValue = function(value) {
                if(value < this.min_value || value > this.max_value) return 
                this.current_value = value
            }
        } else if(this.interval) {
            this.getCurrentValueMin = function() {
                return this.current_value_min!
            }
            this.setCurrentValueMin = function(value) {
                if(value < this.min_value! || value > this.current_value_max!) return
                this.current_value_min = value
            }
            this.getCurrentValueMax = function() {
                return this.current_value_max!
            }
            this.setCurrentValueMax = function(value) {
                if(value < this.current_value_min! || value > this.max_value) return
                this.current_value_max = value
            }
        }
    }
}

export {
    Model
}