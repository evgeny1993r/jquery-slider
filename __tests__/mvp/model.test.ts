import { Model } from '../../src/mvp/model'

interface Ioptions {
    interval: boolean
    min_value: number 
    max_value: number 
    current_value?: number 
    current_value_min?: number 
    current_value_max?: number 
}

describe('Testing Model', () => {
    describe('Testing the Model with the parameter interval false', () => {
        const options: Ioptions = {
            interval: false,
            min_value: 0,
            max_value: 100,
            current_value: 50
        }

        const _ = new Model(options)

        beforeAll(() => {
            _.init()
        })
        beforeEach(() => {
            _.setCurrentValue!(50)
        })

        test('Method init must be defined', () => {
            expect(_.init).toBeDefined()
        })
        test('Method getCurrentValue must be defined', () => {
            expect(_.getCurrentValue).toBeDefined()
        })
        test('Method getCurrentValue should return current_value', () => {
            expect(_.getCurrentValue!()).toBe(50)
        })
        test('Method setCurrentValue must be defined', () => {
            expect(_.setCurrentValue).toBeDefined()
        })
        test('Method setCurrentValue should set value in current_value', () => {
            _.setCurrentValue!(70)
            expect(_.getCurrentValue!()).toBe(70)
        })
        test('Method setCurrentValue should not set value in current_value less min_value', () => {
            _.setCurrentValue!(-50)
            expect(_.getCurrentValue!()).toBe(50)
        })
        test('Method setCurrentValue should not set value in current_value greater max_value', () => {
            _.setCurrentValue!(150)
            expect(_.getCurrentValue!()).toBe(50)
        })
    })

    describe('Testing the Model with the parameter interval true', () => {
        const options: Ioptions = {
            interval: true,
            min_value: 0,
            max_value: 100,
            current_value_min: 25,
            current_value_max: 75
        }

        const _ = new Model(options)

        beforeAll(() => {
            _.init()
        })
        beforeEach(() => {
            _.setCurrentValueMin!(25)
            _.setCurrentValueMax!(75)
        })

        test('Method init must be defined', () => {
            expect(_.init).toBeDefined()
        })
        test('Method getCurrentValueMin must be defined', () => {
            expect(_.getCurrentValueMin).toBeDefined()
        })
        test('Method getCurrentValue should return current_value_min', () => {
            expect(_.getCurrentValueMin!()).toBe(25)
        })
        test('Method getCurrentValuMax must be defined', () => {
            expect(_.getCurrentValueMax).toBeDefined()
        })
        test('Method getCurrentValueMax should return current_value_max', () => {
            expect(_.getCurrentValueMax!()).toBe(75)
        })
        test('Method setCurrentValueMin must be defined', () => {
            expect(_.setCurrentValueMin).toBeDefined()
        })
        test('Method setCurrentValueMin should set value in current_value_min', () => {
            _.setCurrentValueMin!(35)
            expect(_.getCurrentValueMin!()).toBe(35)
        })
        test('Method setCurrentValueMin should not set value in current_value_min less min_value', () => {
            _.setCurrentValueMin!(-25)
            expect(_.getCurrentValueMin!()).toBe(25)
        })
        test('Method setCurrentValueMin should not set value in current_value_min greater current_value_max', () => {
            _.setCurrentValueMin!(100)
            expect(_.getCurrentValueMin!()).toBe(25)
        })
        test('Method setCurrentValueMax must be defined', () => {
            expect(_.setCurrentValueMax).toBeDefined()
        })
        test('Method setCurrentValueMax should set value in current_value_max', () => {
            _.setCurrentValueMax!(65)
            expect(_.getCurrentValueMax!()).toBe(65)
        })
        test('Method setCurrentValueMax should not set value in current_value_max greater max_value', () => {
            _.setCurrentValueMax!(125)
            expect(_.getCurrentValueMax!()).toBe(75)
        })
        test('Method setCurrentValueMax should not set value in current_value_max less current_value_min', () => {
            _.setCurrentValueMax!(15)
            expect(_.getCurrentValueMax!()).toBe(75)
        })
    })
})