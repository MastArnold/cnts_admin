calcul du numéro de donneur

# ancien

(clé(1)+numéro(6)) => (clé(1)+numéro(6)+'001'+lettre(1))
9 586 524 => 9 586 524 001 A

# nuoveau

(centre(2)+numéro(10)+lettre(1))

12 3265147852 K

taches

- modifier tous les numéros d'anciens donneurs pour ajouter '001A' après le numéro de donneur
- modifier la fonction de recherche pour ajouter '001A' si le numéro de donneur entrée contient 7 chiffres
- modifier la fonction de génération de numéro donner pour prendre en compte
  - numéro de centre (2 chiffres)
  - numéro donneur (10 chiffres)
  - lettre assigné (A pour les anciens donneurs, K pour les nouveaux)
- modifier la fonction d'enregistrement de donneur pour ajouter la lettre 'K' au numéro des nouveaux donneurs
- modifier l'appli klog pour ne plus réecrire la bdd entièrement à chaque fois, mais juste envoyé les donneurs qui n'ont pas leurs clé primaire dans postgres