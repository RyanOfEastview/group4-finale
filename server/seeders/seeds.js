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
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Concord_Pacific_Master_Plan_Area.jpg/432px-Concord_Pacific_Master_Plan_Area.jpg"
    },
    {
      place: "Osaka",
      picLink:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Osaka_Castle_03bs3200.jpg/278px-Osaka_Castle_03bs3200.jpg',
    },
    {
      place: "New York",
      picLink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg/268px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu.jpg",
    },
    {
      place: "Seattle",
      picLink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Seattle_Center_as_night_falls.jpg/177px-Seattle_Center_as_night_falls.jpg",
    },
    {
      place: "Toronto",
      picLink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Toronto_Skyline_Summer_2020.jpg/238px-Toronto_Skyline_Summer_2020.jpg",
    },
    {
      place: "Hong Kong",
      picLink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Hong_Kong_at_night.jpg/1150px-Hong_Kong_at_night.jpg",
    },
    {
      place: "Tokyo",
      picLink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Shibuya_Crossing_%28181547621%29.jpeg/143px-Shibuya_Crossing_%28181547621%29.jpeg",
    },
    {
      place: "London",
      picLink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/275px-London_Montage_L.jpg",
    },
    {
      place: "Stockholm",
      picLink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Stockholms_slott_August_2015_01.jpg/288px-Stockholms_slott_August_2015_01.jpg",
    },
    {
      place: "Madrid",
      picLink:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Panorama_de_Madrid_desde_el_parque_de_San_Isidro.JPG/268px-Panorama_de_Madrid_desde_el_parque_de_San_Isidro.JPG",
    },
  ];

  for (let i = 0; i < 10; i += 1) {
    const photoText = faker.lorem.words(Math.round(Math.random() * 10) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];
    const photoPlace = photoInfo[i].place;
    const photoLink = photoInfo[i].picLink;

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
