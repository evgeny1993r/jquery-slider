import $ from 'jquery'

import { Slider } from '../components/slider'
import { Scale } from '../components/scale'
import { ScaleValue } from '../components/scale-value'
import { Runner } from '../components/runner'
import { WindowValue } from '../components/window-value'

interface Islider {
    getSlider(): JQuery
}

interface Iscale {
    getScale(): JQuery
}

interface Iscale_value {
    getScaleValue(): JQuery
    updataRenderScaleValue(width: number): void
}

interface Irunner {
    getRunner(): JQuery
    updataRenderRunner(position_X: number): void
}

interface Iwindow_value {
    getWindowValue(): JQuery
    updataRenderWindowValue(position_X: number, value: number): void
}

class View {
    private $this: JQuery

    private min_value: number 
    private max_value: number 
    private current_value: number 
    private step: number
    private show_window_value: boolean

    private view_min_value: number 
    private view_max_value: number 
    private view_current_value: number 

    private slider: Islider
    private scale: Iscale
    private scale_value: Iscale_value
    private runner: Irunner
    private window_value: Iwindow_value

    private $slider: JQuery
    private $scale: JQuery
    private $scale_value: JQuery
    private $runner: JQuery
    private $window_value: JQuery

    private position_$scale_X: number
    private unit_value: number 

    public constructor($this: JQuery, min_value: number, max_value: number, current_value: number, step: number, show_window_value: boolean) {
        this.$this = $this

        this.min_value = min_value
        this.max_value = max_value
        this.current_value = current_value
        this.step = step
        this.show_window_value = show_window_value

        this.view_min_value = this.min_value - this.min_value
        this.view_max_value = this.max_value - this.min_value 
        this.view_current_value = this.current_value - this.min_value

        this.slider = new Slider()
        this.scale = new Scale()
        this.scale_value = new ScaleValue()
        this.runner = new Runner()
        this.window_value = new WindowValue()

        this.$slider = this.slider.getSlider()
        this.$scale = this.scale.getScale()
        this.$scale_value = this.scale_value.getScaleValue()
        this.$runner = this.runner.getRunner()
        this.$window_value = this.window_value.getWindowValue()

        this.position_$scale_X = 0
        this.unit_value = 0

    }

    public init(): void {
        $(this.$this)
            .append(this.$slider
                .append(this.$scale)
                .append(this.$scale_value)
                .append(this.$runner))
        this.show_window_value ? this.$slider.append(this.$window_value): null
        
        this.position_$scale_X = this.$scale.position().left
        this.unit_value = this.$scale.outerWidth()! / this.view_max_value

        this.updataRender()

        const $elements: JQuery[] = [this.$scale, this.$scale_value, this.$runner]
        $elements.forEach((el) => {
            el.on('updataPosition', (e, data) => {
                this.$this.trigger('updataCurrentValue', {
                    current_value: (Math.round((((data.position_X - this.position_$scale_X) / this.unit_value) + this.min_value) / this.step)) * this.step
                })
            })
        })

    }

    public updataView(current_value: number): void {
        this.current_value = current_value
        this.view_current_value = current_value - this.min_value
        this.updataRender()
    }

    private updataRender() {
        this.runner.updataRenderRunner(this.view_current_value * this.unit_value)
        this.scale_value.updataRenderScaleValue(this.view_current_value * this.unit_value)
        this.window_value.updataRenderWindowValue(this.view_current_value * this.unit_value, this.current_value)
    }
}

export {
    View
}