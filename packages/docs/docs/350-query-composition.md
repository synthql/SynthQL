# Query composition & reuse

In my opinion one of the bigger issues with SQL is the fact that you cannot compose larger queries from simpler queries.

Effectively this means that it is impossible to share SQL fragments between queries, so if you have a Users query and a Pets query, to make a Pets with Owners query you have to make a completely different query.

SynthQL is designed for composition and lets you achieve this in several ways. Let's see a few examples:

## Defining views

The first step towards reusable queries is to be able to give a name to a table + columns. I call these `views` and they can be defined as follows

```ts
// A view over the pets table
const pet = from('pets')
    .column('id','name')

// A view over the person table
const person = from('person')
    .column('id','name','age')

// A detailed view into the person table, along with their pets
const personDetailed = from('person')
    .column('id','name','age','created_at','updated_at', ...)
    .include({
        pet: pet.where({ owner_id: col('person.id') }).many()
    })
```

Once you have views, you can easily turn these into queries as follows:

```ts
function findPetById(id:number) {
    return pet.where({id}).maybe()
}

funciton findPersonLight(id:number) {
    return person.where({id}).maybe()
}

function findPersonDetails(id:number) {
    return personDetailed.where({id}).maybe()
}
```
