import { Booster } from './booster.model';
import { Player } from './player.model';

export class Draft {
    public turns: number;
    public rounds: number;
    constructor(public players: any, public boosters: Booster[]) {
        this.turns = 1;
        this.rounds = 0;
    }
}
