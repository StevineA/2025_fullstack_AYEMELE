import * as mongodb from "mongodb";

export const collections = {
    projects: null,
    contacts: null,
};

export async function connectToDatabase(uri) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("portfolioDB");
    await applySchemaValidation(db);

    collections.projects = db.collection("projects");
    collections.contacts = db.collection("contacts"); 
    await insertSampleProject();
}

async function insertSampleProject() {
    const existingProjects = await collections.projects.countDocuments();
    if (existingProjects > 0) {
        console.log("Des projets existent déjà, insertion ignorée.");
        return;
    }

    const newProjects = [
        {
            title: "Application météo",
            shortDescription: "App météo avec API externe",
            fullDescription: "Cette application permet d'afficher les prévisions météorologiques à l'aide d'une API externe, construite avec React.",
            keywords: ["React", "API", "Météo", "JavaScript"],
            thumbnail: "https://th.bing.com/th/id/R.89c9e90730a005b1968dd54b050c0c09?rik=UJtWZT4tGeQ5Ag&riu=http%3a%2f%2fwww.epnleroeulx.be%2fwp-content%2fuploads%2f2013%2f09%2fFotolia_56032753_V.jpg&ehk=lhDfXWQyth4pNxC2Y3b9cSGBLI%2fUhV1W5vyDsCxrnjI%3d&risl=&pid=ImgRaw&r=0",
            images: [
                "https://th.bing.com/th/id/OIP.NNnUj7QtrOa-qWIpkt7voAHaE7?w=1688&h=1125&rs=1&pid=ImgDetMain",
                "https://pinguinodigital.com/wp-content/uploads/2020/06/Software-de-Marketing-4-1536x800.png"
            ]
        }
    ];

    try {
        const result = await collections.projects.insertMany(newProjects);
        console.log(`Projets insérés avec les IDs : ${Object.values(result.insertedIds).join(", ")}`);
    } catch (error) {
        console.error("Erreur d'insertion des projets:", error);
    }
}

async function applySchemaValidation(db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "shortDescription", "fullDescription"],
            additionalProperties: false,
            properties: {
                _id: {},
                title: {
                    bsonType: "string",
                    description: "'title' est requis et doit être une chaîne",
                },
                shortDescription: {
                    bsonType: "string",
                    description: "'shortDescription' est requise",
                    maxLength: 80,
                },
                fullDescription: {
                    bsonType: "string",
                    description: "'fullDescription' est requise",
                    maxLength: 2500, // ATTENTION, validation mots sera côté front
                },
                keywords: {
                    bsonType: "array",
                    description: "Liste de mots-clés, maximum 10",
                    items: {
                        bsonType: "string",
                    },
                    maxItems: 10,
                },
                thumbnail: {
                    bsonType: "string",
                },
                images: {
                    bsonType: "array",
                    description: "Entre 1 et 5 images",
                    items: {
                        bsonType: "string",
                    },
                    minItems: 1,
                    maxItems: 5,
                },
            },
        },
    };

    try {
        await db.command({
            collMod: "projects",
            validator: jsonSchema,
        });
    } catch (error) {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("projects", { validator: jsonSchema });
        }
    }
}
