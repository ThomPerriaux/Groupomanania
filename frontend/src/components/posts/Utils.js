//On verifie qu'un élément n'est pas vide avant d'effectuer une action sur lui
//en regle general des fonctions peuvent se jouer alors que le state n'est pas encore monté

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
