

export interface Positionable {
    setPosition(x: number | null, y: number | null): void
}

export interface ItemProvider {
    getItem(data: any): Positionable
    returnItem(item: any): void
}

// @TODO handle horizontal scrolling as well as vertical!
export class ScrollItem {
    top: number
    bottom: number
    private _data: any
    private _render: Positionable | null
    private provider: ItemProvider
    constructor(provider: ItemProvider, data: any, top: number, height: number) {
        this.provider = provider
        this.top = top
        this.bottom = top + height
        this._data = data
        this._render = null
    }
    update(vTop: number, vBottom: number) {
        if (this._render != null) {
            if (this.top > vBottom || this.bottom < vTop) {
                this.remove()
                return
            }
            // move the item
            this.move(vTop)
        } else {
            if (this.top <= vBottom && this.bottom >= vTop) {
                this.add()
                this.move(vTop)
            }
        }
    }

    private remove(): void {
        this.provider.returnItem(this._render)
        this._render = null
    }

    private add(): void {
        this._render = this.provider.getItem(this._data)
    }

    private move(to: number) {
        // ?
        if (this._render) {
            this._render.setPosition(null, this.top - to)
        }
    }

    get visible(): boolean {
        return (this._render != null)
    }
    get data(): any {
        return this._data
    }
    get render(): Positionable | null {
        return this._render
    }
}

export class ScrollManager {
    items: ScrollItem[]
    scrollTop: number
    height: number
    constructor(height: number) {
        this.items = []
        this.scrollTop = 0
        this.height = height
    }

    addItem(item: ScrollItem) {
        this.items.push(item)
        this._updateItems()
    }

    scrollTo(top: number) {
        this.scrollTop = top
        this._updateItems()
    }

    private _updateItems(){
        const vTop = this.scrollTop
        const vBottom = vTop + this.height
        this.items.forEach( item => {
            item.update(vTop, vBottom)
        })
    }
    get itemSize(): ItemSize {
        const reducer = (acc: ItemSize, current:ScrollItem):ItemSize => {
            acc.min = Math.min(acc.min, current.top)
            acc.max = Math.max(acc.max, current.bottom)
            return acc
        }
        return this.items.reduce(reducer, {min:Number.MAX_VALUE,max:Number.MIN_VALUE})
    }

    get activeItems(): ScrollItem[] {
        return this.items.filter(item => item.visible == true)
    }
}

interface ItemSize { min: number, max: number }