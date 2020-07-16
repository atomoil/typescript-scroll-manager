import {
    ScrollManager,
    ScrollItem
} from '../lib/scroll-core'

import { BasicItemProvider } from './scroll-example'

test('scrolling works', () => {
    const manager = new ScrollManager(10)
    const provider = new BasicItemProvider()
    const items = [
        new ScrollItem(provider, {id: 1}, 0, 10),
        new ScrollItem(provider, {id: 2}, 5, 10),
        new ScrollItem(provider, {id: 3}, 10, 10),
        new ScrollItem(provider, {id: 4}, 15, 10),
        new ScrollItem(provider, {id: 5}, 20, 10),
    ]
    items.forEach( item => manager.addItem(item) )

    manager.scrollTo(0)
    confirmCorrect([1,2,3],manager)
    manager.scrollTo(10)
    confirmCorrect([1,2,3,4,5],manager)
    manager.scrollTo(20)
    confirmCorrect([3,4,5],manager)
    manager.scrollTo(30)
    confirmCorrect([5],manager)
})

const confirmCorrect = (match: number[], manager: ScrollManager) => {
    const ids = manager.activeItems.map( (item:any) => item.data.id )
    expect(ids).toStrictEqual(match)
}