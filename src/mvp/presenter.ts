import { Model } from './model'
import { View } from './view'

interface Ioptions {
    min_value: number
    max_value: number 
    current_value: number 
    step: number
    show_window_value: boolean
}

interface Imodel {
    getCurrentValue(): number
    setCurrentValue(value: number): void
}

interface Iview {
    init(): void
    updataView(value: number): void
}

class Presenter {
    private $this: JQuery

    private model: Imodel
    private view: Iview

    public constructor($this: JQuery, { min_value, max_value, current_value, step, show_window_value }: Ioptions) {
        this.$this = $this

        this.model = new Model(min_value, max_value, current_value)
        this.view = new View(this.$this, min_value, max_value, current_value, step, show_window_value)
    }

    public init(): JQuery {
        this.view.init()

        this.$this.on('updataCurrentValue', (e, data) => {
            this.model.setCurrentValue(data.current_value)
            this.view.updataView(this.model.getCurrentValue())
        })
        
        return this.$this
    }
}

export {
    Presenter
}