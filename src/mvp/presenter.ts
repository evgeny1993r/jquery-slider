import { Model } from './model'
import { View } from './view'

interface Ioptions {
    min_value: number
    max_value: number 
    current_value: number 
}

interface Imodel {
    getCurrentValue(): number
    setCurrentValue(value: number): void
}

interface Iview {
    init(): JQuery
}

class Presenter {
    private $this: JQuery

    private model: Imodel
    private view: Iview

    public constructor($this: JQuery, { min_value, max_value, current_value }: Ioptions) {
        this.$this = $this

        this.model = new Model(min_value, max_value, current_value)
        this.view = new View(this.$this, min_value, max_value, current_value)
    }

    public init(): JQuery {
        return this.view.init()
    }
}

export {
    Presenter
}