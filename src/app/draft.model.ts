import { Booster } from './booster.model';
import { Player } from './player.model';

export class Draft {
    public turns: number;
    constructor(public players: Player[], public boosters: Booster[]) {
        this.turns = 0;
    }
}
