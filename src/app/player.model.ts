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
      cardColor: {
          white: 0,
          red: 0,
          black: 0,
          green: 0,
          blue: 0,
          other: 0
      },
      manaCurve: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6AndUp: 0
      }
  }
  constructor(public name: string, public currentPackId: string) {}
}
