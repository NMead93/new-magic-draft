import { Booster } from './booster.model';

export class Draft {
    public turns: number;
    constructor(public players: number, public boosters: Booster[]) {
        this.turns = 0;
    }
}
