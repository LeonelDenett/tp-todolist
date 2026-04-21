# Schema d'architecture d'execution

```mermaid
flowchart LR
    U[Utilisateur Navigateur]
    F[Frontend Vue.js\nlocalhost:8080]
    B[Backend Express API\nlocalhost:3009]
    D[(MariaDB\nlocalhost:3307)]

    U --> F
    F -->|HTTP REST /api/todos| B
    B -->|Sequelize + mysql2| D
```

## Flux principal

1. Le navigateur charge le frontend Vue.js.
2. Le frontend appelle le backend sur l'URL API configuree.
3. Le backend execute les operations CRUD sur MariaDB.
4. Le backend renvoie une reponse JSON au frontend.
