import $ from 'jquery'

import { Slider } from '../components/slider'
import { Scale } from '../components/scale'
import { Runner } from '../components/runner'

interface Islider {
    getSlider(): JQuery
}

interface Iscale {
    getScale(): JQuery
}

interface Irunner {
    getRunner(): JQuery
    updataPositionRunner(value: number): void
}

class View {
    $this: JQuery

    min_value: number 
    max_value: number 
    current_value: number 

    view_min_value: number 
    view_max_value: number 
    view_current_value: number 

    slider: Islider
    scale: Iscale
    runner: Irunner

    $slider: JQuery
    $scale: JQuery
    $runner: JQuery

    unit_value: number

    public constructor($this: JQuery, min_value: number, max_value: number, current_value: number) {
        this.$this = $this

        this.min_value = min_value
        this.max_value = max_value
        this.current_value = current_value

        this.view_min_value = this.min_value - this.min_value
        this.view_max_value = this.max_value - this.min_value 
        this.view_current_value = this.current_value - this.min_value

        this.slider = new Slider()
        this.scale = new Scale()
        this.runner = new Runner()

        this.$slider = this.slider.getSlider()
        this.$scale = this.scale.getScale()
        this.$runner = this.runner.getRunner()

        this.unit_value = 0
    }

    public init(): JQuery {
        $(this.$this)
            .append(this.$slider
                .append(this.$scale)
                .append(this.$runner))
                
        this.unit_value = this.$scale.outerWidth()! / this.view_max_value
        this.updataRender()

        this.$this.on('updataPositionRunner', (e, data) => {
            console.log(data.position_runner_X)
        })
        
        return this.$this
    }

    updataRender(): void {
        this.runner.updataPositionRunner(this.unit_value * this.view_current_value)
    }
}

export {
    View
}