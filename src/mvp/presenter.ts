import { Model } from './model'
import { View } from './view'

interface Ioptions {
    position: string
    min_value: number
    max_value: number 
    current_value: number 
    step: number
    show_window_value: boolean
    $input: JQuery | null
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

    public constructor($this: JQuery, { position, min_value, max_value, current_value, step, show_window_value, $input }: Ioptions) {
        this.$this = $this

        this.model = new Model(min_value, max_value, current_value)
        this.view = new View(this.$this, position, min_value, max_value, current_value, step, show_window_value, $input)
    }

    public init(): JQuery {
        this.view.init()

        this.$this.on('updataCurrentValue', (e, data) => {
            this.setCurrentValue(data.current_value)
        })
        
        return this.$this
    }

    public setCurrentValue(value: number) {
        this.model.setCurrentValue(value)
        this.view.updataView(this.model.getCurrentValue())
    }
}

export {
    Presenter
}