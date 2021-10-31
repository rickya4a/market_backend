export default mongoose => {
  let schema = mongoose.Schema(
    {
      username: {
        type: String,
        required: 'Username cannot be blank'
      },
      email: {
        type: String,
        required: 'Email cannot be blank'
      },
      password: {
        type: String,
        required: 'Password cannot be blank'
      },
      score: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  })

  const User = mongoose.model("user", schema);
  return User;
};