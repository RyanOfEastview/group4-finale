const faker = require("faker");

const db = require("../config/connection");
const { Photo, User } = require("../models");

db.once("open", async () => {
  await Photo.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 5; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 10; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(
        Math.random() * createdUsers.ops.length
      );
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create photos
  let createdPhotos = [];

  const photoInfo = [
    {
      place: "Vancouver",
      picLink:
        "https://images.unsplash.com/photo-1527960669566-f882ba85a4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
    {
      place: "Osaka",
      picLink:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Osaka_Castle_03bs3200.jpg/278px-Osaka_Castle_03bs3200.jpg',
    },
    {
      place: "New York",
      picLink:
        "https://en.wikipedia.org/wiki/New_York_City#/media/File:View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg",
    },
    {
      place: "Seattle",
      picLink:
        "https://en.wikipedia.org/wiki/Seattle#/media/File:Downtown_Seattle_skyline_from_Kerry_Park_-_October_2019.jpg",
    },
    {
      place: "Toronto",
      picLink:
        "https://en.wikipedia.org/wiki/Toronto#/media/File:Toronto_Skyline_Summer_2020.jpg",
    },
    {
      place: "Hong Kong",
      picLink:
        "https://en.wikipedia.org/wiki/Hong_Kong#/media/File:Hong_Kong_at_night.jpg",
    },
    {
      place: "Tokyo",
      picLink:
        "https://en.wikipedia.org/wiki/Tokyo#/media/File:Skyscrapers_of_Shinjuku_2009_January.jpg",
    },
    {
      place: "London",
      picLink:
        "https://en.wikipedia.org/wiki/City_of_London#/media/File:Cityoflondontowerbridge.jpg",
    },
    {
      place: "Stockholm",
      picLink:
        "https://en.wikipedia.org/wiki/Stockholm#/media/File:View_of_Stockholm-170351.jpg",
    },
    {
      place: "Madrid",
      picLink:
        "https://en.wikipedia.org/wiki/Madrid#/media/File:Panorama_de_Madrid_desde_el_parque_de_San_Isidro.JPG",
    },
  ];

  for (let i = 0; i < 10; i += 1) {
    const photoText = faker.lorem.words(Math.round(Math.random() * 10) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];
    const photoPlace = photoInfo[i].place;
    const photoLink = photoInfo[i].picLink;
    // const createdPhoto = await Photo.create({ photoText, username });
    const createdPhoto = await Photo.create({
      photoText,
      username,
      photoPlace,
      photoLink,
    });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { photos: createdPhoto._id } }
    );

    createdPhotos.push(createdPhoto);
  }

  // create reactions
  for (let i = 0; i < 10; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 10) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomPhotoIndex = Math.floor(Math.random() * createdPhotos.length);
    const { _id: photoId } = createdPhotos[randomPhotoIndex];

    await Photo.updateOne(
      { _id: photoId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }

  console.log("all done!");
  process.exit(0);
});
