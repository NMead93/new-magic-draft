export class Player {
  cards: any = [];
  playerInfo: any = {
      cardType: {
          creature: 0,
          artifact: 0,
          enchantment: 0,
          planeswalker: 0,
          instant: 0,
          sorcery: 0,
          other: 0
      },
      manaCurve: {
          one: 0,
          two: 0,
          three: 0,
          four: 0,
          five: 0,
          sixAndUp: 0
      }
  }
  constructor(public name: string, public currentPackId: string) {}
}
