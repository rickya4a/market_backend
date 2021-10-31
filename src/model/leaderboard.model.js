export default mongoose => {
  let schema = mongoose.Schema(
    {
      username: {
        type: String,
        required: 'Username cannot be blank'
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

  const Leaderboard = mongoose.model("leaderboard", schema);
  return Leaderboard;
};