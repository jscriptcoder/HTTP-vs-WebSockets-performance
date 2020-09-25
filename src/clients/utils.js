import { 
    uniqueNamesGenerator, 
    adjectives, 
    colors, 
    animals
} from 'unique-names-generator'

const rndNamesConfig = {
  dictionaries: [adjectives, colors, animals],
  separator: ' ',
  style: 'capital',
}

export function randomName() {
    return uniqueNamesGenerator(rndNamesConfig)
}