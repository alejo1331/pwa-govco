export class Repo {
    constructor(
      public title : string,
      public sector : string,
      public clasificionOrganica: string,
      public contador: number,
      public categorias: string,
      public fieldUrlUrl: string) {}
}

export class RepoCount {
    constructor(public Key: string, public Value: number) {}
}
