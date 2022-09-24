export default interface ShowModal {
    Alert: boolean,
    Category: {
      name: string | null,
      type: string | null,
      bool: boolean
    },
    IngredientM: {
      id: string | null,
      bool: boolean
    },
    Loading: boolean,
    YesorNo: {
      direct: Function,
      bool: boolean,
      params: {}
    },
    Filter: {
      typeOf: string | null,
      bool: boolean,
      filter: string | null,
      type: string | null
    }
};