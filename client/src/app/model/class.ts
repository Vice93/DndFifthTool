export interface Class {
  name: string,
  hit_die: number,
  proficiency_choices: ProficiencyChoices[],
  proficiencies: Proficiencies[],
  starting_equipment: StartingEquipment,
  saving_throws: SavingThrows[],
  subclasses: SubClasses[],
}


interface StartingEquipment {
  url: string
}

interface ProficiencyChoices {
  type: string,
  choose: number,
  url: string,
  from: From[]
}

interface Proficiencies {
  name: string,
  url: string
}

interface SavingThrows {
  name: string,
  url: string
}

interface SubClasses {
  name: string,
  url: string
}

interface From {
  name: string,
  url: string
}
