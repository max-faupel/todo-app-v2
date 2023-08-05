export class Todo {
    id: number
    username: string
    description: string
    done: boolean
    targetDate: Date

    constructor(description: string = '', done: boolean = false, targetDate: Date, id?: number, username?: string) {
        this.description = description
        this.done = done
        this.targetDate = targetDate
        this.id = id || -1
        this.username = username || ''
    }
}
