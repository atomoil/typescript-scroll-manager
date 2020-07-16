import { RenderProvider, Positionable } from '../lib'

export class BasicItemProvider implements RenderProvider {
    _items: BasicItem[]
    counter: number
    constructor() {
        this._items = []
        this.counter = 0
    }
    getRender(data: any): BasicItem {
        if (this._items.length == 0) {
            return new BasicItem(this.counter++)
        }
        return <BasicItem>this._items.pop()
    }
    returnRender(item: BasicItem): void {
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