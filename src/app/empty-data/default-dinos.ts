import { Colors, Dino, DinoPattern, emptyColors, emptyColors2, emptyColors3, emptyColors4, emptyColors5, emptyColors6, emptyColors7, emptyPattern } from "../data-interfaces";
import { Diat, DinoNames } from "../enums";

const defaultPatterns = (colors?: Colors): DinoPattern[] => [
    emptyPattern("010", colors),
    emptyPattern("110", colors),
    emptyPattern("210", colors)
];

const defaultPatternsAccents = (): DinoPattern[] => [
    emptyPattern("010", emptyColors4()),
    emptyPattern("110", emptyColors4()),
    emptyPattern("210", emptyColors4())
];

const defaultPatternsClaws = (): DinoPattern[] => [
    emptyPattern("010", emptyColors5()),
    emptyPattern("110", emptyColors5()),
    emptyPattern("210", emptyColors5())
];

const createDino = (
    name: DinoNames,
    diat: Diat,
    patterns: DinoPattern[] = defaultPatterns()
): Dino => ({
    name,
    diat,
    patterns
});

export const defaultDinos = (): Dino[] => [
    ...herbivores(),
    ...carnivores(),
    ...omnivores()
];

const herbivores = (): Dino[] => [
    createDino(DinoNames.Diabloceratops, Diat.Herbi),
    createDino(DinoNames.Dryosaurus, Diat.Herbi),
    createDino(DinoNames.Hypsilophodon, Diat.Herbi),
    createDino(DinoNames.Kentrosaurus, Diat.Herbi),
    createDino(DinoNames.Maiasaura, Diat.Herbi),
    createDino(DinoNames.Pachycephalosaurus, Diat.Herbi, [
        ...defaultPatterns(),
        emptyPattern("310"),
        emptyPattern("410")
    ]),
    createDino(DinoNames.Stegosaurus, Diat.Herbi, [
        ...defaultPatterns(),
        emptyPattern("310")
    ]),
    createDino(DinoNames.Tenontosaurus, Diat.Herbi),
    createDino(DinoNames.Triceratops, Diat.Herbi, [
        ...defaultPatterns(),
        emptyPattern("310", emptyColors2()),
        emptyPattern("410"),
        emptyPattern("510")
    ])
];

const carnivores = (): Dino[] => [
    createDino(DinoNames.Allosaurus, Diat.Carni, [
        emptyPattern("000"),
        emptyPattern("100"),
        emptyPattern("200"),
        emptyPattern("300", emptyColors())
    ]),
    createDino(DinoNames.Austroraptor, Diat.Carni, [
        ...defaultPatterns(),
        emptyPattern("310", emptyColors6())
    ]),
    createDino(DinoNames.Carnotaurus, Diat.Carni, [
        ...defaultPatterns(),
        emptyPattern("310", emptyColors7())
    ]),
    createDino(DinoNames.Ceratosaurus, Diat.Carni),
    createDino(DinoNames.Deinosuchus, Diat.Carni),
    createDino(DinoNames.Dilophosaurus, Diat.Carni),
    createDino(DinoNames.Herrerasaurus, Diat.Carni, [
        ...defaultPatterns(),
        emptyPattern("310"),
        emptyPattern("410")
    ]),
    createDino(DinoNames.Omniraptor, Diat.Carni, [
        ...defaultPatterns(),
        emptyPattern("310", emptyColors()),
        emptyPattern("410"),
        emptyPattern("510"),
        emptyPattern("610")
    ]),
    createDino(DinoNames.Pteranodon, Diat.Carni),
    createDino(DinoNames.Troodon, Diat.Carni),
    createDino(DinoNames.Tyrannosaurus, Diat.Carni, [
        ...defaultPatterns(),
        emptyPattern("310", emptyColors4()),
        emptyPattern("410", emptyColors2())
    ])
];

const omnivores = (): Dino[] => [
    createDino(DinoNames.Beipiaosaurus, Diat.Omni, defaultPatternsAccents()),
    createDino(DinoNames.Gallimimus, Diat.Omni)
];