import { Dino, DinoVariant } from "../data-interfaces";
import { Diat, DinoNames } from "../enums";

const defaultVariants = (): DinoVariant[] => [
    { name: "A", code: "000", extendedColors: true },
    { name: "B", code: "100", extendedColors: true },
    { name: "C", code: "200", extendedColors: true }
];

const createDino = (
    name: DinoNames,
    diat: Diat,
    variants: DinoVariant[] = defaultVariants()
): Dino => ({
    name,
    diat,
    variants
});

export const defaultDinos = (): Dino[] => [
    ...herbivores(),
    ...carnivores(),
    ...omnivores()
];

const herbivores = (): Dino[] => [
    createDino(DinoNames.Diabloceratops, Diat.Herbi),
    createDino(DinoNames.Dryosaurus, Diat.Herbi),
    createDino(DinoNames.Hypsilophodon, Diat.Herbi, [
        { name: "A", code: "100", extendedColors: false },
        { name: "B", code: "020", extendedColors: true }
    ]),
    createDino(DinoNames.Kentrosaurus, Diat.Herbi),
    createDino(DinoNames.Maiasaura, Diat.Herbi),
    createDino(DinoNames.Pachycephalosaurus, Diat.Herbi),
    createDino(DinoNames.Stegosaurus, Diat.Herbi),
    createDino(DinoNames.Tenontosaurus, Diat.Herbi),
    createDino(DinoNames.Triceratops, Diat.Herbi)
];

const carnivores = (): Dino[] => [
    createDino(DinoNames.Allosaurus, Diat.Carni),
    createDino(DinoNames.Austroraptor, Diat.Carni),
    createDino(DinoNames.Carnotaurus, Diat.Carni),
    createDino(DinoNames.Ceratosaurus, Diat.Carni),
    createDino(DinoNames.Deinosuchus, Diat.Carni),
    createDino(DinoNames.Dilophosaurus, Diat.Carni),
    createDino(DinoNames.Herrerasaurus, Diat.Carni),
    createDino(DinoNames.Omniraptor, Diat.Carni),
    createDino(DinoNames.Pteranodon, Diat.Carni),
    createDino(DinoNames.Troodon, Diat.Carni),
    createDino(DinoNames.Tyrannosaurus, Diat.Carni)
];

const omnivores = (): Dino[] => [
    createDino(DinoNames.Beipiaosaurus, Diat.Omni),
    createDino(DinoNames.Gallimimus, Diat.Omni)
];