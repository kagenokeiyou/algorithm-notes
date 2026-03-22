export interface DataArrayItem {
  value: number
  key: number
  selected: boolean
  used: boolean
}

export class DataArray {
  items!: DataArrayItem[]
  private readonly _initArray: number[]

  constructor(initArray: number[]) {
    this._initArray = initArray
    this.reset()
  }

  reset() {
    this.items = this._initArray.map((value, index) => ({
      value: value,
      key: index,
      selected: false,
      used: false,
    }))
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
