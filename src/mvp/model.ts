class Model {
    private min_value: number
    private max_value: number 
    private current_value: number 

    public constructor(min_value: number, max_value: number, current_value: number) {
        this.min_value = min_value
        this.max_value = max_value
        this.current_value = current_value
    }

    public getCurrentValue(): number  {
        return this.current_value
    }

    public setCurrentValue(value: number): void {
        if(value < this.min_value || value > this.max_value) return
        this.current_value = value
    }
}

export {
    Model
}