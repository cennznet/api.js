# Extension json files which is used by CENNZnet extension [Extension](https://github.com/cennznet/extension)

Metadata json file is a json file with all CENNZnet chains metaCall info 
````
{
 "metaCalls": {
    "genesisHash-specVersion": "metaCalls", // local
    "genesisHash-specVersion": "metaCalls", // Nikau
    "genesisHash-specVersion": "metaCalls", // Azalea
    "genesisHash-specVersion": "metaCalls", // Rata
    }
}
````
runtimeModuleTypes.json is a json file with type definition and userSignature
This is generated per genesisHash for every chain and stored
The types field in this file is needed to display the correct method and params on the extension UI.. without having the types specified here, the custom
types (non-primitive ones) introduce for example - 'Collection type' would not be recognised by extension and method decoding will fail.
This is only for extension UI to look and feel good.
UserExtensions field can be added to this file, whenever we plan to add more field to signed extension. This will help to prevent bad signature issue.
````
{
    "genesishHash_local": {
        "types" : {
            // new types added
        },
        "userExtensions" : {
            // whenever signed Extension change please add entry here
        }
    },
    "genesishHash_Nikau": {
        "types" : {
            // new types added
        },
        "userExtensions" : {
            // whenever signed Extension change please add entry here
        }
    },
    "genesishHash_Azalea": {
        "types" : {
            // new types added
        },
        "userExtensions" : {
            // whenever signed Extension change please add entry here
        }
    },
    "genesishHash_Rata": {
        "types" : {
            // new types added
        },
        "userExtensions" : {
            // whenever signed Extension change please add entry here
        }
    },
}
````

