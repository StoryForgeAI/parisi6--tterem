# Képek cseréje

## Mappa struktúra

```
public/images/
├── about/          # Rólunk szekció képei
├── dishes/         # Ételek képei
├── gallery/        # Galéria képei
├── hero/           # Hero szekció háttérképe
└── placeholder.txt # Ezt a fájlt nyugodtan törölheti
```

## Képformátumok

- **Hero háttér**: 1920x1080px, sötét tónusú, éttermi/ételek fotó
- **Ételek**: 600x400px, tálalt ételek közelképe
- **Galéria**: Vegyes méretek (800x600, 600x800, 600x600)
- **Rólunk**: 800x1000px, éttermi belső tér

## Képek cseréje

1. Helyezze el a képeket a megfelelő mappákba
2. Frissítse a kép URL-eket a `src/data/site.ts` fájlban
3. Az aktuálisan használt képek Unsplash-ről származó placeholder-ek

## Fontos

- A képek optimalizálása ajánlott (WebP formátum)
- A fájlnevekben kerülje a speciális karaktereket
- A hero háttérkép URL-je a `HeroSection.tsx` fájlban van
