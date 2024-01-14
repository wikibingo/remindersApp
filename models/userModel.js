const database = [
  //create uew user with github profile after login successful
  {
    id: 0,
    name: "bob",
    email: "bob@gmail.com",
    password: "superbob",
    role: "admin",
    reminders: [
      {
        id: 1,
        title: "system update",
        description: "update configuration",
        completed: false,
      },
    ],
  },
  {
    id: 1,
    name: "cindy",
    email: "cindy123@gmail.com",
    password: "cindy123",
    role: "user",
    reminders: [
      {
        id: 1,
        title: "Grocery shopping",
        description: "Buy milk and bread from safeway",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    name: "user2",
    email: "user2@gmail.com",
    password: "user123",
    role: "user",
    reminders: [
      {
        id: 1,
        title: "Sleeping",
        description: "Need Sleep",
        completed: false,
      },
      {
        id: 2,
        title: "Sleeping",
        description: "Need Sleep",
        completed: false,
      },
    ],
  },
  {
    //github user
    // id: profile.id,
    // name: profile.name,
    // email: profile.email,
    // reminders: []
  }
  // {
  //   id: 3,
  //   name: "Jonathan Chen",
  //   email: "jonathan123@gmail.com",
  //   password: "jonathan123!",
  // },
];

const userModel = {
  findOne: (email) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  findById: (id) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },
};

module.exports = { database, userModel };
