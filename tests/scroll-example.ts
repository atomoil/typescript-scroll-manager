import { ItemProvider, Positionable } from '../lib/scroll-core'

export class BasicItemProvider implements ItemProvider {
    _items: BasicItem[]
    counter: number
    constructor() {
        this._items = []
        this.counter = 0
    }
    getItem(data: any): BasicItem {
        if (this._items.length == 0) {
            return new BasicItem(this.counter++)
        }
        return <BasicItem>this._items.pop()
    }
    returnItem(item: BasicItem): void {
        this._items.push(item)
    }
}

export class BasicItem implements Positionable {
    value: number 
    constructor(num: number) {
        this.value = num
    }
    setPosition(x: number, y: number): void {
        
    }
}