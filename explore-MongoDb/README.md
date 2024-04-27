## Mondo Db using Shell

List all database :

```bash
$ show dbs
```

Switch to database:

```bash
$ use "any database name"
```

Clear shell:

```bash
$ cls
```

List all collection in current db

```bash
show collections
```

## Add Document

which will create a collection or redirect to that collection :

```bash
$ db.your_collection_Name
```

which is method take a argument {etc..} to insert single document into "your_collection_name"

```bash
$ db.your_collection_name.insertOne()
```

Example :

```javascript
db.users.insertOne({ name: "hola", password: "123123", std: "10", subjects: ["hola", "cola"] });
```

## Insert multiple documents at once

which insert multiple document at once which take [array] argument.

```bash
 $ db.your_collection_name.insertMany()
```

## Find Documents

Find method response only 20 Object or documents at once:

```bash
 $ db.your_collection_name.find()
```

Will iterate more objects or documents

```bash
$ it
```

we can use filters to find method to find specific document.

```bash
$ db.db.your_collection_name.find({name: 'cola'})
```

or you can pass many key pairs in object to find specific doc.

then u can pass second argument as object in find method to get back in response specific key pair value.
inside object you have to pass key name and as value 1.

Example:

```bash
$ db.db.your_collection_name.find({name: 'cola'}, {company:1})
```

example 2 :

```bash
$ db.users.find({}, {password: 1})
```

which will return all 20 documents passwords

## Find One

as name suggest help to find one document
which will return very first one object match.
example :

```bash
$ db.users.findOne({_id: ObjectId('65aaabb6d2706bca6d9a1529')})
```

## Sorting and Limiting data

which will return count of document and you can also pass argument in find so you will get specific doc count which has that key pair.

```bash
$db.users.find().countDocuments()
```

```bash
 $ db.users.find({name: "hola"}).countDocuments()`
```

`countDocuments or estimatedDocumentCount`

#### Limit method

limit method lets limit how many doc we get back

```bash
$ db.users.find().limit(3)
```

#### Sort

also tweaking 1 or -1 you get ascending and descending sort.

```bash
$ db.users.find().sort({name: 1})
```

## Nested Document.

example

```js
{title: "nothing", author: "hola", reviews: [{name: "bola", comment: " just great!"}, {name: 'cola', comment: "bekar"}]}
```

where reviews is nested document.

## Operators & Complex Queries

```bash
$ db.books.find({ rating: { $gt: 7 } })
```

gt stand for greater then but not including given number.

```bash
$ db.books.find({ rating: { $lt: 7 } });
```

lt stand for less then
or you can use `lte` which is stand for less then and equals
same as `gte` which also include given number.

OR operators

```bash
$ db.books.find({ $or: [{ rating: 8 }, { rating: 11 }] })
```

## using $in & $nin

in use for range<br>
nin for notIn

```bash
$ db.books.find({ rating: { $in: [6, 7, 8] } })
```

## Querying Arrays

Sample data:

```js
{

    _id: ObjectId('65abfb969e26785b0275b000'),
    name: 'Eternal Flames',
    rating: 4.6,
    genres: [ 'Romance', 'Fantasy' ],
    author: 'Lily Turner',
    reviews: [
      {
        name: 'RomanceFantasy',
        comment: 'Enchanting love in a fantasy world'
      },
      { name: 'FantasyRomantic', comment: 'A magical romance' }
    ]

}
```

> - 1. filter based on genres array which is string array.

```javascript
db.books.find({ genres: "Romance" });
```

> - finding exact match

```javascript
db.books.find({ genres: ["Mystery"] });
```

> -
> - if genres array contain only "Mystery" then it will return.

#### Include

- which will check for give argument inside array or not

```javascript
db.books.find(genres: {$all: ["Romance", "Fantasy"]})
```

- if and if all of given argument is inside genres it will fetch beck

- finding Nested Document like reviews

```bash
db.books.find({ "reviews.name": "HistoryMystery" });
```

## Update Documents

#### 1. Update one document

it take two argument first one is id and second is field which we want to update. for this we will use $set method.

```bash
$ db.books.updateOne({ _id: ObjectId("65abfb969e26785b0275afff") }, { $set: { rating: 9, name: "math 2" } })
```

## 2. Update Many Document

```bash
$ db.books.updateMany({ author: "Samantha White" }, { $set: { author: "hola" } })
```

## Operators

**$inc** Increments the value of the field by the specified amount.

```bash
$ db.books.updateOne({ _id: ObjectId("65abfb969e26785b0275afff") }, { $inc: { rating: 3 } })
```

**$pull** The $pull operator removes from an existing array all instances of a value or values that match a specified condition.

```bash
$ db.books.updateOne({ _id: ObjectId("65abfb969e26785b0275afff") }, { $pull: { genres: "Mystery" } })
```

**$each**

```bash
$ db.books.updateOne({ _id: ObjectId("65abfb969e26785b0275afff") }, { $push: { genres: { $each: ["1", "2"] } } })
```

## Delete Document

### DeleteOne

```bash
$ db.books.deleteOne({ _id: ObjectId("65abfb969e26785b0275afff") });
```

### DeleteMany

```bash
 $ db.books.deleteMany({ author: "hola" })
```

Or you can leave blank object to delete all document

```bash
 $ db.books.deleteMany({})
```
