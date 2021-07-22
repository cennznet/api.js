# Extension Releases

json files used by the [CENNZnet Extension](https://github.com/cennznet/extension) for decoding `Call` types

metaCalls.json contains all CENNZnet chains metaCall info 
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
runtimeModuleTypes.json has additional runtime type definitions for complex types e.g. those declared within `types/runtime/interfaces`

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

