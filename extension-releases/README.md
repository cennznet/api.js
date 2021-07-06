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
runtimeModuleTypes.json is a json file with additional runtime types added, make sure to update it when new runtime module is added.
The types field in this file is needed to display the correct method and params on the extension UI.. without having the types specified here, the custom
types (non-primitive ones) introduce for example - 'Collection type' would not be recognised by extension and method decoding will fail.
This is only for extension UI to look and feel good.
UserExtensions field can be added to this file, whenever we plan to add more field to signed extension. This will help to prevent bad signature issue.
````
{
"types" : {
        // new types added
    },
"userExtensions" : {
        // whenever signed Extension change please add entry here
    }
}
````

